import { CheckAccessRequest, ApiResponse, CheckAccessResponse, RequestAccessRequest, RequestAccessResponse } from './models/index.js';
export { PathToRequestResponse, checkAccessRequestSchema, checkAccessResponseSchema, requestAccessRequestSchema, requestAccessResponseSchema } from './models/index.js';
export { setRootUrl } from './utils/index.js';
import 'zod';

declare function checkAiPayAccess(apiKey: string, request: CheckAccessRequest): Promise<ApiResponse<CheckAccessResponse>>;

declare function requestAiPayAccess(apiKey: string, request: RequestAccessRequest): Promise<ApiResponse<RequestAccessResponse>>;

export { ApiResponse, CheckAccessRequest, CheckAccessResponse, RequestAccessRequest, RequestAccessResponse, checkAiPayAccess, requestAiPayAccess };
