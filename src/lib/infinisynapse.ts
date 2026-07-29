const INFINISYNAPSE_API_URL = process.env.INFINISYNAPSE_API_URL || "https://api.infiniSynapse.com/v1";
const INFINISYNAPSE_API_KEY = process.env.INFINISYNAPSE_API_KEY || "";
const INFINISYNAPSE_MODEL = process.env.INFINISYNAPSE_MODEL || "infiniSynapse-large";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface InfiniSynapseResponse {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message: string };
}

export async function callInfiniSynapse(
  messages: ChatMessage[],
  options?: { temperature?: number; maxTokens?: number; timeoutMs?: number }
): Promise<string> {
  const { temperature = 0.7, maxTokens = 4096, timeoutMs = 55000 } = options || {};
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${INFINISYNAPSE_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${INFINISYNAPSE_API_KEY}`,
      },
      body: JSON.stringify({
        model: INFINISYNAPSE_MODEL,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`InfiniSynapse API error ${response.status}: ${errorBody}`);
    }

    const data: InfiniSynapseResponse = await response.json();
    if (data.error) throw new Error(`InfiniSynapse API error: ${data.error.message}`);

    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("InfiniSynapse returned empty response");
    return content;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("请求超时：本次实验变量过于复杂，世界模型未能完成运行。");
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}