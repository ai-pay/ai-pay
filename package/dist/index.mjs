export { c as checkAccessRequestSchema, d as checkAccessResponseSchema, a as requestAccessRequestSchema, b as requestAccessResponseSchema } from './chunk-ISO73I7Y.mjs';
import { b } from './chunk-MKBUK54J.mjs';
export { a as setRootUrl } from './chunk-MKBUK54J.mjs';
import { c } from './chunk-NWCGICRI.mjs';

function t(s,r,e){return fetch(b(r),{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(n=>n.json())}function i(s,r){return c(this,null,function*(){try{return yield t(s,"/api/access/check",r)}catch(e){return {error:"Failed to check access",debugError:e instanceof Error?e.message:void 0}}})}function p(s,r){return c(this,null,function*(){try{return yield t(s,"/api/access/request",r)}catch(e){return {error:"Failed to request access",debugError:e instanceof Error?e.message:void 0}}})}

export { i as checkAiPayAccess, p as requestAiPayAccess };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map