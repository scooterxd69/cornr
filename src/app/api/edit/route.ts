import { NextRequest, NextResponse } from "next/server";
import { callNemotron, NvidiaApiError } from "@/lib/nvidia";
import { buildEditSystemPrompt, buildEditUserPrompt, buildRepairPrompt } from "@/lib/prompt";
import { safeParseSiteSpec, siteSpecSchema } from "@/lib/schema";
import { editRequestSchema } from "@/lib/inputSchema";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const clientKey = getClientKey(req.headers);
  const rate = checkRateLimit(`edit:${clientKey}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "rate_limited", message: "You've used your free edits for now. Try again in a bit." },
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

  const parsedBody = editRequestSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "invalid_input", message: "That edit didn't come through right." },
      { status: 400 }
    );
  }

  const currentSpec = siteSpecSchema.safeParse(parsedBody.data.spec);
  if (!currentSpec.success) {
    return NextResponse.json(
      { error: "invalid_input", message: "Your current site data looks off. Try regenerating." },
      { status: 400 }
    );
  }

  const systemPrompt = buildEditSystemPrompt();
  const userPrompt = buildEditUserPrompt(
    JSON.stringify(currentSpec.data),
    parsedBody.data.instruction
  );

  try {
    const firstAttempt = await callNemotron({ systemPrompt, userPrompt });
    const parsed = safeParseSiteSpec(firstAttempt);
    if (parsed.success) {
      return NextResponse.json({ spec: parsed.data });
    }

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
      { error: "generation_failed", message: "That edit didn't quite land. Try rephrasing it." },
      { status: 502 }
    );
  } catch (err) {
    if (err instanceof NvidiaApiError) {
      return NextResponse.json(
        { error: "upstream_unavailable", message: "Our AI is taking a breather. Try again in a moment." },
        { status: 502 }
      );
    }
    return NextResponse.json(
      { error: "unknown", message: "Something went wrong on our end. Try again in a moment." },
      { status: 500 }
    );
  }
}
