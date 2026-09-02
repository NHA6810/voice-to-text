import{g as de,E as pe,i as fe,s as me,b as c,d as I,k as b,_ as p,j as t,V as s,l as ve,H as he,f as ge,m as _,n as g,o as Y,S as be,p as xe,q as ye,e as we,u as Ce,X as Ne,v as Ee,w as je,x as Fe,y as A,z as x,A as Se,B as G,D as q,r as B,F as ke,G as Be,J as Te,K as He,M as _e,N as Ae,O as J,P as Pe}from"./vendors.dd6c4e62.js";import{c as h,P as De,t as $,T as ze}from"./common.b8ac4ac0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();var Re=`
/* H5 端隐藏 TabBar 空图标（只隐藏没有 src 的图标） */
.weui-tabbar__icon:not([src]),
.weui-tabbar__icon[src=''] {
  display: none !important;
}

.weui-tabbar__item:has(.weui-tabbar__icon:not([src])) .weui-tabbar__label,
.weui-tabbar__item:has(.weui-tabbar__icon[src='']) .weui-tabbar__label {
  margin-top: 0 !important;
}

/* Vite 错误覆盖层无法选择文本的问题 */
vite-error-overlay {
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-user-select: text !important;
}

vite-error-overlay::part(window) {
  max-width: 90vw;
  padding: 10px;
}

.taro_page {
  overflow: auto;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* H5 导航栏页面自动添加顶部间距 */
body.h5-navbar-visible .taro_page {
  padding-top: 44px;
}

body.h5-navbar-visible .toaster[data-position^="top"] {
  top: 44px !important;
}

/* Sheet 组件在 H5 导航栏下的位置修正 */
body.h5-navbar-visible .sheet-content:not([data-side="bottom"]) {
    top: 44px !important;
}

/*
 * H5 端 rem 适配：与小程序 rpx 缩放一致
 * 375px 屏幕：1rem = 16px，小程序 32rpx = 16px
 */
html {
    font-size: 4vw !important;
}

/* H5 端组件默认样式修复 */
taro-view-core {
    display: block;
}

taro-text-core {
    display: inline;
}

taro-input-core {
    display: block;
    width: 100%;
}

taro-input-core input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
}

taro-input-core.taro-otp-hidden-input input {
    color: transparent;
    caret-color: transparent;
    -webkit-text-fill-color: transparent;
}

/* 全局按钮样式重置 */
taro-button-core,
button {
    margin: 0 !important;
    padding: 0 !important;
    line-height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
}

taro-button-core::after,
button::after {
    border: none;
}

taro-textarea-core > textarea,
.taro-textarea,
textarea.taro-textarea {
    resize: none !important;
}
`,Oe=`
/* PC 宽屏适配 - 基础布局 */
@media (min-width: 769px) {
  html {
    font-size: 15px !important;
  }

  body {
    background-color: #f3f4f6 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    min-height: 100vh !important;
  }
}
`,Le=`
/* PC 宽屏适配 - 手机框样式（有 TabBar 页面） */
@media (min-width: 769px) {
  .taro-tabbar__container {
    width: 375px !important;
    max-width: 375px !important;
    height: calc(100vh - 40px) !important;
    max-height: 900px !important;
    background-color: #fff !important;
    transform: translateX(0) !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    position: relative !important;
  }

  .taro-tabbar__panel {
    height: 100% !important;
    overflow: auto !important;
  }
}

/* PC 宽屏适配 - Toast 定位到手机框范围内 */
@media (min-width: 769px) {
  body .toaster {
    left: 50% !important;
    right: auto !important;
    width: 375px !important;
    max-width: 375px !important;
    transform: translateX(-50%) !important;
    box-sizing: border-box !important;
  }
}

