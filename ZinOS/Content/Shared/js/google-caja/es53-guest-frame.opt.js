{var JSON,Q,URI,___,cajaVM,json_sans_eval,loadModuleMaker,prepareModuleFromText___,safeJSON;typeof
Date.prototype.toJSON!=='function'&&(Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}),json_sans_eval=(function(){var
hop=Object.hasOwnProperty,EMPTY_STRING,SLASH,completeToken,cx,escapable,escapeSequence,escapes,gap,indent,meta,number,oneChar,rep,significantToken,string;function
f(n){return n<10?'0'+n:n}cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={'\b':'\\b','	':'\\t','\n':'\\n','':'\\f','\r':'\\r','\"':'\\\"','\\':'\\\\'};function
quote(string){return escapable.lastIndex=0,escapable.test(string)?'\"'+string.replace(escapable,function(a){var
c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'\"':'\"'+string+'\"'}function
str(key,holder){var mind=gap,value=holder[key],i,k,length,partial,v;value&&typeof
value==='object'&&typeof value.toJSON==='function'&&(value=value.toJSON(key)),typeof
rep==='function'&&(value=rep.call(holder,key,value));switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value)return'null';gap+=indent,partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1)partial[i]=str(i,value)||'null';return v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']',gap=mind,v}if(rep&&typeof
rep==='object'){length=rep.length;for(i=0;i<length;i+=1)k=rep[i],typeof k==='string'&&(v=str(k,value),v&&partial.push(quote(k)+(gap?': ':':')+v))}else
for(k in value)hop.call(value,k)&&(v=str(k,value),v&&partial.push(quote(k)+(gap?': ':':')+v));return v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}',gap=mind,v}}function
stringify(value,replacer,space){var i;gap='',indent='';if(typeof space==='number')for(i=0;i<space;i+=1)indent+=' ';else
if(typeof space==='string')indent=space;rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof
replacer!=='object'||typeof replacer.length!=='number'))throw new Error('json_sans_eval.stringify');return str('',{'':value})}number='(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)',oneChar='(?:[^\\0-\\x08\\x0a-\\x1f\"\\\\]|\\\\(?:[\"/\\\\bfnrt]|u[0-9A-Fa-f]{4}))',string='(?:\"'+oneChar+'*\")',significantToken=new
RegExp('(?:false|true|null|[\\{\\}\\[\\]]|'+number+'|'+string+')','g'),escapeSequence=new
RegExp('\\\\(?:([^u])|u(.{4}))','g'),escapes={'\"':'\"','/':'/','\\':'\\','b':'\b','f':'','n':'\n','r':'\r','t':'	'};function
unescapeOne(_,ch,hex){return ch?escapes[ch]:String.fromCharCode(parseInt(hex,16))}EMPTY_STRING=new
String(''),SLASH='\\',completeToken=new RegExp('(?:false|true|null|[ 	\r\n]+|[\\{\\}\\[\\],:]|'+number+'|'+string+'|.)','g');function
blank(arr,s,e){while(--e>=s)arr[e]=''}function checkSyntax(text,keyFilter){var toks=(''+text).match(completeToken),i=0,n=toks.length;checkArray();if(i<n)throw new
Error('Trailing tokens '+toks.slice(i-1).join(''));return toks.join('');function
checkArray(){var t;while(i<n){t=toks[i++];switch(t){case']':return;case'[':checkArray();break;case'{':checkObject()}}}function
checkObject(){var state=0,len,t;while(i<n){t=toks[i++];switch(t.charCodeAt(0)){case
9:case 10:case 13:case 32:continue;case 34:len=t.length;if(len===1)throw new Error(t);if(state===0){if(keyFilter&&!keyFilter(t.substring(1,len-1).replace(escapeSequence,unescapeOne)))throw new
Error(t)}else if(state!==2)throw new Error(t);break;case 39:throw new Error(t);case
44:if(state!==3)throw new Error(t);state=0;continue;case 58:if(state!==1)throw new
Error(t);break;case 91:if(state!==2)throw new Error(t);checkArray();break;case 123:if(state!==2)throw new
Error(t);checkObject();break;case 125:return;default:if(state!==2)throw new Error(t)}++state}}}function
parse(json,opt_reviver){var toks=json.match(significantToken),tok=toks[0],cont,i,key,n,result,stack,walk;if('{'===tok)result={};else
if('['===tok)result=[];else throw new Error(tok);stack=[result];for(i=1,n=toks.length;i<n;++i){tok=toks[i];switch(tok.charCodeAt(0)){default:cont=stack[0],cont[key||cont.length]=+tok,key=void
0;break;case 34:tok=tok.substring(1,tok.length-1),tok.indexOf(SLASH)!==-1&&(tok=tok.replace(escapeSequence,unescapeOne)),cont=stack[0];if(!key)if(cont
instanceof Array)key=cont.length;else{key=tok||EMPTY_STRING;break}cont[key]=tok,key=void
0;break;case 91:cont=stack[0],stack.unshift(cont[key||cont.length]=[]),key=void 0;break;case
93:stack.shift();break;case 102:cont=stack[0],cont[key||cont.length]=false,key=void
0;break;case 110:cont=stack[0],cont[key||cont.length]=null,key=void 0;break;case
116:cont=stack[0],cont[key||cont.length]=true,key=void 0;break;case 123:cont=stack[0],stack.unshift(cont[key||cont.length]={}),key=void
0;break;case 125:stack.shift()}}if(stack.length)throw new Error;return opt_reviver&&(walk=function(holder,key){var
value=holder[key],i,k,toDelete,v;if(value&&typeof value==='object'){toDelete=null;for(k
in value)hop.call(value,k)&&value!==holder&&(v=walk(value,k),v!==void 0?(value[k]=v):(toDelete||(toDelete=[]),toDelete.push(k)));if(toDelete)for(i=toDelete.length;--i>=0;)delete
value[toDelete[i]]}return opt_reviver.call(holder,key,value)},result=walk({'':result},'')),result}return{'checkSyntax':checkSyntax,'parse':parse,'stringify':stringify}})(),typeof
JSON==='undefined'&&(JSON={}),typeof JSON.stringify!=='function'&&(JSON.stringify=json_sans_eval.stringify),typeof
JSON.parse!=='function'&&(JSON.parse=json_sans_eval.parse),(function(){var classProp=Object.prototype.toString,BASE_OBJECT_CONSTRUCTOR,BREAK,FakeFunction,GuardMark,GuardStamp,GuardT,MAGIC_NAME,MAGIC_NUM,MAGIC_TOKEN,NO_RESULT,TAME_CTOR_CREATE_OBJECT_ONLY,USELESS,addToDefended,antidote,attributeDefaults,cajaVMKeys,def,defended,deferredDefended,endsWith__,endsWith_e___,endsWith_v___,functionInstanceVoidNameGetter,goodJSON,i,magicCount,myLogFunc,myNewModuleHandler,obtainNewModule,origGetOwnPropertyDescriptor,origGetPrototypeOf,parser,poisonArgsCallee,poisonArgsCaller,poisonFuncArgs,poisonFuncCaller,push,registeredImports,sharedImports,slice,startsWithNUM___,trimBeginRegexp,trimEndRegexp;Object.prototype.baseProto___=Object.prototype,slice=Array.prototype.slice,push=Array.prototype.push,antidote=function(){return};function
deodorize(original,end){var i;if(original.__defineGetter__)for(i=end;i<0;++i)original.__defineGetter__(i,antidote)}function
isDeodorized(original,sprop){return original.__lookupGetter__?original.__lookupGetter__(sprop)===antidote:false}deodorize(Function.prototype,-6),deodorize(String.prototype,-1),deodorize(RegExp.prototype,-6),deodorize(RegExp,-6),Array.slice=markFunc(function(dis,startIndex){var
edIndex;return dis=ToObject(dis),arguments.length>2?(edIndex=arguments[2],slice.call(dis,startIndex,endIndex)):slice.call(dis,startIndex)}),Array.prototype.forEach||(Array.prototype.forEach=function(fun){var
dis=ToObject(this),len=dis.length>>>0,i,thisp;if('function'!==typeof fun)throw new
TypeError('Expected function but got '+typeof fun);thisp=arguments[1];for(i=0;i<len;++i)i
in dis&&fun.call(thisp,dis[i],i,dis)});function isPrototypical(obj){var constr;return typeof
obj!=='object'?false:obj===null?false:(constr=obj.constructor,typeof constr!=='function'?false:constr.prototype===obj)}BASE_OBJECT_CONSTRUCTOR={};function
directConstructor(obj){var oldConstr,proto,result;if(obj===null)return;if(obj===void
0)return;if(typeof obj!=='object')return;if(obj.hasOwnProperty('Prototype___')){proto=obj.Prototype___;if(proto===null)return;result=proto.constructor,(result.prototype!==proto||typeof
result!=='function')&&(result=directConstructor(proto))}else{if(!obj.hasOwnProperty('constructor'))result=obj.constructor;else{oldConstr=obj.constructor;if(delete
obj.constructor)result=obj.constructor,obj.constructor=oldConstr;else if(isPrototypical(obj))return log('Guessing the directConstructor of : '+obj),BASE_OBJECT_CONSTRUCTOR;else
throw new TypeError('Discovery of direct constructors unsupported when the constructor property is not deletable: '+obj+'.constructor === '+oldConstr)}if(typeof
result!=='function'||!(obj instanceof result)){if(obj===obj.baseProto___)return;throw new
TypeError('Discovery of direct constructors for foreign begotten objects not implemented on this platform')}result.prototype.constructor===result&&(obj.Prototype___=result.prototype)}return result===result.FERAL_FRAME_OBJECT___?BASE_OBJECT_CONSTRUCTOR:result===obj.CAJA_FRAME_OBJECT___?BASE_OBJECT_CONSTRUCTOR:result}function
isWhitelistedProperty(t,mode,p){return!!t[p+'_'+mode+'_twl___']}function whitelistProperty(t,mode,p){t[p+'_'+mode+'_twl___']=t}function
isWhitelistedReadOnly(t){return!!t.readonly_twl___}function whitelistReadOnly(t){t.readonly_twl___=t}function
tamesTo(f,t){var ftype=typeof f,ttype;if(!f||ftype!=='function'&&ftype!=='object')throw new
TypeError('Unexpected feral primitive: ',f);ttype=typeof t;if(!t||ttype!=='function'&&ttype!=='object')throw new
TypeError('Unexpected tame primitive: ',t);if(f.TAMED_TWIN___===t&&t.FERAL_TWIN___===f)throw new
TypeError('Attempt to multiply tame: '+f+', '+t);if(f.TAMED_TWIN___&&f.hasOwnProperty('TAMED_TWIN___'))throw new
TypeError('Inconsistently tames to something: ',f);if(t.FERAL_TWIN___&&t.hasOwnProperty('FERAL_TWIN___'))throw new
TypeError('Inconsistently untames to something: ',t);f.TAMED_TWIN___=t,t.FERAL_TWIN___=f}function
tameArray(fa){var ta=[],i;for(i=0;i<fa.length;++i)ta[i]=tame(fa[i]);return freeze(ta)}function
untameArray(ta){var fa=[],i;for(i=0;i<ta.length;++i)fa[i]=untame(ta[i]);return fa}function
tame(f){var ctor,ftype,t;if(!f)return f;if(f.TAMED_TWIN___&&f.TAMED_TWIN___.FERAL_TWIN___===f)return f.TAMED_TWIN___;ftype=typeof
f;if(ftype!=='function'&&ftype!=='object')return f;else if(isArray(f))return tameArray(f);if(isDefinedInCajaFrame(f))return f;t=void
0;if(ftype==='object'){ctor=directConstructor(f);if(ctor===void 0)throw new TypeError('Cannot determine ctor of: '+f);else
if(ctor===BASE_OBJECT_CONSTRUCTOR)t=tameRecord(f);else t=tamePreviouslyConstructedObject(f,ctor)}else
if(ftype==='function')t=void 0;return t&&tamesTo(f,t),t}function makeWhitelistingHasProperty(t,f,propertyModesToCheck){return function(p){var
i;p=''+p;if(!(p in f))return false;if(isNumericName(p))return false;for(i=0;i<propertyModesToCheck.length;++i)if(isWhitelistedProperty(t,propertyModesToCheck[i],p))return true;return false}}function
makeEnumerate(t,f){return function(){var tt=t,ff=f,result={},p;for(p in f)t.HasProperty___(p)&&result.DefineOwnProperty___(p,{'enumerable':true});return result}}function
addFunctionPropertyHandlers(t,f){t.v___=function(p){p=''+p;if(p==='call'||p==='bind'||p==='apply')return Function.prototype.v___.call(t,p);if(isNumericName(p))return;if(!endsWith__.test(p)){if(isWhitelistedProperty(t,'r',p))return tame(f[p])};return},t.w___=function(p,v){p=''+p;if(!isNumericName(p)&&!endsWith__.test(p)){if(isWhitelistedProperty(t,'w',p)&&!isWhitelistedReadOnly(t))return f[p]=untame(v),v};throw new
TypeError('Not writeable: '+p)},t.c___=function(p){p=''+p;if(!isNumericName(p)&&!endsWith__.test(p)){if(isWhitelistedProperty(t,'w',p)&&!isWhitelistedReadOnly(t)){if(delete
f[p])return true}};throw new TypeError('Not deleteable: '+p)},t.HasProperty___=makeWhitelistingHasProperty(t,f,['r']),t.e___=makeEnumerate(t,f)}function
tameCtor(f,fSuper,name){var instantiator=function(){},t,tPrototype;return instantiator.prototype=f.prototype,tPrototype=(function(){var
tSuper;if(!fSuper||fSuper===fSuper.FERAL_FRAME_OBJECT___)return{};tSuper=fSuper.TAMED_TWIN___;if(!tSuper)throw new
TypeError('Super ctor not yet tamed');function tmp(){}return tmp.prototype=tSuper.prototype,new
tmp})(),whitelistProperty(tPrototype,'r','constructor'),tameObjectWithMethods(f.prototype,tPrototype),tamesTo(f.prototype,tPrototype),t=markFunc(function(_){var
o;if(arguments.length>0&&arguments[0]===TAME_CTOR_CREATE_OBJECT_ONLY)return;o=new
instantiator,f.apply(o,untameArray(arguments)),tameObjectWithMethods(o,this),tamesTo(o,this)}),t.prototype=tPrototype,tPrototype.constructor=t,t.IS_TAMED_CTOR___=t,addFunctionPropertyHandlers(t,f),whitelistProperty(t,'r','prototype'),t}function
tamePureFunction(f,name){var t=markFunc(function(_){return tame(f.apply(USELESS,untameArray(arguments)))});return addFunctionPropertyHandlers(t,f),t}function
tameXo4a(f,name){var t=markFunc(function(_){return tame(f.apply(untame(this),untameArray(arguments)))});return addFunctionPropertyHandlers(t,f),t}function
tameRecord(f,t){var feralEnumerate;return t||(t={}),t.v___=function(p){var g;return p=''+p,isNumericName(p)?void
0:endsWith__.test(p)?void 0:(g=getter(t,p),g?g.f___(this):hasAccessor(t,p)?void 0:tame(f[p]))},t.w___=function(p,v){var
s;p=''+p;if(!isNumericName(p)&&!endsWith__.test(p)){s=setter(t,p);if(s)return s.f___(t,[v]),v;if(!hasAccessor(t,p)&&!isWhitelistedReadOnly(t))return f[p]=untame(v),v}throw new
TypeError('Not writeable: '+p)},t.c___=function(p){p=''+p;if(!isNumericName(p)&&!endsWith__.test(p)){if(!isWhitelistedReadOnly(t))return t[p+'_v___']?Object.prototype.c___.call(t,p):delete
f[p]?true:void 0};throw new TypeError('Not deleteable: '+p)},t.m___=function(p,as){var
tf;p=''+p,tf=t.v___(p);if(typeof tf==='function')return tf.apply(USELESS,as);throw new
TypeError('Not a function: '+p)},t.HasProperty___=function(p){return p=''+p,isNumericName(p)?false:p+'_v___'in
this||p in f&&!endsWith__.test(p)},feralEnumerate=makeEnumerate(t,f),t.e___=function(){var
result=feralEnumerate(),p;for(p in t){if(!t.hasOwnProperty(p))continue;if(isNumericName(p))continue;if(startsWithNUM___.test(p)&&endsWith__.test(p))continue;m=p.match(endsWith_e___),m&&(result[p]=t[p])}return result},t}function
tameObjectWithMethods(f,t){return t||(t={}),t.v___=function(p){var fv,fvt;p=''+p,fv=f[p],fvt=typeof
fv;if(fvt==='function'&&p==='constructor')return tame(f[p]);if(fvt==='function'&&p!=='constructor'){if(isWhitelistedProperty(t,'m',p))return markFuncFreeze(function(_){return tame(f[p].apply(f,untameArray(arguments)))})}else
if(isWhitelistedProperty(t,'r',p))return tame(f[p]);return},t.w___=function(p,v){p=''+p;if(!isNumericName(p)&&!endsWith__.test(p)){if(isWhitelistedProperty(t,'w',p)&&!isWhitelistedReadOnly(t))return f[p]=untame(v),v};throw new
TypeError('Not writeable: '+p)},t.c___=function(p){p=''+p;if(!isNumericName(p)&&!endsWith__.test(p)){if(isWhitelistedProperty(t,'w',p)&&!isWhitelistedReadOnly(t)){if(delete
f[p])return true}};throw new TypeError('Not deleteable: '+p)},t.m___=function(p,as){p=''+p;if(!isNumericName(p)&&!endsWith__.test(p)){if(typeof
f[p]==='function'){if(isWhitelistedProperty(t,'m',p))return tame(f[p].apply(f,untameArray(as)))}};throw new
TypeError('Not a function: '+p)},t.HasProperty___=makeWhitelistingHasProperty(t,f,['r','m']),t.e___=makeEnumerate(t,f),t}function
tamePreviouslyConstructedObject(f,fc){var tc=tame(fc),t;return tc&&tc.IS_TAMED_CTOR___?(t=new
tc(TAME_CTOR_CREATE_OBJECT_ONLY),tameObjectWithMethods(f,t),t):void 0}function untame(t){var
ctor,f,ttype;if(!t)return t;if(t.FERAL_TWIN___&&t.FERAL_TWIN___.TAMED_TWIN___===t)return t.FERAL_TWIN___;ttype=typeof
t;if(ttype!=='function'&&ttype!=='object')return t;else if(isArray(t))return untameArray(t);if(!isDefinedInCajaFrame(t))throw new
TypeError('Host object leaked without being tamed');f=void 0;if(ttype==='object'){ctor=directConstructor(t);if(ctor===BASE_OBJECT_CONSTRUCTOR)f=untameCajaRecord(t);else
throw new TypeError('Untaming of guest constructed objects unsupported: '+t)}else
if(ttype==='function')f=untameCajaFunction(t);return f&&tamesTo(f,t),f}function
untameCajaRecord(t){var f={};return eviscerate(t,f),tameRecord(f,t),f}function untameCajaFunction(t){return function(_){return untame(t.apply(tame(this),tameArray(arguments)))}}function
eviscerate(t,f){ownKeys(t).forEach(function(p){if(t[p+'_v___']||isNumericName(p)){f[p]=untame(t[p]);if(!rawDelete(t,p))throw new
TypeError('Eviscerating: '+t+' failed to delete prop: '+p)}})}function markTameAsReadOnlyRecord(f){var
ctor,ftype,t;if(isDefinedInCajaFrame(f))throw new TypeError('Taming controls not for Caja objects: '+f);if(f.TAMED_TWIN___)throw new
TypeError('Already tamed: '+f);ftype=typeof f;if(ftype==='object'){ctor=directConstructor(f);if(ctor===BASE_OBJECT_CONSTRUCTOR)return t=tameRecord(f),whitelistReadOnly(t),tamesTo(f,t),f;throw new
TypeError('Not instanceof Object: '+f)}throw new TypeError('Not an object: '+f)}function
markTameAsFunction(f,name){var t;if(isDefinedInCajaFrame(f))throw new TypeError('Taming controls not for Caja objects: '+f);if(f.TAMED_TWIN___)throw new
TypeError('Already tamed: '+f);return t=tamePureFunction(f),tamesTo(f,t),f}function
markTameAsCtor(ctor,opt_super,name){var ctype,stype,t;if(isDefinedInCajaFrame(ctor))throw new
TypeError('Taming controls not for Caja objects: '+ctor);if(ctor.TAMED_TWIN___)throw new
TypeError('Already tamed: '+ctor);ctype=typeof ctor,stype=typeof opt_super;if(ctype!=='function')throw new
TypeError('Cannot tame '+ftype+' as ctor');if(opt_super&&stype!=='function')throw new
TypeError('Cannot tame '+stype+' as superclass ctor');return t=tameCtor(ctor,opt_super,name),tamesTo(ctor,t),ctor}function
markTameAsXo4a(f,name){var t;if(isDefinedInCajaFrame(f))throw new TypeError('Taming controls not for Caja objects: '+f);if(f.TAMED_TWIN___)throw new
TypeError('Already tamed: '+f);if(typeof f!=='function')throw new TypeError('Not a function: '+f);return t=tameXo4a(f),tamesTo(f,t),f}function
grantTameAsMethod(ctor,name){var tameProto;if(isDefinedInCajaFrame(ctor))throw new
TypeError('Taming controls not for Caja objects: '+ctor);if(!ctor.TAMED_TWIN___)throw new
TypeError('Not yet tamed: '+ctor);if(!ctor.TAMED_TWIN___.IS_TAMED_CTOR___===ctor.TAMED_TWIN___)throw new
TypeError('Not a tamed ctor: '+ctor);tameProto=tame(ctor.prototype),whitelistProperty(tameProto,'m',name)}function
grantTameAsRead(f,name){var t;if(isDefinedInCajaFrame(f))throw new TypeError('Taming controls not for Caja objects: '+f);t=tame(f),whitelistProperty(t,'r',name)}function
grantTameAsReadWrite(f,name){var t;if(isDefinedInCajaFrame(f))throw new TypeError('Taming controls not for Caja objects: '+f);t=tame(f),whitelistProperty(t,'r',name),whitelistProperty(t,'w',name)}function
extend(feralCtor,someSuper,opt_name){var inert,noop;'function'!==typeof feralCtor&&fail('Internal: Feral constructor is not a function'),someSuper=someSuper.prototype.constructor,noop=function(){};if(someSuper.new___===noop.new___)throw new
TypeError('Internal: toxic function encountered!');return noop.prototype=someSuper.prototype,feralCtor.prototype=new
noop,feralCtor.prototype.Prototype___=someSuper.prototype,inert=function(){throw new
TypeError('This constructor cannot be called directly.')},inert.prototype=feralCtor.prototype,feralCtor.prototype.constructor=inert,tamesTo(feralCtor,inert),markFuncFreeze(inert)}Object.prototype.CAJA_FRAME_OBJECT___=Object;function
isDefinedInCajaFrame(o){return!!o.CAJA_FRAME_OBJECT___}Object.prototype.NUM____v___=Object.prototype,Object.prototype.NUM____gw___=false,Object.prototype.NUM____w___=false,Object.prototype.NUM____m___=false,Object.prototype.NUM____c___=false,Object.prototype.NUM____e___=Object.prototype,Object.prototype.NUM____g___=void
0,Object.prototype.NUM____s___=void 0,Object.prototype.hasNumerics___=function(){return this.NUM____v___===this};function
isFrozen(obj){return obj.z___===obj}Array.prototype.length_v___=false,Array.prototype.length_gw___=false,Array.prototype.length_w___=false,Array.prototype.length_m___=false,Array.prototype.length_c___=false,Array.prototype.length_e___=false,Array.prototype.length_s___=markFunc(function(val){if(this.z___===this)throw new
TypeError('Cannot change the length of a frozen array.');val=ToUint32(val);if(val>=this.length)return this.length=val;if(!this.hasNumerics___()||this.NUM____c___===this)return this.length=val;throw new
TypeError('Shortening the array may delete non-configurable elements.')}),Array.prototype.length_g___=markFunc(function(){return this.length});function
safeDis(dis){var err;if(dis===null||dis===void 0)return USELESS;if(Type(dis)!=='Object')return dis;if('___'in
dis)throw err=new Error('Internal: toxic global!'),err.UNCATCHABLE___=true,err;return dis}endsWith__=/__$/,endsWith_e___=/([\s\S]*)_e___$/,endsWith_v___=/([\s\S]*)_v___$/,startsWithNUM___=/^NUM___/;function
assertValidPropertyName(P){if(endsWith__.test(P))throw new TypeError('Properties may not end in double underscore.')}function
callFault(var_args){var err=new Error('Internal: toxic function encountered!');throw err.UNCATCHABLE___=true,err}function
getter(obj,name){return obj[name+'_g___']}function setter(obj,name){return obj[name+'_s___']}function
hasAccessor(obj,name){var valueFlag=name+'_v___';return valueFlag in obj&&!obj[valueFlag]}function
hasOwnAccessor(obj,name){var valueFlag=name+'_v___';return obj.hasOwnProperty(valueFlag)&&!obj[valueFlag]}function
fastpathWrite(obj,name){obj[name+'_gw___']=obj,obj[name+'_m___']=false,obj[name+'_w___']=obj}function
fastpathMethod(obj,name){obj[name+'_w___']=false,obj[name+'_m___']=obj}deferredDefended=[],addToDefended=function(root){deferredDefended.push(root)},functionInstanceVoidNameGetter=markFunc(function(){return''}),addToDefended(freeze(functionInstanceVoidNameGetter));function
installFunctionInstanceProps(f){var name=f.name___;delete f.name___,f.prototype_v___=f,f.prototype_w___=f,f.prototype_gw___=f,f.prototype_c___=false,f.prototype_e___=false,f.prototype_g___=void
0,f.prototype_s___=void 0,f.prototype_m___=false,f.length_v___=f,f.length_w___=false,f.length_gw___=false,f.length_c___=false,f.length_e___=false,f.length_g___=void
0,f.length_s___=void 0,f.length_m___=false,f.name_v___=false,f.name_w___=false,f.name_gw___=false,f.name_c___=false,f.name_e___=false,f.name_g___=name===''?functionInstanceVoidNameGetter:markFuncFreeze(function(){return name}),f.name_s___=void
0,f.name_m___=false,addToDefended(f.name_g___)}function deferredV(name){return delete
this.v___,delete this.w___,delete this.c___,delete this.DefineOwnProperty___,installFunctionInstanceProps(this),this.v___?this.v___(name):void
0}function deferredW(name,val){return delete this.v___,delete this.w___,delete this.c___,delete
this.DefineOwnProperty___,installFunctionInstanceProps(this),this.w___(name,val)}function
deferredC(name){return delete this.v___,delete this.w___,delete this.c___,delete
this.DefineOwnProperty___,installFunctionInstanceProps(this),this.c___(name)}function
deferredDOP(name,desc){return delete this.v___,delete this.w___,delete this.c___,delete
this.DefineOwnProperty___,installFunctionInstanceProps(this),this.DefineOwnProperty___(name,desc)}function
markFunc(fn,name){var p;if(!isFunction(fn))throw new TypeError('Expected a function instead of '+fn);if(fn.f___!==Function.prototype.f___&&fn.f___!==fn.apply)throw new
TypeError('The function is already tamed or not from this frame.\n'+fn.f___);return fn.f___=fn.apply,fn.new___=fn,fn.name___=name===''||name===void
0?'':''+name,fn.v___=deferredV,fn.w___=deferredW,fn.c___=deferredC,fn.DefineOwnProperty___=deferredDOP,p=fn.prototype,p&&typeof
p==='object'&&!p.hasOwnProperty('constructor_v___')&&(p.constructor_v___=p,p.constructor_w___=p,p.constructor_gw___=p,p.constructor_c___=p,p.constructor_e___=false,p.constructor_g___=void
0,p.constructor_s___=void 0,p.constructor_m___=false),fn}function markSafeFunc(fn,name){return markFunc(fn,name),fn.i___=fn,fn}function
markFuncFreeze(fn,name){return freeze(markFunc(fn,name))}function hasValue(obj,name){return!!obj[name+'_v___']}function
hasOwnValue(obj,name){return obj[name+'_v___']===obj||name==='NUM___'}function guestHasOwnProperty(obj,name){return obj.hasOwnProperty(name+'_v___')||name==='NUM___'}function
isWritable(obj,name){return obj[name+'_w___']===obj?true:obj[name+'_gw___']===obj?(obj[name+'_m___']=false,obj[name+'_w___']=obj,true):name==='NUM___'&&!obj.hasNumerics___()?(obj.NUM____v___=obj,obj.NUM____gw___=obj,obj.NUM____w___=false,obj.NUM____c___=obj,obj.NUM____e___=obj,obj.NUM____g___=void
0,obj.NUM____s___=void 0,obj.NUM____m___=false,true):false}function isAssignable(obj,name){return(isWritable(obj,name)||obj[name+'_gw___'])&&obj.ne___!==obj}function
isEnumerable(obj,name){return!!obj[name+'_e___']}function isConfigurable(obj,name){return obj[name+'_c___']===obj||name==='NUM___'&&!obj.hasNumerics___()}function
isExtensible(obj){return Type(obj)==='Object'&&obj.ne___!==obj}function wouldExtend(obj,name){return isNumericName(name)?!obj.hasOwnProperty(name):hasOwnValue(obj,name)?false:!obj[name+'_s___']}function
isArray(obj){return classProp.call(obj)==='[object Array]'}function isFunction(obj){return classProp.call(obj)==='[object Function]'}function
isError(obj){return classProp.call(obj)==='[object Error]'}Object.prototype.e___=function(){return this};function
allKeys(obj){var result=[],i,m;for(i in obj)if(isNumericName(i))result.push(i);else{if(startsWithNUM___.test(i)&&endsWith__.test(i))continue;m=i.match(endsWith_v___),m&&result.push(m[1])}return result}function
ownEnumKeys(obj){var result=[],i,m;for(i in obj){if(!obj.hasOwnProperty(i))continue;if(isNumericName(i))result.push(i);else{if(startsWithNUM___.test(i)&&endsWith__.test(i))continue;m=i.match(endsWith_e___),m&&obj[i]&&result.push(m[1])}}return result}function
ownKeys(obj){var result=[],i,m;for(i in obj){if(!obj.hasOwnProperty(i))continue;if(isNumericName(i))result.push(i);else{if(startsWithNUM___.test(i)&&endsWith__.test(i))continue;m=i.match(endsWith_v___),m&&result.push(m[1])}}return result}function
ownUntamedKeys(obj){var result=[],i,m;for(i in obj)obj.hasOwnProperty(i)&&(isNumericName(i)||!endsWith__.test(i))&&result.push(i);return result}function
Token(name){return name=''+name,snowWhite({'toString':markFuncFreeze(function tokenToString(){return name}),'throwable___':true})}function
isNumericName(n){return typeof n==='number'||''+ +n===n}function jsonParseOk(json){var
x;try{return x=json.parse('{\"a\":3}'),x.a===3}catch(e){return false}}function
jsonStringifyOk(json){var x;try{return x=json.stringify({'a':3,'b__':4},function
replacer(k,v){return/__$/.test(k)?void 0:v}),x!=='{\"a\":3}'?false:(x=json.stringify(void
0,'invalid'),x===void 0)}catch(e){return false}}goodJSON={},parser=jsonParseOk(JSON)?JSON.parse:json_sans_eval.parse,goodJSON.parse=markFunc(function(){return whitelistAll(parser.apply(this,arguments),true)}),goodJSON.stringify=markFunc(jsonStringifyOk(JSON)?JSON.stringify:json_sans_eval.stringify),safeJSON=snowWhite({'CLASS___':'JSON','parse':markFunc(function(text,opt_reviver){var
reviver=void 0;return opt_reviver&&(reviver=markFunc(function(key,value){return opt_reviver.f___(this,arguments)})),goodJSON.parse(json_sans_eval.checkSyntax(text,function(key){return!endsWith__.test(key)}),reviver)}),'stringify':markFunc(function(obj,opt_replacer,opt_space){var
replacer;switch(typeof opt_space){case'number':case'string':case'undefined':break;default:throw new
TypeError('space must be a number or string')}return replacer=markFunc(opt_replacer?function(key,value){return this.HasProperty___(key)?opt_replacer.f___(this,arguments):void
0}:function(key,value){return this.HasProperty___(key)||key===''?value:void 0}),goodJSON.stringify(obj,replacer,opt_space)})});function
defaultLogger(str,opt_stop){}myLogFunc=markFuncFreeze(defaultLogger);function getLogFunc(){return myLogFunc}markFunc(getLogFunc);function
setLogFunc(newLogFunc){myLogFunc=newLogFunc}markFunc(setLogFunc);function log(str){myLogFunc(''+str)}markFunc(log);function
enforce(test,var_args){if(!test)throw new Error(slice.call(arguments,1).join(''));return true}function
enforceType(specimen,typename,opt_name){if(typeof specimen!==typename)throw new TypeError('expected '+typename+' instead of '+typeof
specimen+': '+(opt_name||specimen));return specimen}function enforceNat(specimen){enforceType(specimen,'number');if(Math.floor(specimen)!==specimen)throw new
TypeError('Must be integral: '+specimen);if(specimen<0)throw new TypeError('Must not be negative: '+specimen);if(Math.floor(specimen-1)!==specimen-1)throw new
TypeError('Beyond precision limit: '+specimen);if(Math.floor(specimen-1)>=specimen)throw new
TypeError('Must not be infinite: '+specimen);return specimen}function deprecate(func,badName,advice){var
warningNeeded=true;return function(){return warningNeeded&&(log('\"'+badName+'\" is deprecated.\n'+advice),warningNeeded=false),func.apply(USELESS,arguments)}}magicCount=0,MAGIC_NUM=Math.random(),MAGIC_TOKEN=Token('MAGIC_TOKEN_FOR:'+MAGIC_NUM),MAGIC_NAME='_index;'+MAGIC_NUM+';';function
newTable(opt_useKeyLifetime,opt_expectedSize){var myMagicIndexName,myValues;++magicCount,myMagicIndexName=MAGIC_NAME+magicCount+'___';function
setOnKey(key,value){var ktype=typeof key,i,list;if(!key||ktype!=='function'&&ktype!=='object')throw new
TypeError('Can\'t use key lifetime on primitive keys: '+key);list=key[myMagicIndexName];if(!list||list[0]!==key)key[myMagicIndexName]=[key,MAGIC_TOKEN,value];else{for(i=1;i<list.length;i+=2)if(list[i]===MAGIC_TOKEN)break;list[i]=MAGIC_TOKEN,list[i+1]=value}}function
getOnKey(key){var ktype=typeof key,i,list;if(!key||ktype!=='function'&&ktype!=='object')throw new
TypeError('Can\'t use key lifetime on primitive keys: '+key);list=key[myMagicIndexName];if(!list||list[0]!==key)return;for(i=1;i<list.length;i+=2)if(list[i]===MAGIC_TOKEN)return list[i+1];return}if(opt_useKeyLifetime)return snowWhite({'set':markFuncFreeze(setOnKey),'get':markFuncFreeze(getOnKey)});myValues=[];function
setOnTable(key,value){var index;switch(typeof key){case'object':case'function':if(null===key)return myValues.prim_null=value,void
0;index=getOnKey(key);if(value===void 0){if(index===void 0)return;setOnKey(key,void
0)}else index===void 0&&(index=myValues.length,setOnKey(key,index));break;case'string':index='str_'+key;break;default:index='prim_'+key}value===void
0?delete myValues[index]:(myValues[index]=value)}function getOnTable(key){var index;switch(typeof
key){case'object':case'function':return null===key?myValues.prim_null:(index=getOnKey(key),void
0===index?void 0:myValues[index]);case'string':return myValues['str_'+key];default:return myValues['prim_'+key]}}return snowWhite({'set':markFuncFreeze(setOnTable),'get':markFuncFreeze(getOnTable)})}registeredImports=[];function
getId(imports){var id;return enforceType(imports,'object','imports'),'id___'in imports?(id=enforceType(imports.id___,'number','id')):(id=imports.id___=registeredImports.length),registeredImports[id]=imports,id}function
getImports(id){var result=registeredImports[enforceType(id,'number','id')];if(result===void
0)throw new Error('Internal: imports#',id,' unregistered');return result}function
unregister(imports){var id;enforceType(imports,'object','imports'),'id___'in imports&&(id=enforceType(imports.id___,'number','id'),registeredImports[id]=void
0)}defended=newTable(),def=markFuncFreeze(function(root){var defending=newTable(),defendingList=[];function
recur(val){if(val!==Object(val)||defended.get(val)||defending.get(val))return;defending.set(val,true),defendingList.push(val),freeze(val),recur(origGetPrototypeOf(val)),ownKeys(val).forEach(function(p){var
desc=origGetOwnPropertyDescriptor(val,p);recur(desc.value),recur(desc.get),recur(desc.set)})}return recur(root),defendingList.forEach(function(obj){defended.set(obj,true)}),root}),addToDefended=markFuncFreeze(function(root){defended.set(root,true)}),deferredDefended.forEach(function(o){addToDefended(o)}),deferredDefended=void
0,USELESS=Token('USELESS'),NO_RESULT=Token('NO_RESULT'),TAME_CTOR_CREATE_OBJECT_ONLY=Token('TAME_CTOR_CREATE_OBJECT_ONLY');function
identity(x){return x}function callWithEjector(attemptFunc,opt_failFunc){var failFunc=opt_failFunc||identity,disabled=false,token=new
Token('ejection'),stash;token.UNCATCHABLE___=true,stash=void 0;function ejector(result){throw disabled?new
Error('ejector disabled'):(stash=result,token)}markFuncFreeze(ejector);try{try{return attemptFunc.m___('call',[USELESS,ejector])}finally{disabled=true}}catch(e){if(e===token)return failFunc.m___('call',[USELESS,stash]);throw e}}function
eject(opt_ejector,result){throw opt_ejector?(opt_ejector.m___('call',[USELESS,result]),new
Error('Ejector did not exit: ',opt_ejector)):new Error(result)}function makeTrademark(typename,table){return typename=''+typename,snowWhite({'toString':markFuncFreeze(function(){return typename+'Mark'}),'stamp':snowWhite({'toString':markFuncFreeze(function(){return typename+'Stamp'}),'mark___':markFuncFreeze(function(obj){return table.set(obj,true),obj})}),'guard':snowWhite({'toString':markFuncFreeze(function(){return typename+'T'}),'coerce':markFuncFreeze(function(specimen,opt_ejector){if(table.get(specimen))return specimen;eject(opt_ejector,'Specimen does not have the \"'+typename+'\" trademark')})})})}GuardMark=makeTrademark('Guard',newTable(true)),GuardT=GuardMark.guard,GuardStamp=GuardMark.stamp,freeze(GuardStamp.mark___(GuardT));function
Trademark(typename){var result=makeTrademark(typename,newTable(true));return freeze(GuardStamp.mark___(result.guard)),result}markFuncFreeze(Trademark);function
guard(g,specimen,opt_ejector){return g=GuardT.coerce(g),g.coerce(specimen,opt_ejector)}function
passesGuard(g,specimen){return g=GuardT.coerce(g),callWithEjector(markFuncFreeze(function(opt_ejector){return g.coerce(specimen,opt_ejector),true}),markFuncFreeze(function(ignored){return false}))}function
stamp(stamps,record){var i,numStamps;if(isFrozen(record))throw new TypeError('Can\'t stamp frozen objects: '+record);stamps=Array.slice(stamps,0),numStamps=stamps.length;for(i=0;i<numStamps;++i)if(!('mark___'in
stamps[i]))throw new TypeError('Can\'t stamp with a non-stamp: '+stamps[i]);for(i=0;i<numStamps;++i)stamps[i].mark___(record);return freeze(record)}function
makeSealerUnsealerPair(){var table=newTable(true),undefinedStandin={};function seal(payload){var
box;return payload===void 0&&(payload=undefinedStandin),box=Token('(box)'),table.set(box,payload),box}function
unseal(box){var payload=table.get(box);if(payload===void 0)throw new TypeError('Sealer/Unsealer mismatch');else
if(payload===undefinedStandin)return;return payload}return snowWhite({'seal':markFuncFreeze(seal),'unseal':markFuncFreeze(unseal)})}function
manifest(ignored){}function tameException(ex){var name;if(ex&&ex.UNCATCHABLE___)throw ex;try{switch(typeof
ex){case'string':case'number':case'boolean':case'undefined':return ex;case'object':return ex===null?null:ex.throwable___?ex:isError(ex)?freeze(ex):''+ex;case'function':name=''+(ex.v___('name')||ex);function
inLieuOfThrownFunction(){return'In lieu of thrown function: '+name}return markFuncFreeze(inLieuOfThrownFunction,name);default:return log('Unrecognized exception type: '+typeof
ex),'Unrecognized exception type: '+typeof ex}}catch(_){return log('Exception during exception handling.'),'Exception during exception handling.'}}function
Type(x){switch(typeof x){case'undefined':return'Undefined';case'boolean':return'Boolean';case'string':return'String';case'number':return'Number';default:return x?'Object':'Null'}}attributeDefaults={'value':void
0,'get':void 0,'set':void 0,'writable':false,'enumerable':false,'configurable':false};function
isPrimitive(x){return Type(x)!=='Object'}function IsAccessorDescriptor(Desc){return Desc===void
0?false:'get'in Desc?true:'set'in Desc}function IsDataDescriptor(Desc){return Desc===void
0?false:'value'in Desc?true:'writable'in Desc}function IsGenericDescriptor(Desc){return Desc===void
0?false:!IsAccessorDescriptor(Desc)&&!IsDataDescriptor(Desc)}function FromPropertyDescriptor(Desc){var
obj;function copyProp(Desc,obj,name){obj.DefineOwnProperty___(name,{'value':Desc[name],'writable':true,'enumerable':true,'configurable':true})}return Desc===void
0?void 0:(obj={},IsDataDescriptor(Desc)?(copyProp(Desc,obj,'value'),copyProp(Desc,obj,'writable')):(copyProp(Desc,obj,'get'),copyProp(Desc,obj,'set')),copyProp(Desc,obj,'enumerable'),copyProp(Desc,obj,'configurable'),obj)}function
ToPropertyDescriptor(Obj){var desc,getter,setter;if(Type(Obj)!=='Object')throw new
TypeError('Expected an object.');desc={},Obj.HasProperty___('enumerable')&&(desc.enumerable=!!Obj.v___('enumerable')),Obj.HasProperty___('configurable')&&(desc.configurable=!!Obj.v___('configurable')),Obj.HasProperty___('value')&&(desc.value=Obj.v___('value')),Obj.HasProperty___('writable')&&(desc.writable=!!Obj.v___('writable'));if(Obj.HasProperty___('get')){getter=Obj.v___('get');if(!isFunction(getter)&&getter!==void
0)throw new TypeError('Getter attributes must be functions or undef.');desc.get=getter}if(Obj.HasProperty___('set')){setter=Obj.v___('set');if(!isFunction(setter)&&setter!==void
0)throw new TypeError('Setter attributes must be functions or undef.');desc.set=setter}if('set'in
desc||'get'in desc){if('value'in desc)throw new TypeError('Accessor properties must not have a value.');if('writable'in
desc)throw new TypeError('Accessor properties must not be writable.')}return desc}Object.prototype.GetOwnProperty___=function(P){var
O=this,D;if(typeof P==='number'||''+ +P===P)return O.hasOwnProperty(P)?{'value':O[P],'writable':isWritable(O,'NUM___'),'configurable':isConfigurable(O,'NUM___'),'enumerable':true}:void
0;P=''+P;if(endsWith__.test(P))throw new TypeError('Properties may not end in double underscore.');return!O.hasOwnProperty(P+'_v___')&&P!=='NUM___'?void
0:(D={},hasValue(O,P)?(D.value=O[P],D.writable=isWritable(O,P)):(D.get=getter(O,P),D.set=setter(O,P)),D.enumerable=isEnumerable(O,P),D.configurable=isConfigurable(O,P),D)},Object.prototype.v___=function(P){var
g;return P=''+P,isNumericName(P)?this[P]:(assertValidPropertyName(P),g=getter(this,P),g?g.f___(this):hasValue(this,P)?this[P]:this.handleRead___?this.handleRead___(P):void
0)},Object.prototype.w___=function(P,V){var thisExtensible=isExtensible(this),s;P=''+P,assertValidPropertyName(P);if(!thisExtensible){if(wouldExtend(this,P))throw new
TypeError('Could not create the property \''+P+'\': '+this+' is not extensible.')};if(isNumericName(P)){if(isAssignable(this,'NUM___')||!this.hasNumerics___())return this[P]=V;throw new
TypeError('The property \''+P+'\' is not writable.')}s=setter(this,P);if(s)return s.f___(this,[V]),V;if(P+'_v___'in
this){if(isAssignable(this,P))return fastpathWrite(this,P),this[P]=V;throw new TypeError('The property \''+P+'\' is not writable.')}if(this.handleSet___)return this.handleSet___(P,V),V;if(!this.hasOwnProperty(P)&&isExtensible(this))return this.DefineOwnProperty___(P,{'value':V,'writable':true,'configurable':true,'enumerable':true}),V;throw new
TypeError('The property \''+P+'\' is not writable.')},Object.prototype.HasProperty___=function(P){return(isNumericName(P)?P:P+'_v___')in
this};function rawDelete(O,P){return delete O[P]&&delete O[P+'_v___']&&delete O[P+'_w___']&&delete
O[P+'_gw___']&&delete O[P+'_g___']&&delete O[P+'_s___']&&delete O[P+'_c___']&&delete
O[P+'_e___']&&delete O[P+'_m___']}Object.prototype.c___=function(P){var O=this,desc,result;P=''+P;if(O.handleDelete___){result=this.handleDelete___(P);if(!result)throw new
TypeError('Cannot delete '+P+' on '+O);return true}desc=O.GetOwnProperty___(P);if(!desc)return true;if(desc.configurable){if(isNumericName(P)){if(isDeodorized(O,P))throw new
TypeError('Cannot delete Firefox-specific antidote \''+P+'\' on '+O);return delete
O[P],true}return rawDelete(O,P),true}throw new TypeError('Cannot delete \''+P+'\' on '+O)},Object.prototype.DefineOwnProperty___=function(P,Desc){var
O,allHaveAppearedAndAreTheSame,current,extensible,i,iddCurrent,iddDesc;if(typeof
P==='number'||''+ +P===P)throw new TypeError('Cannot define numeric properties.');O=this,P=''+P,current=O.GetOwnProperty___(P),extensible=Type(O)==='Object'&&O.ne___!==O;if(!current&&!extensible)throw new
TypeError('This object is not extensible.');if(!current&&extensible)return IsDataDescriptor(Desc)||IsGenericDescriptor(Desc)?(O[P]=Desc.value,O[P+'_v___']=O,O[P+'_w___']=false,O[P+'_gw___']=Desc.writable?O:false,O[P+'_e___']=Desc.enumerable?O:false,O[P+'_c___']=Desc.configurable?O:false,O[P+'_g___']=void
0,O[P+'_s___']=void 0):(Desc.configurable&&(O[P]=void 0),O[P+'_v___']=false,O[P+'_w___']=O[P+'_gw___']=false,O[P+'_e___']=Desc.enumerable?O:false,O[P+'_c___']=Desc.configurable?O:false,O[P+'_g___']=Desc.get,O[P+'_s___']=Desc.set),O[P+'_m___']=false,true;if(!('value'in
Desc||'writable'in Desc||'enumerable'in Desc||'configurable'in Desc||'get'in Desc||'set'in
Desc))return true;allHaveAppearedAndAreTheSame=true;for(i in Desc){if(!Desc.hasOwnProperty(i))continue;if(!SameValue(current.v___(i),Desc[i])){allHaveAppearedAndAreTheSame=false;break}}if(allHaveAppearedAndAreTheSame)return true;if(!current.configurable){if(Desc.configurable)throw new
TypeError('The property \''+P+'\' is not configurable.');if('enumerable'in Desc&&Desc.enumerable!==current.enumerable)throw new
TypeError('The property \''+P+'\' is not configurable.')}iddCurrent=IsDataDescriptor(current),iddDesc=IsDataDescriptor(Desc);if(IsGenericDescriptor(Desc));else
if(iddCurrent!==iddDesc){if(!current.configurable)throw new TypeError('The property \''+P+'\' is not configurable.');iddCurrent?(O[P]=void
0,O[P+'_v___']=false):(O[P]=Desc.value,O[P+'_v___']=O),O[P+'_w___']=O[P+'_gw___']=false,O[P+'_g___']=void
0,O[P+'_s___']=void 0,O[P+'_m___']=false}else if(iddCurrent&&iddDesc){if(!current.configurable){if(!current.writable&&Desc.writable)throw new
TypeError('The property \''+P+'\' is not configurable.');if(!current.writable){if('value'in
Desc&&!SameValue(Desc.value,current.value))throw new TypeError('The property \''+P+'\' is not writable.')}}}else
if(!current.configurable){if('set'in Desc&&!SameValue(Desc.set,current.set)||'get'in
Desc&&!SameValue(Desc.get,current.get))throw new TypeError('The property \''+P+'\' is not configurable.')};return iddDesc?(O[P]=Desc.value,O[P+'_v___']=O,O[P+'_gw___']=Desc.writable?O:false,O[P+'_g___']=O[P+'_s___']=void
0):(O[P+'_v___']=false,O[P+'_gw___']=false,O[P+'_g___']=Desc.get,O[P+'_s___']=Desc.set),O[P+'_e___']=Desc.enumerable?O:false,O[P+'_c___']=Desc.configurable?O:false,O[P+'_m___']=false,O[P+'_w___']=false,true};function
ToUint32(input){return input>>>0}function ToObject(input){if(input===void 0||input===null)throw new
TypeError('Cannot convert '+t+' to Object.');return Object(input)}function SameValue(x,y){return x===y?x!==0||1/x===1/y:x!==x&&y!==y}function
asFirstClass(value){var err;if(isFunction(value)&&value.f___===Function.prototype.f___)throw err=new
Error('Internal: toxic function encountered!'),err.UNCATCHABLE___=true,err;return value}function
initializeMap(list){var result={},accessors={},i,name,type;for(i=0;i<list.length;i+=2)if(typeof
list[i]==='string'){if(result.hasOwnProperty(list[i]))throw new SyntaxError('Duplicate keys: '+list[i]);isNumericName(list[i])?(result[list[i]]=asFirstClass(list[i+1])):result.DefineOwnProperty___(list[i],{'value':asFirstClass(list[i+1]),'writable':true,'enumerable':true,'configurable':true})}else{name=list[i][0];if(isNumericName(name))throw new
TypeError('Accessors not supported for numerics.');type=list[i][1],accessors[name]=accessors[name]||{};if(accessors[name].hasOwnProperty(type))throw new
SyntaxError('Duplicate accessor keys: '+type+' '+list[i]);accessors[name][type]=asFirstClass(list[i+1])}for(i
in accessors){if(endsWith__.test(i))continue;if(!accessors.hasOwnProperty(i))continue;result.DefineOwnProperty___(i,{'get':accessors[i].get,'set':accessors[i].set,'enumerable':true,'configurable':true})}return result}function
makePoisonPill(badThing){function poisonPill(){throw new TypeError(''+badThing+' is forbidden by ES5/strict')}return markFunc(poisonPill)}poisonFuncCaller=makePoisonPill('A function\'s .caller'),poisonFuncArgs=makePoisonPill('A function\'s .arguments'),Function.prototype.f___=callFault,Function.prototype.i___=function(var_args){return this.f___(USELESS,slice.call(arguments,0))},Function.prototype.new___=callFault,Function.prototype.DefineOwnProperty___('arguments',{'enumerable':false,'configurable':false,'get':poisonFuncArgs,'set':poisonFuncArgs}),Function.prototype.DefineOwnProperty___('caller',{'enumerable':false,'configurable':false,'get':poisonFuncCaller,'set':poisonFuncCaller}),poisonArgsCallee=makePoisonPill('arguments.callee'),poisonArgsCaller=makePoisonPill('arguments.caller');function
args(original){var result=initializeMap(['length',0]);return push.apply(result,original),result.CLASS___='Arguments',result.DefineOwnProperty___('callee',{'enumerable':false,'configurable':false,'get':poisonArgsCallee,'set':poisonArgsCallee}),result.DefineOwnProperty___('caller',{'enumerable':false,'configurable':false,'get':poisonArgsCaller,'set':poisonArgsCaller}),result}function
Y(maker){function recurse(x){return maker(markFunc(function(var_args){return x(x).apply(this,arguments)}))}return recurse(recurse)}function
isIn(name,obj){var t=Type(obj);if(t!=='Object')throw new TypeError('Invalid \"in\" operand: '+obj);return obj.HasProperty___(name)}function
virtualize(obj,name,fun){var vname=name+'_virt___';obj[vname]=fun?markFunc(fun):obj[name]?markFunc(obj[name]):void
0,obj.DefineOwnProperty___(name,{'get':markFunc(function(){return this[vname]}),'set':markFunc(function(val){if(!isFunction(val))throw new
TypeError('Expected a function instead of '+val);if(isFrozen(this))throw new TypeError('This object is frozen.');if(!isExtensible(this)&&!this.hasOwnProperty(vname))throw new
TypeError('This object is not extensible.');this[vname]=asFirstClass(val)}),'enumerable':false,'configurable':false})}markFunc(decodeURI),markFunc(decodeURIComponent),markFunc(encodeURI),markFunc(encodeURIComponent),Object.f___=markFunc(function(dis,as){var
len=as.length;return len===0||as[0]===null||as[0]===void 0?{}:ToObject(as[0])}),Object.new___=markFunc(function(value){return Object.f___(USELESS,[value])}),Object.DefineOwnProperty___('prototype',{'value':Object.prototype,'writable':false,'enumerable':false,'configurable':false}),Object.getPrototypeOf||(Object.getPrototypeOf=function(obj){var
constr;if(Type(obj)!=='Object')throw new TypeError('Not an object.');return Object.hasOwnProperty('Prototype___')||(({}).__proto__===Object.prototype?(obj.Prototype___=obj.__proto__):(constr=directConstructor(obj),constr===BASE_OBJECT_CONSTRUCTOR?(obj.Prototype___=obj.baseProto___):constr===void
0?(obj.Prototype___=null):(obj.Prototype___=constr.prototype))),obj.Prototype___}),origGetPrototypeOf=Object.getPrototypeOf,Object.getOwnPropertyDescriptor=function(obj,P){var
desc,name;if(Type(obj)!=='Object')throw new TypeError('Expected an object.');return name=''+P,desc=obj.GetOwnProperty___(name),FromPropertyDescriptor(desc)},origGetOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,virtualize(Object,'getOwnPropertyNames',ownKeys);function
beget(proto){var result;if(proto===null)throw new TypeError('Cannot beget from null.');if(proto===void
0)throw new TypeError('Cannot beget from undefined.');function F(){}return F.prototype=proto,result=new
F,result}Object.create=function(O,opt_Properties){var obj;if(Type(O)!=='Object')throw new
TypeError('Expected an object.');return obj=beget(O),opt_Properties!==void 0&&DefineProperties(obj,opt_Properties),obj},Object.defineProperty=function(O,P,Attributes){var
desc,name;if(Type(O)!=='Object')throw new TypeError('Expected an object.');return name=''+P,desc=ToPropertyDescriptor(Attributes),O.DefineOwnProperty___(name,desc),O};function
DefineProperties(O,Properties){var P,desc,descObj,descriptors,i,len,names,props;if(Type(O)!=='Object')throw new
TypeError('Expected an object.');props=ToObject(Properties),names=ownEnumKeys(props),descriptors=[],len=names.length;for(i=0;i<len;++i)P=names[i],descObj=props.v___(P),desc=ToPropertyDescriptor(descObj),descriptors.push(desc);for(i=0;i<len;++i)P=names[i],desc=descriptors[i],O.DefineOwnProperty___(P,desc);return O}Object.defineProperties=DefineProperties,Object.seal=function(O){var
P,i,keys,len;if(Type(O)!=='Object')throw new TypeError('Only objects may be sealed.');keys=ownKeys(O),len=keys.length;for(i=0;i<len;++i){P=keys[i];if(isNumericName(P))continue;O[P+'_c___']=false}return O.hasNumerics___()||(O.NUM____v___=O,O.NUM____gw___=O,O.NUM____w___=O,O.NUM____m___=false,O.NUM____e___=O,O.NUM____g___=void
0,O.NUM____s___=void 0),O.NUM____c___=false,O.ne___=O,O};function freeze(obj){var
i,j,m;if(Type(obj)!=='Object')throw new TypeError('Only objects may be frozen.');if(obj.z___===obj)return obj;obj.v___===deferredV&&obj.v___('length'),obj.ne___=obj;for(i
in obj){if(!obj.hasOwnProperty(i))continue;if(isNumericName(i))continue;m=i.match(endsWith_v___);if(!m)continue;j=m[1],obj[j+'_c___']=false,obj[j+'_gw___']=false,obj[j+'_w___']=false}return obj.hasNumerics___()||(obj.NUM____v___=obj,obj.NUM____e___=obj,obj.NUM____g___=void
0,obj.NUM____s___=void 0),obj.NUM____c___=false,obj.NUM____w___=false,obj.NUM____m___=false,obj.NUM____gw___=false,obj.z___=obj,obj}function
whitelistAll(obj,opt_deep){var i,isObj;for(i in obj)obj.hasOwnProperty(i)&&!endsWith__.test(i)&&!(i+'_v___'in
obj)&&(isObj=typeof obj[i]==='object',opt_deep&&isObj&&whitelistAll(obj[i],true),obj[i+'_v___']=obj,obj[i+'_w___']=false,obj[i+'_gw___']=false,obj[i+'_e___']=obj,obj[i+'_c___']=false,obj[i+'_g___']=void
0,obj[i+'_s___']=void 0,obj[i+'_m___']=false,isFunction(obj[i])&&(obj[i].f___===Function.prototype.f___&&markFunc(obj[i])));return obj}function
snowWhite(obj){return freeze(whitelistAll(obj))}Object.freeze=freeze,Object.preventExtensions=function(O){return O.hasNumerics___()||(O.NUM____v___=O,O.NUM____e___=O,O.NUM____g___=void
0,O.NUM____s___=void 0,O.NUM____c___=O,O.NUM____gw___=O,O.NUM____w___=O,O.NUM____m___=false),O.ne___=O,O},Object.isSealed=function(O){var
i;if(Type(O)!=='Object')throw new TypeError('Only objects may be frozen.');for(i
in O){if(endsWith__.test(i))continue;if(!O.hasOwnProperty(i))continue;if(isNumericName(i))continue;if(O[i+'_c___'])return false}return O.ne___===O},Object.isFrozen=isFrozen,Object.isExtensible=isExtensible,virtualize(Object,'keys',ownEnumKeys),(function(){var
objectStaticMethods=['getPrototypeOf','getOwnPropertyDescriptor','create','defineProperty','defineProperties','seal','freeze','preventExtensions','isSealed','isFrozen','isExtensible'],len=objectStaticMethods.length,i,name;for(i=0;i<len;++i)name=objectStaticMethods[i],Object.DefineOwnProperty___(name,{'value':markFunc(Object[name]),'writable':true,'enumerable':false,'configurable':true})})(),Object.DefineOwnProperty___('constructor',{'value':Object,'writable':false,'enumerable':false,'configurable':false}),Object.prototype.toString=markFunc(function(){return this.CLASS___?'[object '+this.CLASS___+']':classProp.call(this)}),Object.prototype.DefineOwnProperty___('toString',{'get':markFunc(function(){return this.toString.orig___?this.toString.orig___:this.toString}),'set':markFunc(function(val){if(!isFunction(val))throw new
TypeError('Expected a function instead of '+val);if(isFrozen(this))throw new TypeError('Won\'t set toString on a frozen object.');val=asFirstClass(val),this.toString=markFunc(function(var_args){return val.f___(safeDis(this),arguments)}),this.toString.orig___=val}),'enumerable':false,'configurable':false}),markFunc(Object.prototype.valueOf),Object.prototype.DefineOwnProperty___('valueOf',{'get':markFunc(function(){return this.valueOf.orig___?this.valueOf.orig___:this.valueOf}),'set':markFunc(function(val){if(!isFunction(val))throw new
TypeError('Expected a function instead of '+val);if(isFrozen(this))throw new TypeError('Won\'t set valueOf on a frozen object.');val=asFirstClass(val),this.valueOf=markFunc(function(var_args){return val.f___(safeDis(this),arguments)}),this.valueOf.orig___=val}),'enumerable':false,'configurable':false}),virtualize(Object.prototype,'hasOwnProperty',function(P){return isNumericName(P)?this.hasOwnProperty(P):guestHasOwnProperty(this,P)}),virtualize(Object.prototype,'propertyIsEnumerable',function(V){return isEnumerable(this,''+V)}),(function(){var
methods=['toLocaleString','isPrototypeOf'],len=methods.length,i,name;for(i=0;i<len;++i)name=methods[i],virtualize(Object.prototype,name)})(),freeze(Object.prototype),FakeFunction=function(){throw new
Error('Internal: FakeFunction should not be directly invocable.')},FakeFunction.toString=(function(str){return function(){return str}})(Function.toString()),Function.f___=FakeFunction.f___=markFunc(function(){throw new
Error('Invoking the Function constructor is unsupported.')}),Function.new___=FakeFunction.new___=markFunc(function(){throw new
Error('Constructing functions dynamically is unsupported.')}),FakeFunction.DefineOwnProperty___('prototype',{'value':Function.prototype,'writable':false,'enumerable':false,'configurable':false}),Function.prototype.DefineOwnProperty___('constructor',{'value':FakeFunction,'writable':true,'enumerable':false,'configurable':false}),(function(){var
orig=Function.prototype.toString;Function.prototype.toString=markFunc(function(){return this.toString___?this.toString___():orig.call(this)})})(),virtualize(Function.prototype,'call',function(dis,var_args){return this.apply(safeDis(dis),slice.call(arguments,1))}),virtualize(Function.prototype,'apply',function(dis,as){return this.apply(safeDis(dis),as?slice.call(as,0):undefined)}),Function.prototype.bind=markFunc(function(self,var_args){var
thisFunc=safeDis(this),leftArgs=slice.call(arguments,1);function funcBound(var_args){var
args=leftArgs.concat(slice.call(arguments,0));return thisFunc.apply(safeDis(self),args)}return delete
funcBound.prototype,funcBound.f___=funcBound.apply,funcBound.new___=function(){throw'Constructing the result of a bind() not yet implemented.'},funcBound}),virtualize(Function.prototype,'bind'),markFunc(Array),Array.DefineOwnProperty___('prototype',{'value':Array.prototype,'writable':false,'enumerable':false,'configurable':false}),Array.isArray=markFunc(isArray),Array.DefineOwnProperty___('isArray',{'value':Array.isArray,'writable':true,'enumerable':false,'configurable':true}),virtualize(Array,'slice'),Array.prototype.DefineOwnProperty___('constructor',{'value':Array.prototype.constructor,'writable':true,'enumerable':false,'configurable':false}),markFunc(Array.prototype.toString),(function(){var
methods=['toLocaleString','concat','join','pop'],i,len;for(i=0,len=methods.length;i<len;++i)virtualize(Array.prototype,methods[i])})();function
whitelistLengthIfItExists(dis){'length'in dis&&!('length_v___'in dis)&&dis.DefineOwnProperty___('length',{'value':dis.length,'writable':true,'configurable':true,'enumerable':true})}function
guardedVirtualize(obj,name){var orig=obj[name];virtualize(obj,name,function(var_args){var
dis,result;if(!isExtensible(this))throw new TypeError('This object is not extensible.');return dis=safeDis(this),result=orig.apply(dis,arguments),whitelistLengthIfItExists(dis),result})}(function(){var
methods=['push','reverse','shift','splice','unshift'],i,len;for(i=0,len=methods.length;i<len;++i)guardedVirtualize(Array.prototype,methods[i])})(),virtualize(Array.prototype,'slice'),virtualize(Array.prototype,'sort',function(comparefn){var
result;if(!isAssignable(this,'NUM___'))throw new TypeError('Cannot sort an object whose numeric properties are not writable.');if(!isExtensible(this))throw new
TypeError('Cannot sort an object that is not extensible.');return result=comparefn?Array.prototype.sort.call(this,markFunc(function(var_args){return comparefn.f___(this,arguments)})):Array.prototype.sort.call(this),whitelistLengthIfItExists(this),result}),Array.prototype.indexOf=markFunc(function(value,fromIndex){var
len=this.length>>>0,i;if(!len)return -1;i=fromIndex||0;if(i>=len)return -1;i<0&&(i+=len);for(;i<len;++i){if(!this.hasOwnProperty(i))continue;if(value===this[i])return i}return -1}),virtualize(Array.prototype,'indexOf'),Array.prototype.lastIndexOf=function(value,fromIndex){var
len=this.length,i;if(!len)return -1;i=arguments[1]||len,i<0&&(i+=len),i=Math.min___(i,len-1);for(;i>=0;--i){if(!this.hasOwnProperty(i))continue;if(value===this[i])return i}return -1},virtualize(Array.prototype,'lastIndexOf');function
createOrWrap(obj,name,fun){var vname;virtualize(obj,name),vname=name+'_virt___',obj[name]?(obj[vname]=(function(orig){return function(block){var
a=slice.call(arguments,0);return a[0]=markFunc(function(var_args){return block.f___(this,arguments)}),orig.apply(this,a)}})(obj[name])):(obj[vname]=fun),markFunc(obj[vname])}createOrWrap(Array.prototype,'every',function(block,thisp){var
len=this.length>>>0,i;for(i=0;i<len;++i)if(!block.f___(thisp,[this[i]]))return false;return true}),createOrWrap(Array.prototype,'some',function(block,thisp){var
len=this.length>>>0,i;for(i=0;i<this.length;++i)if(block.f___(thisp,[this[i]]))return true;return false}),virtualize(Array.prototype,'forEach',function(block,thisp){var
len=this.length>>>0,i;for(i=0;i<len;++i)i in this&&block.f___(thisp,[this[i],i,this])}),createOrWrap(Array.prototype,'map',function(fun,thisp){var
len=this.length>>>0,i,res;if(!isFunction(fun))throw new TypeError('Expected a function instead of '+fun);res=new
Array(len);for(i=0;i<len;++i)i in this&&(res[i]=fun.f___(thisp,[this[i],i,this]));return res}),createOrWrap(Array.prototype,'filter',function(block,thisp){var
values=[],len=this.length>>>0,i;for(i=0;i<len;++i)block.f___(thisp,[this[i]])&&values.push(this[i]);return values}),createOrWrap(Array.prototype,'reduce',function(fun){var
len=this.length>>>0,i,rv;if(!isFunction(fun))throw new TypeError('Expected a function instead of '+fun);if(len===0&&arguments.length===1)throw new
TypeError('Expected an initial value or a non-empty array.');i=0;if(arguments.length>=2)rv=arguments[1];else
do{if(i in this){rv=this[i++];break}if(++i>=len)throw new TypeError('Expected non-empty array.')}while(true);for(;i<len;++i)i
in this&&(rv=fun.f___(USELESS,[rv,this[i],i,this]));return rv}),createOrWrap(Array.prototype,'reduceRight',function(fun){var
len=this.length>>>0,i,rv;if(!isFunction(fun))throw new TypeError('Expected a function instead of '+fun);if(len===0&&arguments.length===1)throw new
TypeError('Expected an initial value or a non-empty array.');i=len-1;if(arguments.length>=2)rv=arguments[1];else
do{if(i in this){rv=this[i--];break}if(--i<0)throw new TypeError('Expected a non-empty array.')}while(true);for(;i>=0;--i)i
in this&&(rv=fun.f___(USELESS,[rv,this[i],i,this]));return rv}),markFunc(String),String.DefineOwnProperty___('prototype',{'value':String.prototype,'writable':false,'enumerable':false,'configurable':false}),virtualize(String,'fromCharCode'),String.prototype.DefineOwnProperty___('constructor',{'value':String.prototype.constructor,'writable':true,'enumerable':false,'configurable':false}),markFunc(String.prototype.toString),markFunc(String.prototype.valueOf),(function(){var
methods=['charAt','charCodeAt','concat','indexOf','lastIndexOf','localeCompare','slice','substring','toLowerCase','toLocaleLowerCase','toUpperCase','toLocaleUpperCase','substr'],len=methods.length,i;for(i=0;i<len;++i)virtualize(String.prototype,methods[i])})();function
enforceMatchable(regexp){if(regexp instanceof RegExp){if(isFrozen(regexp))throw new
Error('Can\'t match with frozen RegExp: '+regexp);return false}return true}function
tameStringRegExp(orig){return markFunc(function(regexp){var cast=enforceMatchable(regexp);return orig.call(this,cast?''+regexp:regexp)})}(function(){var
methods=['match','search','split'],i,len;for(i=0,len=methods.length;i<len;++i)virtualize(String.prototype,methods[i],tameStringRegExp(String.prototype[methods[i]]))})(),virtualize(String.prototype,'replace',function(searcher,replacement){var
cast=enforceMatchable(searcher);return isFunction(replacement)?(replacement=asFirstClass(replacement)):(replacement=''+replacement),String.prototype.replace.call(this,cast?''+searcher:searcher,replacement)}),trimBeginRegexp=/^\s\s*/,trimEndRegexp=/\s\s*$/,virtualize(String.prototype,'trim',function(){return(''+this).replace(trimBeginRegexp,'').replace(trimEndRegexp,'')}),markFunc(Boolean),Boolean.DefineOwnProperty___('prototype',{'value':Boolean.prototype,'writable':false,'enumerable':false,'configurable':false}),Boolean.prototype.DefineOwnProperty___('constructor',{'value':Boolean.prototype.constructor,'writable':true,'enumerable':false,'configurable':false}),markFunc(Number),(function(){var
props=['prototype','MAX_VALUE','MIN_VALUE','NEGATIVE_INFINITY','POSITIVE_INFINITY'],len=props.length,i;for(i=0;i<len;++i)Number.DefineOwnProperty___(props[i],{'value':Number[props[i]],'writable':false,'enumerable':false,'configurable':false})})(),Number.prototype.DefineOwnProperty___('constructor',{'value':Number.prototype.constructor,'writable':true,'enumerable':false,'configurable':false}),markFunc(Number.prototype.toString),markFunc(Number.prototype.valueOf),(function(){var
methods=['toLocaleString','toFixed','toExponential','toPrecision'],len=methods.length,i;for(i=0;i<len;++i)virtualize(Number.prototype,methods[i])})(),(function(){var
props=['E','LN10','LN2','LOG2E','LOG10E','PI','SQRT1_2','SQRT2'],len=props.length,i;for(i=0;i<len;++i)Math.DefineOwnProperty___(props[i],{'value':Math[props[i]],'writable':false,'enumerable':false,'configurable':false})})(),(function(){var
methods=['abs','acos','asin','atan','atan2','ceil','cos','exp','floor','log','max','min','pow','random','round','sin','sqrt','tan'],len=methods.length,i;for(i=0;i<len;++i)virtualize(Math,methods[i])})(),markFunc(Date),Date.DefineOwnProperty___('prototype',{'value':Date.prototype,'writable':false,'enumerable':false,'configurable':false}),(function(){var
staticMethods=['parse','UTC','now'],len=staticMethods.length,i;for(i=0;i<len;++i)virtualize(Date,staticMethods[i])})(),Date.prototype.DefineOwnProperty___('constructor',{'value':Date.prototype.constructor,'writable':true,'enumerable':false,'configurable':false}),markFunc(Date.prototype.toString),markFunc(Date.prototype.valueOf),(function(){var
methods=['toDateString','toTimeString','toLocaleString','toLocaleDateString','toLocaleTimeString','getTime','getFullYear','getMonth','getDate','getDay','getHours','getMinutes','getSeconds','getUTCSeconds','getUTCMinutes','getUTCHours','getUTCDay','getUTCDate','getUTCMonth','getUTCFullYear','getMilliseconds','getTimezoneOffset','setFullYear','setMonth','setDate','setHours','setMinutes','setSeconds','setMilliseconds','setTime','toISOString','toJSON'],i;for(i=0;i<methods.length;++i)virtualize(Date.prototype,methods[i])})(),RegExp.f___=markFunc(function(dis___,as){var
pattern=as[0],flags=as[1];if(classProp.call(pattern)==='[object RegExp]'&&flags===void
0)return pattern;switch(as.length){case 0:return new RegExp.new___;case 1:return new
RegExp.new___(pattern);default:return new RegExp.new___(pattern,flags)}}),RegExp.new___=markFunc(function(pattern,flags){var
i,instanceProps,re;switch(arguments.length){case 0:re=new RegExp;break;case 1:re=new
RegExp(pattern);break;default:re=new RegExp(pattern,flags)}instanceProps=['source','global','ignoreCase','multiline'];for(i=0;i<instanceProps.length;++i)re.DefineOwnProperty___(instanceProps[i],{'value':re[instanceProps[i]],'writable':false,'enumerable':false,'configurable':false});return re.DefineOwnProperty___('lastIndex',{'value':re.lastIndex,'writable':true,'enumerable':false,'configurable':false}),re}),RegExp.DefineOwnProperty___('prototype',{'value':RegExp.prototype,'writable':false,'enumerable':false,'configurable':false}),RegExp.prototype.DefineOwnProperty___('constructor',{'value':RegExp,'writable':true,'enumerable':false,'configurable':false}),virtualize(RegExp.prototype,'exec',function(specimen){return RegExp.prototype.exec.call(safeDis(this),specimen)}),virtualize(RegExp.prototype,'test',function(specimen){return RegExp.prototype.test.call(safeDis(this),specimen)}),markFunc(Error),Error.DefineOwnProperty___('prototype',{'value':Error.prototype,'enumerable':false,'configurable':false,'writable':true}),Error.prototype.DefineOwnProperty___('constructor',{'value':Error,'enumerable':false,'configurable':false,'writable':true}),Error.prototype.DefineOwnProperty___('name',{'value':'Error','enumerable':false,'configurable':false,'writable':true}),Error.prototype.DefineOwnProperty___('message',{'value':'','enumerable':false,'configurable':false,'writable':true}),markFunc(Error.prototype.toString),markFunc(EvalError),markFunc(RangeError),markFunc(ReferenceError),markFunc(SyntaxError),markFunc(TypeError),markFunc(URIError);function
getNewModuleHandler(){return myNewModuleHandler}function setNewModuleHandler(newModuleHandler){myNewModuleHandler=newModuleHandler}obtainNewModule=snowWhite({'handle':markFuncFreeze(function
handleOnly(newModule){return newModule})});function registerClosureInspector(module){this&&this.CLOSURE_INSPECTOR___&&this.CLOSURE_INSPECTOR___.supportsCajaDebugging&&this.CLOSURE_INSPECTOR___.registerCajaModule(module)}function
copy(obj){var result=Array.isArray(obj)?[]:{},keys=ownKeys(obj),len=keys.length,i,k,v;for(i=0;i<len;++i)k=keys[i],v=obj[k],isNumericName(k)?(result[k]=v):result.DefineOwnProperty___(k,{'value':v,'writable':true,'enumerable':true,'configurable':true});return result}function
makeNormalNewModuleHandler(){var imports=void 0,lastOutcome=void 0;function getImports(){return imports||(imports=copy(sharedImports)),imports}return snowWhite({'getImports':markFuncFreeze(getImports),'setImports':markFuncFreeze(function
setImports(newImports){imports=newImports}),'getLastOutcome':markFuncFreeze(function
getLastOutcome(){return lastOutcome}),'getLastValue':markFuncFreeze(function getLastValue(){return lastOutcome&&lastOutcome[0]?lastOutcome[1]:void
0}),'handle':markFuncFreeze(function handle(newModule){var outcome,result;registerClosureInspector(newModule),outcome=void
0;try{result=newModule.instantiate(___,getImports()),result!==NO_RESULT&&(outcome=[true,result])}catch(ex){outcome=[false,ex]}lastOutcome=outcome;if(outcome){if(outcome[0])return outcome[1];throw log(outcome[1]),outcome[1]}return}),'handleUncaughtException':markFuncFreeze(function
handleUncaughtException(exception,onerror,source,lineNum){var message,shouldReport;lastOutcome=[false,exception],message=tameException(exception),'object'===typeof
exception&&exception!==null&&(message=''+(exception.message||exception.desc||message));if(!isFunction(onerror))throw new
TypeError('Expected onerror to be a function or undefined.');shouldReport=onerror.i___(message,''+source,''+lineNum),shouldReport!==false&&log(source+':'+lineNum+': '+message)})})}function
isFlag(name){return/_v___$/.test(name)||/_w___$/.test(name)||/_gw___$/.test(name)||/_c___$/.test(name)||/_e___$/.test(name)||/_g___$/.test(name)||/_s___$/.test(name)||/_m___$/.test(name)}function
copyToImports(imports,source){var p;for(p in source)source.hasOwnProperty(p)&&(/__$/.test(p)?isFlag(p)||(imports[p]=source[p]):isNumericName(p)?(imports[p]=source[p]):imports.DefineOwnProperty___(p,{'value':source[p],'writable':true,'enumerable':true,'configurable':true}))}function
prepareModule(module,load){var i,props;registerClosureInspector(module);function
theModule(extraImports){var imports;return extraImports.window?(imports=extraImports.window,copyToImports(imports,sharedImports)):(imports=copy(sharedImports)),copyToImports({'load':load,'cajaVM':cajaVM}),copyToImports(imports,extraImports),module.instantiate(___,imports)}props=['cajolerName','cajolerVersion','cajoledDate','moduleURL'];for(i=0;i<props.length;++i)theModule.DefineOwnProperty___(props[i],{'value':module[props[i]],'writable':false,'enumerable':true,'configurable':false});return!module.includedModules||theModule.DefineOwnProperty___('includedModules',{'value':freeze(module.includedModules),'writable':false,'enumerable':true,'configurable':false}),theModule.instantiate___=function(___,IMPORTS___){return module.instantiate(___,IMPORTS___)},markFuncFreeze(theModule)}function
loadModule(module){return freeze(module),markFuncFreeze(module.instantiate),myNewModuleHandler.m___('handle',[module])}function
grantFunc(obj,name){obj.DefineOwnProperty___(name,{'value':markFuncFreeze(obj[name]),'writable':false,'enumerable':false,'configurable':false})}function
grantRead(obj,name){obj.DefineOwnProperty___(name,{'value':obj[name],'writable':false,'enumerable':false,'configurable':false})}function
grantTypedMethod(proto,name){var f,original;name=''+name,original=proto[name],f=function(){},f.prototype=proto,proto.DefineOwnProperty___(name,{'value':markFunc(function
guardedApplier(var_args){if(!(this instanceof f))throw new TypeError('Tamed method applied to the wrong class of object.');return original.apply(this,slice.call(arguments,0))}),'enumerable':false,'configurable':true,'writable':true})}function
grantInnocentMethod(proto,name){var original=proto[name];proto.DefineOwnProperty___(name,{'enumerable':false,'configurable':false,'get':function(){return function
guardedApplier(var_args){var feralThis=safeDis(untame(this)),feralArgs=untame(slice.call(arguments,0)),feralResult=original.apply(feralThis,feralArgs);return tame(feralResult)}},'set':void
0})}function all2(func2,arg1,arg2s){var len=arg2s.length,i;for(i=0;i<len;i+=1)func2(arg1,arg2s[i])}BREAK=Token('BREAK');function
forOwnNonCajaKeys(obj,fn){var i;for(i in obj){if(!obj.hasOwnProperty(i))continue;if(endsWith__.test(i))continue;if(fn(i,obj[i])===BREAK)return}}function
useGetHandler(obj,name,getHandler){var desc;getHandler=markFunc(getHandler),name=''+name,desc=obj.GetOwnProperty___(name),!desc||!IsAccessorDescriptor(desc)?(desc={'enumerable':false,'configurable':true,'get':getHandler,'set':void
0}):(desc.get=getHandler),obj.DefineOwnProperty___(name,desc)}function useSetHandler(obj,name,setHandler){var
desc;setHandler=markFunc(setHandler),name=''+name,desc=obj.GetOwnProperty___(name),IsAccessorDescriptor(desc)?(desc.set=setHandler):(desc={'enumerable':false,'configurable':true,'get':void
0,'set':setHandler}),obj.DefineOwnProperty___(name,desc)}function hasOwnProp(obj,name){return obj&&obj.hasOwnProperty(name)}cajaVM=whitelistAll({'log':log,'enforce':enforce,'enforceType':enforceType,'enforceNat':enforceNat,'Token':Token,'newTable':newTable,'identity':identity,'callWithEjector':callWithEjector,'eject':eject,'GuardT':GuardT,'Trademark':Trademark,'guard':guard,'passesGuard':passesGuard,'stamp':stamp,'makeSealerUnsealerPair':makeSealerUnsealerPair,'def':def,'isFunction':isFunction,'USELESS':USELESS,'manifest':manifest,'allKeys':allKeys});function
readImport(imports,name){name=''+name;if(imports.HasProperty___(name))return imports.v___(name);throw new
ReferenceError(name+' is not defined.')}function declareImport(imports,name){if(imports.HasProperty___(name))return;imports.w___(name,void
0)}function writeImport(imports,name,value){if(imports.HasProperty___(name))return imports.w___(name,value),value;throw new
ReferenceError(name+' is not defined.')}function goodParseInt(n,radix){var isHexOrOctal,isOct;return n=''+n,radix=+radix,isHexOrOctal=/^\s*[+-]?\s*0(x?)/.exec(n),isOct=isHexOrOctal?isHexOrOctal[1]!=='x':false,isOct&&(radix!==radix||0===radix)?parseInt(n,10):parseInt(n,radix)}sharedImports=whitelistAll({'cajaVM':cajaVM,'null':null,'false':false,'true':true,'NaN':NaN,'Infinity':Infinity,'undefined':void
0,'parseInt':markFunc(goodParseInt),'parseFloat':markFunc(parseFloat),'isNaN':markFunc(isNaN),'isFinite':markFunc(isFinite),'decodeURI':markFunc(decodeURI),'decodeURIComponent':markFunc(decodeURIComponent),'encodeURI':markFunc(encodeURI),'encodeURIComponent':markFunc(encodeURIComponent),'escape':escape?markFunc(escape):void
0,'Math':Math,'JSON':safeJSON,'Object':Object,'Array':Array,'String':String,'Boolean':Boolean,'Number':Number,'Date':Date,'RegExp':RegExp,'Function':FakeFunction,'Error':Error,'EvalError':EvalError,'RangeError':RangeError,'ReferenceError':ReferenceError,'SyntaxError':SyntaxError,'TypeError':TypeError,'URIError':URIError}),Object.prototype.m___=function(name,as){var
m,ownerObj;name=''+name;if(this[name+'_m___'])return this[name].f___(this,as);m=this.v___(name);if(typeof
m!=='function'){if(this.handleCall___)return this.handleCall___(name,as);throw new
TypeError('The property \''+name+'\' is not a function.')}return ownerObj=this[name+'_v___'],ownerObj&&ownerObj!==Function.prototype&&fastpathMethod(ownerObj,name),m.f___(this,as)},___={'sharedImports':sharedImports,'USELESS':USELESS,'BREAK':BREAK,'tameException':tameException,'args':args,'deodorize':deodorize,'copy':copy,'i':isIn,'iM':initializeMap,'f':markSafeFunc,'markFunc':markFunc,'markFuncFreeze':markFuncFreeze,'Trademark':Trademark,'makeSealerUnsealerPair':makeSealerUnsealerPair,'getId':getId,'getImports':getImports,'unregister':unregister,'newTable':newTable,'whitelistAll':whitelistAll,'snowWhite':snowWhite,'Y':Y,'ri':readImport,'di':declareImport,'wi':writeImport,'grantRead':grantRead,'grantFunc':grantFunc,'grantTypedMethod':grantTypedMethod,'grantInnocentMethod':grantInnocentMethod,'all2':all2,'hasOwnProp':hasOwnProp,'forOwnKeys':forOwnNonCajaKeys,'markCtor':markFuncFreeze,'useGetHandler':useGetHandler,'useSetHandler':useSetHandler,'primFreeze':snowWhite,'isJSONContainer':isExtensible,'getLogFunc':getLogFunc,'setLogFunc':setLogFunc,'callPub':function(obj,name,args){return obj.m___(name,args)},'readPub':function(obj,name){return obj.v___(name)},'canRead':function(obj,name){return name+'_v___'in
obj},'freeze':freeze,'getNewModuleHandler':getNewModuleHandler,'setNewModuleHandler':setNewModuleHandler,'obtainNewModule':obtainNewModule,'makeNormalNewModuleHandler':makeNormalNewModuleHandler,'prepareModule':prepareModule,'loadModule':loadModule,'NO_RESULT':NO_RESULT,'def':def,'tame':tame,'untame':untame,'tamesTo':tamesTo,'markTameAsReadOnlyRecord':markTameAsReadOnlyRecord,'markTameAsFunction':markTameAsFunction,'markTameAsCtor':markTameAsCtor,'markTameAsXo4a':markTameAsXo4a,'grantTameAsMethod':grantTameAsMethod,'grantTameAsRead':grantTameAsRead,'grantTameAsReadWrite':grantTameAsReadWrite,'extend':extend},cajaVMKeys=ownEnumKeys(cajaVM);for(i=0;i<cajaVMKeys.length;++i)___[cajaVMKeys[i]]=cajaVM[cajaVMKeys[i]];setNewModuleHandler(makeNormalNewModuleHandler())})(),URI=(function(){var
EXTRA_PARENT_PATHS_RE,PARENT_DIRECTORY_HANDLER,PARENT_DIRECTORY_HANDLER_RE,URI_DISALLOWED_IN_PATH_,URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_,URI_RE_;function
parse(uriStr){var m=(''+uriStr).match(URI_RE_);return m?new URI(nullIfAbsent(m[1]),nullIfAbsent(m[2]),nullIfAbsent(m[3]),nullIfAbsent(m[4]),nullIfAbsent(m[5]),nullIfAbsent(m[6]),nullIfAbsent(m[7])):null}function
create(scheme,credentials,domain,port,path,query,fragment){var uri=new URI(encodeIfExists2(scheme,URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_),encodeIfExists2(credentials,URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_),encodeIfExists(domain),port>0?port.toString():null,encodeIfExists2(path,URI_DISALLOWED_IN_PATH_),null,encodeIfExists(fragment));return query&&('string'===typeof
query?uri.setRawQuery(query.replace(/[^?&=0-9A-Za-z_\-~.%]/g,encodeOne)):uri.setAllParameters(query)),uri}function
encodeIfExists(unescapedPart){return'string'==typeof unescapedPart?encodeURIComponent(unescapedPart):null}function
encodeIfExists2(unescapedPart,extra){return'string'==typeof unescapedPart?encodeURI(unescapedPart).replace(extra,encodeOne):null}function
encodeOne(ch){var n=ch.charCodeAt(0);return'%'+'0123456789ABCDEF'.charAt(n>>4&15)+'0123456789ABCDEF'.charAt(n&15)}function
normPath(path){return path.replace(/(^|\/)\.(?:\/|$)/g,'$1').replace(/\/{2,}/g,'/')}PARENT_DIRECTORY_HANDLER=new
RegExp('(/|^)(?:[^./][^/]*|\\.{2,}(?:[^./][^/]*)|\\.{3,}[^/]*)/\\.\\.(?:/|$)'),PARENT_DIRECTORY_HANDLER_RE=new
RegExp(PARENT_DIRECTORY_HANDLER),EXTRA_PARENT_PATHS_RE=/^(?:\.\.\/)*(?:\.\.$)?/;function
collapse_dots(path){var p,q,r;if(path===null)return null;p=normPath(path),r=PARENT_DIRECTORY_HANDLER_RE;for(;(q=p.replace(r,'$1'))!=p;p=q);return p}function
resolve(baseUri,relativeUri){var absoluteUri=baseUri.clone(),overridden=relativeUri.hasScheme(),absRawPath,rawPath,simplifiedPath,slash;return overridden?absoluteUri.setRawScheme(relativeUri.getRawScheme()):(overridden=relativeUri.hasCredentials()),overridden?absoluteUri.setRawCredentials(relativeUri.getRawCredentials()):(overridden=relativeUri.hasDomain()),overridden?absoluteUri.setRawDomain(relativeUri.getRawDomain()):(overridden=relativeUri.hasPort()),rawPath=relativeUri.getRawPath(),simplifiedPath=collapse_dots(rawPath),overridden?(absoluteUri.setPort(relativeUri.getPort()),simplifiedPath=simplifiedPath&&simplifiedPath.replace(EXTRA_PARENT_PATHS_RE,'')):(overridden=!!rawPath,overridden?simplifiedPath.charCodeAt(0)!==47&&(absRawPath=collapse_dots(absoluteUri.getRawPath()||'').replace(EXTRA_PARENT_PATHS_RE,''),slash=absRawPath.lastIndexOf('/')+1,simplifiedPath=collapse_dots((slash?absRawPath.substring(0,slash):'')+collapse_dots(rawPath)).replace(EXTRA_PARENT_PATHS_RE,'')):(simplifiedPath=simplifiedPath&&simplifiedPath.replace(EXTRA_PARENT_PATHS_RE,''),simplifiedPath!==rawPath&&absoluteUri.setRawPath(simplifiedPath))),overridden?absoluteUri.setRawPath(simplifiedPath):(overridden=relativeUri.hasQuery()),overridden?absoluteUri.setRawQuery(relativeUri.getRawQuery()):(overridden=relativeUri.hasFragment()),overridden&&absoluteUri.setRawFragment(relativeUri.getRawFragment()),absoluteUri}function
URI(rawScheme,rawCredentials,rawDomain,port,rawPath,rawQuery,rawFragment){this.scheme_=rawScheme,this.credentials_=rawCredentials,this.domain_=rawDomain,this.port_=port,this.path_=rawPath,this.query_=rawQuery,this.fragment_=rawFragment,this.paramCache_=null}URI.prototype.toString=function(){var
out=[];return null!==this.scheme_&&out.push(this.scheme_,':'),null!==this.domain_&&(out.push('//'),null!==this.credentials_&&out.push(this.credentials_,'@'),out.push(this.domain_),null!==this.port_&&out.push(':',this.port_.toString())),null!==this.path_&&out.push(this.path_),null!==this.query_&&out.push('?',this.query_),null!==this.fragment_&&out.push('#',this.fragment_),out.join('')},URI.prototype.clone=function(){return new
URI(this.scheme_,this.credentials_,this.domain_,this.port_,this.path_,this.query_,this.fragment_)},URI.prototype.getScheme=function(){return this.scheme_&&decodeURIComponent(this.scheme_)},URI.prototype.getRawScheme=function(){return this.scheme_},URI.prototype.setScheme=function(newScheme){return this.scheme_=encodeIfExists2(newScheme,URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_),this},URI.prototype.setRawScheme=function(newScheme){return this.scheme_=newScheme?newScheme:null,this},URI.prototype.hasScheme=function(){return null!==this.scheme_},URI.prototype.getCredentials=function(){return this.credentials_&&decodeURIComponent(this.credentials_)},URI.prototype.getRawCredentials=function(){return this.credentials_},URI.prototype.setCredentials=function(newCredentials){return this.credentials_=encodeIfExists2(newCredentials,URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_),this},URI.prototype.setRawCredentials=function(newCredentials){return this.credentials_=newCredentials?newCredentials:null,this},URI.prototype.hasCredentials=function(){return null!==this.credentials_},URI.prototype.getDomain=function(){return this.domain_&&decodeURIComponent(this.domain_)},URI.prototype.getRawDomain=function(){return this.domain_},URI.prototype.setDomain=function(newDomain){return this.domain_=newDomain?encodeURIComponent(newDomain):null,this},URI.prototype.setRawDomain=function(newDomain){return this.domain_=newDomain?newDomain:null,this},URI.prototype.hasDomain=function(){return null!==this.domain_},URI.prototype.getPort=function(){return this.port_&&decodeURIComponent(this.port_)},URI.prototype.setPort=function(newPort){if(newPort){newPort=Number(newPort);if(newPort!==(newPort&65535))throw new
Error('Bad port number '+newPort);this.port_=''+newPort}else this.port_=null;return this},URI.prototype.hasPort=function(){return null!==this.port_},URI.prototype.getPath=function(){return this.path_&&decodeURIComponent(this.path_)},URI.prototype.getRawPath=function(){return this.path_},URI.prototype.setPath=function(newPath){return this.path_=encodeIfExists2(newPath,URI_DISALLOWED_IN_PATH_),this},URI.prototype.setRawPath=function(newPath){return this.path_=newPath?newPath:null,this},URI.prototype.hasPath=function(){return null!==this.path_},URI.prototype.getQuery=function(){return this.query_&&decodeURIComponent(this.query_).replace(/\+/g,' ')},URI.prototype.getRawQuery=function(){return this.query_},URI.prototype.setQuery=function(newQuery){return this.paramCache_=null,this.query_=encodeIfExists(newQuery),this},URI.prototype.setRawQuery=function(newQuery){return this.paramCache_=null,this.query_=newQuery?newQuery:null,this},URI.prototype.hasQuery=function(){return null!==this.query_},URI.prototype.setAllParameters=function(params){var
i,j,k,newParams,queryBuf,separator,v;if(typeof params==='object'){if(!(params instanceof
Array)&&(params instanceof Object||Object.prototype.toString.call(params)!=='[object Array]')){newParams=[],i=-1;for(k
in params)v=params[k],'string'===typeof v&&(newParams[++i]=k,newParams[++i]=v);params=newParams}}this.paramCache_=null,queryBuf=[],separator='';for(j=0;j<params.length;)k=params[j++],v=params[j++],queryBuf.push(separator,encodeURIComponent(k.toString())),separator='&',v&&queryBuf.push('=',encodeURIComponent(v.toString()));return this.query_=queryBuf.join(''),this},URI.prototype.checkParameterCache_=function(){var
cgiParams,i,k,m,out,q;if(!this.paramCache_){q=this.query_;if(!q)this.paramCache_=[];else{cgiParams=q.split(/[&\?]/),out=[],k=-1;for(i=0;i<cgiParams.length;++i)m=cgiParams[i].match(/^([^=]*)(?:=(.*))?$/),out[++k]=decodeURIComponent(m[1]).replace(/\+/g,' '),out[++k]=decodeURIComponent(m[2]||'').replace(/\+/g,' ');this.paramCache_=out}}},URI.prototype.setParameterValues=function(key,values){var
i,k,newValueIndex,params,pc;typeof values==='string'&&(values=[values]),this.checkParameterCache_(),newValueIndex=0,pc=this.paramCache_,params=[];for(i=0,k=0;i<pc.length;i+=2)key===pc[i]?newValueIndex<values.length&&params.push(key,values[newValueIndex++]):params.push(pc[i],pc[i+1]);while(newValueIndex<values.length)params.push(key,values[newValueIndex++]);return this.setAllParameters(params),this},URI.prototype.removeParameter=function(key){return this.setParameterValues(key,[])},URI.prototype.getAllParameters=function(){return this.checkParameterCache_(),this.paramCache_.slice(0,this.paramCache_.length)},URI.prototype.getParameterValues=function(paramNameUnescaped){var
i,values;this.checkParameterCache_(),values=[];for(i=0;i<this.paramCache_.length;i+=2)paramNameUnescaped===this.paramCache_[i]&&values.push(this.paramCache_[i+1]);return values},URI.prototype.getParameterMap=function(paramNameUnescaped){var
i,key,paramMap,value;this.checkParameterCache_(),paramMap={};for(i=0;i<this.paramCache_.length;i+=2)key=this.paramCache_[i++],value=this.paramCache_[i++],key
in paramMap?paramMap[key].push(value):(paramMap[key]=[value]);return paramMap},URI.prototype.getParameterValue=function(paramNameUnescaped){var
i;this.checkParameterCache_();for(i=0;i<this.paramCache_.length;i+=2)if(paramNameUnescaped===this.paramCache_[i])return this.paramCache_[i+1];return null},URI.prototype.getFragment=function(){return this.fragment_&&decodeURIComponent(this.fragment_)},URI.prototype.getRawFragment=function(){return this.fragment_},URI.prototype.setFragment=function(newFragment){return this.fragment_=newFragment?encodeURIComponent(newFragment):null,this},URI.prototype.setRawFragment=function(newFragment){return this.fragment_=newFragment?newFragment:null,this},URI.prototype.hasFragment=function(){return null!==this.fragment_};function
nullIfAbsent(matchPart){return'string'==typeof matchPart&&matchPart.length>0?matchPart:null}return URI_RE_=new
RegExp('^(?:([^:/?#]+):)?(?://(?:([^/?#]*)@)?([^/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$'),URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_=/[#\/\?@]/g,URI_DISALLOWED_IN_PATH_=/[\#\?]/g,URI.parse=parse,URI.create=create,URI.resolve=resolve,URI.collapse_dots=collapse_dots,URI})(),(function(){var
enqueue;function reject(reason){function rejected(op,arg1,arg2,arg3){return undefined===op?rejected:'WHEN'===op?(arg2||reject)(reason):arg1?arg1(reject(reason)):reject(reason)}return rejected.reason=reason,rejected.isPromise___=true,rejected}function
ref(value){if(null===value||undefined===value)return reject({'class':['NaO']});if('number'===typeof
value&&!isFinite(value))return reject({'class':['NaN']});function fulfilled(op,arg1,arg2,arg3){var
r;if(undefined===op)return value;switch(op){case'WHEN':r=value;break;case'GET':undefined===arg2||null===arg2?(r=value):(r=value[arg2]);break;case'POST':undefined===arg2||null===arg2?(r=reject({})):(r=value[arg2].apply(value,arg3));break;case'PUT':undefined===arg2||null===arg2?(r=reject({})):(value[arg2]=arg3,r={});break;case'DELETE':undefined===arg2||null===arg2?(r=reject({})):(delete
value[arg2],r={});break;default:r=reject({})}return arg1?arg1.apply(null,[r]):r}return fulfilled.isPromise___=true,fulfilled}enqueue=(function(){var
active=false,pending=[],run=function(){var task=pending.shift();0===pending.length?(active=false):setTimeout(run,0),task()};return function(task){pending.push(task),active||(setTimeout(run,0),active=true)}})();function
forward(p,op,arg1,arg2,arg3){enqueue(function(){p(op,arg1,arg2,arg3)})}function
promised(value){return'function'===typeof value&&value.isPromise___===true?value:ref(value)}function
defer(){var pending=[],value;function promise(op,arg1,arg2,arg3){if(undefined===op)return pending?promise:value();pending?pending.push({'op':op,'arg1':arg1,'arg2':arg2,'arg3':arg3}):forward(value,op,arg1,arg2,arg3)}return promise.isPromise___=true,___.primFreeze({'promise':___.markFuncFreeze(promise),'resolve':___.markFuncFreeze(function(p){var
i,todo,x;if(!pending)return;todo=pending,pending=null,value=promised(p);for(i=0;i!==todo.length;i+=1)x=todo[+i],forward(value,x.op,x.arg1,x.arg2,x.arg3)})})}Q={'run':___.markFuncFreeze(enqueue),'reject':___.markFuncFreeze(reject),'ref':___.markFuncFreeze(ref),'defer':___.markFuncFreeze(defer),'near':___.markFuncFreeze(function(value){return'function'===typeof
value&&value.isPromise___===true?value():value}),'when':___.markFuncFreeze(function(value,fulfilled,rejected){var
r=defer(),done=false;return forward(promised(value),'WHEN',function(x){if(done)throw new
Error;done=true,r.resolve(ref(x)('WHEN',fulfilled,rejected))},function(reason){if(done)throw new
Error;done=true,r.resolve(rejected?rejected.apply(null,[reason]):reject(reason))}),r.promise}),'get':___.markFuncFreeze(function(target,noun){var
r=defer();return forward(promised(target),'GET',r.resolve,noun),r.promise}),'post':___.markFuncFreeze(function(target,verb,argv){var
r=defer();return forward(promised(target),'POST',r.resolve,verb,argv),r.promise}),'put':___.markFuncFreeze(function(target,noun,value){var
r=defer();return forward(promised(target),'PUT',r.resolve,noun,value),r.promise}),'remove':___.markFuncFreeze(function(target,noun){var
r=defer();return forward(promised(target),'DELETE',r.resolve,noun),r.promise})},___.primFreeze(Q)})(),prepareModuleFromText___=function(moduleText){var
rawModule=undefined;return(function(){var ___={'loadModule':function(m){rawModule=m}};eval(moduleText)})(),___.prepareModule(rawModule,undefined)},loadModuleMaker=function(rootUrl,cajolingServiceClient){var
resolveModuleUrl=function(base,url){return base?URI.resolve(URI.parse(base),URI.parse(url)).toString():url},getInputMimeType=function(uncajoledSourceUrl){var
url=URI.parse(uncajoledSourceUrl);return/\.html$/.test(url.getPath())?'text/html':'application/javascript'},moduleCache=___.newTable(),evalModuleObjFromJson=function(moduleJson){var
moduleObj=undefined;return(function(){var ___={'loadModule':function(m){moduleObj=m}};eval(moduleJson.js)})(),moduleObj},resolveDependencies=function(moduleObj,loadForThisModule){var
result=Q.defer(),count,i,size;if(moduleObj.includedModules!==undefined&&moduleObj.includedModules.length!==0){size=moduleObj.includedModules.length,count=0;for(i=0;i<size;++i)Q.when(loadForThisModule.async(moduleObj.includedModules[i]),function(childModule){++count,count===size&&result.resolve(true)},function(err){result.resolve(Q.reject(err))})}else
result.resolve(true);return result.promise},makeLoad=function(baseUrl){var load=function(url){var
fullUrl=resolveModuleUrl(baseUrl,url);if(moduleCache.get(fullUrl)||Q.near(moduleCache.get(fullUrl)).isPromise___)throw new
Error('The static module '+fullUrl+' cannot be resolved.');return Q.near(moduleCache.get(fullUrl))},evalAndResolveFromJson=function(url,moduleJson){var
result=Q.defer(),loadForThisModule=makeLoad(url),moduleObj=evalModuleObjFromJson(moduleJson);return Q.when(resolveDependencies(moduleObj,loadForThisModule),function(_){try{result.resolve(___.prepareModule(moduleObj,loadForThisModule))}catch(ex){result.resolve(Q.reject(ex))}},function(ex){result.resolve(Q.reject(ex))}),result.promise()},loadCajoledJson___=function(url,moduleJson){var
moduleDeferred;if(moduleCache.get(url))throw new Error('Module already loaded: '+url);return moduleDeferred=Q.defer(),Q.when(evalAndResolveFromJson(url,moduleJson),function(module){moduleDeferred.resolve(module)},function(ex){moduleDeferred.resolve(Q.reject(ex))}),moduleCache.set(url,moduleDeferred.promise),moduleDeferred.promise},async=function(url,contentType){var
fullUrl=resolveModuleUrl(baseUrl,url),mimeType,moduleDeferred;return moduleCache.get(fullUrl)?moduleCache.get(fullUrl):(moduleDeferred=Q.defer(),mimeType=contentType||getInputMimeType(url),Q.when(cajolingServiceClient.cajoleUrl(fullUrl,getInputMimeType(url)),function(moduleJson){Q.when(evalAndResolveFromJson(fullUrl,moduleJson),function(module){moduleDeferred.resolve(module)},function(ex){moduleDeferred.resolve(Q.reject(ex))})},function(ex){moduleDeferred.resolve(Q.reject(ex))}),moduleCache.set(fullUrl,moduleDeferred.promise),moduleDeferred.promise)},asyncAll=function(moduleUrls,contentType){var
result=Q.defer(),modulePromises=[],modules={},i,waitNext;for(i=0;i<moduleUrls.length;++i)modulePromises[i]=async(moduleUrls[i],contentType);return waitNext=function(idx){idx===moduleNames.length?result.resolve(modules):Q.when(modulePromises[idx],function(theModule){modules[moduleNames[idx]]=theModule,waitNext(idx+1)},function(reason){result.resolve(Q.reject(reason))})},waitNext(0),result.promise};return load.DefineOwnProperty___('async',{'value':___.markFuncFreeze(async),'writable':false,'enumerable':true,'configurable':false}),load.DefineOwnProperty___('asyncAll',{'value':___.markFuncFreeze(asyncAll),'writable':false,'enumerable':true,'configurable':false}),load.loadCajoledJson___=loadCajoledJson___,___.markFuncFreeze(load)};return makeLoad(rootUrl)},cajaIframeDone___()}