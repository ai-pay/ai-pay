import { C as CheckAccessRequest, a as CheckAccessResponse, I as ImageGenerationRequest, b as ImageGenerationResponse } from './imageGeneration-11635e80.js';
import 'zod';

declare function checkAccess(apiKey: string, request: CheckAccessRequest): Promise<CheckAccessResponse>;

declare function imageGeneration(apiKey: string, request: ImageGenerationRequest): Promise<ImageGenerationResponse>;

export { checkAccess, imageGeneration };
