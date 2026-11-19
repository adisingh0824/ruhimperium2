var Gm=Object.defineProperty;var Um=(r,e,t)=>e in r?Gm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var G=(r,e,t)=>Um(r,typeof e!="symbol"?e+"":e,t);const Hm=()=>{};var $l={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gC=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},jm=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],B=r[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|B&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},mC={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,B=o?r[s+1]:0,u=s+2<r.length,c=u?r[s+2]:0,h=i>>2,C=(i&3)<<4|B>>4;let d=(B&15)<<2|c>>6,E=c&63;u||(E=64,o||(d=64)),n.push(t[h],t[C],t[d],t[E])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(gC(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):jm(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],B=s<r.length?t[r.charAt(s)]:0;++s;const c=s<r.length?t[r.charAt(s)]:64;++s;const C=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||B==null||c==null||C==null)throw new Jm;const d=i<<2|B>>4;if(n.push(d),c!==64){const E=B<<4&240|c>>2;if(n.push(E),C!==64){const D=c<<6&192|C;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Jm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qm=function(r){const e=gC(r);return mC.encodeByteArray(e,!0)},Go=function(r){return qm(r).replace(/\./g,"")},EC=function(r){try{return mC.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Km(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zm=()=>Km().__FIREBASE_DEFAULTS__,Wm=()=>{if(typeof process>"u"||typeof $l>"u")return;const r=$l.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},$m=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&EC(r[1]);return e&&JSON.parse(e)},da=()=>{try{return Hm()||zm()||Wm()||$m()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},_C=r=>{var e,t;return(t=(e=da())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},DC=r=>{const e=_C(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},wC=()=>{var r;return(r=da())==null?void 0:r.config},IC=r=>{var e;return(e=da())==null?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yC{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TC(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[Go(JSON.stringify(t)),Go(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Qm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(st())}function Ym(){var e;const r=(e=da())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Xm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function AC(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Zm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function eE(){const r=st();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function tE(){return!Ym()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function RC(){try{return typeof indexedDB=="object"}catch{return!1}}function vC(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}function nE(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE="FirebaseError";class Gt extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=rE,Object.setPrototypeOf(this,Gt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Mr.prototype.create)}}class Mr{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?sE(i,n):"Error",B=`${this.serviceName}: ${o} (${s}).`;return new Gt(s,B,n)}}function sE(r,e){try{let t=0,n="";for(;t<r.length;){const s=r.indexOf("{$",t);if(s===-1){n+=r.substring(t);break}const i=r.indexOf("}",s+2);if(i===-1){n+=r.substring(t);break}const o=r.substring(s+2,i),B=e[o];n+=r.substring(t,s)+(B!=null?String(B):`<${o}?>`),t=i+1}return n}catch{return r}}function iE(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Kn(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(Ql(i)&&Ql(o)){if(!Kn(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Ql(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ni(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Ws(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,i]=n.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function $s(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function oE(r,e){const t=new aE(r,e);return t.subscribe.bind(t)}class aE{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");BE(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=gB),s.error===void 0&&(s.error=gB),s.complete===void 0&&(s.complete=gB);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function BE(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function gB(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uE=1e3,cE=2,lE=14400*1e3,hE=.5;function Yl(r,e=uE,t=cE){const n=e*Math.pow(t,r),s=Math.round(hE*n*(Math.random()-.5)*2);return Math.min(lE,n+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gr(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Du(r){return(await fetch(r,{credentials:"include"})).ok}class kt{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fE{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new yC;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(dE(e))try{this.getOrInitializeService({instanceIdentifier:dr})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=dr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=dr){return this.instances.has(e)}getOptions(e=dr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const B=this.normalizeInstanceIdentifier(i);n===B&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:CE(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=dr){return this.component?this.component.multipleInstances?e:dr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function CE(r){return r===dr?void 0:r}function dE(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new fE(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var he;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(he||(he={}));const gE={debug:he.DEBUG,verbose:he.VERBOSE,info:he.INFO,warn:he.WARN,error:he.ERROR,silent:he.SILENT},mE=he.INFO,EE={[he.DEBUG]:"log",[he.VERBOSE]:"log",[he.INFO]:"info",[he.WARN]:"warn",[he.ERROR]:"error"},_E=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=EE[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class pa{constructor(e){this.name=e,this._logLevel=mE,this._logHandler=_E,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in he))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?gE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,he.DEBUG,...e),this._logHandler(this,he.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,he.VERBOSE,...e),this._logHandler(this,he.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,he.INFO,...e),this._logHandler(this,he.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,he.WARN,...e),this._logHandler(this,he.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,he.ERROR,...e),this._logHandler(this,he.ERROR,...e)}}const DE=(r,e)=>e.some(t=>r instanceof t);let Xl,Zl;function wE(){return Xl||(Xl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function IE(){return Zl||(Zl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const bC=new WeakMap,jB=new WeakMap,PC=new WeakMap,mB=new WeakMap,wu=new WeakMap;function yE(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(Gn(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&bC.set(t,r)}).catch(()=>{}),wu.set(e,r),e}function TE(r){if(jB.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});jB.set(r,e)}let JB={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return jB.get(r);if(e==="objectStoreNames")return r.objectStoreNames||PC.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Gn(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function AE(r){JB=r(JB)}function RE(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(EB(this),e,...t);return PC.set(n,e.sort?e.sort():[e]),Gn(n)}:IE().includes(r)?function(...e){return r.apply(EB(this),e),Gn(bC.get(this))}:function(...e){return Gn(r.apply(EB(this),e))}}function vE(r){return typeof r=="function"?RE(r):(r instanceof IDBTransaction&&TE(r),DE(r,wE())?new Proxy(r,JB):r)}function Gn(r){if(r instanceof IDBRequest)return yE(r);if(mB.has(r))return mB.get(r);const e=vE(r);return e!==r&&(mB.set(r,e),wu.set(e,r)),e}const EB=r=>wu.get(r);function OC(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),B=Gn(o);return n&&o.addEventListener("upgradeneeded",u=>{n(Gn(o.result),u.oldVersion,u.newVersion,Gn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),B.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),B}const bE=["get","getKey","getAll","getAllKeys","count"],PE=["put","add","delete","clear"],_B=new Map;function eh(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(_B.get(e))return _B.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=PE.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||bE.includes(t)))return;const i=async function(o,...B){const u=this.transaction(o,s?"readwrite":"readonly");let c=u.store;return n&&(c=c.index(B.shift())),(await Promise.all([c[t](...B),s&&u.done]))[0]};return _B.set(e,i),i}AE(r=>({...r,get:(e,t,n)=>eh(e,t)||r.get(e,t,n),has:(e,t)=>!!eh(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(SE(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function SE(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const qB="@firebase/app",th="0.16.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn=new pa("@firebase/app"),NE="@firebase/app-compat",FE="@firebase/analytics-compat",LE="@firebase/analytics",xE="@firebase/app-check-compat",kE="@firebase/app-check",VE="@firebase/auth",ME="@firebase/auth-compat",GE="@firebase/crashlytics",UE="@firebase/database",HE="@firebase/data-connect",jE="@firebase/database-compat",JE="@firebase/functions",qE="@firebase/functions-compat",KE="@firebase/installations",zE="@firebase/installations-compat",WE="@firebase/messaging",$E="@firebase/messaging-compat",QE="@firebase/performance",YE="@firebase/performance-compat",XE="@firebase/remote-config",ZE="@firebase/remote-config-compat",e_="@firebase/storage",t_="@firebase/storage-compat",n_="@firebase/firestore",r_="@firebase/ai",s_="@firebase/firestore-compat",i_="firebase",o_="13.2.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KB="[DEFAULT]",a_={[qB]:"fire-core",[NE]:"fire-core-compat",[LE]:"fire-analytics",[FE]:"fire-analytics-compat",[kE]:"fire-app-check",[xE]:"fire-app-check-compat",[VE]:"fire-auth",[ME]:"fire-auth-compat",[GE]:"fire-cls",[UE]:"fire-rtdb",[HE]:"fire-data-connect",[jE]:"fire-rtdb-compat",[JE]:"fire-fn",[qE]:"fire-fn-compat",[KE]:"fire-iid",[zE]:"fire-iid-compat",[WE]:"fire-fcm",[$E]:"fire-fcm-compat",[QE]:"fire-perf",[YE]:"fire-perf-compat",[XE]:"fire-rc",[ZE]:"fire-rc-compat",[e_]:"fire-gcs",[t_]:"fire-gcs-compat",[n_]:"fire-fst",[s_]:"fire-fst-compat",[r_]:"fire-vertex","fire-js":"fire-js",[i_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo=new Map,B_=new Map,zB=new Map;function nh(r,e){try{r.container.addComponent(e)}catch(t){mn.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Jt(r){const e=r.name;if(zB.has(e))return mn.debug(`There were multiple attempts to register component ${e}.`),!1;zB.set(e,r);for(const t of Uo.values())nh(t,r);for(const t of B_.values())nh(t,r);return!0}function sr(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Lt(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},un=new Mr("app","Firebase",u_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new kt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw un.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur=o_;function l_(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:KB,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw un.create("bad-app-name",{appName:String(s)});if(t||(t=wC()),!t)throw un.create("no-options");const i=Uo.get(s);if(i)if(Kn(t,i.options)){if(Kn(n,i.config))return i;throw un.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(n)})}else throw un.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});const o=new pE(s);for(const u of zB.values())o.addComponent(u);const B=new c_(t,n,o);return Uo.set(s,B),B}function ga(r=KB){const e=Uo.get(r);if(!e&&r===KB&&wC())return l_();if(!e)throw un.create("no-app",{appName:r});return e}function gt(r,e,t){let n=a_[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),mn.warn(o.join(" "));return}Jt(new kt(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h_="firebase-heartbeat-database",f_=1,li="firebase-heartbeat-store";let DB=null;function SC(){return DB||(DB=OC(h_,f_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(li)}catch(t){console.warn(t)}}}}).catch(r=>{throw un.create("idb-open",{originalErrorMessage:r.message})})),DB}async function C_(r){try{const t=(await SC()).transaction(li),n=await t.objectStore(li).get(NC(r));return await t.done,n}catch(e){if(e instanceof Gt)mn.warn(e.message);else{const t=un.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});mn.warn(t.message)}}}async function rh(r,e){try{const n=(await SC()).transaction(li,"readwrite");await n.objectStore(li).put(e,NC(r)),await n.done}catch(t){if(t instanceof Gt)mn.warn(t.message);else{const n=un.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});mn.warn(n.message)}}}function NC(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_=1024,p_=30;class g_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new E_(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=sh();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>p_){const o=__(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){mn.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=sh(),{heartbeatsToSend:n,unsentEntries:s}=m_(this._heartbeatsCache.heartbeats),i=Go(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return mn.warn(t),""}}}function sh(){return new Date().toISOString().substring(0,10)}function m_(r,e=d_){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),ih(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ih(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class E_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return RC()?vC().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await C_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return rh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return rh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function ih(r){return Go(JSON.stringify({version:2,heartbeats:r})).length}function __(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(r){Jt(new kt("platform-logger",e=>new OE(e),"PRIVATE")),Jt(new kt("heartbeat",e=>new g_(e),"PRIVATE")),gt(qB,th,r),gt(qB,th,"esm2020"),gt("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */D_("");var w_="firebase",I_="13.2.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */gt(w_,I_,"app");var oh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Un,FC;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(R,_){function I(){}I.prototype=_.prototype,R.F=_.prototype,R.prototype=new I,R.prototype.constructor=R,R.D=function(v,A,O){for(var w=Array(arguments.length-2),ft=2;ft<arguments.length;ft++)w[ft-2]=arguments[ft];return _.prototype[A].apply(v,w)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(R,_,I){I||(I=0);const v=Array(16);if(typeof _=="string")for(var A=0;A<16;++A)v[A]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(A=0;A<16;++A)v[A]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=R.g[0],I=R.g[1],A=R.g[2];let O=R.g[3],w;w=_+(O^I&(A^O))+v[0]+3614090360&4294967295,_=I+(w<<7&4294967295|w>>>25),w=O+(A^_&(I^A))+v[1]+3905402710&4294967295,O=_+(w<<12&4294967295|w>>>20),w=A+(I^O&(_^I))+v[2]+606105819&4294967295,A=O+(w<<17&4294967295|w>>>15),w=I+(_^A&(O^_))+v[3]+3250441966&4294967295,I=A+(w<<22&4294967295|w>>>10),w=_+(O^I&(A^O))+v[4]+4118548399&4294967295,_=I+(w<<7&4294967295|w>>>25),w=O+(A^_&(I^A))+v[5]+1200080426&4294967295,O=_+(w<<12&4294967295|w>>>20),w=A+(I^O&(_^I))+v[6]+2821735955&4294967295,A=O+(w<<17&4294967295|w>>>15),w=I+(_^A&(O^_))+v[7]+4249261313&4294967295,I=A+(w<<22&4294967295|w>>>10),w=_+(O^I&(A^O))+v[8]+1770035416&4294967295,_=I+(w<<7&4294967295|w>>>25),w=O+(A^_&(I^A))+v[9]+2336552879&4294967295,O=_+(w<<12&4294967295|w>>>20),w=A+(I^O&(_^I))+v[10]+4294925233&4294967295,A=O+(w<<17&4294967295|w>>>15),w=I+(_^A&(O^_))+v[11]+2304563134&4294967295,I=A+(w<<22&4294967295|w>>>10),w=_+(O^I&(A^O))+v[12]+1804603682&4294967295,_=I+(w<<7&4294967295|w>>>25),w=O+(A^_&(I^A))+v[13]+4254626195&4294967295,O=_+(w<<12&4294967295|w>>>20),w=A+(I^O&(_^I))+v[14]+2792965006&4294967295,A=O+(w<<17&4294967295|w>>>15),w=I+(_^A&(O^_))+v[15]+1236535329&4294967295,I=A+(w<<22&4294967295|w>>>10),w=_+(A^O&(I^A))+v[1]+4129170786&4294967295,_=I+(w<<5&4294967295|w>>>27),w=O+(I^A&(_^I))+v[6]+3225465664&4294967295,O=_+(w<<9&4294967295|w>>>23),w=A+(_^I&(O^_))+v[11]+643717713&4294967295,A=O+(w<<14&4294967295|w>>>18),w=I+(O^_&(A^O))+v[0]+3921069994&4294967295,I=A+(w<<20&4294967295|w>>>12),w=_+(A^O&(I^A))+v[5]+3593408605&4294967295,_=I+(w<<5&4294967295|w>>>27),w=O+(I^A&(_^I))+v[10]+38016083&4294967295,O=_+(w<<9&4294967295|w>>>23),w=A+(_^I&(O^_))+v[15]+3634488961&4294967295,A=O+(w<<14&4294967295|w>>>18),w=I+(O^_&(A^O))+v[4]+3889429448&4294967295,I=A+(w<<20&4294967295|w>>>12),w=_+(A^O&(I^A))+v[9]+568446438&4294967295,_=I+(w<<5&4294967295|w>>>27),w=O+(I^A&(_^I))+v[14]+3275163606&4294967295,O=_+(w<<9&4294967295|w>>>23),w=A+(_^I&(O^_))+v[3]+4107603335&4294967295,A=O+(w<<14&4294967295|w>>>18),w=I+(O^_&(A^O))+v[8]+1163531501&4294967295,I=A+(w<<20&4294967295|w>>>12),w=_+(A^O&(I^A))+v[13]+2850285829&4294967295,_=I+(w<<5&4294967295|w>>>27),w=O+(I^A&(_^I))+v[2]+4243563512&4294967295,O=_+(w<<9&4294967295|w>>>23),w=A+(_^I&(O^_))+v[7]+1735328473&4294967295,A=O+(w<<14&4294967295|w>>>18),w=I+(O^_&(A^O))+v[12]+2368359562&4294967295,I=A+(w<<20&4294967295|w>>>12),w=_+(I^A^O)+v[5]+4294588738&4294967295,_=I+(w<<4&4294967295|w>>>28),w=O+(_^I^A)+v[8]+2272392833&4294967295,O=_+(w<<11&4294967295|w>>>21),w=A+(O^_^I)+v[11]+1839030562&4294967295,A=O+(w<<16&4294967295|w>>>16),w=I+(A^O^_)+v[14]+4259657740&4294967295,I=A+(w<<23&4294967295|w>>>9),w=_+(I^A^O)+v[1]+2763975236&4294967295,_=I+(w<<4&4294967295|w>>>28),w=O+(_^I^A)+v[4]+1272893353&4294967295,O=_+(w<<11&4294967295|w>>>21),w=A+(O^_^I)+v[7]+4139469664&4294967295,A=O+(w<<16&4294967295|w>>>16),w=I+(A^O^_)+v[10]+3200236656&4294967295,I=A+(w<<23&4294967295|w>>>9),w=_+(I^A^O)+v[13]+681279174&4294967295,_=I+(w<<4&4294967295|w>>>28),w=O+(_^I^A)+v[0]+3936430074&4294967295,O=_+(w<<11&4294967295|w>>>21),w=A+(O^_^I)+v[3]+3572445317&4294967295,A=O+(w<<16&4294967295|w>>>16),w=I+(A^O^_)+v[6]+76029189&4294967295,I=A+(w<<23&4294967295|w>>>9),w=_+(I^A^O)+v[9]+3654602809&4294967295,_=I+(w<<4&4294967295|w>>>28),w=O+(_^I^A)+v[12]+3873151461&4294967295,O=_+(w<<11&4294967295|w>>>21),w=A+(O^_^I)+v[15]+530742520&4294967295,A=O+(w<<16&4294967295|w>>>16),w=I+(A^O^_)+v[2]+3299628645&4294967295,I=A+(w<<23&4294967295|w>>>9),w=_+(A^(I|~O))+v[0]+4096336452&4294967295,_=I+(w<<6&4294967295|w>>>26),w=O+(I^(_|~A))+v[7]+1126891415&4294967295,O=_+(w<<10&4294967295|w>>>22),w=A+(_^(O|~I))+v[14]+2878612391&4294967295,A=O+(w<<15&4294967295|w>>>17),w=I+(O^(A|~_))+v[5]+4237533241&4294967295,I=A+(w<<21&4294967295|w>>>11),w=_+(A^(I|~O))+v[12]+1700485571&4294967295,_=I+(w<<6&4294967295|w>>>26),w=O+(I^(_|~A))+v[3]+2399980690&4294967295,O=_+(w<<10&4294967295|w>>>22),w=A+(_^(O|~I))+v[10]+4293915773&4294967295,A=O+(w<<15&4294967295|w>>>17),w=I+(O^(A|~_))+v[1]+2240044497&4294967295,I=A+(w<<21&4294967295|w>>>11),w=_+(A^(I|~O))+v[8]+1873313359&4294967295,_=I+(w<<6&4294967295|w>>>26),w=O+(I^(_|~A))+v[15]+4264355552&4294967295,O=_+(w<<10&4294967295|w>>>22),w=A+(_^(O|~I))+v[6]+2734768916&4294967295,A=O+(w<<15&4294967295|w>>>17),w=I+(O^(A|~_))+v[13]+1309151649&4294967295,I=A+(w<<21&4294967295|w>>>11),w=_+(A^(I|~O))+v[4]+4149444226&4294967295,_=I+(w<<6&4294967295|w>>>26),w=O+(I^(_|~A))+v[11]+3174756917&4294967295,O=_+(w<<10&4294967295|w>>>22),w=A+(_^(O|~I))+v[2]+718787259&4294967295,A=O+(w<<15&4294967295|w>>>17),w=I+(O^(A|~_))+v[9]+3951481745&4294967295,R.g[0]=R.g[0]+_&4294967295,R.g[1]=R.g[1]+(A+(w<<21&4294967295|w>>>11))&4294967295,R.g[2]=R.g[2]+A&4294967295,R.g[3]=R.g[3]+O&4294967295}n.prototype.v=function(R,_){_===void 0&&(_=R.length);const I=_-this.blockSize,v=this.C;let A=this.h,O=0;for(;O<_;){if(A==0)for(;O<=I;)s(this,R,O),O+=this.blockSize;if(typeof R=="string"){for(;O<_;)if(v[A++]=R.charCodeAt(O++),A==this.blockSize){s(this,v),A=0;break}}else for(;O<_;)if(v[A++]=R[O++],A==this.blockSize){s(this,v),A=0;break}}this.h=A,this.o+=_},n.prototype.A=function(){var R=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);R[0]=128;for(var _=1;_<R.length-8;++_)R[_]=0;_=this.o*8;for(var I=R.length-8;I<R.length;++I)R[I]=_&255,_/=256;for(this.v(R),R=Array(16),_=0,I=0;I<4;++I)for(let v=0;v<32;v+=8)R[_++]=this.g[I]>>>v&255;return R};function i(R,_){var I=B;return Object.prototype.hasOwnProperty.call(I,R)?I[R]:I[R]=_(R)}function o(R,_){this.h=_;const I=[];let v=!0;for(let A=R.length-1;A>=0;A--){const O=R[A]|0;v&&O==_||(I[A]=O,v=!1)}this.g=I}var B={};function u(R){return-128<=R&&R<128?i(R,function(_){return new o([_|0],_<0?-1:0)}):new o([R|0],R<0?-1:0)}function c(R){if(isNaN(R)||!isFinite(R))return C;if(R<0)return F(c(-R));const _=[];let I=1;for(let v=0;R>=I;v++)_[v]=R/I|0,I*=4294967296;return new o(_,0)}function h(R,_){if(R.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(R.charAt(0)=="-")return F(h(R.substring(1),_));if(R.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=c(Math.pow(_,8));let v=C;for(let O=0;O<R.length;O+=8){var A=Math.min(8,R.length-O);const w=parseInt(R.substring(O,O+A),_);A<8?(A=c(Math.pow(_,A)),v=v.j(A).add(c(w))):(v=v.j(I),v=v.add(c(w)))}return v}var C=u(0),d=u(1),E=u(16777216);r=o.prototype,r.m=function(){if(b(this))return-F(this).m();let R=0,_=1;for(let I=0;I<this.g.length;I++){const v=this.i(I);R+=(v>=0?v:4294967296+v)*_,_*=4294967296}return R},r.toString=function(R){if(R=R||10,R<2||36<R)throw Error("radix out of range: "+R);if(D(this))return"0";if(b(this))return"-"+F(this).toString(R);const _=c(Math.pow(R,6));var I=this;let v="";for(;;){const A=ce(I,_).g;I=U(I,A.j(_));let O=((I.g.length>0?I.g[0]:I.h)>>>0).toString(R);if(I=A,D(I))return O+v;for(;O.length<6;)O="0"+O;v=O+v}},r.i=function(R){return R<0?0:R<this.g.length?this.g[R]:this.h};function D(R){if(R.h!=0)return!1;for(let _=0;_<R.g.length;_++)if(R.g[_]!=0)return!1;return!0}function b(R){return R.h==-1}r.l=function(R){return R=U(this,R),b(R)?-1:D(R)?0:1};function F(R){const _=R.g.length,I=[];for(let v=0;v<_;v++)I[v]=~R.g[v];return new o(I,~R.h).add(d)}r.abs=function(){return b(this)?F(this):this},r.add=function(R){const _=Math.max(this.g.length,R.g.length),I=[];let v=0;for(let A=0;A<=_;A++){let O=v+(this.i(A)&65535)+(R.i(A)&65535),w=(O>>>16)+(this.i(A)>>>16)+(R.i(A)>>>16);v=w>>>16,O&=65535,w&=65535,I[A]=w<<16|O}return new o(I,I[I.length-1]&-2147483648?-1:0)};function U(R,_){return R.add(F(_))}r.j=function(R){if(D(this)||D(R))return C;if(b(this))return b(R)?F(this).j(F(R)):F(F(this).j(R));if(b(R))return F(this.j(F(R)));if(this.l(E)<0&&R.l(E)<0)return c(this.m()*R.m());const _=this.g.length+R.g.length,I=[];for(var v=0;v<2*_;v++)I[v]=0;for(v=0;v<this.g.length;v++)for(let A=0;A<R.g.length;A++){const O=this.i(v)>>>16,w=this.i(v)&65535,ft=R.i(A)>>>16,Br=R.i(A)&65535;I[2*v+2*A]+=w*Br,K(I,2*v+2*A),I[2*v+2*A+1]+=O*Br,K(I,2*v+2*A+1),I[2*v+2*A+1]+=w*ft,K(I,2*v+2*A+1),I[2*v+2*A+2]+=O*ft,K(I,2*v+2*A+2)}for(R=0;R<_;R++)I[R]=I[2*R+1]<<16|I[2*R];for(R=_;R<2*_;R++)I[R]=0;return new o(I,0)};function K(R,_){for(;(R[_]&65535)!=R[_];)R[_+1]+=R[_]>>>16,R[_]&=65535,_++}function re(R,_){this.g=R,this.h=_}function ce(R,_){if(D(_))throw Error("division by zero");if(D(R))return new re(C,C);if(b(R))return _=ce(F(R),_),new re(F(_.g),F(_.h));if(b(_))return _=ce(R,F(_)),new re(F(_.g),_.h);if(R.g.length>30){if(b(R)||b(_))throw Error("slowDivide_ only works with positive integers.");for(var I=d,v=_;v.l(R)<=0;)I=Ee(I),v=Ee(v);var A=_e(I,1),O=_e(v,1);for(v=_e(v,2),I=_e(I,2);!D(v);){var w=O.add(v);w.l(R)<=0&&(A=A.add(I),O=w),v=_e(v,1),I=_e(I,1)}return _=U(R,A.j(_)),new re(A,_)}for(A=C;R.l(_)>=0;){for(I=Math.max(1,Math.floor(R.m()/_.m())),v=Math.ceil(Math.log(I)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),O=c(I),w=O.j(_);b(w)||w.l(R)>0;)I-=v,O=c(I),w=O.j(_);D(O)&&(O=d),A=A.add(O),R=U(R,w)}return new re(A,R)}r.B=function(R){return ce(this,R).h},r.and=function(R){const _=Math.max(this.g.length,R.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)&R.i(v);return new o(I,this.h&R.h)},r.or=function(R){const _=Math.max(this.g.length,R.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)|R.i(v);return new o(I,this.h|R.h)},r.xor=function(R){const _=Math.max(this.g.length,R.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)^R.i(v);return new o(I,this.h^R.h)};function Ee(R){const _=R.g.length+1,I=[];for(let v=0;v<_;v++)I[v]=R.i(v)<<1|R.i(v-1)>>>31;return new o(I,R.h)}function _e(R,_){const I=_>>5;_%=32;const v=R.g.length-I,A=[];for(let O=0;O<v;O++)A[O]=_>0?R.i(O+I)>>>_|R.i(O+I+1)<<32-_:R.i(O+I);return new o(A,R.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,FC=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=h,Un=o}).apply(typeof oh<"u"?oh:typeof self<"u"?self:typeof window<"u"?window:{});function Ye(r,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!n:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(r):n?n.value:e.get(r)}var co=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var LC,Qs,xC,Ao,WB,kC,VC,MC;(function(){var r,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof co=="object"&&co];for(var l=0;l<a.length;++l){var f=a[l];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var f=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var P=a[p];if(!(P in f))break e;f=f[P]}a=a[a.length-1],p=f[a],l=l(p),l!=p&&l!=null&&e(f,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var f=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&f.push([p,l[p]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function B(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,f){return a.call.apply(a.bind,arguments)}function c(a,l,f){return c=u,c.apply(null,arguments)}function h(a,l){var f=Array.prototype.slice.call(arguments,1);return function(){var p=f.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function C(a,l){function f(){}f.prototype=l.prototype,a.Z=l.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(p,P,S){for(var q=Array(arguments.length-2),ae=2;ae<arguments.length;ae++)q[ae-2]=arguments[ae];return l.prototype[P].apply(p,q)}}var d=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function E(a){const l=a.length;if(l>0){const f=Array(l);for(let p=0;p<l;p++)f[p]=a[p];return f}return[]}function D(a,l){for(let p=1;p<arguments.length;p++){const P=arguments[p];var f=typeof P;if(f=f!="object"?f:P?Array.isArray(P)?"array":f:"null",f=="array"||f=="object"&&typeof P.length=="number"){f=a.length||0;const S=P.length||0;a.length=f+S;for(let q=0;q<S;q++)a[f+q]=P[q]}else a.push(P)}}class b{constructor(l,f){this.i=l,this.j=f,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function F(a){o.setTimeout(()=>{throw a},0)}function U(){var a=R;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class K{constructor(){this.h=this.g=null}add(l,f){const p=re.get();p.set(l,f),this.h?this.h.next=p:this.g=p,this.h=p}}var re=new b(()=>new ce,a=>a.reset());class ce{constructor(){this.next=this.g=this.h=null}set(l,f){this.h=l,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Ee,_e=!1,R=new K,_=()=>{const a=Promise.resolve(void 0);Ee=()=>{a.then(I)}};function I(){for(var a;a=U();){try{a.h.call(a.g)}catch(f){F(f)}var l=re;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}_e=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function A(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};var O=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,l),o.removeEventListener("test",f,l)}catch{}return a})();function w(a){return/^[\s\xa0]*$/.test(a)}function ft(a,l){A.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}C(ft,A),ft.prototype.init=function(a,l){const f=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(f=="mouseover"?l=a.fromElement:f=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&ft.Z.h.call(this)},ft.prototype.h=function(){ft.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Br="closure_listenable_"+(Math.random()*1e6|0),Bm=0;function um(a,l,f,p,P){this.listener=a,this.proxy=null,this.src=l,this.type=f,this.capture=!!p,this.ha=P,this.key=++Bm,this.da=this.fa=!1}function $i(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Qi(a,l,f){for(const p in a)l.call(f,a[p],p,a)}function cm(a,l){for(const f in a)l.call(void 0,a[f],f,a)}function Wc(a){const l={};for(const f in a)l[f]=a[f];return l}const $c="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Qc(a,l){let f,p;for(let P=1;P<arguments.length;P++){p=arguments[P];for(f in p)a[f]=p[f];for(let S=0;S<$c.length;S++)f=$c[S],Object.prototype.hasOwnProperty.call(p,f)&&(a[f]=p[f])}}function Yi(a){this.src=a,this.g={},this.h=0}Yi.prototype.add=function(a,l,f,p,P){const S=a.toString();a=this.g[S],a||(a=this.g[S]=[],this.h++);const q=Wa(a,l,p,P);return q>-1?(l=a[q],f||(l.fa=!1)):(l=new um(l,this.src,S,!!p,P),l.fa=f,a.push(l)),l};function za(a,l){const f=l.type;if(f in a.g){var p=a.g[f],P=Array.prototype.indexOf.call(p,l,void 0),S;(S=P>=0)&&Array.prototype.splice.call(p,P,1),S&&($i(l),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Wa(a,l,f,p){for(let P=0;P<a.length;++P){const S=a[P];if(!S.da&&S.listener==l&&S.capture==!!f&&S.ha==p)return P}return-1}var $a="closure_lm_"+(Math.random()*1e6|0),Qa={};function Yc(a,l,f,p,P){if(Array.isArray(l)){for(let S=0;S<l.length;S++)Yc(a,l[S],f,p,P);return null}return f=el(f),a&&a[Br]?a.J(l,f,B(p)?!!p.capture:!1,P):lm(a,l,f,!1,p,P)}function lm(a,l,f,p,P,S){if(!l)throw Error("Invalid event type");const q=B(P)?!!P.capture:!!P;let ae=Xa(a);if(ae||(a[$a]=ae=new Yi(a)),f=ae.add(l,f,p,q,S),f.proxy)return f;if(p=hm(),f.proxy=p,p.src=a,p.listener=f,a.addEventListener)O||(P=q),P===void 0&&(P=!1),a.addEventListener(l.toString(),p,P);else if(a.attachEvent)a.attachEvent(Zc(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return f}function hm(){function a(f){return l.call(a.src,a.listener,f)}const l=fm;return a}function Xc(a,l,f,p,P){if(Array.isArray(l))for(var S=0;S<l.length;S++)Xc(a,l[S],f,p,P);else p=B(p)?!!p.capture:!!p,f=el(f),a&&a[Br]?(a=a.i,S=String(l).toString(),S in a.g&&(l=a.g[S],f=Wa(l,f,p,P),f>-1&&($i(l[f]),Array.prototype.splice.call(l,f,1),l.length==0&&(delete a.g[S],a.h--)))):a&&(a=Xa(a))&&(l=a.g[l.toString()],a=-1,l&&(a=Wa(l,f,p,P)),(f=a>-1?l[a]:null)&&Ya(f))}function Ya(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Br])za(l.i,a);else{var f=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(f,p,a.capture):l.detachEvent?l.detachEvent(Zc(f),p):l.addListener&&l.removeListener&&l.removeListener(p),(f=Xa(l))?(za(f,a),f.h==0&&(f.src=null,l[$a]=null)):$i(a)}}}function Zc(a){return a in Qa?Qa[a]:Qa[a]="on"+a}function fm(a,l){if(a.da)a=!0;else{l=new ft(l,this);const f=a.listener,p=a.ha||a.src;a.fa&&Ya(a),a=f.call(p,l)}return a}function Xa(a){return a=a[$a],a instanceof Yi?a:null}var Za="__closure_events_fn_"+(Math.random()*1e9>>>0);function el(a){return typeof a=="function"?a:(a[Za]||(a[Za]=function(l){return a.handleEvent(l)}),a[Za])}function et(){v.call(this),this.i=new Yi(this),this.M=this,this.G=null}C(et,v),et.prototype[Br]=!0,et.prototype.removeEventListener=function(a,l,f,p){Xc(this,a,l,f,p)};function ot(a,l){var f,p=a.G;if(p)for(f=[];p;p=p.G)f.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new A(l,a);else if(l instanceof A)l.target=l.target||a;else{var P=l;l=new A(p,a),Qc(l,P)}P=!0;let S,q;if(f)for(q=f.length-1;q>=0;q--)S=l.g=f[q],P=Xi(S,p,!0,l)&&P;if(S=l.g=a,P=Xi(S,p,!0,l)&&P,P=Xi(S,p,!1,l)&&P,f)for(q=0;q<f.length;q++)S=l.g=f[q],P=Xi(S,p,!1,l)&&P}et.prototype.N=function(){if(et.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const f=a.g[l];for(let p=0;p<f.length;p++)$i(f[p]);delete a.g[l],a.h--}}this.G=null},et.prototype.J=function(a,l,f,p){return this.i.add(String(a),l,!1,f,p)},et.prototype.K=function(a,l,f,p){return this.i.add(String(a),l,!0,f,p)};function Xi(a,l,f,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let P=!0;for(let S=0;S<l.length;++S){const q=l[S];if(q&&!q.da&&q.capture==f){const ae=q.listener,Je=q.ha||q.src;q.fa&&za(a.i,q),P=ae.call(Je,p)!==!1&&P}}return P&&!p.defaultPrevented}function Cm(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=c(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function tl(a){a.g=Cm(()=>{a.g=null,a.i&&(a.i=!1,tl(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class dm extends v{constructor(l,f){super(),this.m=l,this.l=f,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:tl(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function vs(a){v.call(this),this.h=a,this.g={}}C(vs,v);var nl=[];function rl(a){Qi(a.g,function(l,f){this.g.hasOwnProperty(f)&&Ya(l)},a),a.g={}}vs.prototype.N=function(){vs.Z.N.call(this),rl(this)},vs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var eB=o.JSON.stringify,pm=o.JSON.parse,gm=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function sl(){}function il(){}var bs={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function tB(){A.call(this,"d")}C(tB,A);function nB(){A.call(this,"c")}C(nB,A);var ur={},ol=null;function Zi(){return ol=ol||new et}ur.Ia="serverreachability";function al(a){A.call(this,ur.Ia,a)}C(al,A);function Ps(a){const l=Zi();ot(l,new al(l))}ur.STAT_EVENT="statevent";function Bl(a,l){A.call(this,ur.STAT_EVENT,a),this.stat=l}C(Bl,A);function at(a){const l=Zi();ot(l,new Bl(l,a))}ur.Ja="timingevent";function ul(a,l){A.call(this,ur.Ja,a),this.size=l}C(ul,A);function Os(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function Ss(){this.g=!0}Ss.prototype.ua=function(){this.g=!1};function mm(a,l,f,p,P,S){a.info(function(){if(a.g)if(S){var q="",ae=S.split("&");for(let we=0;we<ae.length;we++){var Je=ae[we].split("=");if(Je.length>1){const Ke=Je[0];Je=Je[1];const $t=Ke.split("_");q=$t.length>=2&&$t[1]=="type"?q+(Ke+"="+Je+"&"):q+(Ke+"=redacted&")}}}else q=null;else q=S;return"XMLHTTP REQ ("+p+") [attempt "+P+"]: "+l+`
`+f+`
`+q})}function Em(a,l,f,p,P,S,q){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+P+"]: "+l+`
`+f+`
`+S+" "+q})}function Wr(a,l,f,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Dm(a,f)+(p?" "+p:"")})}function _m(a,l){a.info(function(){return"TIMEOUT: "+l})}Ss.prototype.info=function(){};function Dm(a,l){if(!a.g)return l;if(!l)return null;try{const S=JSON.parse(l);if(S){for(a=0;a<S.length;a++)if(Array.isArray(S[a])){var f=S[a];if(!(f.length<2)){var p=f[1];if(Array.isArray(p)&&!(p.length<1)){var P=p[0];if(P!="noop"&&P!="stop"&&P!="close")for(let q=1;q<p.length;q++)p[q]=""}}}}return eB(S)}catch{return l}}var eo={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},cl={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},ll;function rB(){}C(rB,sl),rB.prototype.g=function(){return new XMLHttpRequest},ll=new rB;function Ns(a){return encodeURIComponent(String(a))}function wm(a){var l=1;a=a.split(":");const f=[];for(;l>0&&a.length;)f.push(a.shift()),l--;return a.length&&f.push(a.join(":")),f}function In(a,l,f,p){this.j=a,this.i=l,this.l=f,this.S=p||1,this.V=new vs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new hl}function hl(){this.i=null,this.g="",this.h=!1}var fl={},sB={};function iB(a,l,f){a.M=1,a.A=no(Wt(l)),a.u=f,a.R=!0,Cl(a,null)}function Cl(a,l){a.F=Date.now(),to(a),a.B=Wt(a.A);var f=a.B,p=a.S;Array.isArray(p)||(p=[String(p)]),Rl(f.i,"t",p),a.C=0,f=a.j.L,a.h=new hl,a.g=ql(a.j,f?l:null,!a.u),a.P>0&&(a.O=new dm(c(a.Y,a,a.g),a.P)),l=a.V,f=a.g,p=a.ba;var P="readystatechange";Array.isArray(P)||(P&&(nl[0]=P.toString()),P=nl);for(let S=0;S<P.length;S++){const q=Yc(f,P[S],p||l.handleEvent,!1,l.h||l);if(!q)break;l.g[q.key]=q}l=a.J?Wc(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),Ps(),mm(a.i,a.v,a.B,a.l,a.S,a.u)}In.prototype.ba=function(a){a=a.target;const l=this.O;l&&An(a)==3?l.j():this.Y(a)},In.prototype.Y=function(a){try{if(a==this.g)e:{const ae=An(this.g),Je=this.g.ya(),we=this.g.ca();if(!(ae<3)&&(ae!=3||this.g&&(this.h.h||this.g.la()||Fl(this.g)))){this.K||ae!=4||Je==7||(Je==8||we<=0?Ps(3):Ps(2)),oB(this);var l=this.g.ca();this.X=l;var f=Im(this);if(this.o=l==200,Em(this.i,this.v,this.B,this.l,this.S,ae,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,P=this.g;if((p=P.g?P.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(p)){var S=p;break t}}S=null}if(a=S)Wr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,aB(this,a);else{this.o=!1,this.m=3,at(12),cr(this),Fs(this);break e}}if(this.R){a=!0;let Ke;for(;!this.K&&this.C<f.length;)if(Ke=ym(this,f),Ke==sB){ae==4&&(this.m=4,at(14),a=!1),Wr(this.i,this.l,null,"[Incomplete Response]");break}else if(Ke==fl){this.m=4,at(15),Wr(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else Wr(this.i,this.l,Ke,null),aB(this,Ke);if(dl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ae!=4||f.length!=0||this.h.h||(this.m=1,at(16),a=!1),this.o=this.o&&a,!a)Wr(this.i,this.l,f,"[Invalid Chunked Response]"),cr(this),Fs(this);else if(f.length>0&&!this.W){this.W=!0;var q=this.j;q.g==this&&q.aa&&!q.P&&(q.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),dB(q),q.P=!0,at(11))}}else Wr(this.i,this.l,f,null),aB(this,f);ae==4&&cr(this),this.o&&!this.K&&(ae==4?Ul(this.j,this):(this.o=!1,to(this)))}else Vm(this.g),l==400&&f.indexOf("Unknown SID")>0?(this.m=3,at(12)):(this.m=0,at(13)),cr(this),Fs(this)}}}catch{}finally{}};function Im(a){if(!dl(a))return a.g.la();const l=Fl(a.g);if(l==="")return"";let f="";const p=l.length,P=An(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return cr(a),Fs(a),"";a.h.i=new o.TextDecoder}for(let S=0;S<p;S++)a.h.h=!0,f+=a.h.i.decode(l[S],{stream:!(P&&S==p-1)});return l.length=0,a.h.g+=f,a.C=0,a.h.g}function dl(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function ym(a,l){var f=a.C,p=l.indexOf(`
`,f);return p==-1?sB:(f=Number(l.substring(f,p)),isNaN(f)?fl:(p+=1,p+f>l.length?sB:(l=l.slice(p,p+f),a.C=p+f,l)))}In.prototype.cancel=function(){this.K=!0,cr(this)};function to(a){a.T=Date.now()+a.H,pl(a,a.H)}function pl(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Os(c(a.aa,a),l)}function oB(a){a.D&&(o.clearTimeout(a.D),a.D=null)}In.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(_m(this.i,this.B),this.M!=2&&(Ps(),at(17)),cr(this),this.m=2,Fs(this)):pl(this,this.T-a)};function Fs(a){a.j.I==0||a.K||Ul(a.j,a)}function cr(a){oB(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,rl(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function aB(a,l){try{var f=a.j;if(f.I!=0&&(f.g==a||BB(f.h,a))){if(!a.L&&BB(f.h,a)&&f.I==3){try{var p=f.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var P=p;if(P[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)ao(f),io(f);else break e;CB(f),at(18)}}else f.xa=P[1],0<f.xa-f.K&&P[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=Os(c(f.Va,f),6e3));El(f.h)<=1&&f.ta&&(f.ta=void 0)}else hr(f,11)}else if((a.L||f.g==a)&&ao(f),!w(l))for(P=f.Ba.g.parse(l),l=0;l<P.length;l++){let we=P[l];const Ke=we[0];if(!(Ke<=f.K))if(f.K=Ke,we=we[1],f.I==2)if(we[0]=="c"){f.M=we[1],f.ba=we[2];const $t=we[3];$t!=null&&(f.ka=$t,f.j.info("VER="+f.ka));const fr=we[4];fr!=null&&(f.za=fr,f.j.info("SVER="+f.za));const Rn=we[5];Rn!=null&&typeof Rn=="number"&&Rn>0&&(p=1.5*Rn,f.O=p,f.j.info("backChannelRequestTimeoutMs_="+p)),p=f;const vn=a.g;if(vn){const uo=vn.g?vn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(uo){var S=p.h;S.g||uo.indexOf("spdy")==-1&&uo.indexOf("quic")==-1&&uo.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(uB(S,S.h),S.h=null))}if(p.G){const pB=vn.g?vn.g.getResponseHeader("X-HTTP-Session-Id"):null;pB&&(p.wa=pB,Ae(p.J,p.G,pB))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),p=f;var q=a;if(p.na=Jl(p,p.L?p.ba:null,p.W),q.L){_l(p.h,q);var ae=q,Je=p.O;Je&&(ae.H=Je),ae.D&&(oB(ae),to(ae)),p.g=q}else Ml(p);f.i.length>0&&oo(f)}else we[0]!="stop"&&we[0]!="close"||hr(f,7);else f.I==3&&(we[0]=="stop"||we[0]=="close"?we[0]=="stop"?hr(f,7):fB(f):we[0]!="noop"&&f.l&&f.l.qa(we),f.A=0)}}Ps(4)}catch{}}var Tm=class{constructor(a,l){this.g=a,this.map=l}};function gl(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ml(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function El(a){return a.h?1:a.g?a.g.size:0}function BB(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function uB(a,l){a.g?a.g.add(l):a.h=l}function _l(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}gl.prototype.cancel=function(){if(this.i=Dl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Dl(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const f of a.g.values())l=l.concat(f.G);return l}return E(a.i)}var wl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Am(a,l){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const p=a[f].indexOf("=");let P,S=null;p>=0?(P=a[f].substring(0,p),S=a[f].substring(p+1)):P=a[f],l(P,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function yn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof yn?(this.l=a.l,Ls(this,a.j),this.o=a.o,this.g=a.g,xs(this,a.u),this.h=a.h,cB(this,vl(a.i)),this.m=a.m):a&&(l=String(a).match(wl))?(this.l=!1,Ls(this,l[1]||"",!0),this.o=ks(l[2]||""),this.g=ks(l[3]||"",!0),xs(this,l[4]),this.h=ks(l[5]||"",!0),cB(this,l[6]||"",!0),this.m=ks(l[7]||"")):(this.l=!1,this.i=new Ms(null,this.l))}yn.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(Vs(l,Il,!0),":");var f=this.g;return(f||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Vs(l,Il,!0),"@"),a.push(Ns(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Vs(f,f.charAt(0)=="/"?bm:vm,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Vs(f,Om)),a.join("")},yn.prototype.resolve=function(a){const l=Wt(this);let f=!!a.j;f?Ls(l,a.j):f=!!a.o,f?l.o=a.o:f=!!a.g,f?l.g=a.g:f=a.u!=null;var p=a.h;if(f)xs(l,a.u);else if(f=!!a.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var P=l.h.lastIndexOf("/");P!=-1&&(p=l.h.slice(0,P+1)+p)}if(P=p,P==".."||P==".")p="";else if(P.indexOf("./")!=-1||P.indexOf("/.")!=-1){p=P.lastIndexOf("/",0)==0,P=P.split("/");const S=[];for(let q=0;q<P.length;){const ae=P[q++];ae=="."?p&&q==P.length&&S.push(""):ae==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),p&&q==P.length&&S.push("")):(S.push(ae),p=!0)}p=S.join("/")}else p=P}return f?l.h=p:f=a.i.toString()!=="",f?cB(l,vl(a.i)):f=!!a.m,f&&(l.m=a.m),l};function Wt(a){return new yn(a)}function Ls(a,l,f){a.j=f?ks(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function xs(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function cB(a,l,f){l instanceof Ms?(a.i=l,Sm(a.i,a.l)):(f||(l=Vs(l,Pm)),a.i=new Ms(l,a.l))}function Ae(a,l,f){a.i.set(l,f)}function no(a){return Ae(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function ks(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Vs(a,l,f){return typeof a=="string"?(a=encodeURI(a).replace(l,Rm),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Rm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Il=/[#\/\?@]/g,vm=/[#\?:]/g,bm=/[#\?]/g,Pm=/[#\?@]/g,Om=/#/g;function Ms(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function lr(a){a.g||(a.g=new Map,a.h=0,a.i&&Am(a.i,function(l,f){a.add(decodeURIComponent(l.replace(/\+/g," ")),f)}))}r=Ms.prototype,r.add=function(a,l){lr(this),this.i=null,a=$r(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(l),this.h+=1,this};function yl(a,l){lr(a),l=$r(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Tl(a,l){return lr(a),l=$r(a,l),a.g.has(l)}r.forEach=function(a,l){lr(this),this.g.forEach(function(f,p){f.forEach(function(P){a.call(l,P,p,this)},this)},this)};function Al(a,l){lr(a);let f=[];if(typeof l=="string")Tl(a,l)&&(f=f.concat(a.g.get($r(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)f=f.concat(a[l]);return f}r.set=function(a,l){return lr(this),this.i=null,a=$r(this,a),Tl(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=Al(this,a),a.length>0?String(a[0]):l):l};function Rl(a,l,f){yl(a,l),f.length>0&&(a.i=null,a.g.set($r(a,l),E(f)),a.h+=f.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var f=l[p];const P=Ns(f);f=Al(this,f);for(let S=0;S<f.length;S++){let q=P;f[S]!==""&&(q+="="+Ns(f[S])),a.push(q)}}return this.i=a.join("&")};function vl(a){const l=new Ms;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function $r(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Sm(a,l){l&&!a.j&&(lr(a),a.i=null,a.g.forEach(function(f,p){const P=p.toLowerCase();p!=P&&(yl(this,p),Rl(this,P,f))},a)),a.j=l}function Nm(a,l){const f=new Ss;if(o.Image){const p=new Image;p.onload=h(Tn,f,"TestLoadImage: loaded",!0,l,p),p.onerror=h(Tn,f,"TestLoadImage: error",!1,l,p),p.onabort=h(Tn,f,"TestLoadImage: abort",!1,l,p),p.ontimeout=h(Tn,f,"TestLoadImage: timeout",!1,l,p),o.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function Fm(a,l){const f=new Ss,p=new AbortController,P=setTimeout(()=>{p.abort(),Tn(f,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(S=>{clearTimeout(P),S.ok?Tn(f,"TestPingServer: ok",!0,l):Tn(f,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(P),Tn(f,"TestPingServer: error",!1,l)})}function Tn(a,l,f,p,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),p(f)}catch{}}function Lm(){this.g=new gm}function lB(a){this.i=a.Sb||null,this.h=a.ab||!1}C(lB,sl),lB.prototype.g=function(){return new ro(this.i,this.h)};function ro(a,l){et.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}C(ro,et),r=ro.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,Us(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Gs(this)),this.readyState=0},r.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Us(this)),this.g&&(this.readyState=3,Us(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;bl(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function bl(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}r.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?Gs(this):Us(this),this.readyState==3&&bl(this)}},r.Oa=function(a){this.g&&(this.response=this.responseText=a,Gs(this))},r.Na=function(a){this.g&&(this.response=a,Gs(this))},r.ga=function(){this.g&&Gs(this)};function Gs(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Us(a)}r.setRequestHeader=function(a,l){this.A.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var f=l.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=l.next();return a.join(`\r
`)};function Us(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ro.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Pl(a){let l="";return Qi(a,function(f,p){l+=p,l+=":",l+=f,l+=`\r
`}),l}function hB(a,l,f){e:{for(p in f){var p=!1;break e}p=!0}p||(f=Pl(f),typeof a=="string"?f!=null&&Ns(f):Ae(a,l,f))}function Se(a){et.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}C(Se,et);var xm=/^https?$/i,km=["POST","PUT"];r=Se.prototype,r.Fa=function(a){this.H=a},r.ea=function(a,l,f,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ll.g(),this.g.onreadystatechange=d(c(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(S){Ol(this,S);return}if(a=f||"",f=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var P in p)f.set(P,p[P]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())f.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(f.keys()).find(S=>S.toLowerCase()=="content-type"),P=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(km,l,void 0)>=0)||p||P||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,q]of f)this.g.setRequestHeader(S,q);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(S){Ol(this,S)}};function Ol(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,Sl(a),so(a)}function Sl(a){a.A||(a.A=!0,ot(a,"complete"),ot(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,ot(this,"complete"),ot(this,"abort"),so(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),so(this,!0)),Se.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Nl(this):this.Xa())},r.Xa=function(){Nl(this)};function Nl(a){if(a.h&&typeof i<"u"){if(a.v&&An(a)==4)setTimeout(a.Ca.bind(a),0);else if(ot(a,"readystatechange"),An(a)==4){a.h=!1;try{const S=a.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var f;if(!(f=l)){var p;if(p=S===0){let q=String(a.D).match(wl)[1]||null;!q&&o.self&&o.self.location&&(q=o.self.location.protocol.slice(0,-1)),p=!xm.test(q?q.toLowerCase():"")}f=p}if(f)ot(a,"complete"),ot(a,"success");else{a.o=6;try{var P=An(a)>2?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.ca()+"]",Sl(a)}}finally{so(a)}}}}function so(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,l||ot(a,"ready");try{f.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function An(a){return a.g?a.g.readyState:0}r.ca=function(){try{return An(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),pm(l)}};function Fl(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Vm(a){const l={};a=(a.g&&An(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(w(a[p]))continue;var f=wm(a[p]);const P=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const S=l[P]||[];l[P]=S,S.push(f)}cm(l,function(p){return p.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Hs(a,l,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||l}function Ll(a){this.za=0,this.i=[],this.j=new Ss,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Hs("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Hs("baseRetryDelayMs",5e3,a),this.Za=Hs("retryDelaySeedMs",1e4,a),this.Ta=Hs("forwardChannelMaxRetries",2,a),this.va=Hs("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new gl(a&&a.concurrentRequestLimit),this.Ba=new Lm,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Ll.prototype,r.ka=8,r.I=1,r.connect=function(a,l,f,p){at(0),this.W=a,this.H=l||{},f&&p!==void 0&&(this.H.OSID=f,this.H.OAID=p),this.F=this.X,this.J=Jl(this,null,this.W),oo(this)};function fB(a){if(xl(a),a.I==3){var l=a.V++,f=Wt(a.J);if(Ae(f,"SID",a.M),Ae(f,"RID",l),Ae(f,"TYPE","terminate"),js(a,f),l=new In(a,a.j,l),l.M=2,l.A=no(Wt(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=l.A,f=!0),f||(l.g=ql(l.j,null),l.g.ea(l.A)),l.F=Date.now(),to(l)}jl(a)}function io(a){a.g&&(dB(a),a.g.cancel(),a.g=null)}function xl(a){io(a),a.v&&(o.clearTimeout(a.v),a.v=null),ao(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function oo(a){if(!ml(a.h)&&!a.m){a.m=!0;var l=a.Ea;Ee||_(),_e||(Ee(),_e=!0),R.add(l,a),a.D=0}}function Mm(a,l){return El(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Os(c(a.Ea,a,l),Hl(a,a.D)),a.D++,!0)}r.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const P=new In(this,this.j,a);let S=this.o;if(this.U&&(S?(S=Wc(S),Qc(S,this.U)):S=this.U),this.u!==null||this.R||(P.J=S,S=null),this.S)e:{for(var l=0,f=0;f<this.i.length;f++){t:{var p=this.i[f];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=f;break e}if(l===4096||f===this.i.length-1){l=f+1;break e}}l=1e3}else l=1e3;l=Vl(this,P,l),f=Wt(this.J),Ae(f,"RID",a),Ae(f,"CVER",22),this.G&&Ae(f,"X-HTTP-Session-Id",this.G),js(this,f),S&&(this.R?l="headers="+Ns(Pl(S))+"&"+l:this.u&&hB(f,this.u,S)),uB(this.h,P),this.Ra&&Ae(f,"TYPE","init"),this.S?(Ae(f,"$req",l),Ae(f,"SID","null"),P.U=!0,iB(P,f,null)):iB(P,f,l),this.I=2}}else this.I==3&&(a?kl(this,a):this.i.length==0||ml(this.h)||kl(this))};function kl(a,l){var f;l?f=l.l:f=a.V++;const p=Wt(a.J);Ae(p,"SID",a.M),Ae(p,"RID",f),Ae(p,"AID",a.K),js(a,p),a.u&&a.o&&hB(p,a.u,a.o),f=new In(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),l&&(a.i=l.G.concat(a.i)),l=Vl(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),uB(a.h,f),iB(f,p,l)}function js(a,l){a.H&&Qi(a.H,function(f,p){Ae(l,p,f)}),a.l&&Qi({},function(f,p){Ae(l,p,f)})}function Vl(a,l,f){f=Math.min(a.i.length,f);const p=a.l?c(a.l.Ka,a.l,a):null;e:{var P=a.i;let ae=-1;for(;;){const Je=["count="+f];ae==-1?f>0?(ae=P[0].g,Je.push("ofs="+ae)):ae=0:Je.push("ofs="+ae);let we=!0;for(let Ke=0;Ke<f;Ke++){var S=P[Ke].g;const $t=P[Ke].map;if(S-=ae,S<0)ae=Math.max(0,P[Ke].g-100),we=!1;else try{S="req"+S+"_"||"";try{var q=$t instanceof Map?$t:Object.entries($t);for(const[fr,Rn]of q){let vn=Rn;B(Rn)&&(vn=eB(Rn)),Je.push(S+fr+"="+encodeURIComponent(vn))}}catch(fr){throw Je.push(S+"type="+encodeURIComponent("_badmap")),fr}}catch{p&&p($t)}}if(we){q=Je.join("&");break e}}q=void 0}return a=a.i.splice(0,f),l.G=a,q}function Ml(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;Ee||_(),_e||(Ee(),_e=!0),R.add(l,a),a.A=0}}function CB(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Os(c(a.Da,a),Hl(a,a.A)),a.A++,!0)}r.Da=function(){if(this.v=null,Gl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Os(c(this.Wa,this),a)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,at(10),io(this),Gl(this))};function dB(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Gl(a){a.g=new In(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=Wt(a.na);Ae(l,"RID","rpc"),Ae(l,"SID",a.M),Ae(l,"AID",a.K),Ae(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&Ae(l,"TO",a.ia),Ae(l,"TYPE","xmlhttp"),js(a,l),a.u&&a.o&&hB(l,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=no(Wt(l)),f.u=null,f.R=!0,Cl(f,a)}r.Va=function(){this.C!=null&&(this.C=null,io(this),CB(this),at(19))};function ao(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Ul(a,l){var f=null;if(a.g==l){ao(a),dB(a),a.g=null;var p=2}else if(BB(a.h,l))f=l.G,_l(a.h,l),p=1;else return;if(a.I!=0){if(l.o)if(p==1){f=l.u?l.u.length:0,l=Date.now()-l.F;var P=a.D;p=Zi(),ot(p,new ul(p,f)),oo(a)}else Ml(a);else if(P=l.m,P==3||P==0&&l.X>0||!(p==1&&Mm(a,l)||p==2&&CB(a)))switch(f&&f.length>0&&(l=a.h,l.i=l.i.concat(f)),P){case 1:hr(a,5);break;case 4:hr(a,10);break;case 3:hr(a,6);break;default:hr(a,2)}}}function Hl(a,l){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*l}function hr(a,l){if(a.j.info("Error code "+l),l==2){var f=c(a.bb,a),p=a.Ua;const P=!p;p=new yn(p||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Ls(p,"https"),no(p),P?Nm(p.toString(),f):Fm(p.toString(),f)}else at(2);a.I=0,a.l&&a.l.pa(l),jl(a),xl(a)}r.bb=function(a){a?(this.j.info("Successfully pinged google.com"),at(2)):(this.j.info("Failed to ping google.com"),at(1))};function jl(a){if(a.I=0,a.ja=[],a.l){const l=Dl(a.h);(l.length!=0||a.i.length!=0)&&(D(a.ja,l),D(a.ja,a.i),a.h.i.length=0,E(a.i),a.i.length=0),a.l.oa()}}function Jl(a,l,f){var p=f instanceof yn?Wt(f):new yn(f);if(p.g!="")l&&(p.g=l+"."+p.g),xs(p,p.u);else{var P=o.location;p=P.protocol,l=l?l+"."+P.hostname:P.hostname,P=+P.port;const S=new yn(null);p&&Ls(S,p),l&&(S.g=l),P&&xs(S,P),f&&(S.h=f),p=S}return f=a.G,l=a.wa,f&&l&&Ae(p,f,l),Ae(p,"VER",a.ka),js(a,p),p}function ql(a,l,f){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new Se(new lB({ab:f})):new Se(a.ma),l.Fa(a.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Kl(){}r=Kl.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Bo(){}Bo.prototype.g=function(a,l){return new Dt(a,l)};function Dt(a,l){et.call(this),this.g=new Ll(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!w(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!w(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Qr(this)}C(Dt,et),Dt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Dt.prototype.close=function(){fB(this.g)},Dt.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=eB(a),a=f);l.i.push(new Tm(l.Ya++,a)),l.I==3&&oo(l)},Dt.prototype.N=function(){this.g.l=null,delete this.j,fB(this.g),delete this.g,Dt.Z.N.call(this)};function zl(a){tB.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const f in l){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}C(zl,tB);function Wl(){nB.call(this),this.status=1}C(Wl,nB);function Qr(a){this.g=a}C(Qr,Kl),Qr.prototype.ra=function(){ot(this.g,"a")},Qr.prototype.qa=function(a){ot(this.g,new zl(a))},Qr.prototype.pa=function(a){ot(this.g,new Wl)},Qr.prototype.oa=function(){ot(this.g,"b")},Bo.prototype.createWebChannel=Bo.prototype.g,Dt.prototype.send=Dt.prototype.o,Dt.prototype.open=Dt.prototype.m,Dt.prototype.close=Dt.prototype.close,MC=function(){return new Bo},VC=function(){return Zi()},kC=ur,WB={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},eo.NO_ERROR=0,eo.TIMEOUT=8,eo.HTTP_ERROR=6,Ao=eo,cl.COMPLETE="complete",xC=cl,il.EventType=bs,bs.OPEN="a",bs.CLOSE="b",bs.ERROR="c",bs.MESSAGE="d",et.prototype.listen=et.prototype.J,Qs=il,Se.prototype.listenOnce=Se.prototype.K,Se.prototype.getLastError=Se.prototype.Ha,Se.prototype.getLastErrorCode=Se.prototype.ya,Se.prototype.getStatus=Se.prototype.ca,Se.prototype.getResponseJson=Se.prototype.La,Se.prototype.getResponseText=Se.prototype.la,Se.prototype.send=Se.prototype.ea,Se.prototype.setWithCredentials=Se.prototype.Fa,LC=Se}).apply(typeof co<"u"?co:typeof self<"u"?self:typeof window<"u"?window:{});/*!
* re2js
* RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
*
* @version v2.9.1
* @author Oleksii Vasyliev
* @homepage https://github.com/le0pard/re2js#readme
* @repository [object Object]
* @license MIT
*/var Ie,M=(Ie=class{},G(Ie,"FOLD_CASE",1),G(Ie,"LITERAL",2),G(Ie,"CLASS_NL",4),G(Ie,"DOT_NL",8),G(Ie,"ONE_LINE",16),G(Ie,"NON_GREEDY",32),G(Ie,"PERL_X",64),G(Ie,"UNICODE_GROUPS",128),G(Ie,"WAS_DOLLAR",256),G(Ie,"LOOKBEHIND",512),G(Ie,"MATCH_NL",Ie.CLASS_NL|Ie.DOT_NL),G(Ie,"PERL",Ie.CLASS_NL|Ie.ONE_LINE|Ie.PERL_X|Ie.UNICODE_GROUPS),G(Ie,"POSIX",0),G(Ie,"UNANCHORED",0),G(Ie,"ANCHOR_START",1),G(Ie,"ANCHOR_BOTH",2),Ie);const Yr={CASE_INSENSITIVE:1,DOTALL:2,MULTILINE:4,DISABLE_UNICODE_GROUPS:8,LONGEST_MATCH:16,LOOKBEHINDS:512},hi=128,$B=new Int32Array(hi),QB=new Int32Array(hi),lo=65535;for(let r=0;r<hi;r++)r>=97&&r<=122?$B[r]=r-32:$B[r]=r,r>=65&&r<=90?QB[r]=r+32:QB[r]=r;var HB,x=(HB=class{static toUpperCase(r){if(r<hi)return $B[r];const e=String.fromCodePoint(r).toUpperCase(),t=e.codePointAt(0)>lo?2:1;if(e.length>t)return r;const n=String.fromCodePoint(e.codePointAt(0)).toLowerCase(),s=n.codePointAt(0)>lo?2:1;return n.length>s||n.codePointAt(0)!==r?r:e.codePointAt(0)}static toLowerCase(r){if(r<hi)return QB[r];const e=String.fromCodePoint(r).toLowerCase(),t=e.codePointAt(0)>lo?2:1;if(e.length>t)return r;const n=String.fromCodePoint(e.codePointAt(0)).toUpperCase(),s=n.codePointAt(0)>lo?2:1;return n.length>s||n.codePointAt(0)!==r?r:e.codePointAt(0)}},G(HB,"CODES",Object.freeze({"\x07":7,"\b":8,"	":9,"\n":10,"\v":11,"\f":12,"\r":13," ":32,'"':34,$:36,"&":38,"'":39,"(":40,")":41,"*":42,"+":43,"-":45,".":46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,":":58,"<":60,">":62,"?":63,A:65,B:66,C:67,F:70,P:80,Q:81,U:85,Z:90,"[":91,"\\":92,"]":93,"^":94,_:95,"`":96,a:97,b:98,f:102,i:105,m:109,n:110,r:114,s:115,t:116,v:118,x:120,z:122,"{":123,"|":124,"}":125})),HB),g=class{constructor(r,e=!1){this.data=r,this.isStride1=e,this.SIZE=e?2:3}getLo(r){return this.data[r*this.SIZE]}getHi(r){return this.data[r*this.SIZE+1]}getStride(r){return this.isStride1?1:this.data[r*this.SIZE+2]}get length(){return this.data.length/this.SIZE}};const y_="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-",GC=new Uint8Array(256);for(let r=0;r<64;r++)GC[y_.charCodeAt(r)]=r;const UC=r=>{const e=[];let t=0,n=0;for(let s=0;s<r.length;s++){const i=GC[r.charCodeAt(s)];t|=(i&31)<<n,(i&32)===0?(e.push(t),t=0,n=0):n+=5}return e},m=(r,e)=>{const t=UC(r),n=e?t.length/2:t.length/3,s=new Uint32Array(n*3);let i=0,o=0;for(let B=0;B<n;B++)i+=t[o++],s[B*3]=i,i+=t[o++],s[B*3+1]=i,s[B*3+2]=e?1:t[o++];return s},T_=r=>{const e=UC(r),t=new Map;let n=0;for(let s=0;s<e.length;s+=2){n+=e[s];const i=e[s+1],o=i>>>1^-(i&1);t.set(n,n+o)}return t};var ho=class{constructor(r){this.initializer=r,this.cache=new Map}has(r){return r in this.initializer}get(r){if(this.cache.has(r))return this.cache.get(r);const e=this.initializer[r],t=e?e():null;return this.cache.set(r,t),t}},Pn,wt=(Pn=class{static get CASE_ORBIT(){return this._CASE_ORBIT||(this._CASE_ORBIT=T_("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")),this._CASE_ORBIT}static get Print(){return this._Print||(this._Print=new g(m("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB",!1))),this._Print}},G(Pn,"_CASE_ORBIT",null),G(Pn,"_Print",null),G(Pn,"CATEGORIES",new ho({C:()=>new g(m("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB",!1)),Cc:()=>new g(m("AfgDgB",!0)),Cf:()=>new g(m("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB",!1)),Cn:()=>new g(m("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB",!1)),Co:()=>new g(m("gg4B-nGh4hc9--BD9--B",!0)),Cs:()=>new g(m("gg2B--B",!0)),L:()=>new g(m("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),LC:()=>new g(m("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB",!1)),Ll:()=>new g(m("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB",!1)),Lm:()=>new g(m("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB",!1)),Lo:()=>new g(m("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Lt:()=>new g(m("lOGDnB2sH2sHBGBJHBJHBNQQwBAB",!1)),Lu:()=>new g(m("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB",!1)),M:()=>new g(m("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),Mc:()=>new g(m("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB",!1)),Me:()=>new g(m("okBBB1xF-wB-wBBCBCCBsshBCB",!1)),Mn:()=>new g(m("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),N:()=>new g(m("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB",!1)),Nd:()=>new g(m("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ",!0)),Nl:()=>new g(m("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB",!1)),No:()=>new g(m("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB",!1)),P:()=>new g(m("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Pc:()=>new g(m("-Cg-Hg-HBUU-u3BBBZCBwHAB",!1)),Pd:()=>new g(m("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Pe:()=>new g(m("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD",!1)),Pf:()=>new g(m("7F+6H+6HEddpuDCCFDDQEE",!1)),Pi:()=>new g(m("rFt7Ht7HDBBDaapuDCCFDDQEE",!1)),Po:()=>new g(m("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Ps:()=>new g(m("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB",!1)),S:()=>new g(m("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Sc:()=>new g(m("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC",!1)),Sk:()=>new g(m("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB",!1)),Sm:()=>new g(m("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB",!1)),So:()=>new g(m("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Z:()=>new g(m("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB",!1)),Zl:()=>new g(m("ohIA",!0)),Zp:()=>new g(m("phIA",!0)),Zs:()=>new g(m("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB",!1)),ASCII_Hex_Digit:()=>new g(m("wBJIFbF",!0)),Alphabetic:()=>new g(m("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Dash:()=>new g(m("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Emoji:()=>new g(m("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Emoji_Component:()=>new g(m("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB",!1)),Emoji_Modifier:()=>new g(m("7-8DE",!0)),Emoji_Modifier_Base:()=>new g(m("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB",!1)),Emoji_Presentation:()=>new g(m("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Extended_Pictographic:()=>new g(m("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB",!1)),Hex_Digit:()=>new g(m("wBJIFbFq1-BJIFbF",!0)),Lowercase:()=>new g(m("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB",!1)),Math:()=>new g(m("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB",!1)),Quotation_Mark:()=>new g(m("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB",!1)),Terminal_Punctuation:()=>new g(m("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB",!1)),Uppercase:()=>new g(m("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB",!1)),White_Space:()=>new g(m("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB",!1))})),G(Pn,"SCRIPTS",new ho({Adlam:()=>new g(m("go6DrCFJFB",!0)),Ahom:()=>new g(m("g4lCaDOFW",!0)),Anatolian_Hieroglyphs:()=>new g(m("ggxCmS",!0)),Arabic:()=>new g(m("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB",!1)),Armenian:()=>new g(m("xpBlBDxBDCks9BE",!0)),Avestan:()=>new g(m("g4iC1BEG",!0)),Balinese:()=>new g(m("g4GsCCxB",!0)),Bamum:()=>new g(m("g1pB3CpowB4R",!0)),Bassa_Vah:()=>new g(m("w26CdDF",!0)),Batak:()=>new g(m("g+GzBJD",!0)),Bengali:()=>new g(m("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB",!1)),Beria_Erfe:()=>new g(m("g17CYDY",!0)),Bhaiksuki:()=>new g(m("ggnCICsBCNLc",!0)),Bopomofo:()=>new g(m("qXB6wLqBxDf",!0)),Brahmi:()=>new g(m("ggkCtCFjBKA",!0)),Braille:()=>new g(m("ggK-H",!0)),Buginese:()=>new g(m("gwGbDB",!0)),Buhid:()=>new g(m("g6FT",!0)),Canadian_Aboriginal:()=>new g(m("ggF-TxRlC7tgCP",!0)),Carian:()=>new g(m("g1gCwB",!0)),Caucasian_Albanian:()=>new g(m("wphCzBMA",!0)),Chakma:()=>new g(m("gokC0BCR",!0)),Cham:()=>new g(m("gwqB2BKNDJDD",!0)),Cherokee:()=>new g(m("g9E1CDFz7lBvC",!0)),Chorasmian:()=>new g(m("w9jCb",!0)),Common:()=>new g(m("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB",!1)),Coptic:()=>new g(m("ifNxkKzDGG",!0)),Cuneiform:()=>new g(m("ggoC5cnDuDCEMjG",!0)),Cypriot:()=>new g(m("ggiCFBDCCBqBBCBBEDD",!1)),Cypro_Minoan:()=>new g(m("w8rCiD",!0)),Cyrillic:()=>new g(m("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB",!1)),Deseret:()=>new g(m("gghCvC",!0)),Devanagari:()=>new g(m("goCwCFODZh7nBfhwcJ",!0)),Dives_Akuru:()=>new g(m("gomCGBDDDBGBCBBCdBCBBDLBKJB",!1)),Dogra:()=>new g(m("ggmC7B",!0)),Duployan:()=>new g(m("ggvDqDGMEIIJDD",!0)),Egyptian_Hieroglyphs:()=>new g(m("ggsC1iBL68D",!0)),Elbasan:()=>new g(m("gohCnB",!0)),Elymaic:()=>new g(m("g-jCW",!0)),Ethiopic:()=>new g(m("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB",!1)),Garay:()=>new g(m("gqjClBEcJB",!0)),Georgian:()=>new g(m("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG",!1)),Glagolitic:()=>new g(m("ggL-Ch9sDGCQDGCBCE",!0)),Gothic:()=>new g(m("w5gCa",!0)),Grantha:()=>new g(m("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB",!1)),Greek:()=>new g(m("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB",!1)),Gujarati:()=>new g(m("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB",!1)),Gunjala_Gondi:()=>new g(m("grnCFCBCkBCBCFIJ",!0)),Gurmukhi:()=>new g(m("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB",!1)),Gurung_Khema:()=>new g(m("go4C5B",!0)),Han:()=>new g(m("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Hangul:()=>new g(m("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC",!0)),Hanifi_Rohingya:()=>new g(m("gojCnBJJ",!0)),Hanunoo:()=>new g(m("g5FU",!0)),Hatran:()=>new g(m("gniCSCBGE",!0)),Hebrew:()=>new g(m("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB",!1)),Hiragana:()=>new g(m("hiM1CBHCBi7-C+IBTeeBBBulQAB",!1)),Imperial_Aramaic:()=>new g(m("giiCVCI",!0)),Inherited:()=>new g(m("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB",!1)),Inscriptional_Pahlavi:()=>new g(m("g7iCSGH",!0)),Inscriptional_Parthian:()=>new g(m("g6iCVDH",!0)),Javanese:()=>new g(m("gsqBtCDJFB",!0)),Kaithi:()=>new g(m("gkkCiCLA",!0)),Kannada:()=>new g(m("gkDMCCCWCJCEDICCCDIBGCCDDJCC",!0)),Katakana:()=>new g(m("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB",!1)),Kawi:()=>new g(m("g4nCQCoBEc",!0)),Kayah_Li:()=>new g(m("goqBtBCA",!0)),Kharoshthi:()=>new g(m("gwiCDCBGHCCCcDCFJII",!0)),Khitan_Small_Script:()=>new g(m("k-7C84G84GB0OBqBAB",!1)),Khmer:()=>new g(m("g8F9CDJHJnPf",!0)),Khojki:()=>new g(m("gwkCRCuB",!0)),Khudawadi:()=>new g(m("w1kC6BGJ",!0)),Kirat_Rai:()=>new g(m("gq7C5B",!0)),Lao:()=>new g(m("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB",!1)),Latin:()=>new g(m("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB",!1)),Lepcha:()=>new g(m("ggH3BEOEC",!0)),Limbu:()=>new g(m("goGeBCLBFLBFEEBKB",!1)),Linear_A:()=>new g(m("gwhC2JKVLH",!0)),Linear_B:()=>new g(m("gggCLCZCSCBCODNjB6D",!0)),Lisu:()=>new g(m("wmpBvBx1eA",!0)),Lycian:()=>new g(m("g0gCc",!0)),Lydian:()=>new g(m("gpiCZGA",!0)),Mahajani:()=>new g(m("wqkCmB",!0)),Makasar:()=>new g(m("g3nCY",!0)),Malayalam:()=>new g(m("goDMCCCyBCCCFFPDZ",!0)),Mandaic:()=>new g(m("giCbDA",!0)),Manichaean:()=>new g(m("g2iCmBFL",!0)),Marchen:()=>new g(m("wjnCfDVCN",!0)),Masaram_Gondi:()=>new g(m("gonCGBCBBCrBBECCBCCBHBJJB",!1)),Medefaidrin:()=>new g(m("gy7C6C",!0)),Meetei_Mayek:()=>new g(m("g3qBWqGtBDJ",!0)),Mende_Kikakui:()=>new g(m("gg6DkGDP",!0)),Meroitic_Cursive:()=>new g(m("gtiCXFTDtB",!0)),Meroitic_Hieroglyphs:()=>new g(m("gsiCf",!0)),Miao:()=>new g(m("g47CqCF4BIQ",!0)),Modi:()=>new g(m("gwlCkCMJ",!0)),Mongolian:()=>new g(m("ggGBBDCCBSBH4CBIqBB2t-BMB",!1)),Mro:()=>new g(m("gy6CeCJFB",!0)),Multani:()=>new g(m("g0kCGBCCCBCBCOBCKB",!1)),Myanmar:()=>new g(m("ggE-EhqmBeiDfxibT",!0)),Nabataean:()=>new g(m("gkiCeJI",!0)),Nag_Mundari:()=>new g(m("wm5DpB",!0)),Nandinagari:()=>new g(m("gtmCHDtBDK",!0)),New_Tai_Lue:()=>new g(m("gsGrBFZHKEB",!0)),Newa:()=>new g(m("gglC7CCE",!0)),Nko:()=>new g(m("g+B6BDC",!0)),Nushu:()=>new g(m("h-7CvsQvsQBqMB",!1)),Nyiakeng_Puachue_Hmong:()=>new g(m("go4DsBENDJFB",!0)),Ogham:()=>new g(m("g0Fc",!0)),Ol_Chiki:()=>new g(m("wiHvB",!0)),Ol_Onal:()=>new g(m("wu5DqBFA",!0)),Old_Hungarian:()=>new g(m("gkjCyBOyBIF",!0)),Old_Italic:()=>new g(m("g4gCjBKC",!0)),Old_North_Arabian:()=>new g(m("g0iCf",!0)),Old_Permic:()=>new g(m("w6gCqB",!0)),Old_Persian:()=>new g(m("g9gCjBFN",!0)),Old_Sogdian:()=>new g(m("g4jCnB",!0)),Old_South_Arabian:()=>new g(m("gziCf",!0)),Old_Turkic:()=>new g(m("ggjCoC",!0)),Old_Uyghur:()=>new g(m("w7jCZ",!0)),Oriya:()=>new g(m("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR",!0)),Osage:()=>new g(m("wlhCjBFjB",!0)),Osmanya:()=>new g(m("gkhCdDJ",!0)),Pahawh_Hmong:()=>new g(m("g46ClCLJCGCUGS",!0)),Palmyrene:()=>new g(m("gjiCf",!0)),Pau_Cin_Hau:()=>new g(m("g2mC4B",!0)),Phags_Pa:()=>new g(m("giqB3B",!0)),Phoenician:()=>new g(m("goiCbEA",!0)),Psalter_Pahlavi:()=>new g(m("g8iCRIDNG",!0)),Rejang:()=>new g(m("wpqBjBMA",!0)),Runic:()=>new g(m("g1FqCEK",!0)),Samaritan:()=>new g(m("ggCtBDO",!0)),Saurashtra:()=>new g(m("gkqBlCJL",!0)),Sharada:()=>new g(m("gskC-ChsCH",!0)),Shavian:()=>new g(m("wihCvB",!0)),Siddham:()=>new g(m("gslC1BDlB",!0)),Sidetic:()=>new g(m("gqiCZ",!0)),SignWriting:()=>new g(m("gg2DrUQECO",!0)),Sinhala:()=>new g(m("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB",!1)),Sogdian:()=>new g(m("w5jCpB",!0)),Sora_Sompeng:()=>new g(m("wmkCYIJ",!0)),Soyombo:()=>new g(m("wymCyC",!0)),Sundanese:()=>new g(m("g8G-BhIH",!0)),Sunuwar:()=>new g(m("g+mChBPJ",!0)),Syloti_Nagri:()=>new g(m("ggqBsB",!0)),Syriac:()=>new g(m("g4BNC7BDCxIK",!0)),Tagalog:()=>new g(m("g4FVKA",!0)),Tagbanwa:()=>new g(m("g7FMCCCB",!0)),Tai_Le:()=>new g(m("wqGdDE",!0)),Tai_Tham:()=>new g(m("gxG+BCcDKHJHN",!0)),Tai_Viet:()=>new g(m("g0qBiCZE",!0)),Tai_Yo:()=>new g(m("g25DeCVJB",!0)),Takri:()=>new g(m("g0lC5BHJ",!0)),Tamil:()=>new g(m("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB",!1)),Tangsa:()=>new g(m("wz6CuCCJ",!0)),Tangut:()=>new g(m("g-7CgBgBB+3GBhQeBiDyDB",!1)),Telugu:()=>new g(m("ggDMCCCWCPDICCCDIBCCCBDDDJII",!0)),Thaana:()=>new g(m("g8BxB",!0)),Thai:()=>new g(m("hwD5BGb",!0)),Tibetan:()=>new g(m("g4DnCCjBFmBCjBCOCGFB",!0)),Tifinagh:()=>new g(m("wpL3BIBPA",!0)),Tirhuta:()=>new g(m("gklCnCJJ",!0)),Todhri:()=>new g(m("guhCzB",!0)),Tolong_Siki:()=>new g(m("wtnCrBFJ",!0)),Toto:()=>new g(m("w04De",!0)),Tulu_Tigalari:()=>new g(m("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB",!1)),Ugaritic:()=>new g(m("g8gCdCA",!0)),Unknown:()=>new g(m("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB",!1)),Vai:()=>new g(m("gopBrJ",!0)),Vithkuqi:()=>new g(m("wrhCKCOCGCBCKCOCGCB",!0)),Wancho:()=>new g(m("g24D5BGA",!0)),Warang_Citi:()=>new g(m("glmCyCNA",!0)),Yezidi:()=>new g(m("g0jCpBCCDB",!0)),Yi:()=>new g(m("ggoBskBE2B",!0)),Zanabazar_Square:()=>new g(m("gwmCnC",!0))})),G(Pn,"FOLD_CATEGORIES",new ho({L:()=>new g(m("laA",!0)),LC:()=>new g(m("laA",!0)),Ll:()=>new g(m("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Lt:()=>new g(m("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB",!1)),Lu:()=>new g(m("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1)),M:()=>new g(m("5cgBgBlgHAB",!1)),Mn:()=>new g(m("5cgBgBlgHAB",!1)),Emoji:()=>new g(m("8mJA",!0)),Extended_Pictographic:()=>new g(m("8mJA",!0)),Lowercase:()=>new g(m("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Math:()=>new g(m("ycGDCHHFMMDDDCHHFAB",!1)),Uppercase:()=>new g(m("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1))})),G(Pn,"FOLD_SCRIPT",new ho({Common:()=>new g(m("8cgBgB",!1)),Greek:()=>new g(m("1FwUwU",!1)),Inherited:()=>new g(m("5cgBgBlgHAB",!1))})),Pn),me,W=(me=class{static isUnsearchable(e){return e===me.RUNE_ERROR||e>=me.MIN_HIGH_SURROGATE&&e<=me.MAX_LOW_SURROGATE}static is32(e,t){let n=0,s=e.length;for(;n<s;){const i=n+Math.floor((s-n)/2),o=e.getLo(i),B=e.getHi(i);if(o<=t&&t<=B){const u=e.getStride(i);return(t-o)%u===0}t<o?s=i:n=i+1}return!1}static is(e,t){if(t<=me.MAX_LATIN1){for(let n=0;n<e.length;n++){if(t>e.getHi(n))continue;const s=e.getLo(n);if(t<s)return!1;const i=e.getStride(n);return(t-s)%i===0}return!1}return e.length>0&&t>=e.getLo(0)&&me.is32(e,t)}static isPrint(e){return e<=me.MAX_LATIN1?e>=32&&e<me.MAX_ASCII||e>=161&&e!==173:me.is(wt.Print,e)}static simpleFold(e){if(wt.CASE_ORBIT.has(e))return wt.CASE_ORBIT.get(e);if(e<=me.MAX_ASCII){const t=x.toLowerCase(e);return t!==e?t:x.toUpperCase(e)}return e}static equalsIgnoreCase(e,t){if(e===t)return!0;if(e<0||t<0)return!1;if(e<=me.MAX_ASCII&&t<=me.MAX_ASCII)return 65<=e&&e<=90&&(e|=32),65<=t&&t<=90&&(t|=32),e===t;for(let n=me.simpleFold(e);n!==e;n=me.simpleFold(n))if(n===t)return!0;return!1}},G(me,"MAX_RUNE",1114111),G(me,"RUNE_ERROR",65533),G(me,"MAX_ASCII",127),G(me,"MAX_LATIN1",255),G(me,"MAX_BMP",65535),G(me,"MIN_FOLD",65),G(me,"MAX_FOLD",125251),G(me,"MIN_HIGH_SURROGATE",55296),G(me,"MAX_HIGH_SURROGATE",56319),G(me,"MIN_LOW_SURROGATE",56320),G(me,"MAX_LOW_SURROGATE",57343),G(me,"MIN_SUPPLEMENTARY_CODE_POINT",65536),me);const Iu=256,HC=new Uint8Array(Iu);for(let r=0;r<Iu;r++)HC[r]=97<=r&&r<=122||65<=r&&r<=90||48<=r&&r<=57||r===95?1:0;let wB=null,IB=null;var ve,z=(ve=class{static emptyInts(){return[]}static isByteArray(e){return Array.isArray(e)||Object.prototype.toString.call(e)==="[object Uint8Array]"}static isalnum(e){return x.CODES[0]<=e&&e<=x.CODES[9]||x.CODES.a<=e&&e<=x.CODES.z||x.CODES.A<=e&&e<=x.CODES.Z}static unhex(e){return x.CODES[0]<=e&&e<=x.CODES[9]?e-x.CODES[0]:x.CODES.a<=e&&e<=x.CODES.f?e-x.CODES.a+10:x.CODES.A<=e&&e<=x.CODES.F?e-x.CODES.A+10:-1}static escapeRune(e){let t="";if(W.isPrint(e))ve.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case x.CODES['"']:t+='\\"';break;case x.CODES["\\"]:t+="\\\\";break;case x.CODES["	"]:t+="\\t";break;case x.CODES[`
`]:t+="\\n";break;case x.CODES["\r"]:t+="\\r";break;case x.CODES["\b"]:t+="\\b";break;case x.CODES["\f"]:t+="\\f";break;default:{let n=e.toString(16);e<256?(t+="\\x",n.length===1&&(t+="0"),t+=n):t+=`\\x{${n}}`;break}}return t}static stringToRunes(e){const t=String(e),n=[];let s=0;for(;s<t.length;){const i=t.codePointAt(s);n.push(i),s+=i>W.MAX_BMP?2:1}return new Int32Array(n)}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return e<Iu?HC[e]===1:!1}static emptyOpContext(e,t){let n=0;return e<0&&(n|=ve.EMPTY_BEGIN_TEXT|ve.EMPTY_BEGIN_LINE),e===10&&(n|=ve.EMPTY_BEGIN_LINE),t<0&&(n|=ve.EMPTY_END_TEXT|ve.EMPTY_END_LINE),t===10&&(n|=ve.EMPTY_END_LINE),ve.isWordRune(e)!==ve.isWordRune(t)?n|=ve.EMPTY_WORD_BOUNDARY:n|=ve.EMPTY_NO_WORD_BOUNDARY,n}static quoteMeta(e){return e.split("").map(t=>ve.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>W.MAX_BMP?2:1}static toArray(e){const t=e.length,n=new Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return wB||(wB=new TextEncoder),wB.encode(e);{let t=[],n=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===W.MIN_HIGH_SURROGATE&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===W.MIN_LOW_SURROGATE?(i=W.MIN_SUPPLEMENTARY_CODE_POINT+((i&1023)<<10)+(e.charCodeAt(++s)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder){IB||(IB=new TextDecoder("utf-8"));const t=e instanceof Uint8Array?e:new Uint8Array(e);return IB.decode(t)}else{let t=[],n=0,s=0;for(;n<e.length;){let i=e[n++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){let o=e[n++];t[s++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=e[n++],B=e[n++],u=e[n++],c=((i&7)<<18|(o&63)<<12|(B&63)<<6|u&63)-W.MIN_SUPPLEMENTARY_CODE_POINT;t[s++]=String.fromCharCode(W.MIN_HIGH_SURROGATE+(c>>10)),t[s++]=String.fromCharCode(W.MIN_LOW_SURROGATE+(c&1023))}else{let o=e[n++],B=e[n++];t[s++]=String.fromCharCode((i&15)<<12|(o&63)<<6|B&63)}}return t.join("")}}},G(ve,"METACHARACTERS","\\.+*?()|[]{}^$"),G(ve,"EMPTY_BEGIN_LINE",1),G(ve,"EMPTY_END_LINE",2),G(ve,"EMPTY_BEGIN_TEXT",4),G(ve,"EMPTY_END_TEXT",8),G(ve,"EMPTY_WORD_BOUNDARY",16),G(ve,"EMPTY_NO_WORD_BOUNDARY",32),G(ve,"EMPTY_ALL",-1),ve);const jC=(r=[],e=0)=>{const t=Object.create(null);for(let n=0;n<r.length;n++){const s=r[n],i=e+n;t[s]=i,t[i]=s}return Object.freeze(t)};var Mn,br=(Mn=class{getEncoding(){throw Error("not implemented")}asCharSequence(){throw Error("not implemented")}asBytes(){throw Error("not implemented")}length(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===Mn.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===Mn.Encoding.UTF_16}},G(Mn,"Encoding",jC(["UTF_16","UTF_8"])),Mn),ah=class extends br{constructor(r=null){super(),this.bytes=r}getEncoding(){return br.Encoding.UTF_8}asCharSequence(){return z.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}},A_=class extends br{constructor(r=null){super(),this.charSequence=r}getEncoding(){return br.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return z.stringToUtf8ByteArray(this.charSequence.toString())}length(){return this.charSequence.length}},mr=class{static utf16(r){return new A_(r)}static utf8(r){return z.isByteArray(r)?new ah(r):new ah(z.stringToUtf8ByteArray(r))}},lt=class{static EOF(){return-8}constructor(){this.start=0,this.end=0}canCheckPrefix(){return!0}endPos(){return this.end-this.start}hasString(){return!1}hasAnyString(){return!1}prefixLength(){return 0}},Ut,R_=(Ut=class extends lt{constructor(e,t=0,n=e.length){super(),this.bytes=e,this.start=t,this.end=n}hasString(e,t){const n=e.bytes;if(n.length===0)return!0;const s=this.indexOf(this.bytes,n,this.start+t);return s!==-1&&s<=this.end-n.length}hasAnyString(e,t){return e.automaton8().searchUTF8(this.bytes,this.start+t,this.end)}step(e){if(e+=this.start,e>=this.end)return lt.EOF();const t=this.bytes[e]&255;if(t<128)return t<<3|1;let n,s,i=128,o=191;if(t>=194&&t<=223)n=2,s=t&31;else if(t>=224&&t<=239)n=3,s=t&15,t===224?i=160:t===237&&(o=159);else if(t>=240&&t<=244)n=4,s=t&7,t===240?i=144:t===244&&(o=143);else return Ut.RUNE_ERROR_STEP;if(e+n>this.end)return Ut.RUNE_ERROR_STEP;const B=this.bytes[e+1]&255;if(B<i||B>o)return Ut.RUNE_ERROR_STEP;if(s=s<<6|B&63,n>2){const u=this.bytes[e+2]&255;if((u&192)!==128)return Ut.RUNE_ERROR_STEP;if(s=s<<6|u&63,n>3){const c=this.bytes[e+3]&255;if((c&192)!==128)return Ut.RUNE_ERROR_STEP;s=s<<6|c&63}}return s<<3|n}index(e,t){t+=this.start;const n=this.indexOf(this.bytes,e.prefixUTF8,t);return n<0?n:n-t}context(e){e+=this.start;let t=-1;if(e>this.start&&e<=this.end){let s=e-1;if(t=this.bytes[s--],t>=128){let i=e-4;for(i<this.start&&(i=this.start);s>=i&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start);const o=this.step(s-this.start);t=s+(o&7)===e?o>>3:W.RUNE_ERROR}}const n=e<this.end?this.step(e-this.start)>>3:-1;return z.emptyOpContext(t,n)}indexOf(e,t,n=0){let s=t.length;if(s===0)return n<=this.end?n:-1;const i=t[0];let o=this.end-s;const B=typeof e.indexOf=="function";let u=n;for(;u<=o;){if(B){if(u=e.indexOf(i,u),u===-1||u>o)return-1}else{for(;u<=o&&e[u]!==i;)u++;if(u>o)return-1}let c=!0;for(let h=1;h<s;h++)if(e[u+h]!==t[h]){c=!1;break}if(c)return u;u++}return-1}prefixLength(e){return e.prefixUTF8.length}},G(Ut,"RUNE_ERROR_STEP",W.RUNE_ERROR<<3|1),Ut),v_=class extends lt{constructor(r,e=0,t=r.length){super(),this.charSequence=r,this.start=e,this.end=t}hasString(r,e){const t=this.charSequence.indexOf(r.str,this.start+e);return t!==-1&&t<=this.end-r.str.length}hasAnyString(r,e){return r.automaton16().searchUTF16(this.charSequence,this.start+e,this.end)}step(r){if(r+=this.start,r>=this.end)return lt.EOF();const e=this.charSequence.charCodeAt(r);if(e<W.MIN_HIGH_SURROGATE||e>W.MAX_HIGH_SURROGATE||r+1>=this.end)return e<<3|1;const t=this.charSequence.charCodeAt(r+1);return t>=W.MIN_LOW_SURROGATE&&t<=W.MAX_LOW_SURROGATE?(e-W.MIN_HIGH_SURROGATE)*1024+(t-W.MIN_LOW_SURROGATE)+W.MIN_SUPPLEMENTARY_CODE_POINT<<3|2:e<<3|1}index(r,e){e+=this.start;const t=this.charSequence.indexOf(r.prefix,e);return t<0||t>this.end-r.prefix.length?-1:t-e}context(r){r+=this.start;const e=r>this.start&&r<=this.end?this.charSequence.charCodeAt(r-1):-1,t=r<this.end?this.charSequence.charCodeAt(r):-1;return z.emptyOpContext(e,t)}prefixLength(r){return r.prefix.length}},Re=class{static fromUTF8(r,e=0,t=r.length){return new R_(r,e,t)}static fromUTF16(r,e=0,t=r.length){return new v_(r,e,t)}},Fi=class extends Error{constructor(r){super(r),this.name="RE2JSException"}},Te=class extends Fi{constructor(r,e=null){let t=`error parsing regexp: ${r}`;e&&(t+=`: \`${e}\``),super(t),this.name="RE2JSSyntaxException",this.message=t,this.error=r,this.input=e}getDescription(){return this.error}getPattern(){return this.input}},yB=class extends Fi{constructor(r){super(r),this.name="RE2JSCompileException"}},Ct=class extends Fi{constructor(r){super(r),this.name="RE2JSGroupException"}},b_=class extends Fi{constructor(r){super(r),this.name="RE2JSFlagsException"}},Ho=class extends Fi{constructor(r){super(r),this.name="RE2JSInternalException"}},Dr,Bh=(Dr=class{static quoteReplacement(e,t=!1){return t?e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(n=>{const s=n.codePointAt(0);return s===x.CODES["\\"]||s===x.CODES.$?`\\${n}`:n}).join(""):e.indexOf("$")<0?e:e.split("").map(n=>n.codePointAt(0)===x.CODES.$?"$$":n).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;const n=this.patternInput.re2();this.patternGroupCount=n.numberOfCapturingGroups(),this.groups=[],this.namedGroups=n.namedGroups,this.hasNamedGroups=Object.keys(this.namedGroups).length>0,this.numberOfInstructions=n.numberOfInstructions(),this.lookbehindState=null,t instanceof br?this.resetMatcherInput(t):z.isByteArray(t)?this.resetMatcherInput(mr.utf8(t)):this.resetMatcherInput(mr.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return e instanceof br||(z.isByteArray(e)?e=mr.utf8(e):e=mr.utf16(e)),this.matcherInput=e,this.lookbehindState!==null?this.lookbehindState.reset():this.lookbehindState=this.patternInput.re2().createLookbehindState(),this.reset(),this}start(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new Ct(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new Ct(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}programSize(){return this.numberOfInstructions}group(e=0){if(typeof e=="string"){const s=this.namedGroups[e];if(!Number.isFinite(s))throw new Ct(`group '${e}' not found`);e=s}const t=this.start(e),n=this.end(e);return t<0&&n<0?null:this.substring(t,n)}getNamedGroups(){if(!this.hasMatch)throw new Ct("perhaps no match attempted");const e=Object.create(null);for(const t of Object.keys(this.namedGroups))e[t]=this.group(t);return e}groupCount(){return this.patternGroupCount}loadGroup(e){if(!Number.isInteger(e)||e<0||e>this.patternGroupCount)throw new Ct(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new Ct("perhaps no match attempted");if(e===0||this.hasGroups)return;const t=this.matcherInputLength,n=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount,this.lookbehindState);if(!n[0])throw new Ct("inconsistency in matching group data");this.groups=n[1],this.hasGroups=!0}matches(){return this.genMatch(0,M.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,M.ANCHOR_START)}find(e=null){if(e!==null){if(!Number.isInteger(e)||e<0||e>this.matcherInputLength)throw new Ct(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}if(e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1])){const t=(this.matcherInput.isUTF16Encoding()?Re.fromUTF16(this.matcherInput.asCharSequence(),0,this.matcherInputLength):Re.fromUTF8(this.matcherInput.asBytes(),0,this.matcherInputLength)).step(e);t<0?e++:e+=t&7}return this.genMatch(e,M.UNANCHORED)}genMatch(e,t){const n=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1,this.lookbehindState);return n[0]?(this.groups=n[1],this.hasMatch=!0,this.hasGroups=this.patternGroupCount===0,this.anchorFlag=t,!0):(this.hasMatch=!1,!1)}substring(e,t){return this.matcherInput.isUTF8Encoding()?z.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let n="";const s=this.start(),i=this.end();return this.appendPos<s&&(n+=this.substring(this.appendPos,s)),this.appendPos=i,n+=t?this.appendReplacementInternalJava(e):this.appendReplacementInternalJs(e),n}appendReplacementInternalJava(e){let t="",n=0;const s=e.length;let i=0;for(;i<s;){const o=e.codePointAt(i);if(o===x.CODES["\\"]){if(n<i&&(t+=e.substring(n,i)),i++,i>=s)throw new Ct("character to be escaped is missing");n=i,i++;continue}if(o===x.CODES.$){if(n<i&&(t+=e.substring(n,i)),i+1>=s)throw new Ct("Illegal group reference: group index is missing");const B=e.codePointAt(i+1);if(x.CODES[0]<=B&&B<=x.CODES[9]){let u=B-x.CODES[0],c=i+2;for(;c<s;c++){const C=e.codePointAt(c);if(C<x.CODES[0]||C>x.CODES[9]||u*10+C-x.CODES[0]>this.patternGroupCount)break;u=u*10+C-x.CODES[0]}if(u>this.patternGroupCount)throw new Ct(`n > number of groups: ${u}`);const h=this.group(u);h!==null&&(t+=h),i=c,n=i}else if(B===x.CODES["{"]){let u=i+2;for(;u<s&&e.codePointAt(u)!==x.CODES["}"];)u++;if(u>=s)throw new Ct("named capture group is missing trailing '}'");const c=e.substring(i+2,u),h=this.group(c);h!==null&&(t+=h),i=u+1,n=i}else throw new Ct("Illegal group reference");continue}i++}return n<s&&(t+=e.substring(n,s)),t}appendReplacementInternalJs(e){const t=o=>o>=48&&o<=57,n=this.patternGroupCount;let s="",i=0;for(;i<e.length;){const o=e.indexOf("$",i);if(o<0)break;s+=e.substring(i,o),i=o;const B=e.charCodeAt(i+1);if(B===x.CODES.$)s+="$",i+=2;else if(B===x.CODES["&"])s+=this.group(0),i+=2;else if(B===x.CODES["`"])s+=this.substring(0,this.start(0)),i+=2;else if(B===x.CODES["'"])s+=this.substring(this.end(0),this.matcherInputLength),i+=2;else if(t(B)){let u=1,c=B-48;const h=e.charCodeAt(i+2);if(t(h)&&c*10+h-48<=n&&(u=2,c=c*10+h-48),c>=1&&c<=n){const C=this.group(c);C!==null&&(s+=C)}else s+=e.substring(i,i+1+u);i+=1+u}else if(B===x.CODES["<"]&&this.hasNamedGroups){const u=e.indexOf(">",i+2);if(u<0)s+="$<",i+=2;else{const c=e.substring(i+2,u);if(Object.prototype.hasOwnProperty.call(this.namedGroups,c)){const h=this.group(c);h!==null&&(s+=h)}i=u+1}}else s+="$",i+=1}return s+e.substring(i)}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,n=!1){let s="";this.reset();const i=typeof e=="function";let o=null;if(i){if(this.groupCount()>=Dr.MAX_REPLACER_ARGS)throw new Ct("Too many capture groups to safely invoke replacer function");o=this.matcherInput.isUTF8Encoding()?this.matcherInput.asBytes():this.matcherInput.asCharSequence()}for(;this.find()&&(s+=i?this.appendReplacementFunc(e,o):this.appendReplacement(e,n),!!t););return s+=this.appendTail(),s}appendReplacementFunc(e,t){let n="";const s=this.start(),i=this.end();this.appendPos<s&&(n+=this.substring(this.appendPos,s)),this.appendPos=i;const o=this.matchArray();return o.push(s,t),this.hasNamedGroups&&o.push(this.namedGroupsObject()),n+=String(e(...o)),n}matchArray(){const e=[this.group(0)];for(let t=1;t<=this.patternGroupCount;t++){const n=this.group(t);e.push(n===null?void 0:n)}return e}namedGroupsObject(){if(!this.hasNamedGroups)return;const e=this.getNamedGroups();for(const t in e)e[t]===null&&(e[t]=void 0);return e}},G(Dr,"MAX_REPLACER_ARGS",65535),Dr),fe,N=(fe=class{static isRuneOp(e){return fe.RUNE<=e&&e<=fe.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let n of e)t+=z.escapeRune(n);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=new Int32Array(0),this.next=null}matchRune(e){if(this.runes.length===1){const o=this.runes[0];return(this.arg&M.FOLD_CASE)!==0?W.equalsIgnoreCase(o,e):e===o}const t=this.runes.length;if(t===0)return!1;if(t===2||t===4||t===6||t===8){for(let o=0;o<t;o+=2){if(e<this.runes[o])return!1;if(e<=this.runes[o+1])return!0}return!1}let n=0,s=t>>1;for(;s>1;){const o=s>>1;n+=this.runes[n+o<<1]<=e?o:0,s-=o}n+=this.runes[n<<1]<=e?1:0;const i=n-1;return i>=0&&e<=this.runes[i<<1|1]}matchRunePos(e){if(this.runes.length===1){const o=this.runes[0];return(this.arg&M.FOLD_CASE)!==0?W.equalsIgnoreCase(o,e)?0:-1:e===o?0:-1}const t=this.runes.length;if(t===0)return-1;if(t===2||t===4||t===6||t===8){for(let o=0;o<t;o+=2){if(e<this.runes[o])return-1;if(e<=this.runes[o+1])return Math.floor(o/2)}return-1}let n=0,s=t>>1;for(;s>1;){const o=s>>1;n+=this.runes[n+o<<1]<=e?o:0,s-=o}n+=this.runes[n<<1]<=e?1:0;const i=n-1;return i>=0&&e<=this.runes[i<<1|1]?i:-1}toString(){switch(this.op){case fe.ALT:return`alt -> ${this.out}, ${this.arg}`;case fe.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case fe.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case fe.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case fe.MATCH:return`match${this.arg!==0?` ${this.arg}`:""}`;case fe.FAIL:return"fail";case fe.NOP:return`nop -> ${this.out}`;case fe.LB_WRITE:return`lbwrite ${this.arg} -> ${this.out}`;case fe.LB_CHECK:return`lbcheck ${this.arg} -> ${this.out}`;case fe.RUNE:return this.runes===null?"rune <null>":["rune ",fe.escapeRunes(this.runes),(this.arg&M.FOLD_CASE)!==0?"/i":""," -> ",this.out].join("");case fe.RUNE1:return`rune1 ${fe.escapeRunes(this.runes)} -> ${this.out}`;case fe.RUNE_ANY:return`any -> ${this.out}`;case fe.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}},G(fe,"ALT",1),G(fe,"ALT_MATCH",2),G(fe,"CAPTURE",3),G(fe,"EMPTY_WIDTH",4),G(fe,"FAIL",5),G(fe,"MATCH",6),G(fe,"NOP",7),G(fe,"RUNE",8),G(fe,"RUNE1",9),G(fe,"RUNE_ANY",10),G(fe,"RUNE_ANY_NOT_NL",11),G(fe,"LB_WRITE",12),G(fe,"LB_CHECK",13),fe),wr,uh=(wr=class{constructor(e){this.sparse=new Int32Array(e),this.densePcs=new Int32Array(e),this.denseCaps=null,this.size=0,this.ncap=0,this.mainThreads=0}init(e){this.ncap=e;const t=Math.min(this.densePcs.length,wr.INITIAL_THREADS)*e;(!this.denseCaps||this.denseCaps.length<t)&&(this.denseCaps=new Int32Array(t))}growCaps(e){const t=this.densePcs.length*this.ncap,n=new Int32Array(Math.min(t,Math.max(e,2*this.denseCaps.length)));n.set(this.denseCaps),this.denseCaps=n}contains(e){const t=this.sparse[e];return t<this.size&&this.densePcs[t]===e}isEmpty(){return this.size===0}add(e){const t=this.size++;return this.sparse[e]=t,this.densePcs[t]=e,t}clear(){this.size=0,this.mainThreads=0}toString(){let e="{";for(let t=0;t<this.size;t++)t!==0&&(e+=", "),e+=this.densePcs[t];return e+="}",e}},G(wr,"INITIAL_THREADS",32),wr),P_=class{constructor(r){this.pos=-1,this.pcs=new Int32Array(r.numInst()),this.size=0,this.lbTable=new Int32Array(r.numLb+1)}reset(){this.pos=-1,this.size=0}},O_=class JC{static fromRE2(e){const t=new JC;return t.prog=e.prog,t.re2=e,t.q0=new uh(t.prog.numInst()),t.q1=new uh(t.prog.numInst()),t.addStack=new Int32Array(2*(t.prog.numInst()+1)),t.matched=!1,t.matchcap=new Int32Array(t.prog.numCap<2?2:t.prog.numCap),t.ncap=0,t}constructor(){this.prog=null,this.re2=null,this.q0=null,this.q1=null,this.addStack=null,this.matched=!1,this.matchcap=null,this.ncap=0,this.lbTable=null}init(e){this.ncap=e,e>this.matchcap.length?this.matchcap=new Int32Array(e).fill(-1):this.matchcap.fill(-1),this.q0.init(e),this.q1.init(e),this.prog.numLb>0&&((!this.lbTable||this.lbTable.length<this.prog.numLb+1)&&(this.lbTable=new Int32Array(this.prog.numLb+1)),this.lbTable.fill(-1))}submatches(){return this.ncap===0?z.emptyInts():z.toArray(this.matchcap.subarray(0,this.ncap))}match(e,t,n,s=null){const i=this.re2.cond;if(i===z.EMPTY_ALL||(n===M.ANCHOR_START||n===M.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap.fill(-1);const o=this.prog.numLb>0,B=t;let u=t,c=!1;o&&(s!==null&&s.pos>=0&&s.pos<=t?(u=s.pos,c=!0):u=0);let h=o&&s!==null,C=this.q0,d=this.q1,E=e.step(u),D=E>>3,b=E&7,F=-1,U=0;E!==lt.EOF()&&(E=e.step(u+b),F=E>>3,U=E&7);let K;for(u===0?K=z.emptyOpContext(-1,D):K=e.context(u),o&&(c?this.restoreLookbehinds(s,C,K):this.spawnLookbehinds(C,u,K));;){if(C.mainThreads===0){if((i&z.EMPTY_BEGIN_TEXT)!==0&&u!==0||(n===M.ANCHOR_START||n===M.ANCHOR_BOTH)&&u!==0||this.matched)break;if(this.prog.numLb===0&&C.isEmpty()&&this.re2.prefix.length!==0&&F!==this.re2.prefixRune&&e.canCheckPrefix()){const Ee=e.index(this.re2,u);if(Ee<0)break;u+=Ee,E=e.step(u),D=E>>3,b=E&7,E=e.step(u+b),F=E>>3,U=E&7,K=e.context(u)}}u>=B&&(h&&(this.saveLookbehinds(s,C,u),h=!1),!this.matched&&(u===0||n===M.UNANCHORED)&&(this.ncap>0&&(this.matchcap[0]=u),this.add(C,this.prog.start,u,this.matchcap,0,K)));const re=u+b;if(K=e.context(re),this.step(C,d,u,re,D,K,n,u===e.endPos()),b===0||this.ncap===0&&this.matched)break;u+=b,D=F,b=U,D!==-1&&(E=e.step(u+b),F=E>>3,U=E&7);const ce=C;C=d,d=ce}return C.clear(),d.clear(),this.matched}matchSet(e,t,n){const s=this.re2.cond;if(s===z.EMPTY_ALL)return[];if((n===M.ANCHOR_START||n===M.ANCHOR_BOTH)&&t!==0)return[];let i=this.prog.numLb>0?0:t,o=t,B=this.q0,u=this.q1,c=e.step(i),h=c>>3,C=c&7,d=-1,E=0;c!==lt.EOF()&&(c=e.step(i+C),d=c>>3,E=c&7);let D=i===0?z.emptyOpContext(-1,h):e.context(i);const b=new Set;for(this.prog.numLb>0&&this.spawnLookbehinds(B,i,D);!(B.mainThreads===0&&((s&z.EMPTY_BEGIN_TEXT)!==0&&i!==0||(n===M.ANCHOR_START||n===M.ANCHOR_BOTH)&&i!==0));){(i===0||n===M.UNANCHORED)&&i>=o&&this.add(B,this.prog.start,i,this.matchcap,0,D);const F=i+C;D=e.context(F);for(let K=0;K<B.size;K++){const re=B.densePcs[K],ce=this.prog.inst[re],Ee=K*this.ncap;let _e=!1;switch(ce.op){case N.MATCH:if(n===M.ANCHOR_BOTH&&i!==e.endPos())break;b.add(ce.arg);break;case N.RUNE:_e=ce.matchRune(h);break;case N.RUNE1:_e=h===ce.runes[0];break;case N.RUNE_ANY:_e=!0;break;case N.RUNE_ANY_NOT_NL:_e=h!==10;break;default:continue}_e&&this.add(u,ce.out,F,B.denseCaps,Ee,D)}if(B.clear(),C===0)break;i+=C,h=d,C=E,h!==-1&&(c=e.step(i+C),d=c>>3,E=c&7);const U=B;B=u,u=U}return u.clear(),Array.from(b).sort((F,U)=>F-U)}step(e,t,n,s,i,o,B,u){const c=this.re2.longest;for(let h=0;h<e.size;h++){const C=e.densePcs[h],d=h*this.ncap;if(c&&this.matched&&this.ncap>0&&this.matchcap[0]<e.denseCaps[d])continue;const E=this.prog.inst[C];let D=!1;switch(E.op){case N.MATCH:if(B===M.ANCHOR_BOTH&&!u)break;if(this.ncap>0&&(!c||!this.matched||this.matchcap[1]<n)){e.denseCaps[d+1]=n;for(let b=0;b<this.ncap;b++)this.matchcap[b]=e.denseCaps[d+b]}c||(e.size=0),this.matched=!0;break;case N.RUNE:D=E.matchRune(i);break;case N.RUNE1:D=i===E.runes[0];break;case N.RUNE_ANY:D=!0;break;case N.RUNE_ANY_NOT_NL:D=i!==10;break;default:continue}D&&this.add(t,E.out,s,e.denseCaps,d,o)}e.clear()}spawnLookbehinds(e,t,n){for(let s=0;s<this.prog.lbStarts.length;s++)this.add(e,this.prog.lbStarts[s],t,this.matchcap,0,n)}restoreLookbehinds(e,t,n){this.lbTable.set(e.lbTable);for(let s=0;s<e.size;s++)this.add(t,e.pcs[s],e.pos,this.matchcap,0,n)}saveLookbehinds(e,t,n){let s=0;for(let i=0;i<t.size;i++){const o=t.densePcs[i];this.prog.lbInst[o]===1&&N.isRuneOp(this.prog.inst[o].op)&&(e.pcs[s++]=o)}e.size=s,e.pos=n,e.lbTable.set(this.lbTable)}add(e,t,n,s,i,o){const B=this.addStack;let u=0;for(;;){for(;t!==0&&!e.contains(t);){const h=e.add(t),C=this.prog.inst[t];switch(C.op){case N.FAIL:t=0;break;case N.ALT:case N.ALT_MATCH:B[u++]=C.arg,B[u++]=0,t=C.out;break;case N.EMPTY_WIDTH:t=(C.arg&~o)===0?C.out:0;break;case N.NOP:t=C.out;break;case N.CAPTURE:C.arg<this.ncap&&(B[u++]=-C.arg-1,B[u++]=s[i+C.arg],s[i+C.arg]=n),t=C.out;break;case N.LB_WRITE:this.lbTable[Math.abs(C.arg)]=n,t=C.out;break;case N.LB_CHECK:C.arg>0?t=this.lbTable[C.arg]===n?C.out:0:t=this.lbTable[-C.arg]!==n?C.out:0;break;case N.MATCH:case N.RUNE:case N.RUNE1:case N.RUNE_ANY:case N.RUNE_ANY_NOT_NL:if(this.prog.lbInst[t]===0&&e.mainThreads++,this.ncap>0){const d=h*this.ncap;d+this.ncap>e.denseCaps.length&&e.growCaps(d+this.ncap);for(let E=0;E<this.ncap;E++)e.denseCaps[d+E]=s[i+E]}t=0;break;default:throw new Ho("unhandled")}}if(u===0)return;u-=2;const c=B[u];c<0?(s[i-c-1]=B[u+1],t=0):t=c}}};const S_=(r,e,t)=>{let n=-2128831035;for(let s=0;s<r.length;s++)n^=r[s],n=Math.imul(n,16777619);n^=e,n=Math.imul(n,16777619);for(let s=0;s<t.length;s++)n^=t[s],n=Math.imul(n,16777619);return n},ch=(r,e)=>{if(r.length!==e.length)return!1;for(let t=0;t<r.length;t++)if(r[t]!==e[t])return!1;return!0},lh=(r,e,t,n)=>r.flag===t&&ch(r.nfaStates,e)&&ch(r.matchIDs,n),TB=[],Js=-1;var fo=class{constructor(r,e,t){this.nfaStates=r,this.flag=e,this.isMatch=(e&qC.FLAG_MATCH)!==0,this.matchIDs=t,this.next=null,this.nextAnchored=null}},pe,qC=(pe=class{constructor(e,t=8388608){this.prog=e,this.maxMem=t,this.stateCache=new Map,this.stateCount=0,this.startStates=new Map,this.failed=!1;for(let n=0;n<e.numInst();n++){const s=e.getInst(n).op;if(s===N.LB_WRITE||s===N.LB_CHECK){this.failed=!0;break}}this.computeRuneClasses(),this.stateBudget=t,this.memBudget=t}computeRuneClasses(){const e=new Set,t=(s,i)=>{e.add(s),e.add(i+1)};for(let s=0;s<this.prog.numInst();s++){const i=this.prog.getInst(s);switch(i.op){case N.RUNE:case N.RUNE1:if(i.runes.length===1){if(t(i.runes[0],i.runes[0]),(i.arg&M.FOLD_CASE)!==0)for(let o=W.simpleFold(i.runes[0]);o!==i.runes[0];o=W.simpleFold(o))t(o,o)}else for(let o=0;o<i.runes.length;o+=2)t(i.runes[o],i.runes[o+1]);break;case N.RUNE_ANY_NOT_NL:t(10,10);break;case N.EMPTY_WIDTH:(i.arg&(z.EMPTY_BEGIN_LINE|z.EMPTY_END_LINE))!==0&&t(10,10),(i.arg&(z.EMPTY_WORD_BOUNDARY|z.EMPTY_NO_WORD_BOUNDARY))!==0&&(t(48,57),t(65,90),t(95,95),t(97,122))}}e.delete(0),this.classBounds=Int32Array.from(e).sort(),this.numClasses=this.classBounds.length+1;const n=new Int32Array(W.MAX_LATIN1+1);for(let s=0;s<=W.MAX_LATIN1;s++)n[s]=this.searchClass(s);this.latin1Class=n}runeClass(e){return e<=W.MAX_LATIN1?this.latin1Class[e]:this.searchClass(e)}searchClass(e){const t=this.classBounds;let n=0,s=t.length;for(;n<s;){const i=n+s>>1;t[i]<=e?n=i+1:s=i}return n}closure(e,t){const n=new Set,s=Array.from(e);let i=0;for(;s.length>0;){const o=s.pop();if(o===0||n.has(o))continue;n.add(o);const B=this.prog.getInst(o);switch(B.op){case N.ALT:case N.ALT_MATCH:s.push(B.out),s.push(B.arg);break;case N.NOP:case N.CAPTURE:s.push(B.out);break;case N.EMPTY_WIDTH:i|=B.arg,(B.arg&~t)===0&&s.push(B.out)}}return{pcs:Array.from(n).sort((o,B)=>o-B),needflags:i}}getState(e,t,n){const s=S_(e,t,n),i=this.stateCache.get(s);if(i instanceof fo){if(lh(i,e,t,n))return i}else if(i!==void 0){for(let u=0;u<i.length;u++)if(lh(i[u],e,t,n))return i[u]}const o=pe.stateCost(e,n);if(this.memBudget<o)return null;this.memBudget-=o;const B=new fo(e,t,n);return i===void 0?this.stateCache.set(s,B):i instanceof fo?this.stateCache.set(s,[i,B]):i.push(B),this.stateCount++,B}static stateCost(e,t){const n=t.length===0?0:pe.ARRAY_OVERHEAD+pe.ELEMENT_SIZE*t.length;return pe.STATE_OVERHEAD+pe.ELEMENT_SIZE*e.length+n}*cachedStates(){for(const e of this.stateCache.values())e instanceof fo?yield e:yield*e}makeState(e,t,n){const s=this.closure(e,t&pe.FLAG_EMPTY_MASK);let i=t;return s.needflags===0&&(i&=pe.FLAG_MATCH),i|=s.needflags<<pe.FLAG_NEED_SHIFT,this.getState(s.pcs,i,n)}allocTable(e,t){const n=this.numClasses+1,s=pe.TABLE_OVERHEAD+pe.ELEMENT_SIZE*n;if(this.memBudget<s)return null;this.memBudget-=s;const i=new Array(n).fill(null);return t===M.UNANCHORED?e.next=i:e.nextAnchored=i,i}clearCache(){this.stateCache.clear(),this.stateCount=0,this.startStates.clear(),this.memBudget=this.stateBudget}resetCache(e){return this.clearCache(),this.getState(e.nfaStates,e.flag,e.matchIDs)}step(e,t,n,s){let i=s===M.UNANCHORED?e.next:e.nextAnchored;if(i!==null){const K=i[t];if(K!==null)return K}else if(i=this.allocTable(e,s),i===null)return null;const o=e.flag>>>pe.FLAG_NEED_SHIFT,B=e.flag&pe.FLAG_EMPTY_MASK;let u=B,c=0;n===10&&(u|=z.EMPTY_END_LINE,c|=z.EMPTY_BEGIN_LINE),n===Js&&(u|=z.EMPTY_END_LINE|z.EMPTY_END_TEXT);const h=(e.flag&pe.FLAG_LAST_WORD)!==0,C=n!==Js&&z.isWordRune(n);u|=C===h?z.EMPTY_NO_WORD_BOUNDARY:z.EMPTY_WORD_BOUNDARY;let d=e.nfaStates;(u&~B&o)!==0&&(d=this.closure(d,u).pcs);const E=[];let D=!1,b=TB;for(let K=0;K<d.length;K++){const re=this.prog.getInst(d[K]);re.op===N.MATCH?(D||(D=!0,b=[]),b.push(re.arg)):n!==Js&&N.isRuneOp(re.op)&&re.matchRune(n)&&E.push(re.out)}b.length>1&&b.sort((K,re)=>K-re),s===M.UNANCHORED&&n!==Js&&E.push(this.prog.start);let F=c;D&&(F|=pe.FLAG_MATCH),C&&(F|=pe.FLAG_LAST_WORD);const U=this.makeState(E,F,b);return U===null?null:(i[t]=U,U)}start(e,t){const n=e.context(t);let s;if((n&z.EMPTY_BEGIN_TEXT)!==0)s=z.EMPTY_BEGIN_TEXT|z.EMPTY_BEGIN_LINE;else if((n&z.EMPTY_BEGIN_LINE)!==0)s=z.EMPTY_BEGIN_LINE;else{const o=e.step(t),B=o>=0&&z.isWordRune(o>>3);s=(n&z.EMPTY_WORD_BOUNDARY)!==0!==B?pe.FLAG_LAST_WORD:0}let i=this.startStates.get(s);if(i===void 0){if(i=this.makeState([this.prog.start],s,TB),i===null&&(this.clearCache(),i=this.makeState([this.prog.start],s,TB),i===null))return null;this.startStates.set(s,i)}return i}stepOrReset(e,t,n,s,i,o){let B=this.step(e,t,n,s);if(B!==null)return B;if(o.resetPos>=0&&i-o.resetPos<pe.PROGRESS_PER_STATE*this.stateCount)return null;o.resetPos=i;const u=this.resetCache(e);return u===null?null:(B=this.step(u,t,n,s),B)}run(e,t,n,s,i){const o=e.endPos(),B=this.latin1Class,u=n===M.UNANCHORED,c={resetPos:-1};let h=t;for(;h<o;){const C=e.step(h),d=C>>3,E=C&7;if(E===0)break;const D=d<=W.MAX_LATIN1?B[d]:this.runeClass(d);let b=u&&s.next!==null?s.next[D]:null;if(b===null&&(b=this.stepOrReset(s,D,d,n,h,c),b===null))return null;if(s=b,s.isMatch&&i(s,!1))return!0;if(!u&&s.nfaStates.length===0)return!1;h+=E}return s=this.stepOrReset(s,this.numClasses,Js,n,h,c),s===null?null:s.isMatch&&i(s,!0)}match(e,t,n){if(this.failed)return null;if((n===M.ANCHOR_START||n===M.ANCHOR_BOTH)&&t!==0)return!1;const s=this.start(e,t);return s===null?null:this.run(e,t,n,s,(i,o)=>n!==M.ANCHOR_BOTH||o)}matchSet(e,t,n){if(this.failed)return null;if((n===M.ANCHOR_START||n===M.ANCHOR_BOTH)&&t!==0)return[];const s=this.start(e,t);if(s===null)return null;const i=new Set,o=(B,u)=>{if(n!==M.ANCHOR_BOTH||u)for(let c=0;c<B.matchIDs.length;c++)i.add(B.matchIDs[c]);return!1};return this.run(e,t,n,s,o)===null?null:Array.from(i).sort((B,u)=>B-u)}},G(pe,"FLAG_EMPTY_MASK",255),G(pe,"FLAG_MATCH",256),G(pe,"FLAG_LAST_WORD",512),G(pe,"FLAG_NEED_SHIFT",16),G(pe,"STATE_OVERHEAD",150),G(pe,"ARRAY_OVERHEAD",40),G(pe,"ELEMENT_SIZE",8),G(pe,"TABLE_OVERHEAD",48),G(pe,"PROGRESS_PER_STATE",10),pe);const N_=32,F_=500,AB=256,L_=262144;var x_=class{constructor(){this.end=0,this.cap=new Int32Array(0),this.matchcap=new Int32Array(0),this.ncap=0,this.jobPc=new Int32Array(AB),this.jobArg=new Uint8Array(AB),this.jobPos=new Int32Array(AB),this.jobLen=0,this.visited=new Uint32Array(0)}reset(r,e,t){this.end=e,this.jobLen=0,this.ncap=t;const n=r.numInst()*(e+1)+N_-1>>>5;this.visited.length<n?this.visited=new Uint32Array(n):this.visited.fill(0,0,n),this.cap.length<t?this.cap=new Int32Array(t).fill(-1):this.cap.fill(-1,0,t),this.matchcap.length<t?this.matchcap=new Int32Array(t).fill(-1):this.matchcap.fill(-1,0,t)}shouldVisit(r,e){const t=r*(this.end+1)+e,n=t>>>5,s=1<<(t&31);return(this.visited[n]&s)!==0?!1:(this.visited[n]|=s,!0)}push(r,e,t,n){if(r.prog.getInst(e).op!==N.FAIL&&(n||this.shouldVisit(e,t))){if(this.jobLen>=this.jobPc.length){const s=this.jobPc.length*2,i=new Int32Array(s);i.set(this.jobPc),this.jobPc=i;const o=new Uint8Array(s);o.set(this.jobArg),this.jobArg=o;const B=new Int32Array(s);B.set(this.jobPos),this.jobPos=B}this.jobPc[this.jobLen]=e,this.jobArg[this.jobLen]=n?1:0,this.jobPos[this.jobLen]=t,this.jobLen++}}tryBacktrack(r,e,t,n,s){const i=r.longest;for(this.push(r,t,n,!1);this.jobLen>0;){this.jobLen--;let o=this.jobPc[this.jobLen],B=this.jobArg[this.jobLen]===1,u=this.jobPos[this.jobLen],c=!0;for(;!(!c&&!this.shouldVisit(o,u));){c=!1;const h=r.prog.getInst(o);switch(h.op){case N.FAIL:break;case N.ALT:if(B){B=!1,o=h.arg;continue}else{this.push(r,o,u,!0),o=h.out;continue}case N.ALT_MATCH:{const C=r.prog.getInst(h.out);if(N.isRuneOp(C.op)){this.push(r,h.arg,u,!1),o=h.arg,u=this.end;continue}this.push(r,h.out,this.end,!1),o=h.out;continue}case N.RUNE:{const C=e.step(u);if(C===lt.EOF()||!h.matchRune(C>>3))break;u+=C&7,o=h.out;continue}case N.RUNE1:{const C=e.step(u);if(C===lt.EOF()||C>>3!==h.runes[0])break;u+=C&7,o=h.out;continue}case N.RUNE_ANY_NOT_NL:{const C=e.step(u);if(C===lt.EOF()||C>>3===10)break;u+=C&7,o=h.out;continue}case N.RUNE_ANY:{const C=e.step(u);if(C===lt.EOF())break;u+=C&7,o=h.out;continue}case N.CAPTURE:if(B){this.cap[h.arg]=u;break}else{h.arg<this.ncap&&(this.push(r,o,this.cap[h.arg],!0),this.cap[h.arg]=u),o=h.out;continue}case N.EMPTY_WIDTH:{const C=e.context(u);if((h.arg&~C)!==0)break;o=h.out;continue}case N.NOP:o=h.out;continue;case N.MATCH:{if(s===M.ANCHOR_BOTH&&u!==this.end)break;if(this.ncap===0)return!0;this.ncap>1&&(this.cap[1]=u);const C=this.matchcap[1];if((C===-1||i&&u>0&&u>C)&&this.matchcap.set(this.cap),!i||u===this.end)return!0;break}case N.LB_WRITE:case N.LB_CHECK:throw new Ho("Backtracker cannot evaluate Lookbehind instructions");default:throw new Ho("bad inst")}break}}return i&&this.matchcap.length>1&&this.matchcap[1]>=0}};const Co=[];var po=class KC{static shouldBacktrack(e){return e.numInst()<=F_}static maxBitStateLen(e){return KC.shouldBacktrack(e)?Math.floor(L_/e.numInst()):0}static execute(e,t,n,s,i){const o=e.cond;if(o===z.EMPTY_ALL||(s===M.ANCHOR_START||s===M.ANCHOR_BOTH)&&n!==0||(o&z.EMPTY_BEGIN_TEXT)!==0&&n!==0)return null;const B=Co.length>0?Co.pop():new x_,u=t.endPos();B.reset(e.prog,u,i);let c=!1;if((o&z.EMPTY_BEGIN_TEXT)!==0||s===M.ANCHOR_START||s===M.ANCHOR_BOTH)B.ncap>0&&(B.cap[0]=n),B.tryBacktrack(e,t,e.prog.start,n,s)&&(c=!0);else{let C=-1;for(;n<=u&&C!==0;n+=C){if(e.prefix.length>0){const E=t.index(e,n);if(E<0)break;n+=E}if(B.ncap>0&&(B.cap[0]=n),B.tryBacktrack(e,t,e.prog.start,n,s)){c=!0;break}const d=t.step(n);C=d===lt.EOF()?0:d&7}}if(!c)return Co.push(B),null;const h=i===0?[]:z.toArray(B.matchcap.subarray(0,i));return Co.push(B),h}},hh=class{constructor(r){this.sparse=new Uint32Array(r),this.dense=new Uint32Array(r),this.size=0,this.nextIndex=0}empty(){return this.nextIndex>=this.size}next(){return this.dense[this.nextIndex++]}clear(){this.size=0,this.nextIndex=0}contains(r){return r<this.sparse.length&&this.sparse[r]<this.size&&this.dense[this.sparse[r]]===r}insert(r){this.contains(r)||this.insertNew(r)}insertNew(r){r>=this.sparse.length||(this.sparse[r]=this.size,this.dense[this.size]=r,this.size++)}};const k_=(r,e,t,n)=>{const s=r.length,i=e.length;let o=0,B=0;const u=[],c=[];let h=!0,C=-1;const d=E=>{const D=E?r:e,b=E?o:B,F=E?t:n;return C>0&&D[b]<=u[C]?!1:(u.push(D[b],D[b+1]),E?o+=2:B+=2,C+=2,c.push(F),!0)};for(;o<s||B<i;)if(B>=i?h=d(!0):o>=s||e[B]<r[o]?h=d(!1):h=d(!0),!h)return null;return{merged:u,next:c}};var V_=class{constructor(r){this.start=r.start,this.numCap=r.numCap,this.inst=new Array(r.inst.length);for(let e=0;e<r.inst.length;e++){const t=r.inst[e],n=new N(t.op);n.out=t.out,n.arg=t.arg,n.runes=t.runes?new Int32Array(t.runes):new Int32Array(0),n.next=null,this.inst[e]=n}}};const M_=r=>{const e=new V_(r);for(let t=0;t<e.inst.length;t++){const n=e.inst[t];if(n.op!==N.ALT&&n.op!==N.ALT_MATCH)continue;let s="out",i="arg",o=e.inst[n[i]];if(o.op!==N.ALT&&o.op!==N.ALT_MATCH&&(s="arg",i="out",o=e.inst[n[i]],o.op!==N.ALT&&o.op!==N.ALT_MATCH))continue;const B=e.inst[n[s]];if(B.op===N.ALT||B.op===N.ALT_MATCH)continue;let u="out",c="arg",h=!1;o.out===t?h=!0:o.arg===t&&(h=!0,u="arg",c="out"),h&&(o[u]=n[s]),n[s]===o[u]&&(n[i]=o[c])}return e},G_=r=>{if(r.inst.length>=1e3)return null;const e=new hh(r.inst.length),t=new hh(r.inst.length),n=new Array(r.inst.length),s=new Array(r.inst.length).fill(!1),i=o=>{let B=!0;const u=r.inst[o];if(t.contains(o))return!0;switch(t.insert(o),u.op){case N.ALT:case N.ALT_MATCH:{B=i(u.out)&&i(u.arg);let c=s[u.out],h=s[u.arg];if(c&&h)return!1;if(h){const D=u.out;u.out=u.arg,u.arg=D;const b=c;c=h,h=b}c&&(s[o]=!0,u.op=N.ALT_MATCH);const C=n[u.out]||[],d=n[u.arg]||[],E=k_(C,d,u.out,u.arg);if(!E)return!1;n[o]=new Int32Array(E.merged),u.next=new Uint32Array(E.next);break}case N.CAPTURE:case N.EMPTY_WIDTH:case N.NOP:B=i(u.out),s[o]=s[u.out],n[o]=n[u.out]?new Int32Array(n[u.out]):new Int32Array(0),u.next=new Uint32Array(Math.floor(n[o].length/2)+1).fill(u.out);break;case N.MATCH:case N.FAIL:s[o]=u.op===N.MATCH;break;case N.RUNE:{if(s[o]=!1,u.next&&u.next.length>0)break;if(e.insert(u.out),!u.runes||u.runes.length===0){n[o]=new Int32Array(0),u.next=new Uint32Array([u.out]);break}let c=[];if(u.runes.length===1&&(u.arg&M.FOLD_CASE)!==0){const h=u.runes[0];c.push(h,h);for(let C=W.simpleFold(h);C!==h;C=W.simpleFold(C))c.push(C,C);c.sort((C,d)=>C-d)}else for(let h=0;h<u.runes.length;h++)c.push(u.runes[h]);n[o]=new Int32Array(c),u.next=new Uint32Array(Math.floor(c.length/2)+1).fill(u.out),u.op=N.RUNE;break}case N.RUNE1:{if(s[o]=!1,u.next&&u.next.length>0)break;e.insert(u.out);let c=[];if((u.arg&M.FOLD_CASE)!==0){const h=u.runes[0];c.push(h,h);for(let C=W.simpleFold(h);C!==h;C=W.simpleFold(C))c.push(C,C);c.sort((C,d)=>C-d)}else c.push(u.runes[0],u.runes[0]);n[o]=new Int32Array(c),u.next=new Uint32Array(Math.floor(c.length/2)+1).fill(u.out),u.op=N.RUNE;break}case N.RUNE_ANY:if(s[o]=!1,u.next&&u.next.length>0)break;e.insert(u.out),n[o]=new Int32Array([0,W.MAX_RUNE]),u.next=new Uint32Array([u.out]);break;case N.RUNE_ANY_NOT_NL:if(s[o]=!1,u.next&&u.next.length>0)break;e.insert(u.out),n[o]=new Int32Array([0,9,11,W.MAX_RUNE]),u.next=new Uint32Array(Math.floor(n[o].length/2)+1).fill(u.out)}return B};for(e.clear(),e.insert(r.start);!e.empty();)if(t.clear(),!i(e.next()))return null;for(let o=0;o<r.inst.length;o++)n[o]&&(r.inst[o].runes=n[o]);return r},U_=(r,e)=>{for(let t=0;t<e.inst.length;t++){const n=e.inst[t];switch(n.op){case N.ALT:case N.ALT_MATCH:case N.RUNE:break;case N.CAPTURE:case N.EMPTY_WIDTH:case N.NOP:case N.MATCH:case N.FAIL:r.inst[t].next=null;break;case N.RUNE1:case N.RUNE_ANY:case N.RUNE_ANY_NOT_NL:r.inst[t].next=null,r.inst[t].op=n.op,r.inst[t].runes=n.runes?new Int32Array(n.runes):new Int32Array(0)}}};var fh=class zC{static compile(e){if(e.start===0||e.numLb>0)return null;const t=e.inst[e.start];if(t.op!==N.EMPTY_WIDTH||(t.arg&z.EMPTY_BEGIN_TEXT)===0)return null;let n=!1;for(let i=0;i<e.inst.length;i++)if(e.inst[i].op===N.ALT||e.inst[i].op===N.ALT_MATCH){n=!0;break}for(let i=0;i<e.inst.length;i++){const o=e.inst[i],B=e.inst[o.out].op;switch(o.op){case N.ALT:case N.ALT_MATCH:if(B===N.MATCH||e.inst[o.arg].op===N.MATCH)return null;break;case N.EMPTY_WIDTH:if(B===N.MATCH){if((o.arg&z.EMPTY_END_TEXT)===z.EMPTY_END_TEXT)continue;return null}break;default:if(B===N.MATCH&&n)return null}}let s=M_(e);return s=G_(s),s!==null&&U_(s,e),s}static next(e,t){const n=e.matchRunePos(t);return n>=0?e.next[n]:e.op===N.ALT_MATCH?e.out:0}static execute(e,t,n,s,i){const o=e.onepass;if(!o)return null;const B=new Int32Array(i).fill(-1);let u=!1,c=t.step(n),h=c>>3,C=c&7,d=lt.EOF(),E=-1,D=0;c!==lt.EOF()&&(d=t.step(n+C),d!==lt.EOF()&&(E=d>>3,D=d&7));let b=n===0?z.emptyOpContext(-1,h):t.context(n),F=o.start,U;for(;;){switch(U=o.inst[F],F=U.out,U.op){case N.MATCH:return s===M.ANCHOR_BOTH&&n!==t.endPos()?null:(u=!0,B.length>0&&(B[0]=0,B[1]=n),i===0?[]:z.toArray(B));case N.RUNE:if(!U.matchRune(h))return null;break;case N.RUNE1:if(h!==U.runes[0])return null;break;case N.RUNE_ANY:break;case N.RUNE_ANY_NOT_NL:if(h===10)return null;break;case N.ALT:case N.ALT_MATCH:F=zC.next(U,h);continue;case N.FAIL:return null;case N.NOP:continue;case N.EMPTY_WIDTH:if((U.arg&~b)!==0)return null;continue;case N.CAPTURE:U.arg<B.length&&(B[U.arg]=n);continue;default:throw new Ho("bad inst")}if(C===0)break;b=z.emptyOpContext(h,E),n+=C,h=E,C=D,h!==-1&&(d=t.step(n+C),d!==lt.EOF()?(E=d>>3,D=d&7):(E=-1,D=0))}return u?i===0?[]:z.toArray(B):null}},X,y=(X=class{static isPseudoOp(e){return e>=X.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===x.CODES["-"]?"\\":""}static fromRegexp(e){const t=new X(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t.lb=e.lb,t}constructor(e){this.op=e,this.flags=0,this.subs=X.emptySubs(),this.runes=new Int32Array(0),this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}reinit(){this.flags=0,this.subs=X.emptySubs(),this.runes=new Int32Array(0),this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case X.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case X.Op.EMPTY_MATCH:e+="(?:)";break;case X.Op.STAR:case X.Op.PLUS:case X.Op.QUEST:case X.Op.REPEAT:{const t=this.subs[0];switch(t.op>X.Op.CAPTURE||t.op===X.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case X.Op.STAR:e+="*";break;case X.Op.PLUS:e+="+";break;case X.Op.QUEST:e+="?";break;case X.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}"}(this.flags&M.NON_GREEDY)!==0&&(e+="?");break}case X.Op.CONCAT:for(let t of this.subs)t.op===X.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break;case X.Op.ALTERNATE:{let t="";for(let n of this.subs)e+=t,t="|",e+=n.appendTo();break}case X.Op.LITERAL:(this.flags&M.FOLD_CASE)!==0&&(e+="(?i:");for(let t of this.runes)e+=z.escapeRune(t);(this.flags&M.FOLD_CASE)!==0&&(e+=")");break;case X.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case X.Op.ANY_CHAR:e+="(?s:.)";break;case X.Op.PLB:e+=`(?<=${this.subs[0].appendTo()})`;break;case X.Op.NLB:e+=`(?<!${this.subs[0].appendTo()})`;break;case X.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==X.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case X.Op.BEGIN_TEXT:e+="\\A";break;case X.Op.END_TEXT:(this.flags&M.WAS_DOLLAR)!==0?e+="(?-m:$)":e+="\\z";break;case X.Op.BEGIN_LINE:e+="^";break;case X.Op.END_LINE:e+="$";break;case X.Op.WORD_BOUNDARY:e+="\\b";break;case X.Op.NO_WORD_BOUNDARY:e+="\\B";break;case X.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===W.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){const n=this.runes[t]+1,s=this.runes[t+1]-1;e+=X.quoteIfHyphen(n),e+=z.escapeRune(n),n!==s&&(e+="-",e+=X.quoteIfHyphen(s),e+=z.escapeRune(s))}}else for(let t=0;t<this.runes.length;t+=2){const n=this.runes[t],s=this.runes[t+1];e+=X.quoteIfHyphen(n),e+=z.escapeRune(n),n!==s&&(e+="-",e+=X.quoteIfHyphen(s),e+=z.escapeRune(s))}e+="]";break;default:e+=this.op}return e}maxCap(){let e=0;if(this.op===X.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){const n=t.maxCap();e<n&&(e=n)}return e}equals(e){if(!(e!==null&&e instanceof X)||this.op!==e.op)return!1;switch(this.op){case X.Op.END_TEXT:if((this.flags&M.WAS_DOLLAR)!==(e.flags&M.WAS_DOLLAR))return!1;break;case X.Op.LITERAL:case X.Op.CHAR_CLASS:if((this.flags&M.FOLD_CASE)!==(e.flags&M.FOLD_CASE))return!1;if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break;case X.Op.ALTERNATE:case X.Op.CONCAT:if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break;case X.Op.STAR:case X.Op.PLUS:case X.Op.QUEST:if((this.flags&M.NON_GREEDY)!==(e.flags&M.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.REPEAT:if((this.flags&M.NON_GREEDY)!==(e.flags&M.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.CAPTURE:if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.PLB:case X.Op.NLB:if(this.lb!==e.lb||!this.subs[0].equals(e.subs[0]))return!1}return!0}},G(X,"Op",jC(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","PLB","NLB","LEFT_PAREN","VERTICAL_BAR"])),X),yu=class{static walk(r,e){const t=[];let n=r,s;for(;;){if(n.subs.length===0)s=e.leaf(n);else{const i=e.enter(n);if(i.result===void 0){t.push({re:n,state:i,i:0}),n=n.subs[0];continue}s=i.result}for(;;){if(t.length===0)return s;const i=t[t.length-1];if(e.child(i.re,i.state,s,i.i),i.i++,i.state.result===void 0&&i.i<i.re.subs.length){n=i.re.subs[i.i];break}t.pop(),s=i.state.result!==void 0?i.state.result:e.leave(i.re,i.state)}}}},Ch=class{constructor(r,e){const t=new Map,n=[0],s=[0],i=[0],o=[0];for(const D of r){let b=0;for(let F=0;F<D.length;F++){const U=b*e+D[F];let K=t.get(U);K===void 0&&(K=n.length,t.set(U,K),n.push(b),s.push(D[F]),i.push(i[b]+1),o.push(0)),b=K}o[b]=1}const B=n.length,u=new Int32Array(B-1);for(let D=1;D<B;D++)u[D-1]=D;u.sort((D,b)=>n[D]-n[b]||s[D]-s[b]);const c=new Int32Array(B+1);for(let D=1;D<B;D++)c[n[D]+1]++;for(let D=0;D<B;D++)c[D+1]+=c[D];const h=new Int32Array(B-1);for(let D=0;D<u.length;D++)h[D]=s[u[D]];this.childStart=c,this.childUnit=h,this.childNode=u;const C=new Int32Array(B);for(let D=0;D<B;D++)C[D]=D;C.sort((D,b)=>i[D]-i[b]);const d=new Int32Array(B),E=Uint8Array.from(o);for(let D=1;D<B;D++){const b=C[D],F=n[b];if(F!==0){let U=d[F],K=this.next(U,s[b]);for(;K<0&&U!==0;)U=d[U],K=this.next(U,s[b]);d[b]=K>=0?K:0}E[b]|=E[d[b]]}this.fail=d,this.match=E}next(r,e){let t=this.childStart[r],n=this.childStart[r+1];const s=this.childUnit;for(;t<n;){const i=t+n>>1,o=s[i];if(o===e)return this.childNode[i];o<e?t=i+1:n=i}return-1}advance(r,e){for(;;){const t=this.next(r,e);if(t>=0)return t;if(r===0)return 0;r=this.fail[r]}}searchUTF16(r,e,t){let n=0;for(let s=e;s<t;s++)if(n=this.advance(n,r.charCodeAt(s)),this.match[n]===1)return!0;return!1}searchUTF8(r,e,t){let n=0;for(let s=e;s<t;s++)if(n=this.advance(n,r[s]),this.match[n]===1)return!0;return!1}},yt,Be=(yt=class{constructor(e){this.type=e,this.subs=[],this.str="",this.bytes=null,this.cost=e===yt.Type.EXACT?1:0,this.allExact=!1,this.ac16=null,this.ac8=null}automaton16(){if(this.ac16===null){const e=this.subs.map(t=>{const n=new Array(t.str.length);for(let s=0;s<t.str.length;s++)n[s]=t.str.charCodeAt(s);return n});this.ac16=new Ch(e,65536)}return this.ac16}automaton8(){return this.ac8===null&&(this.ac8=new Ch(this.subs.map(e=>e.bytes),256)),this.ac8}eval(e,t){switch(this.type){case yt.Type.NONE:return!0;case yt.Type.EXACT:return e.hasString(this,t);case yt.Type.AND:for(let n=0;n<this.subs.length;n++)if(!this.subs[n].eval(e,t))return!1;return!0;case yt.Type.OR:if(this.allExact)return e.hasAnyString(this,t);for(let n=0;n<this.subs.length;n++)if(this.subs[n].eval(e,t))return!0;return!1;default:return!0}}},G(yt,"Type",{NONE:0,EXACT:1,AND:2,OR:3}),G(yt,"MAX_SCANS",32),G(yt,"MAX_AC_UNITS",1<<18),yt),Ht,H_=(Ht=class{static build(e){return e?yu.walk(e,Ht.WALKER):new Be(Be.Type.NONE)}static leaf(e){if(e.op!==y.Op.LITERAL)return new Be(Be.Type.NONE);if(e.runes.length===0||(e.flags&M.FOLD_CASE)!==0)return new Be(Be.Type.NONE);let t="";for(let s=0;s<e.runes.length;s++){if(W.isUnsearchable(e.runes[s]))return new Be(Be.Type.NONE);t+=String.fromCodePoint(e.runes[s])}const n=new Be(Be.Type.EXACT);return n.str=t,n.bytes=z.stringToUtf8ByteArray(n.str),n}static enter(e){switch(e.op){case y.Op.CAPTURE:case y.Op.PLUS:return{sub:null};case y.Op.REPEAT:return e.min>=1?{sub:null}:{result:new Be(Be.Type.NONE)};case y.Op.CONCAT:return{pf:new Be(Be.Type.AND),subs:[]};case y.Op.ALTERNATE:return{pf:new Be(Be.Type.OR),subs:[]};default:return{result:new Be(Be.Type.NONE)}}}static child(e,t,n){if(t.subs===void 0){t.sub=n;return}if(t.pf.type===Be.Type.AND){if(n.type===Be.Type.NONE)return;if(n.type===Be.Type.AND){for(let s=0;s<n.subs.length;s++)t.subs.push(n.subs[s]);return}t.subs.push(n);return}if(n.type===Be.Type.NONE){t.result=new Be(Be.Type.NONE);return}if(n.type===Be.Type.OR){for(let s=0;s<n.subs.length;s++)t.subs.push(n.subs[s]);return}t.subs.push(n)}static leave(e,t){if(t.subs===void 0)return t.sub;const n=t.pf,s=new Set,i=[];for(const c of t.subs){if(c.type===Be.Type.EXACT){if(s.has(c.str))continue;s.add(c.str)}i.push(c)}if(n.type===Be.Type.AND){const c=[];let h=0;for(const C of i)h+C.cost>Be.MAX_SCANS||(c.push(C),h+=C.cost);return c.length===0?new Be(Be.Type.NONE):c.length===1?c[0]:(n.subs=c,n.cost=h,n)}if(i.length===0)return new Be(Be.Type.NONE);if(i.length===1)return i[0];n.subs=i;let o=!0,B=0,u=0;for(const c of i)c.type!==Be.Type.EXACT?o=!1:u+=c.bytes.length,B+=c.cost;return o?u>Be.MAX_AC_UNITS?new Be(Be.Type.NONE):(n.allExact=!0,n.cost=1,n):B>Be.MAX_SCANS?new Be(Be.Type.NONE):(n.cost=B,n)}},G(Ht,"WALKER",{leaf:e=>Ht.leaf(e),enter:e=>Ht.enter(e),child:(e,t,n)=>Ht.child(e,t,n),leave:(e,t)=>Ht.leave(e,t)}),Ht),Ft=class{constructor(r=0,e=0){this.head=r,this.tail=e}},j_=class{constructor(){this.inst=[],this.start=0,this.numCap=2,this.lbStarts=[],this.numLb=0,this.lbInst=null}getInst(r){return this.inst[r]}numInst(){return this.inst.length}addInst(r){this.inst.push(new N(r))}markLookbehindInsts(){const r=new Uint8Array(this.inst.length),e=this.lbStarts.slice();for(;e.length>0;){const t=e.pop();if(t===0||r[t]===1)continue;r[t]=1;const n=this.inst[t];switch(n.op){case N.ALT:case N.ALT_MATCH:e.push(n.out,n.arg);break;case N.MATCH:case N.FAIL:break;default:e.push(n.out)}}this.lbInst=r}skipNop(r){let e=this.inst[r];for(;e.op===N.NOP||e.op===N.CAPTURE;)e=this.inst[r],r=e.out;return e}prefix(){let r="",e=this.skipNop(this.start);if(!N.isRuneOp(e.op)||e.runes.length!==1)return[e.op===N.MATCH,r];for(;N.isRuneOp(e.op)&&e.runes.length===1&&(e.arg&M.FOLD_CASE)===0&&!W.isUnsearchable(e.runes[0]);)r+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===N.MATCH,r]}startCond(){let r=0,e=this.start;e:for(;;){const t=this.inst[e];switch(t.op){case N.EMPTY_WIDTH:r|=t.arg;break;case N.FAIL:return-1;case N.CAPTURE:case N.NOP:break;default:break e}e=t.out}return r}patch(r,e){let t=r.head;for(;t!==0;){const n=this.inst[t>>1];(t&1)===0?(t=n.out,n.out=e):(t=n.arg,n.arg=e)}}append(r,e){if(r.head===0)return e;if(e.head===0)return r;const t=this.inst[r.tail>>1];return(r.tail&1)===0?t.out=e.head:t.arg=e.head,new Ft(r.head,e.tail)}toString(){let r="";for(let e=0;e<this.inst.length;e++){const t=r.length;r+=e,e===this.start&&(r+="*"),r+="        ".substring(r.length-t),r+=this.inst[e],r+=`
`}return r}};const J_=new Int32Array([0,x.CODES[`
`]-1,x.CODES[`
`]+1,W.MAX_RUNE]),dh=new Int32Array([0,W.MAX_RUNE]);var go=class{constructor(r=0,e=new Ft,t=!1){this.i=r,this.out=e,this.nullable=t}},q_=class YB{static compileRegexp(e){const t=new YB,n=t.compile(e);return t.prog.patch(n.out,t.newInst(N.MATCH).i),t.prog.start=n.i,t.prog.markLookbehindInsts(),t.prog}static compileSet(e){const t=new YB;if(e.length===0)return t.prog.start=t.newInst(N.FAIL).i,t.prog.markLookbehindInsts(),t.prog;let n=[];for(let i=0;i<e.length;i++){t.lbOffset=t.prog.numLb;const o=t.compile(e[i]),B=t.newInst(N.MATCH);t.prog.getInst(B.i).arg=i,t.prog.patch(o.out,B.i),n.push(o.i)}let s=n[0];for(let i=1;i<n.length;i++){const o=t.newInst(N.ALT),B=t.prog.getInst(o.i);B.out=s,B.arg=n[i],s=o.i}return t.prog.start=s,t.prog.markLookbehindInsts(),t.prog}constructor(){this.prog=new j_,this.newInst(N.FAIL),this.lbOffset=0,this.runeCache=new Map,this.walker={leaf:e=>this.leaf(e),enter:e=>this.enter(e),child:(e,t,n)=>this.child(e,t,n),leave:(e,t)=>this.leave(e,t)}}newInst(e){return this.prog.addInst(e),new go(this.prog.numInst()-1,new Ft,!0)}nop(){const e=this.newInst(N.NOP);return e.out=new Ft(e.i<<1,e.i<<1),e}fail(){return new go}cap(e){const t=this.newInst(N.CAPTURE);return t.out=new Ft(t.i<<1,t.i<<1),this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?(this.prog.patch(e.out,0),this.prog.patch(t.out,0),this.fail()):(this.prog.patch(e.out,t.i),new go(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;const n=this.newInst(N.ALT),s=this.prog.getInst(n.i);return s.out=e.i,s.arg=t.i,n.out=this.prog.append(e.out,t.out),n.nullable=e.nullable||t.nullable,n}loop(e,t){const n=this.newInst(N.ALT),s=this.prog.getInst(n.i);return t?(s.arg=e.i,n.out=new Ft(n.i<<1,n.i<<1)):(s.out=e.i,n.out=new Ft(n.i<<1|1,n.i<<1|1)),this.prog.patch(e.out,n.i),n}quest(e,t){if(e.i===0)return this.nop();const n=this.newInst(N.ALT),s=this.prog.getInst(n.i);return t?(s.arg=e.i,n.out=new Ft(n.i<<1,n.i<<1)):(s.out=e.i,n.out=new Ft(n.i<<1|1,n.i<<1|1)),n.out=this.prog.append(n.out,e.out),n}star(e,t){return e.i===0?this.nop():e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return e.i===0?this.fail():new go(e.i,this.loop(e,t).out,e.nullable)}empty(e){const t=this.newInst(N.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=new Ft(t.i<<1,t.i<<1),t}rune(e,t){const n=this.newInst(N.RUNE);n.nullable=!1;const s=this.prog.getInst(n.i);return s.runes=e,t&=M.FOLD_CASE,(e.length!==1||W.simpleFold(e[0])===e[0])&&(t&=-2),s.arg=t,n.out=new Ft(n.i<<1,n.i<<1),(t&M.FOLD_CASE)===0&&e.length===1||e.length===2&&e[0]===e[1]?s.op=N.RUNE1:e.length===2&&e[0]===0&&e[1]===W.MAX_RUNE?s.op=N.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===x.CODES[`
`]-1&&e[2]===x.CODES[`
`]+1&&e[3]===W.MAX_RUNE&&(s.op=N.RUNE_ANY_NOT_NL),n}lookBehind(e,t){const n=Math.sign(t)*(Math.abs(t)+this.lbOffset),s=this.newInst(N.LB_WRITE);this.prog.getInst(s.i).arg=n;const i=this.rune(dh,0),o=this.star(i,!0),B=this.cat(o,e);this.prog.patch(B.out,s.i);const u=this.newInst(N.LB_CHECK);return this.prog.getInst(u.i).arg=n,this.prog.lbStarts.push(B.i),Math.abs(n)>this.prog.numLb&&(this.prog.numLb=Math.abs(n)),u.out=new Ft(u.i<<1,u.i<<1),u}compile(e){return yu.walk(e,this.walker)}leaf(e){switch(e.op){case y.Op.NO_MATCH:return this.fail();case y.Op.EMPTY_MATCH:return this.nop();case y.Op.LITERAL:{if(e.runes.length===0)return this.nop();let t=null;for(let n of e.runes){let s=this.runeCache.get(n);s===void 0&&(s=new Int32Array([n]),this.runeCache.set(n,s));const i=this.rune(s,e.flags);t=t===null?i:this.cat(t,i)}return t}case y.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case y.Op.ANY_CHAR_NOT_NL:return this.rune(J_,0);case y.Op.ANY_CHAR:return this.rune(dh,0);case y.Op.BEGIN_LINE:return this.empty(z.EMPTY_BEGIN_LINE);case y.Op.END_LINE:return this.empty(z.EMPTY_END_LINE);case y.Op.BEGIN_TEXT:return this.empty(z.EMPTY_BEGIN_TEXT);case y.Op.END_TEXT:return this.empty(z.EMPTY_END_TEXT);case y.Op.WORD_BOUNDARY:return this.empty(z.EMPTY_WORD_BOUNDARY);case y.Op.NO_WORD_BOUNDARY:return this.empty(z.EMPTY_NO_WORD_BOUNDARY);case y.Op.CONCAT:case y.Op.ALTERNATE:return this.nop();default:throw new yB("regexp: unhandled case in compile")}}enter(e){switch(e.op){case y.Op.PLB:case y.Op.NLB:case y.Op.STAR:case y.Op.PLUS:case y.Op.QUEST:return{sub:null};case y.Op.CAPTURE:return{bra:this.cap(e.cap<<1),sub:null};case y.Op.CONCAT:case y.Op.ALTERNATE:return{f:null};default:throw new yB("regexp: unhandled case in compile")}}child(e,t,n){e.op===y.Op.CONCAT?t.f=t.f===null?n:this.cat(t.f,n):e.op===y.Op.ALTERNATE?t.f=t.f===null?n:this.alt(t.f,n):t.sub=n}leave(e,t){switch(e.op){case y.Op.PLB:case y.Op.NLB:return this.lookBehind(t.sub,e.lb);case y.Op.CAPTURE:{const n=this.cap(e.cap<<1|1);return this.cat(this.cat(t.bra,t.sub),n)}case y.Op.STAR:return this.star(t.sub,(e.flags&M.NON_GREEDY)!==0);case y.Op.PLUS:return this.plus(t.sub,(e.flags&M.NON_GREEDY)!==0);case y.Op.QUEST:return this.quest(t.sub,(e.flags&M.NON_GREEDY)!==0);case y.Op.CONCAT:case y.Op.ALTERNATE:return t.f;default:throw new yB("regexp: unhandled case in compile")}}},ke,K_=(ke=class{static simplify(e){return e===null?null:yu.walk(e,ke.WALKER)}static leaf(e){if(e.op===y.Op.CHAR_CLASS){if(e.runes===null)return e;if(e.runes.length===0)return new y(y.Op.NO_MATCH);if(e.runes.length===2&&e.runes[0]===0&&e.runes[1]===W.MAX_RUNE)return new y(y.Op.ANY_CHAR);if(e.runes.length===4&&e.runes[0]===0&&e.runes[1]===x.CODES[`
`]-1&&e.runes[2]===x.CODES[`
`]+1&&e.runes[3]===W.MAX_RUNE)return new y(y.Op.ANY_CHAR_NOT_NL)}return e}static enter(e){switch(e.op){case y.Op.PLB:case y.Op.NLB:case y.Op.CAPTURE:case y.Op.STAR:case y.Op.PLUS:case y.Op.QUEST:return{sub:null};case y.Op.CONCAT:case y.Op.ALTERNATE:return{subs:[],changed:!1};case y.Op.REPEAT:return e.min===0&&e.max===0?{result:new y(y.Op.EMPTY_MATCH)}:{sub:null};default:return{result:e}}}static child(e,t,n,s){if(t.subs===void 0){t.sub=n;return}if(n!==e.subs[s]&&(t.changed=!0),e.op===y.Op.CONCAT){if(n.op===y.Op.NO_MATCH){t.result=new y(y.Op.NO_MATCH);return}if(n.op===y.Op.EMPTY_MATCH){t.changed=!0;return}if(n.op===y.Op.CONCAT){t.changed=!0;for(let i=0;i<n.subs.length;i++)t.subs.push(n.subs[i]);return}}else{if(n.op===y.Op.NO_MATCH){t.changed=!0;return}if(n.op===y.Op.ALTERNATE){t.changed=!0;for(let i=0;i<n.subs.length;i++)t.subs.push(n.subs[i]);return}}t.subs.push(n)}static leave(e,t){switch(e.op){case y.Op.PLB:case y.Op.NLB:case y.Op.CAPTURE:{const n=t.sub;if(n!==e.subs[0]){const s=y.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=[n],s}return e}case y.Op.CONCAT:case y.Op.ALTERNATE:if(t.changed){const n=t.subs;if(n.length===0)return new y(e.op===y.Op.CONCAT?y.Op.EMPTY_MATCH:y.Op.NO_MATCH);if(n.length===1)return n[0];const s=y.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=n,s}return e;case y.Op.STAR:case y.Op.PLUS:case y.Op.QUEST:return ke.simplify1(e.op,e.flags,t.sub,e);case y.Op.REPEAT:return ke.simplifyRepeat(e,t.sub);default:return e}}static simplifyRepeat(e,t){if(e.max===-1){if(e.min===0)return ke.simplify1(y.Op.STAR,e.flags,t,null);if(e.min===1)return ke.simplify1(y.Op.PLUS,e.flags,t,null);const s=[];for(let i=0;i<e.min-1;i++)s.push(t);return s.push(ke.simplify1(y.Op.PLUS,e.flags,t,null)),ke.concat(s)}if(e.min===1&&e.max===1)return t;let n=null;if(e.min>0){n=[];for(let s=0;s<e.min;s++)n.push(t)}if(e.max>e.min){let s=ke.simplify1(y.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++)s=ke.simplify1(y.Op.QUEST,e.flags,ke.concat([t,s]),null);if(n===null)return s;n.push(s)}return n!==null?ke.concat(n):new y(y.Op.NO_MATCH)}static concat(e){const t=[];for(let s=0;s<e.length;s++){const i=e[s];if(i.op===y.Op.NO_MATCH)return new y(y.Op.NO_MATCH);if(i.op!==y.Op.EMPTY_MATCH){if(i.op===y.Op.CONCAT){for(let o=0;o<i.subs.length;o++)t.push(i.subs[o]);continue}t.push(i)}}if(t.length===0)return new y(y.Op.EMPTY_MATCH);if(t.length===1)return t[0];const n=new y(y.Op.CONCAT);return n.subs=t,n}static simplify1(e,t,n,s){if(n.op===y.Op.EMPTY_MATCH)return n;if(n.op===y.Op.NO_MATCH)return e===y.Op.PLUS?n:new y(y.Op.EMPTY_MATCH);if(e===n.op&&(t&M.NON_GREEDY)===(n.flags&M.NON_GREEDY))return n;if(s!==null&&s.op===e&&(s.flags&M.NON_GREEDY)===(t&M.NON_GREEDY)&&n===s.subs[0])return s;const i=new y(e);return i.flags=t,i.subs=[n],i}},G(ke,"WALKER",{leaf:e=>ke.leaf(e),enter:e=>ke.enter(e),child:(e,t,n,s)=>ke.child(e,t,n,s),leave:(e,t)=>ke.leave(e,t)}),ke),de=class{constructor(r,e){this.sign=r,this.cls=e}};const ph=[48,57],gh=[9,10,12,13,32,32],mh=[48,57,65,90,95,95,97,122],Eh=new Map([["\\d",new de(1,ph)],["\\D",new de(-1,ph)],["\\s",new de(1,gh)],["\\S",new de(-1,gh)],["\\w",new de(1,mh)],["\\W",new de(-1,mh)]]),_h=[48,57,65,90,97,122],Dh=[65,90,97,122],wh=[0,127],Ih=[9,9,32,32],yh=[0,31,127,127],Th=[48,57],Ah=[33,126],Rh=[97,122],vh=[32,126],bh=[33,47,58,64,91,96,123,126],Ph=[9,13,32,32],Oh=[65,90],Sh=[48,57,65,90,95,95,97,122],Nh=[48,57,65,70,97,102],Fh=new Map([["[:alnum:]",new de(1,_h)],["[:^alnum:]",new de(-1,_h)],["[:alpha:]",new de(1,Dh)],["[:^alpha:]",new de(-1,Dh)],["[:ascii:]",new de(1,wh)],["[:^ascii:]",new de(-1,wh)],["[:blank:]",new de(1,Ih)],["[:^blank:]",new de(-1,Ih)],["[:cntrl:]",new de(1,yh)],["[:^cntrl:]",new de(-1,yh)],["[:digit:]",new de(1,Th)],["[:^digit:]",new de(-1,Th)],["[:graph:]",new de(1,Ah)],["[:^graph:]",new de(-1,Ah)],["[:lower:]",new de(1,Rh)],["[:^lower:]",new de(-1,Rh)],["[:print:]",new de(1,vh)],["[:^print:]",new de(-1,vh)],["[:punct:]",new de(1,bh)],["[:^punct:]",new de(-1,bh)],["[:space:]",new de(1,Ph)],["[:^space:]",new de(-1,Ph)],["[:upper:]",new de(1,Oh)],["[:^upper:]",new de(-1,Oh)],["[:word:]",new de(1,Sh)],["[:^word:]",new de(-1,Sh)],["[:xdigit:]",new de(1,Nh)],["[:^xdigit:]",new de(-1,Nh)]]);var Cr=class Ro{static charClassToString(e,t){let n="[";for(let s=0;s<t;s+=2){s>0&&(n+=" ");const i=e[s],o=e[s+1];i===o?n+=`0x${i.toString(16)}`:n+=`0x${i.toString(16)}-0x${o.toString(16)}`}return n+="]",n}static sortRanges(e,t){const n=t>>1,s=new Array(n);for(let o=0;o<n;o++)s[o]=o;s.sort((o,B)=>e[2*o]-e[2*B]||e[2*B+1]-e[2*o+1]);const i=e.slice(0,t);for(let o=0;o<n;o++)e[2*o]=i[2*s[o]],e[2*o+1]=i[2*s[o]+1]}constructor(e=z.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.r instanceof Int32Array?this.len===this.r.length?this.r:this.r.subarray(0,this.len):new Int32Array(this.len===this.r.length?this.r:this.r.slice(0,this.len))}toGrowableArray(){return Array.isArray(this.r)?(this.r.length=this.len,this.r):Array.from(this.r.subarray(0,this.len))}cleanClass(){if(this.len<4)return this;Ro.sortRanges(this.r,this.len);let e=2;for(let t=2;t<this.len;t+=2){const n=this.r[t],s=this.r[t+1];if(n<=this.r[e-1]+1){s>this.r[e-1]&&(this.r[e-1]=s);continue}this.r[e]=n,this.r[e+1]=s,e+=2}return this.len=e,this}appendLiteral(e,t){return(t&M.FOLD_CASE)!==0?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let n=2;n<=4;n+=2)if(this.len>=n){const s=this.r[this.len-n],i=this.r[this.len-n+1];if(e<=i+1&&s<=t+1)return e<s&&(this.r[this.len-n]=e),t>i&&(this.r[this.len-n+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=W.MIN_FOLD&&t>=W.MAX_FOLD)return this.appendRange(e,t);if(t<W.MIN_FOLD||e>W.MAX_FOLD)return this.appendRange(e,t);e<W.MIN_FOLD&&(this.appendRange(e,W.MIN_FOLD-1),e=W.MIN_FOLD),t>W.MAX_FOLD&&(this.appendRange(W.MAX_FOLD+1,t),t=W.MAX_FOLD);for(let n=e;n<=t;n++){this.appendRange(n,n);for(let s=W.simpleFold(n);s!==n;s=W.simpleFold(s))this.appendRange(s,s)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let n=0;n<e.length;n+=2){const s=e[n],i=e[n+1];t<=s-1&&this.appendRange(t,s-1),t=i+1}return t<=W.MAX_RUNE&&this.appendRange(t,W.MAX_RUNE),this}appendTable(e){for(let t=0;t<e.length;++t){const n=e.getLo(t),s=e.getHi(t),i=e.getStride(t);if(i===1){this.appendRange(n,s);continue}for(let o=n;o<=s;o+=i)this.appendRange(o,o)}return this}appendNegatedTable(e){let t=0;for(let n=0;n<e.length;++n){const s=e.getLo(n),i=e.getHi(n),o=e.getStride(n);if(o===1){t<=s-1&&this.appendRange(t,s-1),t=i+1;continue}for(let B=s;B<=i;B+=o)t<=B-1&&this.appendRange(t,B-1),t=B+1}return t<=W.MAX_RUNE&&this.appendRange(t,W.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let n=0;n<this.len;n+=2){const s=this.r[n],i=this.r[n+1];e<=s-1&&(this.r[t]=e,this.r[t+1]=s-1,t+=2),e=i+1}return this.len=t,e<=W.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=W.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let n=e.cls;return t&&(n=new Ro().appendFoldedClass(n).cleanClass().toArray()),this.appendClassWithSign(n,e.sign)}toString(){return Ro.charClassToString(this.r,this.len)}},z_=class{constructor(r){this.str=r,this.position=0}pos(){return this.position}rewindTo(r){this.position=r}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(r){this.position+=r}skipString(r){this.position+=r.length}pop(){const r=this.str.codePointAt(this.position);return this.position+=z.charCount(r),r}lookingAt(r){return this.str.startsWith(r,this.position)}rest(){return this.str.substring(this.position)}from(r){return this.str.substring(r,this.position)}toString(){return this.rest()}},j,W_=(j=class{static unicodeTable(e){return e==="Any"?{tab:j.ANY_TABLE,fold:j.ANY_TABLE,sign:1}:e==="Ascii"?{tab:j.ASCII_TABLE,fold:j.ASCII_FOLD_TABLE,sign:1}:e==="Assigned"?{tab:wt.CATEGORIES.get("Cn"),fold:wt.CATEGORIES.get("Cn"),sign:-1}:e==="Lc"?{tab:wt.CATEGORIES.get("LC"),fold:wt.FOLD_CATEGORIES.get("LC"),sign:1}:wt.CATEGORIES.has(e)?{tab:wt.CATEGORIES.get(e),fold:wt.FOLD_CATEGORIES.get(e),sign:1}:wt.SCRIPTS.has(e)?{tab:wt.SCRIPTS.get(e),fold:wt.FOLD_SCRIPT.get(e),sign:1}:null}static minFoldRune(e){if(e<W.MIN_FOLD||e>W.MAX_FOLD)return e;let t=e;const n=e;for(e=W.simpleFold(e);e!==n;e=W.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===y.Op.EMPTY_MATCH)return null;if(e.op===y.Op.CONCAT&&e.subs.length>0){const t=e.subs[0];return t.op===y.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){const n=new y(y.Op.LITERAL);return n.flags=t,n.runes=z.stringToRunes(e),n}static parse(e,t){return new j(e,t).parseInternal()}static parseRepeat(e){const t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);const n=j.parseInt(e);if(n===-1||!e.more())return-1;let s;if(!e.lookingAt(","))s=n;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))s=-1;else if((s=j.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),n<0||n>1e3||s===-2||s>1e3||s>=0&&n>s)throw new Te(j.ERR_INVALID_REPEAT_SIZE,e.from(t));return n<<16|s&W.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){const n=e.codePointAt(t);if(n!==x.CODES._&&!z.isalnum(n))return!1}return!0}static parseInt(e){const t=e.pos();for(;e.more()&&e.peek()>=x.CODES[0]&&e.peek()<=x.CODES[9];)e.skip(1);const n=e.from(t);return n.length===0||n.length>1&&n.codePointAt(0)===x.CODES[0]?-1:n.length>8?-2:parseInt(n,10)}static isCharClass(e){return e.op===y.Op.LITERAL&&e.runes.length===1||e.op===y.Op.CHAR_CLASS||e.op===y.Op.ANY_CHAR_NOT_NL||e.op===y.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case y.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case y.Op.CHAR_CLASS:for(let n=0;n<e.runes.length;n+=2)if(e.runes[n]<=t&&t<=e.runes[n+1])return!0;return!1;case y.Op.ANY_CHAR_NOT_NL:return t!==x.CODES[`
`];case y.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case y.Op.ANY_CHAR:break;case y.Op.ANY_CHAR_NOT_NL:j.matchRune(t,x.CODES[`
`])&&(e.op=y.Op.ANY_CHAR);break;case y.Op.CHAR_CLASS:{const n=new Cr(Array.isArray(e.runes)?e.runes:Array.from(e.runes));t.op===y.Op.LITERAL?n.appendLiteral(t.runes[0],t.flags):n.appendClass(t.runes),e.runes=n.toGrowableArray();break}case y.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=y.Op.CHAR_CLASS,e.runes=new Cr().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toGrowableArray()}}static parseEscape(e){const t=e.pos();if(e.skip(1),!e.more())throw new Te(j.ERR_TRAILING_BACKSLASH);let n=e.pop();e:switch(n){case x.CODES[1]:case x.CODES[2]:case x.CODES[3]:case x.CODES[4]:case x.CODES[5]:case x.CODES[6]:case x.CODES[7]:if(!e.more()||e.peek()<x.CODES[0]||e.peek()>x.CODES[7])break;case x.CODES[0]:{let s=n-x.CODES[0];for(let i=1;i<3&&!(!e.more()||e.peek()<x.CODES[0]||e.peek()>x.CODES[7]);i++)s=s*8+e.peek()-x.CODES[0],e.skip(1);return s}case x.CODES.x:{if(!e.more())break;if(n=e.pop(),n===x.CODES["{"]){let o=0,B=0;for(;;){if(!e.more())break e;if(n=e.pop(),n===x.CODES["}"])break;const u=z.unhex(n);if(u<0||(B=B*16+u,B>W.MAX_RUNE))break e;o++}if(o===0)break e;return B}const s=z.unhex(n);if(!e.more())break;n=e.pop();const i=z.unhex(n);if(s<0||i<0)break;return s*16+i}case x.CODES.a:return x.CODES["\x07"];case x.CODES.f:return x.CODES["\f"];case x.CODES.n:return x.CODES[`
`];case x.CODES.r:return x.CODES["\r"];case x.CODES.t:return x.CODES["	"];case x.CODES.v:return x.CODES["\v"];default:if(n<=W.MAX_ASCII&&!z.isalnum(n))return n}throw new Te(j.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new Te(j.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?j.parseEscape(e):e.pop()}static hasCapture(e){if(e===null)return!1;if(e.op===y.Op.CAPTURE)return!0;if(e.subs){for(let t of e.subs)if(j.hasCapture(t))return!0}return!1}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups=Object.create(null),this.stack=[],this.free=null,this.numRegexp=0,this.numRunes=0,this.repeats=0,this.height=null,this.size=null,this.nlb=0}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):(t=new y(e),this.numRegexp+=1),t}reuse(e){this.height!==null&&this.height.has(e)&&this.height.delete(e),e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}checkLimits(e){if(this.numRunes>j.MAX_RUNES)throw new Te(j.ERR_LARGE);this.checkSize(e),this.checkHeight(e)}checkSize(e){if(this.size===null){if(this.repeats===0&&(this.repeats=1),e.op===y.Op.REPEAT){let t=e.max;t===-1&&(t=e.min),t<=0&&(t=1),t>Math.floor(j.MAX_SIZE/this.repeats)?this.repeats=j.MAX_SIZE:this.repeats*=t}if(this.numRegexp<Math.floor(j.MAX_SIZE/this.repeats))return;this.size=new Map;for(let t of this.stack)this.checkSize(t)}if(this.calcSize(e,!0)>j.MAX_SIZE)throw new Te(j.ERR_LARGE)}calcSize(e,t=!1){if(!t&&this.size!==null&&this.size.has(e))return this.size.get(e);let n=0;switch(e.op){case y.Op.LITERAL:n=e.runes.length;break;case y.Op.PLB:case y.Op.NLB:case y.Op.CAPTURE:case y.Op.STAR:n=2+this.calcSize(e.subs[0]);break;case y.Op.PLUS:case y.Op.QUEST:n=1+this.calcSize(e.subs[0]);break;case y.Op.CONCAT:for(let s of e.subs)n=n+this.calcSize(s);break;case y.Op.ALTERNATE:for(let s of e.subs)n=n+this.calcSize(s);e.subs.length>1&&(n=n+e.subs.length-1);break;case y.Op.REPEAT:{let s=this.calcSize(e.subs[0]);if(e.max===-1){e.min===0?n=2+s:n=1+e.min*s;break}n=e.max*s+(e.max-e.min);break}}return n=Math.max(1,n),this.size===null&&(this.size=new Map),this.size.set(e,n),n}checkHeight(e){if(!(this.numRegexp<j.MAX_HEIGHT)){if(this.height===null){this.height=new Map;for(let t of this.stack)this.checkHeight(t)}if(this.calcHeight(e,!0)>j.MAX_HEIGHT)throw new Te(j.ERR_NESTING_DEPTH)}}calcHeight(e,t=!1){if(!t&&this.height!==null&&this.height.has(e))return this.height.get(e);let n=1;for(let s of e.subs){const i=this.calcHeight(s);n<1+i&&(n=1+i)}return this.height===null&&(this.height=new Map),this.height.set(e,n),n}pop(){return this.stack.pop()}popToPseudo(){const e=this.stack.length;let t=e;for(;t>0&&!y.isPseudoOp(this.stack[t-1].op);)t--;return this.stack.splice(t,e-t)}push(e){if(this.numRunes+=e.runes.length,e.op===y.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&-2))return null;e.op=y.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&-2}else if(e.op===y.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&W.simpleFold(e.runes[0])===e.runes[2]&&W.simpleFold(e.runes[2])===e.runes[0]||e.op===y.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&W.simpleFold(e.runes[0])===e.runes[1]&&W.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|M.FOLD_CASE))return null;e.op=y.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|M.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),this.checkLimits(e),e}maybeConcat(e,t){const n=this.stack.length;if(n<2)return!1;const s=this.stack[n-1],i=this.stack[n-2];if(s.op!==y.Op.LITERAL||i.op!==y.Op.LITERAL||(s.flags&M.FOLD_CASE)!==(i.flags&M.FOLD_CASE))return!1;Array.isArray(i.runes)||(i.runes=Array.from(i.runes));for(let o=0;o<s.runes.length;o++)i.runes.push(s.runes[o]);return e>=0?(s.runes=[e],s.flags=t,!0):(this.pop(),this.reuse(s),!1)}newLiteral(e,t){const n=this.newRegexp(y.Op.LITERAL);return n.flags=t,(t&M.FOLD_CASE)!==0&&(e=j.minFoldRune(e)),n.runes=[e],n}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){const t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,n,s,i,o){let B=this.flags;if((B&M.PERL_X)!==0&&(i.more()&&i.lookingAt("?")&&(i.skip(1),B^=M.NON_GREEDY),o!==-1))throw new Te(j.ERR_INVALID_REPEAT_OP,i.from(o));const u=this.stack.length;if(u===0)throw new Te(j.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const c=this.stack[u-1];if(y.isPseudoOp(c.op))throw new Te(j.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const h=this.newRegexp(e);if(h.min=t,h.max=n,h.flags=B,h.subs=[c],this.stack[u-1]=h,this.checkLimits(h),e===y.Op.REPEAT&&(t>=2||n>=2)&&!this.repeatIsValid(h,1e3))throw new Te(j.ERR_INVALID_REPEAT_SIZE,i.from(s))}repeatIsValid(e,t){if(e.op===y.Op.REPEAT){let n=e.max;if(n===0)return!0;if(n<0&&(n=e.min),n>t)return!1;n>0&&(t=Math.trunc(t/n))}for(let n of e.subs)if(!this.repeatIsValid(n,t))return!1;return!0}concat(){this.maybeConcat(-1,0);const e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(y.Op.EMPTY_MATCH)):this.push(this.collapse(e,y.Op.CONCAT))}alternate(){const e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(y.Op.NO_MATCH)):this.push(this.collapse(e,y.Op.ALTERNATE))}cleanAlt(e){e.op===y.Op.CHAR_CLASS&&(e.runes=new Cr(Array.from(e.runes)).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===W.MAX_RUNE?(e.runes=new Int32Array(0),e.op=y.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===x.CODES[`
`]-1&&e.runes[2]===x.CODES[`
`]+1&&e.runes[3]===W.MAX_RUNE&&(e.runes=new Int32Array(0),e.op=y.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let n=0;for(let B of e)n+=B.op===t?B.subs.length:1;let s=new Array(n).fill(null),i=0;for(let B of e)if(B.op===t){for(let u=0;u<B.subs.length;u++)s[i++]=B.subs[u];this.reuse(B)}else s[i++]=B;let o=this.newRegexp(t);if(o.subs=s,t===y.Op.ALTERNATE&&(o.subs=this.factor(o.subs),o.subs.length===1)){const B=o;o=o.subs[0],this.reuse(B)}return o}factor(e){if(e.length<2)return e;let t=0,n=e.length,s=0,i=null,o=0,B=0,u=0;for(let h=0;h<=n;h++){let C=null,d=0,E=0;if(h<n){let D=e[t+h];if(D.op===y.Op.CONCAT&&D.subs.length>0&&(D=D.subs[0]),D.op===y.Op.LITERAL&&(C=D.runes,d=D.runes.length,E=D.flags&M.FOLD_CASE),E===B){let b=0;for(;b<o&&b<d&&i[b]===C[b];)b++;if(b>0){o=b;continue}}}if(h!==u)if(h===u+1)e[s++]=e[t+u];else{const D=this.newRegexp(y.Op.LITERAL);D.flags=B,D.runes=i.slice(0,o);for(let U=u;U<h;U++)e[t+U]=this.removeLeadingString(e[t+U],o),this.checkLimits(e[t+U]);const b=this.collapse(e.slice(t+u,t+h),y.Op.ALTERNATE),F=this.newRegexp(y.Op.CONCAT);F.subs=[D,b],e[s++]=F}u=h,i=C,o=d,B=E}n=s,t=0,u=0,s=0;let c=null;for(let h=0;h<=n;h++){let C=null;if(!(h<n&&(C=j.leadingRegexp(e[t+h]),c!==null&&c.equals(C)&&(j.isCharClass(c)||c.op===y.Op.REPEAT&&c.min===c.max&&j.isCharClass(c.subs[0]))))){if(h!==u)if(h===u+1)e[s++]=e[t+u];else{const d=c;for(let b=u;b<h;b++){const F=b!==u;e[t+b]=this.removeLeadingRegexp(e[t+b],F),this.checkLimits(e[t+b])}const E=this.collapse(e.slice(t+u,t+h),y.Op.ALTERNATE),D=this.newRegexp(y.Op.CONCAT);D.subs=[d,E],e[s++]=D}u=h,c=C}}n=s,t=0,u=0,s=0;for(let h=0;h<=n;h++)if(!(h<n&&j.isCharClass(e[t+h]))){if(h!==u)if(h===u+1)e[s++]=e[t+u];else{let C=u;for(let E=u+1;E<h;E++){const D=e[t+C],b=e[t+E];(D.op<b.op||D.op===b.op&&(D.runes!==null?D.runes.length:0)<(b.runes!==null?b.runes.length:0))&&(C=E)}const d=e[t+u];e[t+u]=e[t+C],e[t+C]=d;for(let E=u+1;E<h;E++)j.mergeCharClass(e[t+u],e[t+E]),this.reuse(e[t+E]);this.cleanAlt(e[t+u]),e[s++]=e[t+u]}h<n&&(e[s++]=e[t+h]),u=h+1}n=s,t=0,u=0,s=0;for(let h=0;h<n;++h)h+1<n&&e[t+h].op===y.Op.EMPTY_MATCH&&e[t+h+1].op===y.Op.EMPTY_MATCH||(e[s++]=e[t+h]);return n=s,t=0,e.slice(t,n)}removeLeadingString(e,t){if(e.op===y.Op.CONCAT&&e.subs.length>0){const n=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=n,n.op===y.Op.EMPTY_MATCH)switch(this.reuse(n),e.subs.length){case 0:case 1:e.op=y.Op.EMPTY_MATCH,e.subs=y.emptySubs();break;case 2:{const s=e;e=e.subs[1],this.reuse(s);break}default:e.subs=e.subs.slice(1,e.subs.length)}return e}return e.op===y.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=y.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===y.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=y.Op.EMPTY_MATCH,e.subs=y.emptySubs();break;case 1:{const n=e;e=e.subs[0],this.reuse(n);break}}return e}return t&&this.reuse(e),this.newRegexp(y.Op.EMPTY_MATCH)}parseInternal(){if((this.flags&M.LITERAL)!==0)return j.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,n=-1;const s=new z_(this.wholeRegexp);for(;s.more();){let i=-1;e:switch(s.peek()){case x.CODES["("]:if((this.flags&M.LOOKBEHIND)!==0){if(s.lookingAt("(?<=")){this.parsePosLookBehind(),s.skip(4);break}if(s.lookingAt("(?<!")){this.parseNegLookBehind(),s.skip(4);break}}if((this.flags&M.PERL_X)!==0&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(y.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case x.CODES["|"]:this.parseVerticalBar(),s.skip(1);break;case x.CODES[")"]:this.parseRightParen(),s.skip(1);break;case x.CODES["^"]:(this.flags&M.ONE_LINE)!==0?this.op(y.Op.BEGIN_TEXT):this.op(y.Op.BEGIN_LINE),s.skip(1);break;case x.CODES.$:(this.flags&M.ONE_LINE)!==0?this.op(y.Op.END_TEXT).flags|=M.WAS_DOLLAR:this.op(y.Op.END_LINE),s.skip(1);break;case x.CODES["."]:(this.flags&M.DOT_NL)!==0?this.op(y.Op.ANY_CHAR):this.op(y.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case x.CODES["["]:this.parseClass(s);break;case x.CODES["*"]:case x.CODES["+"]:case x.CODES["?"]:{i=s.pos();let o=null;switch(s.pop()){case x.CODES["*"]:o=y.Op.STAR;break;case x.CODES["+"]:o=y.Op.PLUS;break;case x.CODES["?"]:o=y.Op.QUEST}this.repeat(o,t,n,i,s,e);break}case x.CODES["{"]:{const o=s.pos(),B=j.parseRepeat(s);if(B<0){s.rewindTo(o),this.literal(s.pop());break}i=o,t=B>>16,n=(B&W.MAX_BMP)<<16>>16,this.repeat(y.Op.REPEAT,t,n,i,s,e);break}case x.CODES["\\"]:{const o=s.pos();if(s.skip(1),(this.flags&M.PERL_X)!==0&&s.more())switch(s.pop()){case x.CODES.A:this.op(y.Op.BEGIN_TEXT);break e;case x.CODES.b:this.op(y.Op.WORD_BOUNDARY);break e;case x.CODES.B:this.op(y.Op.NO_WORD_BOUNDARY);break e;case x.CODES.C:throw new Te(j.ERR_INVALID_ESCAPE,"\\C");case x.CODES.Q:{let c=s.rest();const h=c.indexOf("\\E");h>=0?(c=c.substring(0,h),s.skipString(c),s.skipString("\\E")):s.skipString(c);let C=0;for(;C<c.length;){const d=c.codePointAt(C);this.literal(d),C+=z.charCount(d)}break e}case x.CODES.z:this.op(y.Op.END_TEXT);break e;default:s.rewindTo(o)}else s.rewindTo(o);const B=this.newRegexp(y.Op.CHAR_CLASS);if(B.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){const c=new Cr;if(this.parseUnicodeClass(s,c)){B.runes=c.toArray(),this.push(B);break e}}const u=new Cr;if(this.parsePerlClassEscape(s,u)){B.runes=u.toArray(),this.push(B);break e}s.rewindTo(o),this.reuse(B),this.literal(j.parseEscape(s));break}default:this.literal(s.pop())}e=i}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new Te(j.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){const t=e.pos(),n=e.rest();if(n.startsWith("(?P<")||n.startsWith("(?<")){const B=n.charAt(2)==="P"?4:3,u=n.indexOf(">");if(u<0)throw new Te(j.ERR_INVALID_NAMED_CAPTURE,n);const c=n.substring(B,u);if(e.skipString(c),e.skip(B+1),!j.isValidCaptureName(c))throw new Te(j.ERR_INVALID_NAMED_CAPTURE,n.substring(0,u+1));const h=this.op(y.Op.LEFT_PAREN);if(h.cap=++this.numCap,this.namedGroups[c])throw new Te(j.ERR_DUPLICATE_NAMED_CAPTURE,c);this.namedGroups[c]=this.numCap,h.name=c;return}e.skip(2);let s=this.flags,i=1,o=!1;e:for(;e.more();){const B=e.pop();switch(B){case x.CODES.i:s|=M.FOLD_CASE,o=!0;break;case x.CODES.m:s&=-17,o=!0;break;case x.CODES.s:s|=M.DOT_NL,o=!0;break;case x.CODES.U:s|=M.NON_GREEDY,o=!0;break;case x.CODES["-"]:if(i<0)break e;i=-1,s=~s,o=!1;break;case x.CODES[":"]:case x.CODES[")"]:if(i<0){if(!o)break e;s=~s}B===x.CODES[":"]&&this.op(y.Op.LEFT_PAREN),this.flags=s;return;default:break e}}throw new Te(j.ERR_INVALID_PERL_OP,e.from(t))}parsePosLookBehind(){const e=this.newRegexp(y.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=++this.nlb,this.push(e)}parseNegLookBehind(){const e=this.newRegexp(y.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=-++this.nlb,this.push(e)}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(y.Op.VERTICAL_BAR)}swapVerticalBar(){const e=this.stack.length;if(e>=3&&this.stack[e-2].op===y.Op.VERTICAL_BAR&&j.isCharClass(this.stack[e-1])&&j.isCharClass(this.stack[e-3])){let t=this.stack[e-1],n=this.stack[e-3];if(t.op>n.op){const s=n;n=t,t=s,this.stack[e-3]=n}return j.mergeCharClass(n,t),this.reuse(t),this.pop(),!0}if(e>=2){const t=this.stack[e-1],n=this.stack[e-2];if(n.op===y.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=n,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new Te(j.ERR_UNEXPECTED_PAREN,this.wholeRegexp);const e=this.pop(),t=this.pop();if(t.op!==y.Op.LEFT_PAREN)throw new Te(j.ERR_UNEXPECTED_PAREN,this.wholeRegexp);if(this.flags=t.flags,t.lb!==0){if(j.hasCapture(e))throw new Te(j.ERR_INVALID_CAPTURE_IN_LOOKBEHIND,this.wholeRegexp);t.lb>0?t.op=y.Op.PLB:t.op=y.Op.NLB,t.subs=[e],this.push(t);return}t.cap===0?this.push(e):(t.op=y.Op.CAPTURE,t.subs=[e],this.push(t))}parsePerlClassEscape(e,t){const n=e.pos();if((this.flags&M.PERL_X)===0||!e.more()||e.pop()!==x.CODES["\\"]||!e.more())return!1;e.pop();const s=e.from(n),i=Eh.has(s)?Eh.get(s):null;return i===null?!1:(t.appendGroup(i,(this.flags&M.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){const n=e.rest(),s=n.indexOf(":]");if(s<0)return!1;const i=n.substring(0,s+2);e.skipString(i);const o=Fh.has(i)?Fh.get(i):null;if(o===null)throw new Te(j.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(o,(this.flags&M.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){const n=e.pos();if((this.flags&M.UNICODE_GROUPS)===0||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let s=1,i=e.pop();if(i===x.CODES.P&&(s=-1),!e.more())throw e.rewindTo(n),new Te(j.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let o;if(i!==x.CODES["{"])o=z.runeToString(i);else{const h=e.rest(),C=h.indexOf("}");if(C<0)throw e.rewindTo(n),new Te(j.ERR_INVALID_CHAR_RANGE,e.rest());o=h.substring(0,C),e.skipString(o),e.skip(1)}o.length!==0&&o.codePointAt(0)===x.CODES["^"]&&(s=0-s,o=o.substring(1));const B=j.unicodeTable(o);if(B===null)throw new Te(j.ERR_INVALID_CHAR_RANGE,e.from(n));B.sign<0&&(s=0-s);const u=B.tab,c=B.fold;if((this.flags&M.FOLD_CASE)===0||c===null)t.appendTableWithSign(u,s);else{const h=new Cr().appendTable(u).appendTable(c).cleanClass().toArray();t.appendClassWithSign(Array.from(h),s)}return!0}parseClass(e){const t=e.pos();e.skip(1);const n=this.newRegexp(y.Op.CHAR_CLASS);n.flags=this.flags;const s=new Cr;let i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),(this.flags&M.CLASS_NL)===0&&s.appendRange(x.CODES[`
`],x.CODES[`
`]));let o=!0;for(;!e.more()||e.peek()!==x.CODES["]"]||o;){if(e.more()&&e.lookingAt("-")&&(this.flags&M.PERL_X)===0&&!o){const h=e.rest();if(h==="-"||!h.startsWith("-]"))throw e.rewindTo(t),new Te(j.ERR_INVALID_CHAR_RANGE,e.rest())}o=!1;const B=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,s))continue;e.rewindTo(B)}if(this.parseUnicodeClass(e,s)||this.parsePerlClassEscape(e,s))continue;e.rewindTo(B);const u=j.parseClassChar(e,t);let c=u;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(c=j.parseClassChar(e,t),c<u)throw new Te(j.ERR_INVALID_CHAR_RANGE,e.from(B))}(this.flags&M.FOLD_CASE)===0?s.appendRange(u,c):s.appendFoldedRange(u,c)}e.skip(1),s.cleanClass(),i<0&&s.negateClass(),n.runes=s.toArray(),this.push(n)}},G(j,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),G(j,"ERR_INVALID_CHAR_RANGE","invalid character class range"),G(j,"ERR_INVALID_ESCAPE","invalid escape sequence"),G(j,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),G(j,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),G(j,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),G(j,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),G(j,"ERR_MISSING_BRACKET","missing closing ]"),G(j,"ERR_MISSING_PAREN","missing closing )"),G(j,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),G(j,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),G(j,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name"),G(j,"ERR_UNEXPECTED_PAREN","unexpected )"),G(j,"ERR_NESTING_DEPTH","expression nests too deeply"),G(j,"ERR_LARGE","expression too large"),G(j,"ERR_INVALID_CAPTURE_IN_LOOKBEHIND","invalid capture in lookbehind"),G(j,"MAX_HEIGHT",1e3),G(j,"MAX_SIZE",1398101),G(j,"MAX_RUNES",33554432),G(j,"ANY_TABLE",new g(new Uint32Array([0,W.MAX_RUNE,1]))),G(j,"ASCII_TABLE",new g(new Uint32Array([0,127,1]))),G(j,"ASCII_FOLD_TABLE",new g(new Uint32Array([0,127,1,383,383,1,8490,8490,1]))),j),$_=class pr{static initTest(e){const t=pr.compile(e),n=new pr(t.expr,t.prog,t.numSubexp,t.longest);return n.cond=t.cond,n.prefix=t.prefix,n.prefixUTF8=t.prefixUTF8,n.prefixComplete=t.prefixComplete,n.prefixRune=t.prefixRune,n.prefilter=t.prefilter,n.namedGroups=t.namedGroups,n}static compile(e){return pr.compileImpl(e,M.PERL,!1)}static compilePOSIX(e){return pr.compileImpl(e,M.POSIX,!0)}static compileImpl(e,t,n){let s=W_.parse(e,t);const i=s.maxCap(),o=s.namedGroups;s=K_.simplify(s);const B=H_.build(s),u=q_.compileRegexp(s),c=new pr(e,u,i,n);c.prefilter=B.type===Be.Type.NONE?null:B;const[h,C]=u.prefix();return c.prefixComplete=h,c.prefix=C,c.prefixUTF8=z.stringToUtf8ByteArray(c.prefix),c.prefix.length>0&&(c.prefixRune=c.prefix.codePointAt(0)),c.namedGroups=o,c}static match(e,t){return pr.compile(e).match(t)}constructor(e,t,n=0,s=0){this.expr=e,this.prog=t,this.numSubexp=n,this.longest=s,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.namedGroups=Object.create(null),this.machinePool=[],this.lazyDFA=null,this.onepass=fh.compile(this.prog),this.prefilter=null}get dfa(){return this.lazyDFA===null&&(this.lazyDFA=new qC(this.prog)),this.lazyDFA}matchPrefixComplete(e,t,n,s){if((n===M.ANCHOR_START||n===M.ANCHOR_BOTH)&&t!==0)return null;let i=-1,o=-1;const B=e.prefixLength(this);if(n===M.UNANCHORED){const u=e.index(this,t);if(u<0)return null;i=t+u,o=i+B}else if(n===M.ANCHOR_BOTH){if(e.endPos()!==B||e.index(this,0)!==0)return null;i=0,o=B}else if(n===M.ANCHOR_START){if(e.index(this,0)!==0)return null;i=0,o=B}if(i<0)return null;if(s>0){const u=new Int32Array(s).fill(-1);return u[0]=i,u[1]=o,Array.from(u)}return[]}createLookbehindState(){return this.prog.numLb>0?new P_(this.prog):null}executeEngine(e,t,n,s,i=null){if(this.prefixComplete&&(s===0||this.numSubexp===0))return this.matchPrefixComplete(e,t,n,s);if(this.prefilter!==null&&n===M.UNANCHORED&&!this.prefilter.eval(e,t))return null;if(this.onepass!==null)return fh.execute(this,e,t,n,s);if(s>0)return this.prog.numLb===0&&e.endPos()<=po.maxBitStateLen(this.prog)?po.execute(this,e,t,n,s):this.doExecuteNFA(e,t,n,s,i);if(this.prog.numLb===0){const o=this.dfa.match(e,t,n);if(o!==null)return o?[]:null;if(e.endPos()<=po.maxBitStateLen(this.prog))return po.execute(this,e,t,n,s)}return this.doExecuteNFA(e,t,n,s,i)}numberOfCapturingGroups(){return this.numSubexp}numberOfInstructions(){return this.prog.numInst()}get(){return this.machinePool.length>0?this.machinePool.pop():null}reset(){this.machinePool.length=0}put(e){this.machinePool.push(e)}toString(){return this.expr}doExecuteNFA(e,t,n,s,i=null){let o=this.get();o||(o=O_.fromRE2(this)),o.init(s);const B=o.match(e,t,n,i)?o.submatches():null;return this.put(o),B}match(e){return this.executeEngine(Re.fromUTF16(e),0,M.UNANCHORED,0)!==null}matchWithGroup(e,t,n,s,i,o=null){return e instanceof br||(z.isByteArray(e)?e=mr.utf8(e):e=mr.utf16(e)),this.matchMachineInput(e,t,n,s,i,o)}matchMachineInput(e,t,n,s,i,o=null){if(t>n)return[!1,null];const B=e.isUTF16Encoding()?Re.fromUTF16(e.asCharSequence(),0,n):Re.fromUTF8(e.asBytes(),0,n),u=this.executeEngine(B,t,s,2*i,o);return u===null?[!1,null]:[!0,u]}matchUTF8(e){return this.executeEngine(Re.fromUTF8(e),0,M.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,n){let s=0,i=0,o="";const B=Re.fromUTF16(e),u=this.createLookbehindState();let c=0;for(;i<=e.length;){const h=this.executeEngine(B,i,M.UNANCHORED,2,u);if(h===null||h.length===0)break;o+=e.substring(s,h[0]),(h[1]>s||h[0]===0)&&(o+=t(e.substring(h[0],h[1])),c++),s=h[1];const C=B.step(i)&7;if(i+C>h[1]?i+=C:i+1>h[1]?i++:i=h[1],c>=n)break}return o+=e.substring(s),o}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let n=new Array(t).fill(-1);for(let s=0;s<e.length;s++)n[s]=e[s];e=n}return e}allMatches(e,t,n=s=>s){let s=[];const i=e.endPos();t<0&&(t=i+1);let o=0,B=0,u=-1;const c=this.createLookbehindState();for(;B<t&&o<=i;){const h=this.executeEngine(e,o,M.UNANCHORED,this.prog.numCap,c);if(h===null||h.length===0)break;let C=!0;if(h[1]===o){h[0]===u&&(C=!1);const d=e.step(o);d<0?o=i+1:o+=d&7}else o=h[1];u=h[1],C&&(s.push(n(this.pad(h))),B++)}return s}findUTF8(e){const t=this.executeEngine(Re.fromUTF8(e),0,M.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){const t=this.executeEngine(Re.fromUTF8(e),0,M.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){const t=this.executeEngine(Re.fromUTF16(e),0,M.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.executeEngine(Re.fromUTF16(e),0,M.UNANCHORED,2)}findUTF8Submatch(e){const t=this.executeEngine(Re.fromUTF8(e),0,M.UNANCHORED,this.prog.numCap);if(t===null)return null;const n=new Array(1+this.numSubexp).fill(null);for(let s=0;s<n.length;s++)2*s<t.length&&t[2*s]>=0&&(n[s]=e.slice(t[2*s],t[2*s+1]));return n}findUTF8SubmatchIndex(e){return this.pad(this.executeEngine(Re.fromUTF8(e),0,M.UNANCHORED,this.prog.numCap))}findSubmatch(e){const t=this.executeEngine(Re.fromUTF16(e),0,M.UNANCHORED,this.prog.numCap);if(t===null)return null;const n=new Array(1+this.numSubexp).fill(null);for(let s=0;s<n.length;s++)2*s<t.length&&t[2*s]>=0&&(n[s]=e.substring(t[2*s],t[2*s+1]));return n}findSubmatchIndex(e){return this.pad(this.executeEngine(Re.fromUTF16(e),0,M.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){const n=this.allMatches(Re.fromUTF8(e),t,s=>e.slice(s[0],s[1]));return n.length===0?null:n}findAllUTF8Index(e,t){const n=this.allMatches(Re.fromUTF8(e),t,s=>s.slice(0,2));return n.length===0?null:n}findAll(e,t){const n=this.allMatches(Re.fromUTF16(e),t,s=>e.substring(s[0],s[1]));return n.length===0?null:n}findAllIndex(e,t){const n=this.allMatches(Re.fromUTF16(e),t,s=>s.slice(0,2));return n.length===0?null:n}findAllUTF8Submatch(e,t){const n=this.allMatches(Re.fromUTF8(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=e.slice(s[2*o],s[2*o+1]));return i});return n.length===0?null:n}findAllUTF8SubmatchIndex(e,t){const n=this.allMatches(Re.fromUTF8(e),t);return n.length===0?null:n}findAllSubmatch(e,t){const n=this.allMatches(Re.fromUTF16(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=e.substring(s[2*o],s[2*o+1]));return i});return n.length===0?null:n}findAllSubmatchIndex(e,t){const n=this.allMatches(Re.fromUTF16(e),t);return n.length===0?null:n}},Q_=class Xr{static isHexadecimal(e){return"0"<=e&&e<="9"||"A"<=e&&e<="F"||"a"<=e&&e<="f"}static translate(e){let t="";if(e instanceof RegExp&&(e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e=e.source),typeof e!="string")return e;let n="",s=!1,i=e.length;i===0&&(n="(?:)",s=!0);let o=!1,B=0;for(;B<i;){let c=e[B];if(c==="\\"){if(B+1<i)switch(c=e[B+1],c){case"\\":n+="\\\\",B+=2;continue;case"c":if(B+2<i){let d=e[B+2].charCodeAt(0);if(d>=65&&d<=90||d>=97&&d<=122){let E=d%32;n+="\\x",n+=(E>>4).toString(16).toUpperCase(),n+=(E&15).toString(16).toUpperCase(),B+=3,s=!0;continue}}n+="c",B+=2,s=!0;continue;case"u":if(B+2<i){if(e[B+2]==="{"){let d=B+3,E=!1,D=!1;for(;d<i;){const b=e[d];if(b==="}"){D=!0;break}if(!Xr.isHexadecimal(b))break;E=!0,d++}if(D&&E){n+="\\x",B+=2,s=!0;continue}}else if(B+5<i){let d=!0;for(let E=0;E<4;E++)if(!Xr.isHexadecimal(e[B+2+E])){d=!1;break}if(d){n+="\\x{"+e.substring(B+2,B+6)+"}",B+=6,s=!0;continue}}}n+="u",B+=2,s=!0;continue;case"x":{let d=!1;if(B+2<i&&e[B+2]==="{"){let E=B+3,D=!1,b=!1;for(;E<i;){const F=e[E];if(F==="}"){b=!0;break}if(!Xr.isHexadecimal(F))break;D=!0,E++}b&&D&&(d=!0)}else B+3<i&&Xr.isHexadecimal(e[B+2])&&Xr.isHexadecimal(e[B+3])&&(d=!0);d?(n+="\\x",B+=2):(n+="x",B+=2,s=!0);continue}case"n":case"r":case"t":case"a":case"f":case"v":case"d":case"D":case"s":case"S":case"w":case"W":case"b":case"B":case"p":case"P":case"A":case"z":case"Q":case"E":case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":n+="\\"+c,B+=2;continue;default:{let d=e.codePointAt(B+1);if(d>=48&&d<=57||d>=65&&d<=90||d>=97&&d<=122){let E=z.charCount(d);n+=e.substring(B+1,B+1+E),B+=E+1,s=!0}else{n+="\\";let E=z.charCount(d);n+=e.substring(B+1,B+1+E),B+=E+1}continue}}}else if(c==="/"){n+="\\/",B+=1,s=!0;continue}else if(c==="["){if(!o&&e[B+1]==="]"){n+="[^\\x00-\\x{10FFFF}]",B+=2,s=!0;continue}if(!o&&e[B+1]==="^"&&e[B+2]==="]"){n+="[\\x00-\\x{10FFFF}]",B+=3,s=!0;continue}o=!0}else if(c==="]")o=!1;else if(!o&&c==="("&&B+2<i&&e[B+1]==="?"&&e[B+2]==="<"&&B+3<i&&!"=!>)".includes(e[B+3])){n+="(?P<",B+=3,s=!0;continue}let h=e.codePointAt(B),C=z.charCount(h);n+=e.substring(B,B+C),B+=C}const u=s?n:e;return t.length>0?`(?${t})${u}`:u}};const Lh=(r,e)=>{const t=r.matchArray();return t.index=r.start(0),t.input=e,t.groups=r.namedGroupsObject(),t};var Ge,Tu=(Ge=class{static quote(e){return z.quoteMeta(e)}static quoteReplacement(e,t=!1){return Bh.quoteReplacement(e,t)}static translateRegExp(e){return Q_.translate(e)}static compile(e,t=0){let n=e;if((t&Ge.CASE_INSENSITIVE)!==0&&(n=`(?i)${n}`),(t&Ge.DOTALL)!==0&&(n=`(?s)${n}`),(t&Ge.MULTILINE)!==0&&(n=`(?m)${n}`),(t&-544)!==0)throw new b_("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS");let s=M.PERL;(t&Ge.DISABLE_UNICODE_GROUPS)!==0&&(s&=-129),(t&Ge.LOOKBEHINDS)!==0&&(s|=M.LOOKBEHIND);const i=new Ge(e,t);return i.re2Input=$_.compileImpl(n,s,(t&Ge.LONGEST_MATCH)!==0),i}static matches(e,t){return Ge.compile(e).testExact(t)}static initTest(e,t,n){if(e==null)throw new Error("pattern is null");if(n==null)throw new Error("re2 is null");const s=new Ge(e,t);return s.re2Input=n,s}constructor(e,t){this.patternInput=e,this.flagsInput=t,this.re2Input=null}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.testExact(e)}matcher(e){return z.isByteArray(e)&&(e=mr.utf8(e)),new Bh(this,e)}test(e){return z.isByteArray(e)?this.re2Input.matchUTF8(e):this.re2Input.match(e)}testExact(e){const t=z.isByteArray(e)?Re.fromUTF8(e):Re.fromUTF16(e);return this.re2Input.executeEngine(t,0,M.ANCHOR_BOTH,0)!==null}exec(e){const t=this.matcher(e);return t.find()?Lh(t,e):null}split(e,t=0){const n=this.matcher(e),s=[];let i=0,o=0;for(;n.find();){if(o===0&&n.end()===0){o=n.end();continue}if(t>0&&s.length===t-1)break;if(o===n.start()){if(t===0){i+=1,o=n.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(n.substring(o,n.start())),o=n.end()}if(t===0&&o!==n.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(n.substring(o,n.inputLength()))}return(t!==0||s.length===0&&!(o===n.inputLength()&&o>0))&&s.push(n.substring(o,n.inputLength())),s}*matchAll(e){const t=this.matcher(e);for(;t.find();)yield Lh(t,e)}toString(){return this.patternInput}programSize(){return this.re2Input.numberOfInstructions()}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}},G(Ge,"CASE_INSENSITIVE",Yr.CASE_INSENSITIVE),G(Ge,"DOTALL",Yr.DOTALL),G(Ge,"MULTILINE",Yr.MULTILINE),G(Ge,"DISABLE_UNICODE_GROUPS",Yr.DISABLE_UNICODE_GROUPS),G(Ge,"LONGEST_MATCH",Yr.LONGEST_MATCH),G(Ge,"LOOKBEHINDS",Yr.LOOKBEHINDS),Ge);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ms="13.2.0";function Y_(r){ms=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr=new pa("@firebase/firestore");function Zr(){return Pr.logLevel}function $(r,...e){if(Pr.logLevel<=he.DEBUG){const t=e.map(Au);Pr.debug(`Firestore (${ms}): ${r}`,...t)}}function En(r,...e){if(Pr.logLevel<=he.ERROR){const t=e.map(Au);Pr.error(`Firestore (${ms}): ${r}`,...t)}}function qt(r,...e){if(Pr.logLevel<=he.WARN){const t=e.map(Au);Pr.warn(`Firestore (${ms}): ${r}`,...t)}}function Au(r){if(typeof r=="string")return r;try{return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,WC(r,n,t)}function WC(r,e,t){let n=`FIRESTORE (${ms}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw En(n),new Error(n)}function Q(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||WC(e,s,n)}function oe(r,e){return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X_(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=X_(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function ue(r,e){return r<e?-1:r>e?1:0}function fi(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return RB(s)===RB(i)?ue(s,i):RB(s)?1:-1}return ue(r.length,e.length)}const Z_=55296,eD=57343;function RB(r){const e=r.charCodeAt(0);return e>=Z_&&e<=eD}function ls(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,t){this.comparator=e,this.root=t||Xe.EMPTY}insert(e,t){return new Pe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Xe.BLACK,null,null))}remove(e){return new Pe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Xe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new mo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new mo(this.root,e,this.comparator,!1)}getReverseIterator(){return new mo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new mo(this.root,e,this.comparator,!0)}}class mo{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Xe{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??Xe.RED,this.left=s??Xe.EMPTY,this.right=i??Xe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Xe(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Xe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Xe.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Xe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Xe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ee(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ee(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ee(27949);return e+(this.isRed()?0:1)}}Xe.EMPTY=null,Xe.RED=!0,Xe.BLACK=!1;Xe.EMPTY=new class{constructor(){this.size=0}get key(){throw ee(57766)}get value(){throw ee(16141)}get color(){throw ee(16727)}get left(){throw ee(29726)}get right(){throw ee(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new Xe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this.comparator=e,this.data=new Pe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new xh(this.data.getIterator())}getIteratorFrom(e){return new xh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof He)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new He(this.comparator);return t.data=e,t}}class xh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class J extends Gt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="__name__";class Qt{constructor(e,t,n){t===void 0?t=0:t>e.length&&ee(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&ee(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Qt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Qt?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=Qt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ue(e.length,t.length)}static compareSegments(e,t){const n=Qt.isNumericId(e),s=Qt.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?Qt.extractNumericId(e).compare(Qt.extractNumericId(t)):fi(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Un.fromString(e.substring(4,e.length-2))}}class ge extends Qt{construct(e,t,n){return new ge(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new J(k.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new ge(t)}static emptyPath(){return new ge([])}}const tD=/^[_a-zA-Z][_a-zA-Z0-9]*$/;let bt=class es extends Qt{construct(e,t,n){return new es(e,t,n)}static isValidIdentifier(e){return tD.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),es.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Yt}static keyField(){return new es([Yt])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new J(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const B=e[s];if(B==="\\"){if(s+1===e.length)throw new J(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new J(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,s+=2}else B==="`"?(o=!o,s++):B!=="."||o?(n+=B,s++):(i(),s++)}if(i(),o)throw new J(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new es(t)}static emptyPath(){return new es([])}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.fields=e,e.sort(bt.comparator)}static empty(){return new At([])}unionWith(e){let t=new He(bt.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new At(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ls(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function ir(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function nD(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function $C(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this.path=e}static fromPath(e){return new Y(ge.fromString(e))}static fromName(e){return new Y(ge.fromString(e).popFirst(5))}static empty(){return new Y(ge.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ge.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ge.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Y(new ge(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QC(r,e,t){if(!t)throw new J(k.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function rD(r,e,t,n){if(e===!0&&n===!0)throw new J(k.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function kh(r){if(!Y.isDocumentKey(r))throw new J(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Vh(r){if(Y.isDocumentKey(r))throw new J(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Li(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function ma(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":ee(12329,{type:typeof r})}function xt(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new J(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ma(r);throw new J(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(r,e){const t={typeString:r};return e&&(t.value=e),t}function xi(r,e){if(!Li(r))throw new J(k.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0,o=e[n].optional;if(!(n in r)){if(o)continue;t=`JSON missing required field: '${n}'`;break}const B=r[n];if(s&&typeof B!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&B!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new J(k.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh=-62135596800,Gh=1e6;class De{static now(){return De.fromMillis(Date.now())}static fromDate(e){return De.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Gh);return new De(t,n)}static fromInstant(e){if(!e||typeof e.t!="bigint")throw new J(k.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return De._fromEpochNanoseconds(e.t)}static _fromEpochNanoseconds(e){let t,n;if(e>=0n)t=Number(e/1000000000n),n=Number(e%1000000000n);else{const s=e%1000000000n;s===0n?(t=Number(e/1000000000n),n=0):(t=Number(e/1000000000n-1n),n=Number(s+1000000000n))}return new De(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new J(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new J(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Mh)throw new J(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new J(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Gh}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new J(k.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");const e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:De._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(xi(e,De._jsonSchema))return new De(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Mh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}De._jsonSchemaVersion="firestore/timestamp/1.0",De._jsonSchema={type:Ve("string",De._jsonSchemaVersion),seconds:Ve("number"),nanoseconds:Ve("number")};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YC extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new YC("Invalid base64 string: "+i):i}})(e);return new Oe(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Oe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Oe.EMPTY_BYTE_STRING=new Oe("");const sD=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function zn(r){if(Q(!!r,39018),typeof r=="string"){let e=0;const t=sD.exec(r);if(Q(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:Ne(r.seconds),nanos:Ne(r.nanos)}}function Ne(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Sr(r){return typeof r=="string"?Oe.fromBase64String(r):Oe.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XC="server_timestamp",ZC="__type__",ed="__previous_value__",td="__local_write_time__";function vu(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[ZC])==null?void 0:n.stringValue)===XC}function ki(r){const e=r.mapValue.fields[ed];return vu(e)?ki(e):e}function hs(r){const e=zn(r.mapValue.fields[td].timestampValue);return new De(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iD{constructor(e,t,n,s,i,o,B,u,c,h,C,d,E){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=B,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=h,this.apiKey=C,this._customHeaders=d,this.grpcFlowControlWindow=E}}const jo="(default)";class Ci{constructor(e,t){this.projectId=e,this.database=t||jo}static empty(){return new Ci("","")}get isDefaultDatabase(){return this.database===jo}isEqual(e){return e instanceof Ci&&e.projectId===this.projectId&&e.database===this.database}}function oD(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new J(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ci(r.options.projectId,e)}/**
 * Copyright 2021 M.Vokhmentsev
 *
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(){this.exponent=0,this.i=0n,this.o=0n,this.u=new Array(4).fill(0n),this.l=new Array(6).fill(0n),this.h=new Array(6).fill(0n),this.T=new Array(6).fill(0n),this.P=new Array(12).fill(0n)}static I(e,t){let n=new te;return n.parse(e,t),n}parse(e,t){t+=e.length-1,this.exponent=0,this.i=0n,this.o=0n;let n=this.T,s=this.R(e,n);if(s==0&&this.isEmpty(n)||(t+=s)<te.A)return;if(t>te.V)return void(this.exponent=Number(te.m));let i=this.p(t,n);this.S(t,i,n)}R(e,t){for(let i=0;i<6;i++)t[i]=0n;let n=0;for(;n<e.length&&e[n]==0;)n+=1;if(n==e.length)return 0;let s=-n;if(e.length-n>te.v){let i=e[te.v]>=5,o=new Array(te.v).fill(0);for(let B=0;B<te.v;B++)o[B]=e[B+n];i&&(s+=this.D(o)),e=o,n=0}for(let i=e.length-1;i>=n;i--)t[0]|=BigInt(e[i])<<32n,this.C(t);return s}C(e){let t=e.length;for(let n=0;n<t;n++){let s=e[n]%10n;e[n]=e[n]/10n,n+1<t&&(e[n+1]+=s<<32n)}}isEmpty(e){for(let t=0;t<e.length;t++)if(e[t]!=0n)return!1;return!0}D(e){for(let t=e.length-1;t>=0;t--){if(e[t]!=9)return e[t]=e[t]+1,0;e[t]=0}return e[0]=1,1}p(e,t){let n=t[0]<<31n|t[1]>>1n,s=Number(n)/te.F;return Math.floor(Number(e)*te.O+this.log2(s))}log2(e){return te.M*Math.log(e)}S(e,t,n){let s=this.u;this.N(-t,s);let i=this.P;this.B(n,s,i),this.L(i),BigInt(s[0])!=BigInt(-e)&&this.L(i),t+=this.$(i),(t+=te.U)<=0||(t+=this.k(i),BigInt(t)>=te.m?this.exponent=Number(te.m):(this.exponent=Number(t),this.i=(i[0]<<32n)+i[1]&0xffffffffffffffffn,this.o=(i[2]<<32n)+i[3]&0xffffffffffffffffn))}N(e,t){if(e==0)return void this.q(te.K[0],t);let n=te.K;e<0&&(e=-e,n=te.W);let s=te.G,i=32,o=!0;for(;e>0;)e>=s&&(o?(this.q(n[i],t),o=!1):this.j(t,n[i],t),e-=s),i-=1,s*=.5}q(e,t){for(let n=0;n<t.length;n++)t[n]=e[n]}j(e,t,n){this.H(e,t,this.P);let s=this.J(this.P);this.Y(this.P,n),n[0]=e[0]+t[0]+BigInt(s)}H(e,t,n){for(let s=0;s<n.length;s++)n[s]=0n;this.Z(e,this.l),this.Z(t,this.h);for(let s=5;s>=0;s--)for(let i=5;i>=0;i--){let o=this.l[s]*this.h[i];n[i+s+1]=n[i+s+1]+(o&te.X)&0xffffffffffffffffn,n[i+s]=n[i+s]+(o>>32n)&0xffffffffffffffffn}for(let s=11;s>=1;s--)n[s-1]=n[s-1]+(n[s]>>32n)&0xffffffffffffffffn,n[s]&=te.X}J(e){let t=0;for(;this.ee(e);)this.L(e),t-=1;return t}ee(e){if(e[0]<0x19999999n)return!0;if(e[0]>0x19999999n)return!1;for(let t=1;t<e.length;t++){if(e[t]<0x99999999n)return!0;if(e[t]>0x99999999n)return!1}return!1}B(e,t,n){for(let o=0;o<n.length;o++)n[o]=0n;let s=this.h;this.Z(t,s);let i=e.length;for(let o=i-1;o>=0;o--)for(let B=i-1;B>=0;B--){let u=e[o]*s[B];n[B+o+1]=n[B+o+1]+(u&te.X)&0xffffffffffffffffn,n[B+o]=n[B+o]+(u>>32n)&0xffffffffffffffffn}for(let o=11;o>=1;o--)n[o-1]=n[o-1]+(n[o]>>32n)&0xffffffffffffffffn,n[o]&=te.X}L(e){let t=e.length-1;e[0]&=te.X,e[t]*=10n;for(let n=t-1;n>=0;n--)e[n]=10n*e[n]+(e[n+1]>>32n)&0xffffffffffffffffn,e[n+1]&=te.X}$(e){let t=31-te.te(e[0]);return t!=0&&this.ne(e,t),t}k(e){return this.re(e,5,100n),this.re(e,4,0x80000000n),(e[0]&te.ie<<1n)!=0n?(this.ne(e,1),1):0}Y(e,t){t[1]=(e[0]<<32n)+e[1],t[2]=(e[2]<<32n)+e[3],t[3]=(e[4]<<32n)+e[5]}Z(e,t){t[0]=e[1]>>32n,t[1]=e[1]&te.X,t[2]=e[2]>>32n,t[3]=e[2]&te.X,t[4]=e[3]>>32n,t[5]=e[3]&te.X}ne(e,t){let n=e.length-1,s=BigInt(32-Math.abs(t));if(t>0){let i=BigInt(t);for(let o=n+1-1;o>=1;o--)e[o]=e[o]>>i|e[o-1]<<s&te.X;e[0]=e[0]>>i}else if(t<0){let i=BigInt(-t);e[0]=0xffffffffffffffffn&(e[0]<<i|e[1]>>s);for(let o=1;o<n;o++)e[o]=0xffffffffffffffffn&(e[o]<<i&te.X|e[o+1]>>s);e[n]=e[n]<<i&te.X}}re(e,t,n){let s=t;e[s]=e[s]+n&0xffffffffffffffffn;for(let i=s+1-1;i>=1&&(e[i]&te.ie)!=0n;i--)e[i]&=te.X,e[i-1]+=1n}static te(e){let t=Number(e>>32n);return t==0?32+Math.clz32(Number(BigInt.asUintN(32,e))):Math.clz32(t)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ze,ss,XB,vo,bo,Ys;te.v=59,te.V=646456993,te.A=-646457032,te.F=0xccccccccccccd00,te.se=0x8000000000000000n,te.G=2147483648,te.X=0x00000000ffffffffn,te.ie=0xffffffff00000000n,te.O=Math.log(10)/Math.log(2),te.M=1/Math.log(2),te.U=2147483647,te.m=0xffffffffn,te.K=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[1n,0x3333333333333333n,0x3333333333333333n,0x3333333333333334n],[1n,0x6666666666666666n,0x6666666666666666n,0x6666666666666667n],[2n,0x28f5c28f5c28f5c2n,0x8f5c28f5c28f5c28n,0xf5c28f5c28f5c290n],[3n,0x4189374bc6a7ef9dn,0xb22d0e5604189374n,0xbc6a7ef9db22d0e6n],[5n,0xa7c5ac471b478423n,0x0fcf80dc33721d53n,0xcddd6e04c0592104n],[10n,0x6df37f675ef6eadfn,0x5ab9a2072d44268dn,0x97df837e6748956en],[20n,0x2f394219248446ban,0xa23d2ec729af3d61n,0x0607aa0167dd94cbn],[39n,0x571cbec554b60dbbn,0xd5f64baf0506840dn,0x451db70d5904029bn],[78n,0x1da48ce468e7c702n,0x6520247d3556476dn,0x1469caf6db224cfan],[155n,0x2252f0e5b39769dcn,0x9ae2eea30ca3ade0n,0xeeaa3c08dfe84e30n],[309n,0x2e055c9a3f6ba793n,0x16583a816eb60a59n,0x22c4b0826cf1ebf7n],[617n,0x52bb45e9cf23f17fn,0x7688c07606e50364n,0xb34479aa9d449a57n],[1234n,0x1abc81c8ff5f846cn,0x8f5e3c9853e38c97n,0x45060097f3bf9296n],[2467n,0x1bec53b510daa7b4n,0x48369ed77dbb0eb1n,0x3b05587b2187b41en],[4933n,0x1e75063a5ba91326n,0x8abfb8e460016ae3n,0x28008702d29e8a3cn],[9865n,0x243c5d8bb5c5fa55n,0x40c6d248c5881915n,0x4c0fd99fd5befc22n],[19729n,0x334a5570c3f4ef3cn,0xa13c36c43f979c90n,0xda7ac473555fb7a8n],[39457n,0x66c304445dd98f3bn,0xa8c293a20e47a41bn,0x4c5b03dc12604964n],[78914n,0x293ffbf5fb028cc4n,0x89d3e5ff44238406n,0x369a339e1bfe8c9bn],[157827n,0x427792fbb68e5d20n,0x7b297cd9fc154b62n,0xf09142114aa9a20cn],[315653n,0xac92bc65ad5c08fcn,0x00beeb115a566c19n,0x4ba882d8a4622437n],[631306n,0x745581440f92e80en,0x4da822cf7f896f41n,0x509d598678164ecdn],[1262612n,0x34dd99b4c69523a5n,0x64bc2e8f0d8b1044n,0xb03b1c96da5dd349n],[2525223n,0x6d2bbea9d6d25a08n,0xa0a4606a88e96b70n,0x182063bbc2fe8520n],[5050446n,0x2e8e47d63bfdd6e3n,0x2b55fa8976eaa3e9n,0x1a6b9d3086412a73n],[10100891n,0x54aa68efa1d719dfn,0xd8505806612c5c8fn,0xad068837fee8b43an],[20201782n,0x1c00464ccb7bae77n,0x9e3877784c77982cn,0xd94af3b61717404fn],[40403563n,0x1ea099c8be2b6cd0n,0x8bfb6d539fa50466n,0x6d3bc37e69a84218n],[80807125n,0x24a457f466ce8d18n,0xf2c8f3b81bc6bb59n,0xa78c757692e02d49n],[161614249n,0x347256677aba6b53n,0x3fbf90d30611a67cn,0x1e039d87e0bdb32bn],[323228497n,0x6b727daf0fd3432an,0x71f71121f9e4200fn,0x8fcd9942d486c10cn],[646456994n,0x2d18e84484d91f78n,0x4079bfe7829dec6fn,0x21551643e365abc6n]],te.W=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[0n,0x8000000000000000n,0x0000000000000000n,0x0000000000000000n],[0n,0x4000000000000000n,0x0000000000000000n,0x0000000000000001n],[-1n,0xa000000000000000n,0x0000000000000000n,0x0000000000000000n],[-2n,0x6400000000000000n,0x0000000000000000n,0x0000000000000000n],[-4n,0x2710000000000000n,0x0000000000000000n,0x0000000000000001n],[-9n,0x3b9aca0000000000n,0x0000000000000000n,0x0000000000000001n],[-19n,0x8ac7230489e80000n,0x0000000000000000n,0x0000000000000000n],[-38n,0x4b3b4ca85a86c47an,0x098a224000000000n,0x0000000000000001n],[-77n,0xdd15fe86affad912n,0x49ef0eb713f39eben,0xaa987b6e6fd2a002n],[-154n,0xbeeefb584aff8603n,0xaafb550ffacfd8fan,0x5ca47e4f88d45371n],[-308n,0x8e679c2f5e44ff8fn,0x570f09eaa7ea7648n,0x5961db50c6d2b888n],[-616n,0x4f371b3399fc2ab0n,0x8170041c9feb05aan,0xc7c343447c75bcf6n],[-1233n,0xf51e928179013fd3n,0xde4bd12cde4d985cn,0x4a573ca6f94bff14n],[-2466n,0xeab388127bccaff7n,0x1667639142b9fbaen,0x775ec9995e1039fbn],[-4932n,0xd72cb2a95c7ef6ccn,0xe81bf1e825ba7515n,0xc2feb521d6cb5dcdn],[-9864n,0xb4dc1be6604502dcn,0xd491079b8eef6535n,0x578d3965d24de84dn],[-19728n,0x7fc6447bee60ea43n,0x2548da5c8b125b27n,0x5f42d1142f41d349n],[-39456n,0x3fc65180f88af8fbn,0x6a6915f383349413n,0x063c3708b6ceb291n],[-78913n,0x9ee0197c8dcd55bfn,0x2b2b9b942c38f4a2n,0x0f8ba634e9c706aen],[-157826n,0x629963a25b8b2d79n,0xd00b9d2286f70876n,0xe97004700c3644fcn],[-315652n,0x25f9cc308ceef4f3n,0x40f19543911a4546n,0xa2cd389452cfc366n],[-631305n,0x385597b0d47e76b8n,0x1b9f67e103bf2329n,0xc3119848595985f7n],[-1262611n,0x7bf795d276c12f66n,0x66a61d62a446659an,0xa1a4d73bebf093d5n],[-2525222n,0x3c07d96ab1ed7799n,0xcb7355c22cc05ac0n,0x4ffc0ab73b1f6a49n],[-5050445n,0x8cc4cd8c3edefb9an,0x6c8ff86a90a97e0cn,0x166cfddbf98b71bfn],[-10100890n,0x4d67d81cc88e1228n,0x1d7cfb06666b79b3n,0x7b916728aaa4e70dn],[-20201781n,0xea0c55494e7a552dn,0xb88cb9484bb86c61n,0x8d44893c610bb7dfn],[-40403562n,0xd5fa8c821ec0c24an,0xa80e46e764e0f8b0n,0xa7276bfa432fac7en],[-80807124n,0xb2dae307426f6791n,0xc970b82f58b12918n,0x0472592f7f39190en],[-161614248n,0x7cf51edd8a15f1c9n,0x656dab3498f8e697n,0x12daa2a80e53c807n],[-323228496n,0x3cfe609ab5883c50n,0xbec8b5d22b198871n,0xe18477703b4622b4n],[-646456993n,0x9152447b9d7cda9an,0x3b4d3f6110d77aadn,0xfa81bad1c394adb4n]];class Z{constructor(e,t,n,s){this.negative=e,this._e=t,this.i=n,this.o=s}exponent(){return this._e-te.U}oe(){return this._e===0&&this.i===0n&&this.o===0n}ae(){return this._e===Ye(Z,ze,"f",ss)&&this.i===0n&&this.o===0n}isNaN(){return this._e===Ye(Z,ze,"f",ss)&&!(this.i===0n&&this.o===0n)}compareTo(e){if(this.isNaN())return e.isNaN()?0:1;if(e.isNaN())return-1;let t,n;if(this.negative){if(!e.negative)return-1;t=1,n=-1}else{if(e.negative)return 1;t=-1,n=1}return this._e<e._e?t:this._e>e._e?n:this.i<e.i?t:this.i>e.i?n:this.o<e.o?t:this.o>e.o?n:0}debug(){return(this.negative?"+":"-")+Ye(Z,ze,"m",XB).call(Z,this.i)+Ye(Z,ze,"m",XB).call(Z,this.o)+"*2^"+this.exponent()}static fromNumber(e){if(isNaN(e))return Z.NaN;if(!isFinite(e))return e<0?Z.ue:Z.ce;if(e===0)return Math.sign(1/e)>0?Z.le:Z.Ee;const t=new DataView(new ArrayBuffer(8));t.setFloat64(0,e);const n=t.getBigUint64(0);let s=BigInt.asUintN(64,n<<12n),i=2047&Number(n>>52n);if(i===0){const o=te.te(s);s=o<63?s<<BigInt(o+1):0n,i=-o}return new Z(e<0,Ye(Z,ze,"m",Ys).call(Z,i-1023),s,0n)}static fromString(e){if(e==="NaN")return Z.NaN;if(e==="-Infinity")return Z.ue;if(e==="Infinity"||e==="+Infinity")return Z.ce;const t=new Array(e.length).fill(0);let n=0,s=0,i=0,o=!1;for(e[n]==="-"?(o=!0,n++):e[n]==="+"&&n++;Ye(Z,ze,"m",vo).call(Z,e,n);)t[s++]=Ye(Z,ze,"m",bo).call(Z,e,n++);if(e[n]==="."){const u=++n;for(;Ye(Z,ze,"m",vo).call(Z,e,n);)t[s++]=Ye(Z,ze,"m",bo).call(Z,e,n++);i=u-n}if(e[n]==="e"||e[n]==="E"){let u=0;n++;let c=1;e[n]==="-"?(c=-1,n++):e[n]==="+"&&n++;const h=n;for(;Ye(Z,ze,"m",vo).call(Z,e,n);)if(u=10*u+Ye(Z,ze,"m",bo).call(Z,e,n++),n-h>9)throw new Error("Exponent too large "+e);if(n===h)throw new Error("Invalid number "+e);i+=u*c}if(s===0||n!==e.length)throw new Error("Invalid number "+e);const B=te.I(t.slice(0,s),i);return new Z(o,B.exponent,B.i,B.o)}}ze=Z,XB=function(e){return e.toString(16).padStart(16,"0")},vo=function(e,t){const n=e.codePointAt(t);return n!==void 0&&n>=48&&n<=57},bo=function(e,t){return e.codePointAt(t)-48},Ys=function(e){return e+te.U},ss={value:Number(te.m)},Z.le=new Z(!1,0,0n,0n),Z.Ee=new Z(!0,0,0n,0n),Z.NaN=new Z(!1,Ye(Z,ze,"f",ss),1n<<63n,0n),Z.ue=new Z(!0,Ye(Z,ze,"f",ss),0n,0n),Z.ce=new Z(!1,Ye(Z,ze,"f",ss),0n,0n),new Z(!0,Ye(Z,ze,"m",Ys).call(Z,63),0n,0n),new Z(!1,Ye(Z,ze,"m",Ys).call(Z,0),0n,0n),new Z(!0,Ye(Z,ze,"m",Ys).call(Z,0),0n,0n);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bu=-1;function Ea(r){return r==null}function di(r){return r===0&&1/r==-1/0}function aD(r){return typeof r=="number"&&Number.isInteger(r)&&!di(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}function BD(r){return typeof r=="string"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pu="__type__",Ou="__vector__",pi="value",uD="server_timestamp",nd="__min__",Su="__max__",Vn="__regex__",Jo="pattern",qo="options",gi="__oid__",Hr="__int__",Wn="__decimal128__",Er="__request_timestamp__",Ko="seconds",zo="increment",_a="__binary__",fs={nullValue:"NULL_VALUE"},Eo={mapValue:{}};var ye,Nt;(Nt=ye||(ye={})).he="regexValue",Nt.Te="bsonObjectIdValue",Nt.Pe="int32Value",Nt.Ie="decimal128Value",Nt.Re="bsonTimestampValue",Nt.Ae="bsonBinaryValue",Nt.Ve="minKeyValue",Nt.de="maxKeyValue",Nt.fe="maxValue",Nt.me="vectorValue",Nt.pe="serverTimestampValue",Nt.ge="regularMapValue";const Uh={[Ou]:ye.me,[Su]:ye.fe,[uD]:ye.pe},rd={[Vn]:ye.he,[gi]:ye.Te,[Hr]:ye.Pe,[Wn]:ye.Ie,[Er]:ye.Re,[_a]:ye.Ae,[nd]:ye.Ve,[Su]:ye.de},cD=new Set(Object.values(rd)),Et={booleanValue:!0},$e={booleanValue:!1};function je(r){if("nullValue"in r)return 0;if("booleanValue"in r)return 2;if("integerValue"in r||"doubleValue"in r)return 3;if("timestampValue"in r)return 4;if("stringValue"in r)return 7;if("bytesValue"in r)return 8;if("referenceValue"in r)return 9;if("geoPointValue"in r)return 11;if("arrayValue"in r)return 13;if(!("mapValue"in r))return ee(28295,{value:r});switch(cd(r)){case ye.pe:return 6;case ye.fe:return 9007199254740991;case ye.me:return 14;case ye.he:return 12;case ye.Te:return 10;case ye.Pe:case ye.Ie:return 3;case ye.Re:return 5;case ye.Ae:return 8;case ye.Ve:return 1;case ye.de:return 16;default:return 15}}function Vt(r,e,t){if(r===e)return!0;const n=je(r);if(n!==je(e))return!1;switch(n){case 0:case 9007199254740991:case 16:case 1:return!0;case 2:return r.booleanValue===e.booleanValue;case 6:return hs(r).isEqual(hs(e));case 4:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const B=zn(i.timestampValue),u=zn(o.timestampValue);return B.seconds===u.seconds&&B.nanos===u.nanos})(r,e);case 7:return r.stringValue===e.stringValue;case 8:return(function(i,o){return ad(i,o)===0})(r,e);case 9:return r.referenceValue===e.referenceValue;case 11:return(function(i,o){return Ne(i.geoPointValue.latitude)===Ne(o.geoPointValue.latitude)&&Ne(i.geoPointValue.longitude)===Ne(o.geoPointValue.longitude)})(r,e);case 3:return(function(i,o,B){if(Mt(i)&&Mt(o))return id(i,o)===0;if("integerValue"in i&&"integerValue"in o||$n(i)&&$n(o))return Ei(i)===Ei(o);let u,c;if("doubleValue"in i&&"doubleValue"in o)u=Ne(i.doubleValue),c=Ne(o.doubleValue);else{if(!(B!=null&&B.ye))return!1;u=Ne(i.integerValue??i.doubleValue),c=Ne(o.integerValue??o.doubleValue)}return u===c?!!(B!=null&&B.we)||di(u)===di(c):!!(B===void 0||B.be)&&isNaN(u)&&isNaN(c)})(r,e,t);case 13:return ls(r.arrayValue.values||[],e.arrayValue.values||[],((s,i)=>Vt(s,i,t)));case 14:case 15:return(function(i,o,B){const u=i.mapValue.fields||{},c=o.mapValue.fields||{};if(Or(u)!==Or(c))return!1;for(const h in u)if(u.hasOwnProperty(h)&&(c[h]===void 0||!Vt(u[h],c[h],B)))return!1;return!0})(r,e,t);case 5:return od(r,e)===0;case 12:return Bd(r,e)===0;case 10:return ud(r,e)===0;default:return ee(52216,{left:r})}}function mi(r,e){return(r.values||[]).find((t=>Vt(t,e)))!==void 0}function _t(r,e){if(r===e)return 0;const t=je(r),n=je(e);if(t!==n)return ue(t,n);switch(t){case 0:case 1:case 16:case 9007199254740991:return 0;case 2:return ue(r.booleanValue,e.booleanValue);case 3:return _i(r,e);case 4:return jh(r.timestampValue,e.timestampValue);case 6:return jh(hs(r),hs(e));case 7:return fi(r.stringValue,e.stringValue);case 8:return ad(r,e);case 9:return(function(i,o){const B=i.split("/"),u=o.split("/");for(let c=0;c<B.length&&c<u.length;c++){const h=ue(B[c],u[c]);if(h!==0)return h}return ue(B.length,u.length)})(r.referenceValue,e.referenceValue);case 11:return(function(i,o){const B=ue(Ne(i.latitude),Ne(o.latitude));return B!==0?B:ue(Ne(i.longitude),Ne(o.longitude))})(r.geoPointValue,e.geoPointValue);case 13:return Jh(r.arrayValue,e.arrayValue);case 14:return(function(i,o){var d,E,D,b;const B=i.fields||{},u=o.fields||{},c=(d=B[pi])==null?void 0:d.arrayValue,h=(E=u[pi])==null?void 0:E.arrayValue,C=ue(((D=c==null?void 0:c.values)==null?void 0:D.length)||0,((b=h==null?void 0:h.values)==null?void 0:b.length)||0);return C!==0?C:Jh(c,h)})(r.mapValue,e.mapValue);case 15:return(function(i,o){if(i===Eo.mapValue&&o===Eo.mapValue)return 0;if(i===Eo.mapValue)return 1;if(o===Eo.mapValue)return-1;const B=i.fields||{},u=Object.keys(B),c=o.fields||{},h=Object.keys(c);u.sort(),h.sort();for(let C=0;C<u.length&&C<h.length;++C){const d=fi(u[C],h[C]);if(d!==0)return d;const E=_t(B[u[C]],c[h[C]]);if(E!==0)return E}return ue(u.length,h.length)})(r.mapValue,e.mapValue);case 5:return od(r,e);case 12:return Bd(r,e);case 10:return ud(r,e);default:throw ee(23264,{Se:t})}}function Ei(r){let e;return e=$n(r)?r.mapValue.fields[Hr].integerValue:r.integerValue||r.doubleValue,Ne(e)}function sd(r){return r.mapValue.fields[Wn].stringValue}function _i(r,e){if(Mt(r)||Mt(e))return id(r,e);const t=Ei(r),n=Ei(e);return isNaN(t)?isNaN(n)?0:-1:isNaN(n)?1:ue(t,n)}function id(r,e){const t=Hh(r),n=Hh(e);return t.oe()&&n.oe()?0:t.isNaN()?n.isNaN()?0:-1:n.isNaN()?1:t.compareTo(n)}function Hh(r){return Mt(r)?Z.fromString(sd(r)):Z.fromNumber(Ei(r))}function jh(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return ue(r,e);const t=zn(r),n=zn(e),s=ue(t.seconds,n.seconds);return s!==0?s:ue(t.nanos,n.nanos)}function Jh(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=_t(t[s],n[s]);if(i!==void 0&&i!==0)return i}return ue(t.length,n.length)}function od(r,e){var B,u,c,h,C,d,E,D,b,F,U,K;const t=(c=(u=(B=r.mapValue.fields)==null?void 0:B[Er].mapValue)==null?void 0:u.fields)==null?void 0:c[Ko],n=(d=(C=(h=e.mapValue.fields)==null?void 0:h[Er].mapValue)==null?void 0:C.fields)==null?void 0:d[Ko],s=(b=(D=(E=r.mapValue.fields)==null?void 0:E[Er].mapValue)==null?void 0:D.fields)==null?void 0:b[zo],i=(K=(U=(F=e.mapValue.fields)==null?void 0:F[Er].mapValue)==null?void 0:U.fields)==null?void 0:K[zo],o=_i(t,n);return o!==0?o:_i(s,i)}function qh(r){var B;if("bytesValue"in r)return{subtype:0,bytes:Sr(r.bytesValue)};const e=(B=r.mapValue)==null?void 0:B.fields,t=e==null?void 0:e[_a],n=t==null?void 0:t.bytesValue;if(!n)throw new Error("Received incorrect value for BsonBinaryData");const s=Sr(n).toUint8Array();if(s.length===0)throw new Error("Received empty bytesValue for BsonBinaryData");const i=s[0],o=s.slice(1);return{subtype:i,bytes:Oe.fromUint8Array(o)}}function ad(r,e){const t=qh(r),n=qh(e);return t.subtype!==n.subtype?t.subtype<n.subtype?-1:1:t.bytes.compareTo(n.bytes)}function Bd(r,e){var c,h,C,d,E,D,b,F,U,K,re,ce,Ee,_e,R,_;const t=r.mapValue.fields,n=((d=(C=(h=(c=t==null?void 0:t[Vn])==null?void 0:c.mapValue)==null?void 0:h.fields)==null?void 0:C[Jo])==null?void 0:d.stringValue)??"",s=((F=(b=(D=(E=t==null?void 0:t[Vn])==null?void 0:E.mapValue)==null?void 0:D.fields)==null?void 0:b[qo])==null?void 0:F.stringValue)??"",i=e.mapValue.fields,o=((ce=(re=(K=(U=i==null?void 0:i[Vn])==null?void 0:U.mapValue)==null?void 0:K.fields)==null?void 0:re[Jo])==null?void 0:ce.stringValue)??"",B=((_=(R=(_e=(Ee=i==null?void 0:i[Vn])==null?void 0:Ee.mapValue)==null?void 0:_e.fields)==null?void 0:R[qo])==null?void 0:_.stringValue)??"",u=fi(n,o);return u!==0?u:ue(s,B)}function ud(r,e){var t,n,s,i;return fi(((n=(t=r.mapValue.fields)==null?void 0:t[gi])==null?void 0:n.stringValue)??"",((i=(s=e.mapValue.fields)==null?void 0:s[gi])==null?void 0:i.stringValue)??"")}function Cs(r){return ZB(r)}function ZB(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=zn(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return Sr(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return Y.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=ZB(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${ZB(t.fields[o])}`;return s+"}"})(r.mapValue):ee(61005,{value:r})}function Wo(r){switch(je(r)){case 0:case 2:return 4;case 3:return Mt(r)?16:8;case 4:case 11:return 16;case 6:const e=ki(r);return e?16+Wo(e):16;case 7:return 2*r.stringValue.length;case 8:return"bytesValue"in r?Sr(r.bytesValue).approximateByteSize():Kh(r.mapValue);case 9:return r.referenceValue.length;case 13:return(function(n){return(n.values||[]).reduce(((s,i)=>s+Wo(i)),0)})(r.arrayValue);case 14:case 15:case 12:case 10:case 5:case 1:case 16:return Kh(r.mapValue);default:throw ee(13486,{value:r})}}function Kh(r){let e=0;return ir(r.fields,((t,n)=>{e+=t.length+Wo(n)})),e}function zh(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Xt(r){return!!r&&"integerValue"in r}function Zt(r){return!!r&&"doubleValue"in r}function Mt(r){var t;if(!((t=r.mapValue)!=null&&t.fields))return!1;const e=r.mapValue.fields;return Or(e)===1&&e[Wn]&&!!e[Wn].stringValue}function $n(r){var t,n;if(!((t=r.mapValue)!=null&&t.fields))return!1;const e=r.mapValue.fields;return Or(e)===1&&((n=e[Hr])==null?void 0:n.integerValue)!==void 0}function _n(r){return Xt(r)||Zt(r)||!!r&&$n(r)||!!r&&Mt(r)}function ds(r){return!!r&&"arrayValue"in r}function Rt(r){return!!r&&"nullValue"in r}function Qe(r){return!(!Zt(r)||!isNaN(Number(r.doubleValue)))||!(!Mt(r)||sd(r)!=="NaN")}function Ir(r){return!!r&&"mapValue"in r}function cd(r){var n,s;if(!((n=r.mapValue)!=null&&n.fields))return ye.ge;const e=r.mapValue.fields,t=(s=e[Pu])==null?void 0:s.stringValue;if(t&&Uh[t])return Uh[t];if(Or(e)===1){const i=Object.keys(e);return rd[i[0]]??ye.ge}return ye.ge}function eu(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[Pu])==null?void 0:n.stringValue)===Ou}function tu(r){var e,t;return(t=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[pi])==null?void 0:t.arrayValue}function ti(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return ir(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=ti(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ti(r.arrayValue.values[t]);return e}return{...r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this.value=e}static empty(){return new ct({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Ir(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ti(t)}setAll(e){let t=bt.emptyPath(),n={},s=[];e.forEach(((o,B)=>{if(!t.isImmediateParentOf(B)){const u=this.getFieldsMap(t);this.applyChanges(u,n,s),n={},s=[],t=B.popLast()}o?n[B.lastSegment()]=ti(o):s.push(B.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Ir(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Vt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Ir(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){ir(t,((s,i)=>e[s]=i));for(const s of n)delete e[s]}clone(){return new ct(ti(this.value))}}function ld(r){const e=[];return ir(r.fields,((t,n)=>{const s=new bt([t]);if(Ir(n)&&!(function(o){return cD.has(cd(o))})(n)){const i=ld(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new At(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:di(e)?"-0":e}}function os(r){return{integerValue:""+r}}function Fu(r,e,t){return aD(e)?os(e):Nu(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(){this._=void 0}}function lD(r,e,t){return r instanceof $o?(function(s,i){const o={fields:{[ZC]:{stringValue:XC},[td]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&vu(i)&&(i=ki(i)),i&&(o.fields[ed]=i),{mapValue:o}})(t,e):r instanceof Di?fd(r,e):r instanceof wi?Cd(r,e):r instanceof Ii?(function(s,i){const o=hd(s,i),B=Wh(o)+Wh(s.xe);return Mt(o)||Mt(s.xe)?{mapValue:{fields:{[Wn]:{stringValue:B.toString()}}}}:$n(o)?Zt(s.xe)?{doubleValue:B}:Xt(s.xe)?{integerValue:B.toString()}:{mapValue:{fields:{[Hr]:os(B)}}}:Xt(o)&&(Xt(s.xe)||$n(s.xe))?os(B):Nu(s.serializer,B)})(r,e):r instanceof Qo?(function(s,i){return!_n(i)||Qe(s.xe)?s.xe:Qe(i)?i:_i(s.xe,i)<0?s.xe:i})(r,e):r instanceof Yo?(function(s,i){return!_n(i)||Qe(s.xe)?s.xe:Qe(i)?i:_i(s.xe,i)>0?s.xe:i})(r,e):void 0}function hD(r,e,t){return r instanceof Di?fd(r,e):r instanceof wi?Cd(r,e):t}function hd(r,e){return r instanceof Ii?_n(e)?e:{integerValue:0}:null}class $o extends Da{}class Di extends Da{constructor(e){super(),this.elements=e}}function fd(r,e){const t=dd(e);for(const n of r.elements)t.some((s=>Vt(s,n)))||t.push(n);return{arrayValue:{values:t}}}class wi extends Da{constructor(e){super(),this.elements=e}}function Cd(r,e){let t=dd(e);for(const n of r.elements)t=t.filter((s=>!Vt(s,n)));return{arrayValue:{values:t}}}class Lu extends Da{constructor(e,t){super(),this.serializer=e,this.xe=t}}class Ii extends Lu{}class Qo extends Lu{}class Yo extends Lu{}function Wh(r){return Xt(r)?Ne(r.integerValue):Zt(r)?Ne(r.doubleValue):$n(r)?Ne(r.mapValue.fields[Hr].integerValue):Mt(r)?parseFloat(r.mapValue.fields[Wn].stringValue):0}function dd(r){return ds(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function fD(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof Di&&s instanceof Di||n instanceof wi&&s instanceof wi?ls(n.elements,s.elements,Vt):n instanceof Ii&&s instanceof Ii||n instanceof Qo&&s instanceof Qo||n instanceof Yo&&s instanceof Yo?Vt(n.xe,s.xe):n instanceof $o&&s instanceof $o})(r.transform,e.transform)}class CD{constructor(e,t){this.version=e,this.transformResults=t}}class Pt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Pt}static exists(e){return new Pt(void 0,e)}static updateTime(e){return new Pt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Po(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class wa{}function pd(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new Ia(r.key,Pt.none()):new Vi(r.key,r.data,Pt.none());{const t=r.data,n=ct.empty();let s=new He(bt.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new or(r.key,n,new At(s.toArray()),Pt.none())}}function dD(r,e,t){r instanceof Vi?(function(s,i,o){const B=s.value.clone(),u=Qh(s.fieldTransforms,i,o.transformResults);B.setAll(u),i.convertToFoundDocument(o.version,B).setHasCommittedMutations()})(r,e,t):r instanceof or?(function(s,i,o){if(!Po(s.precondition,i))return void i.convertToUnknownDocument(o.version);const B=Qh(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(gd(s)),u.setAll(B),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(r,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function ni(r,e,t,n){return r instanceof Vi?(function(i,o,B,u){if(!Po(i.precondition,o))return B;const c=i.value.clone(),h=Yh(i.fieldTransforms,u,o);return c.setAll(h),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null})(r,e,t,n):r instanceof or?(function(i,o,B,u){if(!Po(i.precondition,o))return B;const c=Yh(i.fieldTransforms,u,o),h=o.data;return h.setAll(gd(i)),h.setAll(c),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),B===null?null:B.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((C=>C.field)))})(r,e,t,n):(function(i,o,B){return Po(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):B})(r,e,t)}function pD(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=hd(n.transform,s||null);i!=null&&(t===null&&(t=ct.empty()),t.set(n.field,i))}return t||null}function $h(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&ls(n,s,((i,o)=>fD(i,o)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class Vi extends wa{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class or extends wa{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function gd(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function Qh(r,e,t){const n=new Map;Q(r.length===t.length,32656,{ve:t.length,De:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,B=e.data.field(i.field);n.set(i.field,hD(o,B,t[s]))}return n}function Yh(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,lD(i,o,e))}return n}class Ia extends wa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class gD extends wa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(e,t){this.position=e,this.inclusive=t}}function Xh(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=Y.comparator(Y.fromName(o.referenceValue),t.key):n=_t(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Zh(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!Vt(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{}class Ue extends md{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new ED(e,t,n):t==="array-contains"?new wD(e,n):t==="in"?new ID(e,n):t==="not-in"?new yD(e,n):t==="array-contains-any"?new TD(e,n):new Ue(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new _D(e,n):new DD(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(_t(t,this.value)):t!==null&&je(this.value)===je(t)&&this.matchesComparison(_t(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Kt extends md{constructor(e,t){super(),this.filters=e,this.op=t,this.Ce=null}static create(e,t){return new Kt(e,t)}matches(e){return Ed(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Ce!==null||(this.Ce=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Ce}getFilters(){return Object.assign([],this.filters)}}function Ed(r){return r.op==="and"}function _d(r){return mD(r)&&Ed(r)}function mD(r){for(const e of r.filters)if(e instanceof Kt)return!1;return!0}function nu(r){if(r instanceof Ue)return r.field.canonicalString()+r.op.toString()+Cs(r.value);if(_d(r))return r.filters.map((e=>nu(e))).join(",");{const e=r.filters.map((t=>nu(t))).join(",");return`${r.op}(${e})`}}function Dd(r,e){return r instanceof Ue?(function(n,s){return s instanceof Ue&&n.op===s.op&&n.field.isEqual(s.field)&&Vt(n.value,s.value)})(r,e):r instanceof Kt?(function(n,s){return s instanceof Kt&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,o,B)=>i&&Dd(o,s.filters[B])),!0):!1})(r,e):void ee(19439)}function wd(r){return r instanceof Ue?(function(t){return`${t.field.canonicalString()} ${t.op} ${Cs(t.value)}`})(r):r instanceof Kt?(function(t){return t.op.toString()+" {"+t.getFilters().map(wd).join(" ,")+"}"})(r):"Filter"}class ED extends Ue{constructor(e,t,n){super(e,t,n),this.key=Y.fromName(n.referenceValue)}matches(e){const t=Y.comparator(e.key,this.key);return this.matchesComparison(t)}}class _D extends Ue{constructor(e,t){super(e,"in",t),this.keys=Id("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class DD extends Ue{constructor(e,t){super(e,"not-in",t),this.keys=Id("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Id(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((n=>Y.fromName(n.referenceValue)))}class wD extends Ue{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ds(t)&&mi(t.arrayValue,this.value)}}class ID extends Ue{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&mi(this.value.arrayValue,t)}}class yD extends Ue{constructor(e,t){super(e,"not-in",t)}matches(e){if(mi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!mi(this.value.arrayValue,t)}}class TD extends Ue{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ds(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>mi(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,t="asc"){this.field=e,this.dir=t}}function AD(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{static fromTimestamp(e){return new ie(e)}static min(){return new ie(new De(0,0))}static max(){return new ie(new De(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t,n,s,i,o,B){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=B}static newInvalidDocument(e){return new rt(e,0,ie.min(),ie.min(),ie.min(),ct.empty(),0)}static newFoundDocument(e,t,n,s){return new rt(e,1,t,ie.min(),n,s,0)}static newNoDocument(e,t){return new rt(e,2,t,ie.min(),ie.min(),ct.empty(),0)}static newUnknownDocument(e,t){return new rt(e,3,t,ie.min(),ie.min(),ct.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ie.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ct.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ct.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ie.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof rt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new rt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yi=-1;function RD(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=ie.fromTimestamp(n===1e9?new De(t+1,0):new De(t,n));return new Qn(s,Y.empty(),e)}function vD(r){return new Qn(r.readTime,r.key,yi)}class Qn{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Qn(ie.min(),Y.empty(),yi)}static max(){return new Qn(ie.max(),Y.empty(),yi)}}function bD(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=Y.comparator(r.documentKey,e.documentKey),t!==0?t:ue(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PD{constructor(e,t=null,n=[],s=[],i=null,o=null,B=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=B,this.Fe=null}}function ef(r,e=null,t=[],n=[],s=null,i=null,o=null){return new PD(r,e,t,n,s,i,o)}function yd(r){const e=oe(r);if(e.Fe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>nu(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),Ea(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>Cs(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>Cs(n))).join(",")),e.Fe=t}return e.Fe}function Td(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!AD(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Dd(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Zh(r.startAt,e.startAt)&&Zh(r.endAt,e.endAt)}function gr(r){return!!r.isCorePipeline}function Ad(r){return!!r.path&&Y.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,t=null,n=[],s=[],i=null,o="F",B=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=B,this.endAt=u,this.Oe=null,this.Me=null,this.Ne=null,this.startAt,this.endAt}}function OD(r,e,t,n,s,i,o,B){return new Mi(r,e,t,n,s,i,o,B)}function ya(r){return new Mi(r)}function tf(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function SD(r){return Y.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Rd(r){return r.collectionGroup!==null}function ri(r){const e=oe(r);if(e.Oe===null){e.Oe=[];const t=new Set;for(const i of e.explicitOrderBy)e.Oe.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let B=new He(bt.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((c=>{c.isInequality()&&(B=B.add(c.field))}))})),B})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Oe.push(new Zo(i,n))})),t.has(bt.keyField().canonicalString())||e.Oe.push(new Zo(bt.keyField(),n))}return e.Oe}function tn(r){const e=oe(r);return e.Me||(e.Me=ND(e,ri(r))),e.Me}function ND(r,e){if(r.limitType==="F")return ef(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Zo(s.field,i)}));const t=r.endAt?new Xo(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Xo(r.startAt.position,r.startAt.inclusive):null;return ef(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function ru(r,e){const t=r.filters.concat([e]);return new Mi(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function su(r,e,t){return new Mi(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function FD(r,e){return Td(tn(r),tn(e))&&r.limitType===e.limitType}function si(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>wd(s))).join(", ")}]`),Ea(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>Cs(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>Cs(s))).join(",")),`Target(${n})`})(tn(r))}; limitType=${r.limitType})`}function Ta(r,e){return e.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):Y.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(const i of ri(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(o,B,u){const c=Xh(o,B,u);return o.inclusive?c<=0:c<0})(n.startAt,ri(n),s)||n.endAt&&!(function(o,B,u){const c=Xh(o,B,u);return o.inclusive?c>=0:c>0})(n.endAt,ri(n),s))})(r,e)}function xu(r){return(e,t)=>{let n=!1;for(const s of ri(r)){const i=LD(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function LD(r,e,t){const n=r.field.isKeyField()?Y.comparator(e.key,t.key):(function(i,o,B){const u=o.data.field(i),c=B.data.field(i);return u!==null&&c!==null?_t(u,c):ee(42886)})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return ee(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xD{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Me,Ce;function kD(r){switch(r){case k.OK:return ee(64938);case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0;default:return ee(15467,{code:r})}}function vd(r){if(r===void 0)return En("GRPC error has no .code"),k.UNKNOWN;switch(r){case Me.OK:return k.OK;case Me.CANCELLED:return k.CANCELLED;case Me.UNKNOWN:return k.UNKNOWN;case Me.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case Me.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case Me.INTERNAL:return k.INTERNAL;case Me.UNAVAILABLE:return k.UNAVAILABLE;case Me.UNAUTHENTICATED:return k.UNAUTHENTICATED;case Me.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case Me.NOT_FOUND:return k.NOT_FOUND;case Me.ALREADY_EXISTS:return k.ALREADY_EXISTS;case Me.PERMISSION_DENIED:return k.PERMISSION_DENIED;case Me.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case Me.ABORTED:return k.ABORTED;case Me.OUT_OF_RANGE:return k.OUT_OF_RANGE;case Me.UNIMPLEMENTED:return k.UNIMPLEMENTED;case Me.DATA_LOSS:return k.DATA_LOSS;default:return ee(39323,{code:r})}}(Ce=Me||(Me={}))[Ce.OK=0]="OK",Ce[Ce.CANCELLED=1]="CANCELLED",Ce[Ce.UNKNOWN=2]="UNKNOWN",Ce[Ce.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ce[Ce.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ce[Ce.NOT_FOUND=5]="NOT_FOUND",Ce[Ce.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ce[Ce.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ce[Ce.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ce[Ce.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ce[Ce.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ce[Ce.ABORTED=10]="ABORTED",Ce[Ce.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ce[Ce.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ce[Ce.INTERNAL=13]="INTERNAL",Ce[Ce.UNAVAILABLE=14]="UNAVAILABLE",Ce[Ce.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){ir(this.inner,((t,n)=>{for(const[s,i]of n)e(s,i)}))}isEmpty(){return $C(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VD=new Pe(Y.comparator);function pt(){return VD}const bd=new Pe(Y.comparator);function ts(...r){let e=bd;for(const t of r)e=e.insert(t.key,t);return e}function Pd(r){let e=bd;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function On(){return ii()}function Od(){return ii()}function ii(){return new jr((r=>r.toString()),((r,e)=>r.isEqual(e)))}const MD=new Pe(Y.comparator),GD=new He(Y.comparator);function le(...r){let e=GD;for(const t of r)e=e.add(t);return e}const UD=new He(ue);function HD(){return UD}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jD(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JD=new Un([4294967295,4294967295],0);function nf(r){const e=jD().encode(r),t=new FC;return t.update(e),new Uint8Array(t.digest())}function rf(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Un([t,n],0),new Un([s,i],0)]}class ku{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Xs(`Invalid padding: ${t}`);if(n<0)throw new Xs(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Xs(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Xs(`Invalid padding when bitmap length is 0: ${t}`);this.Be=8*e.length-t,this.Le=Un.fromNumber(this.Be)}$e(e,t,n){let s=e.add(t.multiply(Un.fromNumber(n)));return s.compare(JD)===1&&(s=new Un([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Le).toNumber()}Ue(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Be===0)return!1;const t=nf(e),[n,s]=rf(t);for(let i=0;i<this.hashCount;i++){const o=this.$e(n,s,i);if(!this.Ue(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new ku(i,s,t);return n.forEach((B=>o.insert(B))),o}insert(e){if(this.Be===0)return;const t=nf(e),[n,s]=rf(t);for(let i=0;i<this.hashCount;i++){const o=this.$e(n,s,i);this.ke(o)}}ke(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Xs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t,n,s,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Ui.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Gi(ie.min(),s,new Pe(ue),pt(),pt(),le())}}class Ui{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Ui(n,t,le(),le(),le())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e,t,n,s){this.Qe=e,this.removedTargetIds=t,this.key=n,this.qe=s}}class Sd{constructor(e,t){this.targetId=e,this.Ke=t}}class Nd{constructor(e,t,n=Oe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class sf{constructor(e){this.targetId=e,this.We=0,this.Ge=of(),this.je=Oe.EMPTY_BYTE_STRING,this.ze=!1,this.He=!0}get current(){return this.ze}get resumeToken(){return this.je}get Je(){return this.We!==0}get Ye(){return this.He}Ze(e){e.approximateByteSize()>0&&(this.He=!0,this.je=e)}Xe(){let e=le(),t=le(),n=le();return this.Ge.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:ee(38017,{changeType:i})}})),new Ui(this.je,this.ze,e,t,n)}et(){this.He=!1,this.Ge=of()}tt(e,t){this.He=!0,this.Ge=this.Ge.insert(e,t)}nt(e){this.He=!0,this.Ge=this.Ge.remove(e)}rt(){this.We+=1}it(){this.We-=1,Q(this.We>=0,3241,{We:this.We,targetId:this.targetId})}st(){this.He=!0,this.ze=!0}}const qs="WatchChangeAggregator";class qD{constructor(e){this._t=e,this.ot=new Map,this.ut=pt(),this.ct=_o(),this.lt=pt(),this.Et=_o(),this.ht=new Pe(ue)}Tt(e){for(const t of e.Qe)e.qe&&e.qe.isFoundDocument()?this.Pt(t,e.qe):this.It(t,e.key,e.qe);for(const t of e.removedTargetIds)this.It(t,e.key,e.qe)}Rt(e){this.forEachTarget(e,(t=>{const n=this.ot.get(t);if(n)switch(e.state){case 0:this.At(t)&&n.Ze(e.resumeToken);break;case 1:n.it(),n.Je||n.et(),n.Ze(e.resumeToken);break;case 2:n.it(),n.Je||this.removeTarget(t);break;case 3:this.At(t)&&(n.st(),n.Ze(e.resumeToken));break;case 4:this.At(t)&&(this.Vt(t),n.Ze(e.resumeToken));break;default:ee(56790,{state:e.state})}else $(qs,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ot.forEach(((n,s)=>{this.At(s)&&t(s)}))}dt(e){var t;return gr(e)?e.getPipelineSourceType()==="documents"&&((t=e.getPipelineDocuments())==null?void 0:t.length)===1:Ad(e)}ft(e){const t=e.targetId,n=e.Ke.count,s=this.gt(t);if(s){const i=s.target;if(this.dt(i))if(n===0){const o=new Y(gr(i)?ge.fromString(i.getPipelineDocuments()[0]):i.path);this.It(t,o,rt.newNoDocument(o,ie.min()))}else Q(n===1,20013,"Single document existence filter with count: "+n);else{const o=this.yt(t);if(o!==n){const B=this.wt(e),u=B?this.bt(B,e,o):1;if(u!==0){this.Vt(t);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.ht=this.ht.insert(t,c)}}}}}wt(e){const t=e.Ke.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,B;try{o=Sr(n).toUint8Array()}catch(u){if(u instanceof YC)return qt("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{B=new ku(o,s,i)}catch(u){return qt(u instanceof Xs?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return B.Be===0?null:B}bt(e,t,n){return t.Ke.count===n-this.vt(e,t.targetId)?0:2}vt(e,t){const n=this._t.getRemoteKeysForTarget(t);let s=0;return n.forEach((i=>{const o=this._t.xt(),B=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(B)||(this.It(t,i,null),s++)})),s}Dt(e){const t=new Map;this.ot.forEach(((i,o)=>{const B=this.gt(o);if(B){if(i.current&&this.dt(B.target)){const u=gr(B.target)?ge.fromString(B.target.getPipelineDocuments()[0]):B.target.path,c=new Y(u);this.Ct(c).has(o)||this.Ft(o,c)||this.It(o,c,rt.newNoDocument(c,e))}i.Ye&&(t.set(o,i.Xe()),i.et())}}));let n=le();this.Et.forEach(((i,o)=>{let B=!0;o.forEachWhile((u=>{const c=this.gt(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(B=!1,!1)})),B&&(n=n.add(i))})),this.ut.forEach(((i,o)=>o.setReadTime(e))),this.lt.forEach(((i,o)=>o.setReadTime(e)));const s=new Gi(e,t,this.ht,this.ut,this.lt,n);return this.ut=pt(),this.ct=_o(),this.lt=pt(),this.Et=_o(),this.ht=new Pe(ue),s}Pt(e,t){const n=this.ot.get(e);if(!n||!this.At(e))return void $(qs,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.Ft(e,t.key)?2:0;n.tt(t.key,s),gr(this.gt(e).target)&&this.gt(e).target.getPipelineFlavor()!=="exact"?this.lt=this.lt.insert(t.key,t):this.ut=this.ut.insert(t.key,t),this.ct=this.ct.insert(t.key,this.Ct(t.key).add(e)),this.Et=this.Et.insert(t.key,this.Ot(t.key).add(e))}It(e,t,n){const s=this.ot.get(e);s&&this.At(e)?(this.Ft(e,t)?s.tt(t,1):s.nt(t),this.Et=this.Et.insert(t,this.Ot(t).delete(e)),this.Et=this.Et.insert(t,this.Ot(t).add(e)),n&&(gr(this.gt(e).target)&&this.gt(e).target.getPipelineFlavor()!=="exact"?this.lt=this.lt.insert(t,n):this.ut=this.ut.insert(t,n))):$(qs,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ot.delete(e)}yt(e){const t=this.ot.get(e);if(!t)return 0;const n=t.Xe();return this._t.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}rt(e){let t=this.ot.get(e);t||($(qs,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new sf(e),this.ot.set(e,t)),t.rt()}Ot(e){let t=this.Et.get(e);return t||(t=new He(ue),this.Et=this.Et.insert(e,t)),t}Ct(e){let t=this.ct.get(e);return t||(t=new He(ue),this.ct=this.ct.insert(e,t)),t}At(e){const t=this.gt(e)!==null;return t||$(qs,"Detected inactive target",e),t}gt(e){const t=this.ot.get(e);return t===void 0||t.Je?null:this._t.Mt(e)}Vt(e){this.ot.set(e,new sf(e)),this._t.getRemoteKeysForTarget(e).forEach((t=>{this.It(e,t,null)}))}Ft(e,t){return this._t.getRemoteKeysForTarget(e).has(t)}}function _o(){return new Pe(Y.comparator)}function of(){return new Pe(Y.comparator)}const KD={asc:"ASCENDING",desc:"DESCENDING"},zD={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},WD={and:"AND",or:"OR"};class $D{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function iu(r,e){return r.useProto3Json||Ea(e)?e:{value:e}}function oi(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Vu(r){const e=zn(r);return new De(e.seconds,e.nanos)}function ou(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function So(r,e){return oi(r,e.toTimestamp())}function nn(r){return Q(!!r,49232),ie.fromTimestamp(Vu(r))}function Mu(r,e){return au(r,e).canonicalString()}function au(r,e){const t=(function(s){return new ge(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function Fd(r){const e=ge.fromString(r);return Q(Md(e),10190,{key:e.toString()}),e}function ea(r,e){return Mu(r.databaseId,e.path)}function vB(r,e){const t=Fd(e);if(t.get(1)!==r.databaseId.projectId)throw new J(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new J(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new Y(xd(t))}function Ld(r,e){return Mu(r.databaseId,e)}function QD(r){const e=Fd(r);return e.length===4?ge.emptyPath():xd(e)}function Bu(r){return new ge(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function xd(r){return Q(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function af(r,e,t){return{name:ea(r,e),fields:t.value.mapValue.fields}}function YD(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:ee(39313,{state:c})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(c,h){return c.useProto3Json?(Q(h===void 0||typeof h=="string",58123),Oe.fromBase64String(h||"")):(Q(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),Oe.fromUint8Array(h||new Uint8Array))})(r,e.targetChange.resumeToken),o=e.targetChange.cause,B=o&&(function(c){const h=c.code===void 0?k.UNKNOWN:vd(c.code);return new J(h,c.message||"")})(o);t=new Nd(n,s,i,B||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=vB(r,n.document.name),i=nn(n.document.updateTime),o=n.document.createTime?nn(n.document.createTime):ie.min(),B=new ct({mapValue:{fields:n.document.fields}}),u=rt.newFoundDocument(s,i,o,B),c=n.targetIds||[],h=n.removedTargetIds||[];t=new Oo(c,h,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=vB(r,n.document),i=n.readTime?nn(n.readTime):ie.min(),o=rt.newNoDocument(s,i),B=n.removedTargetIds||[];t=new Oo([],B,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=vB(r,n.document),i=n.removedTargetIds||[];t=new Oo([],i,s,null)}else{if(!("filter"in e))return ee(11601,{Nt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new xD(s,i),B=n.targetId;t=new Sd(B,o)}}return t}function XD(r,e){let t;if(e instanceof Vi)t={update:af(r,e.key,e.value)};else if(e instanceof Ia)t={delete:ea(r,e.key)};else if(e instanceof or)t={update:af(r,e.key,e.data),updateMask:Bw(e.fieldMask)};else{if(!(e instanceof gD))return ee(16599,{Bt:e.type});t={verify:ea(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,o){const B=o.transform;if(B instanceof $o)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(B instanceof Di)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:B.elements}};if(B instanceof wi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:B.elements}};if(B instanceof Ii)return{fieldPath:o.field.canonicalString(),increment:B.xe};if(B instanceof Qo)return{fieldPath:o.field.canonicalString(),minimum:B.xe};if(B instanceof Yo)return{fieldPath:o.field.canonicalString(),maximum:B.xe};throw ee(20930,{transform:o.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:So(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee(27497)})(r,e.precondition)),t}function ZD(r,e){return r&&r.length>0?(Q(e!==void 0,14353),r.map((t=>(function(s,i){let o=s.updateTime?nn(s.updateTime):nn(i);return o.isEqual(ie.min())&&(o=nn(i)),new CD(o,s.transformResults||[])})(t,e)))):[]}function ew(r,e){return{documents:[Ld(r,e.path)]}}function tw(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Ld(r,s);const i=(function(c){if(c.length!==0)return Vd(Kt.create(c,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(c){if(c.length!==0)return c.map((h=>(function(d){return{field:ns(d.field),direction:iw(d.dir)}})(h)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const B=iu(r,e.limit);return B!==null&&(t.structuredQuery.limit=B),e.startAt&&(t.structuredQuery.startAt=(function(c){return{before:c.inclusive,values:c.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(c){return{before:!c.inclusive,values:c.position}})(e.endAt)),{Lt:t,parent:s}}function nw(r){let e=QD(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){Q(n===1,65062);const h=t.from[0];h.allDescendants?s=h.collectionId:e=e.child(h.collectionId)}let i=[];t.where&&(i=(function(C){const d=kd(C);return d instanceof Kt&&_d(d)?d.getFilters():[d]})(t.where));let o=[];t.orderBy&&(o=(function(C){return C.map((d=>(function(D){return new Zo(rs(D.field),(function(F){switch(F){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(d)))})(t.orderBy));let B=null;t.limit&&(B=(function(C){let d;return d=typeof C=="object"?C.value:C,Ea(d)?null:d})(t.limit));let u=null;t.startAt&&(u=(function(C){const d=!!C.before,E=C.values||[];return new Xo(E,d)})(t.startAt));let c=null;return t.endAt&&(c=(function(C){const d=!C.before,E=C.values||[];return new Xo(E,d)})(t.endAt)),OD(e,s,o,i,B,"F",u,c)}function rw(r,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function sw(r,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(r)))}}}}function kd(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=rs(t.unaryFilter.field);return Ue.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=rs(t.unaryFilter.field);return Ue.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=rs(t.unaryFilter.field);return Ue.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=rs(t.unaryFilter.field);return Ue.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ee(61313);default:return ee(60726)}})(r):r.fieldFilter!==void 0?(function(t){return Ue.create(rs(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ee(58110);default:return ee(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return Kt.create(t.compositeFilter.filters.map((n=>kd(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ee(1026)}})(t.compositeFilter.op))})(r):ee(30097,{filter:r})}function iw(r){return KD[r]}function ow(r){return zD[r]}function aw(r){return WD[r]}function ns(r){return{fieldPath:r.canonicalString()}}function rs(r){return bt.fromServerFormat(r.fieldPath)}function Vd(r){return r instanceof Ue?(function(t){if(t.op==="=="){if(Qe(t.value))return{unaryFilter:{field:ns(t.field),op:"IS_NAN"}};if(Rt(t.value))return{unaryFilter:{field:ns(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Qe(t.value))return{unaryFilter:{field:ns(t.field),op:"IS_NOT_NAN"}};if(Rt(t.value))return{unaryFilter:{field:ns(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ns(t.field),op:ow(t.op),value:t.value}}})(r):r instanceof Kt?(function(t){const n=t.getFilters().map((s=>Vd(s)));return n.length===1?n[0]:{compositeFilter:{op:aw(t.op),filters:n}}})(r):ee(54877,{filter:r})}function Bw(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Md(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function Gd(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}function Ti(r,e){const t={fields:{}};return e.forEach(((n,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=n._toProto(r)})),{mapValue:t}}function Ud(r){return{stringValue:r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Aa(r){return new $D(r,!0)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(e){this.value=e}isEqual(e){return this.value===e.value}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e,t){if(this.seconds=e,this.increment=t,!Number.isInteger(e)||e<0||e>4294967295)throw new Error("BsonTimestamp 'seconds' must be in the range of a 32-bit unsigned integer (0-4294967295).");if(!Number.isInteger(t)||t<0||t>4294967295)throw new Error("BsonTimestamp 'increment' must be in the range of a 32-bit unsigned integer (0-4294967295).")}isEqual(e){return this.seconds===e.seconds&&this.increment===e.increment}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t=0){if(this.subtype=t,!Number.isInteger(t)||t<0||t>255)throw new J(k.INVALID_ARGUMENT,"The subtype for Bytes must be a value in the inclusive [0, 255] range.");this._byteString=e}static fromBase64String(e,t=0){try{return new Tt(Oe.fromBase64String(e),t)}catch(n){throw new J(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e,t=0){return new Tt(Oe.fromUint8Array(e),t)}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}get data(){return this.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+", subtype: "+this.subtype+")"}isEqual(e){return this.subtype===e.subtype&&this._byteString.isEqual(e._byteString)}toJSON(){const e={type:Tt._jsonSchemaVersion,bytes:this.toBase64()};return this.subtype!==0&&(e.subtype=this.subtype),e}static fromJSON(e){if(xi(e,Tt._jsonSchema)){const t=e.subtype??0;return Tt.fromBase64String(e.bytes,t)}}}Tt._jsonSchemaVersion="firestore/bytes/1.0",Tt._jsonSchema={type:Ve("string",Tt._jsonSchemaVersion),bytes:Ve("string"),subtype:{...Ve("number"),optional:!0}};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e){this.stringValue=e,this.value=Z.fromString(e)}isEqual(e){return!(!this.value.oe()||!e.value.oe())||this.value.compareTo(e.value)===0}toJSON(){return{Ut:{stringValue:this.stringValue}}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new J(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new bt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function uw(){return new Ra(Yt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new J(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new J(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:rn._jsonSchemaVersion}}static fromJSON(e){if(xi(e,rn._jsonSchema))return new rn(e.latitude,e.longitude)}}rn._jsonSchemaVersion="firestore/geoPoint/1.0",rn._jsonSchema={type:Ve("string",rn._jsonSchemaVersion),latitude:Ve("number"),longitude:Ve("number")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(e){this.value=e}isEqual(e){return this.value===e.value}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(){this.type="MaxKey"}static instance(){return cn.MAX_KEY_VALUE_INSTANCE||(cn.MAX_KEY_VALUE_INSTANCE=new cn),cn.MAX_KEY_VALUE_INSTANCE}}cn.MAX_KEY_VALUE_INSTANCE=null;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(){this.type="MinKey"}static instance(){return ln.MIN_KEY_VALUE_INSTANCE||(ln.MIN_KEY_VALUE_INSTANCE=new ln),ln.MIN_KEY_VALUE_INSTANCE}}ln.MIN_KEY_VALUE_INSTANCE=null;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}nt.UNAUTHENTICATED=new nt(null),nt.GOOGLE_CREDENTIALS=new nt("google-credentials-uid"),nt.FIRST_PARTY=new nt("first-party-uid"),nt.MOCK_USER=new nt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class cw{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(nt.UNAUTHENTICATED)))}shutdown(){}}class lw{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class hw{constructor(e){this.kt=e,this.currentUser=nt.UNAUTHENTICATED,this.Qt=0,this.forceRefresh=!1,this.auth=null}start(e,t){Q(this.qt===void 0,42304);let n=this.Qt;const s=u=>this.Qt!==n?(n=this.Qt,t(u)):Promise.resolve();let i=new pn;this.qt=()=>{this.Qt++,this.currentUser=this.Kt(),i.resolve(),i=new pn,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},B=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.qt&&(this.auth.addAuthTokenListener(this.qt),o())};this.kt.onInit((u=>B(u))),setTimeout((()=>{if(!this.auth){const u=this.kt.getImmediate({optional:!0});u?B(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new pn)}}),0),o()}getToken(){const e=this.Qt,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.Qt!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(Q(typeof n.accessToken=="string",31837,{Wt:n}),new Hd(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.qt&&this.auth.removeAuthTokenListener(this.qt),this.qt=void 0}Kt(){const e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string",2055,{Gt:e}),new nt(e)}}class fw{constructor(e,t,n){this.jt=e,this.zt=t,this.Ht=n,this.type="FirstParty",this.user=nt.FIRST_PARTY,this.Jt=new Map}Yt(){return this.Ht?this.Ht():null}get headers(){this.Jt.set("X-Goog-AuthUser",this.jt);const e=this.Yt();return e&&this.Jt.set("Authorization",e),this.zt&&this.Jt.set("X-Goog-Iam-Authorization-Token",this.zt),this.Jt}}class Cw{constructor(e,t,n){this.jt=e,this.zt=t,this.Ht=n}getToken(){return Promise.resolve(new fw(this.jt,this.zt,this.Ht))}start(e,t){e.enqueueRetryable((()=>t(nt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Bf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class dw{constructor(e,t){this.Zt=t,this.forceRefresh=!1,this.appCheck=null,this.Xt=null,this.en=null,Lt(e)&&e.settings.appCheckToken&&(this.en=e.settings.appCheckToken)}start(e,t){Q(this.qt===void 0,3512);const n=i=>{i.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.Xt;return this.Xt=i.token,$("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.qt=i=>{e.enqueueRetryable((()=>n(i)))};const s=i=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.qt&&this.appCheck.addTokenListener(this.qt)};this.Zt.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.Zt.getImmediate({optional:!0});i?s(i):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.en)return Promise.resolve(new Bf(this.en));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Q(typeof t.token=="string",44558,{tokenResult:t}),this.Xt=t.token,new Bf(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.qt&&this.appCheck.removeTokenListener(this.qt),this.qt=void 0}}function jd(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pw{tn(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf="ConnectivityMonitor";class cf{constructor(){this.nn=()=>this.rn(),this.sn=()=>this._n(),this.an=[],this.un()}tn(e){this.an.push(e)}shutdown(){window.removeEventListener("online",this.nn),window.removeEventListener("offline",this.sn)}un(){window.addEventListener("online",this.nn),window.addEventListener("offline",this.sn)}rn(){$(uf,"Network connectivity changed: AVAILABLE");for(const e of this.an)e(0)}_n(){$(uf,"Network connectivity changed: UNAVAILABLE");for(const e of this.an)e(1)}static cn(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Do=null;function uu(){return Do===null?Do=(function(){return 268435456+Math.round(2147483648*Math.random())})():Do++,"0x"+Do.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bB="RestConnection",gw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class mw{get En(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.hn=t+"://"+e.host,this.Tn=`projects/${n}/databases/${s}`,this.Pn=this.databaseId.database===jo?`project_id=${n}`:`project_id=${n}&database_id=${s}`}In(e,t,n,s,i){const o=uu(),B=this.Rn(e,t.toUriEncodedString());$(bB,`Sending RPC '${e}' ${o}:`,B,n);const u={"google-cloud-resource-prefix":this.Tn,"x-goog-request-params":this.Pn};this.An(u,s,i);const{host:c}=new URL(B),h=Gr(c);return this.Vn(e,B,u,n,h).then((C=>($(bB,`Received RPC '${e}' ${o}: `,C),C)),(C=>{throw qt(bB,`RPC '${e}' ${o} failed with error: `,C,"url: ",B,"request:",n),C}))}dn(e,t,n,s,i,o){return this.In(e,t,n,s,i)}An(e,t,n){if(e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ms})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),n&&n.headers.forEach(((s,i)=>e[i]=s)),this.databaseInfo._customHeaders)for(const s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}Rn(e,t){const n=gw[e];let s=`${this.hn}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ew{constructor(e){this.fn=e.fn,this.mn=e.mn}pn(e){this.gn=e}yn(e){this.wn=e}bn(e){this.Sn=e}onMessage(e){this.xn=e}close(){this.mn()}send(e){this.fn(e)}vn(){this.gn()}Dn(){this.wn()}Cn(e){this.Sn(e)}Fn(e){this.xn(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt="WebChannelConnection",Ks=(r,e,t)=>{r.listen(e,(n=>{try{t(n)}catch(s){setTimeout((()=>{throw s}),0)}}))};class as extends mw{constructor(e){super(e),this.On=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static Mn(){if(!as.Nn){const e=VC();Ks(e,kC.STAT_EVENT,(t=>{t.stat===WB.PROXY?$(tt,"STAT_EVENT: detected buffering proxy"):t.stat===WB.NOPROXY&&$(tt,"STAT_EVENT: detected no buffering proxy")})),as.Nn=!0}}Vn(e,t,n,s,i){const o=uu();return new Promise(((B,u)=>{const c=new LC;c.setWithCredentials(!0),c.listenOnce(xC.COMPLETE,(()=>{try{switch(c.getLastErrorCode()){case Ao.NO_ERROR:const C=c.getResponseJson();$(tt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(C)),B(C);break;case Ao.TIMEOUT:$(tt,`RPC '${e}' ${o} timed out`),u(new J(k.DEADLINE_EXCEEDED,"Request time out"));break;case Ao.HTTP_ERROR:const d=c.getStatus();if($(tt,`RPC '${e}' ${o} failed with status:`,d,"response text:",c.getResponseText()),d>0){let E=c.getResponseJson();Array.isArray(E)&&(E=E[0]);const D=E==null?void 0:E.error;if(D&&D.status&&D.message){const b=(function(U){const K=U.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(K)>=0?K:k.UNKNOWN})(D.status);u(new J(b,D.message))}else u(new J(k.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new J(k.UNAVAILABLE,"Connection failed."));break;default:ee(9055,{Bn:e,streamId:o,Ln:c.getLastErrorCode(),$n:c.getLastError()})}}finally{$(tt,`RPC '${e}' ${o} completed.`)}}));const h=JSON.stringify(s);$(tt,`RPC '${e}' ${o} sending request:`,s),c.send(t,"POST",h,n,15)}))}Un(e,t,n){const s=uu(),i=[this.hn,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),B={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(B.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(B.useFetchStreams=!0),this.An(B.initMessageHeaders,t,n),B.encodeInitMessageHeaders=!0;const c=i.join("");$(tt,`Creating RPC '${e}' stream ${s}: ${c}`,B);const h=o.createWebChannel(c,B);this.kn(h);let C=!1,d=!1;const E=new Ew({fn:D=>{d?$(tt,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(C||($(tt,`Opening RPC '${e}' stream ${s} transport.`),h.open(),C=!0),$(tt,`RPC '${e}' stream ${s} sending:`,D),h.send(D))},mn:()=>h.close()});return Ks(h,Qs.EventType.OPEN,(()=>{d||($(tt,`RPC '${e}' stream ${s} transport opened.`),E.vn())})),Ks(h,Qs.EventType.CLOSE,(()=>{d||(d=!0,$(tt,`RPC '${e}' stream ${s} transport closed`),E.Cn(),this.Qn(h))})),Ks(h,Qs.EventType.ERROR,(D=>{d||(d=!0,qt(tt,`RPC '${e}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),E.Cn(new J(k.UNAVAILABLE,"The operation could not be completed")))})),Ks(h,Qs.EventType.MESSAGE,(D=>{var b;if(!d){const F=D.data[0];Q(!!F,16349);const U=F,K=(U==null?void 0:U.error)||((b=U[0])==null?void 0:b.error);if(K){$(tt,`RPC '${e}' stream ${s} received error:`,K);const re=K.status;let ce=(function(R){const _=Me[R];if(_!==void 0)return vd(_)})(re),Ee=K.message;re==="NOT_FOUND"&&Ee.includes("database")&&Ee.includes("does not exist")&&Ee.includes(this.databaseId.database)&&qt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ce===void 0&&(ce=k.INTERNAL,Ee="Unknown error status: "+re+" with message "+K.message),d=!0,E.Cn(new J(ce,Ee)),h.close()}else $(tt,`RPC '${e}' stream ${s} received:`,F),E.Fn(F)}})),as.Mn(),setTimeout((()=>{E.Dn()}),0),E}terminate(){this.On.forEach((e=>e.close())),this.On=[]}kn(e){this.On.push(e)}Qn(e){this.On=this.On.filter((t=>t===e))}An(e,t,n){super.An(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return MC()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _w(r){return new as(r)}as.Nn=!1;class Jd{constructor(e,t,n=1e3,s=1.5,i=6e4){this.qn=e,this.timerId=t,this.Kn=n,this.Wn=s,this.Gn=i,this.jn=0,this.zn=null,this.Hn=Date.now(),this.reset()}reset(){this.jn=0}Jn(){this.jn=this.Gn}Yn(e){this.cancel();const t=Math.floor(this.jn+this.Zn()),n=Math.max(0,Date.now()-this.Hn),s=Math.max(0,t-n);s>0&&$("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.jn} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.zn=this.qn.enqueueAfterDelay(this.timerId,s,(()=>(this.Hn=Date.now(),e()))),this.jn*=this.Wn,this.jn<this.Kn&&(this.jn=this.Kn),this.jn>this.Gn&&(this.jn=this.Gn)}Xn(){this.zn!==null&&(this.zn.skipDelay(),this.zn=null)}cancel(){this.zn!==null&&(this.zn.cancel(),this.zn=null)}Zn(){return(Math.random()-.5)*this.jn}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf="PersistentStream";class qd{constructor(e,t,n,s,i,o,B,u){this.qn=e,this.er=n,this.tr=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=B,this.listener=u,this.state=0,this.nr=0,this.rr=null,this.ir=null,this.stream=null,this.sr=0,this._r=new Jd(e,t)}ar(){return this.state===1||this.state===5||this.ur()}ur(){return this.state===2||this.state===3}start(){this.sr=0,this.state!==4?this.auth():this.cr()}async stop(){this.ar()&&await this.close(0)}lr(){this.state=0,this._r.reset()}Er(){this.ur()&&this.rr===null&&(this.rr=this.qn.enqueueAfterDelay(this.er,6e4,(()=>this.hr())))}Tr(e){this.Pr(),this.stream.send(e)}async hr(){if(this.ur())return this.close(0)}Pr(){this.rr&&(this.rr.cancel(),this.rr=null)}Ir(){this.ir&&(this.ir.cancel(),this.ir=null)}async close(e,t){this.Pr(),this.Ir(),this._r.cancel(),this.nr++,e!==4?this._r.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(En(t.toString()),En("Using maximum backoff delay to prevent overloading the backend."),this._r.Jn()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Rr(),this.stream.close(),this.stream=null),this.state=e,await this.listener.bn(t)}Rr(){}auth(){this.state=1;const e=this.Ar(this.nr),t=this.nr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.nr===t&&this.Vr(n,s)}),(n=>{e((()=>{const s=new J(k.UNKNOWN,"Fetching auth token failed: "+n.message);return this.dr(s)}))}))}Vr(e,t){const n=this.Ar(this.nr);this.stream=this.mr(e,t),this.stream.pn((()=>{n((()=>this.listener.pn()))})),this.stream.yn((()=>{n((()=>(this.state=2,this.ir=this.qn.enqueueAfterDelay(this.tr,1e4,(()=>(this.ur()&&(this.state=3),Promise.resolve()))),this.listener.yn())))})),this.stream.bn((s=>{n((()=>this.dr(s)))})),this.stream.onMessage((s=>{n((()=>++this.sr==1?this.pr(s):this.onNext(s)))}))}cr(){this.state=5,this._r.Yn((async()=>{this.state=0,this.start()}))}dr(e){return $(lf,`close with error: ${e}`),this.stream=null,this.close(4,e)}Ar(e){return t=>{this.qn.enqueueAndForget((()=>this.nr===e?t():($(lf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Dw extends qd{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}mr(e,t){return this.connection.Un("Listen",e,t)}pr(e){return this.onNext(e)}onNext(e){this._r.reset();const t=YD(this.serializer,e),n=(function(i){if(!("targetChange"in i))return ie.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ie.min():o.readTime?nn(o.readTime):ie.min()})(e);return this.listener.gr(t,n)}yr(e){const t={};t.database=Bu(this.serializer),t.addTarget=(function(i,o){let B;const u=o.target;if(B=gr(u)?{pipelineQuery:sw(i,u)}:Ad(u)?{documents:ew(i,u)}:{query:tw(i,u).Lt},B.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){B.resumeToken=ou(i,o.resumeToken);const c=iu(i,o.expectedCount);c!==null&&(B.expectedCount=c)}else if(o.snapshotVersion.compareTo(ie.min())>0){B.readTime=oi(i,o.snapshotVersion.toTimestamp());const c=iu(i,o.expectedCount);c!==null&&(B.expectedCount=c)}return B})(this.serializer,e);const n=rw(this.serializer,e);n&&(t.labels=n),this.Tr(t)}wr(e){const t={};t.database=Bu(this.serializer),t.removeTarget=e,this.Tr(t)}}class ww extends qd{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get br(){return this.sr>0}start(){this.lastStreamToken=void 0,super.start()}Rr(){this.br&&this.Sr([])}mr(e,t){return this.connection.Un("Write",e,t)}pr(e){return Q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0,55816),this.listener.vr()}onNext(e){Q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this._r.reset();const t=ZD(e.writeResults,e.commitTime),n=nn(e.commitTime);return this.listener.Dr(n,t)}Cr(){const e={};e.database=Bu(this.serializer),this.Tr(e)}Sr(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>XD(this.serializer,n)))};this.Tr(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iw{}class yw extends Iw{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.Fr=!1}Or(){if(this.Fr)throw new J(k.FAILED_PRECONDITION,"The client has already been terminated.")}In(e,t,n,s){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.In(e,au(t,n),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new J(k.UNKNOWN,i.toString())}))}dn(e,t,n,s,i){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,B])=>this.connection.dn(e,au(t,n),s,o,B,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new J(k.UNKNOWN,o.toString())}))}terminate(){this.Fr=!0,this.connection.terminate()}}function Tw(r,e,t,n){return new yw(r,e,t,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aw="ComponentProvider",hf=new Map;function Rw(r,e,t,n,s){return new iD(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,jd(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n,s._customHeaders,s.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Kd=41943040;class dt{static withCacheSize(e){return new dt(e,dt.DEFAULT_COLLECTION_PERCENTILE,dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}dt.DEFAULT_COLLECTION_PERCENTILE=10,dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,dt.DEFAULT=new dt(Kd,dt.DEFAULT_COLLECTION_PERCENTILE,dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),dt.DISABLED=new dt(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.Mr(n),this.Nr=n=>t.writeSequenceNumber(n))}Mr(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.Nr&&this.Nr(e),e}}va.Br=-1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vw="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class bw{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Es(r){if(r.code!==k.FAILED_PRECONDITION||r.message!==vw)throw r;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ee(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new V(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof V?t:V.resolve(t)}catch(t){return V.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):V.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):V.reject(t)}static resolve(e){return new V(((t,n)=>{t(e)}))}static reject(e){return new V(((t,n)=>{n(e)}))}static waitFor(e){return new V(((t,n)=>{let s=0,i=0,o=!1;e.forEach((B=>{++s,B.next((()=>{++i,o&&i===s&&t()}),(u=>n(u)))})),o=!0,i===s&&t()}))}static or(e){let t=V.resolve(!1);for(const n of e)t=t.next((s=>s?V.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new V(((n,s)=>{const i=e.length,o=new Array(i);let B=0;for(let u=0;u<i;u++){const c=u;t(e[c]).next((h=>{o[c]=h,++B,B===i&&n(o)}),(h=>s(h)))}}))}static doWhile(e,t){return new V(((n,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}}function Pw(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function _s(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cf="LruGarbageCollector",Ow=1048576;function df([r,e],[t,n]){const s=ue(r,t);return s===0?ue(e,n):s}class Sw{constructor(e){this.ai=e,this.buffer=new He(df),this.ui=0}ci(){return++this.ui}li(e){const t=[e,this.ci()];if(this.buffer.size<this.ai)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();df(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Nw{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Ei=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.hi(6e4)}stop(){this.Ei&&(this.Ei.cancel(),this.Ei=null)}get started(){return this.Ei!==null}hi(e){$(Cf,`Garbage collection scheduled in ${e}ms`),this.Ei=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Ei=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){_s(t)?$(Cf,"Ignoring IndexedDB error during garbage collection: ",t):await Es(t)}await this.hi(3e5)}))}}class Fw{constructor(e,t){this.Ti=e,this.params=t}calculateTargetCount(e,t){return this.Ti.Pi(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return V.resolve(va.Br);const n=new Sw(t);return this.Ti.forEachTarget(e,(s=>n.li(s.sequenceNumber))).next((()=>this.Ti.Ii(e,(s=>n.li(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Ti.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Ti.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(ff)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ff):this.Ri(e,t)))}getCacheSize(e){return this.Ti.getCacheSize(e)}Ri(e,t){let n,s,i,o,B,u,c;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((C=>(C>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${C}`),s=this.params.maximumSequenceNumbersToCollect):s=C,o=Date.now(),this.nthSequenceNumber(e,s)))).next((C=>(n=C,B=Date.now(),this.removeTargets(e,n,t)))).next((C=>(i=C,u=Date.now(),this.removeOrphanedDocuments(e,n)))).next((C=>(c=Date.now(),Zr()<=he.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${s} in `+(B-o)+`ms
	Removed ${i} targets in `+(u-B)+`ms
	Removed ${C} documents in `+(c-u)+`ms
Total Duration: ${c-h}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:C}))))}}function Lw(r,e){return new Fw(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zd="firestore.googleapis.com",pf=!0;class gf{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new J(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=zd,this.ssl=pf}else this.host=e.host,this.ssl=e.ssl??pf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=Kd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ow)throw new J(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(rD("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=jd(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new J(k.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new J(k.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new J(k.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new J(k.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&(function(n,s){if(n===s)return!0;if(!n||!s)return!1;const i=Object.keys(n),o=Object.keys(s);if(i.length!==o.length)return!1;for(const B of i)if(n[B]!==s[B])return!1;return!0})(this._customHeaders,e._customHeaders)}}let ba=class{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new gf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new J(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new J(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new gf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new cw;switch(n.type){case"firstParty":return new Cw(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new J(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=hf.get(t);n&&($(Aw,"Removing Datastore"),hf.delete(t),n.terminate())})(this),Promise.resolve()}};function xw(r,e,t,n={}){var c;r=xt(r,ba);const s=Gr(e),i=r._getSettings(),o={...i,emulatorOptions:r._getEmulatorOptions()},B=`${e}:${t}`;s&&Du(`https://${B}`),i.host!==zd&&i.host!==B&&qt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:B,ssl:s,emulatorOptions:n};if(!Kn(u,o)&&(r._setSettings(u),n.mockUserToken)){let h,C;if(typeof n.mockUserToken=="string")h=n.mockUserToken,C=nt.MOCK_USER;else{h=TC(n.mockUserToken,(c=r._app)==null?void 0:c.options.projectId);const d=n.mockUserToken.sub||n.mockUserToken.user_id;if(!d)throw new J(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");C=new nt(d)}r._authCredentials=new lw(new Hd(h,C))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Jr(this.firestore,e,this._query)}}class Fe{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Hn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Fe(this.firestore,e,this._key)}toJSON(){return{type:Fe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(xi(t,Fe._jsonSchema))return new Fe(e,n||null,new Y(ge.fromString(t.referencePath)))}}Fe._jsonSchemaVersion="firestore/documentReference/1.0",Fe._jsonSchema={type:Ve("string",Fe._jsonSchemaVersion),referencePath:Ve("string")};class Hn extends Jr{constructor(e,t,n){super(e,t,ya(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Fe(this.firestore,null,new Y(e))}withConverter(e){return new Hn(this.firestore,e,this._path)}}function Sb(r,e,...t){if(r=be(r),QC("collection","path",e),r instanceof ba){const n=ge.fromString(e,...t);return Vh(n),new Hn(r,null,n)}{if(!(r instanceof Fe||r instanceof Hn))throw new J(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(ge.fromString(e,...t));return Vh(n),new Hn(r.firestore,null,n)}}function Nb(r,e,...t){if(r=be(r),arguments.length===1&&(e=Ru.newId()),QC("doc","path",e),r instanceof ba){const n=ge.fromString(e,...t);return kh(n),new Fe(r,null,new Y(n))}{if(!(r instanceof Fe||r instanceof Hn))throw new J(k.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(ge.fromString(e,...t));return kh(n),new Fe(r.firestore,r instanceof Hn?r.converter:null,new Y(n))}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e,t){this.pattern=e,this.options=t}isEqual(e){return this.pattern===e.pattern&&this.options===e.options}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:mt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(xi(e,mt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new mt(e.vectorValues);throw new J(k.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}mt._jsonSchemaVersion="firestore/vectorValue/1.0",mt._jsonSchema={type:Ve("string",mt._jsonSchemaVersion),vectorValues:Ve("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kw=/^__.*__$/;class Vw{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new or(e,this.data,this.fieldMask,t,this.fieldTransforms):new Vi(e,this.data,t,this.fieldTransforms)}}class Wd{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new or(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function $d(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee(40011,{dataSource:r})}}class Ku{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new Ku({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return ta(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if($d(this.dataSource)&&kw.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class Mw{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Aa(e)}createContext(e,t,n,s=!1){return new Ku({dataSource:e,methodName:t,targetDoc:n,path:bt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function zu(r){const e=r._freezeSettings(),t=Aa(r._databaseId);return new Mw(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Qd(r,e,t,n,s,i={}){const o=r.createContext(i.merge||i.mergeFields?2:0,e,t,s);Wu("Data must be an object, but it was:",o,n);const B=Yd(n,o);let u,c;if(i.merge)u=new At(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const h=[];for(const C of i.mergeFields){const d=Nr(e,C,t);if(!o.contains(d))throw new J(k.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);tp(h,d)||h.push(d)}u=new At(h),c=o.fieldTransforms.filter((C=>u.covers(C.field)))}else u=null,c=o.fieldTransforms;return new Vw(new ct(B),u,c)}class Pa extends ju{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Pa}}function Gw(r,e,t,n){const s=r.createContext(1,e,t);Wu("Data must be an object, but it was:",s,n);const i=[],o=ct.empty();ir(n,((u,c)=>{const h=ep(e,u,t);c=be(c);const C=s.childContextForFieldPath(h);if(c instanceof Pa)i.push(h);else{const d=Yn(c,C);d!=null&&(i.push(h),o.set(h,d))}}));const B=new At(i);return new Wd(o,B,s.fieldTransforms)}function Uw(r,e,t,n,s,i){const o=r.createContext(1,e,t),B=[Nr(e,n,t)],u=[s];if(i.length%2!=0)throw new J(k.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)B.push(Nr(e,i[d])),u.push(i[d+1]);const c=[],h=ct.empty();for(let d=B.length-1;d>=0;--d)if(!tp(c,B[d])){const E=B[d];let D=u[d];D=be(D);const b=o.childContextForFieldPath(E);if(D instanceof Pa)c.push(E);else{const F=Yn(D,b);F!=null&&(c.push(E),h.set(E,F))}}const C=new At(c);return new Wd(h,C,o.fieldTransforms)}function Hw(r,e,t,n=!1){return Yn(t,r.createContext(n?4:3,e))}function Yn(r,e,t){if(Zd(r=be(r)))return Wu("Unsupported field value:",e,r),Yd(r,e);if(r instanceof ju)return(function(s,i){if(!$d(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(s,i){const o=[];let B=0;for(const u of s){let c=Yn(u,i.childContextForArray(B));c==null&&(c={nullValue:"NULL_VALUE"}),o.push(c),B++}return{arrayValue:{values:o}}})(r,e)}return(function(s,i,o){if((s=be(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Fu(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const B=De.fromDate(s);return{timestampValue:oi(i.serializer,B)}}if(s instanceof De){const B=new De(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:oi(i.serializer,B)}}if(Xd(s)){const B=De.fromInstant(s),u=new De(B.seconds,1e3*Math.floor(B.nanoseconds/1e3));return{timestampValue:oi(i.serializer,u)}}if(s instanceof rn)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Tt)return s.subtype===0?{bytesValue:ou(i.serializer,s._byteString)}:(function(u,c){const h=c.toUint8Array(),C=new Uint8Array(h.length+1);return C[0]=c.subtype,C.set(h,1),{mapValue:{fields:{[_a]:{bytesValue:ou(u,Oe.fromUint8Array(C))}}}}})(i.serializer,s);if(s instanceof Fe){const B=i.databaseId,u=s.firestore._databaseId;if(!u.isEqual(B))throw i.createError(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${B.projectId}/${B.database}`);return{referenceValue:Mu(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof mt)return(function(u,c){const h=u instanceof mt?u.toArray():u;return{mapValue:{fields:{[Pu]:{stringValue:Ou},[pi]:{arrayValue:{values:h.map((d=>{if(typeof d!="number")throw c.createError("VectorValues must only contain numeric values.");return Nu(c.serializer,d)}))}}}}}})(s,i);if(s instanceof qu)return(function(u){return{mapValue:{fields:{[Vn]:{mapValue:{fields:{[Jo]:{stringValue:u.pattern},[qo]:{stringValue:u.options}}}}}}}})(s);if(s instanceof Gu)return(function(u){return{mapValue:{fields:{[gi]:{stringValue:u.value}}}}})(s);if(s instanceof Ju)return(function(u){return{mapValue:{fields:{[Hr]:os(u.value)}}}})(s);if(s instanceof Hu)return(function(u){return{mapValue:{fields:{[Wn]:{stringValue:u.stringValue}}}}})(s);if(s instanceof Uu)return(function(u){return{mapValue:{fields:{[Er]:{mapValue:{fields:{[Ko]:os(u.seconds),[zo]:os(u.increment)}}}}}}})(s);if(s instanceof ln)return(function(){return{mapValue:{fields:{[nd]:{nullValue:"NULL_VALUE"}}}}})();if(s instanceof cn)return(function(){return{mapValue:{fields:{[Su]:{nullValue:"NULL_VALUE"}}}}})();if(Gd(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${ma(s)}`)})(r,e)}function Yd(r,e){const t={};return $C(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ir(r,((n,s)=>{const i=Yn(s,e.childContextForField(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function Xd(r){if(typeof r!="object"||r===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&r instanceof Temporal.Instant)return!0;const e=r;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.t=="bigint"}function Zd(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof De||r instanceof rn||r instanceof Tt||r instanceof Fe||r instanceof ju||r instanceof mt||r instanceof ln||r instanceof cn||r instanceof Ju||r instanceof Hu||r instanceof qu||r instanceof Gu||r instanceof Uu||Xd(r)||Gd(r))}function Wu(r,e,t){if(!Zd(t)||!Li(t)){const n=ma(t);throw n==="an object"?e.createError(r+" a custom object"):e.createError(r+" "+n)}}function Nr(r,e,t){if((e=be(e))instanceof Ra)return e._internalPath;if(typeof e=="string")return ep(r,e);throw ta("Field path arguments must be of type string or ",r,!1,void 0,t)}const jw=new RegExp("[~\\*/\\[\\]]");function ep(r,e,t){if(e.search(jw)>=0)throw ta(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Ra(...e.split("."))._internalPath}catch{throw ta(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function ta(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let B=`Function ${e}() called with invalid data`;t&&(B+=" (via `toFirestore()`)"),B+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${n}`),o&&(u+=` in document ${s}`),u+=")"),new J(k.INVALID_ARGUMENT,B+r+u)}function tp(r,e){return r.some((t=>t.isEqual(e)))}function np(r){return typeof r._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const n=ct.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const o=e[s];let B;i.nestedOptions&&Li(o)?B={mapValue:{fields:new it(i.nestedOptions).getOptionsProto(t,o)}}:o&&(B=Yn(o,t)??void 0),B&&n.set(bt.fromServerFormat(i.serverName),B)}}return n}getOptionsProto(e,t,n){const s=this._getKnownOptions(t,e);if(n){const i=new Map(nD(n,((o,B)=>[bt.fromServerFormat(B),o!==void 0?Yn(o,e):null])));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jw(r){return typeof r=="object"&&r!==null&&!!("nullValue"in r&&(r.nullValue===null||r.nullValue==="NULL_VALUE")||"booleanValue"in r&&(r.booleanValue===null||typeof r.booleanValue=="boolean")||"integerValue"in r&&(r.integerValue===null||typeof r.integerValue=="number"||typeof r.integerValue=="string")||"doubleValue"in r&&(r.doubleValue===null||typeof r.doubleValue=="number")||"timestampValue"in r&&(r.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(r.timestampValue))||"stringValue"in r&&(r.stringValue===null||typeof r.stringValue=="string")||"bytesValue"in r&&(r.bytesValue===null||r.bytesValue instanceof Uint8Array)||"referenceValue"in r&&(r.referenceValue===null||typeof r.referenceValue=="string")||"geoPointValue"in r&&(r.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(r.geoPointValue))||"arrayValue"in r&&(r.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(r.arrayValue))||"mapValue"in r&&(r.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!Li(t.fields))})(r.mapValue))||"fieldReferenceValue"in r&&(r.fieldReferenceValue===null||typeof r.fieldReferenceValue=="string")||"functionValue"in r&&(r.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(r.functionValue))||"pipelineValue"in r&&(r.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(r.pipelineValue)))}function qw(r){return new mt(r)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(r){let e;return r instanceof qr?r:(e=Li(r)?Qw(r):r instanceof Array?Yw(r):rp(r,void 0),e)}function PB(r){if(r instanceof qr)return r;if(r instanceof mt)return Ai(r);if(Array.isArray(r))return Ai(qw(r));throw new Error("Unsupported value: "+typeof r)}function $u(r){return BD(r)?No(r):H(r)}class qr{constructor(){this._protoValueType="ProtoValue"}add(e){return new L("add",[this,H(e)],"add")}asBoolean(){if(this instanceof Xn)return this;if(this instanceof ws)return new ip(this);if(this instanceof Ds)return new $w(this);if(this instanceof L)return new sp(this);throw new J("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new L("subtract",[this,H(e)],"subtract")}multiply(e){return new L("multiply",[this,H(e)],"multiply")}divide(e){return new L("divide",[this,H(e)],"divide")}mod(e){return new L("mod",[this,H(e)],"mod")}equal(e){return new L("equal",[this,H(e)],"equal").asBoolean()}notEqual(e){return new L("not_equal",[this,H(e)],"notEqual").asBoolean()}lessThan(e){return new L("less_than",[this,H(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new L("less_than_or_equal",[this,H(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new L("greater_than",[this,H(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new L("greater_than_or_equal",[this,H(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const n=[e,...t].map((s=>H(s)));return new L("array_concat",[this,...n],"arrayConcat")}arrayContains(e){return new L("array_contains",[this,H(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Zs(e.map(H),"arrayContainsAll"):e;return new L("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Zs(e.map(H),"arrayContainsAny"):e;return new L("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new L("array_reverse",[this])}arrayLength(){return new L("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Zs(e.map(H),"equalAny"):e;return new L("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Zs(e.map(H),"notEqualAny"):e;return new L("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new L("exists",[this],"exists").asBoolean()}charLength(){return new L("char_length",[this],"charLength")}like(e){return new L("like",[this,H(e)],"like").asBoolean()}regexContains(e){return new L("regex_contains",[this,H(e)],"regexContains").asBoolean()}regexFind(e){return new L("regex_find",[this,H(e)],"regexFind")}regexFindAll(e){return new L("regex_find_all",[this,H(e)],"regexFindAll")}regexMatch(e){return new L("regex_match",[this,H(e)],"regexMatch").asBoolean()}stringContains(e){return new L("string_contains",[this,H(e)],"stringContains").asBoolean()}startsWith(e){return new L("starts_with",[this,H(e)],"startsWith").asBoolean()}endsWith(e){return new L("ends_with",[this,H(e)],"endsWith").asBoolean()}toLower(){return new L("to_lower",[this],"toLower")}toUpper(){return new L("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(H(e)),new L("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(H(e)),new L("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(H(e)),new L("rtrim",t,"rtrim")}type(){return new L("type",[this])}isType(e){return new L("is_type",[this,Ai(e)],"isType").asBoolean()}stringConcat(e,...t){const n=[e,...t].map(H);return new L("string_concat",[this,...n],"stringConcat")}stringIndexOf(e){return new L("string_index_of",[this,H(e)],"stringIndexOf")}stringRepeat(e){return new L("string_repeat",[this,H(e)],"stringRepeat")}stringReplaceAll(e,t){return new L("string_replace_all",[this,H(e),H(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new L("string_replace_one",[this,H(e),H(t)],"stringReplaceOne")}concat(e,...t){const n=[e,...t].map(H);return new L("concat",[this,...n],"concat")}reverse(){return new L("reverse",[this],"reverse")}arrayFilter(e,t){return new L("array_filter",[this,H(e),t],"arrayFilter")}arrayTransform(e,t){return new L("array_transform",[this,H(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,n){return new L("array_transform",[this,H(e),H(t),n],"arrayTransformWithIndex")}arraySlice(e,t){const n=[this,H(e)];return t!==void 0&&n.push(H(t)),new L("array_slice",n,"arraySlice")}arrayFirst(){return new L("array_first",[this],"arrayFirst")}arrayFirstN(e){return new L("array_first_n",[this,H(e)],"arrayFirstN")}arrayLast(){return new L("array_last",[this],"arrayLast")}arrayLastN(e){return new L("array_last_n",[this,H(e)],"arrayLastN")}arrayMaximum(){return new L("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new L("maximum_n",[this,H(e)],"arrayMaximumN")}arrayMinimum(){return new L("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new L("minimum_n",[this,H(e)],"arrayMinimumN")}arrayIndexOf(e){return new L("array_index_of",[this,H(e),H("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new L("array_index_of",[this,H(e),H("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new L("array_index_of_all",[this,H(e)],"arrayIndexOfAll")}byteLength(){return new L("byte_length",[this],"byteLength")}ceil(){return new L("ceil",[this])}floor(){return new L("floor",[this])}abs(){return new L("abs",[this])}exp(){return new L("exp",[this])}mapGet(e){return new L("map_get",[this,Ai(e)],"mapGet")}mapSet(e,t,...n){const s=[this,H(e),H(t),...n.map(H)];return new L("map_set",s,"mapSet")}mapKeys(){return new L("map_keys",[this],"mapKeys")}mapValues(){return new L("map_values",[this],"mapValues")}mapEntries(){return new L("map_entries",[this],"mapEntries")}getField(e){return new L("get_field",[this,H(e)],"get_field")}count(){return It._create("count",[this],"count")}sum(){return It._create("sum",[this],"sum")}average(){return It._create("average",[this],"average")}minimum(){return It._create("minimum",[this],"minimum")}maximum(){return It._create("maximum",[this],"maximum")}first(){return It._create("first",[this],"first")}last(){return It._create("last",[this],"last")}arrayAgg(){return It._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return It._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return It._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const n=[e,...t];return new L("maximum",[this,...n.map(H)],"logicalMaximum")}logicalMinimum(e,...t){const n=[e,...t];return new L("minimum",[this,...n.map(H)],"minimum")}vectorLength(){return new L("vector_length",[this],"vectorLength")}cosineDistance(e){return new L("cosine_distance",[this,PB(e)],"cosineDistance")}dotProduct(e){return new L("dot_product",[this,PB(e)],"dotProduct")}euclideanDistance(e){return new L("euclidean_distance",[this,PB(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new L("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new L("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new L("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new L("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new L("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new L("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new L("timestamp_add",[this,H(e),H(t)],"timestampAdd")}timestampSubtract(e,t){return new L("timestamp_subtract",[this,H(e),H(t)],"timestampSubtract")}timestampDiff(e,t){return new L("timestamp_diff",[this,$u(e),H(t)],"timestampDiff")}timestampExtract(e,t){const n=[this,H(e)];return t&&n.push(H(t)),new L("timestamp_extract",n,"timestampExtract")}documentId(){return new L("document_id",[this],"documentId")}parent(){return new L("parent",[this],"parent")}substring(e,t){const n=H(e);return new L("substring",t===void 0?[this,n]:[this,n,H(t)],"substring")}arrayGet(e){return new L("array_get",[this,H(e)],"arrayGet")}isError(){return new L("is_error",[this],"isError").asBoolean()}ifError(e){const t=new L("if_error",[this,H(e)],"ifError");return e instanceof Xn?t.asBoolean():t}isAbsent(){return new L("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new L("map_remove",[this,H(e)],"mapRemove")}mapMerge(e,...t){const n=H(e),s=t.map(H);return new L("map_merge",[this,n,...s],"mapMerge")}pow(e){return new L("pow",[this,H(e)])}trunc(e){return e===void 0?new L("trunc",[this]):new L("trunc",[this,H(e)],"trunc")}round(e){return e===void 0?new L("round",[this]):new L("round",[this,H(e)],"round")}collectionId(){return new L("collection_id",[this])}length(){return new L("length",[this])}ln(){return new L("ln",[this])}sqrt(){return new L("sqrt",[this])}stringReverse(){return new L("string_reverse",[this])}ifAbsent(e){return new L("if_absent",[this,H(e)],"ifAbsent")}ifNull(e){return new L("if_null",[this,H(e)],"ifNull")}coalesce(e,...t){return new L("coalesce",[this,H(e),...t.map(H)],"coalesce")}join(e){return new L("join",[this,H(e)],"join")}log10(){return new L("log10",[this])}arraySum(){return new L("sum",[this])}split(e){return new L("split",[this,H(e)])}timestampTruncate(e,t){const n=[this,H(e)];return t&&n.push(H(t)),new L("timestamp_trunc",n)}ascending(){return Xw(this)}descending(){return Zw(this)}as(e){return new zw(this,e,"as")}}class It{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,n){const s=new It(e,t);return s._methodName=n,s}as(e){return new Kw(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}}class Kw{constructor(e,t,n){this.aggregate=e,this.alias=t,this._methodName=n}_readUserData(e){this.aggregate._readUserData(e)}}class zw{constructor(e,t,n){this.expr=e,this.alias=t,this._methodName=n,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Zs extends qr{constructor(e,t){super(),this.di=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.di.map((t=>t._toProto(e)))}}}_readUserData(e){this.di.forEach((t=>t._readUserData(e)))}}class Ds extends qr{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new L("geo_distance",[this,H(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function No(r){return Ww(r,"field")}function Ww(r,e){return new Ds(typeof r=="string"?Yt===r?uw()._internalPath:Nr("field",r):r._internalPath,e)}class ws extends qr{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new ws(e,void 0);return t._protoValue=e,t}_toProto(e){return Q(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,Jw(this._protoValue)||(this._protoValue=Yn(this.value,e))}}function Ai(r,e){return rp(r,"constant")}function rp(r,e){const t=new ws(r,e);return typeof r=="boolean"?new ip(t):t}class L extends qr{constructor(e,t,n,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,n!==void 0&&(this._methodName=n),s!==void 0&&(this._options=s)}get _optionsUtil(){return new it({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map((n=>n._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class Xn extends qr{get _methodName(){return this._expr._methodName}countIf(){return It._create("count_if",[this],"countIf")}not(){return new L("not",[this],"not").asBoolean()}conditional(e,t){return new L("conditional",[this,e,t],"conditional")}ifError(e){const t=H(e),n=new L("if_error",[this,t],"ifError");return t instanceof Xn?n.asBoolean():n}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class sp extends Xn{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class ip extends Xn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class $w extends Xn{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function Qw(r,e){const t=[];for(const n in r)if(Object.prototype.hasOwnProperty.call(r,n)){const s=r[n];t.push(Ai(n)),t.push(H(s))}return new L("map",t,"map")}function Yw(r){return(function(t,n){return new L("array",t.map((s=>H(s))),n)})(r,"array")}function Xw(r){return new op($u(r),"ascending","ascending")}function Zw(r){return new op($u(r),"descending","descending")}class op{constructor(e,t,n){this.expr=e,this.direction=t,this._methodName=n,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:Ud(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}class St{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class ap extends St{get _name(){return"add_fields"}get _optionsUtil(){return new it({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[Ti(e,this.fields)]}}_readUserData(e){super._readUserData(e),Zn(this.fields,e)}}class Bp extends St{get _name(){return"aggregate"}get _optionsUtil(){return new it({})}constructor(e,t,n){super(n),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[Ti(e,this.accumulators),Ti(e,this.groups)]}}_readUserData(e){super._readUserData(e),Zn(this.groups,e),Zn(this.accumulators,e)}}class up extends St{get _name(){return"distinct"}get _optionsUtil(){return new it({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[Ti(e,this.groups)]}}_readUserData(e){super._readUserData(e),Zn(this.groups,e)}}class Oa extends St{get _name(){return"collection"}get _optionsUtil(){return new it({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.pi=tI(e)}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.pi}]}}_readUserData(e){super._readUserData(e)}}class Sa extends St{get _name(){return"collection_group"}get _optionsUtil(){return new it({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class Qu extends St{get _name(){return"database"}get _optionsUtil(){return new it({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class Yu extends St{get _name(){return"documents"}get _optionsUtil(){return new it({})}constructor(e,t){if(super(t),!e||e.length===0)throw new J(k.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const n=e.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(n);if(s.size!==n.length)throw new J(k.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.gi=n,this.yi=s}_toProto(e){return{...super._toProto(e),args:this.gi.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}}class Na extends St{get _name(){return"where"}get _optionsUtil(){return new it({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),Zn(this.condition,e)}}class Fr extends St{get _name(){return"limit"}get _optionsUtil(){return new it({})}constructor(e,t){Q(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[Fu(e,this.limit)]}}}class mf extends St{get _name(){return"offset"}get _optionsUtil(){return new it({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[Fu(e,this.offset)]}}}class eI extends St{get _name(){return"select"}get _optionsUtil(){return new it({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[Ti(e,this.selections)]}}_readUserData(e){super._readUserData(e),Zn(this.selections,e)}}class hn extends St{get _name(){return"sort"}get _optionsUtil(){return new it({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),Zn(this.orderings,e)}}class Xu extends St{get _name(){return"replace_with"}get _optionsUtil(){return new it({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),Ud(Xu.bi)]}}_readUserData(e){super._readUserData(e),Zn(this.map,e)}}Xu.bi="full_replace";function tI(r){const e=typeof r=="string"?r:r.path;return e.startsWith("/")?e:"/"+e}function Zn(r,e){return np(r)?r._readUserData(e):Array.isArray(r)?r.forEach((t=>t._readUserData(e))):r instanceof Map?r.forEach((t=>t._readUserData(e))):Object.values(r).forEach((t=>t._readUserData(e))),r}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e,t,n,s){this._db=e,this.userDataReader=t,this._userDataWriter=n,this.stages=s}Ci(e,t){const n=this.userDataReader.createContext(3,e);return np(t)?t._readUserData(n):Array.isArray(t)?t.forEach((s=>s._readUserData(n))):t.forEach((s=>s._readUserData(n))),t}where(e){const t=this.stages.map((n=>n));return this.Ci("where",e),t.push(new Na(e,{})),new ai(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map((n=>n));return t.push(new Fr(e,{})),new ai(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const n=this.stages.map((s=>s));return"orderings"in e?n.push(new hn(this.Ci("sort",e.orderings),{})):n.push(new hn(this.Ci("sort",[e,...t]),{})),new ai(this._db,this.userDataReader,this._userDataWriter,n)}Fi(e){return{pipeline:{stages:this.stages.map((t=>t._toProto(e)))}}}}// Copyright 2024 Google LLC* @license
class ut{constructor(e,t,n){this.serializer=e,this.stages=t,this.listenOptions=n,this.isCorePipeline=!0}getPipelineCollection(){return Fa(this)}getPipelineCollectionGroup(){return Zu(this)}getPipelineCollectionId(){return nI(this)}getPipelineDocuments(){return cu(this)}getPipelineFlavor(){return(function(t){let n="exact";return t.stages.forEach(((s,i)=>{s._name!==up.name&&s._name!==Bp.name||(n="keyless"),s._name===eI.name&&n==="exact"&&(n="augmented"),s._name===ap.name&&i<t.stages.length-1&&n==="exact"&&(n="augmented")})),n})(this)}getPipelineSourceType(){return jn(this)}}function jn(r){const e=r.stages[0];return e instanceof Oa||e instanceof Sa||e instanceof Qu||e instanceof Yu?e._name:"unknown"}function Fa(r){if(jn(r)==="collection")return r.stages[0].pi}function Zu(r){if(jn(r)==="collection_group")return r.stages[0].collectionId}function nI(r){switch(jn(r)){case"collection":return ge.fromString(Fa(r)).lastSegment();case"collection_group":return Zu(r);default:return}}function cu(r){if(jn(r)==="documents")return r.stages[0].gi}class T{constructor(e,t){this.type=e,this.value=t}static Oi(){return new T("ERROR",void 0)}static Mi(){return new T("UNSET",void 0)}static Ni(){return new T("NULL",fs)}static newValue(e){return Rt(e)?new T("NULL",fs):(function(n){return!!n&&"booleanValue"in n})(e)?new T("BOOLEAN",e):Xt(e)?new T("INT",e):Zt(e)?new T("DOUBLE",e):(function(n){return!!n&&"timestampValue"in n&&!!n.timestampValue})(e)?new T("TIMESTAMP",e):(function(n){return!!n&&"stringValue"in n})(e)?new T("STRING",e):(function(n){return!!n&&"bytesValue"in n})(e)?new T("BYTES",e):e.referenceValue?new T("REFERENCE",e):e.geoPointValue?new T("GEO_POINT",e):ds(e)?new T("ARRAY",e):eu(e)?new T("VECTOR",e):Ir(e)?new T("MAP",e):new T("ERROR",void 0)}Bi(){return this.type==="ERROR"||this.type==="UNSET"}Li(){return this.type==="NULL"}}function Bi(r){if(!r.Bi())return r.value}function cp(r){return r instanceof Xn?r._expr:r}function ne(r){if((r=cp(r))instanceof Ds)return new rI(r);if(r instanceof ws)return new sI(r);if(r instanceof Zs)return new iI(r);if(r instanceof L){if(r.name==="add")return new BI(r);if(r.name==="subtract")return new uI(r);if(r.name==="multiply")return new cI(r);if(r.name==="divide")return new lI(r);if(r.name==="mod")return new hI(r);if(r.name==="and")return new fI(r);if(r.name==="equal")return new TI(r);if(r.name==="not_equal")return new AI(r);if(r.name==="less_than")return new RI(r);if(r.name==="less_than_or_equal")return new vI(r);if(r.name==="greater_than")return new bI(r);if(r.name==="greater_than_or_equal")return new PI(r);if(r.name==="array_concat")return new OI(r);if(r.name==="array_reverse")return new SI(r);if(r.name==="array_contains")return new NI(r);if(r.name==="array_contains_all")return new FI(r);if(r.name==="array_contains_any")return new LI(r);if(r.name==="array_length")return new xI(r);if(r.name==="array_element")return new kI(r);if(r.name==="equal_any")return new lp(r);if(r.name==="not_equal_any")return new dI(r);if(r.name==="is_nan")return new pI(r);if(r.name==="is_not_nan")return new gI(r);if(r.name==="is_null")return new mI(r);if(r.name==="is_not_null")return new EI(r);if(r.name==="is_error")return new _I(r);if(r.name==="exists")return new DI(r);if(r.name==="not")return new La(r);if(r.name==="or")return new CI(r);if(r.name==="xor")return new ec(r);if(r.name==="conditional")return new wI(r);if(r.name==="maximum")return new II(r);if(r.name==="minimum")return new yI(r);if(r.name==="reverse")return new VI(r);if(r.name==="replace_first")return new MI(r);if(r.name==="replace_all")return new GI(r);if(r.name==="char_length")return new UI(r);if(r.name==="byte_length")return new HI(r);if(r.name==="like")return new jI(r);if(r.name==="regex_contains")return new JI(r);if(r.name==="regex_match")return new qI(r);if(r.name==="string_contains")return new KI(r);if(r.name==="starts_with")return new zI(r);if(r.name==="ends_with")return new WI(r);if(r.name==="to_lower")return new $I(r);if(r.name==="to_upper")return new QI(r);if(r.name==="trim")return new YI(r);if(r.name==="string_concat")return new XI(r);if(r.name==="map_get")return new ZI(r);if(r.name==="cosine_distance")return new ey(r);if(r.name==="dot_product")return new ty(r);if(r.name==="euclidean_distance")return new ny(r);if(r.name==="vector_length")return new ry(r);if(r.name==="unix_micros_to_timestamp")return new By(r);if(r.name==="timestamp_to_unix_micros")return new ly(r);if(r.name==="unix_millis_to_timestamp")return new uy(r);if(r.name==="timestamp_to_unix_millis")return new hy(r);if(r.name==="unix_seconds_to_timestamp")return new cy(r);if(r.name==="timestamp_to_unix_seconds")return new fy(r);if(r.name==="timestamp_add")return new Cy(r);if(r.name==="timestamp_subtract")return new dy(r)}throw new Error(`Unknown Expr : ${r}`)}class rI{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Yt)return T.newValue({referenceValue:ea(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return T.newValue({timestampValue:So(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return T.newValue({timestampValue:So(e.serializer,t.createTime)});const n=t.data.field(this.expr._fieldPath);return n?vu(n)?T.newValue((function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:So(i.serializer,ie.fromTimestamp(hs(o)))};if(i.serverTimestampBehavior==="previous"){const B=ki(o);if(B)return B}return{nullValue:"NULL_VALUE"}})(e,n)):T.newValue(n):T.Mi()}}class sI{constructor(e){this.expr=e}evaluate(e,t){return T.newValue(this.expr._getValue())}}class iI{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.di.map((s=>ne(s).evaluate(e,t)));return n.some((s=>s.Bi()))?T.Oi():T.newValue({arrayValue:{values:n.map((s=>s.value))}})}}function Ze(r){return Zt(r)?Number(r.doubleValue):Number(r.integerValue)}function an(r){return BigInt(r.integerValue)}const oI=BigInt("0x7fffffffffffffff"),aI=-BigInt("0x8000000000000000");class Hi{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length>=2,24778);const n=ne(this.expr.params[0]).evaluate(e,t),s=ne(this.expr.params[1]).evaluate(e,t);let i=this.$i(n,s);for(const o of this.expr.params.slice(2)){const B=ne(o).evaluate(e,t);i=this.$i(i,B)}return i}$i(e,t){if(e.Bi()||t.Bi())return T.Oi();if(e.Li()||t.Li())return T.Ni();const n=e.value,s=t.value;if(!Zt(n)&&!Xt(n)||!Zt(s)&&!Xt(s))return T.Oi();if(Zt(n)||Zt(s)){const i=this.Ui(n,s);return i?T.newValue(i):T.Oi()}if(Xt(n)&&Xt(s)){const i=this.ki(n,s);return i===void 0?T.Oi():typeof i=="number"?T.newValue({doubleValue:i}):i<aI||i>oI?T.Oi():T.newValue({integerValue:`${i}`})}return T.Oi()}}function Dn(r,e){return je(r)!==je(e)?"TYPE_MISMATCH":Qe(r)||Qe(e)?"NOT_EQ":Rt(r)&&Rt(e)?"EQ":Rt(r)||Rt(e)?"NULL":ds(r)&&ds(e)?(function(n,s){var o,B,u;if(((o=n.values)==null?void 0:o.length)!==((B=s.values)==null?void 0:B.length))return"NOT_EQ";let i=!1;for(let c=0;c<(((u=n.values)==null?void 0:u.length)??0);c++){const h=n.values[c],C=s.values[c];switch(Dn(h,C)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:ee(44609,{Qi:h,qi:C})}}return i?"NULL":"EQ"})(r.arrayValue,e.arrayValue):eu(r)&&eu(e)||Ir(r)&&Ir(e)?(function(n,s){const i=n.fields||{},o=s.fields||{};if(Or(i)!==Or(o))return"NOT_EQ";let B=!1;for(const u in i)if(i.hasOwnProperty(u)){if(o[u]===void 0)return"NOT_EQ";switch(Dn(i[u],o[u])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":B=!0}}return B?"NULL":"EQ"})(r.mapValue,e.mapValue):(function(n,s){return Vt(n,s,{be:!1,ye:!0,we:!0})})(r,e)?"EQ":"NOT_EQ"}class BI extends Hi{ki(e,t){return an(e)+an(t)}Ui(e,t){return{doubleValue:Ze(e)+Ze(t)}}}class uI extends Hi{constructor(e){super(e),this.expr=e}ki(e,t){return an(e)-an(t)}Ui(e,t){return{doubleValue:Ze(e)-Ze(t)}}}class cI extends Hi{constructor(e){super(e),this.expr=e}ki(e,t){return an(e)*an(t)}Ui(e,t){return{doubleValue:Ze(e)*Ze(t)}}}class lI extends Hi{constructor(e){super(e),this.expr=e}ki(e,t){const n=an(t);if(n!==BigInt(0))return an(e)/n}Ui(e,t){const n=Ze(t);return n===0?{doubleValue:di(n)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Ze(e)/n}}}class hI extends Hi{constructor(e){super(e),this.expr=e}ki(e,t){const n=an(t);if(n!==BigInt(0))return an(e)%n}Ui(e,t){const n=Ze(t);if(n!==0)return{doubleValue:Ze(e)%n}}}class fI{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const o of this.expr.params){const B=ne(o).evaluate(e,t);switch(B.type){case"BOOLEAN":if(!((i=B.value)!=null&&i.booleanValue))return T.newValue($e);break;case"NULL":s=!0;break;default:n=!0}}return n?T.Oi():s?T.Ni():T.newValue(Et)}}class La{constructor(e){this.expr=e}evaluate(e,t){var s;Q(this.expr.params.length===1,9634);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return T.newValue({booleanValue:!((s=n.value)!=null&&s.booleanValue)});case"NULL":return T.Ni();default:return T.Oi()}}}class CI{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const o of this.expr.params){const B=ne(o).evaluate(e,t);switch(B.type){case"BOOLEAN":if((i=B.value)!=null&&i.booleanValue)return T.newValue(Et);break;case"NULL":s=!0;break;default:n=!0}}return n?T.Oi():s?T.Ni():T.newValue($e)}}class ec{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const o of this.expr.params){const B=ne(o).evaluate(e,t);switch(B.type){case"BOOLEAN":n=ec.xor(n,!!((i=B.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return T.Oi()}}return s?T.Ni():T.newValue({booleanValue:n})}static xor(e,t){return(e||t)&&!(e&&t)}}class lp{constructor(e){this.expr=e}evaluate(e,t){var o,B;Q(this.expr.params.length===2,55094);let n=!1;const s=ne(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":n=!0;break;case"ERROR":case"UNSET":return T.Oi()}const i=ne(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return T.Oi()}if(n)return T.Ni();for(const u of((B=(o=i.value)==null?void 0:o.arrayValue)==null?void 0:B.values)??[])switch(Rt(s.value)&&Rt(u)?"EQ":Dn(s.value,u)){case"EQ":return T.newValue(Et);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:ee(44608,{value:s.value,candidate:u})}return n?T.Ni():T.newValue($e)}}class dI{constructor(e){this.expr=e}evaluate(e,t){return new La(new L("not",[new L("equal_any",this.expr.params)])).evaluate(e,t)}}class pI{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,23322);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return T.newValue($e);case"DOUBLE":return T.newValue({booleanValue:isNaN(Ze(n.value))});case"NULL":return T.Ni();default:return T.Oi()}}}class gI{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===1,50406),new La(new L("not",[new L("is_nan",this.expr.params)])).evaluate(e,t)}}class mI{constructor(e){this.expr=e}evaluate(e,t){switch(Q(this.expr.params.length===1,23123),ne(this.expr.params[0]).evaluate(e,t).type){case"NULL":return T.newValue(Et);case"UNSET":case"ERROR":return T.Oi();default:return T.newValue($e)}}}class EI{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===1,23167),new La(new L("not",[new L("is_null",this.expr.params)])).evaluate(e,t)}}class _I{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===1,5228),ne(this.expr.params[0]).evaluate(e,t).type==="ERROR"?T.newValue(Et):T.newValue($e)}}class DI{constructor(e){this.expr=e}evaluate(e,t){switch(Q(this.expr.params.length===1,6877),ne(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return T.Oi();case"UNSET":return T.newValue($e);default:return T.newValue(Et)}}}class wI{constructor(e){this.expr=e}evaluate(e,t){var s;Q(this.expr.params.length===3,11706);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return(s=n.value)!=null&&s.booleanValue?ne(this.expr.params[1]).evaluate(e,t):ne(this.expr.params[2]).evaluate(e,t);case"NULL":return ne(this.expr.params[2]).evaluate(e,t);default:return T.Oi()}}}class II{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map((i=>ne(i).evaluate(e,t)));let s;for(const i of n)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||_t(i.value,s.value)>0?i:s}return s===void 0?T.Ni():s}}class yI{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map((i=>ne(i).evaluate(e,t)));let s;for(const i of n)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||_t(i.value,s.value)<0?i:s}return s===void 0?T.Ni():s}}class Is{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"ERROR":case"UNSET":return T.Oi()}const s=ne(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return T.Oi()}return this.Ki(n,s)}}class TI extends Is{constructor(e){super(e),this.expr=e}Ki(e,t){if(e.Li()&&t.Li())return T.newValue(Et);if(e.Li()||t.Li()||Qe(e.value)||Qe(t.value)||je(e.value)!==je(t.value))return T.newValue($e);switch(Dn(e.value,t.value)){case"EQ":return T.newValue(Et);case"NOT_EQ":return T.newValue($e);case"NULL":return T.Ni();default:ee(44615,{left:e,right:t})}}}class AI extends Is{constructor(e){super(e),this.expr=e}Ki(e,t){switch(Dn(e.value,t.value)){case"EQ":return T.newValue($e);case"NOT_EQ":case"TYPE_MISMATCH":return T.newValue(Et);case"NULL":return T.Ni();default:ee(44614,{left:e,right:t})}}}class RI extends Is{constructor(e){super(e),this.expr=e}Ki(e,t){return je(e.value)!==je(t.value)||Qe(e.value)||Qe(t.value)?T.newValue($e):T.newValue({booleanValue:_t(e.value,t.value)<0})}}class vI extends Is{constructor(e){super(e),this.expr=e}Ki(e,t){return je(e.value)!==je(t.value)||Qe(e.value)||Qe(t.value)?T.newValue($e):Dn(e.value,t.value)==="EQ"?T.newValue(Et):T.newValue({booleanValue:_t(e.value,t.value)<0})}}class bI extends Is{constructor(e){super(e),this.expr=e}Ki(e,t){return je(e.value)!==je(t.value)||Qe(e.value)||Qe(t.value)?T.newValue($e):T.newValue({booleanValue:_t(e.value,t.value)>0})}}class PI extends Is{constructor(e){super(e),this.expr=e}Ki(e,t){return je(e.value)!==je(t.value)||Qe(e.value)||Qe(t.value)?T.newValue($e):Dn(e.value,t.value)==="EQ"?T.newValue(Et):T.newValue({booleanValue:_t(e.value,t.value)>0})}}class OI{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class SI{constructor(e){this.expr=e}evaluate(e,t){var s;Q(this.expr.params.length===1,216);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return T.Ni();case"ARRAY":{const i=((s=n.value.arrayValue)==null?void 0:s.values)??[];return T.newValue({arrayValue:{values:[...i].reverse()}})}default:return T.Oi()}}}class NI{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===2,52884),new lp(new L("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class FI{constructor(e){this.expr=e}evaluate(e,t){var u,c,h,C;Q(this.expr.params.length===2,1392);let n=!1;const s=ne(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return T.Oi()}const i=ne(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return T.Oi()}if(n)return T.Ni();const o=((c=(u=i.value)==null?void 0:u.arrayValue)==null?void 0:c.values)??[],B=((C=(h=s.value)==null?void 0:h.arrayValue)==null?void 0:C.values)??[];for(const d of o){let E=!1;n=!1;for(const D of B){switch(Rt(d)&&Rt(D)?"EQ":Dn(d,D)){case"EQ":E=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:ee(44613,{value:D,search:d})}if(E)break}if(!E)return T.newValue($e)}return T.newValue(Et)}}class LI{constructor(e){this.expr=e}evaluate(e,t){var u,c,h,C;Q(this.expr.params.length===2,2680);let n=!1;const s=ne(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return T.Oi()}const i=ne(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return T.Oi()}if(n)return T.Ni();const o=((c=(u=i.value)==null?void 0:u.arrayValue)==null?void 0:c.values)??[],B=((C=(h=s.value)==null?void 0:h.arrayValue)==null?void 0:C.values)??[];for(const d of B)for(const E of o)switch(Rt(d)&&Rt(E)?"EQ":Dn(d,E)){case"EQ":return T.newValue(Et);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:ee(60403,{value:d,search:E})}return n?T.Ni():T.newValue($e)}}class xI{constructor(e){this.expr=e}evaluate(e,t){var s,i,o;Q(this.expr.params.length===1,38605);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return T.Ni();case"ARRAY":return T.newValue({integerValue:`${((o=(i=(s=n.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:o.length)??0}`});default:return T.Oi()}}}class kI{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class VI{constructor(e){this.expr=e}evaluate(e,t){var s,i;Q(this.expr.params.length===1,1508);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return T.Ni();case"BYTES":{const o=(s=n.value)==null?void 0:s.bytesValue;if(typeof o=="string"){const B=Oe.fromBase64String(o).toUint8Array();return B.reverse(),T.newValue({bytesValue:Oe.fromUint8Array(B).toBase64()})}return T.newValue({bytesValue:new Uint8Array(o).reverse()})}case"STRING":{const o=(i=n.value)==null?void 0:i.stringValue,B=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(o),u=Array.from(B,(c=>c.segment)).reverse();return T.newValue({stringValue:u.join("")})}default:return T.Oi()}}}class MI{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class GI{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class UI{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,19400);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return T.Ni();case"STRING":{const s=(function(o){let B=0;for(let u=0;u<o.length;u++){const c=o.codePointAt(u);if(c===void 0)return;if(c<=65535)if(c>=55296&&c<=57343)if(c<=56319){const h=o.codePointAt(u+1);h!==void 0&&h>=56320&&h<=57343?(B+=1,u++):B+=1}else B+=1;else B+=1;else{if(!(c<=1114111))return;B+=1,u++}}return B})(n.value.stringValue);return s===void 0?T.Oi():T.newValue({integerValue:s})}default:return T.Oi()}}}class HI{constructor(e){this.expr=e}evaluate(e,t){var s,i;Q(this.expr.params.length===1,8486);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BYTES":{const o=(s=n.value)==null?void 0:s.bytesValue;return typeof o=="string"?T.newValue({integerValue:Oe.fromBase64String(o).toUint8Array().length}):T.newValue({integerValue:new Uint8Array(o).length})}case"STRING":{const o=(function(u){let c=0;for(let h=0;h<u.length;h++){const C=u.codePointAt(h);if(C===void 0)return;if(C>=55296&&C<=57343){if(!(C<=56319))return;{const d=u.codePointAt(h+1);if(d===void 0||!(d>=56320&&d<=57343))return;c+=4,h++}}else if(C<=127)c+=1;else if(C<=2047)c+=2;else if(C<=65535)c+=3;else{if(!(C<=1114111))return;c+=4,h++}}return c})((i=n.value)==null?void 0:i.stringValue);return o===void 0?T.Oi():T.newValue({integerValue:o})}case"NULL":return T.Ni();default:return T.Oi()}}}class ys{constructor(e){this.expr=e}evaluate(e,t){var o,B;Q(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let n=!1;const s=ne(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":n=!0;break;default:return T.Oi()}const i=ne(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":n=!0;break;default:return T.Oi()}return n?T.Ni():this.Wi((o=s.value)==null?void 0:o.stringValue,(B=i.value)==null?void 0:B.stringValue)}}class jI extends ys{Wi(e,t){try{const n=(function(o){let B="";for(let u=0;u<o.length;u++){const c=o.charAt(u);switch(c){case"_":B+=".";break;case"%":B+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":B+="\\"+c;break;default:B+=c}}return"^"+B+"$"})(t),s=Tu.compile(n);return T.newValue({booleanValue:s.matches(e)})}catch(n){return qt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${n}`),T.Oi()}}}class JI extends ys{Wi(e,t){try{const n=Tu.compile(t);return T.newValue({booleanValue:n.test(e)})}catch{return qt(`Invalid regex pattern found in regex_contains: ${t}, returning error`),T.Oi()}}}class qI extends ys{Wi(e,t){try{return T.newValue({booleanValue:Tu.compile(t).matches(e)})}catch{return qt(`Invalid regex pattern found in regex_match: ${t}, returning error`),T.Oi()}}}class KI extends ys{Wi(e,t){return T.newValue({booleanValue:e.includes(t)})}}class zI extends ys{Wi(e,t){return T.newValue({booleanValue:e.startsWith(t)})}}class WI extends ys{Wi(e,t){return T.newValue({booleanValue:e.endsWith(t)})}}class $I{constructor(e){this.expr=e}evaluate(e,t){var s,i;Q(this.expr.params.length===1,29079);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return T.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return T.Ni();default:return T.Oi()}}}class QI{constructor(e){this.expr=e}evaluate(e,t){var s,i;Q(this.expr.params.length===1,60487);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return T.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return T.Ni();default:return T.Oi()}}}class YI{constructor(e){this.expr=e}evaluate(e,t){var s,i;Q(this.expr.params.length===1,28544);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return T.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return T.Ni();default:return T.Oi()}}}class XI{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map((o=>ne(o).evaluate(e,t)));let s="",i=!1;for(const o of n)switch(o.type){case"STRING":s+=o.value.stringValue;break;case"NULL":i=!0;break;default:return T.Oi()}return i?T.Ni():T.newValue({stringValue:s})}}class ZI{constructor(e){this.expr=e}evaluate(e,t){var o,B,u,c;Q(this.expr.params.length===2,4483);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"UNSET":return T.Mi();case"MAP":break;default:return T.Oi()}const s=ne(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return T.Oi();const i=(c=(B=(o=n.value)==null?void 0:o.mapValue)==null?void 0:B.fields)==null?void 0:c[(u=s.value)==null?void 0:u.stringValue];return i===void 0?T.Mi():T.newValue(i)}}class tc{constructor(e){this.expr=e}evaluate(e,t){var c,h;Q(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let n=!1;const s=ne(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":n=!0;break;default:return T.Oi()}const i=ne(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":n=!0;break;default:return T.Oi()}if(n)return T.Ni();const o=tu(s.value),B=tu(i.value);if(o===void 0||B===void 0||((c=o.values)==null?void 0:c.length)!==((h=B.values)==null?void 0:h.length))return T.Oi();const u=this.Gi(o,B);return u===void 0||isNaN(u)?T.Oi():T.newValue({doubleValue:u})}}class ey extends tc{Gi(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return;let i=0,o=0,B=0;for(let c=0;c<n.length;c++){if(!_n(n[c])||!_n(s[c]))return;const h=Ze(n[c]),C=Ze(s[c]);i+=h*C,o+=h*h,B+=C*C}const u=Math.sqrt(o)*Math.sqrt(B);if(u!==0)return 1-Math.max(-1,Math.min(1,i/u))}}class ty extends tc{Gi(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return 0;let i=0;for(let o=0;o<n.length;o++){if(!_n(n[o])||!_n(s[o]))return;i+=Ze(n[o])*Ze(s[o])}return i}}class ny extends tc{Gi(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return 0;let i=0;for(let o=0;o<n.length;o++){if(!_n(n[o])||!_n(s[o]))return;const B=Ze(n[o]),u=Ze(s[o]);i+=Math.pow(B-u,2)}return Math.sqrt(i)}}class ry{constructor(e){this.expr=e}evaluate(e,t){var s;Q(this.expr.params.length===1,39044);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"VECTOR":{const i=tu(n.value);return T.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return T.Ni();default:return T.Oi()}}}const Ri=BigInt(-62135596800),vi=BigInt(253402300799),na=BigInt(1e3),Jn=BigInt(1e6),sy=Ri*na,iy=vi*na+BigInt(999),oy=Ri*Jn,ay=vi*Jn+BigInt(999999);function nc(r){return r>=oy&&r<=ay}function hp(r){return r>=Ri&&r<=vi}function bi(r,e){const t=BigInt(r);return!(t<Ri||t>vi)&&!(e<0||e>=1e9)&&(t!==Ri||e===0)&&!(t===vi&&e>999999999)}function fp(r,e){return e<0?{seconds:r-1,nanos:e+1e9}:{seconds:r,nanos:e}}function rc(r){return BigInt(r.seconds)*Jn+BigInt(Math.trunc(r.nanoseconds/1e3))}class sc{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return this.toTimestamp(BigInt(n.value.integerValue));case"NULL":return T.Ni();default:return T.Oi()}}}class By extends sc{toTimestamp(e){if(!nc(e))return T.Oi();let t=Number(e/Jn),n=Number(e%Jn*BigInt(1e3));const s=fp(t,n);return t=s.seconds,n=s.nanos,bi(t,n)?T.newValue({timestampValue:{seconds:t,nanos:n}}):T.Oi()}}class uy extends sc{toTimestamp(e){if(!(function(o){return o>=sy&&o<=iy})(e))return T.Oi();let t=Number(e/na),n=Number(e%na*BigInt(1e6));const s=fp(t,n);return t=s.seconds,n=s.nanos,bi(t,n)?T.newValue({timestampValue:{seconds:t,nanos:n}}):T.Oi()}}class cy extends sc{toTimestamp(e){if(!hp(e))return T.Oi();const t=Number(e);return T.newValue({timestampValue:{seconds:t,nanos:0}})}}class ic{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const n=ne(this.expr.params[0]).evaluate(e,t);switch(n.type){case"TIMESTAMP":break;case"NULL":return T.Ni();default:return T.Oi()}const s=Vu(n.value.timestampValue);return bi(s.seconds,s.nanoseconds)?this.ji(s):T.Oi()}}class ly extends ic{ji(e){const t=rc(e);return nc(t)?T.newValue({integerValue:`${t.toString()}`}):T.Oi()}}class hy extends ic{ji(e){const t=rc(e),n=t/BigInt(1e3),s=t%BigInt(1e3);return n>BigInt(0)||s===BigInt(0)?T.newValue({integerValue:n.toString()}):T.newValue({integerValue:(n-BigInt(1)).toString()})}}class fy extends ic{ji(e){const t=BigInt(e.seconds);return hp(t)?T.newValue({integerValue:t.toString()}):T.Oi()}}class Cp{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let n=!1;const s=ne(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":n=!0;break;default:return T.Oi()}const i=ne(this.expr.params[1]).evaluate(e,t);let o;switch(i.type){case"STRING":if(o=(function(K){switch(K){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),o===void 0)return T.Oi();break;case"NULL":n=!0;break;default:return T.Oi()}const B=ne(this.expr.params[2]).evaluate(e,t);switch(B.type){case"INT":break;case"NULL":n=!0;break;default:return T.Oi()}if(n)return T.Ni();const u=BigInt(B.value.integerValue);let c;try{switch(o){case"microsecond":c=u;break;case"millisecond":c=u*BigInt(1e3);break;case"second":c=u*BigInt(1e6);break;case"minute":c=u*BigInt(6e7);break;case"hour":c=u*BigInt(36e8);break;case"day":c=u*BigInt(864e8);break;default:return T.Oi()}if(o!=="microsecond"&&u!==BigInt(0)&&c/u!==BigInt(this.zi(o)))return T.Oi()}catch(U){return qt(`Error during timestamp arithmetic: ${U}`),T.Oi()}const h=Vu(s.value.timestampValue);if(!bi(h.seconds,h.nanoseconds))return T.Oi();const C=rc(h),d=this.Hi(C,c);if(!nc(d))return T.Oi();const E=Number(d/Jn),D=d%Jn,b=Number((D<0?D+Jn:D)*BigInt(1e3)),F=D<0?E-1:E;return bi(F,b)?T.newValue({timestampValue:{seconds:F,nanos:b}}):T.Oi()}zi(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class Cy extends Cp{Hi(e,t){return e+t}}class dy extends Cp{Hi(e,t){return e-t}}function Pi(r){if((r=cp(r))instanceof Ds)return`fld(${r.fieldName})`;if(r instanceof ws)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof Fe?`ref(${t.path})`:t instanceof mt?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(r.value)})`;if(r instanceof L)return`fn(${r.name},[${r.params.map(Pi).join(",")}])`;if(r.expressionType==="ListOfExpressions")return`list([${r.di.map(Pi).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(r,null,2)}`)}function py(r){if(r instanceof ap)return`${r._name}(${wo(r.fields)})`;if(r instanceof Bp){let e=`${r._name}(${wo(r.accumulators)})`;return r.groups.size>0&&(e+=`grouping(${wo(r.groups)})`),e}if(r instanceof up)return`${r._name}(${wo(r.groups)})`;if(r instanceof Oa)return`${r._name}(${r.pi})`;if(r instanceof Sa)return`${r._name}(${r.collectionId})`;if(r instanceof Qu)return`${r._name}()`;if(r instanceof Yu)return`${r._name}(${r.gi.sort()})`;if(r instanceof Na)return`${r._name}(${Pi(r.condition)})`;if(r instanceof Fr)return`${r._name}(${r.limit})`;if(r instanceof hn)return`${r._name}(${(function(t){return t.map((n=>`${Pi(n.expr)}${n.direction}`)).join(",")})(r.orderings)})`;throw new Error(`Unrecognized stage ${r._name}`)}function wo(r){return`${Array.from(r.entries()).sort().map((([e,t])=>`${e}=${Pi(t)}`)).join(",")}`}function gn(r){return r.stages.map((e=>py(e))).join("|")}function dp(r,e){return gn(r)===gn(e)}function qe(r){return r instanceof ut}function Ef(r){return qe(r)?gn(r):si(r)}function pp(r){return qe(r)?gn(r):(function(t){return`${yd(tn(t))}|lt:${t.limitType}`})(r)}function xa(r,e){return r instanceof ut&&e instanceof ut?dp(r,e):!(r instanceof ut&&!(e instanceof ut)||!(r instanceof ut)&&e instanceof ut)&&FD(r,e)}function gp(r){return gr(r)?gn(r):yd(r)}function mp(r,e){return r instanceof ut&&e instanceof ut?dp(r,e):!(r instanceof ut&&!(e instanceof ut)||!(r instanceof ut)&&e instanceof ut)&&Td(r,e)}function gy(r,e){const t=(function(s){let i=!1;const o=[];for(const B of s)if(B instanceof hn)if(i=!0,B.orderings.some((u=>u.expr instanceof Ds&&u.expr.fieldName===Yt)))o.push(B);else{const u=B.orderings.map((c=>c));u.push(No(Yt).ascending()),o.push(new hn(u,{}))}else B instanceof Fr&&(i||(o.push(new hn([No(Yt).ascending()],{})),i=!0)),o.push(B);return i||o.push(new hn([No(Yt).ascending()],{})),o})(r.stages);if(r.userDataReader){const n=r.userDataReader.createContext(3,"toCorePipeline");t.forEach((s=>s._readUserData(n)))}return new ut(r.userDataReader.serializer,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&dD(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=ni(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=ni(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Od();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let B=this.applyToLocalView(o,i.mutatedFields);B=t.has(s.key)?null:B;const u=pd(o,B);u!==null&&n.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(ie.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),le())}isEqual(e){return this.batchId===e.batchId&&ls(this.mutations,e.mutations,((t,n)=>$h(t,n)))&&ls(this.baseMutations,e.baseMutations,((t,n)=>$h(t,n)))}}class oc{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){Q(e.mutations.length===n.length,58842,{Ji:e.mutations.length,Yi:n.length});let s=(function(){return MD})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new oc(e,t,n,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep="";function Ey(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=_f(e)),e=_y(r.get(t),e);return _f(e)}function _y(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case Ep:t+="";break;default:t+=i}}return t}function _f(r){return r+Ep+""}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,t,n,s,i=ie.min(),o=ie.min(),B=Oe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=B,this.expectedCount=u}withSequenceNumber(e){return new fn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new fn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new fn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new fn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(e){this.Xi=e}}function Iy(r){const e=nw({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?su(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(){this.d_=new Ty}addToCollectionParentIndex(e,t){return this.d_.add(t),V.resolve()}getCollectionParents(e,t){return V.resolve(this.d_.getEntries(t))}addFieldIndex(e,t){return V.resolve()}deleteFieldIndex(e,t){return V.resolve()}deleteAllFieldIndexes(e){return V.resolve()}createTargetIndexes(e,t){return V.resolve()}getDocumentsMatchingTarget(e,t){return V.resolve(null)}getIndexType(e,t){return V.resolve(0)}getFieldIndexes(e,t){return V.resolve([])}getNextCollectionGroupToUpdate(e){return V.resolve(null)}getMinOffset(e,t){return V.resolve(Qn.min())}getMinOffsetFromCollectionGroup(e,t){return V.resolve(Qn.min())}updateCollectionGroup(e,t,n){return V.resolve()}updateIndexEntries(e,t){return V.resolve()}}class Ty{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new He(ge.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new He(ge.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e){this.K_=e}next(){return this.K_+=2,this.K_}static W_(){return new er(0)}static G_(){return new er(-1)}}// Copyright 2024 Google LLC* @license
function _p(r,e){var n;let t=e;for(const s of r.stages)t=Ry({serializer:r.serializer,serverTimestampBehavior:(n=r.listenOptions)==null?void 0:n.serverTimestampBehavior},s,t);return t}function ka(r,e){return _p(r,[e]).length>0}function Ay(r,e){return qe(r)?ka(r,e):Ta(r,e)}function Ry(r,e,t){if(e instanceof Oa)return(function(s,i,o){return o.filter((B=>B.isFoundDocument()&&`/${B.key.getCollectionPath().canonicalString()}`===i.pi))})(0,e,t);if(e instanceof Na)return(function(s,i,o){return o.filter((B=>{const u=Bi(ne(i.condition).evaluate(s,B));return u!==void 0&&Vt(u,Et)}))})(r,e,t);if(e instanceof Sa)return(function(s,i,o){return o.filter((B=>B.isFoundDocument()&&B.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof Qu)return(function(s,i,o){return o.filter((B=>B.isFoundDocument()))})(0,0,t);if(e instanceof Yu)return(function(s,i,o){return o.filter((B=>B.isFoundDocument()&&i.yi.has(B.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof Fr)return(function(s,i,o){return o.slice(0,i.limit)})(0,e,t);if(e instanceof hn)return(function(s,i,o){const B=i.orderings.map((u=>({eo:ne(u.expr),direction:u.direction})));return[...o].sort(((u,c)=>{for(const{eo:h,direction:C}of B){const d=Bi(h.evaluate(s,u)),E=Bi(h.evaluate(s,c)),D=_t(d??fs,E??fs);if(D!==0)return C==="ascending"?D:-D}return 0}))})(r,e,t);throw new Error(`Unknown stage: ${e._name}`)}function lu(r){const e=(function(n){for(let s=n.stages.length-1;s>=0;s--){const i=n.stages[s];if(i instanceof hn)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(r);return(t,n)=>{for(const s of e){const i=Bi(ne(s.expr).evaluate({serializer:r.serializer},t)),o=Bi(ne(s.expr).evaluate({serializer:r.serializer},n)),B=_t(i||fs,o||fs);if(B!==0)return s.direction==="ascending"?B:-B}return 0}}function OB(r){for(let e=r.stages.length-1;e>=0;e--){const t=r.stages[e];if(t instanceof Fr)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vy{constructor(){this.changes=new jr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,rt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?V.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class by{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Py{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&ni(n.mutation,s,At.empty(),De.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,le()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=le()){const s=On();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let o=ts();return i.forEach(((B,u)=>{o=o.insert(B,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const n=On();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,le())))}populateOverlays(e,t,n){const s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,B)=>{t.set(o,B)}))}))}computeViews(e,t,n,s){let i=pt();const o=ii(),B=(function(){return ii()})();return t.forEach(((u,c)=>{const h=n.get(c.key);s.has(c.key)&&(h===void 0||h.mutation instanceof or)?i=i.insert(c.key,c):h!==void 0?(o.set(c.key,h.mutation.getFieldMask()),ni(h.mutation,c,h.mutation.getFieldMask(),De.now())):o.set(c.key,At.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((c,h)=>o.set(c,h))),t.forEach(((c,h)=>B.set(c,new by(h,o.get(c)??null)))),B)))}recalculateAndSaveOverlays(e,t){const n=ii();let s=new Pe(((o,B)=>o-B)),i=le();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const B of o)B.keys().forEach((u=>{const c=t.get(u);if(c===null)return;let h=n.get(u)||At.empty();h=B.applyToLocalView(c,h),n.set(u,h);const C=(s.get(B.batchId)||le()).add(u);s=s.insert(B.batchId,C)}))})).next((()=>{const o=[],B=s.getReverseIterator();for(;B.hasNext();){const u=B.getNext(),c=u.key,h=u.value,C=Od();h.forEach((d=>{if(!i.has(d)){const E=pd(t.get(d),n.get(d));E!==null&&C.set(d,E),i=i.add(d)}})),o.push(this.documentOverlayCache.saveOverlays(e,c,C))}return V.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return qe(t)?this.getDocumentsMatchingPipeline(e,t,n,s):SD(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Rd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):V.resolve(On());let B=yi,u=i;return o.next((c=>V.forEach(c,((h,C)=>(B<C.largestBatchId&&(B=C.largestBatchId),i.get(h)?V.resolve():this.remoteDocumentCache.getEntry(e,h).next((d=>{u=u.insert(h,d)}))))).next((()=>this.populateOverlays(e,c,i))).next((()=>this.computeViews(e,u,c,le()))).next((h=>({batchId:B,changes:Pd(h)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Y(t)).next((n=>{let s=ts();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=ts();return this.indexManager.getCollectionParents(e,i).next((B=>V.forEach(B,(u=>{const c=(function(C,d){return new Mi(d,null,C.explicitOrderBy.slice(),C.filters.slice(),C.limit,C.limitType,C.startAt,C.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,c,n,s).next((h=>{h.forEach(((C,d)=>{o=o.insert(C,d)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((o=>this.retrieveMatchingLocalDocuments(i,o,(B=>Ta(t,B)))))}getDocumentsMatchingPipeline(e,t,n,s){if(jn(t)==="collection_group"){const i=Zu(t);let o=ts();return this.indexManager.getCollectionParents(e,i).next((B=>V.forEach(B,(u=>{const c=(function(C,d){const E=C.stages.map((D=>D instanceof Sa?new Oa(d.canonicalString(),{}):D));return new ut(C.serializer,E)})(t,u.child(i));return this.getDocumentsMatchingPipeline(e,c,n,s).next((h=>{h.forEach(((C,d)=>{o=o.insert(C,d)}))}))})).next((()=>o))))}{let i;return this.getOverlaysForPipeline(e,t,n.largestBatchId).next((o=>{switch(i=o,jn(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s);case"documents":let B=le();for(const u of cu(t))B=B.add(Y.fromPath(u));return this.remoteDocumentCache.getEntries(e,B);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new J("invalid-argument",`Invalid pipeline source to execute offline: ${gn(t)}`)}})).next((o=>this.retrieveMatchingLocalDocuments(i,o,(B=>ka(t,B)))))}}retrieveMatchingLocalDocuments(e,t,n){e.forEach(((i,o)=>{const B=o.getKey();t.get(B)===null&&(t=t.insert(B,rt.newInvalidDocument(B)))}));let s=ts();return t.forEach(((i,o)=>{const B=e.get(i);B!==void 0&&ni(B.mutation,o,At.empty(),De.now()),n(o)&&(s=s.insert(i,o))})),s}getOverlaysForPipeline(e,t,n){switch(jn(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,ge.fromString(Fa(t)),n);case"collection_group":throw new J("invalid-argument",`Unexpected collection group pipeline: ${gn(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,cu(t).map((s=>Y.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(e,n);default:throw new J("invalid-argument",`Failed to get overlays for pipeline: ${gn(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oy{constructor(e){this.serializer=e,this.co=new Map,this.lo=new Map}getBundleMetadata(e,t){return V.resolve(this.co.get(t))}saveBundleMetadata(e,t){return this.co.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:nn(s.createTime)}})(t)),V.resolve()}getNamedQuery(e,t){return V.resolve(this.lo.get(t))}saveNamedQuery(e,t){return this.lo.set(t.name,(function(s){return{name:s.name,query:Iy(s.bundledQuery),readTime:nn(s.readTime)}})(t)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sy{constructor(){this.overlays=new Pe(Y.comparator),this.Eo=new Map}getOverlay(e,t){return V.resolve(this.overlays.get(t))}getOverlays(e,t){const n=On();return V.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}getAllOverlays(e,t){const n=On();return this.overlays.forEach(((s,i)=>{i.largestBatchId>t&&n.set(s,i)})),V.resolve(n)}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.Es(e,t,i)})),V.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Eo.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Eo.delete(n)),V.resolve()}getOverlaysForCollection(e,t,n){const s=On(),i=t.length+1,o=new Y(t.child("")),B=this.overlays.getIteratorFrom(o);for(;B.hasNext();){const u=B.getNext().value,c=u.getKey();if(!t.isPrefixOf(c.path))break;c.path.length===i&&u.largestBatchId>n&&s.set(u.getKey(),u)}return V.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new Pe(((c,h)=>c-h));const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===t&&c.largestBatchId>n){let h=i.get(c.largestBatchId);h===null&&(h=On(),i=i.insert(c.largestBatchId,h)),h.set(c.getKey(),c)}}const B=On(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((c,h)=>B.set(c,h))),!(B.size()>=s)););return V.resolve(B)}Es(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Eo.get(s.largestBatchId).delete(n.key);this.Eo.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new Dy(t,n));let i=this.Eo.get(t);i===void 0&&(i=le(),this.Eo.set(t,i)),this.Eo.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ny{constructor(){this.sessionToken=Oe.EMPTY_BYTE_STRING}getSessionToken(e){return V.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(){this.ho=new He(We.To),this.Po=new He(We.Io)}isEmpty(){return this.ho.isEmpty()}addReference(e,t){const n=new We(e,t);this.ho=this.ho.add(n),this.Po=this.Po.add(n)}Ro(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Ao(new We(e,t))}Vo(e,t){e.forEach((n=>this.removeReference(n,t)))}fo(e){const t=new Y(new ge([])),n=new We(t,e),s=new We(t,e+1),i=[];return this.Po.forEachInRange([n,s],(o=>{this.Ao(o),i.push(o.key)})),i}mo(){this.ho.forEach((e=>this.Ao(e)))}Ao(e){this.ho=this.ho.delete(e),this.Po=this.Po.delete(e)}po(e){const t=new Y(new ge([])),n=new We(t,e),s=new We(t,e+1);let i=le();return this.Po.forEachInRange([n,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new We(e,0),n=this.ho.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class We{constructor(e,t){this.key=e,this.yo=t}static To(e,t){return Y.comparator(e.key,t.key)||ue(e.yo,t.yo)}static Io(e,t){return ue(e.yo,t.yo)||Y.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.rs=1,this.wo=new He(We.To)}checkEmpty(e){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.rs;this.rs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new my(i,t,n,s);this.mutationQueue.push(o);for(const B of s)this.wo=this.wo.add(new We(B.key,i)),this.indexManager.addToCollectionParentIndex(e,B.key.path.popLast());return V.resolve(o)}lookupMutationBatch(e,t){return V.resolve(this.bo(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.So(n),i=s<0?0:s;return V.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?bu:this.rs-1)}getAllMutationBatches(e){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new We(t,0),s=new We(t,Number.POSITIVE_INFINITY),i=[];return this.wo.forEachInRange([n,s],(o=>{const B=this.bo(o.yo);i.push(B)})),V.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new He(ue);return t.forEach((s=>{const i=new We(s,0),o=new We(s,Number.POSITIVE_INFINITY);this.wo.forEachInRange([i,o],(B=>{n=n.add(B.yo)}))})),V.resolve(this.xo(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;Y.isDocumentKey(i)||(i=i.child(""));const o=new We(new Y(i),0);let B=new He(ue);return this.wo.forEachWhile((u=>{const c=u.key.path;return!!n.isPrefixOf(c)&&(c.length===s&&(B=B.add(u.yo)),!0)}),o),V.resolve(this.xo(B))}xo(e){const t=[];return e.forEach((n=>{const s=this.bo(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){Q(this.vo(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.wo;return V.forEach(t.mutations,(s=>{const i=new We(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.wo=n}))}us(e){}containsKey(e,t){const n=new We(t,0),s=this.wo.firstAfterOrEqual(n);return V.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,V.resolve()}vo(e,t){return this.So(e)}So(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}bo(e){const t=this.So(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ly{constructor(e){this.Do=e,this.docs=(function(){return new Pe(Y.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.Do(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return V.resolve(n?n.document.mutableCopy():rt.newInvalidDocument(t))}getEntries(e,t){let n=pt();return t.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():rt.newInvalidDocument(s))})),V.resolve(n)}getAllEntries(e){let t=pt();return this.docs.forEach(((n,s)=>{t=t.insert(n,s.document)})),V.resolve(t)}getDocumentsMatchingQuery(e,t,n,s){let i,o;qe(t)?(i=ge.fromString(Fa(t)),o=h=>ka(t,h)):(i=t.path,o=h=>Ta(t,h));let B=pt();const u=new Y(i.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:C}}=c.getNext();if(!i.isPrefixOf(h.path))break;h.path.length>i.length+1||bD(vD(C),n)<=0||(s.has(C.key)||o(C))&&(B=B.insert(C.key,C.mutableCopy()))}return V.resolve(B)}getAllFromCollectionGroup(e,t,n,s){ee(9500)}Co(e,t){return V.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new xy(this)}getSize(e){return V.resolve(this.size)}}class xy extends vy{constructor(e){super(),this.ao=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.ao.addEntry(e,s)):this.ao.removeEntry(n)})),V.waitFor(t)}getFromCache(e,t){return this.ao.getEntry(e,t)}getAllFromCache(e,t){return this.ao.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ky{constructor(e){this.persistence=e,this.Fo=new jr((t=>gp(t)),mp),this.lastRemoteSnapshotVersion=ie.min(),this.highestTargetId=0,this.Oo=0,this.Mo=new ac,this.targetCount=0,this.No=er.W_()}forEachTarget(e,t){return this.Fo.forEach(((n,s)=>t(s))),V.resolve()}getLastRemoteSnapshotVersion(e){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return V.resolve(this.Oo)}allocateTargetId(e){return this.highestTargetId=this.No.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Oo&&(this.Oo=t),V.resolve()}H_(e){this.Fo.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.No=new er(t),this.highestTargetId=t),e.sequenceNumber>this.Oo&&(this.Oo=e.sequenceNumber)}addTargetData(e,t){return this.H_(t),this.targetCount+=1,V.resolve()}updateTargetData(e,t){return this.H_(t),V.resolve()}removeTargetData(e,t){return this.Fo.delete(t.target),this.Mo.fo(t.targetId),this.targetCount-=1,V.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.Fo.forEach(((o,B)=>{B.sequenceNumber<=t&&n.get(B.targetId)===null&&(this.Fo.delete(o),i.push(this.removeMatchingKeysForTargetId(e,B.targetId)),s++)})),V.waitFor(i).next((()=>s))}getTargetCount(e){return V.resolve(this.targetCount)}getTargetData(e,t){const n=this.Fo.get(t)||null;return V.resolve(n)}addMatchingKeys(e,t,n){return this.Mo.Ro(t,n),V.resolve()}removeMatchingKeys(e,t,n){this.Mo.Vo(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),V.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Mo.fo(t),V.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Mo.po(t);return V.resolve(n)}containsKey(e,t){return V.resolve(this.Mo.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(e,t){this.Bo={},this.overlays={},this.Lo=new va(0),this.$o=!1,this.$o=!0,this.Uo=new Ny,this.referenceDelegate=e(this),this.ko=new ky(this),this.indexManager=new yy,this.remoteDocumentCache=(function(s){return new Ly(s)})((n=>this.referenceDelegate.Qo(n))),this.serializer=new wy(t),this.qo=new Oy(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.$o=!1,Promise.resolve()}get started(){return this.$o}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Sy,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Bo[e.toKey()];return n||(n=new Fy(t,this.referenceDelegate),this.Bo[e.toKey()]=n),n}getGlobalsCache(){return this.Uo}getTargetCache(){return this.ko}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qo}runTransaction(e,t,n){$("MemoryPersistence","Starting transaction:",e);const s=new Vy(this.Lo.next());return this.referenceDelegate.Ko(),n(s).next((i=>this.referenceDelegate.Wo(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Go(e,t){return V.or(Object.values(this.Bo).map((n=>()=>n.containsKey(e,t))))}}class Vy extends bw{constructor(e){super(),this.currentSequenceNumber=e}}class Bc{constructor(e){this.persistence=e,this.jo=new ac,this.zo=null}static Ho(e){return new Bc(e)}get Jo(){if(this.zo)return this.zo;throw ee(60996)}addReference(e,t,n){return this.jo.addReference(n,t),this.Jo.delete(n.toString()),V.resolve()}removeReference(e,t,n){return this.jo.removeReference(n,t),this.Jo.add(n.toString()),V.resolve()}markPotentiallyOrphaned(e,t){return this.Jo.add(t.toString()),V.resolve()}removeTarget(e,t){this.jo.fo(t.targetId).forEach((s=>this.Jo.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Jo.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}Ko(){this.zo=new Set}Wo(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.Jo,(n=>{const s=Y.fromPath(n);return this.Yo(e,s).next((i=>{i||t.removeEntry(s,ie.min())}))})).next((()=>(this.zo=null,t.apply(e))))}updateLimboDocument(e,t){return this.Yo(e,t).next((n=>{n?this.Jo.delete(t.toString()):this.Jo.add(t.toString())}))}Qo(e){return 0}Yo(e,t){return V.or([()=>V.resolve(this.jo.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Go(e,t)])}}class ra{constructor(e,t){this.persistence=e,this.Zo=new jr((n=>Ey(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=Lw(this,t)}static Ho(e,t){return new ra(e,t)}Ko(){}Wo(e){return V.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Pi(e){const t=this.Y_(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}Y_(e){let t=0;return this.Ii(e,(n=>{t++})).next((()=>t))}Ii(e,t){return V.forEach(this.Zo,((n,s)=>this.X_(e,n,s).next((i=>i?V.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Co(e,(o=>this.X_(e,o,t).next((B=>{B||(n++,i.removeEntry(o,ie.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.Zo.set(t,e.currentSequenceNumber),V.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.Zo.set(n,e.currentSequenceNumber),V.resolve()}removeReference(e,t,n){return this.Zo.set(n,e.currentSequenceNumber),V.resolve()}updateLimboDocument(e,t){return this.Zo.set(t,e.currentSequenceNumber),V.resolve()}Qo(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Wo(e.data.value)),t}X_(e,t,n){return V.or([()=>this.persistence.Go(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.Zo.get(t);return V.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.$a=n,this.Ua=s}static ka(e,t){let n=le(),s=le();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new uc(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function My(r,e){return Y.comparator(r.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uy{constructor(){this.Qa=!1,this.qa=!1,this.Ka=100,this.Wa=(function(){return tE()?8:Pw(st())>0?6:4})()}initialize(e,t){this.Ga=e,this.indexManager=t,this.Qa=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.ja(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.za(e,t,s,n).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new Gy;return this.Ha(e,t,o).next((B=>{if(i.result=B,this.qa)return this.Ja(e,t,o,B.size)}))})).next((()=>i.result))}Ja(e,t,n,s){return qe(t)?V.resolve():n.documentReadCount<this.Ka?(Zr()<=he.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",si(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Ka,"documents"),V.resolve()):(Zr()<=he.DEBUG&&$("QueryEngine","Query:",si(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Wa*s?(Zr()<=he.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",si(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tn(t))):V.resolve())}ja(e,t){if(qe(t))return V.resolve(null);let n=t;if(tf(n))return V.resolve(null);let s=tn(n);return this.indexManager.getIndexType(e,s).next((i=>i===0?null:(n.limit!==null&&i===1&&(n=su(n,null,"F"),s=tn(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next((o=>{const B=le(...o);return this.Ga.getDocuments(e,B).next((u=>this.indexManager.getMinOffset(e,s).next((c=>{const h=this.Ya(n,u);return this.Za(n,h,B,c.readTime)?this.ja(e,su(n,null,"F")):this.Xa(e,h,n,c)}))))})))))}za(e,t,n,s){return(qe(t)?(function(o){for(const B of o.stages){if(B instanceof Fr||B instanceof mf)return!1;if(B instanceof Na){if(B.condition instanceof sp&&B.condition._expr.name==="exists"&&B.condition._expr.params[0]instanceof Ds&&B.condition._expr.params[0].fieldName===Yt)continue;return!1}}return!0})(t):tf(t))||s.isEqual(ie.min())?V.resolve(null):this.Ga.getDocuments(e,n).next((i=>{const o=this.Ya(t,i);return this.Za(t,o,n,s)?V.resolve(null):(Zr()<=he.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ef(t)),this.Xa(e,o,t,RD(s,yi)).next((B=>B)))}))}Ya(e,t){let n,s;return qe(e)?(n=new He(My),s=i=>ka(e,i)):(n=new He(xu(e)),s=i=>Ta(e,i)),t.forEach(((i,o)=>{s(o)&&(n=n.add(o))})),n}Za(e,t,n,s){if(qe(e))return(function(B){return B.stages.some((u=>u instanceof Fr||u instanceof mf))})(e);if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ha(e,t,n){return Zr()<=he.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",Ef(t)),this.Ga.getDocumentsMatchingQuery(e,t,Qn.min(),n)}Xa(e,t,n,s){return this.Ga.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc="LocalStore",Hy=3e8;class jy{constructor(e,t,n,s){this.persistence=e,this.eu=t,this.serializer=s,this.tu=new Pe(ue),this.nu=new jr((i=>gp(i)),mp),this.ru=new Map,this.iu=e.getRemoteDocumentCache(),this.ko=e.getTargetCache(),this.qo=e.getBundleCache(),this.su(n)}su(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Py(this.iu,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.iu.setIndexManager(this.indexManager),this.eu.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.tu)))}}function Jy(r,e,t,n){return new jy(r,e,t,n)}async function wp(r,e){const t=oe(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.su(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{const o=[],B=[];let u=le();for(const c of s){o.push(c.batchId);for(const h of c.mutations)u=u.add(h.key)}for(const c of i){B.push(c.batchId);for(const h of c.mutations)u=u.add(h.key)}return t.localDocuments.getDocuments(n,u).next((c=>({_u:c,removedBatchIds:o,addedBatchIds:B})))}))}))}function qy(r,e){const t=oe(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),i=t.iu.newChangeBuffer({trackRemovals:!0});return(function(B,u,c,h){const C=c.batch,d=C.keys();let E=V.resolve();return d.forEach((D=>{E=E.next((()=>h.getEntry(u,D))).next((b=>{const F=c.docVersions.get(D);Q(F!==null,48541),b.version.compareTo(F)<0&&(C.applyToRemoteDocument(b,c),b.isValidDocument()&&(b.setReadTime(c.commitVersion),h.addEntry(b)))}))})),E.next((()=>B.mutationQueue.removeMutationBatch(u,C)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(B){let u=le();for(let c=0;c<B.mutationResults.length;++c)B.mutationResults[c].transformResults.length>0&&(u=u.add(B.batch.mutations[c].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function Ip(r){const e=oe(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.ko.getLastRemoteSnapshotVersion(t)))}function Ky(r,e){const t=oe(r),n=e.snapshotVersion;let s=t.tu;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.iu.newChangeBuffer({trackRemovals:!0});s=t.tu;const B=[];e.targetChanges.forEach(((h,C)=>{const d=s.get(C);if(!d)return;B.push(t.ko.removeMatchingKeys(i,h.removedDocuments,C).next((()=>t.ko.addMatchingKeys(i,h.addedDocuments,C))));let E=d.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(C)!==null?E=E.withResumeToken(Oe.EMPTY_BYTE_STRING,ie.min()).withLastLimboFreeSnapshotVersion(ie.min()):h.resumeToken.approximateByteSize()>0&&(E=E.withResumeToken(h.resumeToken,n)),s=s.insert(C,E),(function(b,F,U){return b.resumeToken.approximateByteSize()===0||F.snapshotVersion.toMicroseconds()-b.snapshotVersion.toMicroseconds()>=Hy?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0})(d,E,h)&&B.push(t.ko.updateTargetData(i,E))}));let u=pt(),c=le();if(e.documentUpdates.forEach((h=>{e.resolvedLimboDocuments.has(h)&&B.push(t.persistence.referenceDelegate.updateLimboDocument(i,h))})),B.push(zy(i,o,e.documentUpdates).next((h=>{u=h.ou,c=h.au}))),!n.isEqual(ie.min())){const h=t.ko.getLastRemoteSnapshotVersion(i).next((C=>t.ko.setTargetsMetadata(i,i.currentSequenceNumber,n)));B.push(h)}return V.waitFor(B).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,c))).next((()=>u))})).then((i=>(t.tu=s,i)))}function zy(r,e,t){let n=le(),s=le();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let o=pt();return t.forEach(((B,u)=>{const c=i.get(B);u.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(B)),u.isNoDocument()&&u.version.isEqual(ie.min())?(e.removeEntry(B,u.readTime),o=o.insert(B,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(B,u)):$(cc,"Ignoring outdated watch update for ",B,". Current version:",c.version," Watch version:",u.version)})),{ou:o,au:s}}))}function Wy(r,e){const t=oe(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=bu),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function $y(r,e){const t=oe(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.ko.getTargetData(n,e).next((i=>i?(s=i,V.resolve(s)):t.ko.allocateTargetId(n).next((o=>(s=new fn(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.ko.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.tu.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.tu=t.tu.insert(n.targetId,n),t.nu.set(e,n.targetId)),n}))}async function hu(r,e,t){const n=oe(r),s=n.tu.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(o=>n.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!_s(o))throw o;$(cc,`Failed to update sequence numbers for target ${e}: ${o}`)}n.tu=n.tu.remove(e),n.nu.delete(s.target)}function Df(r,e,t){const n=oe(r);let s=ie.min(),i=le();return n.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,c,h){const C=oe(u),d=C.nu.get(h);return d!==void 0?V.resolve(C.tu.get(d)):C.ko.getTargetData(c,h)})(n,o,qe(e)?e:tn(e)).next((B=>{if(B)return s=B.lastLimboFreeSnapshotVersion,n.ko.getMatchingKeysForTargetId(o,B.targetId).next((u=>{i=u}))})).next((()=>n.eu.getDocumentsMatchingQuery(o,e,t?s:ie.min(),t?i:le()))).next((B=>(Qy(n,B),{documents:B,uu:i})))))}function Qy(r,e){e.forEach(((t,n)=>{const s=n.key.getCollectionGroup(),i=r.ru.get(s)||ie.min();n.readTime.compareTo(i)>0&&r.ru.set(s,n.readTime)}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Pu=0,this.Iu=null,this.Ru=!0}Au(){this.Pu===0&&(this.Vu("Unknown"),this.Iu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.Iu=null,this.du("Backend didn't respond within 10 seconds."),this.Vu("Offline"),Promise.resolve()))))}fu(e){this.state==="Online"?this.Vu("Unknown"):(this.Pu++,this.Pu>=1&&(this.mu(),this.du(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Vu("Offline")))}set(e){this.mu(),this.Pu=0,e==="Online"&&(this.Ru=!1),this.Vu(e)}Vu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}du(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ru?(En(t),this.Ru=!1):$("OnlineStateTracker",t)}mu(){this.Iu!==null&&(this.Iu.cancel(),this.Iu=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bn="RemoteStore";class Xy{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.pu=[],this.gu=new Map,this.yu=new Map,this.wu=new Map,this.bu=new er(1e3),this.Su=new er(1001),this.xu=new Set,this.vu=[],this.Du=i,this.Du.tn((o=>{n.enqueueAndForget((async()=>{Kr(this)&&($(Bn,"Restarting streams for network reachability change."),await(async function(u){const c=oe(u);c.xu.add(4),await ji(c),c.Cu.set("Unknown"),c.xu.delete(4),await Va(c)})(this))}))})),this.Cu=new Yy(n,s)}}async function Va(r){if(Kr(r))for(const e of r.vu)await e(!0)}async function ji(r){for(const e of r.vu)await e(!1)}function fu(r,e){return r.yu.get(e)||void 0}function yp(r,e){const t=oe(r),n=fu(t,e.targetId);if(n!==void 0&&t.gu.has(n))return;const s=(function(B,u){const c=fu(B,u);c!==void 0&&B.wu.delete(c);const h=(function(d,E){return E%2!=0?d.Su.next():d.bu.next()})(B,u);return B.yu.set(u,h),B.wu.set(h,u),h})(t,e.targetId);$(Bn,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new fn(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.gu.set(s,i),Cc(t)?fc(t):Ts(t).ur()&&hc(t,i)}function lc(r,e){const t=oe(r),n=Ts(t),s=fu(t,e);$(Bn,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.gu.delete(s),t.yu.delete(e),t.wu.delete(s),n.ur()&&Tp(t,s),t.gu.size===0&&(n.ur()?n.Er():Kr(t)&&t.Cu.set("Unknown"))}function hc(r,e){if(r.Fu.rt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ie.min())>0){const t=r.wu.get(e.targetId);if(t===void 0)return void $(Bn,"SDK target ID not found for remote ID: "+e.targetId);const n=r.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(n)}Ts(r).yr(e)}function Tp(r,e){r.Fu.rt(e),Ts(r).wr(e)}function fc(r){r.Fu=new qD({getRemoteKeysForTarget:e=>{const t=r.wu.get(e);return t!==void 0?r.remoteSyncer.getRemoteKeysForTarget(t):le()},Mt:e=>r.gu.get(e)||null,xt:()=>r.datastore.serializer.databaseId}),Ts(r).start(),r.Cu.Au()}function Cc(r){return Kr(r)&&!Ts(r).ar()&&r.gu.size>0}function Kr(r){return oe(r).xu.size===0}function Ap(r){r.Fu=void 0}async function Zy(r){r.Cu.set("Online")}async function eT(r){r.gu.forEach(((e,t)=>{hc(r,e)}))}async function tT(r,e){Ap(r),Cc(r)?(r.Cu.fu(e),fc(r)):r.Cu.set("Unknown")}async function nT(r,e,t){if(r.Cu.set("Online"),e instanceof Nd&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const B of i.targetIds){if(s.gu.has(B)){const u=s.wu.get(B);u!==void 0&&(await s.remoteSyncer.rejectListen(u,o),s.yu.delete(u),s.wu.delete(B)),s.gu.delete(B)}s.Fu.removeTarget(B)}})(r,e)}catch(n){$(Bn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await sa(r,n)}else if(e instanceof Oo?r.Fu.Tt(e):e instanceof Sd?r.Fu.ft(e):r.Fu.Rt(e),!t.isEqual(ie.min()))try{const n=await Ip(r.localStore);t.compareTo(n)>=0&&await(function(i,o){const B=i.Fu.Dt(o);B.targetChanges.forEach(((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const C=i.gu.get(h);C&&i.gu.set(h,C.withResumeToken(c.resumeToken,o))}})),B.targetMismatches.forEach(((c,h)=>{const C=i.gu.get(c);if(!C)return;i.gu.set(c,C.withResumeToken(Oe.EMPTY_BYTE_STRING,C.snapshotVersion)),Tp(i,c);const d=new fn(C.target,c,h,C.sequenceNumber);hc(i,d)}));const u=(function(h,C){const d=new Map;C.targetChanges.forEach(((D,b)=>{const F=h.wu.get(b);F!==void 0&&d.set(F,D)}));let E=new Pe(ue);return C.targetMismatches.forEach(((D,b)=>{const F=h.wu.get(D);F!==void 0&&(E=E.insert(F,b))})),new Gi(C.snapshotVersion,d,E,C.documentUpdates,C.augmentedDocumentUpdates,C.resolvedLimboDocuments)})(i,B);return i.remoteSyncer.applyRemoteEvent(u)})(r,t)}catch(n){$(Bn,"Failed to raise snapshot:",n),await sa(r,n)}}async function sa(r,e,t){if(!_s(e))throw e;r.xu.add(1),await ji(r),r.Cu.set("Offline"),t||(t=()=>Ip(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{$(Bn,"Retrying IndexedDB access"),await t(),r.xu.delete(1),await Va(r)}))}function Rp(r,e){return e().catch((t=>sa(r,t,e)))}async function Ma(r){const e=oe(r),t=tr(e);let n=e.pu.length>0?e.pu[e.pu.length-1].batchId:bu;for(;rT(e);)try{const s=await Wy(e.localStore,n);if(s===null){e.pu.length===0&&t.Er();break}n=s.batchId,sT(e,s)}catch(s){await sa(e,s)}vp(e)&&bp(e)}function rT(r){return Kr(r)&&r.pu.length<10}function sT(r,e){r.pu.push(e);const t=tr(r);t.ur()&&t.br&&t.Sr(e.mutations)}function vp(r){return Kr(r)&&!tr(r).ar()&&r.pu.length>0}function bp(r){tr(r).start()}async function iT(r){tr(r).Cr()}async function oT(r){const e=tr(r);for(const t of r.pu)e.Sr(t.mutations)}async function aT(r,e,t){const n=r.pu.shift(),s=oc.from(n,e,t);await Rp(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await Ma(r)}async function BT(r,e){e&&tr(r).br&&await(async function(n,s){if((function(o){return kD(o)&&o!==k.ABORTED})(s.code)){const i=n.pu.shift();tr(n).lr(),await Rp(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Ma(n)}})(r,e),vp(r)&&bp(r)}async function wf(r,e){const t=oe(r);t.asyncQueue.verifyOperationInProgress(),$(Bn,"RemoteStore received new credentials");const n=Kr(t);t.xu.add(3),await ji(t),n&&t.Cu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.xu.delete(3),await Va(t)}async function uT(r,e){const t=oe(r);e?(t.xu.delete(2),await Va(t)):e||(t.xu.add(2),await ji(t),t.Cu.set("Unknown"))}function Ts(r){return r.Ou||(r.Ou=(function(t,n,s){const i=oe(t);return i.Or(),new Dw(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{pn:Zy.bind(null,r),yn:eT.bind(null,r),bn:tT.bind(null,r),gr:nT.bind(null,r)}),r.vu.push((async e=>{e?(r.Ou.lr(),Cc(r)?fc(r):r.Cu.set("Unknown")):(await r.Ou.stop(),Ap(r))}))),r.Ou}function tr(r){return r.Mu||(r.Mu=(function(t,n,s){const i=oe(t);return i.Or(),new ww(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{pn:()=>Promise.resolve(),yn:iT.bind(null,r),bn:BT.bind(null,r),vr:oT.bind(null,r),Dr:aT.bind(null,r)}),r.vu.push((async e=>{e?(r.Mu.lr(),await Ma(r)):(await r.Mu.stop(),r.pu.length>0&&($(Bn,`Stopping write stream with ${r.pu.length} pending writes`),r.pu=[]))}))),r.Mu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Nu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Nu(this.observer.error,e):En("Uncaught Error in snapshot listener:",e.toString()))}Bu(){this.muted=!0}Nu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new pn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,B=new pc(e,t,o,s,i);return B.start(n),B}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new J(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function gc(r,e){if(En("AsyncQueue",`${e}: ${r}`),_s(r))return new J(k.UNAVAILABLE,`${e}: ${r}`);throw r}class If{constructor(){this.activeTargetIds=HD()}nc(e){this.activeTargetIds=this.activeTargetIds.add(e)}rc(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tc(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class cT{constructor(){this.kc=new If,this.Qc={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.kc.nc(e),this.Qc[e]||"not-current"}updateQueryState(e,t,n){this.Qc[e]=t}removeLocalQueryTarget(e){this.kc.rc(e)}isLocalQueryTarget(e){return this.kc.activeTargetIds.has(e)}clearQueryState(e){delete this.Qc[e]}getAllActiveQueryTargets(){return this.kc.activeTargetIds}isActiveQueryTarget(e){return this.kc.activeTargetIds.has(e)}start(){return this.kc=new If,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function SB(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{static emptySet(e){return new yr(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||Y.comparator(t.key,n.key):(t,n)=>Y.comparator(t.key,n.key),this.keyedMap=ts(),this.sortedSet=new Pe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof yr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new yr;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(){this.qc=new Pe(Y.comparator)}track(e){const t=e.doc.key,n=this.qc.get(t);n?e.type!==0&&n.type===3?this.qc=this.qc.insert(t,e):e.type===3&&n.type!==1?this.qc=this.qc.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.qc=this.qc.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.qc=this.qc.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.qc=this.qc.remove(t):e.type===1&&n.type===2?this.qc=this.qc.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.qc=this.qc.insert(t,{type:2,doc:e.doc}):ee(63341,{Nt:e,Kc:n}):this.qc=this.qc.insert(t,e)}Wc(){const e=[];return this.qc.inorderTraversal(((t,n)=>{e.push(n)})),e}}class ps{constructor(e,t,n,s,i,o,B,u,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=B,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach((B=>{o.push({type:0,doc:B})})),new ps(e,t,yr.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&xa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT{constructor(){this.Gc=void 0,this.jc=[]}zc(){return this.jc.some((e=>e.Hc()))}}class hT{constructor(){this.queries=Tf(),this.onlineState="Unknown",this.Jc=new Set}terminate(){(function(t,n){const s=oe(t),i=s.queries;s.queries=Tf(),i.forEach(((o,B)=>{for(const u of B.jc)u.onError(n)}))})(this,new J(k.ABORTED,"Firestore shutting down"))}}function Tf(){return new jr((r=>pp(r)),xa)}async function mc(r,e){const t=oe(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.zc()&&e.Hc()&&(n=2):(i=new lT,n=e.Hc()?0:1);try{switch(n){case 0:i.Gc=await t.onListen(s,!0);break;case 1:i.Gc=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const B=gc(o,`Initialization of query '${qe(e.query)?gn(e.query):si(e.query)}' failed`);return void e.onError(B)}t.queries.set(s,i),i.jc.push(e),e.Yc(t.onlineState),i.Gc&&e.Zc(i.Gc)&&_c(t)}async function Ec(r,e){const t=oe(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.jc.indexOf(e);o>=0&&(i.jc.splice(o,1),i.jc.length===0?s=e.Hc()?0:1:!i.zc()&&e.Hc()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function fT(r,e){const t=oe(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const B of o.jc)B.Zc(s)&&(n=!0);o.Gc=s}}n&&_c(t)}function CT(r,e,t){const n=oe(r),s=n.queries.get(e);if(s)for(const i of s.jc)i.onError(t);n.queries.delete(e)}function _c(r){r.Jc.forEach((e=>{e.next()}))}var Cu;(function(r){r.Default="default",r.Cache="cache"})(Cu||(Cu={}));class Dc{constructor(e,t,n){this.query=e,this.Xc=t,this.el=!1,this.tl=null,this.onlineState="Unknown",this.options=n||{}}Zc(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new ps(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.el?this.nl(e)&&(this.Xc.next(e),t=!0):this.rl(e,this.onlineState)&&(this.il(e),t=!0),this.tl=e,t}onError(e){this.Xc.error(e)}Yc(e){this.onlineState=e;let t=!1;return this.tl&&!this.el&&this.rl(this.tl,e)&&(this.il(this.tl),t=!0),t}rl(e,t){if(!e.fromCache||!this.Hc())return!0;const n=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}nl(e){if(e.docChanges.length>0)return!0;const t=this.tl&&this.tl.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}il(e){e=ps.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.el=!0,this.Xc.next(e)}Hc(){return this.options.source!==Cu.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(e){this.key=e}}class Op{constructor(e){this.key=e}}class dT{constructor(e,t){this.query=e,this.hl=t,this.Tl=null,this.hasCachedResults=!1,this.current=!1,this.Pl=le(),this.mutatedKeys=le(),this.Il=qe(e)?lu(e):xu(e),this.Rl=new yr(this.Il)}get Al(){return this.hl}Vl(e,t){const n=t?t.dl:new yf,s=t?t.Rl:this.Rl;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,B=!1;const[u,c]=this.fl(this.query,s);e.inorderTraversal(((C,d)=>{const E=s.get(C),D=Ay(this.query,d)?d:null,b=!!E&&this.mutatedKeys.has(E.key),F=!!D&&(D.hasLocalMutations||this.mutatedKeys.has(D.key)&&D.hasCommittedMutations);let U=!1;E&&D?E.data.isEqual(D.data)?b!==F&&(n.track({type:3,doc:D}),U=!0):this.ml(E,D)||(n.track({type:2,doc:D}),U=!0,(u&&this.Il(D,u)>0||c&&this.Il(D,c)<0)&&(B=!0)):!E&&D?(n.track({type:0,doc:D}),U=!0):E&&!D&&(n.track({type:1,doc:E}),U=!0,(u||c)&&(B=!0)),U&&(D?(o=o.add(D),i=F?i.add(C):i.delete(C)):(o=o.delete(C),i=i.delete(C)))}));const h=this.pl(this.query);if(h)if(qe(this.query)){const C=[];o.forEach((D=>C.push(D)));const d=_p(this.query,C);let E=new yr(lu(this.query));for(const D of d)E=E.add(D);o.forEach((D=>{E.has(D.key)||(i=i.delete(D.key),n.track({type:1,doc:D}))})),o=E}else{const C=this.gl(this.query);for(;o.size>h;){const d=C==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),n.track({type:1,doc:d})}}return{Rl:o,dl:n,Za:B,mutatedKeys:i}}pl(e){var t;return qe(e)?(t=OB(e))==null?void 0:t.limit:e.limit||void 0}gl(e){if(qe(e)){const t=OB(e);return t&&t.limit<0?"L":"F"}return e.limitType}fl(e,t){var n;if(qe(e)){const s=(n=OB(e))==null?void 0:n.limit;return[t.size===s?t.last():null,null]}return[e.limitType==="F"&&t.size===this.pl(this.query)?t.last():null,e.limitType==="L"&&t.size===this.pl(this.query)?t.first():null]}ml(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.Rl;this.Rl=e.Rl,this.mutatedKeys=e.mutatedKeys;const o=e.dl.Wc();o.sort(((h,C)=>(function(E,D){const b=F=>{switch(F){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee(20277,{Nt:F})}};return b(E)-b(D)})(h.type,C.type)||this.Il(h.doc,C.doc))),this.yl(n),s=s??!1;const B=t&&!s?this.wl():[],u=this.Pl.size===0&&this.current&&!s?1:0,c=u!==this.Tl;return this.Tl=u,o.length!==0||c?{snapshot:new ps(this.query,e.Rl,i,o,e.mutatedKeys,u===0,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),bl:B}:{bl:B}}Yc(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Rl:this.Rl,dl:new yf,mutatedKeys:this.mutatedKeys,Za:!1},!1)):{bl:[]}}Sl(e){return!this.hl.has(e)&&!!this.Rl.has(e)&&!this.Rl.get(e).hasLocalMutations}yl(e){e&&(e.addedDocuments.forEach((t=>this.hl=this.hl.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.hl=this.hl.delete(t))),this.current=e.current)}wl(){if(!this.current)return[];const e=this.Pl;this.Pl=le(),this.Rl.forEach((n=>{this.Sl(n.key)&&(this.Pl=this.Pl.add(n.key))}));const t=[];return e.forEach((n=>{this.Pl.has(n)||t.push(new Op(n))})),this.Pl.forEach((n=>{e.has(n)||t.push(new Pp(n))})),t}xl(e){this.hl=e.uu,this.Pl=le();const t=this.Vl(e.documents);return this.applyChanges(t,!0)}vl(){return ps.fromInitialDocuments(this.query,this.Rl,this.mutatedKeys,this.Tl===0,this.hasCachedResults)}}const wc="SyncEngine";class pT{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class gT{constructor(e){this.key=e,this.Dl=!1}}class mT{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Cl={},this.Fl=new jr((B=>pp(B)),xa),this.Ol=new Map,this.Ml=new Set,this.Nl=new Pe(Y.comparator),this.Bl=new Map,this.Ll=new ac,this.$l={},this.Ul=new Map,this.kl=er.G_(),this.onlineState="Unknown",this.Ql=void 0}get isPrimaryClient(){return this.Ql===!0}}async function ET(r,e,t=!0){const n=kp(r);let s;const i=n.Fl.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.vl()):s=await Sp(n,e,t,!0),s}async function _T(r,e){const t=kp(r);await Sp(t,e,!0,!1)}async function Sp(r,e,t,n){const s=await $y(r.localStore,qe(e)?e:tn(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let B;return n&&(B=await DT(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&yp(r.remoteStore,s),B}async function DT(r,e,t,n,s){r.ql=(C,d,E)=>(async function(b,F,U,K){let re=F.view.Vl(U);re.Za&&(re=await Df(b.localStore,F.query,!1).then((({documents:R})=>F.view.Vl(R,re))));const ce=K&&K.targetChanges.get(F.targetId),Ee=K&&K.targetMismatches.get(F.targetId)!=null,_e=F.view.applyChanges(re,b.isPrimaryClient,ce,Ee);return Rf(b,F.targetId,_e.bl),_e.snapshot})(r,C,d,E);const i=await Df(r.localStore,e,!0),o=new dT(e,i.uu),B=o.Vl(i.documents),u=Ui.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),c=o.applyChanges(B,r.isPrimaryClient,u);Rf(r,t,c.bl);const h=new pT(e,t,o);return r.Fl.set(e,h),r.Ol.has(t)?r.Ol.get(t).push(e):r.Ol.set(t,[e]),c.snapshot}async function wT(r,e,t){const n=oe(r),s=n.Fl.get(e),i=n.Ol.get(s.targetId);if(i.length>1)return n.Ol.set(s.targetId,i.filter((o=>!xa(o,e)))),void n.Fl.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await hu(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&lc(n.remoteStore,s.targetId),du(n,s.targetId)})).catch(Es)):(du(n,s.targetId),await hu(n.localStore,s.targetId,!0))}async function IT(r,e){const t=oe(r),n=t.Fl.get(e),s=t.Ol.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),lc(t.remoteStore,n.targetId))}async function yT(r,e,t){const n=OT(r);try{const s=await(function(o,B){const u=oe(o),c=De.now(),h=B.reduce(((E,D)=>E.add(D.key)),le());let C,d;return u.persistence.runTransaction("Locally write mutations","readwrite",(E=>{let D=pt(),b=le();return u.iu.getEntries(E,h).next((F=>{D=F,D.forEach(((U,K)=>{K.isValidDocument()||(b=b.add(U))}))})).next((()=>u.localDocuments.getOverlayedDocuments(E,D))).next((F=>{C=F;const U=[];for(const K of B){const re=pD(K,C.get(K.key).overlayedDocument);re!=null&&U.push(new or(K.key,re,ld(re.value.mapValue),Pt.exists(!0)))}return u.mutationQueue.addMutationBatch(E,c,U,B)})).next((F=>{d=F;const U=F.applyToLocalDocumentSet(C,b);return u.documentOverlayCache.saveOverlays(E,F.batchId,U)}))})).then((()=>({batchId:d.batchId,changes:Pd(C)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(o,B,u){let c=o.$l[o.currentUser.toKey()];c||(c=new Pe(ue)),c=c.insert(B,u),o.$l[o.currentUser.toKey()]=c})(n,s.batchId,t),await Ji(n,s.changes),await Ma(n.remoteStore)}catch(s){const i=gc(s,"Failed to persist write");t.reject(i)}}async function Np(r,e){const t=oe(r);try{const n=await Ky(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Bl.get(i);o&&(Q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Dl=!0:s.modifiedDocuments.size>0?Q(o.Dl,14607):s.removedDocuments.size>0&&(Q(o.Dl,42227),o.Dl=!1))})),await Ji(t,n,e)}catch(n){await Es(n)}}function Af(r,e,t){const n=oe(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Fl.forEach(((i,o)=>{const B=o.view.Yc(e);B.snapshot&&s.push(B.snapshot)})),(function(o,B){const u=oe(o);u.onlineState=B;let c=!1;u.queries.forEach(((h,C)=>{for(const d of C.jc)d.Yc(B)&&(c=!0)})),c&&_c(u)})(n.eventManager,e),s.length&&n.Cl.gr(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function TT(r,e,t){const n=oe(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Bl.get(e),i=s&&s.key;if(i){let o=new Pe(Y.comparator);o=o.insert(i,rt.newNoDocument(i,ie.min()));const B=le().add(i),u=new Gi(ie.min(),new Map,new Pe(ue),o,pt(),B);await Np(n,u),n.Nl=n.Nl.remove(i),n.Bl.delete(e),Ic(n)}else await hu(n.localStore,e,!1).then((()=>du(n,e,t))).catch(Es)}async function AT(r,e){const t=oe(r),n=e.batch.batchId;try{const s=await qy(t.localStore,e);Lp(t,n,null),Fp(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Ji(t,s)}catch(s){await Es(s)}}async function RT(r,e,t){const n=oe(r);try{const s=await(function(o,B){const u=oe(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(c=>{let h;return u.mutationQueue.lookupMutationBatch(c,B).next((C=>(Q(C!==null,37113),h=C.keys(),u.mutationQueue.removeMutationBatch(c,C)))).next((()=>u.mutationQueue.performConsistencyCheck(c))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(c,h,B))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,h))).next((()=>u.localDocuments.getDocuments(c,h)))}))})(n.localStore,e);Lp(n,e,t),Fp(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Ji(n,s)}catch(s){await Es(s)}}function Fp(r,e){(r.Ul.get(e)||[]).forEach((t=>{t.resolve()})),r.Ul.delete(e)}function Lp(r,e,t){const n=oe(r);let s=n.$l[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.$l[n.currentUser.toKey()]=s}}function du(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ol.get(e))r.Fl.delete(n),t&&r.Cl.Kl(n,t);r.Ol.delete(e),r.isPrimaryClient&&r.Ll.fo(e).forEach((n=>{r.Ll.containsKey(n)||xp(r,n)}))}function xp(r,e){r.Ml.delete(e.path.canonicalString());const t=r.Nl.get(e);t!==null&&(lc(r.remoteStore,t),r.Nl=r.Nl.remove(e),r.Bl.delete(t),Ic(r))}function Rf(r,e,t){for(const n of t)n instanceof Pp?(r.Ll.addReference(n.key,e),vT(r,n)):n instanceof Op?($(wc,"Document no longer in limbo: "+n.key),r.Ll.removeReference(n.key,e),r.Ll.containsKey(n.key)||xp(r,n.key)):ee(19791,{Wl:n})}function vT(r,e){const t=e.key,n=t.path.canonicalString();r.Nl.get(t)||r.Ml.has(n)||($(wc,"New document in limbo: "+t),r.Ml.add(n),Ic(r))}function Ic(r){for(;r.Ml.size>0&&r.Nl.size<r.maxConcurrentLimboResolutions;){const e=r.Ml.values().next().value;r.Ml.delete(e);const t=new Y(ge.fromString(e)),n=r.kl.next();r.Bl.set(n,new gT(t)),r.Nl=r.Nl.insert(t,n),yp(r.remoteStore,new fn(tn(ya(t.path)),n,"TargetPurposeLimboResolution",va.Br))}}async function Ji(r,e,t){const n=oe(r),s=[],i=[],o=[];n.Fl.isEmpty()||(n.Fl.forEach(((B,u)=>{o.push(n.ql(u,e,t).then((c=>{var h;if((c||t)&&n.isPrimaryClient){const C=c?!c.fromCache:(h=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:h.current;n.sharedClientState.updateQueryState(u.targetId,C?"current":"not-current")}if(c){s.push(c);const C=uc.ka(u.targetId,c);i.push(C)}})))})),await Promise.all(o),n.Cl.gr(s),await(async function(u,c){const h=oe(u);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(C=>V.forEach(c,(d=>V.forEach(d.$a,(E=>h.persistence.referenceDelegate.addReference(C,d.targetId,E))).next((()=>V.forEach(d.Ua,(E=>h.persistence.referenceDelegate.removeReference(C,d.targetId,E)))))))))}catch(C){if(!_s(C))throw C;$(cc,"Failed to update sequence numbers: "+C)}for(const C of c){const d=C.targetId;if(!C.fromCache){const E=h.tu.get(d),D=E.snapshotVersion,b=E.withLastLimboFreeSnapshotVersion(D);h.tu=h.tu.insert(d,b)}}})(n.localStore,i))}async function bT(r,e){const t=oe(r);if(!t.currentUser.isEqual(e)){$(wc,"User change. New user:",e.toKey());const n=await wp(t.localStore,e);t.currentUser=e,(function(i,o){i.Ul.forEach((B=>{B.forEach((u=>{u.reject(new J(k.CANCELLED,o))}))})),i.Ul.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Ji(t,n._u)}}function PT(r,e){const t=oe(r),n=t.Bl.get(e);if(n&&n.Dl)return le().add(n.key);{let s=le();const i=t.Ol.get(e);if(!i)return s;for(const o of i??[]){const B=t.Fl.get(o);s=s.unionWith(B.view.Al)}return s}}function kp(r){const e=oe(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Np.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=PT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=TT.bind(null,e),e.Cl.gr=fT.bind(null,e.eventManager),e.Cl.Kl=CT.bind(null,e.eventManager),e}function OT(r){const e=oe(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=AT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=RT.bind(null,e),e}class ia{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Aa(e.databaseInfo.databaseId),this.sharedClientState=this.jl(e),this.persistence=this.zl(e),await this.persistence.start(),this.localStore=this.Hl(e),this.gcScheduler=this.Jl(e,this.localStore),this.indexBackfillerScheduler=this.Yl(e,this.localStore)}Jl(e,t){return null}Yl(e,t){return null}Hl(e){return Jy(this.persistence,new Uy,e.initialUser,this.serializer)}zl(e){return new Dp(Bc.Ho,this.serializer)}jl(e){return new cT}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ia.provider={build:()=>new ia};class ST extends ia{constructor(e){super(),this.cacheSizeBytes=e}Jl(e,t){Q(this.persistence.referenceDelegate instanceof ra,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Nw(n,e.asyncQueue,t)}zl(e){const t=this.cacheSizeBytes!==void 0?dt.withCacheSize(this.cacheSizeBytes):dt.DEFAULT;return new Dp((n=>ra.Ho(n,t)),this.serializer)}}class pu{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Af(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=bT.bind(null,this.syncEngine),await uT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new hT})()}createDatastore(e){const t=Aa(e.databaseInfo.databaseId),n=_w(e.databaseInfo);return Tw(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,o,B){return new Xy(n,s,i,o,B)})(this.localStore,this.datastore,e.asyncQueue,(t=>Af(this.syncEngine,t,0)),(function(){return cf.cn()?new cf:new pw})())}createSyncEngine(e,t){return(function(s,i,o,B,u,c,h){const C=new mT(s,i,o,B,u,c);return h&&(C.Ql=!0),C})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=oe(s);$(Bn,"RemoteStore shutting down."),i.xu.add(5),await ji(i),i.Du.shutdown(),i.Cu.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}pu.provider={build:()=>new pu};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr="FirestoreClient";class NT{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=nt.UNAUTHENTICATED,this.clientId=Ru.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async o=>{$(nr,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>($(nr,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new pn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=gc(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function NB(r,e){r.asyncQueue.verifyOperationInProgress(),$(nr,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await wp(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function vf(r,e){r.asyncQueue.verifyOperationInProgress();const t=await FT(r);$(nr,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>wf(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>wf(e.remoteStore,s))),r._onlineComponents=e}async function FT(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){$(nr,"Using user provided OfflineComponentProvider");try{await NB(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===k.FAILED_PRECONDITION||s.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;qt("Error using user provided cache. Falling back to memory cache: "+t),await NB(r,new ia)}}else $(nr,"Using default OfflineComponentProvider"),await NB(r,new ST(void 0));return r._offlineComponents}async function Vp(r){return r._onlineComponents||(r._uninitializedComponentsProvider?($(nr,"Using user provided OnlineComponentProvider"),await vf(r,r._uninitializedComponentsProvider._online)):($(nr,"Using default OnlineComponentProvider"),await vf(r,new pu))),r._onlineComponents}function LT(r){return Vp(r).then((e=>e.syncEngine))}async function oa(r){const e=await Vp(r),t=e.eventManager;return t.onListen=ET.bind(null,e.syncEngine),t.onUnlisten=wT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=_T.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=IT.bind(null,e.syncEngine),t}function xT(r,e,t,n){const s=new dc(n),i=new Dc(e,s,t);return r.asyncQueue.enqueueAndForget((async()=>mc(await oa(r),i))),()=>{s.Bu(),r.asyncQueue.enqueueAndForget((async()=>Ec(await oa(r),i)))}}function kT(r,e,t={}){const n=new pn;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,B,u,c){const h=new dc({next:d=>{h.Bu(),o.enqueueAndForget((()=>Ec(i,C)));const E=d.docs.has(B);!E&&d.fromCache?c.reject(new J(k.UNAVAILABLE,"Failed to get document because the client is offline.")):E&&d.fromCache&&u&&u.source==="server"?c.reject(new J(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(d)},error:d=>c.reject(d)}),C=new Dc(ya(B.path),h,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return mc(i,C)})(await oa(r),r.asyncQueue,e,t,n))),n.promise}function VT(r,e,t={}){const n=new pn;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,B,u,c){const h=new dc({next:d=>{h.Bu(),o.enqueueAndForget((()=>Ec(i,C))),d.fromCache&&u.source==="server"?c.reject(new J(k.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(d)},error:d=>c.reject(d)}),C=new Dc(B instanceof ai?gy(B):B,h,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return mc(i,C)})(await oa(r),r.asyncQueue,e,t,n))),n.promise}function MT(r,e){const t=new pn;return r.asyncQueue.enqueueAndForget((async()=>yT(await LT(r),e,t))),t.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mp=class{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Fe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new GT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Nr("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},GT=class extends Mp{data(){return super.data()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UT{convertValue(e,t="none"){switch(je(e)){case 0:return null;case 2:return e.booleanValue;case 3:if("mapValue"in e){if($n(e))return this.convertToInt32Value(e.mapValue);if(Mt(e))return this.convertToDecimal128Value(e.mapValue)}return Ne(e.integerValue||e.doubleValue);case 4:return this.convertTimestamp(e.timestampValue);case 6:return this.convertServerTimestamp(e,t);case 7:return e.stringValue;case 8:return"bytesValue"in e?this.convertBytes(Sr(e.bytesValue)):this.convertToBytesWithSubtype(e.mapValue);case 9:return this.convertReference(e.referenceValue);case 11:return this.convertGeoPoint(e.geoPointValue);case 13:return this.convertArray(e.arrayValue,t);case 15:return this.convertObject(e.mapValue,t);case 14:return this.convertVectorValue(e.mapValue);case 12:return this.convertToRegexValue(e.mapValue);case 10:return this.convertToBsonObjectId(e.mapValue);case 5:return this.convertToBsonTimestamp(e.mapValue);case 16:return cn.instance();case 1:return ln.instance();default:throw ee(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return ir(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){var n,s,i;const t=(i=(s=(n=e.fields)==null?void 0:n[pi].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>Ne(o.doubleValue)));return new mt(t)}convertToBsonObjectId(e){var n,s;const t=((s=(n=e.fields)==null?void 0:n[gi])==null?void 0:s.stringValue)??"";return new Gu(t)}convertToBytesWithSubtype(e){var B;const t=(B=e.fields)==null?void 0:B[_a],n=t==null?void 0:t.bytesValue;if(!n)throw new Error("Received incorrect bytesValue for Bytes with subtype");const s=Sr(n).toUint8Array();if(s.length===0)throw new Error("Received empty bytesValue for Bytes with subtype");const i=s[0],o=s.slice(1);return new Tt(Oe.fromUint8Array(o),i)}convertToBsonTimestamp(e){var i,o,B,u,c,h,C;const t=(i=e.fields)==null?void 0:i[Er],n=Number((u=(B=(o=t==null?void 0:t.mapValue)==null?void 0:o.fields)==null?void 0:B[Ko])==null?void 0:u.integerValue),s=Number((C=(h=(c=t==null?void 0:t.mapValue)==null?void 0:c.fields)==null?void 0:h[zo])==null?void 0:C.integerValue);return new Uu(n,s)}convertToRegexValue(e){var s,i,o,B,u,c,h,C,d,E;const t=((u=(B=(o=(i=(s=e.fields)==null?void 0:s[Vn])==null?void 0:i.mapValue)==null?void 0:o.fields)==null?void 0:B[Jo])==null?void 0:u.stringValue)??"",n=((E=(d=(C=(h=(c=e.fields)==null?void 0:c[Vn])==null?void 0:h.mapValue)==null?void 0:C.fields)==null?void 0:d[qo])==null?void 0:E.stringValue)??"";return new qu(t,n)}convertToInt32Value(e){var n,s;const t=Number((s=(n=e.fields)==null?void 0:n[Hr])==null?void 0:s.integerValue);return new Ju(t)}convertToDecimal128Value(e){var n,s;const t=((s=(n=e.fields)==null?void 0:n[Wn])==null?void 0:s.stringValue)??"";return new Hu(t)}convertGeoPoint(e){return new rn(Ne(e.latitude),Ne(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=ki(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(hs(e));default:return null}}convertTimestamp(e){const t=zn(e);return new De(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ge.fromString(e);Q(Md(n),9688,{name:e});const s=new Ci(n.get(1),n.get(3)),i=new Y(n.popFirst(5));return s.isEqual(t)||En(`A document reference to ${i} refers to a different database (${s.projectId}/${s.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gp(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf="AsyncQueue";class Pf{constructor(e=Promise.resolve()){this._E=[],this.oE=!1,this.aE=[],this.uE=null,this.cE=!1,this.lE=!1,this.EE=[],this._r=new Jd(this,"async_queue_retry"),this.hE=()=>{const n=SB();n&&$(bf,"Visibility state changed to "+n.visibilityState),this._r.Xn()},this.TE=e;const t=SB();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.hE)}get isShuttingDown(){return this.oE}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.PE(),this.IE(e)}enterRestrictedMode(e){if(!this.oE){this.oE=!0,this.lE=e||!1;const t=SB();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hE)}}enqueue(e){if(this.PE(),this.oE)return new Promise((()=>{}));const t=new pn;return this.IE((()=>this.oE&&this.lE?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this._E.push(e),this.RE())))}async RE(){if(this._E.length!==0){try{await this._E[0](),this._E.shift(),this._r.reset()}catch(e){if(!_s(e))throw e;$(bf,"Operation failed with retryable error: "+e)}this._E.length>0&&this._r.Yn((()=>this.RE()))}}IE(e){const t=this.TE.then((()=>(this.cE=!0,e().catch((n=>{throw this.uE=n,this.cE=!1,En("INTERNAL UNHANDLED ERROR: ",Of(n)),n})).then((n=>(this.cE=!1,n))))));return this.TE=t,t}enqueueAfterDelay(e,t,n){this.PE(),this.EE.indexOf(e)>-1&&(t=0);const s=pc.createAndSchedule(this,e,t,n,(i=>this.AE(i)));return this.aE.push(s),s}PE(){this.uE&&ee(47125,{VE:Of(this.uE)})}verifyOperationInProgress(){}async dE(){let e;do e=this.TE,await e;while(e!==this.TE)}fE(e){for(const t of this.aE)if(t.timerId===e)return!0;return!1}mE(e){return this.dE().then((()=>{this.aE.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.aE)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.dE()}))}pE(e){this.EE.push(e)}AE(e){const t=this.aE.indexOf(e);this.aE.splice(t,1)}}function Of(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}class rr extends ba{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Pf,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Pf(e),this._firestoreClient=void 0,await e}}}function xb(r,e){const t=typeof r=="object"?r:ga(),n=typeof r=="string"?r:jo,s=sr(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=DC("firestore");i&&xw(s,...i)}return s}function qi(r){if(r._terminated)throw new J(k.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||HT(r),r._firestoreClient}function HT(r){var n,s,i,o;const e=r._freezeSettings(),t=Rw(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,e);r._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new NT(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(u){const c=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(c),_online:c}})(r._componentsProvider))}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc extends UT{constructor(e){super(),this.firestore=e}convertBytes(e){return new Tt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Fe(this.firestore,null,t)}}class ei{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Tr extends Mp{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Fo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Nr("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new J(k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Tr._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Tr._jsonSchemaVersion="firestore/documentSnapshot/1.0",Tr._jsonSchema={type:Ve("string",Tr._jsonSchemaVersion),bundleSource:Ve("string","DocumentSnapshot"),bundleName:Ve("string"),bundle:Ve("string")};class Fo extends Tr{data(e={}){return super.data(e)}}class Ar{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ei(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new Fo(this._firestore,this._userDataWriter,n.key,n,new ei(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new J(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((B=>{qe(s._snapshot.query)?lu(s._snapshot.query):xu(s.query._query);const u=new Fo(s._firestore,s._userDataWriter,B.doc.key,B.doc,new ei(s._snapshot.mutatedKeys.has(B.doc.key),s._snapshot.fromCache),s.query.converter);return B.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((B=>i||B.type!==3)).map((B=>{const u=new Fo(s._firestore,s._userDataWriter,B.doc.key,B.doc,new ei(s._snapshot.mutatedKeys.has(B.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,h=-1;return B.type!==0&&(c=o.indexOf(B.doc.key),o=o.delete(B.doc.key)),B.type!==1&&(o=o.add(B.doc),h=o.indexOf(B.doc.key)),{type:jT(B.type),doc:u,oldIndex:c,newIndex:h}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new J(k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ar._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ru.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function jT(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee(61501,{type:r})}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ar._jsonSchemaVersion="firestore/querySnapshot/1.0",Ar._jsonSchema={type:Ve("string",Ar._jsonSchemaVersion),bundleSource:Ve("string","QuerySnapshot"),bundleName:Ve("string"),bundle:Ve("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new J(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Tc{}class JT extends Tc{}function kb(r,e,...t){let n=[];e instanceof Tc&&n.push(e),n=n.concat(t),(function(i){const o=i.filter((u=>u instanceof Ac)).length,B=i.filter((u=>u instanceof Ga)).length;if(o>1||o>0&&B>0)throw new J(k.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class Ga extends JT{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Ga(e,t,n)}_apply(e){const t=this._parse(e);return Hp(e._query,t),new Jr(e.firestore,e.converter,ru(e._query,t))}_parse(e){const t=zu(e.firestore);return(function(i,o,B,u,c,h,C){let d;if((function(b,F){if(typeof b=="number"&&isNaN(b)&&F!=="=="&&F!=="!="&&F!=="array-contains")throw new Error("Invalid query. You can only perform '==' and '!=' comparisons on NaN.");if(b===null&&F!=="=="&&F!=="!="&&F!=="array-contains")throw new Error("Invalid query. You can only perform '==' and '!=' comparisons on Null.")})(C,h),c.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new J(k.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){Nf(C,h);const D=[];for(const b of C)D.push(Sf(u,i,b));d={arrayValue:{values:D}}}else d=Sf(u,i,C)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||Nf(C,h),d=Hw(B,o,C,h==="in"||h==="not-in");return Ue.create(c,h,d)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Vb(r,e,t){const n=e,s=Nr("where",r);return Ga._create(s,n,t)}class Ac extends Tc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ac(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:Kt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const B=i.getFlattenedFilters();for(const u of B)Hp(o,u),o=ru(o,u)})(e._query,t),new Jr(e.firestore,e.converter,ru(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Sf(r,e,t){if(typeof(t=be(t))=="string"){if(t==="")throw new J(k.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Rd(e)&&t.indexOf("/")!==-1)throw new J(k.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(ge.fromString(t));if(!Y.isDocumentKey(n))throw new J(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return zh(r,new Y(n))}if(t instanceof Fe)return zh(r,t._key);throw new J(k.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ma(t)}.`)}function Nf(r,e){if(!Array.isArray(r)||r.length===0)throw new J(k.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Hp(r,e){const t=(function(s,i){for(const o of s)for(const B of o.getFlattenedFilters())if(i.indexOf(B.op)>=0)return B.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new J(k.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new J(k.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ff(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qT{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=zu(e)}set(e,t,n){this._verifyNotCommitted();const s=FB(e,this._firestore),i=Gp(s.converter,t,n),o=Qd(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(o.toMutation(s._key,Pt.none())),this}update(e,t,n,...s){this._verifyNotCommitted();const i=FB(e,this._firestore);let o;return o=typeof(t=be(t))=="string"||t instanceof Ra?Uw(this._dataReader,"WriteBatch.update",i._key,t,n,s):Gw(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,Pt.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=FB(e,this._firestore);return this._mutations=this._mutations.concat(new Ia(t._key,Pt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new J(k.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function FB(r,e){if((r=be(r)).firestore!==e)throw new J(k.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mb(r){r=xt(r,Fe);const e=xt(r.firestore,rr),t=qi(e);return kT(t,r._key).then((n=>jp(e,r,n)))}function Gb(r){r=xt(r,Jr);const e=xt(r.firestore,rr),t=qi(e),n=new yc(e);return Up(r._query),VT(t,r._query).then((s=>new Ar(e,n,r,s)))}function Ub(r,e,t){r=xt(r,Fe);const n=xt(r.firestore,rr),s=Gp(r.converter,e,t),i=zu(n);return Rc(n,[Qd(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,Pt.none())])}function Hb(r){return Rc(xt(r.firestore,rr),[new Ia(r._key,Pt.none())])}function jb(r,...e){var c,h,C;r=be(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||Ff(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Ff(e[n])){const d=e[n];e[n]=(c=d.next)==null?void 0:c.bind(d),e[n+1]=(h=d.error)==null?void 0:h.bind(d),e[n+2]=(C=d.complete)==null?void 0:C.bind(d)}let i,o,B;if(r instanceof Fe)o=xt(r.firestore,rr),B=ya(r._key.path),i={next:d=>{e[n]&&e[n](jp(o,r,d))},error:e[n+1],complete:e[n+2]};else{const d=xt(r,Jr);o=xt(d.firestore,rr),B=d._query;const E=new yc(o);i={next:D=>{e[n]&&e[n](new Ar(o,E,d,D))},error:e[n+1],complete:e[n+2]},Up(r._query)}const u=qi(o);return xT(u,B,s,i)}function Rc(r,e){const t=qi(r);return MT(t,e)}function jp(r,e,t){const n=t.docs.get(e._key),s=new yc(r);return new Tr(r,s,e._key,n,new ei(t.hasPendingWrites,t.fromCache),e.converter)}function Jb(r){return r=xt(r,rr),qi(r),new qT(r,(e=>Rc(r,e)))}const Lf="@firebase/firestore",xf="4.19.1";(function(e,t=!0){Y_(Ur),Jt(new kt("firestore",((n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),B=new rr(new hw(n.getProvider("auth-internal")),new dw(o,n.getProvider("app-check-internal")),oD(o,s),o);return i={useFetchStreams:t,...i},B._setSettings(i),B}),"PUBLIC").setMultipleInstances(!0)),gt(Lf,xf,e),gt(Lf,xf,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp="firebasestorage.googleapis.com",qp="storageBucket",KT=120*1e3,zT=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe extends Gt{constructor(e,t,n=0){super(LB(e),`Firebase Storage: ${t} (${LB(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,xe.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return LB(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Le;(function(r){r.UNKNOWN="unknown",r.OBJECT_NOT_FOUND="object-not-found",r.BUCKET_NOT_FOUND="bucket-not-found",r.PROJECT_NOT_FOUND="project-not-found",r.QUOTA_EXCEEDED="quota-exceeded",r.UNAUTHENTICATED="unauthenticated",r.UNAUTHORIZED="unauthorized",r.UNAUTHORIZED_APP="unauthorized-app",r.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",r.INVALID_CHECKSUM="invalid-checksum",r.CANCELED="canceled",r.INVALID_EVENT_NAME="invalid-event-name",r.INVALID_URL="invalid-url",r.INVALID_DEFAULT_BUCKET="invalid-default-bucket",r.NO_DEFAULT_BUCKET="no-default-bucket",r.CANNOT_SLICE_BLOB="cannot-slice-blob",r.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",r.NO_DOWNLOAD_URL="no-download-url",r.INVALID_ARGUMENT="invalid-argument",r.INVALID_ARGUMENT_COUNT="invalid-argument-count",r.APP_DELETED="app-deleted",r.INVALID_ROOT_OPERATION="invalid-root-operation",r.INVALID_FORMAT="invalid-format",r.INTERNAL_ERROR="internal-error",r.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Le||(Le={}));function LB(r){return"storage/"+r}function vc(){const r="An unknown error occurred, please check the error payload for server response.";return new xe(Le.UNKNOWN,r)}function WT(r){return new xe(Le.OBJECT_NOT_FOUND,"Object '"+r+"' does not exist.")}function $T(r){return new xe(Le.QUOTA_EXCEEDED,"Quota for bucket '"+r+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function QT(){const r="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new xe(Le.UNAUTHENTICATED,r)}function YT(){return new xe(Le.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function XT(r){return new xe(Le.UNAUTHORIZED,"User does not have permission to access '"+r+"'.")}function ZT(){return new xe(Le.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function e0(){return new xe(Le.CANCELED,"User canceled the upload/download.")}function t0(r){return new xe(Le.INVALID_URL,"Invalid URL '"+r+"'.")}function n0(r){return new xe(Le.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.")}function r0(){return new xe(Le.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+qp+"' property when initializing the app?")}function s0(){return new xe(Le.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function i0(){return new xe(Le.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function o0(r){return new xe(Le.UNSUPPORTED_ENVIRONMENT,`${r} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function gu(r){return new xe(Le.INVALID_ARGUMENT,r)}function Kp(){return new xe(Le.APP_DELETED,"The Firebase app was deleted.")}function a0(r){return new xe(Le.INVALID_ROOT_OPERATION,"The operation '"+r+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function ui(r,e){return new xe(Le.INVALID_FORMAT,"String does not match format '"+r+"': "+e)}function zs(r){throw new xe(Le.INTERNAL_ERROR,"Internal error: "+r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=vt.makeFromUrl(e,t)}catch{return new vt(e,"")}if(n.path==="")return n;throw n0(e)}static makeFromUrl(e,t){let n=null;const s="([A-Za-z0-9.\\-_]+)";function i(ce){ce.path.charAt(ce.path.length-1)==="/"&&(ce.path_=ce.path_.slice(0,-1))}const o="(/(.*))?$",B=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function c(ce){ce.path_=decodeURIComponent(ce.path)}const h="v[A-Za-z0-9_]+",C=t.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",E=new RegExp(`^https?://${C}/${h}/b/${s}/o${d}`,"i"),D={bucket:1,path:3},b=t===Jp?"(?:storage.googleapis.com|storage.cloud.google.com)":t,F="([^?#]*)",U=new RegExp(`^https?://${b}/${s}/${F}`,"i"),re=[{regex:B,indices:u,postModify:i},{regex:E,indices:D,postModify:c},{regex:U,indices:{bucket:1,path:2},postModify:c}];for(let ce=0;ce<re.length;ce++){const Ee=re[ce],_e=Ee.regex.exec(e);if(_e){const R=_e[Ee.indices.bucket];let _=_e[Ee.indices.path];_||(_=""),n=new vt(R,_),Ee.postModify(n);break}}if(n==null)throw t0(e);return n}}class B0{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function u0(r,e,t){let n=1,s=null,i=null,o=!1,B=0;function u(){return B===2}let c=!1;function h(...F){c||(c=!0,e.apply(null,F))}function C(F){s=setTimeout(()=>{s=null,r(E,u())},F)}function d(){i&&clearTimeout(i)}function E(F,...U){if(c){d();return}if(F){d(),h.call(null,F,...U);return}if(u()||o){d(),h.call(null,F,...U);return}n<64&&(n*=2);let re;B===1?(B=2,re=0):re=(n+Math.random())*1e3,C(re)}let D=!1;function b(F){D||(D=!0,d(),!c&&(s!==null?(F||(B=2),clearTimeout(s),C(0)):F||(B=1)))}return C(0),i=setTimeout(()=>{o=!0,b(!0)},t),b}function c0(r){r(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l0(r){return r!==void 0}function h0(r){return typeof r=="object"&&!Array.isArray(r)}function bc(r){return typeof r=="string"||r instanceof String}function kf(r){return Pc()&&r instanceof Blob}function Pc(){return typeof Blob<"u"}function Vf(r,e,t,n){if(n<e)throw gu(`Invalid value for '${r}'. Expected ${e} or greater.`);if(n>t)throw gu(`Invalid value for '${r}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oc(r,e,t){let n=e;return t==null&&(n=`https://${e}`),`${t}://${n}/v0${r}`}function zp(r){const e=encodeURIComponent;let t="?";for(const n in r)if(r.hasOwnProperty(n)){const s=e(n)+"="+e(r[n]);t=t+s+"&"}return t=t.slice(0,-1),t}var Rr;(function(r){r[r.NO_ERROR=0]="NO_ERROR",r[r.NETWORK_ERROR=1]="NETWORK_ERROR",r[r.ABORT=2]="ABORT"})(Rr||(Rr={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f0(r,e){const t=r>=500&&r<600,s=[408,429].indexOf(r)!==-1,i=e.indexOf(r)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C0{constructor(e,t,n,s,i,o,B,u,c,h,C,d=!0,E=!1){this.url_=e,this.method_=t,this.headers_=n,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=B,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=h,this.connectionFactory_=C,this.retry=d,this.isUsingEmulator=E,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((D,b)=>{this.resolve_=D,this.reject_=b,this.start_()})}start_(){const e=(n,s)=>{if(s){n(!1,new Io(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=B=>{const u=B.loaded,c=B.lengthComputable?B.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const B=i.getErrorCode()===Rr.NO_ERROR,u=i.getStatus();if(!B||f0(u,this.additionalRetryCodes_)&&this.retry){const h=i.getErrorCode()===Rr.ABORT;n(!1,new Io(!1,null,h));return}const c=this.successCodes_.indexOf(u)!==-1;n(!0,new Io(c,i))})},t=(n,s)=>{const i=this.resolve_,o=this.reject_,B=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(B,B.getResponse());l0(u)?i(u):i()}catch(u){o(u)}else if(B!==null){const u=vc();u.serverResponse=B.getErrorText(),this.errorCallback_?o(this.errorCallback_(B,u)):o(u)}else if(s.canceled){const u=this.appDelete_?Kp():e0();o(u)}else{const u=ZT();o(u)}};this.canceled_?t(!1,new Io(!1,null,!0)):this.backoffId_=u0(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&c0(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Io{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function d0(r,e){e!==null&&e.length>0&&(r.Authorization="Firebase "+e)}function p0(r,e){r["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function g0(r,e){e&&(r["X-Firebase-GMPID"]=e)}function m0(r,e){e!==null&&(r["X-Firebase-AppCheck"]=e)}function E0(r,e,t,n,s,i,o=!0,B=!1){const u=zp(r.urlParams),c=r.url+u,h=Object.assign({},r.headers);return g0(h,e),d0(h,t),p0(h,i),m0(h,n),new C0(c,r.method,h,r.body,r.successCodes,r.additionalRetryCodes,r.handler,r.errorHandler,r.timeout,r.progressCallback,s,o,B)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _0(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function D0(...r){const e=_0();if(e!==void 0){const t=new e;for(let n=0;n<r.length;n++)t.append(r[n]);return t.getBlob()}else{if(Pc())return new Blob(r);throw new xe(Le.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function w0(r,e,t){return r.webkitSlice?r.webkitSlice(e,t):r.mozSlice?r.mozSlice(e,t):r.slice?r.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I0(r){if(typeof atob>"u")throw o0("base-64");return atob(r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class xB{constructor(e,t){this.data=e,this.contentType=t||null}}function y0(r,e){switch(r){case en.RAW:return new xB(Wp(e));case en.BASE64:case en.BASE64URL:return new xB($p(r,e));case en.DATA_URL:return new xB(A0(e),R0(e))}throw vc()}function Wp(r){const e=[];for(let t=0;t<r.length;t++){let n=r.charCodeAt(t);if(n<=127)e.push(n);else if(n<=2047)e.push(192|n>>6,128|n&63);else if((n&64512)===55296)if(!(t<r.length-1&&(r.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=n,o=r.charCodeAt(++t);n=65536|(i&1023)<<10|o&1023,e.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|n&63)}else(n&64512)===56320?e.push(239,191,189):e.push(224|n>>12,128|n>>6&63,128|n&63)}return new Uint8Array(e)}function T0(r){let e;try{e=decodeURIComponent(r)}catch{throw ui(en.DATA_URL,"Malformed data URL.")}return Wp(e)}function $p(r,e){switch(r){case en.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw ui(r,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case en.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw ui(r,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=I0(e)}catch(s){throw s.message.includes("polyfill")?s:ui(r,"Invalid character found")}const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}class Qp{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw ui(en.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;n!=null&&(this.base64=v0(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}function A0(r){const e=new Qp(r);return e.base64?$p(en.BASE64,e.rest):T0(e.rest)}function R0(r){return new Qp(r).contentType}function v0(r,e){return r.length>=e.length?r.substring(r.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t){let n=0,s="";kf(e)?(this.data_=e,n=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(kf(this.data_)){const n=this.data_,s=w0(n,e,t);return s===null?null:new Sn(s)}else{const n=new Uint8Array(this.data_.buffer,e,t-e);return new Sn(n,!0)}}static getBlob(...e){if(Pc()){const t=e.map(n=>n instanceof Sn?n.data_:n);return new Sn(D0.apply(null,t))}else{const t=e.map(o=>bc(o)?y0(en.RAW,o).data:o.data_);let n=0;t.forEach(o=>{n+=o.byteLength});const s=new Uint8Array(n);let i=0;return t.forEach(o=>{for(let B=0;B<o.length;B++)s[i++]=o[B]}),new Sn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yp(r){let e;try{e=JSON.parse(r)}catch{return null}return h0(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b0(r){if(r.length===0)return null;const e=r.lastIndexOf("/");return e===-1?"":r.slice(0,e)}function P0(r,e){const t=e.split("/").filter(n=>n.length>0).join("/");return r.length===0?t:r+"/"+t}function Xp(r){const e=r.lastIndexOf("/",r.length-2);return e===-1?r:r.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O0(r,e){return e}class Bt{constructor(e,t,n,s){this.server=e,this.local=t||e,this.writable=!!n,this.xform=s||O0}}let yo=null;function S0(r){return!bc(r)||r.length<2?r:Xp(r)}function Zp(){if(yo)return yo;const r=[];r.push(new Bt("bucket")),r.push(new Bt("generation")),r.push(new Bt("metageneration")),r.push(new Bt("name","fullPath",!0));function e(i,o){return S0(o)}const t=new Bt("name");t.xform=e,r.push(t);function n(i,o){return o!==void 0?Number(o):o}const s=new Bt("size");return s.xform=n,r.push(s),r.push(new Bt("timeCreated")),r.push(new Bt("updated")),r.push(new Bt("md5Hash",null,!0)),r.push(new Bt("cacheControl",null,!0)),r.push(new Bt("contentDisposition",null,!0)),r.push(new Bt("contentEncoding",null,!0)),r.push(new Bt("contentLanguage",null,!0)),r.push(new Bt("contentType",null,!0)),r.push(new Bt("metadata","customMetadata",!0)),yo=r,yo}function N0(r,e){function t(){const n=r.bucket,s=r.fullPath,i=new vt(n,s);return e._makeStorageReference(i)}Object.defineProperty(r,"ref",{get:t})}function F0(r,e,t){const n={};n.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];n[o.local]=o.xform(n,e[o.server])}return N0(n,r),n}function eg(r,e,t){const n=Yp(e);return n===null?null:F0(r,n,t)}function L0(r,e,t,n){const s=Yp(e);if(s===null||!bc(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(c=>{const h=r.bucket,C=r.fullPath,d="/b/"+o(h)+"/o/"+o(C),E=Oc(d,t,n),D=zp({alt:"media",token:c});return E+D})[0]}function x0(r,e){const t={},n=e.length;for(let s=0;s<n;s++){const i=e[s];i.writable&&(t[i.server]=r[i.local])}return JSON.stringify(t)}class tg{constructor(e,t,n,s){this.url=e,this.method=t,this.handler=n,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ng(r){if(!r)throw vc()}function k0(r,e){function t(n,s){const i=eg(r,s,e);return ng(i!==null),i}return t}function V0(r,e){function t(n,s){const i=eg(r,s,e);return ng(i!==null),L0(i,s,r.host,r._protocol)}return t}function rg(r){function e(t,n){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=YT():s=QT():t.getStatus()===402?s=$T(r.bucket):t.getStatus()===403?s=XT(r.path):s=n,s.status=t.getStatus(),s.serverResponse=n.serverResponse,s}return e}function M0(r){const e=rg(r);function t(n,s){let i=e(n,s);return n.getStatus()===404&&(i=WT(r.path)),i.serverResponse=s.serverResponse,i}return t}function G0(r,e,t){const n=e.fullServerUrl(),s=Oc(n,r.host,r._protocol),i="GET",o=r.maxOperationRetryTime,B=new tg(s,i,V0(r,t),o);return B.errorHandler=M0(e),B}function U0(r,e){return r&&r.contentType||e&&e.type()||"application/octet-stream"}function H0(r,e,t){const n=Object.assign({},t);return n.fullPath=r.path,n.size=e.size(),n.contentType||(n.contentType=U0(null,e)),n}function j0(r,e,t,n,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function B(){let re="";for(let ce=0;ce<2;ce++)re=re+Math.random().toString().slice(2);return re}const u=B();o["Content-Type"]="multipart/related; boundary="+u;const c=H0(e,n,s),h=x0(c,t),C="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+u+`\r
Content-Type: `+c.contentType+`\r
\r
`,d=`\r
--`+u+"--",E=Sn.getBlob(C,n,d);if(E===null)throw s0();const D={name:c.fullPath},b=Oc(i,r.host,r._protocol),F="POST",U=r.maxUploadRetryTime,K=new tg(b,F,k0(r,t),U);return K.urlParams=D,K.headers=o,K.body=E.uploadData(),K.errorHandler=rg(e),K}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J0{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Rr.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Rr.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Rr.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,s,i){if(this.sent_)throw zs("cannot .send() more than once");if(Gr(e)&&n&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw zs("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw zs("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw zs("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw zs("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class q0 extends J0{initXhr(){this.xhr_.responseType="text"}}function sg(){return new q0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(e,t){this._service=e,t instanceof vt?this._location=t:this._location=vt.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Lr(e,t)}get root(){const e=new vt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Xp(this._location.path)}get storage(){return this._service}get parent(){const e=b0(this._location.path);if(e===null)return null;const t=new vt(this._location.bucket,e);return new Lr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw a0(e)}}function K0(r,e,t){r._throwIfRoot("uploadBytes");const n=j0(r.storage,r._location,Zp(),new Sn(e,!0),t);return r.storage.makeRequestWithTokens(n,sg).then(s=>({metadata:s,ref:r}))}function z0(r){r._throwIfRoot("getDownloadURL");const e=G0(r.storage,r._location,Zp());return r.storage.makeRequestWithTokens(e,sg).then(t=>{if(t===null)throw i0();return t})}function W0(r,e){const t=P0(r._location.path,e),n=new vt(r._location.bucket,t);return new Lr(r.storage,n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $0(r){return/^[A-Za-z]+:\/\//.test(r)}function Q0(r,e){return new Lr(r,e)}function ig(r,e){if(r instanceof Sc){const t=r;if(t._bucket==null)throw r0();const n=new Lr(t,t._bucket);return e!=null?ig(n,e):n}else return e!==void 0?W0(r,e):r}function Y0(r,e){if(e&&$0(e)){if(r instanceof Sc)return Q0(r,e);throw gu("To use ref(service, url), the first argument must be a Storage instance.")}else return ig(r,e)}function Mf(r,e){const t=e==null?void 0:e[qp];return t==null?null:vt.makeFromBucketSpec(t,r)}function X0(r,e,t,n={}){r.host=`${e}:${t}`;const s=Gr(e);s&&Du(`https://${r.host}/b`).catch(()=>{}),r._isUsingEmulator=!0,r._protocol=s?"https":"http";const{mockUserToken:i}=n;i&&(r._overrideAuthToken=typeof i=="string"?i:TC(i,r.app.options.projectId))}class Sc{constructor(e,t,n,s,i,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=Jp,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=KT,this._maxUploadRetryTime=zT,this._requests=new Set,s!=null?this._bucket=vt.makeFromBucketSpec(s,this._host):this._bucket=Mf(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=vt.makeFromBucketSpec(this._url,e):this._bucket=Mf(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Vf("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Vf("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Lt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Lr(this,e)}_makeRequest(e,t,n,s,i=!0){if(this._deleted)return new B0(Kp());{const o=E0(e,this._appId,n,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[n,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,s).getPromise()}}const Gf="@firebase/storage",Uf="0.14.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const og="storage";function qb(r,e,t){return r=be(r),K0(r,e,t)}function Kb(r){return r=be(r),z0(r)}function zb(r,e){return r=be(r),Y0(r,e)}function Wb(r=ga(),e){r=be(r);const n=sr(r,og).getImmediate({identifier:e}),s=DC("storage");return s&&Z0(n,...s),n}function Z0(r,e,t,n={}){X0(r,e,t,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eA(r,{instanceIdentifier:e}){const t=r.getProvider("app").getImmediate(),n=r.getProvider("auth-internal"),s=r.getProvider("app-check-internal");return new Sc(t,n,s,e,Ur)}function tA(){Jt(new kt(og,eA,"PUBLIC").setMultipleInstances(!0)),gt(Gf,Uf,""),gt(Gf,Uf,"esm2020")}tA();const ag="@firebase/installations",Nc="0.6.24";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bg=1e4,ug=`w:${Nc}`,cg="FIS_v2",nA="https://firebaseinstallations.googleapis.com/v1",rA=3600*1e3,sA="installations",iA="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oA={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},xr=new Mr(sA,iA,oA);function lg(r){return r instanceof Gt&&r.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hg({projectId:r}){return`${nA}/projects/${r}/installations`}function fg(r){return{token:r.token,requestStatus:2,expiresIn:BA(r.expiresIn),creationTime:Date.now()}}async function Cg(r,e){const n=(await e.json()).error;return xr.create("request-failed",{requestName:r,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function dg({apiKey:r}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":r})}function aA(r,{refreshToken:e}){const t=dg(r);return t.append("Authorization",uA(e)),t}async function pg(r){const e=await r();return e.status>=500&&e.status<600?r():e}function BA(r){return Number(r.replace("s","000"))}function uA(r){return`${cg} ${r}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cA({appConfig:r,heartbeatServiceProvider:e},{fid:t}){const n=hg(r),s=dg(r),i=e.getImmediate({optional:!0});if(i){const c=await i.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={fid:t,authVersion:cg,appId:r.appId,sdkVersion:ug},B={method:"POST",headers:s,body:JSON.stringify(o)},u=await pg(()=>fetch(n,B));if(u.ok){const c=await u.json();return{fid:c.fid||t,registrationStatus:2,refreshToken:c.refreshToken,authToken:fg(c.authToken)}}else throw await Cg("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(r){return new Promise(e=>{setTimeout(e,r)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lA(r){return btoa(String.fromCharCode(...r)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hA=/^[cdef][\w-]{21}$/,mu="";function fA(){try{const r=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(r),r[0]=112+r[0]%16;const t=CA(r);return hA.test(t)?t:mu}catch{return mu}}function CA(r){return lA(r).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(r){return`${r.appName}!${r.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg=new Map;function Eg(r,e){const t=Ua(r);_g(t,e),dA(t,e)}function _g(r,e){const t=mg.get(r);if(t)for(const n of t)n(e)}function dA(r,e){const t=pA();t&&t.postMessage({key:r,fid:e}),gA()}let _r=null;function pA(){return!_r&&"BroadcastChannel"in self&&(_r=new BroadcastChannel("[Firebase] FID Change"),_r.onmessage=r=>{_g(r.data.key,r.data.fid)}),_r}function gA(){mg.size===0&&_r&&(_r.close(),_r=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mA="firebase-installations-database",EA=1,kr="firebase-installations-store";let kB=null;function Fc(){return kB||(kB=OC(mA,EA,{upgrade:(r,e)=>{switch(e){case 0:r.createObjectStore(kr)}}})),kB}async function aa(r,e){const t=Ua(r),s=(await Fc()).transaction(kr,"readwrite"),i=s.objectStore(kr),o=await i.get(t);return await i.put(e,t),await s.done,(!o||o.fid!==e.fid)&&Eg(r,e.fid),e}async function Dg(r){const e=Ua(r),n=(await Fc()).transaction(kr,"readwrite");await n.objectStore(kr).delete(e),await n.done}async function Ha(r,e){const t=Ua(r),s=(await Fc()).transaction(kr,"readwrite"),i=s.objectStore(kr),o=await i.get(t),B=e(o);return B===void 0?await i.delete(t):await i.put(B,t),await s.done,B&&(!o||o.fid!==B.fid)&&Eg(r,B.fid),B}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lc(r){let e;const t=await Ha(r.appConfig,n=>{const s=_A(n),i=DA(r,s);return e=i.registrationPromise,i.installationEntry});return t.fid===mu?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function _A(r){const e=r||{fid:fA(),registrationStatus:0};return wg(e)}function DA(r,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(xr.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},n=wA(r,t);return{installationEntry:t,registrationPromise:n}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:IA(r)}:{installationEntry:e}}async function wA(r,e){try{const t=await cA(r,e);return aa(r.appConfig,t)}catch(t){throw lg(t)&&t.customData.serverCode===409?await Dg(r.appConfig):await aa(r.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function IA(r){let e=await Hf(r.appConfig);for(;e.registrationStatus===1;)await gg(100),e=await Hf(r.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:n}=await Lc(r);return n||t}return e}function Hf(r){return Ha(r,e=>{if(!e)throw xr.create("installation-not-found");return wg(e)})}function wg(r){return yA(r)?{fid:r.fid,registrationStatus:0}:r}function yA(r){return r.registrationStatus===1&&r.registrationTime+Bg<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TA({appConfig:r,heartbeatServiceProvider:e},t){const n=AA(r,t),s=aA(r,t),i=e.getImmediate({optional:!0});if(i){const c=await i.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={installation:{sdkVersion:ug,appId:r.appId}},B={method:"POST",headers:s,body:JSON.stringify(o)},u=await pg(()=>fetch(n,B));if(u.ok){const c=await u.json();return fg(c)}else throw await Cg("Generate Auth Token",u)}function AA(r,{fid:e}){return`${hg(r)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xc(r,e=!1){let t;const n=await Ha(r.appConfig,i=>{if(!Ig(i))throw xr.create("not-registered");const o=i.authToken;if(!e&&bA(o))return i;if(o.requestStatus===1)return t=RA(r,e),i;{if(!navigator.onLine)throw xr.create("app-offline");const B=OA(i);return t=vA(r,B),B}});return t?await t:n.authToken}async function RA(r,e){let t=await jf(r.appConfig);for(;t.authToken.requestStatus===1;)await gg(100),t=await jf(r.appConfig);const n=t.authToken;return n.requestStatus===0?xc(r,e):n}function jf(r){return Ha(r,e=>{if(!Ig(e))throw xr.create("not-registered");const t=e.authToken;return SA(t)?{...e,authToken:{requestStatus:0}}:e})}async function vA(r,e){try{const t=await TA(r,e),n={...e,authToken:t};return await aa(r.appConfig,n),t}catch(t){if(lg(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Dg(r.appConfig);else{const n={...e,authToken:{requestStatus:0}};await aa(r.appConfig,n)}throw t}}function Ig(r){return r!==void 0&&r.registrationStatus===2}function bA(r){return r.requestStatus===2&&!PA(r)}function PA(r){const e=Date.now();return e<r.creationTime||r.creationTime+r.expiresIn<e+rA}function OA(r){const e={requestStatus:1,requestTime:Date.now()};return{...r,authToken:e}}function SA(r){return r.requestStatus===1&&r.requestTime+Bg<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NA(r){const e=r,{installationEntry:t,registrationPromise:n}=await Lc(e);return n?n.catch(console.error):xc(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FA(r,e=!1){const t=r;return await LA(t),(await xc(t,e)).token}async function LA(r){const{registrationPromise:e}=await Lc(r);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xA(r){if(!r||!r.options)throw VB("App Configuration");if(!r.name)throw VB("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!r.options[t])throw VB(t);return{appName:r.name,projectId:r.options.projectId,apiKey:r.options.apiKey,appId:r.options.appId}}function VB(r){return xr.create("missing-app-config-values",{valueName:r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yg="installations",kA="installations-internal",VA=r=>{const e=r.getProvider("app").getImmediate(),t=xA(e),n=sr(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},MA=r=>{const e=r.getProvider("app").getImmediate(),t=sr(e,yg).getImmediate();return{getId:()=>NA(t),getToken:s=>FA(t,s)}};function GA(){Jt(new kt(yg,VA,"PUBLIC")),Jt(new kt(kA,MA,"PRIVATE"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */GA();gt(ag,Nc);gt(ag,Nc,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba="analytics",UA="firebase_id",HA="origin",jA=60*1e3,JA="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",kc="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=new pa("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qA={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Ot=new Mr("analytics","Analytics",qA);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KA(r){if(!r.startsWith(kc)){const e=Ot.create("invalid-gtag-resource",{gtagURL:r});return ht.warn(e.message),""}return r}function Tg(r){return Promise.all(r.map(e=>e.catch(t=>t)))}function zA(r,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(r,e)),t}function WA(r,e){const t=zA("firebase-js-sdk-policy",{createScriptURL:KA}),n=document.createElement("script"),s=`${kc}?l=${r}&id=${e}`;n.src=t?t==null?void 0:t.createScriptURL(s):s,n.async=!0,document.head.appendChild(n)}function $A(r){let e=[];return Array.isArray(window[r])?e=window[r]:window[r]=e,e}async function QA(r,e,t,n,s,i){const o=n[s];try{if(o)await e[o];else{const u=(await Tg(t)).find(c=>c.measurementId===s);u&&await e[u.appId]}}catch(B){ht.error(B)}r("config",s,i)}async function YA(r,e,t,n,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const B=await Tg(t);for(const u of o){const c=B.find(C=>C.measurementId===u),h=c&&e[c.appId];if(h)i.push(h);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),r("event",n,s||{})}catch(i){ht.error(i)}}function XA(r,e,t,n){async function s(i,...o){try{if(i==="event"){const[B,u]=o;await YA(r,e,t,B,u)}else if(i==="config"){const[B,u]=o;await QA(r,e,t,n,B,u)}else if(i==="consent"){const[B,u]=o;r("consent",B,u)}else if(i==="get"){const[B,u,c]=o;r("get",B,u,c)}else if(i==="set"){const[B]=o;r("set",B)}else r(i,...o)}catch(B){ht.error(B)}}return s}function ZA(r,e,t,n,s){let i=function(...o){window[n].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=XA(i,r,e,t),{gtagCore:i,wrappedGtag:window[s]}}function eR(r){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(kc)&&t.src.includes(r))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tR=30,nR=1e3;class rR{constructor(e={},t=nR){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Ag=new rR;function sR(r){return new Headers({Accept:"application/json","x-goog-api-key":r})}async function iR(r){var o;const{appId:e,apiKey:t}=r,n={method:"GET",headers:sR(t)},s=JA.replace("{app-id}",e),i=await fetch(s,n);if(i.status!==200&&i.status!==304){let B="";try{const u=await i.json();(o=u.error)!=null&&o.message&&(B=u.error.message)}catch{}throw Ot.create("config-fetch-failed",{httpStatus:i.status,responseMessage:B})}return i.json()}async function oR(r,e=Ag,t){const{appId:n,apiKey:s,measurementId:i}=r.options;if(!n)throw Ot.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:n};throw Ot.create("no-api-key")}const o=e.getThrottleMetadata(n)||{backoffCount:0,throttleEndTimeMillis:Date.now()},B=new uR;return setTimeout(async()=>{B.abort()},jA),Rg({appId:n,apiKey:s,measurementId:i},o,B,e)}async function Rg(r,{throttleEndTimeMillis:e,backoffCount:t},n,s=Ag){var B;const{appId:i,measurementId:o}=r;try{await aR(n,e)}catch(u){if(o)return ht.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:i,measurementId:o};throw u}try{const u=await iR(r);return s.deleteThrottleMetadata(i),u}catch(u){const c=u;if(!BR(c)){if(s.deleteThrottleMetadata(i),o)return ht.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:i,measurementId:o};throw u}const h=Number((B=c==null?void 0:c.customData)==null?void 0:B.httpStatus)===503?Yl(t,s.intervalMillis,tR):Yl(t,s.intervalMillis),C={throttleEndTimeMillis:Date.now()+h,backoffCount:t+1};return s.setThrottleMetadata(i,C),ht.debug(`Calling attemptFetch again in ${h} millis`),Rg(r,C,n,s)}}function aR(r,e){return new Promise((t,n)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(t,s);r.addEventListener(()=>{clearTimeout(i),n(Ot.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function BR(r){if(!(r instanceof Gt)||!r.customData)return!1;const e=Number(r.customData.httpStatus);return e===429||e===500||e===503||e===504}class uR{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function cR(r,e,t,n,s){if(s&&s.global){r("event",t,n);return}else{const i=await e,o={...n,send_to:i};r("event",t,o)}}async function lR(r,e,t,n){if(n&&n.global){const s={};for(const i of Object.keys(t))s[`user_properties.${i}`]=t[i];return r("set",s),Promise.resolve()}else{const s=await e;r("config",s,{update:!0,user_properties:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hR(){if(RC())try{await vC()}catch(r){return ht.warn(Ot.create("indexeddb-unavailable",{errorInfo:r==null?void 0:r.toString()}).message),!1}else return ht.warn(Ot.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function fR(r,e,t,n,s,i,o){const B=oR(r);B.then(d=>{t[d.measurementId]=d.appId,r.options.measurementId&&d.measurementId!==r.options.measurementId&&ht.warn(`The measurement ID in the local Firebase config (${r.options.measurementId}) does not match the measurement ID fetched from the server (${d.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(d=>ht.error(d)),e.push(B);const u=hR().then(d=>{if(d)return n.getId()}),[c,h]=await Promise.all([B,u]);eR(i)||WA(i,c.measurementId),s("js",new Date);const C=(o==null?void 0:o.config)??{};return C[HA]="firebase",C.update=!0,h!=null&&(C[UA]=h),s("config",c.measurementId,C),c.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CR{constructor(e){this.app=e}_delete(){return delete Bs[this.app.options.appId],Promise.resolve()}}let Bs={},Jf=[];const qf={};let MB="dataLayer",dR="gtag",Kf,Vc,zf=!1;function pR(){const r=[];if(AC()&&r.push("This is a browser extension environment."),nE()||r.push("Cookies are not available."),r.length>0){const e=r.map((n,s)=>`(${s+1}) ${n}`).join(" "),t=Ot.create("invalid-analytics-context",{errorInfo:e});ht.warn(t.message)}}function gR(r,e,t){pR();const n=r.options.appId;if(!n)throw Ot.create("no-app-id");if(!r.options.apiKey)if(r.options.measurementId)ht.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${r.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Ot.create("no-api-key");if(Bs[n]!=null)throw Ot.create("already-exists",{id:n});if(!zf){$A(MB);const{wrappedGtag:i,gtagCore:o}=ZA(Bs,Jf,qf,MB,dR);Vc=i,Kf=o,zf=!0}return Bs[n]=fR(r,Jf,qf,e,Kf,MB,t),new CR(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $b(r=ga()){r=be(r);const e=sr(r,Ba);return e.isInitialized()?e.getImmediate():mR(r)}function mR(r,e={}){const t=sr(r,Ba);if(t.isInitialized()){const s=t.getImmediate();if(Kn(e,t.getOptions()))return s;throw Ot.create("already-initialized")}return t.initialize({options:e})}function ER(r,e,t){r=be(r),lR(Vc,Bs[r.app.options.appId],e,t).catch(n=>ht.error(n))}function _R(r,e,t,n){r=be(r),cR(Vc,Bs[r.app.options.appId],e,t,n).catch(s=>ht.error(s))}const Wf="@firebase/analytics",$f="0.10.25";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DR(){Jt(new kt(Ba,(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return gR(n,s,t)},"PUBLIC")),Jt(new kt("analytics-internal",r,"PRIVATE")),gt(Wf,$f),gt(Wf,$f,"esm2020");function r(e){try{const t=e.getProvider(Ba).getImmediate();return{logEvent:(n,s,i)=>_R(t,n,s,i),setUserProperties:(n,s)=>ER(t,n,s)}}catch(t){throw Ot.create("interop-component-reg-failed",{reason:t})}}}DR();function vg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const wR=vg,bg=new Mr("auth","Firebase",vg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua=new pa("@firebase/auth");function Lo(r,...e){ua.logLevel<=he.WARN&&ua.warn(`Auth (${Ur}): ${r}`,...e)}function xo(r,...e){ua.logLevel<=he.ERROR&&ua.error(`Auth (${Ur}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(r,...e){throw Gc(r,...e)}function sn(r,...e){return Gc(r,...e)}function Mc(r,e,t){const n={...wR(),[e]:t};return new Mr("auth","Firebase",n).create(e,{appName:r.name})}function qn(r){return Mc(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Gc(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return bg.create(r,...e)}function se(r,e,...t){if(!r)throw Gc(e,...t)}function Cn(r){const e="INTERNAL ASSERTION FAILED: "+r;throw xo(e),new Error(e)}function wn(r,e){r||Cn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function IR(){return Qf()==="http:"||Qf()==="https:"}function Qf(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yR(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(IR()||AC()||"connection"in navigator)?navigator.onLine:!0}function TR(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(e,t){this.shortDelay=e,this.longDelay=t,wn(t>e,"Short delay should be less than long delay!"),this.isMobile=Qm()||Zm()}get(){return yR()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uc(r,e){wn(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Cn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Cn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Cn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AR={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RR=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],vR=new Ki(3e4,6e4);function zr(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function ar(r,e,t,n,s={}){return Og(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const B=Ni({...o,key:r.config.apiKey}).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const c={method:e,headers:u,...i};return Xm()||(c.referrerPolicy="strict-origin-when-cross-origin"),r.emulatorConfig&&Gr(r.emulatorConfig.host)&&(c.credentials="include"),Pg.fetch()(await Sg(r,r.config.apiHost,t,B),c)})}async function Og(r,e,t){r._canInitEmulator=!1;const n={...AR,...e};try{const s=new PR(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw To(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const B=i.ok?o.errorMessage:o.error.message,[u,c]=B.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw To(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw To(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw To(r,"user-disabled",o);const h=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Mc(r,h,c);zt(r,h)}}catch(s){if(s instanceof Gt)throw s;zt(r,"network-request-failed",{message:String(s)})}}async function ja(r,e,t,n,s={}){const i=await ar(r,e,t,n,s);return"mfaPendingCredential"in i&&zt(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function Sg(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?Uc(r.config,s):`${r.config.apiScheme}://${s}`;return RR.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function bR(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class PR{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(sn(this.auth,"network-request-failed")),vR.get())})}}function To(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=sn(r,e,n);return s.customData._tokenResponse=t,s}function Yf(r){return r!==void 0&&r.enterprise!==void 0}class OR{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return bR(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function SR(r,e){return ar(r,"GET","/v2/recaptchaConfig",zr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NR(r,e){return ar(r,"POST","/v1/accounts:delete",e)}async function ca(r,e){return ar(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ci(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function FR(r,e=!1){const t=be(r),n=await t.getIdToken(e),s=Hc(n);se(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:ci(GB(s.auth_time)),issuedAtTime:ci(GB(s.iat)),expirationTime:ci(GB(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function GB(r){return Number(r)*1e3}function Hc(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return xo("JWT malformed, contained fewer than 3 sections"),null;try{const s=EC(t);return s?JSON.parse(s):(xo("Failed to decode base64 JWT payload"),null)}catch(s){return xo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Xf(r){const e=Hc(r);return se(e,"internal-error"),se(typeof e.exp<"u","internal-error"),se(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oi(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw Ng(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function Ng(r){return r instanceof Gt?r.code==="auth/user-disabled"||r.code==="auth/user-token-expired":!1}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LR{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ci(this.lastLoginAt),this.creationTime=ci(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function la(r){var C;const e=r.auth,t=await r.getIdToken(),n=await Oi(r,ca(e,{idToken:t}));se(n==null?void 0:n.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=(C=s.providerUserInfo)!=null&&C.length?Fg(s.providerUserInfo):[],o=kR(r.providerData,i),B=r.isAnonymous,u=!(r.email&&s.passwordHash)&&!(o!=null&&o.length),c=B?u:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new _u(s.createdAt,s.lastLoginAt),isAnonymous:c};Object.assign(r,h)}async function xR(r){const e=be(r);await la(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function kR(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function Fg(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VR(r,e){const t=await Og(r,{},async()=>{const n=Ni({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await Sg(r,s,"/v1/token",`key=${i}`),B=await r._getAdditionalHeaders();B["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:B,body:n};return r.emulatorConfig&&Gr(r.emulatorConfig.host)&&(u.credentials="include"),Pg.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function MR(r,e){return ar(r,"POST","/v2/accounts:revokeToken",zr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e5}updateFromServerResponse(e){se(e.idToken,"internal-error"),se(typeof e.idToken<"u","internal-error"),se(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Xf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){se(e.length!==0,"internal-error");const t=Xf(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(se(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await VR(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new us;return n&&(se(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(se(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(se(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new us,this.toJSON())}_performRefresh(){return Cn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(r,e){se(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class jt{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new LR(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new _u(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Oi(this,this.stsTokenManager.getToken(this.auth,e));return se(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return FR(this,e)}reload(){return xR(this)}_assign(e){this!==e&&(se(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new jt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){se(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await la(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Lt(this.auth.app))return Promise.reject(qn(this.auth));const e=await this.getIdToken();return await Oi(this,NR(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,B=t.tenantId??void 0,u=t._redirectEventId??void 0,c=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:C,emailVerified:d,isAnonymous:E,providerData:D,stsTokenManager:b}=t;se(C&&b,e,"internal-error");const F=us.fromJSON(this.name,b);se(typeof C=="string",e,"internal-error"),bn(n,e.name),bn(s,e.name),se(typeof d=="boolean",e,"internal-error"),se(typeof E=="boolean",e,"internal-error"),bn(i,e.name),bn(o,e.name),bn(B,e.name),bn(u,e.name),bn(c,e.name),bn(h,e.name);const U=new jt({uid:C,auth:e,email:s,emailVerified:d,displayName:n,isAnonymous:E,photoURL:o,phoneNumber:i,tenantId:B,stsTokenManager:F,createdAt:c,lastLoginAt:h});return D&&Array.isArray(D)&&(U.providerData=D.map(K=>({...K}))),u&&(U._redirectEventId=u),U}static async _fromIdTokenResponse(e,t,n=!1){const s=new us;s.updateFromServerResponse(t);const i=new jt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await la(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];se(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Fg(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),B=new us;B.updateFromIdToken(n);const u=new jt({uid:s.localId,auth:e,stsTokenManager:B,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new _u(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf=new Map;function dn(r){wn(r instanceof Function,"Expected a class definition");let e=Zf.get(r);return e?(wn(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Zf.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Lg.type="NONE";const eC=Lg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ko(r,e,t){return`firebase:${r}:${e}:${t}`}class vr{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=ko(this.userKey,s.apiKey,i),this.fullPersistenceKey=ko("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ca(this.auth,{idToken:e}).catch(()=>{});return t?jt._fromGetAccountInfoResponse(this.auth,t,e):null}return jt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,n="authUser"){if(!t.length)return new vr(dn(eC),e,n);const s=(await Promise.all(t.map(async c=>{try{if(await c._isAvailable())return c}catch{return}}))).filter(c=>c);let i=s[0]||dn(eC);const o=ko(n,e.config.apiKey,e.name);let B=null;for(const c of t)try{const h=await c._get(o);if(h){let C;if(typeof h=="string"){const d=await ca(e,{idToken:h}).catch(()=>{});if(!d)break;C=await jt._fromGetAccountInfoResponse(e,d,h)}else C=jt._fromJSON(e,h);c!==i&&(B=C),i=c;break}}catch{}const u=s.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new vr(i,e,n):(i=u[0],B&&await i._set(o,B.toJSON()),await Promise.all(t.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new vr(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tC(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Mg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ug(e))return"Blackberry";if(Hg(e))return"Webos";if(kg(e))return"Safari";if((e.includes("chrome/")||Vg(e))&&!e.includes("edge/"))return"Chrome";if(Gg(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function xg(r=st()){return/firefox\//i.test(r)}function kg(r=st()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Vg(r=st()){return/crios\//i.test(r)}function Mg(r=st()){return/iemobile/i.test(r)}function Gg(r=st()){return/android/i.test(r)}function Ug(r=st()){return/blackberry/i.test(r)}function Hg(r=st()){return/webos/i.test(r)}function jc(r=st()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function GR(r=st()){var e;return jc(r)&&!!((e=window.navigator)!=null&&e.standalone)}function UR(){return eE()&&document.documentMode===10}function jg(r=st()){return jc(r)||Gg(r)||Hg(r)||Ug(r)||/windows phone/i.test(r)||Mg(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jg(r,e=[]){let t;switch(r){case"Browser":t=tC(st());break;case"Worker":t=`${tC(st())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ur}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HR{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,B)=>{try{const u=e(i);o(u)}catch(u){B(u)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jR(r,e={}){return ar(r,"GET","/v2/passwordPolicy",zr(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JR=6;class qR{constructor(e){var n;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??JR,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KR{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new nC(this),this.idTokenSubscription=new nC(this),this.beforeStateQueue=new HR(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=bg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=dn(t)),this._initializationPromise=this.queue(async()=>{var n,s,i;if(!this._deleted){try{this.persistenceManager=await vr.create(this,e)}catch(o){Lo(`Failed to initialize persistence: ${o}`),this.persistenceManager=await vr.create(this,[])}finally{(n=this._resolvePersistenceManagerAvailable)==null||n.call(this)}if(!this._deleted){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(o){Lo(`Failed to initialize current user: ${o}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ca(this,{idToken:e}),n=await jt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Lt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(B=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(B,B))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,B=n==null?void 0:n._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===B)&&(u!=null&&u.user)&&(n=u.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return se(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await la(e)}catch(t){if(Ng(t))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=TR()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Lt(this.app))return Promise.reject(qn(this));const t=e?be(e):null;return t&&se(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&se(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Lt(this.app)?Promise.reject(qn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Lt(this.app)?Promise.reject(qn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(dn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await jR(this),t=new qR(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Mr("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await MR(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&dn(e)||this._popupRedirectResolver;se(t,this,"argument-error"),this.redirectPersistenceManager=await vr.create(this,[dn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const B=this._isInitialized?Promise.resolve():this._initializationPromise;if(se(B,this,"internal-error"),B.then(()=>{o||i(this.currentUser)}).catch(u=>{if(!o)if(typeof t!="function"&&t.error)t.error(u);else if(n)n(u);else throw u}),typeof t=="function"){const u=e.addObserver(t,n,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){const n=(t==null?void 0:t.message)||String(t),s=Mc(this,"internal-error",`An internal AuthError has occurred: ${n}`);throw s.customData={originalError:t},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return se(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Jg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var t;if(Lt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Lo(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function As(r){return be(r)}class nC{constructor(e){this.auth=e,this.observer=null,this.addObserver=oE(t=>this.observer=t)}get next(){return se(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ja={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function zR(r){Ja=r}function qg(r){return Ja.loadJS(r)}function WR(){return Ja.recaptchaEnterpriseScript}function $R(){return Ja.gapiScript}function QR(r){return`__${r}${Math.floor(Math.random()*1e6)}`}class YR{constructor(){this.enterprise=new XR}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class XR{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZR="recaptcha-enterprise",Kg="NO_RECAPTCHA",rC="onFirebaseAuthREInstanceReady";class Nn{constructor(e){this.type=ZR,this.auth=As(e)}async verify(e="verify",t=!1){async function n(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,B)=>{SR(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)B(new Error("recaptcha Enterprise site key undefined"));else{const c=new OR(u);return i.tenantId==null?i._agentRecaptchaConfig=c:i._tenantRecaptchaConfigs[i.tenantId]=c,o(c.siteKey)}}).catch(u=>{B(u)})})}function s(i,o,B){const u=window.grecaptcha;Yf(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(c=>{o(c)}).catch(()=>{o(Kg)})}):B(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new YR().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{n(this.auth).then(async B=>{if(!t&&Yf(window.grecaptcha)&&Nn.scriptInjectionDeferred)await Nn.scriptInjectionDeferred.promise,s(B,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=WR();u.length!==0&&(u+=B+`&onload=${rC}`),Nn.scriptInjectionDeferred=new yC,window[rC]=()=>{var c;(c=Nn.scriptInjectionDeferred)==null||c.resolve()},qg(u).then(()=>{var c;return(c=Nn.scriptInjectionDeferred)==null?void 0:c.promise}).then(()=>{s(B,i,o)}).catch(c=>{o(c)})}}).catch(B=>{o(B)})})}}Nn.scriptInjectionDeferred=null;async function sC(r,e,t,n=!1,s=!1){const i=new Nn(r);let o;if(s)o=Kg;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const B={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in B){const u=B.phoneEnrollmentInfo.phoneNumber,c=B.phoneEnrollmentInfo.recaptchaToken;Object.assign(B,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in B){const u=B.phoneSignInInfo.recaptchaToken;Object.assign(B,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return B}return n?Object.assign(B,{captchaResp:o}):Object.assign(B,{captchaResponse:o}),Object.assign(B,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(B,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),B}async function iC(r,e,t,n,s){var i;if((i=r._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await sC(r,e,t,t==="getOobCode");return n(r,o)}else return n(r,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const B=await sC(r,e,t,t==="getOobCode");return n(r,B)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ev(r,e){const t=sr(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Kn(i,e??{}))return s;zt(s,"already-initialized")}return t.initialize({options:e})}function tv(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(dn);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function nv(r,e,t){const n=As(r);se(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=zg(e),{host:o,port:B}=rv(e),u=B===null?"":`:${B}`,c={url:`${i}//${o}${u}/`},h=Object.freeze({host:o,port:B,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){se(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),se(Kn(c,n.config.emulator)&&Kn(h,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=c,n.emulatorConfig=h,n.settings.appVerificationDisabledForTesting=!0,Gr(o)?Du(`${i}//${o}${u}`):sv()}function zg(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function rv(r){const e=zg(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:oC(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:oC(o)}}}function oC(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function sv(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Cn("not implemented")}_getIdTokenResponse(e){return Cn("not implemented")}_linkToIdToken(e,t){return Cn("not implemented")}_getReauthenticationResolver(e){return Cn("not implemented")}}async function iv(r,e){return ar(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ov(r,e){return ja(r,"POST","/v1/accounts:signInWithPassword",zr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function av(r,e){return ja(r,"POST","/v1/accounts:signInWithEmailLink",zr(r,e))}async function Bv(r,e){return ja(r,"POST","/v1/accounts:signInWithEmailLink",zr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si extends Jc{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Si(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Si(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return iC(e,t,"signInWithPassword",ov);case"emailLink":return av(e,{email:this._email,oobCode:this._password});default:zt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return iC(e,n,"signUpPassword",iv);case"emailLink":return Bv(e,{idToken:t,email:this._email,oobCode:this._password});default:zt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cs(r,e){return ja(r,"POST","/v1/accounts:signInWithIdp",zr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uv="http://localhost";class Vr extends Jc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Vr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):zt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new Vr(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return cs(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,cs(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,cs(e,t)}buildRequest(){const e={requestUri:uv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ni(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cv(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function lv(r){const e=Ws($s(r)).link,t=e?Ws($s(e)).deep_link_id:null,n=Ws($s(r)).deep_link_id;return(n?Ws($s(n)).link:null)||n||t||e||r}class qc{constructor(e){const t=Ws($s(e)),n=t.apiKey??null,s=t.oobCode??null,i=cv(t.mode??null);se(n&&s&&i,"argument-error"),this.apiKey=n,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=lv(e);try{return new qc(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(){this.providerId=Rs.PROVIDER_ID}static credential(e,t){return Si._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=qc.parseLink(t);return se(n,"argument-error"),Si._fromEmailAndCode(e,n.code,n.tenantId)}}Rs.PROVIDER_ID="password";Rs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Rs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi extends Wg{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn extends zi{constructor(){super("facebook.com")}static credential(e){return Vr._fromParams({providerId:Fn.PROVIDER_ID,signInMethod:Fn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Fn.credentialFromTaggedObject(e)}static credentialFromError(e){return Fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Fn.credential(e.oauthAccessToken)}catch{return null}}}Fn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Fn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln extends zi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Vr._fromParams({providerId:Ln.PROVIDER_ID,signInMethod:Ln.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ln.credentialFromTaggedObject(e)}static credentialFromError(e){return Ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Ln.credential(t,n)}catch{return null}}}Ln.GOOGLE_SIGN_IN_METHOD="google.com";Ln.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn extends zi{constructor(){super("github.com")}static credential(e){return Vr._fromParams({providerId:xn.PROVIDER_ID,signInMethod:xn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return xn.credentialFromTaggedObject(e)}static credentialFromError(e){return xn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return xn.credential(e.oauthAccessToken)}catch{return null}}}xn.GITHUB_SIGN_IN_METHOD="github.com";xn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn extends zi{constructor(){super("twitter.com")}static credential(e,t){return Vr._fromParams({providerId:kn.PROVIDER_ID,signInMethod:kn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return kn.credentialFromTaggedObject(e)}static credentialFromError(e){return kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return kn.credential(t,n)}catch{return null}}}kn.TWITTER_SIGN_IN_METHOD="twitter.com";kn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await jt._fromIdTokenResponse(e,n,s),o=aC(n);return new gs({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=aC(n);return new gs({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function aC(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha extends Gt{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,ha.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new ha(e,t,n,s)}}function $g(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ha._fromErrorAndOperation(r,i,e,n):i})}async function hv(r,e,t=!1){const n=await Oi(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return gs._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fv(r,e,t=!1){const{auth:n}=r;if(Lt(n.app))return Promise.reject(qn(n));const s="reauthenticate";try{const i=await Oi(r,$g(n,s,e,r),t);se(i.idToken,n,"internal-error");const o=Hc(i.idToken);se(o,n,"internal-error");const{sub:B}=o;return se(r.uid===B,n,"user-mismatch"),gs._forOperation(r,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&zt(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qg(r,e,t=!1){if(Lt(r.app))return Promise.reject(qn(r));const n="signIn",s=await $g(r,n,e),i=await gs._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}async function Cv(r,e){return Qg(As(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dv(r){const e=As(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Qb(r,e,t){return Lt(r.app)?Promise.reject(qn(r)):Cv(be(r),Rs.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&dv(r),n})}function pv(r,e,t,n){return be(r).onIdTokenChanged(e,t,n)}function gv(r,e,t){return be(r).beforeAuthStateChanged(e,t)}const fa="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(fa,"1"),this.storage.removeItem(fa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mv=1e3,Ev=10;class Xg extends Yg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=jg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,B,u)=>{this.notifyListeners(o,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);UR()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ev):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},mv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Xg.type="LOCAL";const _v=Xg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg extends Yg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Zg.type="SESSION";const em=Zg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dv(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new qa(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const B=Array.from(o).map(async c=>c(t.origin,i)),u=await Dv(B);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}qa.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kc(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((B,u)=>{const c=Kc("",20);s.port1.start();const h=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(C){const d=C;if(d.data.eventId===c)switch(d.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),B(d.data.response);break;default:clearTimeout(h),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(){return window}function Iv(r){on().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(){return typeof on().WorkerGlobalScope<"u"&&typeof on().importScripts=="function"}async function yv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Tv(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function Av(){return tm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nm="firebaseLocalStorageDb",Rv=1,Ca="firebaseLocalStorage",rm="fbase_key";class Wi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ka(r,e){return r.transaction([Ca],e?"readwrite":"readonly").objectStore(Ca)}function vv(){const r=indexedDB.deleteDatabase(nm);return new Wi(r).toPromise()}function sm(){const r=indexedDB.open(nm,Rv);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(Ca,{keyPath:rm})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(Ca)?e(n):(n.close(),await vv(),e(await sm()))})})}async function BC(r,e,t){const n=Ka(r,!0).put({[rm]:e,value:t});return new Wi(n).toPromise()}async function bv(r,e){const t=Ka(r,!1).get(e),n=await new Wi(t).toPromise();return n===void 0?null:n.value}function uC(r,e){const t=Ka(r,!0).delete(e);return new Wi(t).toPromise()}const Pv=800,Ov=3;class im{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=sm(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>Ov)throw n;if(this.dbPromise){const s=this.dbPromise;this.dbPromise=null;try{(await s).close()}catch{}}}}async initializeServiceWorkerMessaging(){return tm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=qa._getInstance(Av()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await yv(),!this.activeServiceWorker)return;this.sender=new wv(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(n=e[0])!=null&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Tv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await BC(e,fa,"1"),await uC(e,fa)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>BC(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>bv(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>uC(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(s=>{const i=Ka(s,!1).getAll();return new Wi(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||Lo(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Pv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e).catch(()=>{})),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}im.type="LOCAL";const Sv=im;new Ki(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nv(r,e){return e?dn(e):(se(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc extends Jc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return cs(e,this._buildIdpRequest())}_linkToIdToken(e,t){return cs(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return cs(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Fv(r){return Qg(r.auth,new zc(r),r.bypassAuthState)}function Lv(r){const{auth:e,user:t}=r;return se(t,e,"internal-error"),fv(t,new zc(r),r.bypassAuthState)}async function xv(r){const{auth:e,user:t}=r;return se(t,e,"internal-error"),hv(t,new zc(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{if(this.eventManager=await this.resolver._initialize(this.auth),!this.pendingPromise||(await this.onExecution(),!this.pendingPromise))return;this.eventManager.registerConsumer(this)}catch(n){this.pendingPromise&&this.reject(n)}})}async onAuthEvent(e){if(!this.pendingPromise)return;const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:B}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(B)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Fv;case"linkViaPopup":case"linkViaRedirect":return xv;case"reauthViaPopup":case"reauthViaRedirect":return Lv;default:zt(this.auth,"internal-error")}}resolve(e){wn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){wn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kv=new Ki(2e3,1e4);class is extends om{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,is.currentPopupAction&&is.currentPopupAction.cancel(),is.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return se(e,this.auth,"internal-error"),e}async onExecution(){wn(this.filter.length===1,"Popup operations only handle one event");const e=Kc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(sn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(sn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,is.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if((n=(t=this.authWindow)==null?void 0:t.window)!=null&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(sn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,kv.get())};e()}}is.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv="pendingRedirect",Vo=new Map;class Mv extends om{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Vo.get(this.auth._key());if(!e){try{const n=await Gv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Vo.set(this.auth._key(),e)}return this.bypassAuthState||Vo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Gv(r,e){const t=jv(e),n=Hv(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function Uv(r,e){Vo.set(r._key(),e)}function Hv(r){return dn(r._redirectPersistence)}function jv(r){return ko(Vv,r.config.apiKey,r.name)}async function Jv(r,e,t=!1){if(Lt(r.app))return Promise.reject(qn(r));const n=As(r),s=Nv(n,e),o=await new Mv(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qv=600*1e3;class Kv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!zv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!am(e)){const s=((n=e.error.code)==null?void 0:n.split("auth/")[1])||"internal-error";t.onError(sn(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=qv&&this.cachedEventUids.clear(),this.cachedEventUids.has(cC(e))}saveEventToCache(e){this.cachedEventUids.add(cC(e)),this.lastProcessedEventTime=Date.now()}}function cC(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function am({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function zv(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return am(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wv(r,e={}){return ar(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $v=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Qv=/^https?/;async function Yv(r){if(r.config.emulator)return;const{authorizedDomains:e}=await Wv(r);for(const t of e)try{if(Xv(t))return}catch{}zt(r,"unauthorized-domain")}function Xv(r){const e=Eu(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!Qv.test(t))return!1;if($v.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zv=new Ki(3e4,6e4);function lC(){const r=on().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function eb(r){return new Promise((e,t)=>{var s,i,o;function n(){lC(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{lC(),t(sn(r,"network-request-failed"))},timeout:Zv.get()})}if((i=(s=on().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=on().gapi)!=null&&o.load)n();else{const B=QR("iframefcb");return on()[B]=()=>{gapi.load?n():t(sn(r,"network-request-failed"))},qg(`${$R()}?onload=${B}`).catch(u=>t(u))}}).catch(e=>{throw Mo=null,e})}let Mo=null;function tb(r){return Mo=Mo||eb(r),Mo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nb=new Ki(5e3,15e3),rb="__/auth/iframe",sb="emulator/auth/iframe",ib={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ob=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ab(r){const e=r.config;se(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Uc(e,sb):`https://${r.config.authDomain}/${rb}`,n={apiKey:e.apiKey,appName:r.name,v:Ur},s=ob.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${Ni(n).slice(1)}`}async function Bb(r){const e=await tb(r),t=on().gapi;return se(t,r,"internal-error"),e.open({where:document.body,url:ab(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ib,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=sn(r,"network-request-failed"),B=on().setTimeout(()=>{i(o)},nb.get());function u(){on().clearTimeout(B),s(n)}n.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ub={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},cb=500,lb=600,hb="_blank",fb="http://localhost";class hC{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Cb(r,e,t,n=cb,s=lb){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let B="";const u={...ub,width:n.toString(),height:s.toString(),top:i,left:o},c=st().toLowerCase();t&&(B=Vg(c)?hb:t),xg(c)&&(e=e||fb,u.scrollbars="yes");const h=Object.entries(u).reduce((d,[E,D])=>`${d}${E}=${D},`,"");if(GR(c)&&B!=="_self")return db(e||"",B),new hC(null);const C=window.open(e||"",B,h);se(C,r,"popup-blocked");try{C.focus()}catch{}return new hC(C)}function db(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pb="__/auth/handler",gb="emulator/auth/handler",mb=encodeURIComponent("fac");async function fC(r,e,t,n,s,i){se(r.config.authDomain,r,"auth-domain-config-required"),se(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Ur,eventId:s};if(e instanceof Wg){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",iE(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,C]of Object.entries({}))o[h]=C}if(e instanceof zi){const h=e.getScopes().filter(C=>C!=="");h.length>0&&(o.scopes=h.join(","))}r.tenantId&&(o.tid=r.tenantId);const B=o;for(const h of Object.keys(B))B[h]===void 0&&delete B[h];const u=await r._getAppCheckToken(),c=u?`#${mb}=${encodeURIComponent(u)}`:"";return`${Eb(r)}?${Ni(B).slice(1)}${c}`}function Eb({config:r}){return r.emulator?Uc(r,gb):`https://${r.authDomain}/${pb}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UB="webStorageSupport";class _b{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=em,this._completeRedirectFn=Jv,this._overrideRedirectResult=Uv}async _openPopup(e,t,n,s){var o;wn((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await fC(e,t,n,Eu(),s);return Cb(e,i,Kc())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await fC(e,t,n,Eu(),s);return Iv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(wn(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Bb(e),n=new Kv(e);return t.register("authEvent",s=>(se(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(UB,{type:UB},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[UB];i!==void 0&&t(!!i),zt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Yv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return jg()||kg()||jc()}}const Db=_b;var CC="@firebase/auth",dC="1.13.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){se(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ib(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function yb(r){Jt(new kt("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:B}=n.options;se(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:o,authDomain:B,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Jg(r)},c=new KR(n,s,i,u);return tv(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Jt(new kt("auth-internal",e=>{const t=As(e.getProvider("auth").getImmediate());return(n=>new wb(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),gt(CC,dC,Ib(r)),gt(CC,dC,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tb=300,Ab=IC("authIdTokenMaxAge")||Tb;let pC=null;const Rb=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Ab)return;const s=t==null?void 0:t.token;pC!==s&&(pC=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Yb(r=ga()){const e=sr(r,"auth");if(e.isInitialized())return e.getImmediate();const t=ev(r,{popupRedirectResolver:Db,persistence:[Sv,_v,em]}),n=IC("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=Rb(i.toString());gv(t,o,()=>o(t.currentUser)),pv(t,B=>o(B))}}const s=_C("auth");return s&&nv(t,`http://${s}`),t}function vb(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}zR({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=sn("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",vb().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});yb("Browser");export{Wb as a,Yb as b,$b as c,Kb as d,Nb as e,Sb as f,xb as g,Hb as h,l_ as i,Qb as j,Mb as k,Vb as l,Gb as m,jb as o,kb as q,zb as r,Ub as s,qb as u,Jb as w};
