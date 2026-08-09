import { NextRequest, NextResponse } from "next/server";
import { callNemotron, NvidiaApiError } from "@/lib/nvidia";
import { buildSystemPrompt, buildUserPrompt, buildRepairPrompt } from "@/lib/prompt";
import { safeParseSiteSpec } from "@/lib/schema";
import { onboardingInputSchema } from "@/lib/inputSchema";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const clientKey = getClientKey(req.headers);
  const rate = checkRateLimit(`generate:${clientKey}`);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message: "You've used your free generations for now. Try again in a bit."
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "bad_request", message: "That request didn't come through right. Try again." },
      { status: 400 }
    );
  }

  const parsedInput = onboardingInputSchema.safeParse(body);
  if (!parsedInput.success) {
    return NextResponse.json(
      {
        error: "invalid_input",
        message: "A few of your answers look off — mind checking them?",
        details: parsedInput.error.flatten()
      },
      { status: 400 }
    );
  }

  const input = parsedInput.data;
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(input);

  try {
    const firstAttempt = await callNemotron({ systemPrompt, userPrompt });
    const parsed = safeParseSiteSpec(firstAttempt);

    if (parsed.success) {
      return NextResponse.json({ spec: parsed.data });
    }

    // Malformed JSON — one repair attempt with the error fed back to the model.
    const repairPrompt = buildRepairPrompt(firstAttempt, parsed.error);
    const secondAttempt = await callNemotron({
      systemPrompt,
      userPrompt: `${userPrompt}\n\n${repairPrompt}`
    });
    const repaired = safeParseSiteSpec(secondAttempt);

    if (repaired.success) {
      return NextResponse.json({ spec: repaired.data });
    }

    return NextResponse.json(
      {
        error: "generation_failed",
        message: "Our AI got a little tangled up building your site. Try again in a moment."
      },
      { status: 502 }
    );
  } catch (err) {
    if (err instanceof NvidiaApiError) {
      return NextResponse.json(
        {
          error: "upstream_unavailable",
          message: "Our AI is taking a breather. Try again in a moment."
        },
        { status: 502 }
      );
    }
    return NextResponse.json(
      { error: "unknown", message: "Something went wrong on our end. Try again in a moment." },
      { status: 500 }
    );
  }
}
