import { NextRequest, NextResponse } from "next/server";
import { siteSpecSchema } from "@/lib/schema";
import { renderStaticSite } from "@/lib/staticExport";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request", message: "Invalid request." }, { status: 400 });
  }

  const parsed = siteSpecSchema.safeParse((body as { spec?: unknown })?.spec);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_input", message: "This site can't be exported right now — try regenerating it." },
      { status: 400 }
    );
  }

  const html = renderStaticSite(parsed.data);
  const filename = `${parsed.data.site.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "my-site"}.html`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