/* PC 宽屏适配 - 手机框样式（无 TabBar 页面，通过 JS 添加 no-tabbar 类） */
@media (min-width: 769px) {
  body.no-tabbar #app {
    width: 375px !important;
    max-width: 375px !important;
    height: calc(100vh - 40px) !important;
    max-height: 900px !important;
    background-color: #fff !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    position: relative !important;
    transform: translateX(0) !important;
  }

  body.no-tabbar #app .taro_router {
    height: 100% !important;
    overflow: auto !important;
  }
}
`;function Ie(){var a=document.createElement("style");a.innerHTML=Re+Oe+Le,document.head.appendChild(a)}function $e(){var a=function(){var n=!!document.querySelector(".taro-tabbar__container");document.body.classList.toggle("no-tabbar",!n)};a();var e=new MutationObserver(a);e.observe(document.body,{childList:!0,subtree:!0})}function Ve(){Ie(),$e()}function Me(){var a=de();if(a===pe.WEAPP)try{var e=fe(),r=e.miniProgram.envVersion;console.log("[Debug] envVersion:",r),r!=="release"&&me({enableDebug:!0})}catch(n){console.error("[Debug] 开启调试模式失败:",n)}}var Ue={visible:!1,title:"",bgColor:"#ffffff",textStyle:"black",navStyle:"default",transparent:"none",leftIcon:"none"},We=function(){var e,r=_();return(r==null||(e=r.config)===null||e===void 0?void 0:e.window)||{}},Xe=function(){var e,r,n=(e=_())===null||e===void 0||(e=e.config)===null||e===void 0?void 0:e.tabBar;return new Set((n==null||(r=n.list)===null||r===void 0?void 0:r.map(function(o){return o.pagePath}))||[])},V=function(){var e,r=_();return(r==null||(e=r.config)===null||e===void 0||(e=e.pages)===null||e===void 0?void 0:e[0])||"pages/index/index"},j=function(e){return e.replace(/^\//,"")},Ye=function(e,r,n,o){if(!e)return"none";var i=j(e),u=j(o),f=i===u,l=r.has(i)||r.has("/".concat(i)),m=n>1;return l||f?"none":m?"back":"home"},Ge=function(){var e=c.useState(Ue),r=I(e,2),n=r[0],o=r[1],i=c.useState(0),u=I(i,2),f=u[0],l=u[1],m=c.useCallback(function(){var d=b.getCurrentPages();if(d.length===0){o(function(ce){return p(p({},ce),{},{visible:!1})});return}var v=d[d.length-1],R=(v==null?void 0:v.route)||"";if(R){var y=(v==null?void 0:v.config)||{},w=We(),N=Xe(),se=V(),E=j(R),O=j(se),le=E===O,ue=N.has(E)||N.has("/".concat(E)),L=N.size<=1&&d.length<=1&&(le||ue);o({visible:!L,title:document.title||y.navigationBarTitleText||w.navigationBarTitleText||"",bgColor:y.navigationBarBackgroundColor||w.navigationBarBackgroundColor||"#ffffff",textStyle:y.navigationBarTextStyle||w.navigationBarTextStyle||"black",navStyle:y.navigationStyle||w.navigationStyle||"default",transparent:y.transparentTitle||w.transparentTitle||"none",leftIcon:L?"none":Ye(E,N,d.length,O)})}},[]);b.useDidShow(function(){m()}),b.usePageScroll(function(d){var v=d.scrollTop;n.transparent==="auto"&&l(Math.min(v/100,1))}),c.useEffect(function(){var d=null,v=new MutationObserver(function(){d&&clearTimeout(d),d=setTimeout(function(){m()},50)});return v.observe(document.head,{subtree:!0,childList:!0,characterData:!0}),m(),function(){v.disconnect(),d&&clearTimeout(d)}},[m]);var k=n.visible&&n.navStyle!=="custom";if(c.useEffect(function(){k?document.body.classList.add("h5-navbar-visible"):document.body.classList.remove("h5-navbar-visible")},[k]),!k)return t.jsx(t.Fragment,{});var z=n.textStyle==="white"?"#fff":"#333",te=n.textStyle==="white"?"text-white":"text-gray-800",ae=function(){return n.transparent==="always"?{backgroundColor:"transparent"}:n.transparent==="auto"?{backgroundColor:n.bgColor,opacity:f}:{backgroundColor:n.bgColor}},oe=function(){return b.navigateBack()},ie=function(){var v=V();b.reLaunch({url:"/".concat(v)})};return t.jsxs(t.Fragment,{children:[t.jsxs(s,{className:"fixed top-0 left-0 right-0 h-11 flex items-center justify-center z-1000",style:ae(),children:[n.leftIcon==="back"&&t.jsx(s,{className:"absolute left-2 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center",onClick:oe,children:t.jsx(ve,{size:24,color:z})}),n.leftIcon==="home"&&t.jsx(s,{className:"absolute left-2 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center",onClick:ie,children:t.jsx(he,{size:22,color:z})}),t.jsx(ge,{className:"text-base font-medium max-w-3/5 truncate ".concat(te),children:n.title})]}),t.jsx(s,{className:"h-11 shrink-0"})]})},qe=function(e){var r=e.children;return t.jsxs(t.Fragment,{children:[t.jsx(Ge,{}),r]})},Je=["className","variant"],Ke=Y("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary hover:bg-opacity-80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary hover:bg-opacity-80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive hover:bg-opacity-80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function T(a){var e=a.className,r=a.variant,n=g(a,Je);return t.jsx(s,p({className:h(Ke({variant:r}),e)},n))}var Qe=["className","variant","size","asChild","disabled"],Ze=Y("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary hover:bg-opacity-90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive hover:bg-opacity-90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary hover:bg-opacity-80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),C=c.forwardRef(function(a,e){var r,n=a.className,o=a.variant,i=a.size;a.asChild;var u=a.disabled,f=g(a,Qe),l=(r=f.tabIndex)!==null&&r!==void 0?r:u?-1:0;return t.jsx(s,p(p({className:h(Ze({variant:o,size:i,className:n}),u&&"opacity-50 pointer-events-none"),ref:e},{tabIndex:l}),{},{hoverClass:u?void 0:"border-ring ring-2 ring-ring ring-offset-2 ring-offset-background"},f))});C.displayName="Button";var er=["className","children"],rr=["className"],nr=["className"],tr=["className"],ar=["className"],or=["className"],P=c.createContext({hasHeader:!1}),K=c.forwardRef(function(a,e){var r=a.className,n=a.children,o=g(a,er),i=c.Children.toArray(n).some(function(u){return c.isValidElement(u)&&u.type.displayName==="CardHeader"});return t.jsx(P.Provider,{value:{hasHeader:i},children:t.jsx(s,p(p({ref:e,className:h("rounded-lg border bg-card text-card-foreground shadow-sm",r)},o),{},{children:n}))})});K.displayName="Card";var Q=c.forwardRef(function(a,e){var r=a.className,n=g(a,rr);return t.jsx(s,p({ref:e,className:h("flex flex-col space-y-2 p-6",r)},n))});Q.displayName="CardHeader";var Z=c.forwardRef(function(a,e){var r=a.className,n=g(a,nr);return t.jsx(s,p({ref:e,className:h("text-2xl font-semibold leading-none tracking-tight",r)},n))});Z.displayName="CardTitle";var ir=c.forwardRef(function(a,e){var r=a.className,n=g(a,tr);return t.jsx(s,p({ref:e,className:h("text-sm text-muted-foreground",r)},n))});ir.displayName="CardDescription";var ee=c.forwardRef(function(a,e){var r=a.className,n=g(a,ar),o=c.useContext(P),i=o.hasHeader;return t.jsx(s,p({ref:e,className:h("p-6",i&&"pt-0",r)},n))});ee.displayName="CardContent";var sr=c.forwardRef(function(a,e){var r=a.className,n=g(a,or),o=c.useContext(P),i=o.hasHeader;return t.jsx(s,p({ref:e,className:h("flex items-center p-6",i&&"pt-0",r)},n))});sr.displayName="CardFooter";var lr=["className","children","orientation"],re=c.forwardRef(function(a,e){var r=a.className,n=a.children,o=a.orientation,i=o===void 0?"vertical":o,u=g(a,lr),f=i==="horizontal"||i==="both",l=i==="vertical"||i==="both";return t.jsx(be,p(p({ref:e,className:h("relative",r),scrollY:l,scrollX:f,style:{overflowX:f?"auto":"hidden",overflowY:l?"auto":"hidden"}},u),{},{children:n}))});re.displayName="ScrollArea";var ur={error:null,report:"",source:"",visible:!1,open:!1,timestamp:""},M="hsl(360, 100%, 45%)",U=!1,F=ur,H=new Set,cr=function(){H.forEach(function(e){return e()})},dr=function(e){return H.add(e),function(){return H.delete(e)}},W=function(){return F},ne=function(e){F=e,cr()},pr=function(){var a=A(x().m(function e(r){var n,o,i,u,f;return x().w(function(l){for(;;)switch(l.p=l.n){case 0:if(typeof window!="undefined"){l.n=1;break}return l.a(2,!1);case 1:if(l.p=1,!((n=navigator.clipboard)!==null&&n!==void 0&&n.writeText)){l.n=3;break}return l.n=2,navigator.clipboard.writeText(r);case 2:return l.a(2,!0);case 3:l.n=5;break;case 4:l.p=4,u=l.v,console.warn("[H5ErrorBoundary] Clipboard API copy failed:",u);case 5:return l.p=5,o=document.createElement("textarea"),o.value=r,o.setAttribute("readonly","true"),o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select(),i=document.execCommand("copy"),document.body.removeChild(o),l.a(2,i);case 6:return l.p=6,f=l.v,console.warn("[H5ErrorBoundary] Fallback copy failed:",f),l.a(2,!1)}},e,null,[[5,6],[1,4]])}));return function(r){return a.apply(this,arguments)}}(),fr=function(e){if(e instanceof Error)return e;if(typeof e=="string")return new Error(e);try{return new Error(JSON.stringify(e))}catch(r){return new Error(String(e))}},mr=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=["[H5 Runtime Error]","Time: ".concat(new Date().toISOString()),r.source?"Source: ".concat(r.source):"","Name: ".concat(e.name),"Message: ".concat(e.message),e.stack?`Stack:
`.concat(e.stack):"",r.componentStack?`Component Stack:
`.concat(r.componentStack):"",typeof navigator!="undefined"?"User Agent: ".concat(navigator.userAgent):""].filter(Boolean);return n.join(`

