'use strict';

var i=(e,t,o)=>new Promise((s,p)=>{var m=r=>{try{n(o.next(r));}catch(c){p(c);}},h=r=>{try{n(o.throw(r));}catch(c){p(c);}},n=r=>r.done?s(r.value):Promise.resolve(r.value).then(m,h);n((o=o.apply(e,t)).next());});function a(e,t,o){return i(this,null,function*(){try{return (yield fetch(`https://api.ai-pay.dev${o}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},cache:"no-cache",body:JSON.stringify(t)})).json()}catch(s){return {success:!1,errorReason:"FETCH_ERROR",debugMessage:s.message}}})}function y(e,t){return a(e,t,"/check-access")}function R(e,t){return a(e,t,"/ai/image-generation")}

exports.checkAccess = y;
exports.imageGeneration = R;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map