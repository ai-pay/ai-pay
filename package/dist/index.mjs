import { c } from './chunk-NWCGICRI.mjs';

function r(e,t,a){return c(this,null,function*(){try{return (yield fetch(`https://api.ai-pay.dev${a}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},cache:"no-cache",body:JSON.stringify(t)})).json()}catch(o){return {success:!1,errorReason:"FETCH_ERROR",debugMessage:o.message}}})}function i(e,t){return r(e,t,"/check-access")}function u(e,t){return r(e,t,"/ai/image-generation")}

export { i as checkAccess, u as imageGeneration };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map