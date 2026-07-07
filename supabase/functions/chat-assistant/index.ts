import { streamText, convertToModelMessages, type UIMessage } from "npm:ai@^5";
import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible@^1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the friendly virtual assistant for Heartland Mental Health Services, a 100% virtual psychiatric practice.

Tone: warm, empathetic, calm, reassuring, and concise (2-4 short sentences typically).

Key facts:
- Fully virtual (telehealth only) — no physical office; the mailing address is admin only. Do NOT give directions or share maps.
- Services include psychiatric evaluations, medication management, and mental health support for adults.
- To book: direct users to the "Request Appointment" button, or the phone number (520) 595-5709.
- We accept many major insurances; users can check the insurance section on the site.

Boundaries (very important):
- You are NOT a therapist and cannot diagnose, prescribe, or provide medical advice.
- If someone is in crisis or mentions suicide/self-harm, gently urge them to call or text 988 (Suicide & Crisis Lifeline) or 911 immediately.
- Do not collect PHI (protected health information). If they share symptoms in detail, kindly suggest scheduling with a provider.
- Never promise specific outcomes or medications.

Always end availability answers by inviting them to request an appointment.`;

const gateway = createOpenAICompatible({
  name: "lovable-ai",
  baseURL: "https://ai.gateway.lovable.dev/v1",
  headers: { "Lovable-API-Key": Deno.env.get("LOVABLE_API_KEY") ?? "" },
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const result = streamText({
      model: gateway("google/gemini-3-flash-preview"),
      system: SYSTEM_PROMPT,
      messages: convertToModelMessages(messages),
    });
    return result.toUIMessageStreamResponse({ headers: corsHeaders });
  } catch (err) {
    console.error("chat-assistant error", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
