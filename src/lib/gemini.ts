// Server-side Gemini API wrapper.
// Returns a mock response when GEMINI_API_KEY is absent.

import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are ARIA (Advanced Reasoning Intelligence Assistant), the AI module embedded in a senior software engineer's portfolio terminal. You operate in a cyberpunk command-line environment.

Your personality:
- Highly technical, precise, and concise
- Uses terminal/hacker aesthetic in responses
- References the engineer's actual projects when relevant (NeuralOS, PhantomGrid, CipherVault, FluxPipeline, GhostAuth, TerraForm AI)
- Outputs formatted text suitable for a terminal (no markdown headers, use ASCII borders sparingly)
- Keeps answers under 200 words unless a longer answer is explicitly requested
- Signs off responses with "[ARIA v2.4 — SYSTEM NOMINAL]"

The engineer's background: Principal software engineer specializing in distributed systems, AI integration, security/cryptography, and high-performance computing. 7 years of experience.`;

const MOCK_RESPONSE = `> ARIA OFFLINE — API key not configured.
> Running in mock mode.

[MOCK] Query received. In production, this terminal connects to Google Gemini
to provide intelligent, context-aware responses about my projects, skills,
and engineering philosophy.

Configure GEMINI_API_KEY in .env.local to enable live AI responses.

[ARIA v2.4 — SYSTEM MOCK MODE]`;

let genAI: GoogleGenAI | null = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

export async function queryGemini(userPrompt: string): Promise<string> {
  if (!genAI) {
    return MOCK_RESPONSE;
  }

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    });

    return response.text ?? "[ARIA] No response generated.";
  } catch (err) {
    console.error("[Gemini] API Error:", err);
    return `[ARIA] Connection error: ${err instanceof Error ? err.message : "Unknown error"}\n[ARIA v2.4 — SYSTEM ERROR]`;
  }
}
