/**
 * Server-only client for NVIDIA's OpenAI-compatible Nemotron endpoint.
 *
 * This file must never be imported from a client component — it reads
 * process.env.NVIDIA_API_KEY, which must stay on the server.
 */

const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";
const NVIDIA_MODEL = "nvidia/nemotron-3-ultra-550b-a55b";

export class NvidiaApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "NvidiaApiError";
  }
}

interface CompletionOptions {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
}

/**
 * Calls Nemotron with streaming enabled server-side (matching NVIDIA's
 * documented working configuration) and accumulates the full text before
 * returning, since we need a complete JSON payload before we can validate
 * and render it. The stream never reaches the browser directly.
 */
export async function callNemotron({
  systemPrompt,
  userPrompt,
  maxTokens = 16384
}: CompletionOptions): Promise<string> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    throw new NvidiaApiError("NVIDIA_API_KEY is not configured on the server", 500);
  }

  const response = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: NVIDIA_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 1,
      top_p: 0.95,
      max_tokens: maxTokens,
      chat_template_kwargs: { enable_thinking: true },
      reasoning_budget: 16384,
      stream: true
    })
  });

  if (!response.ok || !response.body) {
    const text = await response.text().catch(() => "");
    throw new NvidiaApiError(
      `NVIDIA API request failed (${response.status}): ${text.slice(0, 300)}`,
      response.status
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice("data:".length).trim();
      if (payload === "[DONE]") continue;
      try {
        const chunk = JSON.parse(payload);
        const delta = chunk?.choices?.[0]?.delta?.content;
        if (typeof delta === "string") fullText += delta;
      } catch {
        // Ignore malformed SSE fragments; partial JSON chunks can appear
        // mid-stream and are safe to skip.
      }
    }
  }

  if (!fullText.trim()) {
    throw new NvidiaApiError("NVIDIA API returned an empty response", 502);
  }

  return fullText;
}
