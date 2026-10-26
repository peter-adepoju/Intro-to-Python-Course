// Python Atlas tutor: a Supabase Edge Function that answers learners' questions
// with a free-tier language model. Gemini is tried first; an OpenAI-compatible
// provider (e.g. Groq or OpenRouter free models) is used as a fallback if set.
//
// Secrets (Supabase: Edge Functions → Secrets):
//   GEMINI_API_KEY      from Google AI Studio (free tier)
//   GEMINI_MODEL        optional, default "gemini-flash-lite-latest"
//   FALLBACK_API_URL    optional, e.g. https://api.groq.com/openai/v1/chat/completions
//   FALLBACK_API_KEY    optional
//   FALLBACK_MODEL      optional, a model name from that provider's list
//   DAILY_LIMIT         optional, questions per learner per day (default 40)
// SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are provided automatically.
import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM = `You are the tutor inside Python Atlas, a course that takes complete beginners to senior Python engineers.
How you help:
- Teach; don't do the work. For exercises, give the smallest useful hint first, or ask a guiding question. Only show a full solution if the learner explicitly asks for it after trying, and then explain it line by line.
- Match the learner's level: use only ideas from their current lesson or earlier unless they ask. Plain, friendly words; short paragraphs; British spelling.
- When they share an error, explain what the error type means, point to the line, and say what to check — in one or two sentences each.
- Encourage the course's tools: "press X-ray and watch line N", "predict the output before running", "trace the variables by hand".
- Code examples are short, use Python 3, and go in fenced code blocks.
- Stay on programming, Python, computer science and studying. Politely decline anything else.
- Never claim to have run code. If unsure, say so and suggest how they can test it.`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

type Msg = { role: "user" | "assistant"; content: string };
const clip = (s: unknown, n: number) => String(s ?? "").slice(0, n);

async function gemini(system: string, messages: Msg[]): Promise<string> {
  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) throw new Error("no gemini key");
  const model = Deno.env.get("GEMINI_MODEL") || "gemini-flash-lite-latest";
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
      generationConfig: { temperature: 0.4, maxOutputTokens: 900 },
    }),
  });
  if (!res.ok) throw new Error(`gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";
  if (!text) throw new Error("gemini returned no text");
  return text;
}

async function fallback(system: string, messages: Msg[]): Promise<string> {
  const url = Deno.env.get("FALLBACK_API_URL"), key = Deno.env.get("FALLBACK_API_KEY"), model = Deno.env.get("FALLBACK_MODEL");
  if (!url || !key || !model) throw new Error("no fallback configured");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, temperature: 0.4, max_tokens: 900, messages: [{ role: "system", content: system }, ...messages] }),
  });
  if (!res.ok) throw new Error(`fallback ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || "";
  if (!text) throw new Error("fallback returned no text");
  return text;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Use POST." }, 405);

  // Who is asking? Only signed-in learners may use the tutor.
  const auth = req.headers.get("Authorization") || "";
  const userClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: auth } },
  });
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return json({ error: "Please sign in to use the tutor." }, 401);

  // Fair use: a daily limit per learner.
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const limit = Number(Deno.env.get("DAILY_LIMIT") || 40);
  const { data: count, error: bumpErr } = await admin.rpc("tutor_bump", { uid: user.id });
  if (bumpErr) return json({ error: "The tutor isn't set up correctly (usage table missing)." }, 500);
  if ((count as number) > limit) {
    return json({ error: `You've reached today's limit of ${limit} tutor questions. It resets tomorrow — meanwhile, try X-ray and a hand trace; they solve most problems.` }, 429);
  }

  let body: { messages?: Msg[]; context?: Record<string, string> };
  try { body = await req.json(); } catch { return json({ error: "Bad request." }, 400); }
  const messages = (body.messages || []).slice(-12)
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({ role: m.role, content: clip(m.content, 4000) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") return json({ error: "No question." }, 400);

  const c = body.context || {};
  const context = [
    c.lesson && `The learner is on: ${clip(c.lesson, 200)}.`,
    c.task && `The task they're working on:\n${clip(c.task, 1500)}`,
    c.code && `Their code:\n\`\`\`python\n${clip(c.code, 4000)}\n\`\`\``,
    c.error && `The error they got:\n${clip(c.error, 1500)}`,
    c.output && `Output before the error:\n${clip(c.output, 800)}`,
  ].filter(Boolean).join("\n\n");
  const system = context ? `${SYSTEM}\n\nContext for this question (from the course, not from the learner):\n${context}` : SYSTEM;

  for (const provider of [gemini, fallback]) {
    try {
      return json({ reply: await provider(system, messages) });
    } catch (e) {
      console.warn(String(e));
    }
  }
  return json({ error: "The tutor is busy right now (the free service may be at its limit). Please try again later." }, 503);
});
