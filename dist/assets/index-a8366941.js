import{_ as p,I as g,m as s,F as d,a as y,R as n}from"./antd-ed4826b3.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();var i={},m=p;i.createRoot=m.createRoot,i.hydrateRoot=m.hydrateRoot;var w=Object.defineProperty,h=(a,r)=>{for(var t in r)w(a,t,{get:r[t],enumerable:!0})},_={};h(_,{convertFileSrc:()=>E,invoke:()=>f,transformCallback:()=>u});function v(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function u(a,r=!1){let t=v(),c=`_${t}`;return Object.defineProperty(window,c,{value:e=>(r&&Reflect.deleteProperty(window,c),a==null?void 0:a(e)),writable:!1,configurable:!0}),t}async function f(a,r={}){return new Promise((t,c)=>{let e=u(l=>{t(l),Reflect.deleteProperty(window,`_${o}`)},!0),o=u(l=>{c(l),Reflect.deleteProperty(window,`_${e}`)},!0);window.__TAURI_IPC__({cmd:a,callback:e,error:o,...r})})}function E(a,r="asset"){let t=encodeURIComponent(a);return navigator.userAgent.includes("Windows")?`https://${r}.localhost/${t}`:`${r}://localhost/${t}`}const b="/assets/renewable-energy-340ca7ff.png";const R=g.Search;function P(){s.useMessage();const[a]=d.useForm(),r=y.useCallback(async()=>{const t="https://git.zhonganinfo.com/za/sky-web.git",c="/Users/fangyi/ZA/cloneDoc";try{await f("clone",{url:t,path:c}),s.success("项目已开始下载")}catch(e){console.error(e),s.error("下载失败")}},[]);return n.createElement("div",{className:"container"},n.createElement("h1",null,"Develop Powner"),n.createElement("div",{className:"logo"},n.createElement("a",{target:"_blank"},n.createElement("img",{src:b,className:"logo",alt:"logo"}))),n.createElement("p",null,"自动下载应用模版工具"),n.createElement("div",{className:"row"},n.createElement(d,{form:a,onSubmit:t=>{t.preventDefault(),greet()}},n.createElement(R,{addonBefore:n.createElement("span",{style:{background:"white"}},"https://"),placeholder:"请输入git地址",allowClear:!0,enterButton:"下载",size:"large",onSearch:r}))))}i.createRoot(document.getElementById("root")).render(n.createElement(n.StrictMode,null,n.createElement(P,null)));