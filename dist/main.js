var main;(()=>{var e={236:e=>{self,e.exports=(()=>{"use strict";var e={d:(t,s)=>{for(var n in s)e.o(s,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:s[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function s(e={}){return e=>{}}function n(e={}){return(t,s,n)=>{t[s].madoiConfig_=e}}e.r(t),e.d(t,{ShareClass:()=>s,Share:()=>n,Madoi:()=>o});class o{constructor(e,t="",s={}){this.connecting=!1,this.selfPeerId=null,this.currentSenderPeerId=null,this.connectionConfig={type:"ConnectionConfig",body:s},this.objectConfigs=[],this.methodConfigs=[],this.sharedObjects=[],this.sharedFunctions=[],this.promises={},this.changedObjects=new Set,this.handlers={};let n=null;if(e.match(/^wss?:\/\//))n=e+`?key=${t}`;else{const s=document.querySelector("script[src$='madoi.js']").src.split("/",5);n=`${("http:"==s[0]?"ws:":"wss:")+"//"+s[2]+"/"+s[3]}/${e}?key=${t}`}this.ws=new WebSocket(n),this.ws.onopen=e=>this.handleOnOpen(e),this.ws.onclose=e=>this.handleOnClose(e),this.ws.onerror=e=>this.handleOnError(e),this.ws.onmessage=e=>this.handleOnMessage(e),setInterval((()=>{this.saveStates()}),1e4)}getCurrentSenderPeerId(){return this.currentSenderPeerId}isSelfCall(){return this.currentSenderPeerId==this.selfPeerId}close(){var e;null===(e=this.ws)||void 0===e||e.close()}sendConfigs(){if(this.connecting&&this.ws){this.connectionConfig&&(this.ws.send(JSON.stringify(this.connectionConfig)),this.connectionConfig=null);for(const e of this.objectConfigs)this.ws.send(JSON.stringify(e));this.objectConfigs=[];for(const e of this.methodConfigs)this.ws.send(JSON.stringify(e));this.methodConfigs=[]}}handleOnOpen(e){this.connecting=!0,this.sendConfigs(),this.onOpen(e)}handleOnClose(e){console.debug(`websocket closed because: ${e.reason}.`),this.connecting=!1,this.onClose(e),this.ws=null}handleOnError(e){this.onError(e)}handleOnMessage(e){var t=JSON.parse(e.data);this.currentSenderPeerId=t.sender,this.data(t)}data(e){if("EnterRoom"==e.type){if(this.selfPeerId=e.peerId,this.onEnterRoom(e.peerId,e.peers),e.histories)for(const t of e.histories)this.data(t)}else if("LeaveRoom"==e.type)this.onLeaveRoom();else if("PeerJoin"==e.type)this.onPeerJoin(e.peerId);else if("PeerLeave"==e.type)this.onPeerLeave(e.peerId);else if("Invocation"==e.type){const t=this.sharedFunctions[e.methodIndex];if(t){const s=this.applyInvocation(t,e.args);s instanceof Promise&&s.then((()=>{this.promises[e.methodIndex].resolve.apply(null,arguments)})).catch((()=>{this.promises[e.methodIndex].reject.apply(null,arguments)}))}else this.onElse(e)}else if("ObjectState"==e.type){const t=this.sharedObjects[e.objectIndex];t&&t.setState(e.state)}else{const t=e;this.handlers[t.type]?this.handlers[t.type](t):this.onElse(t)}}onOpen(e){}onClose(e){}onError(e){}onElse(e){}onEnterRoom(e,t){}onLeaveRoom(){}onPeerJoin(e){}onPeerLeave(e){}send(e,t,s){this.ws&&this.ws.send(JSON.stringify({type:e,headers:s,body:t}))}share(e,t,s){if(!this.ws)return e;const n=this.sharedFunctions.length,o={type:"MethodConfig",methodIndex:n,maxLog:0,sharingType:"SHARE_PROCESS"};t&&(t.maxLog&&(o.maxLog=t.maxLog),t.type&&("afterExec"==t.type||"execAndSend"==t.type?o.sharingType="SHARE_RESULT":o.sharingType="SHARE_PROCESS"));const i=o.sharingType;this.methodConfigs.push(o),this.sendConfigs(),this.sharedFunctions.push(e),this.promises[n]={},this.promises[n].promise=new Promise(((e,t)=>{this.promises[n].resolve=e,this.promises[n].reject=t}));const r=this;return function(){if(null!=r.ws){let t=null;return"SHARE_RESULT"==i&&(t=e.apply(null,arguments)),r.ws.send(JSON.stringify({type:"Invocation",methodIndex:n,objextIndex:s,args:Array.from(arguments)})),null!=t?t:r.promises[n].promise}if(e)return e.apply(null,arguments)}}shareObject(e,t=[],s={}){if(!this.ws)return;Object.getOwnPropertyNames(e.__proto__).forEach((n=>{if(!e[n].madoiConfig_)return;let o=!1;for(let s of t)if(s===e[n]){o=!0;break}o||(t.push(e[n]),console.debug(`add method ${n} from @Share decorator.`)),s.methods||(s.methods={});const i=s.methods;i[n]||(i[n]={});const r=i[n];for(let t in e[n].madoiConfig_)r[t]||(r[t]=e[n].madoiConfig_[t],console.debug(`add config ${n}[${t}]=${e[n].madoiConfig_[t]} from @Share decorator`))}));const n=this.sharedObjects.length,o=[];this.sharedObjects.push(e);const i="function"==typeof e.getState&&"function"==typeof e.setState;for(let r of t){const t=this.sharedFunctions.length;o.push(t);const h=s&&s.methods&&s.methods[r.name],a=this.share(r.bind(e),h?s.methods[r.name]:null,n),c=this;e[r.name]=function(){return i&&c.changedObjects.add(n),a.apply(null,arguments)}}this.objectConfigs.push({type:"ObjectConfig",objectIndex:n,methodIndices:o,config:s}),this.sendConfigs()}saveStates(){if(this.ws){for(const e of this.changedObjects)this.ws.send(JSON.stringify({type:"ObjectState",objectIndex:e,state:this.sharedObjects[e].getState()}));this.changedObjects.clear()}}applyInvocation(e,t){return e.apply(null,t)}}return t})()}},t={};function s(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,s),i.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{"use strict";s.r(n);var e=s(236);class t{constructor(e,t,s,n){this.nameInput=document.querySelector(t),this.messageInput=document.querySelector(s),this.logDiv=document.querySelector(n),document.querySelector(e).addEventListener("submit",(e=>{e.preventDefault();const t=this.nameInput.value.trim(),s=this.messageInput.value.trim();return 0==s.length||(this.messageInput.value="",this.send(t,s)),!1}))}send(e,t){const s=document.createElement("span");s.append(e+": "+t),this.logDiv.append(s),this.logDiv.append(document.createElement("br")),this.logDiv.scrollTop=this.logDiv.scrollHeight}}(function(e,t,s,n){var o,i=arguments.length,r=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,s,n);else for(var h=e.length-1;h>=0;h--)(o=e[h])&&(r=(i<3?o(r):i>3?o(t,s,r):o(t,s))||r);i>3&&r&&Object.defineProperty(t,s,r)})([(0,e.Share)()],t.prototype,"send",null),window.addEventListener("load",(function(){new e.Madoi("wss://fungo.kcg.edu/madoi-20210702/rooms/chat-o3i4falskdjj").shareObject(new t("#chatForm","#nameInputText","#chatInputText","#chatLogDiv"))}))})(),main=n})();