`)},X=function(e){F.visible&&ne(p(p({},F),{},{open:e}))},D=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(typeof window!="undefined"){var n=fr(e),o=mr(n,r),i=new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"});ne({error:n,report:o,source:r.source||"runtime",timestamp:i,visible:!0,open:!1}),console.error("[H5ErrorOverlay] Showing error overlay:",n,r)}},vr=function(e){var r=e.error||new Error(e.message||"Unknown H5 runtime error");D(r,{source:"window.error"})},hr=function(e){D(e.reason,{source:"window.unhandledrejection"})},gr=function(){typeof window=="undefined"||U||(U=!0,window.addEventListener("error",vr),window.addEventListener("unhandledrejection",hr))},br=function(){var e,r,n=c.useSyncExternalStore(dr,W,W);if(!n.visible)return null;var o=((e=n.error)===null||e===void 0?void 0:e.name)||"Error";return t.jsx(De,{children:t.jsxs(s,{className:"pointer-events-none fixed inset-0 z-[2147483646]",children:[t.jsx(s,{className:"pointer-events-auto fixed bottom-5 left-5",children:t.jsx(C,{variant:"outline",size:"icon",className:h("h-11 w-11 rounded-full shadow-md transition-transform"),style:{backgroundColor:"hsl(359, 100%, 97%)",borderColor:"hsl(359, 100%, 94%)",color:M},onClick:function(){return X(!n.open)},children:t.jsx(we,{size:22,color:M})})}),n.open&&t.jsx(s,{className:"pointer-events-none fixed inset-0 bg-white bg-opacity-15 supports-[backdrop-filter]:backdrop-blur-md",children:t.jsx(s,{className:"absolute inset-0 flex items-center justify-center px-4 py-4",children:t.jsx(s,{className:"w-full max-w-md",style:{width:"min(calc(100vw - 32px), var(--h5-phone-width, 390px))",height:"min(calc(100vh - 32px), 900px)"},children:t.jsx(K,{className:h("pointer-events-auto h-full rounded-2xl border border-border bg-background text-foreground shadow-2xl"),children:t.jsxs(s,{className:"relative flex h-full flex-col",children:[t.jsxs(Q,{className:"gap-2 p-4 pb-2",children:[t.jsxs(s,{className:"flex items-start justify-between gap-3",children:[t.jsxs(s,{className:"flex flex-wrap items-center gap-2",children:[t.jsx(T,{variant:"destructive",className:"border-none bg-red-500 px-3 py-1 text-xs font-medium text-white",children:"Runtime Error"}),t.jsx(T,{variant:"outline",className:"px-3 py-1 text-xs",children:n.source})]}),t.jsxs(s,{className:"flex shrink-0 items-center gap-1",children:[t.jsx(C,{variant:"ghost",size:"icon",className:"h-8 w-8 rounded-full",onClick:function(){return window.location.reload()},children:t.jsx(Ce,{size:15,color:"inherit"})}),t.jsx(C,{variant:"ghost",size:"icon",className:"h-8 w-8 rounded-full",onClick:function(){return X(!1)},children:t.jsx(Ne,{size:17,color:"inherit"})})]})]}),t.jsxs(s,{className:"flex items-center justify-between gap-3",children:[t.jsx(Z,{className:"text-left text-lg",children:o}),t.jsxs(C,{variant:"outline",size:"sm",className:"shrink-0 rounded-lg",onClick:function(){var i=A(x().m(function f(){var l;return x().w(function(m){for(;;)switch(m.n){case 0:return m.n=1,pr(n.report);case 1:if(l=m.v,!l){m.n=2;break}return $.success("已复制错误信息",{description:"可发送给 Agent 进行自动修复",position:"top-center"}),m.a(2);case 2:$.warning("复制失败",{description:"请直接选中文本后手动复制。",position:"top-center"});case 3:return m.a(2)}},f)}));function u(){return i.apply(this,arguments)}return u}(),children:[t.jsx(Ee,{size:15,color:"inherit"}),t.jsx(s,{children:"复制错误"})]})]})]}),t.jsx(ee,{className:"min-h-0 flex-1 overflow-hidden px-4 pb-4 pt-2",children:t.jsxs(s,{className:"flex h-full min-h-0 flex-col gap-2",children:[t.jsxs(s,{className:"flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-border px-3 py-2 text-sm",children:[t.jsxs(s,{className:"flex items-center gap-2",children:[t.jsx(s,{className:"text-muted-foreground",children:"Error"}),t.jsx(s,{className:"font-medium text-foreground",children:((r=n.error)===null||r===void 0?void 0:r.name)||"Error"})]}),t.jsx(s,{className:"h-4 w-px bg-border"}),t.jsxs(s,{className:"flex items-center gap-2",children:[t.jsx(s,{className:"text-muted-foreground",children:"Source"}),t.jsx(s,{className:"font-medium text-foreground",children:n.source})]})]}),t.jsxs(s,{className:"min-h-0 flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-black text-white",children:[t.jsxs(s,{className:"flex items-center justify-between border-b border-white border-opacity-10 px-3 py-3",children:[t.jsx(s,{className:"text-xs font-medium uppercase tracking-wide text-zinc-400",children:"Full Report"}),t.jsx(T,{variant:"outline",className:"border-zinc-700 bg-transparent px-2 py-1 text-xs text-zinc-400",children:n.timestamp})]}),t.jsx(re,{className:"min-h-0 flex-1 w-full",orientation:"both",children:t.jsx(s,{className:"inline-block min-w-full whitespace-pre px-3 py-3 pb-8 font-mono text-xs leading-6 text-zinc-200",children:n.report})})]})]})})]})})})})})]})})},xr=function(a){function e(){var r;je(this,e);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return r=Fe(this,e,[].concat(o)),r.state={error:null},r}return xe(e,a),ye(e,[{key:"componentDidUpdate",value:function(n){this.state.error&&n.children!==this.props.children&&this.setState({error:null})}},{key:"componentDidCatch",value:function(n,o){D(n,{source:"React Error Boundary",componentStack:o.componentStack||""})}},{key:"render",value:function(){return t.jsxs(t.Fragment,{children:[t.jsx(br,{}),this.state.error?null:this.props.children]})}}],[{key:"getDerivedStateFromError",value:function(n){return{error:n}}}])}(c.Component),yr=function(e){var r=e.children;return t.jsx(xr,{children:r})},wr=function(e){var r=e.children;return gr(),b.useLaunch(function(){Me(),Ve()}),t.jsx(yr,{children:t.jsx(qe,{children:r})})},Cr=function(e){var r=e.children;return t.jsxs(Se,{defaultColor:"#000",defaultSize:24,children:[t.jsx(wr,{children:r}),t.jsx(ze,{})]})},S=G.__taroAppConfig={router:{mode:"hash"},pages:["pages/index/index"],window:{backgroundTextStyle:"light",navigationBarBackgroundColor:"#fff",navigationBarTitleText:"语音转文字",navigationBarTextStyle:"black"}};S.routes=[Object.assign({path:"pages/index/index",load:function(){var a=A(x().m(function r(n,o){var i;return x().w(function(u){for(;;)switch(u.n){case 0:return u.n=1,Pe(()=>import("./index.056171f0.js"),["./index.056171f0.js","./vendors.dd6c4e62.js","../css/vendors.8886af03.css","./common.b8ac4ac0.js","../css/index.e3b0c442.css"],import.meta.url);case 1:return i=u.v,u.a(2,[i,n,o])}},r)}));function e(r,n){return a.apply(this,arguments)}return e}()},{navigationBarTitleText:"语音转文字",pageOrientation:"auto"})];Object.assign(q,{findDOMNode:B.findDOMNode,render:B.render,unstable_batchedUpdates:B.unstable_batchedUpdates});ke();var Nr=Be(Cr,J,q,S),Er=Te({window:G});He(S);_e(Er,Nr,S,J);Ae({designWidth:750,deviceRatio:{375:2,640:1.17,750:1,828:.905},baseFontSize:20,unitPrecision:void 0,targetUnit:void 0});
