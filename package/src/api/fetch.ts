import { PathToObjectMapper } from "@/models";

export async function typedFetch<P extends keyof PathToObjectMapper>(
  apiKey: string,
  request: PathToObjectMapper[P]["request"],
  path: P,
): Promise<PathToObjectMapper[P]["response"]> {
  try {
    const response = await fetch(`https://api.ai-pay.dev${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      cache: "no-cache",
      body: JSON.stringify(request),
    });

    return response.json() as Promise<PathToObjectMapper[P]["response"]>;
  } catch (error) {
    return {
      success: false,
      errorReason: "FETCH_ERROR",
      debugMessage: (error as { message: string }).message,
    };
  }
}
