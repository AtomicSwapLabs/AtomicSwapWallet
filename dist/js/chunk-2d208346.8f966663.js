(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d208346"],{a496:function(e,t,n){"use strict";n.r(t),n.d(t,"Overlay",(function(){return yt}));var o=n("9ab4");function i(e){var t=e.getBoundingClientRect();return{width:t.width,height:t.height,top:t.top,right:t.right,bottom:t.bottom,left:t.left,x:t.left,y:t.top}}function r(e){if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function a(e){var t=r(e),n=t.pageXOffset,o=t.pageYOffset;return{scrollLeft:n,scrollTop:o}}function s(e){var t=r(e).Element;return e instanceof t||e instanceof Element}function l(e){var t=r(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function c(e){var t=r(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function p(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function d(e){return e!==r(e)&&l(e)?p(e):a(e)}function h(e){return e?(e.nodeName||"").toLowerCase():null}function u(e){return((s(e)?e.ownerDocument:e.document)||window.document).documentElement}function f(e){return i(u(e)).left+a(e).scrollLeft}function m(e){return r(e).getComputedStyle(e)}function v(e){var t=m(e),n=t.overflow,o=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+i+o)}function y(e,t,n){void 0===n&&(n=!1);var o=u(t),r=i(e),a=l(t),s={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(a||!a&&!n)&&(("body"!==h(t)||v(o))&&(s=d(t)),l(t)?(c=i(t),c.x+=t.clientLeft,c.y+=t.clientTop):o&&(c.x=f(o))),{x:r.left+s.scrollLeft-c.x,y:r.top+s.scrollTop-c.y,width:r.width,height:r.height}}function g(e){return{x:e.offsetLeft,y:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight}}function b(e){return"html"===h(e)?e:e.assignedSlot||e.parentNode||e.host||u(e)}function w(e){return["html","body","#document"].indexOf(h(e))>=0?e.ownerDocument.body:l(e)&&v(e)?e:w(b(e))}function O(e,t){void 0===t&&(t=[]);var n=w(e),o="body"===h(n),i=r(n),a=o?[i].concat(i.visualViewport||[],v(n)?n:[]):n,s=t.concat(a);return o?s:s.concat(O(b(a)))}function x(e){return["table","td","th"].indexOf(h(e))>=0}function T(e){if(!l(e)||"fixed"===m(e).position)return null;var t=e.offsetParent;if(t){var n=u(t);if("body"===h(t)&&"static"===m(t).position&&"static"!==m(n).position)return n}return t}function E(e){var t=b(e);while(l(t)&&["html","body"].indexOf(h(t))<0){var n=m(t);if("none"!==n.transform||"none"!==n.perspective||n.willChange&&"auto"!==n.willChange)return t;t=t.parentNode}return null}function C(e){var t=r(e),n=T(e);while(n&&x(n)&&"static"===m(n).position)n=T(n);return n&&"body"===h(n)&&"static"===m(n).position?t:n||E(e)||t}var j="top",A="bottom",P="right",k="left",L="auto",M=[j,A,P,k],D="start",R="end",S="clippingParents",F="viewport",W="popper",q="reference",z=M.reduce((function(e,t){return e.concat([t+"-"+D,t+"-"+R])}),[]),H=[].concat(M,[L]).reduce((function(e,t){return e.concat([t,t+"-"+D,t+"-"+R])}),[]),I="beforeRead",N="read",B="afterRead",U="beforeMain",K="main",_="afterMain",V="beforeWrite",$="write",X="afterWrite",Y=[I,N,B,U,K,_,V,$,X];function J(e){var t=new Map,n=new Set,o=[];function i(e){n.add(e.name);var r=[].concat(e.requires||[],e.requiresIfExists||[]);r.forEach((function(e){if(!n.has(e)){var o=t.get(e);o&&i(o)}})),o.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||i(e)})),o}function G(e){var t=J(e);return Y.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}function Q(e){var t;return function(){return t||(t=new Promise((function(n){Promise.resolve().then((function(){t=void 0,n(e())}))}))),t}}function Z(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign(Object.assign(Object.assign({},n),t),{},{options:Object.assign(Object.assign({},n.options),t.options),data:Object.assign(Object.assign({},n.data),t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}var ee={placement:"bottom",modifiers:[],strategy:"absolute"};function te(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"===typeof e.getBoundingClientRect)}))}function ne(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,o=void 0===n?[]:n,i=t.defaultOptions,r=void 0===i?ee:i;return function(e,t,n){void 0===n&&(n=r);var i={placement:"bottom",orderedModifiers:[],options:Object.assign(Object.assign({},ee),r),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],l=!1,c={state:i,setOptions:function(n){d(),i.options=Object.assign(Object.assign(Object.assign({},r),i.options),n),i.scrollParents={reference:s(e)?O(e):e.contextElement?O(e.contextElement):[],popper:O(t)};var a=G(Z([].concat(o,i.options.modifiers)));return i.orderedModifiers=a.filter((function(e){return e.enabled})),p(),c.update()},forceUpdate:function(){if(!l){var e=i.elements,t=e.reference,n=e.popper;if(te(t,n)){i.rects={reference:y(t,C(n),"fixed"===i.options.strategy),popper:g(n)},i.reset=!1,i.placement=i.options.placement,i.orderedModifiers.forEach((function(e){return i.modifiersData[e.name]=Object.assign({},e.data)}));for(var o=0;o<i.orderedModifiers.length;o++)if(!0!==i.reset){var r=i.orderedModifiers[o],a=r.fn,s=r.options,p=void 0===s?{}:s,d=r.name;"function"===typeof a&&(i=a({state:i,options:p,name:d,instance:c})||i)}else i.reset=!1,o=-1}}},update:Q((function(){return new Promise((function(e){c.forceUpdate(),e(i)}))})),destroy:function(){d(),l=!0}};if(!te(e,t))return c;function p(){i.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,o=void 0===n?{}:n,r=e.effect;if("function"===typeof r){var s=r({state:i,name:t,instance:c,options:o}),l=function(){};a.push(s||l)}}))}function d(){a.forEach((function(e){return e()})),a=[]}return c.setOptions(n).then((function(e){!l&&n.onFirstUpdate&&n.onFirstUpdate(e)})),c}}var oe={passive:!0};function ie(e){var t=e.state,n=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,l=void 0===s||s,c=r(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",n.update,oe)})),l&&c.addEventListener("resize",n.update,oe),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",n.update,oe)})),l&&c.removeEventListener("resize",n.update,oe)}}var re={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:ie,data:{}};function ae(e){return e.split("-")[0]}function se(e){return e.split("-")[1]}function le(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ce(e){var t,n=e.reference,o=e.element,i=e.placement,r=i?ae(i):null,a=i?se(i):null,s=n.x+n.width/2-o.width/2,l=n.y+n.height/2-o.height/2;switch(r){case j:t={x:s,y:n.y-o.height};break;case A:t={x:s,y:n.y+n.height};break;case P:t={x:n.x+n.width,y:l};break;case k:t={x:n.x-o.width,y:l};break;default:t={x:n.x,y:n.y}}var c=r?le(r):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case D:t[c]=Math.floor(t[c])-Math.floor(n[p]/2-o[p]/2);break;case R:t[c]=Math.floor(t[c])+Math.ceil(n[p]/2-o[p]/2);break;default:}}return t}function pe(e){var t=e.state,n=e.name;t.modifiersData[n]=ce({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}var de={name:"popperOffsets",enabled:!0,phase:"read",fn:pe,data:{}},he={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ue(e){var t=e.x,n=e.y,o=window,i=o.devicePixelRatio||1;return{x:Math.round(t*i)/i||0,y:Math.round(n*i)/i||0}}function fe(e){var t,n=e.popper,o=e.popperRect,i=e.placement,a=e.offsets,s=e.position,l=e.gpuAcceleration,c=e.adaptive,p=ue(a),d=p.x,h=p.y,f=a.hasOwnProperty("x"),m=a.hasOwnProperty("y"),v=k,y=j,g=window;if(c){var b=C(n);b===r(n)&&(b=u(n)),i===j&&(y=A,h-=b.clientHeight-o.height,h*=l?1:-1),i===k&&(v=P,d-=b.clientWidth-o.width,d*=l?1:-1)}var w,O=Object.assign({position:s},c&&he);return l?Object.assign(Object.assign({},O),{},(w={},w[y]=m?"0":"",w[v]=f?"0":"",w.transform=(g.devicePixelRatio||1)<2?"translate("+d+"px, "+h+"px)":"translate3d("+d+"px, "+h+"px, 0)",w)):Object.assign(Object.assign({},O),{},(t={},t[y]=m?h+"px":"",t[v]=f?d+"px":"",t.transform="",t))}function me(e){var t=e.state,n=e.options,o=n.gpuAcceleration,i=void 0===o||o,r=n.adaptive,a=void 0===r||r,s={placement:ae(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign(Object.assign({},t.styles.popper),fe(Object.assign(Object.assign({},s),{},{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign(Object.assign({},t.styles.arrow),fe(Object.assign(Object.assign({},s),{},{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1})))),t.attributes.popper=Object.assign(Object.assign({},t.attributes.popper),{},{"data-popper-placement":t.placement})}var ve={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:me,data:{}};function ye(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},i=t.elements[e];l(i)&&h(i)&&(Object.assign(i.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))}function ge(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],i=t.attributes[e]||{},r=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]),a=r.reduce((function(e,t){return e[t]="",e}),{});l(o)&&h(o)&&(Object.assign(o.style,a),Object.keys(i).forEach((function(e){o.removeAttribute(e)})))}))}}var be={name:"applyStyles",enabled:!0,phase:"write",fn:ye,effect:ge,requires:["computeStyles"]},we=[re,de,ve,be],Oe={left:"right",right:"left",bottom:"top",top:"bottom"};function xe(e){return e.replace(/left|right|bottom|top/g,(function(e){return Oe[e]}))}var Te={start:"end",end:"start"};function Ee(e){return e.replace(/start|end/g,(function(e){return Te[e]}))}function Ce(e){var t=r(e),n=u(e),o=t.visualViewport,i=n.clientWidth,a=n.clientHeight,s=0,l=0;return o&&(i=o.width,a=o.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=o.offsetLeft,l=o.offsetTop)),{width:i,height:a,x:s+f(e),y:l}}function je(e){var t=u(e),n=a(e),o=e.ownerDocument.body,i=Math.max(t.scrollWidth,t.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),r=Math.max(t.scrollHeight,t.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),s=-n.scrollLeft+f(e),l=-n.scrollTop;return"rtl"===m(o||t).direction&&(s+=Math.max(t.clientWidth,o?o.clientWidth:0)-i),{width:i,height:r,x:s,y:l}}function Ae(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&c(n)){var o=t;do{if(o&&e.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function Pe(e){return Object.assign(Object.assign({},e),{},{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function ke(e){var t=i(e);return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}function Le(e,t){return t===F?Pe(Ce(e)):l(t)?ke(t):Pe(je(u(e)))}function Me(e){var t=O(b(e)),n=["absolute","fixed"].indexOf(m(e).position)>=0,o=n&&l(e)?C(e):e;return s(o)?t.filter((function(e){return s(e)&&Ae(e,o)&&"body"!==h(e)})):[]}function De(e,t,n){var o="clippingParents"===t?Me(e):[].concat(t),i=[].concat(o,[n]),r=i[0],a=i.reduce((function(t,n){var o=Le(e,n);return t.top=Math.max(o.top,t.top),t.right=Math.min(o.right,t.right),t.bottom=Math.min(o.bottom,t.bottom),t.left=Math.max(o.left,t.left),t}),Le(e,r));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Re(){return{top:0,right:0,bottom:0,left:0}}function Se(e){return Object.assign(Object.assign({},Re()),e)}function Fe(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function We(e,t){void 0===t&&(t={});var n=t,o=n.placement,r=void 0===o?e.placement:o,a=n.boundary,l=void 0===a?S:a,c=n.rootBoundary,p=void 0===c?F:c,d=n.elementContext,h=void 0===d?W:d,f=n.altBoundary,m=void 0!==f&&f,v=n.padding,y=void 0===v?0:v,g=Se("number"!==typeof y?y:Fe(y,M)),b=h===W?q:W,w=e.elements.reference,O=e.rects.popper,x=e.elements[m?b:h],T=De(s(x)?x:x.contextElement||u(e.elements.popper),l,p),E=i(w),C=ce({reference:E,element:O,strategy:"absolute",placement:r}),k=Pe(Object.assign(Object.assign({},O),C)),L=h===W?k:E,D={top:T.top-L.top+g.top,bottom:L.bottom-T.bottom+g.bottom,left:T.left-L.left+g.left,right:L.right-T.right+g.right},R=e.modifiersData.offset;if(h===W&&R){var z=R[r];Object.keys(D).forEach((function(e){var t=[P,A].indexOf(e)>=0?1:-1,n=[j,A].indexOf(e)>=0?"y":"x";D[e]+=z[n]*t}))}return D}function qe(e,t){void 0===t&&(t={});var n=t,o=n.placement,i=n.boundary,r=n.rootBoundary,a=n.padding,s=n.flipVariations,l=n.allowedAutoPlacements,c=void 0===l?H:l,p=se(o),d=p?s?z:z.filter((function(e){return se(e)===p})):M,h=d.filter((function(e){return c.indexOf(e)>=0}));0===h.length&&(h=d);var u=h.reduce((function(t,n){return t[n]=We(e,{placement:n,boundary:i,rootBoundary:r,padding:a})[ae(n)],t}),{});return Object.keys(u).sort((function(e,t){return u[e]-u[t]}))}function ze(e){if(ae(e)===L)return[];var t=xe(e);return[Ee(e),t,Ee(t)]}function He(e){var t=e.state,n=e.options,o=e.name;if(!t.modifiersData[o]._skip){for(var i=n.mainAxis,r=void 0===i||i,a=n.altAxis,s=void 0===a||a,l=n.fallbackPlacements,c=n.padding,p=n.boundary,d=n.rootBoundary,h=n.altBoundary,u=n.flipVariations,f=void 0===u||u,m=n.allowedAutoPlacements,v=t.options.placement,y=ae(v),g=y===v,b=l||(g||!f?[xe(v)]:ze(v)),w=[v].concat(b).reduce((function(e,n){return e.concat(ae(n)===L?qe(t,{placement:n,boundary:p,rootBoundary:d,padding:c,flipVariations:f,allowedAutoPlacements:m}):n)}),[]),O=t.rects.reference,x=t.rects.popper,T=new Map,E=!0,C=w[0],M=0;M<w.length;M++){var R=w[M],S=ae(R),F=se(R)===D,W=[j,A].indexOf(S)>=0,q=W?"width":"height",z=We(t,{placement:R,boundary:p,rootBoundary:d,altBoundary:h,padding:c}),H=W?F?P:k:F?A:j;O[q]>x[q]&&(H=xe(H));var I=xe(H),N=[];if(r&&N.push(z[S]<=0),s&&N.push(z[H]<=0,z[I]<=0),N.every((function(e){return e}))){C=R,E=!1;break}T.set(R,N)}if(E)for(var B=f?3:1,U=function(e){var t=w.find((function(t){var n=T.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return C=t,"break"},K=B;K>0;K--){var _=U(K);if("break"===_)break}t.placement!==C&&(t.modifiersData[o]._skip=!0,t.placement=C,t.reset=!0)}}var Ie={name:"flip",enabled:!0,phase:"main",fn:He,requiresIfExists:["offset"],data:{_skip:!1}};function Ne(e){return"x"===e?"y":"x"}function Be(e,t,n){return Math.max(e,Math.min(t,n))}function Ue(e){var t=e.state,n=e.options,o=e.name,i=n.mainAxis,r=void 0===i||i,a=n.altAxis,s=void 0!==a&&a,l=n.boundary,c=n.rootBoundary,p=n.altBoundary,d=n.padding,h=n.tether,u=void 0===h||h,f=n.tetherOffset,m=void 0===f?0:f,v=We(t,{boundary:l,rootBoundary:c,padding:d,altBoundary:p}),y=ae(t.placement),b=se(t.placement),w=!b,O=le(y),x=Ne(O),T=t.modifiersData.popperOffsets,E=t.rects.reference,L=t.rects.popper,M="function"===typeof m?m(Object.assign(Object.assign({},t.rects),{},{placement:t.placement})):m,R={x:0,y:0};if(T){if(r){var S="y"===O?j:k,F="y"===O?A:P,W="y"===O?"height":"width",q=T[O],z=T[O]+v[S],H=T[O]-v[F],I=u?-L[W]/2:0,N=b===D?E[W]:L[W],B=b===D?-L[W]:-E[W],U=t.elements.arrow,K=u&&U?g(U):{width:0,height:0},_=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Re(),V=_[S],$=_[F],X=Be(0,E[W],K[W]),Y=w?E[W]/2-I-X-V-M:N-X-V-M,J=w?-E[W]/2+I+X+$+M:B+X+$+M,G=t.elements.arrow&&C(t.elements.arrow),Q=G?"y"===O?G.clientTop||0:G.clientLeft||0:0,Z=t.modifiersData.offset?t.modifiersData.offset[t.placement][O]:0,ee=T[O]+Y-Z-Q,te=T[O]+J-Z,ne=Be(u?Math.min(z,ee):z,q,u?Math.max(H,te):H);T[O]=ne,R[O]=ne-q}if(s){var oe="x"===O?j:k,ie="x"===O?A:P,re=T[x],ce=re+v[oe],pe=re-v[ie],de=Be(ce,re,pe);T[x]=de,R[x]=de-re}t.modifiersData[o]=R}}var Ke={name:"preventOverflow",enabled:!0,phase:"main",fn:Ue,requiresIfExists:["offset"]};function _e(e){var t,n=e.state,o=e.name,i=n.elements.arrow,r=n.modifiersData.popperOffsets,a=ae(n.placement),s=le(a),l=[k,P].indexOf(a)>=0,c=l?"height":"width";if(i&&r){var p=n.modifiersData[o+"#persistent"].padding,d=g(i),h="y"===s?j:k,u="y"===s?A:P,f=n.rects.reference[c]+n.rects.reference[s]-r[s]-n.rects.popper[c],m=r[s]-n.rects.reference[s],v=C(i),y=v?"y"===s?v.clientHeight||0:v.clientWidth||0:0,b=f/2-m/2,w=p[h],O=y-d[c]-p[u],x=y/2-d[c]/2+b,T=Be(w,x,O),E=s;n.modifiersData[o]=(t={},t[E]=T,t.centerOffset=T-x,t)}}function Ve(e){var t=e.state,n=e.options,o=e.name,i=n.element,r=void 0===i?"[data-popper-arrow]":i,a=n.padding,s=void 0===a?0:a;null!=r&&("string"!==typeof r||(r=t.elements.popper.querySelector(r),r))&&Ae(t.elements.popper,r)&&(t.elements.arrow=r,t.modifiersData[o+"#persistent"]={padding:Se("number"!==typeof s?s:Fe(s,M))})}var $e={name:"arrow",enabled:!0,phase:"main",fn:_e,effect:Ve,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Xe(e,t,n){var o=ae(e),i=[k,j].indexOf(o)>=0?-1:1,r="function"===typeof n?n(Object.assign(Object.assign({},t),{},{placement:e})):n,a=r[0],s=r[1];return a=a||0,s=(s||0)*i,[k,P].indexOf(o)>=0?{x:s,y:a}:{x:a,y:s}}function Ye(e){var t=e.state,n=e.options,o=e.name,i=n.offset,r=void 0===i?[0,0]:i,a=H.reduce((function(e,n){return e[n]=Xe(n,t.rects,r),e}),{}),s=a[t.placement],l=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=c),t.modifiersData[o]=a}var Je={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Ye};function Ge(e){if(!e.state.styles||!e.state.styles.arrow)return;let t;switch(e.state.placement){case"bottom":case"bottom-start":case"bottom-end":t=180;break;case"top":case"top-start":case"top-end":return;case"left":case"left-start":case"left-end":t=270;break;case"right":case"right-start":case"right-end":t=90;break;default:return}e.state.styles.arrow.transform+=` rotate(${t}deg)`,e.state.styles.arrow.marginLeft="0",e.state.styles.arrow.marginTop="0"}const Qe={name:"computeArrowRotateStyles",enabled:!0,phase:"beforeWrite",requiresIfExists:["arrow"],fn:Ge,data:{}};var Ze={name:"maxSize",enabled:!0,phase:"main",requiresIfExists:["offset","preventOverflow","flip"],fn:function(e){var t=e.state,n=e.name,o=e.options,i=We(t,o),r=t.modifiersData.preventOverflow||{x:0,y:0},a=r.x,s=r.y,l=t.rects.popper,c=l.width,p=l.height,d=t.placement.split("-"),h=d[0],u="left"===h?"left":"right",f="top"===h?"top":"bottom";t.modifiersData[n]={width:c-i[u]-a,height:p-i[f]-s}}},et=Ze;const tt=ne({defaultModifiers:[...we,Ie,Ke,$e,Je,Qe]}),nt=new WeakMap,ot={name:"applyMaxSize",enabled:!0,phase:"beforeWrite",requires:["maxSize"],fn({state:e}){const{height:t}=e.modifiersData.maxSize;nt.has(e.elements.popper)||nt.set(e.elements.popper,e.rects.popper.height);const n=nt.get(e.elements.popper),o=t<n,i=o?t+"px":"";e.styles.popper.maxHeight=i,e.styles.popper.height=i}};var it=n("0906"),rt=n("ccf1");const at=it["b"]`
@keyframes spOverlayFadeIn{0%{opacity:0;transform:var(--sp-overlay-from)}to{opacity:1;transform:translate(0)}}@keyframes spOverlayFadeOut{0%{opacity:1;transform:translate(0)}to{opacity:0;transform:var(--sp-overlay-from)}}:host{z-index:1000;position:absolute;display:inline-block;pointer-events:none}#contents,sp-theme{height:100%}#contents{display:inline-block;pointer-events:none;animation-duration:var(--spectrum-global-animation-duration-200,.16s);animation-timing-function:var(--spectrum-global-animation-ease-out,ease-out);opacity:1;visibility:visible}:host([data-popper-placement*=top]) #contents{--sp-overlay-from:translateY(var(--spectrum-global-dimension-size-75))}:host([data-popper-placement*=right]) #contents{--sp-overlay-from:translateX(calc(-1*var(--spectrum-global-dimension-size-75)))}:host([data-popper-placement*=bottom]) #contents{--sp-overlay-from:translateY(calc(-1*var(--spectrum-global-dimension-size-75)))}:host([data-popper-placement*=left]) #contents{--sp-overlay-from:translateX(var(--spectrum-global-dimension-size-75))}:host([animating]) ::slotted(*){pointer-events:none}#contents ::slotted(*){position:relative}
`;var st=at;const lt={initial:"idle",states:{idle:{on:{active:"active"}},active:{on:{visible:"visible",hiding:"hiding",idle:"idle"}},visible:{on:{hiding:"hiding",idle:"idle"}},hiding:{on:{dispose:"dispose"}},dispose:{on:{disposed:"disposed"}},disposed:{on:{}}}},ct=(e,t)=>e?t&&lt.states[e].on[t]||e:lt.initial;class pt extends it["a"]{constructor(){super(),this.originalSlot=null,this._state=ct(),this.animating=!1,this.tabbingAway=!1,this.offset=6,this.interaction="hover",this.positionAnimationFrame=0,this.handleInlineTriggerKeydown=e=>{const{code:t,shiftKey:n}=e;if("Tab"===t){if(n)return this.tabbingAway=!0,void this.dispatchEvent(new Event("close"));e.stopPropagation(),e.preventDefault(),this.focus()}},this.stealOverlayContentPromise=Promise.resolve(),this.stealOverlayContentPromise=new Promise(e=>this.stealOverlayContentResolver=e)}get state(){return this._state}set state(e){const t=ct(this.state,e);t!==this.state&&(this._state=t,"active"===this.state||"visible"===this.state||"hiding"===this.state?this.setAttribute("state",this.state):this.removeAttribute("state"))}focus(){const e=this.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');e?(e.focus(),this.removeAttribute("tabindex")):super.focus()}get hasTheme(){return!!this.color||!!this.scale}static get styles(){return[st]}feature(){this.tabIndex=0,"modal"===this.interaction&&(this.slot="open")}obscure(){"modal"===this.interaction&&this.removeAttribute("slot")}firstUpdated(e){super.firstUpdated(e),this.overlayContent&&(this.stealOverlayContent(this.overlayContent),this.overlayContent&&this.trigger&&this.shadowRoot&&(this.placement&&"none"!==this.placement&&(this.popper=tt(this.trigger,this,{placement:this.placement,modifiers:[et,ot,{name:"arrow",options:{element:this.overlayContentTip}},{name:"offset",options:{offset:[0,this.offset]}}]})),this.state="active",document.addEventListener("sp-update-overlays",()=>{this.updateOverlayPosition(),this.state="visible"}),this.feature(),this.updateOverlayPosition().then(()=>this.applyContentAnimation("spOverlayFadeIn")).then(()=>{this.receivesFocus&&this.focus()})))}updateOverlayPopperPlacement(){this.overlayContent&&(this.dataPopperPlacement?this.overlayContent.setAttribute("placement",this.dataPopperPlacement):this.originalPlacement?this.overlayContent.setAttribute("placement",this.originalPlacement):this.overlayContent.removeAttribute("placement"))}updated(e){e.has("dataPopperPlacement")&&this.updateOverlayPopperPlacement()}open(e){this.extractDetail(e)}extractDetail(e){this.overlayContent=e.content,this.overlayContentTip=e.contentTip,this.trigger=e.trigger,this.placement=e.placement,this.offset=e.offset,this.interaction=e.interaction,this.color=e.theme.color,this.scale=e.theme.scale,this.receivesFocus=e.receivesFocus}dispose(){"dispose"===this.state&&(this.timeout&&(clearTimeout(this.timeout),delete this.timeout),this.popper&&(this.popper.destroy(),this.popper=void 0),this.returnFocusElement&&(this.returnFocusElement.remove(),this.trigger.removeEventListener("keydown",this.handleInlineTriggerKeydown)),this.returnOverlayContent(),this.state="disposed")}stealOverlayContent(e){if(this.placeholder||!e)return;this.placeholder||(this.placeholder=document.createComment("placeholder for "+e.nodeName));const t=e.parentElement||e.getRootNode();t&&t.replaceChild(this.placeholder,e),this.overlayContent=e,this.originalSlot=this.overlayContent.getAttribute("slot"),this.overlayContent.setAttribute("slot","overlay"),this.appendChild(this.overlayContent),this.originalPlacement=this.overlayContent.getAttribute("placement"),this.stealOverlayContentResolver()}returnOverlayContent(){if(this.overlayContent){if(this.originalSlot?(this.overlayContent.setAttribute("slot",this.originalSlot),delete this.originalSlot):this.overlayContent.removeAttribute("slot"),this.placeholder){const e=this.placeholder.parentElement||this.placeholder.getRootNode();e&&(e.replaceChild(this.overlayContent,this.placeholder),this.overlayContent.dispatchEvent(new Event("sp-overlay-closed")))}this.originalPlacement&&(this.overlayContent.setAttribute("placement",this.originalPlacement),delete this.originalPlacement),delete this.placeholder}}async updateOverlayPosition(){this.popper&&await this.popper.update()}async hide(e=!0){this.state="hiding",e&&await this.applyContentAnimation("spOverlayFadeOut"),this.state="dispose"}schedulePositionUpdate(){cancelAnimationFrame(this.positionAnimationFrame),this.positionAnimationFrame=requestAnimationFrame(()=>this.updateOverlayPosition())}onSlotChange(){this.schedulePositionUpdate()}connectedCallback(){super.connectedCallback(),this.schedulePositionUpdate()}applyContentAnimation(e){return new Promise((t,n)=>{if(!this.shadowRoot)return void n();const o=this.shadowRoot.querySelector("#contents"),i=n=>{e===n.animationName&&(o.removeEventListener("animationend",i),o.removeEventListener("animationcancel",i),this.animating=!1,t("animationcancel"===n.type))};o.addEventListener("animationend",i),o.addEventListener("animationcancel",i),o.style.animationName=e,this.animating=!0})}renderTheme(e){const{color:t,scale:n}=this;return it["c"]`
            <sp-theme color=${Object(rt["a"])(t)} scale=${Object(rt["a"])(n)}>
                ${e}
            </sp-theme>
        `}render(){const e=it["c"]`
            <div id="contents">
                <slot @slotchange=${this.onSlotChange} name="overlay"></slot>
            </div>
        `;return this.hasTheme?this.renderTheme(e):e}static create(e){const t=new pt;return e.content&&t.open(e),t}async _getUpdateComplete(){await super._getUpdateComplete(),await this.stealOverlayContentPromise}}Object(o["a"])([Object(it["d"])()],pt.prototype,"_state",void 0),Object(o["a"])([Object(it["d"])({reflect:!0,type:Boolean})],pt.prototype,"animating",void 0),Object(o["a"])([Object(it["d"])({reflect:!0})],pt.prototype,"placement",void 0),Object(o["a"])([Object(it["d"])({attribute:!1})],pt.prototype,"color",void 0),Object(o["a"])([Object(it["d"])({attribute:!1})],pt.prototype,"receivesFocus",void 0),Object(o["a"])([Object(it["d"])({attribute:!1})],pt.prototype,"scale",void 0),Object(o["a"])([Object(it["d"])({attribute:"data-popper-placement"})],pt.prototype,"dataPopperPlacement",void 0);const dt=1e3,ht=1e3;class ut{constructor(e={}){this.warmUpDelay=dt,this.coolDownDelay=ht,this.isWarm=!1,this.cooldownTimeout=0,this.timeout=0,Object.assign(this,e)}async openTimer(e){if(this.cancelCooldownTimer(),this.component&&e.isSameNode(this.component)){if(this.promise)return this.promise;throw new Error("Inconsistent state")}return this.component&&(this.close(this.component),this.cancelCooldownTimer()),this.component=e,!this.isWarm&&(this.promise=new Promise(e=>{this.resolve=e,this.timeout=window.setTimeout(()=>{this.resolve&&(this.resolve(!1),this.isWarm=!0)},this.warmUpDelay)}),this.promise)}close(e){this.component&&this.component.isSameNode(e)&&(this.resetCooldownTimer(),this.timeout>0&&(clearTimeout(this.timeout),this.timeout=0),this.resolve&&(this.resolve(!0),delete this.resolve),delete this.promise,delete this.component)}resetCooldownTimer(){this.isWarm&&(this.cooldownTimeout&&window.clearTimeout(this.cooldownTimeout),this.cooldownTimeout=window.setTimeout(()=>{this.isWarm=!1,delete this.cooldownTimeout},this.coolDownDelay))}cancelCooldownTimer(){this.cooldownTimeout&&window.clearTimeout(this.cooldownTimeout),delete this.cooldownTimeout}}function ft(e){return 0===e.button}function mt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}customElements.define("active-overlay",pt);class vt{constructor(){this.overlays=[],this.preventMouseRootClose=!1,this.root=document.body,this.handlingResize=!1,this.overlayTimer=new ut,this.canTabTrap=!0,this.handleMouseCapture=e=>{const t=this.topOverlay;if(e.target&&t&&t.overlayContent&&!mt(e)&&ft(e)){if(e.target instanceof Node){const n=e.composedPath();if(n.indexOf(t.overlayContent)>=0)return void(this.preventMouseRootClose=!0);this.preventMouseRootClose=!1}}else this.preventMouseRootClose=!0},this.handleMouse=()=>{this.preventMouseRootClose||this.closeTopOverlay()},this.handleKeyUp=e=>{if("Escape"===e.code){const e=this.topOverlay;this.closeTopOverlay(),e&&e.trigger.focus()}},this.handleResize=()=>{this.handlingResize||(this.handlingResize=!0,requestAnimationFrame(async()=>{const e=this.overlays.map(e=>e.updateOverlayPosition());await Promise.all(e),this.handlingResize=!1}))},this.addEventListeners(),this.initTabTrapping()}initTabTrapping(){if(this.document.body.shadowRoot)return void(this.canTabTrap=!1);if(this.document.body.attachShadow({mode:"open"}),!this.document.body.shadowRoot)return;const e=this.document.body.shadowRoot;e.innerHTML='\n            <div id="actual"><slot></slot></div>\n            <style>\n            #actual {\n                position: relative;\n                height: 100%;\n                z-index: 0;\n                min-height: 100vh;\n            }\n            #holder {\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                flex-flow: column;\n                height: 100%;\n                width: 100%;\n                top: 0;\n                left: 0;\n                position: fixed;\n            }\n            #holder[hidden] {\n                display: none !important;\n            }\n            #actual[tabindex="-1"] {\n                pointer-events: none;  /* just in case? */\n            }\n            </style>\n            <div id="holder" hidden><slot name="open"></slot></div>\n        ',this.tabTrapper=e.querySelector("#actual"),this.overlayHolder=e.querySelector("#holder"),this.tabTrapper.attachShadow({mode:"open"}),this.tabTrapper.shadowRoot&&(this.tabTrapper.shadowRoot.innerHTML="<slot></slot>")}startTabTrapping(){this.canTabTrap&&(this.tabTrapper.tabIndex=-1,this.overlayHolder.hidden=!1)}stopTabTrapping(){this.canTabTrap&&(this.tabTrapper.removeAttribute("tabindex"),this.overlayHolder.hidden=!0)}get document(){return this.root.ownerDocument||document}get topOverlay(){return this.overlays.slice(-1)[0]}findOverlayForContent(e){for(const t of this.overlays)if(e.isSameNode(t.overlayContent))return t}addEventListeners(){this.document.addEventListener("click",this.handleMouseCapture,!0),this.document.addEventListener("click",this.handleMouse),this.document.addEventListener("keyup",this.handleKeyUp),window.addEventListener("resize",this.handleResize)}isClickOverlayActiveForTrigger(e){return this.overlays.some(t=>e.isSameNode(t.trigger)&&"click"===t.interaction)}async openOverlay(e){if(this.findOverlayForContent(e.content))return!1;if("modal"===e.interaction&&this.startTabTrapping(),e.delayed){const t=this.overlayTimer.openTimer(e.content),n=await t;if(n)return t}if("click"===e.interaction)this.closeAllHoverOverlays();else if("hover"===e.interaction&&this.isClickOverlayActiveForTrigger(e.trigger))return!0;if(this.overlays.length){const e=this.overlays[this.overlays.length-1];e.obscure()}const t=pt.create(e);return document.body.appendChild(t),new Promise(e=>requestAnimationFrame(e)).then(async()=>(this.overlays.push(t),await t.updateComplete,this.addOverlayEventListeners(t),"auto"===e.receivesFocus&&t.focus(),!1))}addOverlayEventListeners(e){switch(e.addEventListener("close",()=>{this.hideAndCloseOverlay(e)}),e.interaction){case"replace":this.addReplaceOverlayEventListeners(e);break;case"inline":this.addInlineOverlayEventListeners(e);break}}addReplaceOverlayEventListeners(e){e.addEventListener("keydown",t=>{const{code:n}=t;"Tab"===n&&(t.stopPropagation(),this.closeOverlay(e.overlayContent),e.tabbingAway=!0,e.trigger.focus(),e.trigger.dispatchEvent(new KeyboardEvent("keydown",t)))})}addInlineOverlayEventListeners(e){e.returnFocusElement||(e.returnFocusElement=document.createElement("span"),e.returnFocusElement.tabIndex=-1,e.trigger.hasAttribute("slot")&&(e.returnFocusElement.slot=e.trigger.slot),e.trigger.insertAdjacentElement("afterend",e.returnFocusElement)),e.trigger.addEventListener("keydown",e.handleInlineTriggerKeydown),e.addEventListener("keydown",t=>{const{code:n,shiftKey:o}=t;"Tab"===n&&(e.tabbingAway=!0,o&&e.returnFocusElement?e.returnFocusElement.focus():(t.stopPropagation(),this.closeOverlay(e.overlayContent),e.trigger.focus()))})}closeOverlay(e){this.overlayTimer.close(e),requestAnimationFrame(()=>{const t=this.findOverlayForContent(e);this.hideAndCloseOverlay(t)})}closeAllHoverOverlays(){for(const e of this.overlays)"hover"===e.interaction&&this.hideAndCloseOverlay(e,!1)}async hideAndCloseOverlay(e,t){if(e){if(await e.hide(t),"dispose"!=e.state)return;e.remove(),e.dispose();const n=this.overlays.indexOf(e);if(n>=0&&this.overlays.splice(n,1),this.overlays.length){const e=this.overlays[this.overlays.length-1];e.feature(),"modal"===e.interaction?e.focus():this.stopTabTrapping()}else this.stopTabTrapping(),"modal"!==e.interaction&&("replace"!==e.interaction&&"inline"!==e.interaction||e.tabbingAway)||e.trigger.focus(),e.tabbingAway=!1}}closeTopOverlay(){return this.hideAndCloseOverlay(this.topOverlay)}}class yt{constructor(e,t,n){this.isOpen=!1,this.owner=e,this.overlayElement=n,this.interaction=t}static async open(e,t,n,o){const i=new yt(e,t,n);return await i.open(o),()=>{i.close()}}static update(){const e=new CustomEvent("sp-update-overlays",{bubbles:!0,composed:!0,cancelable:!0});document.dispatchEvent(e)}async open({delayed:e,offset:t=0,placement:n="top",receivesFocus:o}){if(this.isOpen)return!0;void 0===e&&(e=this.overlayElement.hasAttribute("delayed"));const i={color:void 0,scale:void 0},r=new CustomEvent("sp-query-theme",{bubbles:!0,composed:!0,detail:i,cancelable:!0});this.owner.dispatchEvent(r);const a={},s=new CustomEvent("sp-overlay-query",{bubbles:!0,composed:!0,detail:a,cancelable:!0});return this.overlayElement.dispatchEvent(s),await yt.overlayStack.openOverlay(Object.assign({content:this.overlayElement,contentTip:a.overlayContentTipElement,delayed:e,offset:t,placement:n,trigger:this.owner,interaction:this.interaction,theme:i,receivesFocus:o},a)),this.isOpen=!0,!0}close(){yt.overlayStack.closeOverlay(this.overlayElement)}}yt.overlayStack=new vt}}]);
//# sourceMappingURL=chunk-2d208346.8f966663.js.map