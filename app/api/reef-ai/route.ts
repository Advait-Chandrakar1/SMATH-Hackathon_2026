import { NextRequest, NextResponse } from "next/server";
import { reefSeedData } from "@/lib/reefSeed";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { answer: "Please ask a question about reefs." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.ReefGaurdAI?.trim() ||
      process.env.MISTRAL_API_KEY?.trim() ||
      process.env.MITRAL_API_KEY?.trim();
    const baseUrl =
      process.env.MISTRAL_BASE_URL?.trim() ||
      process.env.MITRAL_BASE_URL?.trim() ||
      "https://api.mistral.ai";
    const useMock = process.env.USE_MOCK_AI === "true";

    const reefContext = reefSeedData
      .map((reef) => {
        const issues = reef.issues?.length ? reef.issues.join(", ") : "None";
        return `Reef: ${reef.name}\nDescription: ${reef.description}\nIssues: ${issues}`;
      })
      .join("\n\n");

    const systemPrompt = [
      "You are Reefguard AI, a friendly educator focused on coral reef protection.",
      "Your goal is to spread awareness and give practical, actionable solutions.",
      "Use the reef list below as background context.",
      "If the user mentions a reef or location, tailor advice to that specific place.",
      "Always include 2-4 concrete actions users can take. Keep responses concise, avoid making response very long.",
      "Structure your answer in clear headings and bullet points for easy reading.",
      "Read the user's question carefully and use the reef data to make your answer relevant and specific.",
      "Make sure to not say the same response multiple times, and avoid generic advice that could apply to any reef. Use the data to make it feel personal and actionable.",
      "If you can not find specific information tied to the user's question, use the reef data to provide a relevant answer that still gives them useful information and actions they can take to help reefs in general.",
      "If the user asks help or wants to know what you can do, explain that you can provide quick tips, education, and action steps for protecting coral reefs, and that they can start the assistant to receive guidance tailored to their question.  Don't give them information if they just want to know what you do, only tell them your purpose and how to use you to get information.",
      "Avoid saying 'Here are some reuslts from my database' or 'Based on the data I have', instead, weave the reef information into your answer in a natural way that makes it feel like you are using real knowledge to help them, even if the question is general. The goal is to make it feel like you are providing a personalized and specific answer that connects their question to real reefs and real actions they can take, rather than giving a generic response that could apply to any reef.",
      "If a user poses a question that doesn't relate to reefs, steer them back towards reef-related topics and tell them that we are focused on helping about coral reefs",
      "",
      "Reef context:",
      reefContext,
    ].join("\n");

    const buildLocalAnswer = (input: string) => {
      const query = input.toLowerCase();
      const keywordMap: Record<string, string[]> = {
        "north america": [
          "Florida Keys Reef",
          "Miami Terrace Reef",
          "Mesoamerican Barrier Reef",
          "Belize Barrier Reef",
          "Andros Barrier Reef",
          "Hawaiian Reefs",
        ],
        usa: ["Florida Keys Reef", "Miami Terrace Reef", "Hawaiian Reefs"],
        florida: ["Florida Keys Reef", "Miami Terrace Reef"],
        hawaii: ["Hawaiian Reefs"],
        bahamas: ["Andros Barrier Reef"],
        belize: ["Belize Barrier Reef"],
        mexico: ["Mesoamerican Barrier Reef"],
        guatemala: ["Mesoamerican Barrier Reef"],
        honduras: ["Mesoamerican Barrier Reef"],
        australia: ["Great Barrier Reef", "Ningaloo Reef"],
        philippines: ["Apo Reef", "Tubbataha Reefs"],
        indonesia: ["Raja Ampat", "Bunaken National Marine Park", "Spermonde Reefs"],
        japan: ["Yabiji Reefs"],
        "sri lanka": ["Bar Reef"],
        srilanka: ["Bar Reef"],
        maldives: ["Maldives Atolls"],
        "red sea": ["Red Sea Reef"],
        galapagos: ["Galapagos Reefs"],
        palau: ["Palau Reef"],
        "new caledonia": ["New Caledonia Lagoon"],
        "society islands": ["Society Islands Reefs"],
        "amazon": ["Amazon Reef"],
        norway: ["Røst Reef"],
      };

      const matchedNames = new Set<string>();
      reefSeedData.forEach((reef) => {
        const name = reef.name.toLowerCase();
        const slug = reef.slug.toLowerCase();
        if (query.includes(name) || query.includes(slug.replace(/-/g, " "))) {
          matchedNames.add(reef.name);
        }
      });
      Object.entries(keywordMap).forEach(([keyword, reefs]) => {
        if (query.includes(keyword)) {
          reefs.forEach((reef) => matchedNames.add(reef));
        }
      });

      const matched = reefSeedData.filter((reef) =>
        matchedNames.has(reef.name)
      );

      const hash = (text: string) =>
        text
          .split("")
          .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);

      const pickByHash = (count: number) => {
        const picks: typeof reefSeedData = [];
        const start = hash(query) % reefSeedData.length;
        for (let i = 0; i < reefSeedData.length && picks.length < count; i++) {
          const reef = reefSeedData[(start + i) % reefSeedData.length];
          if (!picks.some((item) => item.slug === reef.slug)) {
            picks.push(reef);
          }
        }
        return picks;
      };

      const list = matched.length ? matched : pickByHash(4);

      const issueActions: Record<string, string[]> = {
        bleaching: [
          "Choose reef-safe sunscreen and avoid touching or standing on coral.",
          "Support climate action and energy-saving choices to reduce heat stress.",
        ],
        "warming seas": [
          "Cut carbon impact where you can and support climate policies.",
          "Visit reefs responsibly to reduce extra stress on heat-stressed corals.",
        ],
        "marine heatwaves": [
          "Support climate action and energy-saving choices.",
          "Avoid activities that physically damage coral during heat events.",
        ],
        pollution: [
          "Reduce plastic waste and dispose of trash properly.",
          "Limit fertilizer use and prevent runoff into waterways.",
        ],
        "runoff pollution": [
          "Limit fertilizer use and prevent runoff into waterways.",
          "Support local clean-water projects and regulations.",
        ],
        "coastal development": [
          "Support sustainable coastal planning and protected zones.",
          "Choose tour operators that follow reef-safe guidelines.",
        ],
        "tourism pressure": [
          "Choose reef-safe tours that limit anchor damage.",
          "Follow no-touch policies and keep a safe distance from wildlife.",
        ],
        "overfishing": [
          "Choose sustainable seafood and respect fishing regulations.",
          "Support marine protected areas and no-take zones.",
        ],
        "illegal fishing": [
          "Support enforcement and community-led reef protection.",
          "Report suspicious activity if you are local or visiting.",
        ],
        "storm damage": [
          "Support local reef restoration and coral nurseries.",
          "Avoid reef contact to give damaged corals time to recover.",
        ],
        "coral disease": [
          "Disinfect gear between dives and follow local reef rules.",
          "Support reef monitoring and restoration efforts.",
        ],
        acidification: [
          "Support emissions reductions and ocean-friendly policies.",
          "Choose sustainable seafood to reduce ecosystem pressure.",
        ],
        "plastic waste": [
          "Use reusables and avoid single-use plastics.",
          "Join or support coastal cleanups.",
        ],
      };

      const topIssues = list.flatMap((reef) => reef.issues || []);
      const actionPool = topIssues.flatMap((issue) => {
        const key = issue.toLowerCase();
        return issueActions[key] || [];
      });
      const baseActions = [
        "Use reef-safe sunscreen and avoid touching or standing on coral.",
        "Reduce plastic waste and runoff (reuse bottles, avoid litter, limit fertilizers).",
        "Support local marine protected areas and responsible tour operators.",
        "Share reef facts and encourage friends to choose reef-friendly products.",
      ];
      const actions = Array.from(new Set([...actionPool, ...baseActions])).slice(
        0,
        4
      );

      const reefNames = list.map((reef) => reef.name).join(", ");
      const intro = matched.length
        ? `Here are reefs tied to your question: ${reefNames}.`
        : `Here are a few reefs from our ReefGuard database: ${reefNames}.`;

      const issueLine = topIssues.length
        ? `Key pressures in these regions include: ${topIssues.join(", ")}.`
        : "These reefs face a mix of climate stress, pollution, and overfishing.";

      return [
        intro,
        issueLine,
        "How you can help:",
        `- ${actions[0]}`,
        `- ${actions[1]}`,
        `- ${actions[2]}`,
        `- ${actions[3]}`,
      ].join("\n");
    };

    const fallbackAnswer = buildLocalAnswer(question);

    if (!apiKey) {
      console.error("MISTRAL_API_KEY is missing");
      return NextResponse.json({ answer: fallbackAnswer });
    }

    if (useMock) {
      return NextResponse.json({ answer: fallbackAnswer });
    }

    let response: Response;
    try {
      response = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.MISTRAL_MODEL?.trim() || "mistral-large-latest",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question },
          ],
          max_tokens: 300,
        }),
      });
    } catch (err) {
      console.error("MITRAL fetch failed:", err);
      return NextResponse.json({
        answer: fallbackAnswer,
        warning: "AI service unreachable. Returned a local response instead.",
      });
    }

    const text = await response.text();
    console.log("MISTRAL response status:", response.status);
    console.log("MISTRAL response text:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      data = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          answer: fallbackAnswer,
          error: `MISTRAL ${response.status}: ${text.slice(0, 200)}`,
        },
        { status: 502 }
      );
    }

    const answer =
      data?.choices?.[0]?.message?.content ||
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
