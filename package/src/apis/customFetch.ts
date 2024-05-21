import { ApiResponse, PathToRequestResponse } from "@/models";
import { constructUrl } from "@/utils/url";

export function customFetch<T extends keyof PathToRequestResponse>(
  apiKey: string,
  path: T,
  request: PathToRequestResponse[T]["request"],
): Promise<ApiResponse<PathToRequestResponse[T]["response"]>> {
  return fetch(constructUrl(path), {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).then((response) => response.json());
}
