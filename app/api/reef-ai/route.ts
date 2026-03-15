import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { answer: "Please ask a question about reefs." },
        { status: 400 }
      );
    }

    const apiKey = process.env.MITRAL_API_KEY?.trim();
    const baseUrl = process.env.MITRAL_BASE_URL?.trim() || "https://api.mitral.ai";
    const useMock = process.env.USE_MOCK_AI === "true";
    if (!apiKey) {
      console.error("MITRAL_API_KEY is missing");
      return NextResponse.json(
        { answer: "AI is not configured. Missing MITRAL_API_KEY." },
        { status: 500 }
      );
    }

    if (useMock) {
      return NextResponse.json({
        answer:
          "Mock mode: Reefs are stressed by warming seas, pollution, and overfishing. Support reef-safe sunscreen, reduce plastic use, and back marine protected areas.",
      });
    }

    let response: Response;
    try {
      response = await fetch(`${baseUrl}/v1/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: `You are an AI educator for coral reef protection. Answer concisely.\nUser: ${question}\nAI:`,
          max_tokens: 300,
        }),
      });
    } catch (err) {
      console.error("MITRAL fetch failed:", err);
      return NextResponse.json(
        {
          answer:
            "AI service unreachable. Check DNS/network or set USE_MOCK_AI=true.",
          error: err instanceof Error ? err.message : String(err),
        },
        { status: 502 }
      );
    }

    const text = await response.text();
    console.log("MITRAL response status:", response.status);
    console.log("MITRAL response text:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      data = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          answer: "AI service error. Please try again in a moment.",
          error: `MITRAL ${response.status}: ${text.slice(0, 200)}`,
        },
        { status: 502 }
      );
    }

    const answer =
      data?.answer ||
      data?.text ||
      data?.response ||
      text ||
      "No response from AI.";
    return NextResponse.json({ answer });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      {
        answer: "Internal server error.",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
