var m=Object.defineProperty,n=Object.defineProperties;var o=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var i=(c,b,a)=>b in c?m(c,b,{enumerable:!0,configurable:!0,writable:!0,value:a}):c[b]=a,r=(c,b)=>{for(var a in b||(b={}))p.call(b,a)&&i(c,a,b[a]);if(h)for(var a of h(b))q.call(b,a)&&i(c,a,b[a]);return c},s=(c,b)=>n(c,o(b));var t=(c,b,a)=>new Promise((j,g)=>{var k=d=>{try{e(a.next(d));}catch(f){g(f);}},l=d=>{try{e(a.throw(d));}catch(f){g(f);}},e=d=>d.done?j(d.value):Promise.resolve(d.value).then(k,l);e((a=a.apply(c,b)).next());});

export { r as a, s as b, t as c };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-NWCGICRI.mjs.map