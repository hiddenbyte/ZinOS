{
  (function (window, undefined) {
     var document = window.document, navigator = window.navigator, location =
       window.location;
     var jQuery = (function () {
         var jQuery = function (selector, context) {
           return new jQuery.fn.init(selector, context, rootjQuery);
         }, _jQuery = window.jQuery, _$ = window.$, rootjQuery, quickExpr =
           /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, rnotwhite = /\S/,
         trimLeft = /^\s+/, trimRight = /\s+$/, rdigit = /\d/, rsingleTag =
           /^<(\w+)\s*\/?>(?:<\/\1>)?$/, rvalidchars = /^[\],:{}\s]*$/,
         rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rvalidtokens =
           /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
         rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rwebkit =
           /(webkit)[ \/]([\w.]+)/, ropera =
           /(opera)(?:.*version)?[ \/]([\w.]+)/, rmsie = /(msie) ([\w.]+)/,
         rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/, rdashAlpha = /-([a-z])/ig,
         fcamelCase = function (all, letter) {
           return letter.toUpperCase();
         }, userAgent = navigator.userAgent, browserMatch, readyList,
         DOMContentLoaded, toString = Object.prototype.toString, hasOwn =
           Object.prototype.hasOwnProperty, push = Array.prototype.push, slice
           = Array.prototype.slice, trim = String.prototype.trim, indexOf =
           Array.prototype.indexOf, class2type = {};
         jQuery.fn = jQuery.prototype = {
           'constructor': jQuery,
           'init': function (selector, context, rootjQuery) {
             var this___ = this && this.___? void 0: this;
             var match, elem, ret, doc;
             if (!selector) { return this___; }
             if (selector.nodeType) {
               this___.context = this___[ 0 ] = selector;
               this___.length = 1;
               return this___;
             }
             if (selector === 'body' && !context && document.body) {
               this___.context = document;
               this___[ 0 ] = document.body;
               this___.selector = selector;
               this___.length = 1;
               return this___;
             }
             if (typeof selector === 'string') {
               if (selector.charAt(0) === '<' &&
                 selector.charAt(selector.length - 1) === '>' &&
                 selector.length >= 3) {
                 match = [ null, selector, null ];
               } else {
                 match = quickExpr.exec(selector);
               }
               if (match && (match[ 1 ] || !context)) {
                 if (match[ 1 ]) {
                   context = context instanceof jQuery? context[ 0 ]: context;
                   doc = context? context.ownerDocument || context: document;
                   ret = rsingleTag.exec(selector);
                   if (ret) {
                     if (jQuery.isPlainObject(context)) {
                       selector = [ document.createElement(ret[ 1 ]) ];
                       jQuery.fn.attr.call(selector, context, true);
                     } else {
                       selector = [ doc.createElement(ret[ 1 ]) ];
                     }
                   } else {
                     ret = jQuery.buildFragment([ match[ 1 ] ], [ doc ]);
                     selector = (ret.cacheable? jQuery.clone(ret.fragment):
                       ret.fragment).childNodes;
                   }
                   return jQuery.merge(this___, selector);
                 } else {
                   elem = document.getElementById(match[ 2 ]);
                   if (elem && elem.parentNode) {
                     if (elem.id !== match[ 2 ]) {
                       return rootjQuery.find(selector);
                     }
                     this___.length = 1;
                     this___[ 0 ] = elem;
                   }
                   this___.context = document;
                   this___.selector = selector;
                   return this___;
                 }
               } else if (!context || context.jquery) {
                 return (context || rootjQuery).find(selector);
               } else {
                 return this___.constructor(context).find(selector);
               }
             } else if (jQuery.isFunction(selector)) {
               return rootjQuery.ready(selector);
             }
             if (selector.selector !== undefined) {
               this___.selector = selector.selector;
               this___.context = selector.context;
             }
             return jQuery.makeArray(selector, this___);
           },
           'selector': '',
           'jquery': '1.6.2',
           'length': 0,
           'size': function () {
             var this___ = this && this.___? void 0: this;
             return this___.length;
           },
           'toArray': function () {
             var this___ = this && this.___? void 0: this;
             return slice.call(this___, 0);
           },
           'get': function (num) {
             var this___ = this && this.___? void 0: this;
             return num == null ? this___.toArray(): num < 0? this___[
               this___.length + num ]: this___[ num ];
           },
           'pushStack': function (elems, name, selector) {
             var this___ = this && this.___? void 0: this;
             var ret = this___.constructor();
             if (jQuery.isArray(elems)) {
               push.apply(ret, elems);
             } else {
               jQuery.merge(ret, elems);
             }
             ret.prevObject = this___;
             ret.context = this___.context;
             if (name === 'find') {
               ret.selector = this___.selector + (this___.selector? ' ': '') +
                 selector;
             } else if (name) {
               ret.selector = this___.selector + '.' + name + '(' + selector +
                 ')';
             }
             return ret;
           },
           'each': function (callback, args) {
             var this___ = this && this.___? void 0: this;
             return jQuery.each(this___, callback, args);
           },
           'ready': function (fn) {
             var this___ = this && this.___? void 0: this;
             jQuery.bindReady();
             readyList.done(fn);
             return this___;
           },
           'eq': function (i) {
             var this___ = this && this.___? void 0: this;
             return i === -1? this___.slice(i): this___.slice(i, +i + 1);
           },
           'first': function () {
             var this___ = this && this.___? void 0: this;
             return this___.eq(0);
           },
           'last': function () {
             var this___ = this && this.___? void 0: this;
             return this___.eq(-1);
           },
           'slice': function () {
             var this___ = this && this.___? void 0: this;
             return this___.pushStack(slice.apply(this___, arguments), 'slice',
               slice.call(arguments).join(','));
           },
           'map': function (callback) {
             var this___ = this && this.___? void 0: this;
             return this___.pushStack(jQuery.map(this___, function (elem, i) {
                   return callback.call(elem, i, elem);
                 }));
           },
           'end': function () {
             var this___ = this && this.___? void 0: this;
             return this___.prevObject || this___.constructor(null);
           },
           'push': push,
           'sort': [ ].sort,
           'splice': [ ].splice
         };
         jQuery.fn.init.prototype = jQuery.fn;
         jQuery.extend = jQuery.fn.extend = function () {
           var x0___;
           var this___ = this && this.___? void 0: this;
           var options, name, src, copy, copyIsArray, clone, target =
             arguments[ 0 ] || {}, i = 1, length = arguments.length, deep =
             false;
           if (typeof target === 'boolean') {
             deep = target;
             target = arguments[ 1 ] || {};
             i = 2;
           }
           if (typeof target !== 'object' && !jQuery.isFunction(target)) {
             target = {};
           }
           if (length === i) {
             target = this___;
             --i;
           }
           for (; i < length; i++) {
             if ((options = arguments[ i ]) != null) {
               for (x0___ in options) {
                 if (x0___.match(/___$/)) { continue; }
                 name = x0___;
                 {
                   src = target[ name ];
                   copy = options[ name ];
                   if (target === copy) { continue; }
                   if (deep && copy && (jQuery.isPlainObject(copy) ||
                       (copyIsArray = jQuery.isArray(copy)))) {
                     if (copyIsArray) {
                       copyIsArray = false;
                       clone = src && jQuery.isArray(src) ? src: [ ];
                     } else {
                       clone = src && jQuery.isPlainObject(src) ? src: {};
                     }
                     target[ name ] = jQuery.extend(deep, clone, copy);
                   } else if (copy !== undefined) {
                     target[ name ] = copy;
                   }
                 }
               }
             }
           }
           return target;
         };
         jQuery.extend({
             'noConflict': function (deep) {
               if (window.$ === jQuery) {
                 window.$ = _$;
               }
               if (deep && window.jQuery === jQuery) {
                 window.jQuery = _jQuery;
               }
               return jQuery;
             },
             'isReady': false,
             'readyWait': 1,
             'holdReady': function (hold) {
               if (hold) {
                 jQuery.readyWait++;
               } else {
                 jQuery.ready(true);
               }
             },
             'ready': function (wait) {
               if (wait === true && ! --jQuery.readyWait || wait !== true &&
                 !jQuery.isReady) {
                 if (!document.body) {
                   return setTimeout(jQuery.ready, 1);
                 }
                 jQuery.isReady = true;
                 if (wait !== true && --jQuery.readyWait > 0) { return; }
                 readyList.resolveWith(document, [ jQuery ]);
                 if (jQuery.fn.trigger) {
                   jQuery(document).trigger('ready').unbind('ready');
                 }
               }
             },
             'bindReady': function () {
               if (readyList) { return; }
               readyList = jQuery._Deferred();
               if (document.readyState === 'complete') {
                 return setTimeout(jQuery.ready, 1);
               }
               if (document.addEventListener) {
                 document.addEventListener('DOMContentLoaded',
                   DOMContentLoaded, false);
                 window.addEventListener('load', jQuery.ready, false);
               } else if (document.attachEvent) {
                 document.attachEvent('onreadystatechange', DOMContentLoaded);
                 window.attachEvent('onload', jQuery.ready);
                 var toplevel = false;
                 try {
                   toplevel = window.frameElement == null;
                 } catch (e) {}
                 if (document.documentElement.doScroll && toplevel) {
                   doScrollCheck(); }
               }
             },
             'isFunction': function (obj) {
               return jQuery.type(obj) === 'function';
             },
             'isArray': Array.isArray || function (obj) {
               return jQuery.type(obj) === 'array';
             },
             'isWindow': function (obj) {
               return obj && typeof obj === 'object' && 'setInterval' in obj;
             },
             'isNaN': function (obj) {
               return obj == null || !rdigit.test(obj) || isNaN(obj);
             },
             'type': function (obj) {
               return obj == null ? String(obj): class2type[ toString.call(obj)
               ] || 'object';
             },
             'isPlainObject': function (obj) {
               var x0___;
               if (!obj || jQuery.type(obj) !== 'object' || obj.nodeType ||
                 jQuery.isWindow(obj)) { return false; }
               if (obj.constructor && !hasOwn.call(obj, 'constructor') &&
                 !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                 return false; }
               var key;
               for (x0___ in obj) {
                 if (x0___.match(/___$/)) { continue; }
                 key = x0___;
                 {}
               }
               return key === undefined || hasOwn.call(obj, key);
             },
             'isEmptyObject': function (obj) {
               var x0___;
               for (x0___ in obj) {
                 if (x0___.match(/___$/)) { continue; }
                 name = x0___;
                 { return false; }
               }
               return true;
             },
             'error': function (msg) { throw msg; },
             'parseJSON': function (data) {
               if (typeof data !== 'string' || !data) { return null; }
               data = jQuery.trim(data);
               if (window.JSON && window.JSON.parse) {
                 return window.JSON.parse(data);
               }
               if (rvalidchars.test(data.replace(rvalidescape, '@')
                   .replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
                 return new Function('return ' + data)();
               }
               jQuery.error('Invalid JSON: ' + data);
             },
             'parseXML': function (data, xml, tmp) {
               if (window.DOMParser) {
                 tmp = new DOMParser();
                 xml = tmp.parseFromString(data, 'text/xml');
               } else {
                 xml = new ActiveXObject('Microsoft.XMLDOM');
                 xml.async = 'false';
                 xml.loadXML(data);
               }
               tmp = xml.documentElement;
               if (!tmp || !tmp.nodeName || tmp.nodeName === 'parsererror') {
                 jQuery.error('Invalid XML: ' + data);
               }
               return xml;
             },
             'noop': function () {},
             'globalEval': function (data) {
               if (data && rnotwhite.test(data)) {
                 (window.execScript || function (data) {
                    window[ 'eval' ].call(window, data);
                  })(data);
               }
             },
             'camelCase': function (string) {
               return string.replace(rdashAlpha, fcamelCase);
             },
             'nodeName': function (elem, name) {
               return elem.nodeName && elem.nodeName.toUpperCase() ===
                 name.toUpperCase();
             },
             'each': function (object, callback, args) {
               var x0___, x1___;
               var name, i = 0, length = object.length, isObj = length ===
                 undefined || jQuery.isFunction(object);
               if (args) {
                 if (isObj) {
                   for (x0___ in object) {
                     if (x0___.match(/___$/)) { continue; }
                     name = x0___;
                     {
                       if (callback.apply(object[ name ], args) === false) {
                         break; }
                     }
                   }
                 } else {
                   for (; i < length;) {
                     if (callback.apply(object[ i++ ], args) === false) {
                       break; }
                   }
                 }
               } else {
                 if (isObj) {
                   for (x1___ in object) {
                     if (x1___.match(/___$/)) { continue; }
                     name = x1___;
                     {
                       if (callback.call(object[ name ], name, object[ name ])
                         === false) { break; }
                     }
                   }
                 } else {
                   for (; i < length;) {
                     if (callback.call(object[ i ], i, object[ i++ ]) ===
                       false) { break; }
                   }
                 }
               }
               return object;
             },
             'trim': trim? function (text) {
               return text == null ? '': trim.call(text);
             }: function (text) {
               return text == null ? '': text.toString().replace(trimLeft, '')
                 .replace(trimRight, '');
             },
             'makeArray': function (array, results) {
               var ret = results || [ ];
               if (array != null) {
                 var type = jQuery.type(array);
                 if (array.length == null || type === 'string' || type ===
                   'function' || type === 'regexp' || jQuery.isWindow(array)) {
                   push.call(ret, array);
                 } else {
                   jQuery.merge(ret, array);
                 }
               }
               return ret;
             },
             'inArray': function (elem, array) {
               if (indexOf) {
                 return indexOf.call(array, elem);
               }
               for (var i = 0, length = array.length; i < length; i++) {
                 if (array[ i ] === elem) { return i; }
               }
               return -1;
             },
             'merge': function (first, second) {
               var i = first.length, j = 0;
               if (typeof second.length === 'number') {
                 for (var l = second.length; j < l; j++) {
                   first[ i++ ] = second[ j ];
                 }
               } else {
                 while (second[ j ] !== undefined) {
                   first[ i++ ] = second[ j++ ];
                 }
               }
               first.length = i;
               return first;
             },
             'grep': function (elems, callback, inv) {
               var ret = [ ], retVal;
               inv = ! !inv;
               for (var i = 0, length = elems.length; i < length; i++) {
                 retVal = ! !callback(elems[ i ], i);
                 if (inv !== retVal) {
                   ret.push(elems[ i ]);
                 }
               }
               return ret;
             },
             'map': function (elems, callback, arg) {
               var x0___;
               var value, key, ret = [ ], i = 0, length = elems.length, isArray
                 = elems instanceof jQuery || length !== undefined && typeof
                 length === 'number' && (length > 0 && elems[ 0 ] && elems[
                   length - 1 ] || length === 0 || jQuery.isArray(elems));
               if (isArray) {
                 for (; i < length; i++) {
                   value = callback(elems[ i ], i, arg);
                   if (value != null) {
                     ret[ ret.length ] = value;
                   }
                 }
               } else {
                 for (x0___ in elems) {
                   if (x0___.match(/___$/)) { continue; }
                   key = x0___;
                   {
                     value = callback(elems[ key ], key, arg);
                     if (value != null) {
                       ret[ ret.length ] = value;
                     }
                   }
                 }
               }
               return ret.concat.apply([ ], ret);
             },
             'guid': 1,
             'proxy': function (fn, context) {
               if (typeof context === 'string') {
                 var tmp = fn[ context ];
                 context = fn;
                 fn = tmp;
               }
               if (!jQuery.isFunction(fn)) { return undefined; }
               var args = slice.call(arguments, 2), proxy = function () {
                 return fn.apply(context, args.concat(slice.call(arguments)));
               };
               proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
               return proxy;
             },
             'access': function (elems, key, value, exec, fn, pass) {
               var x0___;
               var length = elems.length;
               if (typeof key === 'object') {
                 for (x0___ in key) {
                   if (x0___.match(/___$/)) { continue; }
                   k = x0___;
                   {
                     jQuery.access(elems, k, key[ k ], exec, fn, value);
                   }
                 }
                 return elems;
               }
               if (value !== undefined) {
                 exec = !pass && exec && jQuery.isFunction(value);
                 for (var i = 0; i < length; i++) {
                   fn(elems[ i ], key, exec? value.call(elems[ i ], i,
                       fn(elems[ i ], key)): value, pass);
                 }
                 return elems;
               }
               return length? fn(elems[ 0 ], key): undefined;
             },
             'now': function () {
               return new Date().getTime();
             },
             'uaMatch': function (ua) {
               ua = ua.toLowerCase();
               var match = rwebkit.exec(ua) || ropera.exec(ua) ||
                 rmsie.exec(ua) || ua.indexOf('compatible') < 0 &&
                 rmozilla.exec(ua) || [ ];
               return {
                 'browser': match[ 1 ] || '',
                 'version': match[ 2 ] || '0'
               };
             },
             'sub': function () {
               var this___ = this && this.___? void 0: this;
               function jQuerySub(selector, context) {
                 return new jQuerySub.fn.init(selector, context);
               }
               jQuery.extend(true, jQuerySub, this___);
               jQuerySub.superclass = this___;
               jQuerySub.fn = jQuerySub.prototype = this___();
               jQuerySub.fn.constructor = jQuerySub;
               jQuerySub.sub = this___.sub;
               jQuerySub.fn.init = function init(selector, context) {
                 var this___ = this && this.___? void 0: this;
                 if (context && context instanceof jQuery && ! (context
                     instanceof jQuerySub)) {
                   context = jQuerySub(context);
                 }
                 return jQuery.fn.init.call(this___, selector, context,
                   rootjQuerySub);
               };
               jQuerySub.fn.init.prototype = jQuerySub.fn;
               var rootjQuerySub = jQuerySub(document);
               return jQuerySub;
             },
             'browser': {}
           });
         jQuery.each('Boolean Number String Function Array Date RegExp Object'.split(' ')
           , function (i, name) {
             class2type[ '[object ' + name + ']' ] = name.toLowerCase();
           });
         browserMatch = jQuery.uaMatch(userAgent);
         if (browserMatch.browser) {
           jQuery.browser[ browserMatch.browser ] = true;
           jQuery.browser.version = browserMatch.version;
         }
         if (jQuery.browser.webkit) {
           jQuery.browser.safari = true;
         }
         if (rnotwhite.test('\xa0')) {
           trimLeft = /^[\s\xA0]+/;
           trimRight = /[\s\xA0]+$/;
         }
         rootjQuery = jQuery(document);
         if (document.addEventListener) {
           DOMContentLoaded = function () {
             document.removeEventListener('DOMContentLoaded', DOMContentLoaded,
               false);
             jQuery.ready();
           };
         } else if (document.attachEvent) {
           DOMContentLoaded = function () {
             if (document.readyState === 'complete') {
               document.detachEvent('onreadystatechange', DOMContentLoaded);
               jQuery.ready();
             }
           };
         }
         function doScrollCheck() {
           if (jQuery.isReady) { return; }
           try {
             document.documentElement.doScroll('left');
           } catch (e) {
             setTimeout(doScrollCheck, 1);
             return;
           }
           jQuery.ready();
         }
         return jQuery;
       })();
     var promiseMethods =
       'done fail isResolved isRejected promise then always pipe'.split(' '),
     sliceDeferred = [ ].slice;
     jQuery.extend({
         '_Deferred': function () {
           var callbacks = [ ], fired, firing, cancelled, deferred = {
             'done': function () {
               var this___ = this && this.___? void 0: this;
               if (!cancelled) {
                 var args = arguments, i, length, elem, type, _fired;
                 if (fired) {
                   _fired = fired;
                   fired = 0;
                 }
                 for (i = 0, length = args.length; i < length; i++) {
                   elem = args[ i ];
                   type = jQuery.type(elem);
                   if (type === 'array') {
                     deferred.done.apply(deferred, elem);
                   } else if (type === 'function') {
                     callbacks.push(elem);
                   }
                 }
                 if (_fired) {
                   deferred.resolveWith(_fired[ 0 ], _fired[ 1 ]);
                 }
               }
               return this___;
             },
             'resolveWith': function (context, args) {
               var this___ = this && this.___? void 0: this;
               if (!cancelled && !fired && !firing) {
                 args = args || [ ];
                 firing = 1;
                 try {
                   while (callbacks[ 0 ]) {
                     callbacks.shift().apply(context, args);
                   }
                 } finally {
                   fired = [ context, args ];
                   firing = 0;
                 }
               }
               return this___;
             },
             'resolve': function () {
               var this___ = this && this.___? void 0: this;
               deferred.resolveWith(this___, arguments);
               return this___;
             },
             'isResolved': function () {
               return ! ! (firing || fired);
             },
             'cancel': function () {
               var this___ = this && this.___? void 0: this;
               cancelled = 1;
               callbacks = [ ];
               return this___;
             }
           };
           return deferred;
         },
         'Deferred': function (func) {
           var deferred = jQuery._Deferred(), failDeferred = jQuery._Deferred()
             , promise;
           jQuery.extend(deferred, {
               'then': function (doneCallbacks, failCallbacks) {
                 var this___ = this && this.___? void 0: this;
                 deferred.done(doneCallbacks).fail(failCallbacks);
                 return this___;
               },
               'always': function () {
                 var this___ = this && this.___? void 0: this;
                 return deferred.done.apply(deferred, arguments)
                   .fail.apply(this___, arguments);
               },
               'fail': failDeferred.done,
               'rejectWith': failDeferred.resolveWith,
               'reject': failDeferred.resolve,
               'isRejected': failDeferred.isResolved,
               'pipe': function (fnDone, fnFail) {
                 return jQuery.Deferred(function (newDefer) {
                     jQuery.each({
                         'done': [ fnDone, 'resolve' ],
                         'fail': [ fnFail, 'reject' ]
                       }, function (handler, data) {
                         var fn = data[ 0 ], action = data[ 1 ], returned;
                         if (jQuery.isFunction(fn)) {
                           deferred[ handler ] (function () {
                               var this___ = this && this.___? void 0: this;
                               returned = fn.apply(this___, arguments);
                               if (returned &&
                                 jQuery.isFunction(returned.promise)) {
                                 returned.promise().then(newDefer.resolve,
                                   newDefer.reject);
                               } else {
                                 newDefer[ action ] (returned);
                               }
                             });
                         } else {
                           deferred[ handler ] (newDefer[ action ]);
                         }
                       });
                   }).promise();
               },
               'promise': function (obj) {
                 if (obj == null) {
                   if (promise) { return promise; }
                   promise = obj = {};
                 }
                 var i = promiseMethods.length;
                 while (i--) {
                   obj[ promiseMethods[ i ] ] = deferred[ promiseMethods[ i ] ]
                     ;
                 }
                 return obj;
               }
             });
           deferred.done(failDeferred.cancel).fail(deferred.cancel);
           delete deferred.cancel;
           if (func) {
             func.call(deferred, deferred);
           }
           return deferred;
         },
         'when': function (firstParam) {
           var args = arguments, i = 0, length = args.length, count = length,
           deferred = length <= 1 && firstParam &&
             jQuery.isFunction(firstParam.promise) ? firstParam:
           jQuery.Deferred();
           function resolveFunc(i) {
             return function (value) {
               args[ i ] = arguments.length > 1? sliceDeferred.call(arguments,
                 0): value;
               if (! --count) {
                 deferred.resolveWith(deferred, sliceDeferred.call(args, 0));
               }
             };
           }
           if (length > 1) {
             for (; i < length; i++) {
               if (args[ i ] && jQuery.isFunction(args[ i ].promise)) {
                 args[ i ].promise().then(resolveFunc(i), deferred.reject);
               } else { --count; }
             }
             if (!count) {
               deferred.resolveWith(deferred, args);
             }
           } else if (deferred !== firstParam) {
             deferred.resolveWith(deferred, length? [ firstParam ]: [ ]);
           }
           return deferred.promise();
         }
       });
     jQuery.support = (function () {
         var x0___, x1___;
         var div = document.createElement('div'), documentElement =
           document.documentElement, all, a, select, opt, input, marginDiv,
         support, fragment, body, testElementParent, testElement,
         testElementStyle, tds, events, eventName, i, isSupported;
         div.setAttribute('className', 't');
         div.innerHTML =
           '   <link/><table></table><a href=\'/a\' style=\'top:1px;float:left;opacity:.55;\'>a</a><input type=\'checkbox\'/>';
         all = div.getElementsByTagName('*');
         a = (div.getElementsByTagName('a'))[ 0 ];
         if (!all || !all.length || !a) { return {}; }
         select = document.createElement('select');
         opt = select.appendChild(document.createElement('option'));
         input = (div.getElementsByTagName('input'))[ 0 ];
         support = {
           'leadingWhitespace': div.firstChild.nodeType === 3,
           'tbody': !div.getElementsByTagName('tbody').length,
           'htmlSerialize': ! !div.getElementsByTagName('link').length,
           'style': /top/.test(a.getAttribute('style')),
           'hrefNormalized': a.getAttribute('href') === '/a',
           'opacity': /^0.55$/.test(a.style.opacity),
           'cssFloat': ! !a.style.cssFloat,
           'checkOn': input.value === 'on',
           'optSelected': opt.selected,
           'getSetAttribute': div.className !== 't',
           'submitBubbles': true,
           'changeBubbles': true,
           'focusinBubbles': false,
           'deleteExpando': true,
           'noCloneEvent': true,
           'inlineBlockNeedsLayout': false,
           'shrinkWrapBlocks': false,
           'reliableMarginRight': true
         };
         input.checked = true;
         support.noCloneChecked = input.cloneNode(true).checked;
         select.disabled = true;
         support.optDisabled = !opt.disabled;
         try { delete div.test; } catch (e) {
           support.deleteExpando = false;
         }
         if (!div.addEventListener && div.attachEvent && div.fireEvent) {
           div.attachEvent('onclick', function () {
               support.noCloneEvent = false;
             });
           div.cloneNode(true).fireEvent('onclick');
         }
         input = document.createElement('input');
         input.value = 't';
         input.setAttribute('type', 'radio');
         support.radioValue = input.value === 't';
         input.setAttribute('checked', 'checked');
         div.appendChild(input);
         fragment = document.createDocumentFragment();
         fragment.appendChild(div.firstChild);
         support.checkClone = fragment.cloneNode(true).cloneNode(true)
           .lastChild.checked;
         div.innerHTML = '';
         div.style.width = div.style.paddingLeft = '1px';
         body = (document.getElementsByTagName('body'))[ 0 ];
         testElement = document.createElement(body? 'div': 'body');
         testElementStyle = {
           'visibility': 'hidden',
           'width': 0,
           'height': 0,
           'border': 0,
           'margin': 0
         };
         if (body) {
           jQuery.extend(testElementStyle, {
               'position': 'absolute',
               'left': -1000,
               'top': -1000
             });
         }
         for (x0___ in testElementStyle) {
           if (x0___.match(/___$/)) { continue; }
           i = x0___;
           {
             testElement.style[ i ] = testElementStyle[ i ];
           }
         }
         testElement.appendChild(div);
         testElementParent = body || documentElement;
         testElementParent.insertBefore(testElement,
           testElementParent.firstChild);
         support.appendChecked = input.checked;
         support.boxModel = div.offsetWidth === 2;
         if ('zoom' in div.style) {
           div.style.display = 'inline';
           div.style.zoom = 1;
           support.inlineBlockNeedsLayout = div.offsetWidth === 2;
           div.style.display = '';
           div.innerHTML = '<div style=\'width:4px;\'></div>';
           support.shrinkWrapBlocks = div.offsetWidth !== 2;
         }
         div.innerHTML =
           '<table><tr><td style=\'padding:0;border:0;display:none\'></td><td>t</td></tr></table>';
         tds = div.getElementsByTagName('td');
         isSupported = tds[ 0 ].offsetHeight === 0;
         tds[ 0 ].style.display = '';
         tds[ 1 ].style.display = 'none';
         support.reliableHiddenOffsets = isSupported && tds[ 0 ].offsetHeight
           === 0;
         div.innerHTML = '';
         if (document.defaultView && document.defaultView.getComputedStyle) {
           marginDiv = document.createElement('div');
           marginDiv.style.width = '0';
           marginDiv.style.marginRight = '0';
           div.appendChild(marginDiv);
           support.reliableMarginRight =
             (parseInt((document.defaultView.getComputedStyle(marginDiv, null)
                 || { 'marginRight': 0 }).marginRight, 10) || 0) === 0;
         }
         testElement.innerHTML = '';
         testElementParent.removeChild(testElement);
         if (div.attachEvent) {
           for (x1___ in {
               'submit': 1,
               'change': 1,
               'focusin': 1
             }) {
             if (x1___.match(/___$/)) { continue; }
             i = x1___;
             {
               eventName = 'on' + i;
               isSupported = eventName in div;
               if (!isSupported) {
                 div.setAttribute(eventName, 'return;');
                 isSupported = typeof div[ eventName ] === 'function';
               }
               support[ i + 'Bubbles' ] = isSupported;
             }
           }
         }
         testElement = fragment = select = opt = body = marginDiv = div = input
           = null;
         return support;
       })();
     jQuery.boxModel = jQuery.support.boxModel;
     var rbrace = /^(?:\{.*\}|\[.*\])$/, rmultiDash = /([a-z])([A-Z])/g;
     jQuery.extend({
         'cache': {},
         'uuid': 0,
         'expando': 'jQuery' + (jQuery.fn.jquery + Math.random())
           .replace(/\D/g, ''),
         'noData': {
           'embed': true,
           'object': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
           'applet': true
         },
         'hasData': function (elem) {
           elem = elem.nodeType? jQuery.cache[ elem[ jQuery.expando ] ]: elem[
             jQuery.expando ];
           return ! !elem && !isEmptyDataObject(elem);
         },
         'data': function (elem, name, data, pvt) {
           if (!jQuery.acceptData(elem)) { return; }
           var internalKey = jQuery.expando, getByName = typeof name ===
             'string', thisCache, isNode = elem.nodeType, cache = isNode?
             jQuery.cache: elem, id = isNode? elem[ jQuery.expando ]: elem[
             jQuery.expando ] && jQuery.expando;
           if ((!id || pvt && id && !cache[ id ] [ internalKey ]) && getByName
             && data === undefined) { return; }
           if (!id) {
             if (isNode) {
               elem[ jQuery.expando ] = id = ++jQuery.uuid;
             } else {
               id = jQuery.expando;
             }
           }
           if (!cache[ id ]) {
             cache[ id ] = {};
             if (!isNode) {
               cache[ id ].toJSON = jQuery.noop;
             }
           }
           if (typeof name === 'object' || typeof name === 'function') {
             if (pvt) {
               cache[ id ] [ internalKey ] = jQuery.extend(cache[ id ] [
                   internalKey ], name);
             } else {
               cache[ id ] = jQuery.extend(cache[ id ], name);
             }
           }
           thisCache = cache[ id ];
           if (pvt) {
             if (!thisCache[ internalKey ]) {
               thisCache[ internalKey ] = {};
             }
             thisCache = thisCache[ internalKey ];
           }
           if (data !== undefined) {
             thisCache[ jQuery.camelCase(name) ] = data;
           }
           if (name === 'events' && !thisCache[ name ]) {
             return thisCache[ internalKey ] && thisCache[ internalKey ]
               .events;
           }
           return getByName? thisCache[ jQuery.camelCase(name) ] || thisCache[
             name ]: thisCache;
         },
         'removeData': function (elem, name, pvt) {
           if (!jQuery.acceptData(elem)) { return; }
           var internalKey = jQuery.expando, isNode = elem.nodeType, cache =
             isNode? jQuery.cache: elem, id = isNode? elem[ jQuery.expando ]:
           jQuery.expando;
           if (!cache[ id ]) { return; }
           if (name) {
             var thisCache = pvt? cache[ id ] [ internalKey ]: cache[ id ];
             if (thisCache) {
               delete thisCache[ name ];
               if (!isEmptyDataObject(thisCache)) { return; }
             }
           }
           if (pvt) {
             delete cache[ id ] [ internalKey ];
             if (!isEmptyDataObject(cache[ id ])) { return; }
           }
           var internalCache = cache[ id ] [ internalKey ];
           if (jQuery.support.deleteExpando || cache != window) {
             delete cache[ id ];
           } else {
             cache[ id ] = null;
           }
           if (internalCache) {
             cache[ id ] = {};
             if (!isNode) {
               cache[ id ].toJSON = jQuery.noop;
             }
             cache[ id ] [ internalKey ] = internalCache;
           } else if (isNode) {
             if (jQuery.support.deleteExpando) {
               delete elem[ jQuery.expando ];
             } else if (elem.removeAttribute) {
               elem.removeAttribute(jQuery.expando);
             } else {
               elem[ jQuery.expando ] = null;
             }
           }
         },
         '_data': function (elem, name, data) {
           return jQuery.data(elem, name, data, true);
         },
         'acceptData': function (elem) {
           if (elem.nodeName) {
             var match = jQuery.noData[ elem.nodeName.toLowerCase() ];
             if (match) {
               return ! (match === true || elem.getAttribute('classid') !==
                 match);
             }
           }
           return true;
         }
       });
     jQuery.fn.extend({
         'data': function (key, value) {
           var this___ = this && this.___? void 0: this;
           var data = null;
           if (typeof key === 'undefined') {
             if (this___.length) {
               data = jQuery.data(this___[ 0 ]);
               if (this___[ 0 ].nodeType === 1) {
                 var attr = this___[ 0 ].attributes, name;
                 for (var i = 0, l = attr.length; i < l; i++) {
                   name = attr[ i ].name;
                   if (name.indexOf('data-') === 0) {
                     name = jQuery.camelCase(name.substring(5));
                     dataAttr(this___[ 0 ], name, data[ name ]);
                   }
                 }
               }
             }
             return data;
           } else if (typeof key === 'object') {
             return this___.each(function () {
                 var this___ = this && this.___? void 0: this;
                 jQuery.data(this___, key);
               });
           }
           var parts = key.split('.');
           parts[ 1 ] = parts[ 1 ] ? '.' + parts[ 1 ]: '';
           if (value === undefined) {
             data = this___.triggerHandler('getData' + parts[ 1 ] + '!', [
                 parts[ 0 ] ]);
             if (data === undefined && this___.length) {
               data = jQuery.data(this___[ 0 ], key);
               data = dataAttr(this___[ 0 ], key, data);
             }
             return data === undefined && parts[ 1 ] ? this___.data(parts[ 0 ])
               : data;
           } else {
             return this___.each(function () {
                 var this___ = this && this.___? void 0: this;
                 var $this = jQuery(this___), args = [ parts[ 0 ], value ];
                 $this.triggerHandler('setData' + parts[ 1 ] + '!', args);
                 jQuery.data(this___, key, value);
                 $this.triggerHandler('changeData' + parts[ 1 ] + '!', args);
               });
           }
         },
         'removeData': function (key) {
           var this___ = this && this.___? void 0: this;
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               jQuery.removeData(this___, key);
             });
         }
       });
     function dataAttr(elem, key, data) {
       if (data === undefined && elem.nodeType === 1) {
         var name = 'data-' + key.replace(rmultiDash, '$1-$2').toLowerCase();
         data = elem.getAttribute(name);
         if (typeof data === 'string') {
           try {
             data = data === 'true'? true: data === 'false'? false: data ===
               'null'? null: !jQuery.isNaN(data) ? parseFloat(data):
             rbrace.test(data) ? jQuery.parseJSON(data): data;
           } catch (e) {}
           jQuery.data(elem, key, data);
         } else { data = undefined; }
       }
       return data;
     }
     function isEmptyDataObject(obj) {
       var x0___;
       for (x0___ in obj) {
         if (x0___.match(/___$/)) { continue; }
         name = x0___;
         {
           if (name !== 'toJSON') { return false; }
         }
       }
       return true;
     }
     function handleQueueMarkDefer(elem, type, src) {
       var deferDataKey = type + 'defer', queueDataKey = type + 'queue',
       markDataKey = type + 'mark', defer = jQuery.data(elem, deferDataKey,
         undefined, true);
       if (defer && (src === 'queue' || !jQuery.data(elem, queueDataKey,
             undefined, true)) && (src === 'mark' || !jQuery.data(elem,
             markDataKey, undefined, true))) {
         setTimeout(function () {
             if (!jQuery.data(elem, queueDataKey, undefined, true) &&
               !jQuery.data(elem, markDataKey, undefined, true)) {
               jQuery.removeData(elem, deferDataKey, true);
               defer.resolve();
             }
           }, 0);
       }
     }
     jQuery.extend({
         '_mark': function (elem, type) {
           if (elem) {
             type = (type || 'fx') + 'mark';
             jQuery.data(elem, type, (jQuery.data(elem, type, undefined, true)
                 || 0) + 1, true);
           }
         },
         '_unmark': function (force, elem, type) {
           if (force !== true) {
             type = elem;
             elem = force;
             force = false;
           }
           if (elem) {
             type = type || 'fx';
             var key = type + 'mark', count = force? 0: (jQuery.data(elem, key,
                 undefined, true) || 1) - 1;
             if (count) {
               jQuery.data(elem, key, count, true);
             } else {
               jQuery.removeData(elem, key, true);
               handleQueueMarkDefer(elem, type, 'mark');
             }
           }
         },
         'queue': function (elem, type, data) {
           if (elem) {
             type = (type || 'fx') + 'queue';
             var q = jQuery.data(elem, type, undefined, true);
             if (data) {
               if (!q || jQuery.isArray(data)) {
                 q = jQuery.data(elem, type, jQuery.makeArray(data), true);
               } else {
                 q.push(data);
               }
             }
             return q || [ ];
           }
         },
         'dequeue': function (elem, type) {
           type = type || 'fx';
           var queue = jQuery.queue(elem, type), fn = queue.shift(), defer;
           if (fn === 'inprogress') {
             fn = queue.shift();
           }
           if (fn) {
             if (type === 'fx') {
               queue.unshift('inprogress');
             }
             fn.call(elem, function () {
                 jQuery.dequeue(elem, type);
               });
           }
           if (!queue.length) {
             jQuery.removeData(elem, type + 'queue', true);
             handleQueueMarkDefer(elem, type, 'queue');
           }
         }
       });
     jQuery.fn.extend({
         'queue': function (type, data) {
           var this___ = this && this.___? void 0: this;
           if (typeof type !== 'string') {
             data = type;
             type = 'fx';
           }
           if (data === undefined) {
             return jQuery.queue(this___[ 0 ], type);
           }
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               var queue = jQuery.queue(this___, type, data);
               if (type === 'fx' && queue[ 0 ] !== 'inprogress') {
                 jQuery.dequeue(this___, type);
               }
             });
         },
         'dequeue': function (type) {
           var this___ = this && this.___? void 0: this;
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               jQuery.dequeue(this___, type);
             });
         },
         'delay': function (time, type) {
           var this___ = this && this.___? void 0: this;
           time = jQuery.fx? jQuery.fx.speeds[ time ] || time: time;
           type = type || 'fx';
           return this___.queue(type, function () {
               var this___ = this && this.___? void 0: this;
               var elem = this___;
               setTimeout(function () {
                   jQuery.dequeue(elem, type);
                 }, time);
             });
         },
         'clearQueue': function (type) {
           var this___ = this && this.___? void 0: this;
           return this___.queue(type || 'fx', [ ]);
         },
         'promise': function (type, object) {
           var this___ = this && this.___? void 0: this;
           if (typeof type !== 'string') {
             object = type;
             type = undefined;
           }
           type = type || 'fx';
           var defer = jQuery.Deferred(), elements = this___, i =
             elements.length, count = 1, deferDataKey = type + 'defer',
           queueDataKey = type + 'queue', markDataKey = type + 'mark', tmp;
           function resolve() {
             if (! --count) {
               defer.resolveWith(elements, [ elements ]);
             }
           }
           while (i--) {
             if (tmp = jQuery.data(elements[ i ], deferDataKey, undefined,
                 true) || (jQuery.data(elements[ i ], queueDataKey, undefined,
                   true) || jQuery.data(elements[ i ], markDataKey, undefined,
                   true)) && jQuery.data(elements[ i ], deferDataKey,
                 jQuery._Deferred(), true)) {
               count++;
               tmp.done(resolve);
             }
           }
           resolve();
           return defer.promise();
         }
       });
     var rclass = /[\n\t\r]/g, rspace = /\s+/, rreturn = /\r/g, rtype =
       /^(?:button|input)$/i, rfocusable =
       /^(?:button|input|object|select|textarea)$/i, rclickable =
       /^a(?:rea)?$/i, rboolean =
       /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
     rinvalidChar = /\:|^on/, formHook, boolHook;
     jQuery.fn.extend({
         'attr': function (name, value) {
           var this___ = this && this.___? void 0: this;
           return jQuery.access(this___, name, value, true, jQuery.attr);
         },
         'removeAttr': function (name) {
           var this___ = this && this.___? void 0: this;
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               jQuery.removeAttr(this___, name);
             });
         },
         'prop': function (name, value) {
           var this___ = this && this.___? void 0: this;
           return jQuery.access(this___, name, value, true, jQuery.prop);
         },
         'removeProp': function (name) {
           var this___ = this && this.___? void 0: this;
           name = jQuery.propFix[ name ] || name;
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               try {
                 this___[ name ] = undefined;
                 delete this___[ name ];
               } catch (e) {}
             });
         },
         'addClass': function (value) {
           var this___ = this && this.___? void 0: this;
           var classNames, i, l, elem, setClass, c, cl;
           if (jQuery.isFunction(value)) {
             return this___.each(function (j) {
                 var this___ = this && this.___? void 0: this;
                 jQuery(this___).addClass(value.call(this___, j,
                     this___.className));
               });
           }
           if (value && typeof value === 'string') {
             classNames = value.split(rspace);
             for (i = 0, l = this___.length; i < l; i++) {
               elem = this___[ i ];
               if (elem.nodeType === 1) {
                 if (!elem.className && classNames.length === 1) {
                   elem.className = value;
                 } else {
                   setClass = ' ' + elem.className + ' ';
                   for (c = 0, cl = classNames.length; c < cl; c++) {
                     if (! ~setClass.indexOf(' ' + classNames[ c ] + ' ')) {
                       setClass += classNames[ c ] + ' ';
                     }
                   }
                   elem.className = jQuery.trim(setClass);
                 }
               }
             }
           }
           return this___;
         },
         'removeClass': function (value) {
           var this___ = this && this.___? void 0: this;
           var classNames, i, l, elem, className, c, cl;
           if (jQuery.isFunction(value)) {
             return this___.each(function (j) {
                 var this___ = this && this.___? void 0: this;
                 jQuery(this___).removeClass(value.call(this___, j,
                     this___.className));
               });
           }
           if (value && typeof value === 'string' || value === undefined) {
             classNames = (value || '').split(rspace);
             for (i = 0, l = this___.length; i < l; i++) {
               elem = this___[ i ];
               if (elem.nodeType === 1 && elem.className) {
                 if (value) {
                   className = (' ' + elem.className + ' ').replace(rclass,
                     ' ');
                   for (c = 0, cl = classNames.length; c < cl; c++) {
                     className = className.replace(' ' + classNames[ c ] + ' ',
                       ' ');
                   }
                   elem.className = jQuery.trim(className);
                 } else {
                   elem.className = '';
                 }
               }
             }
           }
           return this___;
         },
         'toggleClass': function (value, stateVal) {
           var this___ = this && this.___? void 0: this;
           var type = typeof value, isBool = typeof stateVal === 'boolean';
           if (jQuery.isFunction(value)) {
             return this___.each(function (i) {
                 var this___ = this && this.___? void 0: this;
                 jQuery(this___).toggleClass(value.call(this___, i,
                     this___.className, stateVal), stateVal);
               });
           }
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               if (type === 'string') {
                 var className, i = 0, self = jQuery(this___), state =
                   stateVal, classNames = value.split(rspace);
                 while (className = classNames[ i++ ]) {
                   state = isBool? state: !self.hasClass(className);
                   self[ state? 'addClass': 'removeClass' ] (className);
                 }
               } else if (type === 'undefined' || type === 'boolean') {
                 if (this___.className) {
                   jQuery._data(this___, '__className__', this___.className);
                 }
                 this___.className = this___.className || value === false ? '':
                 jQuery._data(this___, '__className__') || '';
               }
             });
         },
         'hasClass': function (selector) {
           var this___ = this && this.___? void 0: this;
           var className = ' ' + selector + ' ';
           for (var i = 0, l = this___.length; i < l; i++) {
             if ((' ' + this___[ i ].className + ' ').replace(rclass, ' ')
                 .indexOf(className) > -1) { return true; }
           }
           return false;
         },
         'val': function (value) {
           var this___ = this && this.___? void 0: this;
           var hooks, ret, elem = this___[ 0 ];
           if (!arguments.length) {
             if (elem) {
               hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] ||
                 jQuery.valHooks[ elem.type ];
               if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value'))
                 !== undefined) { return ret; }
               ret = elem.value;
               return typeof ret === 'string'? ret.replace(rreturn, ''): ret ==
                 null ? '': ret;
             }
             return undefined;
           }
           var isFunction = jQuery.isFunction(value);
           return this___.each(function (i) {
               var this___ = this && this.___? void 0: this;
               var self = jQuery(this___), val;
               if (this___.nodeType !== 1) { return; }
               if (isFunction) {
                 val = value.call(this___, i, self.val());
               } else { val = value; }
               if (val == null) { val = ''; } else if (typeof val === 'number')
                 { val += ''; } else if (jQuery.isArray(val)) {
                 val = jQuery.map(val, function (value) {
                     return value == null ? '': value + '';
                   });
               }
               hooks = jQuery.valHooks[ this___.nodeName.toLowerCase() ] ||
                 jQuery.valHooks[ this___.type ];
               if (!hooks || ! ('set' in hooks) || hooks.set(this___, val,
                   'value') === undefined) {
                 this___.value = val;
               }
             });
         }
       });
     jQuery.extend({
         'valHooks': {
           'option': {
             'get': function (elem) {
               var val = elem.attributes.value;
               return !val || val.specified? elem.value: elem.text;
             }
           },
           'select': {
             'get': function (elem) {
               var value, index = elem.selectedIndex, values = [ ], options =
                 elem.options, one = elem.type === 'select-one';
               if (index < 0) { return null; }
               for (var i = one? index: 0, max = one? index + 1:
                 options.length; i < max; i++) {
                 var option = options[ i ];
                 if (option.selected && (jQuery.support.optDisabled?
                     !option.disabled: option.getAttribute('disabled') ===
                     null) && (!option.parentNode.disabled ||
                     !jQuery.nodeName(option.parentNode, 'optgroup'))) {
                   value = jQuery(option).val();
                   if (one) { return value; }
                   values.push(value);
                 }
               }
               if (one && !values.length && options.length) {
                 return jQuery(options[ index ]).val();
               }
               return values;
             },
             'set': function (elem, value) {
               var values = jQuery.makeArray(value);
               jQuery(elem).find('option').each(function () {
                   var this___ = this && this.___? void 0: this;
                   this___.selected = jQuery.inArray(jQuery(this___).val(),
                     values) >= 0;
                 });
               if (!values.length) {
                 elem.selectedIndex = -1;
               }
               return values;
             }
           }
         },
         'attrFn': {
           'val': true,
           'css': true,
           'html': true,
           'text': true,
           'data': true,
           'width': true,
           'height': true,
           'offset': true
         },
         'attrFix': {
           'tabindex': 'tabIndex'
         },
         'attr': function (elem, name, value, pass) {
           var nType = elem.nodeType;
           if (!elem || nType === 3 || nType === 8 || nType === 2) { return undefined; }
           if (pass && name in jQuery.attrFn) {
             return (jQuery(elem))[ name ] (value);
           }
           if (! ('getAttribute' in elem)) {
             return jQuery.prop(elem, name, value);
           }
           var ret, hooks, notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
           if (notxml) {
             name = jQuery.attrFix[ name ] || name;
             hooks = jQuery.attrHooks[ name ];
             if (!hooks) {
               if (rboolean.test(name)) { hooks = boolHook; } else if (formHook
                 && name !== 'className' && (jQuery.nodeName(elem, 'form') ||
                   rinvalidChar.test(name))) { hooks = formHook; }
             }
           }
           if (value !== undefined) {
             if (value === null) {
               jQuery.removeAttr(elem, name);
               return undefined;
             } else if (hooks && 'set' in hooks && notxml && (ret =
                 hooks.set(elem, value, name)) !== undefined) { return ret; }
             else {
               elem.setAttribute(name, '' + value);
               return value;
             }
           } else if (hooks && 'get' in hooks && notxml && (ret =
               hooks.get(elem, name)) !== null) { return ret; } else {
             ret = elem.getAttribute(name);
             return ret === null ? undefined: ret;
           }
         },
         'removeAttr': function (elem, name) {
           var propName;
           if (elem.nodeType === 1) {
             name = jQuery.attrFix[ name ] || name;
             if (jQuery.support.getSetAttribute) {
               elem.removeAttribute(name);
             } else {
               jQuery.attr(elem, name, '');
               elem.removeAttributeNode(elem.getAttributeNode(name));
             }
             if (rboolean.test(name) && (propName = jQuery.propFix[ name ] ||
                   name) in elem) {
               elem[ propName ] = false;
             }
           }
         },
         'attrHooks': {
           'type': {
             'set': function (elem, value) {
               if (rtype.test(elem.nodeName) && elem.parentNode) {
                 jQuery.error('type property can\'t be changed');
               } else if (!jQuery.support.radioValue && value === 'radio' &&
                 jQuery.nodeName(elem, 'input')) {
                 var val = elem.value;
                 elem.setAttribute('type', value);
                 if (val) {
                   elem.value = val;
                 }
                 return value;
               }
             }
           },
           'tabIndex': {
             'get': function (elem) {
               var attributeNode = elem.getAttributeNode('tabIndex');
               return attributeNode && attributeNode.specified?
                 parseInt(attributeNode.value, 10):
               rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName)
                 && elem.href? 0: undefined;
             }
           },
           'value': {
             'get': function (elem, name) {
               if (formHook && jQuery.nodeName(elem, 'button')) {
                 return formHook.get(elem, name);
               }
               return name in elem? elem.value: null;
             },
             'set': function (elem, value, name) {
               if (formHook && jQuery.nodeName(elem, 'button')) {
                 return formHook.set(elem, value, name);
               }
               elem.value = value;
             }
           }
         },
         'propFix': {
           'tabindex': 'tabIndex',
           'readonly': 'readOnly',
           'for': 'htmlFor',
           'class': 'className',
           'maxlength': 'maxLength',
           'cellspacing': 'cellSpacing',
           'cellpadding': 'cellPadding',
           'rowspan': 'rowSpan',
           'colspan': 'colSpan',
           'usemap': 'useMap',
           'frameborder': 'frameBorder',
           'contenteditable': 'contentEditable'
         },
         'prop': function (elem, name, value) {
           var nType = elem.nodeType;
           if (!elem || nType === 3 || nType === 8 || nType === 2) { return undefined; }
           var ret, hooks, notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
           if (notxml) {
             name = jQuery.propFix[ name ] || name;
             hooks = jQuery.propHooks[ name ];
           }
           if (value !== undefined) {
             if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)
               ) !== undefined) { return ret; } else {
               return elem[ name ] = value;
             }
           } else {
             if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !==
               undefined) { return ret; } else {
               return elem[ name ];
             }
           }
         },
         'propHooks': {}
       });
     boolHook = {
       'get': function (elem, name) {
         return jQuery.prop(elem, name) ? name.toLowerCase(): undefined;
       },
       'set': function (elem, value, name) {
         var propName;
         if (value === false) {
           jQuery.removeAttr(elem, name);
         } else {
           propName = jQuery.propFix[ name ] || name;
           if (propName in elem) {
             elem[ propName ] = true;
           }
           elem.setAttribute(name, name.toLowerCase());
         }
         return name;
       }
     };
     if (!jQuery.support.getSetAttribute) {
       jQuery.attrFix = jQuery.propFix;
       formHook = jQuery.attrHooks.name = jQuery.attrHooks.title =
         jQuery.valHooks.button = {
         'get': function (elem, name) {
           var ret;
           ret = elem.getAttributeNode(name);
           return ret && ret.nodeValue !== ''? ret.nodeValue: undefined;
         },
         'set': function (elem, value, name) {
           var ret = elem.getAttributeNode(name);
           if (ret) {
             ret.nodeValue = value;
             return value;
           }
         }
       };
       jQuery.each([ 'width', 'height' ], function (i, name) {
           jQuery.attrHooks[ name ] = jQuery.extend(jQuery.attrHooks[ name ], {
               'set': function (elem, value) {
                 if (value === '') {
                   elem.setAttribute(name, 'auto');
                   return value;
                 }
               }
             });
         });
     }
     if (!jQuery.support.hrefNormalized) {
       jQuery.each([ 'href', 'src', 'width', 'height' ], function (i, name) {
           jQuery.attrHooks[ name ] = jQuery.extend(jQuery.attrHooks[ name ], {
               'get': function (elem) {
                 var ret = elem.getAttribute(name, 2);
                 return ret === null ? undefined: ret;
               }
             });
         });
     }
     if (!jQuery.support.style) {
       jQuery.attrHooks.style = {
         'get': function (elem) {
           return elem.style.cssText.toLowerCase() || undefined;
         },
         'set': function (elem, value) {
           return elem.style.cssText = '' + value;
         }
       };
     }
     if (!jQuery.support.optSelected) {
       jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
           'get': function (elem) {
             var parent = elem.parentNode;
             if (parent) {
               parent.selectedIndex;
               if (parent.parentNode) {
                 parent.parentNode.selectedIndex;
               }
             }
           }
         });
     }
     if (!jQuery.support.checkOn) {
       jQuery.each([ 'radio', 'checkbox' ], function () {
           var this___ = this && this.___? void 0: this;
           jQuery.valHooks[ this___ ] = {
             'get': function (elem) {
               return elem.getAttribute('value') === null ? 'on': elem.value;
             }
           };
         });
     }
     jQuery.each([ 'radio', 'checkbox' ], function () {
         var this___ = this && this.___? void 0: this;
         jQuery.valHooks[ this___ ] = jQuery.extend(jQuery.valHooks[ this___ ],
           {
             'set': function (elem, value) {
               if (jQuery.isArray(value)) {
                 return elem.checked = jQuery.inArray(jQuery(elem).val(),
                   value) >= 0;
               }
             }
           });
       });
     var rnamespaces = /\.(.*)$/, rformElems = /^(?:textarea|input|select)$/i,
     rperiod = /\./g, rspaces = / /g, rescape = /[^\w\s.|`]/g, fcleanup =
       function (nm) {
       return nm.replace(rescape, '\\$&');
     };
     jQuery.event = {
       'add': function (elem, types, handler, data) {
         if (elem.nodeType === 3 || elem.nodeType === 8) { return; }
         if (handler === false) {
           handler = returnFalse;
         } else if (!handler) { return; }
         var handleObjIn, handleObj;
         if (handler.handler) {
           handleObjIn = handler;
           handler = handleObjIn.handler;
         }
         if (!handler.guid) {
           handler.guid = jQuery.guid++;
         }
         var elemData = jQuery._data(elem);
         if (!elemData) { return; }
         var events = elemData.events, eventHandle = elemData.handle;
         if (!events) {
           elemData.events = events = {};
         }
         if (!eventHandle) {
           elemData.handle = eventHandle = function (e) {
             return typeof jQuery !== 'undefined' && (!e ||
               jQuery.event.triggered !== e.type) ?
               jQuery.event.handle.apply(eventHandle.elem, arguments):
             undefined;
           };
         }
         eventHandle.elem = elem;
         types = types.split(' ');
         var type, i = 0, namespaces;
         while (type = types[ i++ ]) {
           handleObj = handleObjIn? jQuery.extend({}, handleObjIn): {
             'handler': handler,
             'data': data
           };
           if (type.indexOf('.') > -1) {
             namespaces = type.split('.');
             type = namespaces.shift();
             handleObj.namespace = namespaces.slice(0).sort().join('.');
           } else {
             namespaces = [ ];
             handleObj.namespace = '';
           }
           handleObj.type = type;
           if (!handleObj.guid) {
             handleObj.guid = handler.guid;
           }
           var handlers = events[ type ], special = jQuery.event.special[ type
           ] || {};
           if (!handlers) {
             handlers = events[ type ] = [ ];
             if (!special.setup || special.setup.call(elem, data, namespaces,
                 eventHandle) === false) {
               if (elem.addEventListener) {
                 elem.addEventListener(type, eventHandle, false);
               } else if (elem.attachEvent) {
                 elem.attachEvent('on' + type, eventHandle);
               }
             }
           }
           if (special.add) {
             special.add.call(elem, handleObj);
             if (!handleObj.handler.guid) {
               handleObj.handler.guid = handler.guid;
             }
           }
           handlers.push(handleObj);
           jQuery.event.global[ type ] = true;
         }
         elem = null;
       },
       'global': {},
       'remove': function (elem, types, handler, pos) {
         var x0___;
         if (elem.nodeType === 3 || elem.nodeType === 8) { return; }
         if (handler === false) {
           handler = returnFalse;
         }
         var ret, type, fn, j, i = 0, all, namespaces, namespace, special,
         eventType, handleObj, origType, elemData = jQuery.hasData(elem) &&
           jQuery._data(elem), events = elemData && elemData.events;
         if (!elemData || !events) { return; }
         if (types && types.type) {
           handler = types.handler;
           types = types.type;
         }
         if (!types || typeof types === 'string' && types.charAt(0) === '.') {
           types = types || '';
           for (x0___ in events) {
             if (x0___.match(/___$/)) { continue; }
             type = x0___;
             {
               jQuery.event.remove(elem, type + types);
             }
           }
           return;
         }
         types = types.split(' ');
         while (type = types[ i++ ]) {
           origType = type;
           handleObj = null;
           all = type.indexOf('.') < 0;
           namespaces = [ ];
           if (!all) {
             namespaces = type.split('.');
             type = namespaces.shift();
             namespace = new RegExp('(^|\\.)' + jQuery.map(namespaces.slice(0)
                 .sort(), fcleanup).join('\\.(?:.*\\.)?') + '(\\.|$)');
           }
           eventType = events[ type ];
           if (!eventType) { continue; }
           if (!handler) {
             for (j = 0; j < eventType.length; j++) {
               handleObj = eventType[ j ];
               if (all || namespace.test(handleObj.namespace)) {
                 jQuery.event.remove(elem, origType, handleObj.handler, j);
                 eventType.splice(j--, 1);
               }
             }
             continue;
           }
           special = jQuery.event.special[ type ] || {};
           for (j = pos || 0; j < eventType.length; j++) {
             handleObj = eventType[ j ];
             if (handler.guid === handleObj.guid) {
               if (all || namespace.test(handleObj.namespace)) {
                 if (pos == null) {
                   eventType.splice(j--, 1);
                 }
                 if (special.remove) {
                   special.remove.call(elem, handleObj);
                 }
               }
               if (pos != null) { break; }
             }
           }
           if (eventType.length === 0 || pos != null && eventType.length === 1)
             {
             if (!special.teardown || special.teardown.call(elem, namespaces)
               === false) {
               jQuery.removeEvent(elem, type, elemData.handle);
             }
             ret = null;
             delete events[ type ];
           }
         }
         if (jQuery.isEmptyObject(events)) {
           var handle = elemData.handle;
           if (handle) {
             handle.elem = null;
           }
           delete elemData.events;
           delete elemData.handle;
           if (jQuery.isEmptyObject(elemData)) {
             jQuery.removeData(elem, undefined, true);
           }
         }
       },
       'customEvent': {
         'getData': true,
         'setData': true,
         'changeData': true
       },
       'trigger': function (event, data, elem, onlyHandlers) {
         var type = event.type || event, namespaces = [ ], exclusive;
         if (type.indexOf('!') >= 0) {
           type = type.slice(0, -1);
           exclusive = true;
         }
         if (type.indexOf('.') >= 0) {
           namespaces = type.split('.');
           type = namespaces.shift();
           namespaces.sort();
         }
         if ((!elem || jQuery.event.customEvent[ type ]) &&
             !jQuery.event.global[ type ]) { return; }
         event = typeof event === 'object'? event[ jQuery.expando ] ? event:
         new jQuery.Event(type, event): new jQuery.Event(type);
         event.type = type;
         event.exclusive = exclusive;
         event.namespace = namespaces.join('.');
         event.namespace_re = new RegExp('(^|\\.)' +
           namespaces.join('\\.(?:.*\\.)?') + '(\\.|$)');
         if (onlyHandlers || !elem) {
           event.preventDefault();
           event.stopPropagation();
         }
         if (!elem) {
           jQuery.each(jQuery.cache, function () {
               var this___ = this && this.___? void 0: this;
               var internalKey = jQuery.expando, internalCache = this___[
                 internalKey ];
               if (internalCache && internalCache.events &&
                 internalCache.events[ type ]) {
                 jQuery.event.trigger(event, data, internalCache.handle.elem);
               }
             });
           return;
         }
         if (elem.nodeType === 3 || elem.nodeType === 8) { return; }
         event.result = undefined;
         event.target = elem;
         data = data != null ? jQuery.makeArray(data): [ ];
         data.unshift(event);
         var cur = elem, ontype = type.indexOf(':') < 0? 'on' + type: '';
         do {
           var handle = jQuery._data(cur, 'handle');
           event.currentTarget = cur;
           if (handle) {
             handle.apply(cur, data);
           }
           if (ontype && jQuery.acceptData(cur) && cur[ ontype ] && cur[ ontype
             ].apply(cur, data) === false) {
             event.result = false;
             event.preventDefault();
           }
           cur = cur.parentNode || cur.ownerDocument || cur ===
             event.target.ownerDocument && window;
         } while (cur && !event.isPropagationStopped());
         if (!event.isDefaultPrevented()) {
           var old, special = jQuery.event.special[ type ] || {};
           if ((!special._default || special._default.call(elem.ownerDocument,
                 event) === false) && ! (type === 'click' &&
               jQuery.nodeName(elem, 'a')) && jQuery.acceptData(elem)) {
             try {
               if (ontype && elem[ type ]) {
                 old = elem[ ontype ];
                 if (old) {
                   elem[ ontype ] = null;
                 }
                 jQuery.event.triggered = type;
                 elem[ type ] ();
               }
             } catch (ieError) {}
             if (old) {
               elem[ ontype ] = old;
             }
             jQuery.event.triggered = undefined;
           }
         }
         return event.result;
       },
       'handle': function (event) {
         var this___ = this && this.___? void 0: this;
         event = jQuery.event.fix(event || window.event);
         var handlers = ((jQuery._data(this___, 'events') || {})[ event.type ]
           || [ ]).slice(0), run_all = !event.exclusive && !event.namespace,
         args = Array.prototype.slice.call(arguments, 0);
         args[ 0 ] = event;
         event.currentTarget = this___;
         for (var j = 0, l = handlers.length; j < l; j++) {
           var handleObj = handlers[ j ];
           if (run_all || event.namespace_re.test(handleObj.namespace)) {
             event.handler = handleObj.handler;
             event.data = handleObj.data;
             event.handleObj = handleObj;
             var ret = handleObj.handler.apply(this___, args);
             if (ret !== undefined) {
               event.result = ret;
               if (ret === false) {
                 event.preventDefault();
                 event.stopPropagation();
               }
             }
             if (event.isImmediatePropagationStopped()) { break; }
           }
         }
         return event.result;
       },
       'props':
       'altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which'.split(' ')
         ,
       'fix': function (event) {
         var this___ = this && this.___? void 0: this;
         if (event[ jQuery.expando ]) { return event; }
         var originalEvent = event;
         event = jQuery.Event(originalEvent);
         for (var i = this___.props.length, prop; i;) {
           prop = this___.props[ --i ];
           event[ prop ] = originalEvent[ prop ];
         }
         if (!event.target) {
           event.target = event.srcElement || document;
         }
         if (event.target.nodeType === 3) {
           event.target = event.target.parentNode;
         }
         if (!event.relatedTarget && event.fromElement) {
           event.relatedTarget = event.fromElement === event.target?
             event.toElement: event.fromElement;
         }
         if (event.pageX == null && event.clientX != null) {
           var eventDocument = event.target.ownerDocument || document, doc =
             eventDocument.documentElement, body = eventDocument.body;
           event.pageX = event.clientX + (doc && doc.scrollLeft || body &&
             body.scrollLeft || 0) - (doc && doc.clientLeft || body &&
             body.clientLeft || 0);
           event.pageY = event.clientY + (doc && doc.scrollTop || body &&
             body.scrollTop || 0) - (doc && doc.clientTop || body &&
             body.clientTop || 0);
         }
         if (event.which == null && (event.charCode != null || event.keyCode !=
             null)) {
           event.which = event.charCode != null ? event.charCode:
           event.keyCode;
         }
         if (!event.metaKey && event.ctrlKey) {
           event.metaKey = event.ctrlKey;
         }
         if (!event.which && event.button !== undefined) {
           event.which = event.button & 1? 1: event.button & 2? 3: event.button
             & 4? 2: 0;
         }
         return event;
       },
       'guid': 1.0E8,
       'proxy': jQuery.proxy,
       'special': {
         'ready': {
           'setup': jQuery.bindReady,
           'teardown': jQuery.noop
         },
         'live': {
           'add': function (handleObj) {
             var this___ = this && this.___? void 0: this;
             jQuery.event.add(this___, liveConvert(handleObj.origType,
                 handleObj.selector), jQuery.extend({}, handleObj, {
                   'handler': liveHandler,
                   'guid': handleObj.handler.guid
                 }));
           },
           'remove': function (handleObj) {
             var this___ = this && this.___? void 0: this;
             jQuery.event.remove(this___, liveConvert(handleObj.origType,
                 handleObj.selector), handleObj);
           }
         },
         'beforeunload': {
           'setup': function (data, namespaces, eventHandle) {
             var this___ = this && this.___? void 0: this;
             if (jQuery.isWindow(this___)) {
               this___.onbeforeunload = eventHandle;
             }
           },
           'teardown': function (namespaces, eventHandle) {
             var this___ = this && this.___? void 0: this;
             if (this___.onbeforeunload === eventHandle) {
               this___.onbeforeunload = null;
             }
           }
         }
       }
     };
     jQuery.removeEvent = document.removeEventListener? function (elem, type,
       handle) {
       if (elem.removeEventListener) {
         elem.removeEventListener(type, handle, false);
       }
     }: function (elem, type, handle) {
       if (elem.detachEvent) {
         elem.detachEvent('on' + type, handle);
       }
     };
     jQuery.Event = function (src, props) {
       var this___ = this && this.___? void 0: this;
       if (!this___.preventDefault) {
         return new jQuery.Event(src, props);
       }
       if (src && src.type) {
         this___.originalEvent = src;
         this___.type = src.type;
         this___.isDefaultPrevented = src.defaultPrevented || src.returnValue
           === false || src.getPreventDefault && src.getPreventDefault() ?
           returnTrue: returnFalse;
       } else {
         this___.type = src;
       }
       if (props) {
         jQuery.extend(this___, props);
       }
       this___.timeStamp = jQuery.now();
       this___[ jQuery.expando ] = true;
     };
     function returnFalse() { return false; }
     function returnTrue() { return true; }
     jQuery.Event.prototype = {
       'preventDefault': function () {
         var this___ = this && this.___? void 0: this;
         this___.isDefaultPrevented = returnTrue;
         var e = this___.originalEvent;
         if (!e) { return; }
         if (e.preventDefault) {
           e.preventDefault();
         } else {
           e.returnValue = false;
         }
       },
       'stopPropagation': function () {
         var this___ = this && this.___? void 0: this;
         this___.isPropagationStopped = returnTrue;
         var e = this___.originalEvent;
         if (!e) { return; }
         if (e.stopPropagation) {
           e.stopPropagation();
         }
         e.cancelBubble = true;
       },
       'stopImmediatePropagation': function () {
         var this___ = this && this.___? void 0: this;
         this___.isImmediatePropagationStopped = returnTrue;
         this___.stopPropagation();
       },
       'isDefaultPrevented': returnFalse,
       'isPropagationStopped': returnFalse,
       'isImmediatePropagationStopped': returnFalse
     };
     var withinElement = function (event) {
       var this___ = this && this.___? void 0: this;
       var related = event.relatedTarget, inside = false, eventType =
         event.type;
       event.type = event.data;
       if (related !== this___) {
         if (related) {
           inside = jQuery.contains(this___, related);
         }
         if (!inside) {
           jQuery.event.handle.apply(this___, arguments);
           event.type = eventType;
         }
       }
     }, delegate = function (event) {
       var this___ = this && this.___? void 0: this;
       event.type = event.data;
       jQuery.event.handle.apply(this___, arguments);
     };
     jQuery.each({
         'mouseenter': 'mouseover',
         'mouseleave': 'mouseout'
       }, function (orig, fix) {
         jQuery.event.special[ orig ] = {
           'setup': function (data) {
             var this___ = this && this.___? void 0: this;
             jQuery.event.add(this___, fix, data && data.selector? delegate:
               withinElement, orig);
           },
           'teardown': function (data) {
             var this___ = this && this.___? void 0: this;
             jQuery.event.remove(this___, fix, data && data.selector? delegate:
               withinElement);
           }
         };
       });
     if (!jQuery.support.submitBubbles) {
       jQuery.event.special.submit = {
         'setup': function (data, namespaces) {
           var this___ = this && this.___? void 0: this;
           if (!jQuery.nodeName(this___, 'form')) {
             jQuery.event.add(this___, 'click.specialSubmit', function (e) {
                 var this___ = this && this.___? void 0: this;
                 var elem = e.target, type = elem.type;
                 if ((type === 'submit' || type === 'image') && jQuery(elem)
                   .closest('form').length) {
                   trigger('submit', this___, arguments);
                 }
               });
             jQuery.event.add(this___, 'keypress.specialSubmit', function (e) {
                 var this___ = this && this.___? void 0: this;
                 var elem = e.target, type = elem.type;
                 if ((type === 'text' || type === 'password') && jQuery(elem)
                   .closest('form').length && e.keyCode === 13) {
                   trigger('submit', this___, arguments);
                 }
               });
           } else { return false; }
         },
         'teardown': function (namespaces) {
           var this___ = this && this.___? void 0: this;
           jQuery.event.remove(this___, '.specialSubmit');
         }
       };
     }
     if (!jQuery.support.changeBubbles) {
       var changeFilters, getVal = function (elem) {
         var type = elem.type, val = elem.value;
         if (type === 'radio' || type === 'checkbox') {
           val = elem.checked;
         } else if (type === 'select-multiple') {
           val = elem.selectedIndex > -1? jQuery.map(elem.options, function
               (elem) {
               return elem.selected;
             }).join('-'): '';
         } else if (jQuery.nodeName(elem, 'select')) {
           val = elem.selectedIndex;
         }
         return val;
       }, testChange = function testChange(e) {
         var elem = e.target, data, val;
         if (!rformElems.test(elem.nodeName) || elem.readOnly) { return; }
         data = jQuery._data(elem, '_change_data');
         val = getVal(elem);
         if (e.type !== 'focusout' || elem.type !== 'radio') {
           jQuery._data(elem, '_change_data', val);
         }
         if (data === undefined || val === data) { return; }
         if (data != null || val) {
           e.type = 'change';
           e.liveFired = undefined;
           jQuery.event.trigger(e, arguments[ 1 ], elem);
         }
       };
       jQuery.event.special.change = {
         'filters': {
           'focusout': testChange,
           'beforedeactivate': testChange,
           'click': function (e) {
             var this___ = this && this.___? void 0: this;
             var elem = e.target, type = jQuery.nodeName(elem, 'input') ?
               elem.type: '';
             if (type === 'radio' || type === 'checkbox' ||
               jQuery.nodeName(elem, 'select')) {
               testChange.call(this___, e);
             }
           },
           'keydown': function (e) {
             var this___ = this && this.___? void 0: this;
             var elem = e.target, type = jQuery.nodeName(elem, 'input') ?
               elem.type: '';
             if (e.keyCode === 13 && !jQuery.nodeName(elem, 'textarea') ||
               e.keyCode === 32 && (type === 'checkbox' || type === 'radio') ||
               type === 'select-multiple') {
               testChange.call(this___, e);
             }
           },
           'beforeactivate': function (e) {
             var elem = e.target;
             jQuery._data(elem, '_change_data', getVal(elem));
           }
         },
         'setup': function (data, namespaces) {
           var x0___;
           var this___ = this && this.___? void 0: this;
           if (this___.type === 'file') { return false; }
           for (x0___ in changeFilters) {
             if (x0___.match(/___$/)) { continue; }
             type = x0___;
             {
               jQuery.event.add(this___, type + '.specialChange',
                 changeFilters[ type ]);
             }
           }
           return rformElems.test(this___.nodeName);
         },
         'teardown': function (namespaces) {
           var this___ = this && this.___? void 0: this;
           jQuery.event.remove(this___, '.specialChange');
           return rformElems.test(this___.nodeName);
         }
       };
       changeFilters = jQuery.event.special.change.filters;
       changeFilters.focus = changeFilters.beforeactivate;
     }
     function trigger(type, elem, args) {
       var event = jQuery.extend({}, args[ 0 ]);
       event.type = type;
       event.originalEvent = {};
       event.liveFired = undefined;
       jQuery.event.handle.call(elem, event);
       if (event.isDefaultPrevented()) {
         args[ 0 ].preventDefault();
       }
     }
     if (!jQuery.support.focusinBubbles) {
       jQuery.each({
           'focus': 'focusin',
           'blur': 'focusout'
         }, function (orig, fix) {
           var attaches = 0;
           jQuery.event.special[ fix ] = {
             'setup': function () {
               if (attaches++ === 0) {
                 document.addEventListener(orig, handler, true);
               }
             },
             'teardown': function () {
               if (--attaches === 0) {
                 document.removeEventListener(orig, handler, true);
               }
             }
           };
           function handler(donor) {
             var e = jQuery.event.fix(donor);
             e.type = fix;
             e.originalEvent = {};
             jQuery.event.trigger(e, null, e.target);
             if (e.isDefaultPrevented()) {
               donor.preventDefault();
             }
           }
         });
     }
     jQuery.each([ 'bind', 'one' ], function (i, name) {
         jQuery.fn[ name ] = function (type, data, fn) {
           var x0___;
           var this___ = this && this.___? void 0: this;
           var handler;
           if (typeof type === 'object') {
             for (x0___ in type) {
               if (x0___.match(/___$/)) { continue; }
               key = x0___;
               {
                 this___[ name ] (key, data, type[ key ], fn);
               }
             }
             return this___;
           }
           if (arguments.length === 2 || data === false) {
             fn = data;
             data = undefined;
           }
           if (name === 'one') {
             handler = function (event) {
               var this___ = this && this.___? void 0: this;
               jQuery(this___).unbind(event, handler);
               return fn.apply(this___, arguments);
             };
             handler.guid = fn.guid || jQuery.guid++;
           } else { handler = fn; }
           if (type === 'unload' && name !== 'one') {
             this___.one(type, data, fn);
           } else {
             for (var i = 0, l = this___.length; i < l; i++) {
               jQuery.event.add(this___[ i ], type, handler, data);
             }
           }
           return this___;
         };
       });
     jQuery.fn.extend({
         'unbind': function (type, fn) {
           var x0___;
           var this___ = this && this.___? void 0: this;
           if (typeof type === 'object' && !type.preventDefault) {
             for (x0___ in type) {
               if (x0___.match(/___$/)) { continue; }
               key = x0___;
               {
                 this___.unbind(key, type[ key ]);
               }
             }
           } else {
             for (var i = 0, l = this___.length; i < l; i++) {
               jQuery.event.remove(this___[ i ], type, fn);
             }
           }
           return this___;
         },
         'delegate': function (selector, types, data, fn) {
           var this___ = this && this.___? void 0: this;
           return this___.live(types, data, fn, selector);
         },
         'undelegate': function (selector, types, fn) {
           var this___ = this && this.___? void 0: this;
           if (arguments.length === 0) {
             return this___.unbind('live');
           } else {
             return this___.die(types, null, fn, selector);
           }
         },
         'trigger': function (type, data) {
           var this___ = this && this.___? void 0: this;
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               jQuery.event.trigger(type, data, this___);
             });
         },
         'triggerHandler': function (type, data) {
           var this___ = this && this.___? void 0: this;
           if (this___[ 0 ]) {
             return jQuery.event.trigger(type, data, this___[ 0 ], true);
           }
         },
         'toggle': function (fn) {
           var this___ = this && this.___? void 0: this;
           var args = arguments, guid = fn.guid || jQuery.guid++, i = 0,
           toggler = function (event) {
             var this___ = this && this.___? void 0: this;
             var lastToggle = (jQuery.data(this___, 'lastToggle' + fn.guid) ||
               0) % i;
             jQuery.data(this___, 'lastToggle' + fn.guid, lastToggle + 1);
             event.preventDefault();
             return args[ lastToggle ].apply(this___, arguments) || false;
           };
           toggler.guid = guid;
           while (i < args.length) {
             args[ i++ ].guid = guid;
           }
           return this___.click(toggler);
         },
         'hover': function (fnOver, fnOut) {
           var this___ = this && this.___? void 0: this;
           return this___.mouseenter(fnOver).mouseleave(fnOut || fnOver);
         }
       });
     var liveMap = {
       'focus': 'focusin',
       'blur': 'focusout',
       'mouseenter': 'mouseover',
       'mouseleave': 'mouseout'
     };
     jQuery.each([ 'live', 'die' ], function (i, name) {
         jQuery.fn[ name ] = function (types, data, fn, origSelector) {
           var x0___;
           var this___ = this && this.___? void 0: this;
           var type, i = 0, match, namespaces, preType, selector = origSelector
             || this___.selector, context = origSelector? this___:
           jQuery(this___.context);
           if (typeof types === 'object' && !types.preventDefault) {
             for (x0___ in types) {
               if (x0___.match(/___$/)) { continue; }
               key = x0___;
               {
                 context[ name ] (key, data, types[ key ], selector);
               }
             }
             return this___;
           }
           if (name === 'die' && !types && origSelector &&
             origSelector.charAt(0) === '.') {
             context.unbind(origSelector);
             return this___;
           }
           if (data === false || jQuery.isFunction(data)) {
             fn = data || returnFalse;
             data = undefined;
           }
           types = (types || '').split(' ');
           while ((type = types[ i++ ]) != null) {
             match = rnamespaces.exec(type);
             namespaces = '';
             if (match) {
               namespaces = match[ 0 ];
               type = type.replace(rnamespaces, '');
             }
             if (type === 'hover') {
               types.push('mouseenter' + namespaces, 'mouseleave' + namespaces)
                 ;
               continue;
             }
             preType = type;
             if (liveMap[ type ]) {
               types.push(liveMap[ type ] + namespaces);
               type = type + namespaces;
             } else {
               type = (liveMap[ type ] || type) + namespaces;
             }
             if (name === 'live') {
               for (var j = 0, l = context.length; j < l; j++) {
                 jQuery.event.add(context[ j ], 'live.' + liveConvert(type,
                     selector), {
                     'data': data,
                     'selector': selector,
                     'handler': fn,
                     'origType': type,
                     'origHandler': fn,
                     'preType': preType
                   });
               }
             } else {
               context.unbind('live.' + liveConvert(type, selector), fn);
             }
           }
           return this___;
         };
       });
     function liveHandler(event) {
       var this___ = this && this.___? void 0: this;
       var stop, maxLevel, related, match, handleObj, elem, j, i, l, data,
       close, namespace, ret, elems = [ ], selectors = [ ], events =
         jQuery._data(this___, 'events');
       if (event.liveFired === this___ || !events || !events.live ||
         event.target.disabled || event.button && event.type === 'click') {
         return; }
       if (event.namespace) {
         namespace = new RegExp('(^|\\.)' + event.namespace.split('.')
           .join('\\.(?:.*\\.)?') + '(\\.|$)');
       }
       event.liveFired = this___;
       var live = events.live.slice(0);
       for (j = 0; j < live.length; j++) {
         handleObj = live[ j ];
         if (handleObj.origType.replace(rnamespaces, '') === event.type) {
           selectors.push(handleObj.selector);
         } else {
           live.splice(j--, 1);
         }
       }
       match = jQuery(event.target).closest(selectors, event.currentTarget);
       for (i = 0, l = match.length; i < l; i++) {
         close = match[ i ];
         for (j = 0; j < live.length; j++) {
           handleObj = live[ j ];
           if (close.selector === handleObj.selector && (!namespace ||
               namespace.test(handleObj.namespace)) && !close.elem.disabled) {
             elem = close.elem;
             related = null;
             if (handleObj.preType === 'mouseenter' || handleObj.preType ===
               'mouseleave') {
               event.type = handleObj.preType;
               related = (jQuery(event.relatedTarget)
                   .closest(handleObj.selector))[ 0 ];
               if (related && jQuery.contains(elem, related)) { related = elem;
               }
             }
             if (!related || related !== elem) {
               elems.push({
                   'elem': elem,
                   'handleObj': handleObj,
                   'level': close.level
                 });
             }
           }
         }
       }
       for (i = 0, l = elems.length; i < l; i++) {
         match = elems[ i ];
         if (maxLevel && match.level > maxLevel) { break; }
         event.currentTarget = match.elem;
         event.data = match.handleObj.data;
         event.handleObj = match.handleObj;
         ret = match.handleObj.origHandler.apply(match.elem, arguments);
         if (ret === false || event.isPropagationStopped()) {
           maxLevel = match.level;
           if (ret === false) { stop = false; }
           if (event.isImmediatePropagationStopped()) { break; }
         }
       }
       return stop;
     }
     function liveConvert(type, selector) {
       return (type && type !== '*'? type + '.': '') +
         selector.replace(rperiod, '`').replace(rspaces, '&');
     }
     jQuery.each(('blur focus focusin focusout load resize scroll unload click dblclick '
         +
         'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '
         + 'change select submit keydown keypress keyup error').split(' '),
       function (i, name) {
         jQuery.fn[ name ] = function (data, fn) {
           var this___ = this && this.___? void 0: this;
           if (fn == null) {
             fn = data;
             data = null;
           }
           return arguments.length > 0? this___.bind(name, data, fn):
           this___.trigger(name);
         };
         if (jQuery.attrFn) {
           jQuery.attrFn[ name ] = true;
         }
       });
     (function () {
        var x0___;
        var chunker =
          /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        done = 0, toString = Object.prototype.toString, hasDuplicate = false,
        baseHasDuplicate = true, rBackslash = /\\/g, rNonWord = /\W/;
        [ 0, 0 ].sort(function () {
            baseHasDuplicate = false;
            return 0;
          });
        var Sizzle = function (selector, context, results, seed) {
          results = results || [ ];
          context = context || document;
          var origContext = context;
          if (context.nodeType !== 1 && context.nodeType !== 9) { return [ ]; }
          if (!selector || typeof selector !== 'string') { return results; }
          var m, set, checkSet, extra, ret, cur, pop, i, prune = true,
          contextXML = Sizzle.isXML(context), parts = [ ], soFar = selector;
          do {
            chunker.exec('');
            m = chunker.exec(soFar);
            if (m) {
              soFar = m[ 3 ];
              parts.push(m[ 1 ]);
              if (m[ 2 ]) {
                extra = m[ 3 ];
                break;
              }
            }
          } while (m);
          if (parts.length > 1 && origPOS.exec(selector)) {
            if (parts.length === 2 && Expr.relative[ parts[ 0 ] ]) {
              set = posProcess(parts[ 0 ] + parts[ 1 ], context);
            } else {
              set = Expr.relative[ parts[ 0 ] ] ? [ context ]:
              Sizzle(parts.shift(), context);
              while (parts.length) {
                selector = parts.shift();
                if (Expr.relative[ selector ]) {
                  selector += parts.shift();
                }
                set = posProcess(selector, set);
              }
            }
          } else {
            if (!seed && parts.length > 1 && context.nodeType === 9 &&
              !contextXML && Expr.match.ID.test(parts[ 0 ]) &&
              !Expr.match.ID.test(parts[ parts.length - 1 ])) {
              ret = Sizzle.find(parts.shift(), context, contextXML);
              context = ret.expr? (Sizzle.filter(ret.expr, ret.set))[ 0 ]:
              ret.set[ 0 ];
            }
            if (context) {
              ret = seed? {
                'expr': parts.pop(),
                'set': makeArray(seed)
              }: Sizzle.find(parts.pop(), parts.length === 1 && (parts[ 0 ] ===
                    '~' || parts[ 0 ] === '+') && context.parentNode?
                context.parentNode: context, contextXML);
              set = ret.expr? Sizzle.filter(ret.expr, ret.set): ret.set;
              if (parts.length > 0) {
                checkSet = makeArray(set);
              } else { prune = false; }
              while (parts.length) {
                cur = parts.pop();
                pop = cur;
                if (!Expr.relative[ cur ]) { cur = ''; } else {
                  pop = parts.pop();
                }
                if (pop == null) { pop = context; }
                Expr.relative[ cur ] (checkSet, pop, contextXML);
              }
            } else {
              checkSet = parts = [ ];
            }
          }
          if (!checkSet) { checkSet = set; }
          if (!checkSet) {
            Sizzle.error(cur || selector);
          }
          if (toString.call(checkSet) === '[object Array]') {
            if (!prune) {
              results.push.apply(results, checkSet);
            } else if (context && context.nodeType === 1) {
              for (i = 0; checkSet[ i ] != null; i++) {
                if (checkSet[ i ] && (checkSet[ i ] === true || checkSet[ i ]
                      .nodeType === 1 && Sizzle.contains(context, checkSet[ i ]
                    ))) {
                  results.push(set[ i ]);
                }
              }
            } else {
              for (i = 0; checkSet[ i ] != null; i++) {
                if (checkSet[ i ] && checkSet[ i ].nodeType === 1) {
                  results.push(set[ i ]);
                }
              }
            }
          } else {
            makeArray(checkSet, results);
          }
          if (extra) {
            Sizzle(extra, origContext, results, seed);
            Sizzle.uniqueSort(results);
          }
          return results;
        };
        Sizzle.uniqueSort = function (results) {
          if (sortOrder) {
            hasDuplicate = baseHasDuplicate;
            results.sort(sortOrder);
            if (hasDuplicate) {
              for (var i = 1; i < results.length; i++) {
                if (results[ i ] === results[ i - 1 ]) {
                  results.splice(i--, 1);
                }
              }
            }
          }
          return results;
        };
        Sizzle.matches = function (expr, set) {
          return Sizzle(expr, null, null, set);
        };
        Sizzle.matchesSelector = function (node, expr) {
          return Sizzle(expr, null, null, [ node ]).length > 0;
        };
        Sizzle.find = function (expr, context, isXML) {
          var set;
          if (!expr) { return [ ]; }
          for (var i = 0, l = Expr.order.length; i < l; i++) {
            var match, type = Expr.order[ i ];
            if (match = Expr.leftMatch[ type ].exec(expr)) {
              var left = match[ 1 ];
              match.splice(1, 1);
              if (left.substr(left.length - 1) !== '\\') {
                match[ 1 ] = (match[ 1 ] || '').replace(rBackslash, '');
                set = Expr.find[ type ] (match, context, isXML);
                if (set != null) {
                  expr = expr.replace(Expr.match[ type ], '');
                  break;
                }
              }
            }
          }
          if (!set) {
            set = typeof context.getElementsByTagName !== 'undefined'?
              context.getElementsByTagName('*'): [ ];
          }
          return {
            'set': set,
            'expr': expr
          };
        };
        Sizzle.filter = function (expr, set, inplace, not) {
          var x0___;
          var match, anyFound, old = expr, result = [ ], curLoop = set,
          isXMLFilter = set && set[ 0 ] && Sizzle.isXML(set[ 0 ]);
          while (expr && set.length) {
            for (x0___ in Expr.filter) {
              if (x0___.match(/___$/)) { continue; }
              type = x0___;
              {
                if ((match = Expr.leftMatch[ type ].exec(expr)) != null &&
                  match[ 2 ]) {
                  var found, item, filter = Expr.filter[ type ], left = match[
                    1 ];
                  anyFound = false;
                  match.splice(1, 1);
                  if (left.substr(left.length - 1) === '\\') { continue; }
                  if (curLoop === result) {
                    result = [ ];
                  }
                  if (Expr.preFilter[ type ]) {
                    match = Expr.preFilter[ type ] (match, curLoop, inplace,
                      result, not, isXMLFilter);
                    if (!match) {
                      anyFound = found = true;
                    } else if (match === true) { continue; }
                  }
                  if (match) {
                    for (var i = 0; (item = curLoop[ i ]) != null; i++) {
                      if (item) {
                        found = filter(item, match, i, curLoop);
                        var pass = not ^ ! !found;
                        if (inplace && found != null) {
                          if (pass) { anyFound = true; } else {
                            curLoop[ i ] = false;
                          }
                        } else if (pass) {
                          result.push(item);
                          anyFound = true;
                        }
                      }
                    }
                  }
                  if (found !== undefined) {
                    if (!inplace) { curLoop = result; }
                    expr = expr.replace(Expr.match[ type ], '');
                    if (!anyFound) { return [ ]; }
                    break;
                  }
                }
              }
            }
            if (expr === old) {
              if (anyFound == null) {
                Sizzle.error(expr);
              } else { break; }
            }
            old = expr;
          }
          return curLoop;
        };
        Sizzle.error = function (msg) {
          throw 'Syntax error, unrecognized expression: ' + msg;
        };
        var Expr = Sizzle.selectors = {
          'order': [ 'ID', 'NAME', 'TAG' ],
          'match': {
            'ID': /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            'CLASS': /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            'NAME': /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            'ATTR':
            /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
            'TAG': /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            'CHILD':
            /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
            'POS':
            /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            'PSEUDO':
            /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
          },
          'leftMatch': {},
          'attrMap': {
            'class': 'className',
            'for': 'htmlFor'
          },
          'attrHandle': {
            'href': function (elem) {
              return elem.getAttribute('href');
            },
            'type': function (elem) {
              return elem.getAttribute('type');
            }
          },
          'relative': {
            '+': function (checkSet, part) {
              var isPartStr = typeof part === 'string', isTag = isPartStr &&
                !rNonWord.test(part), isPartStrNotTag = isPartStr && !isTag;
              if (isTag) {
                part = part.toLowerCase();
              }
              for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                if (elem = checkSet[ i ]) {
                  while ((elem = elem.previousSibling) && elem.nodeType !== 1)
                    {}
                  checkSet[ i ] = isPartStrNotTag || elem &&
                    elem.nodeName.toLowerCase() === part? elem || false: elem
                    === part;
                }
              }
              if (isPartStrNotTag) {
                Sizzle.filter(part, checkSet, true);
              }
            },
            '>': function (checkSet, part) {
              var elem, isPartStr = typeof part === 'string', i = 0, l =
                checkSet.length;
              if (isPartStr && !rNonWord.test(part)) {
                part = part.toLowerCase();
                for (; i < l; i++) {
                  elem = checkSet[ i ];
                  if (elem) {
                    var parent = elem.parentNode;
                    checkSet[ i ] = parent.nodeName.toLowerCase() === part?
                      parent: false;
                  }
                }
              } else {
                for (; i < l; i++) {
                  elem = checkSet[ i ];
                  if (elem) {
                    checkSet[ i ] = isPartStr? elem.parentNode: elem.parentNode
                      === part;
                  }
                }
                if (isPartStr) {
                  Sizzle.filter(part, checkSet, true);
                }
              }
            },
            '': function (checkSet, part, isXML) {
              var nodeCheck, doneName = done++, checkFn = dirCheck;
              if (typeof part === 'string' && !rNonWord.test(part)) {
                part = part.toLowerCase();
                nodeCheck = part;
                checkFn = dirNodeCheck;
              }
              checkFn('parentNode', part, doneName, checkSet, nodeCheck, isXML)
                ;
            },
            '~': function (checkSet, part, isXML) {
              var nodeCheck, doneName = done++, checkFn = dirCheck;
              if (typeof part === 'string' && !rNonWord.test(part)) {
                part = part.toLowerCase();
                nodeCheck = part;
                checkFn = dirNodeCheck;
              }
              checkFn('previousSibling', part, doneName, checkSet, nodeCheck,
                isXML);
            }
          },
          'find': {
            'ID': function (match, context, isXML) {
              if (typeof context.getElementById !== 'undefined' && !isXML) {
                var m = context.getElementById(match[ 1 ]);
                return m && m.parentNode? [ m ]: [ ];
              }
            },
            'NAME': function (match, context) {
              if (typeof context.getElementsByName !== 'undefined') {
                var ret = [ ], results = context.getElementsByName(match[ 1 ]);
                for (var i = 0, l = results.length; i < l; i++) {
                  if (results[ i ].getAttribute('name') === match[ 1 ]) {
                    ret.push(results[ i ]);
                  }
                }
                return ret.length === 0? null: ret;
              }
            },
            'TAG': function (match, context) {
              if (typeof context.getElementsByTagName !== 'undefined') {
                return context.getElementsByTagName(match[ 1 ]);
              }
            }
          },
          'preFilter': {
            'CLASS': function (match, curLoop, inplace, result, not, isXML) {
              match = ' ' + match[ 1 ].replace(rBackslash, '') + ' ';
              if (isXML) { return match; }
              for (var i = 0, elem; (elem = curLoop[ i ]) != null; i++) {
                if (elem) {
                  if (not ^ (elem.className && (' ' + elem.className + ' ')
                      .replace(/[\t\n\r]/g, ' ').indexOf(match) >= 0)) {
                    if (!inplace) {
                      result.push(elem);
                    }
                  } else if (inplace) {
                    curLoop[ i ] = false;
                  }
                }
              }
              return false;
            },
            'ID': function (match) {
              return match[ 1 ].replace(rBackslash, '');
            },
            'TAG': function (match, curLoop) {
              return match[ 1 ].replace(rBackslash, '').toLowerCase();
            },
            'CHILD': function (match) {
              if (match[ 1 ] === 'nth') {
                if (!match[ 2 ]) {
                  Sizzle.error(match[ 0 ]);
                }
                match[ 2 ] = match[ 2 ].replace(/^\+|\s*/g, '');
                var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[ 2 ] ===
                    'even' && '2n' || match[ 2 ] === 'odd' && '2n+1' ||
                    !/\D/.test(match[ 2 ]) && '0n+' + match[ 2 ] || match[ 2 ])
                  ;
                match[ 2 ] = test[ 1 ] + (test[ 2 ] || 1) - 0;
                match[ 3 ] = test[ 3 ] - 0;
              } else if (match[ 2 ]) {
                Sizzle.error(match[ 0 ]);
              }
              match[ 0 ] = done++;
              return match;
            },
            'ATTR': function (match, curLoop, inplace, result, not, isXML) {
              var name = match[ 1 ] = match[ 1 ].replace(rBackslash, '');
              if (!isXML && Expr.attrMap[ name ]) {
                match[ 1 ] = Expr.attrMap[ name ];
              }
              match[ 4 ] = (match[ 4 ] || match[ 5 ] || '').replace(rBackslash,
                '');
              if (match[ 2 ] === '~=') {
                match[ 4 ] = ' ' + match[ 4 ] + ' ';
              }
              return match;
            },
            'PSEUDO': function (match, curLoop, inplace, result, not) {
              if (match[ 1 ] === 'not') {
                if ((chunker.exec(match[ 3 ]) || '').length > 1 ||
                  /^\w/.test(match[ 3 ])) {
                  match[ 3 ] = Sizzle(match[ 3 ], null, null, curLoop);
                } else {
                  var ret = Sizzle.filter(match[ 3 ], curLoop, inplace, true ^
                      not);
                  if (!inplace) {
                    result.push.apply(result, ret);
                  }
                  return false;
                }
              } else if (Expr.match.POS.test(match[ 0 ]) ||
                Expr.match.CHILD.test(match[ 0 ])) { return true; }
              return match;
            },
            'POS': function (match) {
              match.unshift(true);
              return match;
            }
          },
          'filters': {
            'enabled': function (elem) {
              return elem.disabled === false && elem.type !== 'hidden';
            },
            'disabled': function (elem) {
              return elem.disabled === true;
            },
            'checked': function (elem) {
              return elem.checked === true;
            },
            'selected': function (elem) {
              if (elem.parentNode) {
                elem.parentNode.selectedIndex;
              }
              return elem.selected === true;
            },
            'parent': function (elem) {
              return ! !elem.firstChild;
            },
            'empty': function (elem) {
              return !elem.firstChild;
            },
            'has': function (elem, i, match) {
              return ! !Sizzle(match[ 3 ], elem).length;
            },
            'header': function (elem) {
              return /h\d/i.test(elem.nodeName);
            },
            'text': function (elem) {
              var attr = elem.getAttribute('type'), type = elem.type;
              return elem.nodeName.toLowerCase() === 'input' && 'text' === type
                && (attr === type || attr === null);
            },
            'radio': function (elem) {
              return elem.nodeName.toLowerCase() === 'input' && 'radio' ===
                elem.type;
            },
            'checkbox': function (elem) {
              return elem.nodeName.toLowerCase() === 'input' && 'checkbox' ===
                elem.type;
            },
            'file': function (elem) {
              return elem.nodeName.toLowerCase() === 'input' && 'file' ===
                elem.type;
            },
            'password': function (elem) {
              return elem.nodeName.toLowerCase() === 'input' && 'password' ===
                elem.type;
            },
            'submit': function (elem) {
              var name = elem.nodeName.toLowerCase();
              return (name === 'input' || name === 'button') && 'submit' ===
                elem.type;
            },
            'image': function (elem) {
              return elem.nodeName.toLowerCase() === 'input' && 'image' ===
                elem.type;
            },
            'reset': function (elem) {
              var name = elem.nodeName.toLowerCase();
              return (name === 'input' || name === 'button') && 'reset' ===
                elem.type;
            },
            'button': function (elem) {
              var name = elem.nodeName.toLowerCase();
              return name === 'input' && 'button' === elem.type || name ===
                'button';
            },
            'input': function (elem) {
              return /input|select|textarea|button/i.test(elem.nodeName);
            },
            'focus': function (elem) {
              return elem === elem.ownerDocument.activeElement;
            }
          },
          'setFilters': {
            'first': function (elem, i) {
              return i === 0;
            },
            'last': function (elem, i, match, array) {
              return i === array.length - 1;
            },
            'even': function (elem, i) {
              return i % 2 === 0;
            },
            'odd': function (elem, i) {
              return i % 2 === 1;
            },
            'lt': function (elem, i, match) {
              return i < match[ 3 ] - 0;
            },
            'gt': function (elem, i, match) {
              return i > match[ 3 ] - 0;
            },
            'nth': function (elem, i, match) {
              return match[ 3 ] - 0 === i;
            },
            'eq': function (elem, i, match) {
              return match[ 3 ] - 0 === i;
            }
          },
          'filter': {
            'PSEUDO': function (elem, match, i, array) {
              var name = match[ 1 ], filter = Expr.filters[ name ];
              if (filter) {
                return filter(elem, i, match, array);
              } else if (name === 'contains') {
                return (elem.textContent || elem.innerText || Sizzle.getText([
                      elem ]) || '').indexOf(match[ 3 ]) >= 0;
              } else if (name === 'not') {
                var not = match[ 3 ];
                for (var j = 0, l = not.length; j < l; j++) {
                  if (not[ j ] === elem) { return false; }
                }
                return true;
              } else {
                Sizzle.error(name);
              }
            },
            'CHILD': function (elem, match) {
              var type = match[ 1 ], node = elem;
              switch (type) {
              case 'only':
              case 'first':
                while (node = node.previousSibling) {
                  if (node.nodeType === 1) { return false; }
                }
                if (type === 'first') { return true; }
                node = elem;
              case 'last':
                while (node = node.nextSibling) {
                  if (node.nodeType === 1) { return false; }
                }
                return true;
              case 'nth':
                var first = match[ 2 ], last = match[ 3 ];
                if (first === 1 && last === 0) { return true; }
                var doneName = match[ 0 ], parent = elem.parentNode;
                if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)
                ) {
                  var count = 0;
                  for (node = parent.firstChild; node; node = node.nextSibling)
                    {
                    if (node.nodeType === 1) {
                      node.nodeIndex = ++count;
                    }
                  }
                  parent.sizcache = doneName;
                }
                var diff = elem.nodeIndex - last;
                if (first === 0) {
                  return diff === 0;
                } else {
                  return diff % first === 0 && diff / first >= 0;
                }
              }
            },
            'ID': function (elem, match) {
              return elem.nodeType === 1 && elem.getAttribute('id') === match;
            },
            'TAG': function (elem, match) {
              return match === '*' && elem.nodeType === 1 ||
                elem.nodeName.toLowerCase() === match;
            },
            'CLASS': function (elem, match) {
              return (' ' + (elem.className || elem.getAttribute('class')) +
                  ' ').indexOf(match) > -1;
            },
            'ATTR': function (elem, match) {
              var name = match[ 1 ], result = Expr.attrHandle[ name ] ?
                Expr.attrHandle[ name ] (elem): elem[ name ] != null ? elem[
                name ]: elem.getAttribute(name), value = result + '', type =
                match[ 2 ], check = match[ 4 ];
              return result == null ? type === '!=': type === '='? value ===
                check: type === '*='? value.indexOf(check) >= 0: type === '~='?
                (' ' + value + ' ').indexOf(check) >= 0: !check? value &&
                result !== false: type === '!='? value !== check: type ===
                '^='? value.indexOf(check) === 0: type === '$='?
                value.substr(value.length - check.length) === check: type ===
                '|='? value === check || value.substr(0, check.length + 1) ===
                check + '-': false;
            },
            'POS': function (elem, match, i, array) {
              var name = match[ 2 ], filter = Expr.setFilters[ name ];
              if (filter) {
                return filter(elem, i, match, array);
              }
            }
          }
        };
        var origPOS = Expr.match.POS, fescape = function (all, num) {
          return '\\' + (num - 0 + 1);
        };
        for (x0___ in Expr.match) {
          if (x0___.match(/___$/)) { continue; }
          type = x0___;
          {
            Expr.match[ type ] = new RegExp(Expr.match[ type ].source +
                /(?![^\[]*\])(?![^\(]*\))/.source);
            Expr.leftMatch[ type ] = new RegExp(/(^(?:.|\r|\n)*?)/.source +
              Expr.match[ type ].source.replace(/\\(\d+)/g, fescape));
          }
        }
        var makeArray = function (array, results) {
          array = Array.prototype.slice.call(array, 0);
          if (results) {
            results.push.apply(results, array);
            return results;
          }
          return array;
        };
        try {
          (Array.prototype.slice.call(document.documentElement.childNodes, 0))[
            0 ].nodeType;
        } catch (e) {
          makeArray = function (array, results) {
            var i = 0, ret = results || [ ];
            if (toString.call(array) === '[object Array]') {
              Array.prototype.push.apply(ret, array);
            } else {
              if (typeof array.length === 'number') {
                for (var l = array.length; i < l; i++) {
                  ret.push(array[ i ]);
                }
              } else {
                for (; array[ i ]; i++) {
                  ret.push(array[ i ]);
                }
              }
            }
            return ret;
          };
        }
        var sortOrder, siblingCheck;
        if (document.documentElement.compareDocumentPosition) {
          sortOrder = function (a, b) {
            if (a === b) {
              hasDuplicate = true;
              return 0;
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
              return a.compareDocumentPosition? -1: 1;
            }
            return a.compareDocumentPosition(b) & 4? -1: 1;
          };
        } else {
          sortOrder = function (a, b) {
            if (a === b) {
              hasDuplicate = true;
              return 0;
            } else if (a.sourceIndex && b.sourceIndex) {
              return a.sourceIndex - b.sourceIndex;
            }
            var al, bl, ap = [ ], bp = [ ], aup = a.parentNode, bup =
              b.parentNode, cur = aup;
            if (aup === bup) {
              return siblingCheck(a, b);
            } else if (!aup) { return -1; } else if (!bup) { return 1; }
            while (cur) {
              ap.unshift(cur);
              cur = cur.parentNode;
            }
            cur = bup;
            while (cur) {
              bp.unshift(cur);
              cur = cur.parentNode;
            }
            al = ap.length;
            bl = bp.length;
            for (var i = 0; i < al && i < bl; i++) {
              if (ap[ i ] !== bp[ i ]) {
                return siblingCheck(ap[ i ], bp[ i ]);
              }
            }
            return i === al? siblingCheck(a, bp[ i ], -1): siblingCheck(ap[ i ]
              , b, 1);
          };
          siblingCheck = function (a, b, ret) {
            if (a === b) { return ret; }
            var cur = a.nextSibling;
            while (cur) {
              if (cur === b) { return -1; }
              cur = cur.nextSibling;
            }
            return 1;
          };
        }
        Sizzle.getText = function (elems) {
          var ret = '', elem;
          for (var i = 0; elems[ i ]; i++) {
            elem = elems[ i ];
            if (elem.nodeType === 3 || elem.nodeType === 4) {
              ret += elem.nodeValue;
            } else if (elem.nodeType !== 8) {
              ret += Sizzle.getText(elem.childNodes);
            }
          }
          return ret;
        };
        (function () {
           var form = document.createElement('div'), id = 'script' + new Date()
             .getTime(), root = document.documentElement;
           form.innerHTML = '<a name=\'' + id + '\'/>';
           root.insertBefore(form, root.firstChild);
           if (document.getElementById(id)) {
             Expr.find.ID = function (match, context, isXML) {
               if (typeof context.getElementById !== 'undefined' && !isXML) {
                 var m = context.getElementById(match[ 1 ]);
                 return m? m.id === match[ 1 ] || typeof m.getAttributeNode !==
                   'undefined' && m.getAttributeNode('id').nodeValue === match[
                   1 ] ? [ m ]: undefined: [ ];
               }
             };
             Expr.filter.ID = function (elem, match) {
               var node = typeof elem.getAttributeNode !== 'undefined' &&
                 elem.getAttributeNode('id');
               return elem.nodeType === 1 && node && node.nodeValue === match;
             };
           }
           root.removeChild(form);
           root = form = null;
         })();
        (function () {
           var div = document.createElement('div');
           div.appendChild(document.createComment(''));
           if (div.getElementsByTagName('*').length > 0) {
             Expr.find.TAG = function (match, context) {
               var results = context.getElementsByTagName(match[ 1 ]);
               if (match[ 1 ] === '*') {
                 var tmp = [ ];
                 for (var i = 0; results[ i ]; i++) {
                   if (results[ i ].nodeType === 1) {
                     tmp.push(results[ i ]);
                   }
                 }
                 results = tmp;
               }
               return results;
             };
           }
           div.innerHTML = '<a href=\'#\'></a>';
           if (div.firstChild && typeof div.firstChild.getAttribute !==
             'undefined' && div.firstChild.getAttribute('href') !== '#') {
             Expr.attrHandle.href = function (elem) {
               return elem.getAttribute('href', 2);
             };
           }
           div = null;
         })();
        if (document.querySelectorAll) {
          (function () {
             var x0___;
             var oldSizzle = Sizzle, div = document.createElement('div'), id =
               '__sizzle__';
             div.innerHTML = '<p class=\'TEST\'></p>';
             if (div.querySelectorAll && div.querySelectorAll('.TEST').length
                 === 0) { return; }
             Sizzle = function (query, context, extra, seed) {
               context = context || document;
               if (!seed && !Sizzle.isXML(context)) {
                 var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);
                 if (match && (context.nodeType === 1 || context.nodeType ===
                     9)) {
                   if (match[ 1 ]) {
                     return makeArray(context.getElementsByTagName(query),
                       extra);
                   } else if (match[ 2 ] && Expr.find.CLASS &&
                       context.getElementsByClassName) {
                     return makeArray(context.getElementsByClassName(match[ 2 ]
                       ), extra);
                   }
                 }
                 if (context.nodeType === 9) {
                   if (query === 'body' && context.body) {
                     return makeArray([ context.body ], extra);
                   } else if (match && match[ 3 ]) {
                     var elem = context.getElementById(match[ 3 ]);
                     if (elem && elem.parentNode) {
                       if (elem.id === match[ 3 ]) {
                         return makeArray([ elem ], extra);
                       }
                     } else {
                       return makeArray([ ], extra);
                     }
                   }
                   try {
                     return makeArray(context.querySelectorAll(query), extra);
                   } catch (qsaError) {}
                 } else if (context.nodeType === 1 &&
                     context.nodeName.toLowerCase() !== 'object') {
                   var oldContext = context, old = context.getAttribute('id'),
                   nid = old || id, hasParent = context.parentNode,
                   relativeHierarchySelector = /^\s*[+~]/.test(query);
                   if (!old) {
                     context.setAttribute('id', nid);
                   } else {
                     nid = nid.replace(/'/g, '\\$&');
                   }
                   if (relativeHierarchySelector && hasParent) {
                     context = context.parentNode;
                   }
                   try {
                     if (!relativeHierarchySelector || hasParent) {
                       return makeArray(context.querySelectorAll('[id=\'' + nid
                           + '\'] ' + query), extra);
                     }
                   } catch (pseudoError) {} finally {
                     if (!old) {
                       oldContext.removeAttribute('id');
                     }
                   }
                 }
               }
               return oldSizzle(query, context, extra, seed);
             };
             for (x0___ in oldSizzle) {
               if (x0___.match(/___$/)) { continue; }
               prop = x0___;
               {
                 Sizzle[ prop ] = oldSizzle[ prop ];
               }
             }
             div = null;
           })();
        }
        (function () {
           var html = document.documentElement, matches = html.matchesSelector
             || html.mozMatchesSelector || html.webkitMatchesSelector ||
             html.msMatchesSelector;
           if (matches) {
             var disconnectedMatch =
               !matches.call(document.createElement('div'), 'div'), pseudoWorks
               = false;
             try {
               matches.call(document.documentElement, '[test!=\'\']:sizzle');
             } catch (pseudoError) {
               pseudoWorks = true;
             }
             Sizzle.matchesSelector = function (node, expr) {
               expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, '=\'$1\']');
               if (!Sizzle.isXML(node)) {
                 try {
                   if (pseudoWorks || !Expr.match.PSEUDO.test(expr) &&
                       !/!=/.test(expr)) {
                     var ret = matches.call(node, expr);
                     if (ret || !disconnectedMatch || node.document &&
                         node.document.nodeType !== 11) { return ret; }
                   }
                 } catch (e) {}
               }
               return Sizzle(expr, null, null, [ node ]).length > 0;
             };
           }
         })();
        (function () {
           var div = document.createElement('div');
           div.innerHTML =
             '<div class=\'test e\'></div><div class=\'test\'></div>';
           if (!div.getElementsByClassName || div.getElementsByClassName('e')
               .length === 0) { return; }
           div.lastChild.className = 'e';
           if (div.getElementsByClassName('e').length === 1) { return; }
           Expr.order.splice(1, 0, 'CLASS');
           Expr.find.CLASS = function (match, context, isXML) {
             if (typeof context.getElementsByClassName !== 'undefined' &&
                 !isXML) {
               return context.getElementsByClassName(match[ 1 ]);
             }
           };
           div = null;
         })();
        function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
          for (var i = 0, l = checkSet.length; i < l; i++) {
            var elem = checkSet[ i ];
            if (elem) {
              var match = false;
              elem = elem[ dir ];
              while (elem) {
                if (elem.sizcache === doneName) {
                  match = checkSet[ elem.sizset ];
                  break;
                }
                if (elem.nodeType === 1 && !isXML) {
                  elem.sizcache = doneName;
                  elem.sizset = i;
                }
                if (elem.nodeName.toLowerCase() === cur) {
                  match = elem;
                  break;
                }
                elem = elem[ dir ];
              }
              checkSet[ i ] = match;
            }
          }
        }
        function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
          for (var i = 0, l = checkSet.length; i < l; i++) {
            var elem = checkSet[ i ];
            if (elem) {
              var match = false;
              elem = elem[ dir ];
              while (elem) {
                if (elem.sizcache === doneName) {
                  match = checkSet[ elem.sizset ];
                  break;
                }
                if (elem.nodeType === 1) {
                  if (!isXML) {
                    elem.sizcache = doneName;
                    elem.sizset = i;
                  }
                  if (typeof cur !== 'string') {
                    if (elem === cur) {
                      match = true;
                      break;
                    }
                  } else if (Sizzle.filter(cur, [ elem ]).length > 0) {
                    match = elem;
                    break;
                  }
                }
                elem = elem[ dir ];
              }
              checkSet[ i ] = match;
            }
          }
        }
        if (document.documentElement.contains) {
          Sizzle.contains = function (a, b) {
            return a !== b && (a.contains? a.contains(b): true);
          };
        } else if (document.documentElement.compareDocumentPosition) {
          Sizzle.contains = function (a, b) {
            return ! ! (a.compareDocumentPosition(b) & 16);
          };
        } else {
          Sizzle.contains = function () { return false; };
        }
        Sizzle.isXML = function (elem) {
          var documentElement = (elem? elem.ownerDocument || elem: 0)
            .documentElement;
          return documentElement? documentElement.nodeName !== 'HTML': false;
        };
        var posProcess = function (selector, context) {
          var match, tmpSet = [ ], later = '', root = context.nodeType? [
            context ]: context;
          while (match = Expr.match.PSEUDO.exec(selector)) {
            later += match[ 0 ];
            selector = selector.replace(Expr.match.PSEUDO, '');
          }
          selector = Expr.relative[ selector ] ? selector + '*': selector;
          for (var i = 0, l = root.length; i < l; i++) {
            Sizzle(selector, root[ i ], tmpSet);
          }
          return Sizzle.filter(later, tmpSet);
        };
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[ ':' ] = jQuery.expr.filters;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
      })();
     var runtil = /Until$/, rparentsprev = /^(?:parents|prevUntil|prevAll)/,
     rmultiselector = /,/, isSimple = /^.[^:#\[\.,]*$/, slice =
       Array.prototype.slice, POS = jQuery.expr.match.POS, guaranteedUnique = {
       'children': true,
       'contents': true,
       'next': true,
       'prev': true
     };
     jQuery.fn.extend({
         'find': function (selector) {
           var this___ = this && this.___? void 0: this;
           var self = this___, i, l;
           if (typeof selector !== 'string') {
             return jQuery(selector).filter(function () {
                 var this___ = this && this.___? void 0: this;
                 for (i = 0, l = self.length; i < l; i++) {
                   if (jQuery.contains(self[ i ], this___)) { return true; }
                 }
               });
           }
           var ret = this___.pushStack('', 'find', selector), length, n, r;
           for (i = 0, l = this___.length; i < l; i++) {
             length = ret.length;
             jQuery.find(selector, this___[ i ], ret);
             if (i > 0) {
               for (n = length; n < ret.length; n++) {
                 for (r = 0; r < length; r++) {
                   if (ret[ r ] === ret[ n ]) {
                     ret.splice(n--, 1);
                     break;
                   }
                 }
               }
             }
           }
           return ret;
         },
         'has': function (target) {
           var this___ = this && this.___? void 0: this;
           var targets = jQuery(target);
           return this___.filter(function () {
               var this___ = this && this.___? void 0: this;
               for (var i = 0, l = targets.length; i < l; i++) {
                 if (jQuery.contains(this___, targets[ i ])) { return true; }
               }
             });
         },
         'not': function (selector) {
           var this___ = this && this.___? void 0: this;
           return this___.pushStack(winnow(this___, selector, false), 'not',
             selector);
         },
         'filter': function (selector) {
           var this___ = this && this.___? void 0: this;
           return this___.pushStack(winnow(this___, selector, true), 'filter',
             selector);
         },
         'is': function (selector) {
           var this___ = this && this.___? void 0: this;
           return ! !selector && (typeof selector === 'string'?
             jQuery.filter(selector, this___).length > 0:
             this___.filter(selector).length > 0);
         },
         'closest': function (selectors, context) {
           var x0___;
           var this___ = this && this.___? void 0: this;
           var ret = [ ], i, l, cur = this___[ 0 ];
           if (jQuery.isArray(selectors)) {
             var match, selector, matches = {}, level = 1;
             if (cur && selectors.length) {
               for (i = 0, l = selectors.length; i < l; i++) {
                 selector = selectors[ i ];
                 if (!matches[ selector ]) {
                   matches[ selector ] = POS.test(selector) ? jQuery(selector,
                     context || this___.context): selector;
                 }
               }
               while (cur && cur.ownerDocument && cur !== context) {
                 for (x0___ in matches) {
                   if (x0___.match(/___$/)) { continue; }
                   selector = x0___;
                   {
                     match = matches[ selector ];
                     if (match.jquery? match.index(cur) > -1: jQuery(cur)
                         .is(match)) {
                       ret.push({
                           'selector': selector,
                           'elem': cur,
                           'level': level
                         });
                     }
                   }
                 }
                 cur = cur.parentNode;
                 level++;
               }
             }
             return ret;
           }
           var pos = POS.test(selectors) || typeof selectors !== 'string'?
             jQuery(selectors, context || this___.context): 0;
           for (i = 0, l = this___.length; i < l; i++) {
             cur = this___[ i ];
             while (cur) {
               if (pos? pos.index(cur) > -1: jQuery.find.matchesSelector(cur,
                   selectors)) {
                 ret.push(cur);
                 break;
               } else {
                 cur = cur.parentNode;
                 if (!cur || !cur.ownerDocument || cur === context ||
                     cur.nodeType === 11) { break; }
               }
             }
           }
           ret = ret.length > 1? jQuery.unique(ret): ret;
           return this___.pushStack(ret, 'closest', selectors);
         },
         'index': function (elem) {
           var this___ = this && this.___? void 0: this;
           if (!elem || typeof elem === 'string') {
             return jQuery.inArray(this___[ 0 ], elem? jQuery(elem):
               this___.parent().children());
           }
           return jQuery.inArray(elem.jquery? elem[ 0 ]: elem, this___);
         },
         'add': function (selector, context) {
           var this___ = this && this.___? void 0: this;
           var set = typeof selector === 'string'? jQuery(selector, context):
           jQuery.makeArray(selector && selector.nodeType? [ selector ]:
             selector), all = jQuery.merge(this___.get(), set);
           return this___.pushStack(isDisconnected(set[ 0 ]) ||
             isDisconnected(all[ 0 ]) ? all: jQuery.unique(all));
         },
         'andSelf': function () {
           var this___ = this && this.___? void 0: this;
           return this___.add(this___.prevObject);
         }
       });
     function isDisconnected(node) {
       return !node || !node.parentNode || node.parentNode.nodeType === 11;
     }
     jQuery.each({
         'parent': function (elem) {
           var parent = elem.parentNode;
           return parent && parent.nodeType !== 11? parent: null;
         },
         'parents': function (elem) {
           return jQuery.dir(elem, 'parentNode');
         },
         'parentsUntil': function (elem, i, until) {
           return jQuery.dir(elem, 'parentNode', until);
         },
         'next': function (elem) {
           return jQuery.nth(elem, 2, 'nextSibling');
         },
         'prev': function (elem) {
           return jQuery.nth(elem, 2, 'previousSibling');
         },
         'nextAll': function (elem) {
           return jQuery.dir(elem, 'nextSibling');
         },
         'prevAll': function (elem) {
           return jQuery.dir(elem, 'previousSibling');
         },
         'nextUntil': function (elem, i, until) {
           return jQuery.dir(elem, 'nextSibling', until);
         },
         'prevUntil': function (elem, i, until) {
           return jQuery.dir(elem, 'previousSibling', until);
         },
         'siblings': function (elem) {
           return jQuery.sibling(elem.parentNode.firstChild, elem);
         },
         'children': function (elem) {
           return jQuery.sibling(elem.firstChild);
         },
         'contents': function (elem) {
           return jQuery.nodeName(elem, 'iframe') ? elem.contentDocument ||
             elem.contentWindow.document: jQuery.makeArray(elem.childNodes);
         }
       }, function (name, fn) {
         jQuery.fn[ name ] = function (until, selector) {
           var this___ = this && this.___? void 0: this;
           var ret = jQuery.map(this___, fn, until), args =
             slice.call(arguments);
           if (!runtil.test(name)) { selector = until; }
           if (selector && typeof selector === 'string') {
             ret = jQuery.filter(selector, ret);
           }
           ret = this___.length > 1 && !guaranteedUnique[ name ] ?
             jQuery.unique(ret): ret;
           if ((this___.length > 1 || rmultiselector.test(selector)) &&
               rparentsprev.test(name)) {
             ret = ret.reverse();
           }
           return this___.pushStack(ret, name, args.join(','));
         };
       });
     jQuery.extend({
         'filter': function (expr, elems, not) {
           if (not) {
             expr = ':not(' + expr + ')';
           }
           return elems.length === 1? jQuery.find.matchesSelector(elems[ 0 ],
             expr) ? [ elems[ 0 ] ]: [ ]: jQuery.find.matches(expr, elems);
         },
         'dir': function (elem, dir, until) {
           var matched = [ ], cur = elem[ dir ];
           while (cur && cur.nodeType !== 9 && (until === undefined ||
                 cur.nodeType !== 1 || !jQuery(cur).is(until))) {
             if (cur.nodeType === 1) {
               matched.push(cur);
             }
             cur = cur[ dir ];
           }
           return matched;
         },
         'nth': function (cur, result, dir, elem) {
           result = result || 1;
           var num = 0;
           for (; cur; cur = cur[ dir ]) {
             if (cur.nodeType === 1 && ++num === result) { break; }
           }
           return cur;
         },
         'sibling': function (n, elem) {
           var r = [ ];
           for (; n; n = n.nextSibling) {
             if (n.nodeType === 1 && n !== elem) {
               r.push(n);
             }
           }
           return r;
         }
       });
     function winnow(elements, qualifier, keep) {
       qualifier = qualifier || 0;
       if (jQuery.isFunction(qualifier)) {
         return jQuery.grep(elements, function (elem, i) {
             var retVal = ! !qualifier.call(elem, i, elem);
             return retVal === keep;
           });
       } else if (qualifier.nodeType) {
         return jQuery.grep(elements, function (elem, i) {
             return elem === qualifier === keep;
           });
       } else if (typeof qualifier === 'string') {
         var filtered = jQuery.grep(elements, function (elem) {
             return elem.nodeType === 1;
           });
         if (isSimple.test(qualifier)) {
           return jQuery.filter(qualifier, filtered, !keep);
         } else {
           qualifier = jQuery.filter(qualifier, filtered);
         }
       }
       return jQuery.grep(elements, function (elem, i) {
           return jQuery.inArray(elem, qualifier) >= 0 === keep;
         });
     }
     var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g, rleadingWhitespace =
       /^\s+/, rxhtmlTag =
       /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
     rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnocache
       = /<(?:script|object|embed|option|style)/i, rchecked =
       /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType =
       /\/(java|ecma)script/i, rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
     wrapMap = {
       'option': [ 1, '<select multiple=\'multiple\'>', '</select>' ],
       'legend': [ 1, '<fieldset>', '</fieldset>' ],
       'thead': [ 1, '<table>', '</table>' ],
       'tr': [ 2, '<table><tbody>', '</tbody></table>' ],
       'td': [ 3, '<table><tbody><tr>', '</tr></tbody></table>' ],
       'col': [ 2, '<table><tbody></tbody><colgroup>', '</colgroup></table>' ],
       'area': [ 1, '<map>', '</map>' ],
       '_default': [ 0, '', '' ]
     };
     wrapMap.optgroup = wrapMap.option;
     wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption =
       wrapMap.thead;
     wrapMap.th = wrapMap.td;
     if (!jQuery.support.htmlSerialize) {
       wrapMap._default = [ 1, 'div<div>', '</div>' ];
     }
     jQuery.fn.extend({
         'text': function (text) {
           var this___ = this && this.___? void 0: this;
           if (jQuery.isFunction(text)) {
             return this___.each(function (i) {
                 var this___ = this && this.___? void 0: this;
                 var self = jQuery(this___);
                 self.text(text.call(this___, i, self.text()));
               });
           }
           if (typeof text !== 'object' && text !== undefined) {
             return this___.empty().append((this___[ 0 ] && this___[ 0 ]
                   .ownerDocument || document).createTextNode(text));
           }
           return jQuery.text(this___);
         },
         'wrapAll': function (html) {
           var this___ = this && this.___? void 0: this;
           if (jQuery.isFunction(html)) {
             return this___.each(function (i) {
                 var this___ = this && this.___? void 0: this;
                 jQuery(this___).wrapAll(html.call(this___, i));
               });
           }
           if (this___[ 0 ]) {
             var wrap = jQuery(html, this___[ 0 ].ownerDocument).eq(0)
               .clone(true);
             if (this___[ 0 ].parentNode) {
               wrap.insertBefore(this___[ 0 ]);
             }
             wrap.map(function () {
                 var this___ = this && this.___? void 0: this;
                 var elem = this___;
                 while (elem.firstChild && elem.firstChild.nodeType === 1) {
                   elem = elem.firstChild;
                 }
                 return elem;
               }).append(this___);
           }
           return this___;
         },
         'wrapInner': function (html) {
           var this___ = this && this.___? void 0: this;
           if (jQuery.isFunction(html)) {
             return this___.each(function (i) {
                 var this___ = this && this.___? void 0: this;
                 jQuery(this___).wrapInner(html.call(this___, i));
               });
           }
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               var self = jQuery(this___), contents = self.contents();
               if (contents.length) {
                 contents.wrapAll(html);
               } else {
                 self.append(html);
               }
             });
         },
         'wrap': function (html) {
           var this___ = this && this.___? void 0: this;
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               jQuery(this___).wrapAll(html);
             });
         },
         'unwrap': function () {
           var this___ = this && this.___? void 0: this;
           return this___.parent().each(function () {
               var this___ = this && this.___? void 0: this;
               if (!jQuery.nodeName(this___, 'body')) {
                 jQuery(this___).replaceWith(this___.childNodes);
               }
             }).end();
         },
         'append': function () {
           var this___ = this && this.___? void 0: this;
           return this___.domManip(arguments, true, function (elem) {
               var this___ = this && this.___? void 0: this;
               if (this___.nodeType === 1) {
                 this___.appendChild(elem);
               }
             });
         },
         'prepend': function () {
           var this___ = this && this.___? void 0: this;
           return this___.domManip(arguments, true, function (elem) {
               var this___ = this && this.___? void 0: this;
               if (this___.nodeType === 1) {
                 this___.insertBefore(elem, this___.firstChild);
               }
             });
         },
         'before': function () {
           var this___ = this && this.___? void 0: this;
           if (this___[ 0 ] && this___[ 0 ].parentNode) {
             return this___.domManip(arguments, false, function (elem) {
                 var this___ = this && this.___? void 0: this;
                 this___.parentNode.insertBefore(elem, this___);
               });
           } else if (arguments.length) {
             var set = jQuery(arguments[ 0 ]);
             set.push.apply(set, this___.toArray());
             return this___.pushStack(set, 'before', arguments);
           }
         },
         'after': function () {
           var this___ = this && this.___? void 0: this;
           if (this___[ 0 ] && this___[ 0 ].parentNode) {
             return this___.domManip(arguments, false, function (elem) {
                 var this___ = this && this.___? void 0: this;
                 this___.parentNode.insertBefore(elem, this___.nextSibling);
               });
           } else if (arguments.length) {
             var set = this___.pushStack(this___, 'after', arguments);
             set.push.apply(set, jQuery(arguments[ 0 ]).toArray());
             return set;
           }
         },
         'remove': function (selector, keepData) {
           var this___ = this && this.___? void 0: this;
           for (var i = 0, elem; (elem = this___[ i ]) != null; i++) {
             if (!selector || jQuery.filter(selector, [ elem ]).length) {
               if (!keepData && elem.nodeType === 1) {
                 jQuery.cleanData(elem.getElementsByTagName('*'));
                 jQuery.cleanData([ elem ]);
               }
               if (elem.parentNode) {
                 elem.parentNode.removeChild(elem);
               }
             }
           }
           return this___;
         },
         'empty': function () {
           var this___ = this && this.___? void 0: this;
           for (var i = 0, elem; (elem = this___[ i ]) != null; i++) {
             if (elem.nodeType === 1) {
               jQuery.cleanData(elem.getElementsByTagName('*'));
             }
             while (elem.firstChild) {
               elem.removeChild(elem.firstChild);
             }
           }
           return this___;
         },
         'clone': function (dataAndEvents, deepDataAndEvents) {
           var this___ = this && this.___? void 0: this;
           dataAndEvents = dataAndEvents == null ? false: dataAndEvents;
           deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents:
           deepDataAndEvents;
           return this___.map(function () {
               var this___ = this && this.___? void 0: this;
               return jQuery.clone(this___, dataAndEvents, deepDataAndEvents);
             });
         },
         'html': function (value) {
           var this___ = this && this.___? void 0: this;
           if (value === undefined) {
             return this___[ 0 ] && this___[ 0 ].nodeType === 1? this___[ 0 ]
               .innerHTML.replace(rinlinejQuery, ''): null;
           } else if (typeof value === 'string' && !rnocache.test(value) &&
             (jQuery.support.leadingWhitespace ||
              !rleadingWhitespace.test(value)) && !wrapMap[
               (rtagName.exec(value) || [ '', '' ])[ 1 ].toLowerCase() ]) {
             value = value.replace(rxhtmlTag, '<$1></$2>');
             try {
               for (var i = 0, l = this___.length; i < l; i++) {
                 if (this___[ i ].nodeType === 1) {
                   jQuery.cleanData(this___[ i ].getElementsByTagName('*'));
                   this___[ i ].innerHTML = value;
                 }
               }
             } catch (e) {
               this___.empty().append(value);
             }
           } else if (jQuery.isFunction(value)) {
             this___.each(function (i) {
                 var this___ = this && this.___? void 0: this;
                 var self = jQuery(this___);
                 self.html(value.call(this___, i, self.html()));
               });
           } else {
             this___.empty().append(value);
           }
           return this___;
         },
         'replaceWith': function (value) {
           var this___ = this && this.___? void 0: this;
           if (this___[ 0 ] && this___[ 0 ].parentNode) {
             if (jQuery.isFunction(value)) {
               return this___.each(function (i) {
                   var this___ = this && this.___? void 0: this;
                   var self = jQuery(this___), old = self.html();
                   self.replaceWith(value.call(this___, i, old));
                 });
             }
             if (typeof value !== 'string') {
               value = jQuery(value).detach();
             }
             return this___.each(function () {
                 var this___ = this && this.___? void 0: this;
                 var next = this___.nextSibling, parent = this___.parentNode;
                 jQuery(this___).remove();
                 if (next) {
                   jQuery(next).before(value);
                 } else {
                   jQuery(parent).append(value);
                 }
               });
           } else {
             return this___.length?
               this___.pushStack(jQuery(jQuery.isFunction(value) ? value():
                 value), 'replaceWith', value): this___;
           }
         },
         'detach': function (selector) {
           var this___ = this && this.___? void 0: this;
           return this___.remove(selector, true);
         },
         'domManip': function (args, table, callback) {
           var this___ = this && this.___? void 0: this;
           var results, first, fragment, parent, value = args[ 0 ], scripts = [
           ];
           if (!jQuery.support.checkClone && arguments.length === 3 && typeof
             value === 'string' && rchecked.test(value)) {
             return this___.each(function () {
                 var this___ = this && this.___? void 0: this;
                 jQuery(this___).domManip(args, table, callback, true);
               });
           }
           if (jQuery.isFunction(value)) {
             return this___.each(function (i) {
                 var this___ = this && this.___? void 0: this;
                 var self = jQuery(this___);
                 args[ 0 ] = value.call(this___, i, table? self.html():
                   undefined);
                 self.domManip(args, table, callback);
               });
           }
           if (this___[ 0 ]) {
             parent = value && value.parentNode;
             if (jQuery.support.parentNode && parent && parent.nodeType === 11
               && parent.childNodes.length === this___.length) {
               results = { 'fragment': parent };
             } else {
               results = jQuery.buildFragment(args, this___, scripts);
             }
             fragment = results.fragment;
             if (fragment.childNodes.length === 1) {
               first = fragment = fragment.firstChild;
             } else {
               first = fragment.firstChild;
             }
             if (first) {
               table = table && jQuery.nodeName(first, 'tr');
               for (var i = 0, l = this___.length, lastIndex = l - 1; i < l;
                 i++) {
                 callback.call(table? root(this___[ i ], first): this___[ i ],
                   results.cacheable || l > 1 && i < lastIndex?
                   jQuery.clone(fragment, true, true): fragment);
               }
             }
             if (scripts.length) {
               jQuery.each(scripts, evalScript);
             }
           }
           return this___;
         }
       });
     function root(elem, cur) {
       return jQuery.nodeName(elem, 'table') ?
         (elem.getElementsByTagName('tbody'))[ 0 ] ||
         elem.appendChild(elem.ownerDocument.createElement('tbody')): elem;
     }
     function cloneCopyEvent(src, dest) {
       var x0___;
       if (dest.nodeType !== 1 || !jQuery.hasData(src)) { return; }
       var internalKey = jQuery.expando, oldData = jQuery.data(src), curData =
         jQuery.data(dest, oldData);
       if (oldData = oldData[ internalKey ]) {
         var events = oldData.events;
         curData = curData[ internalKey ] = jQuery.extend({}, oldData);
         if (events) {
           delete curData.handle;
           curData.events = {};
           for (x0___ in events) {
             if (x0___.match(/___$/)) { continue; }
             type = x0___;
             {
               for (var i = 0, l = events[ type ].length; i < l; i++) {
                 jQuery.event.add(dest, type + (events[ type ] [ i ].namespace?
                       '.': '') + events[ type ] [ i ].namespace, events[ type
                   ] [ i ], events[ type ] [ i ].data);
               }
             }
           }
         }
       }
     }
     function cloneFixAttributes(src, dest) {
       var nodeName;
       if (dest.nodeType !== 1) { return; }
       if (dest.clearAttributes) {
         dest.clearAttributes();
       }
       if (dest.mergeAttributes) {
         dest.mergeAttributes(src);
       }
       nodeName = dest.nodeName.toLowerCase();
       if (nodeName === 'object') {
         dest.outerHTML = src.outerHTML;
       } else if (nodeName === 'input' && (src.type === 'checkbox' || src.type
             === 'radio')) {
         if (src.checked) {
           dest.defaultChecked = dest.checked = src.checked;
         }
         if (dest.value !== src.value) {
           dest.value = src.value;
         }
       } else if (nodeName === 'option') {
         dest.selected = src.defaultSelected;
       } else if (nodeName === 'input' || nodeName === 'textarea') {
         dest.defaultValue = src.defaultValue;
       }
       dest.removeAttribute(jQuery.expando);
     }
     jQuery.buildFragment = function (args, nodes, scripts) {
       var fragment, cacheable, cacheresults, doc;
       if (nodes && nodes[ 0 ]) {
         doc = nodes[ 0 ].ownerDocument || nodes[ 0 ];
       }
       if (!doc.createDocumentFragment) { doc = document; }
       if (args.length === 1 && typeof args[ 0 ] === 'string' && args[ 0 ]
         .length < 512 && doc === document && args[ 0 ].charAt(0) === '<' &&
         !rnocache.test(args[ 0 ]) && (jQuery.support.checkClone ||
             !rchecked.test(args[ 0 ]))) {
         cacheable = true;
         cacheresults = jQuery.fragments[ args[ 0 ] ];
         if (cacheresults && cacheresults !== 1) {
           fragment = cacheresults;
         }
       }
       if (!fragment) {
         fragment = doc.createDocumentFragment();
         jQuery.clean(args, doc, fragment, scripts);
       }
       if (cacheable) {
         jQuery.fragments[ args[ 0 ] ] = cacheresults? fragment: 1;
       }
       return {
         'fragment': fragment,
         'cacheable': cacheable
       };
     };
     jQuery.fragments = {};
     jQuery.each({
         'appendTo': 'append',
         'prependTo': 'prepend',
         'insertBefore': 'before',
         'insertAfter': 'after',
         'replaceAll': 'replaceWith'
       }, function (name, original) {
         jQuery.fn[ name ] = function (selector) {
           var this___ = this && this.___? void 0: this;
           var ret = [ ], insert = jQuery(selector), parent = this___.length
             === 1 && this___[ 0 ].parentNode;
           if (parent && parent.nodeType === 11 && parent.childNodes.length ===
               1 && insert.length === 1) {
             insert[ original ] (this___[ 0 ]);
             return this___;
           } else {
             for (var i = 0, l = insert.length; i < l; i++) {
               var elems = (i > 0? this___.clone(true): this___).get();
               (jQuery(insert[ i ]))[ original ] (elems);
               ret = ret.concat(elems);
             }
             return this___.pushStack(ret, name, insert.selector);
           }
         };
       });
     function getAll(elem) {
       if ('getElementsByTagName' in elem) {
         return elem.getElementsByTagName('*');
       } else if ('querySelectorAll' in elem) {
         return elem.querySelectorAll('*');
       } else { return [ ]; }
     }
     function fixDefaultChecked(elem) {
       if (elem.type === 'checkbox' || elem.type === 'radio') {
         elem.defaultChecked = elem.checked;
       }
     }
     function findInputs(elem) {
       if (jQuery.nodeName(elem, 'input')) {
         fixDefaultChecked(elem);
       } else if ('getElementsByTagName' in elem) {
         jQuery.grep(elem.getElementsByTagName('input'), fixDefaultChecked);
       }
     }
     jQuery.extend({
         'clone': function (elem, dataAndEvents, deepDataAndEvents) {
           var clone = elem.cloneNode(true), srcElements, destElements, i;
           if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked)
             && (elem.nodeType === 1 || elem.nodeType === 11) &&
             !jQuery.isXMLDoc(elem)) {
             cloneFixAttributes(elem, clone);
             srcElements = getAll(elem);
             destElements = getAll(clone);
             for (i = 0; srcElements[ i ]; ++i) {
               cloneFixAttributes(srcElements[ i ], destElements[ i ]);
             }
           }
           if (dataAndEvents) {
             cloneCopyEvent(elem, clone);
             if (deepDataAndEvents) {
               srcElements = getAll(elem);
               destElements = getAll(clone);
               for (i = 0; srcElements[ i ]; ++i) {
                 cloneCopyEvent(srcElements[ i ], destElements[ i ]);
               }
             }
           }
           srcElements = destElements = null;
           return clone;
         },
         'clean': function (elems, context, fragment, scripts) {
           var checkScriptType;
           context = context || document;
           if (typeof context.createElement === 'undefined') {
             context = context.ownerDocument || context[ 0 ] && context[ 0 ]
               .ownerDocument || document;
           }
           var ret = [ ], j;
           for (var i = 0, elem; (elem = elems[ i ]) != null; i++) {
             if (typeof elem === 'number') { elem += ''; }
             if (!elem) { continue; }
             if (typeof elem === 'string') {
               if (!rhtml.test(elem)) {
                 elem = context.createTextNode(elem);
               } else {
                 elem = elem.replace(rxhtmlTag, '<$1></$2>');
                 var tag = (rtagName.exec(elem) || [ '', '' ])[ 1 ]
                   .toLowerCase(), wrap = wrapMap[ tag ] || wrapMap._default,
                 depth = wrap[ 0 ], div = context.createElement('div');
                 div.innerHTML = wrap[ 1 ] + elem + wrap[ 2 ];
                 while (depth--) {
                   div = div.lastChild;
                 }
                 if (!jQuery.support.tbody) {
                   var hasBody = rtbody.test(elem), tbody = tag === 'table' &&
                     !hasBody? div.firstChild && div.firstChild.childNodes:
                   wrap[ 1 ] === '<table>' && !hasBody? div.childNodes: [ ];
                   for (j = tbody.length - 1; j >= 0; --j) {
                     if (jQuery.nodeName(tbody[ j ], 'tbody') && !tbody[ j ]
                         .childNodes.length) {
                       tbody[ j ].parentNode.removeChild(tbody[ j ]);
                     }
                   }
                 }
                 if (!jQuery.support.leadingWhitespace &&
                     rleadingWhitespace.test(elem)) {
                   div.insertBefore(context.createTextNode((rleadingWhitespace.exec(elem)
                       )[ 0 ]), div.firstChild);
                 }
                 elem = div.childNodes;
               }
             }
             var len;
             if (!jQuery.support.appendChecked) {
               if (elem[ 0 ] && typeof (len = elem.length) === 'number') {
                 for (j = 0; j < len; j++) {
                   findInputs(elem[ j ]);
                 }
               } else { findInputs(elem); }
             }
             if (elem.nodeType) {
               ret.push(elem);
             } else {
               ret = jQuery.merge(ret, elem);
             }
           }
           if (fragment) {
             checkScriptType = function (elem) {
               return !elem.type || rscriptType.test(elem.type);
             };
             for (i = 0; ret[ i ]; i++) {
               if (scripts && jQuery.nodeName(ret[ i ], 'script') && (!ret[ i ]
                   .type || ret[ i ].type.toLowerCase() === 'text/javascript'))
                 {
                 scripts.push(ret[ i ].parentNode? ret[ i ]
                     .parentNode.removeChild(ret[ i ]): ret[ i ]);
               } else {
                 if (ret[ i ].nodeType === 1) {
                   var jsTags = jQuery.grep(ret[ i ]
                     .getElementsByTagName('script'), checkScriptType);
                   ret.splice.apply(ret, [ i + 1, 0 ].concat(jsTags));
                 }
                 fragment.appendChild(ret[ i ]);
               }
             }
           }
           return ret;
         },
         'cleanData': function (elems) {
           var x0___;
           var data, id, cache = jQuery.cache, internalKey = jQuery.expando,
           special = jQuery.event.special, deleteExpando =
             jQuery.support.deleteExpando;
           for (var i = 0, elem; (elem = elems[ i ]) != null; i++) {
             if (elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ])
               { continue; }
             id = elem[ jQuery.expando ];
             if (id) {
               data = cache[ id ] && cache[ id ] [ internalKey ];
               if (data && data.events) {
                 for (x0___ in data.events) {
                   if (x0___.match(/___$/)) { continue; }
                   type = x0___;
                   {
                     if (special[ type ]) {
                       jQuery.event.remove(elem, type);
                     } else {
                       jQuery.removeEvent(elem, type, data.handle);
                     }
                   }
                 }
                 if (data.handle) {
                   data.handle.elem = null;
                 }
               }
               if (deleteExpando) {
                 delete elem[ jQuery.expando ];
               } else if (elem.removeAttribute) {
                 elem.removeAttribute(jQuery.expando);
               }
               delete cache[ id ];
             }
           }
         }
       });
     function evalScript(i, elem) {
       if (elem.src) {
         jQuery.ajax({
             'url': elem.src,
             'async': false,
             'dataType': 'script'
           });
       } else {
         jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML ||
               '').replace(rcleanScript, '/*$0*/'));
       }
       if (elem.parentNode) {
         elem.parentNode.removeChild(elem);
       }
     }
     var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rupper =
       /([A-Z]|^ms)/g, rnumpx = /^-?\d+(?:px)?$/i, rnum = /^-?\d/, rrelNum =
       /^[+\-]=/, rrelNumFilter = /[^+\-\.\de]+/g, cssShow = {
       'position': 'absolute',
       'visibility': 'hidden',
       'display': 'block'
     }, cssWidth = [ 'Left', 'Right' ], cssHeight = [ 'Top', 'Bottom' ],
     curCSS, getComputedStyle, currentStyle;
     jQuery.fn.css = function (name, value) {
       var this___ = this && this.___? void 0: this;
       if (arguments.length === 2 && value === undefined) { return this___; }
       return jQuery.access(this___, name, value, true, function (elem, name,
           value) {
           return value !== undefined? jQuery.style(elem, name, value):
           jQuery.css(elem, name);
         });
     };
     jQuery.extend({
         'cssHooks': {
           'opacity': {
             'get': function (elem, computed) {
               if (computed) {
                 var ret = curCSS(elem, 'opacity', 'opacity');
                 return ret === ''? '1': ret;
               } else {
                 return elem.style.opacity;
               }
             }
           }
         },
         'cssNumber': {
           'fillOpacity': true,
           'fontWeight': true,
           'lineHeight': true,
           'opacity': true,
           'orphans': true,
           'widows': true,
           'zIndex': true,
           'zoom': true
         },
         'cssProps': {
           'float': jQuery.support.cssFloat? 'cssFloat': 'styleFloat'
         },
         'style': function (elem, name, value, extra) {
           if (!elem || elem.nodeType === 3 || elem.nodeType === 8 ||
               !elem.style) { return; }
           var ret, type, origName = jQuery.camelCase(name), style =
             elem.style, hooks = jQuery.cssHooks[ origName ];
           name = jQuery.cssProps[ origName ] || origName;
           if (value !== undefined) {
             type = typeof value;
             if (type === 'number' && isNaN(value) || value == null) { return;
             }
             if (type === 'string' && rrelNum.test(value)) {
               value = +value.replace(rrelNumFilter, '') +
                 parseFloat(jQuery.css(elem, name));
               type = 'number';
             }
             if (type === 'number' && !jQuery.cssNumber[ origName ]) { value +=
                 'px'; }
             if (!hooks || ! ('set' in hooks) || (value = hooks.set(elem,
                   value)) !== undefined) {
               try {
                 style[ name ] = value;
               } catch (e) {}
             }
           } else {
             if (hooks && 'get' in hooks && (ret = hooks.get(elem, false,
                   extra)) !== undefined) { return ret; }
             return style[ name ];
           }
         },
         'css': function (elem, name, extra) {
           var ret, hooks;
           name = jQuery.camelCase(name);
           hooks = jQuery.cssHooks[ name ];
           name = jQuery.cssProps[ name ] || name;
           if (name === 'cssFloat') { name = 'float'; }
           if (hooks && 'get' in hooks && (ret = hooks.get(elem, true, extra))
               !== undefined) { return ret; } else if (curCSS) {
             return curCSS(elem, name);
           }
         },
         'swap': function (elem, options, callback) {
           var x0___, x1___;
           var old = {};
           for (x0___ in options) {
             if (x0___.match(/___$/)) { continue; }
             name = x0___;
             {
               old[ name ] = elem.style[ name ];
               elem.style[ name ] = options[ name ];
             }
           }
           callback.call(elem);
           for (x1___ in options) {
             if (x1___.match(/___$/)) { continue; }
             name = x1___;
             {
               elem.style[ name ] = old[ name ];
             }
           }
         }
       });
     jQuery.curCSS = jQuery.css;
     jQuery.each([ 'height', 'width' ], function (i, name) {
         jQuery.cssHooks[ name ] = {
           'get': function (elem, computed, extra) {
             var val;
             if (computed) {
               if (elem.offsetWidth !== 0) {
                 return getWH(elem, name, extra);
               } else {
                 jQuery.swap(elem, cssShow, function () {
                     val = getWH(elem, name, extra);
                   });
               }
               return val;
             }
           },
           'set': function (elem, value) {
             if (rnumpx.test(value)) {
               value = parseFloat(value);
               if (value >= 0) {
                 return value + 'px';
               }
             } else { return value; }
           }
         };
       });
     if (!jQuery.support.opacity) {
       jQuery.cssHooks.opacity = {
         'get': function (elem, computed) {
           return ropacity.test((computed && elem.currentStyle?
                 elem.currentStyle.filter: elem.style.filter) || '') ?
             parseFloat(RegExp.$1) / 100 + '': computed? '1': '';
         },
         'set': function (elem, value) {
           var style = elem.style, currentStyle = elem.currentStyle;
           style.zoom = 1;
           var opacity = jQuery.isNaN(value) ? '': 'alpha(opacity=' + value *
             100 + ')', filter = currentStyle && currentStyle.filter ||
             style.filter || '';
           style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity)
             : filter + ' ' + opacity;
         }
       };
     }
     jQuery(function () {
         if (!jQuery.support.reliableMarginRight) {
           jQuery.cssHooks.marginRight = {
             'get': function (elem, computed) {
               var ret;
               jQuery.swap(elem, {
                   'display': 'inline-block'
                 }, function () {
                   if (computed) {
                     ret = curCSS(elem, 'margin-right', 'marginRight');
                   } else {
                     ret = elem.style.marginRight;
                   }
                 });
               return ret;
             }
           };
         }
       });
     if (document.defaultView && document.defaultView.getComputedStyle) {
       getComputedStyle = function (elem, name) {
         var ret, defaultView, computedStyle;
         name = name.replace(rupper, '-$1').toLowerCase();
         if (! (defaultView = elem.ownerDocument.defaultView)) { return undefined; }
         if (computedStyle = defaultView.getComputedStyle(elem, null)) {
           ret = computedStyle.getPropertyValue(name);
           if (ret === '' &&
               !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
             ret = jQuery.style(elem, name);
           }
         }
         return ret;
       };
     }
     if (document.documentElement.currentStyle) {
       currentStyle = function (elem, name) {
         var left, ret = elem.currentStyle && elem.currentStyle[ name ], rsLeft
           = elem.runtimeStyle && elem.runtimeStyle[ name ], style =
           elem.style;
         if (!rnumpx.test(ret) && rnum.test(ret)) {
           left = style.left;
           if (rsLeft) {
             elem.runtimeStyle.left = elem.currentStyle.left;
           }
           style.left = name === 'fontSize'? '1em': ret || 0;
           ret = style.pixelLeft + 'px';
           style.left = left;
           if (rsLeft) {
             elem.runtimeStyle.left = rsLeft;
           }
         }
         return ret === ''? 'auto': ret;
       };
     }
     curCSS = getComputedStyle || currentStyle;
     function getWH(elem, name, extra) {
       var val = name === 'width'? elem.offsetWidth: elem.offsetHeight, which =
         name === 'width'? cssWidth: cssHeight;
       if (val > 0) {
         if (extra !== 'border') {
           jQuery.each(which, function () {
               var this___ = this && this.___? void 0: this;
               if (!extra) {
                 val -= parseFloat(jQuery.css(elem, 'padding' + this___)) || 0;
               }
               if (extra === 'margin') {
                 val += parseFloat(jQuery.css(elem, extra + this___)) || 0;
               } else {
                 val -= parseFloat(jQuery.css(elem, 'border' + this___ +
                       'Width')) || 0;
               }
             });
         }
         return val + 'px';
       }
       val = curCSS(elem, name, name);
       if (val < 0 || val == null) {
         val = elem.style[ name ] || 0;
       }
       val = parseFloat(val) || 0;
       if (extra) {
         jQuery.each(which, function () {
             var this___ = this && this.___? void 0: this;
             val += parseFloat(jQuery.css(elem, 'padding' + this___)) || 0;
             if (extra !== 'padding') {
               val += parseFloat(jQuery.css(elem, 'border' + this___ + 'Width')
               ) || 0;
             }
             if (extra === 'margin') {
               val += parseFloat(jQuery.css(elem, extra + this___)) || 0;
             }
           });
       }
       return val + 'px';
     }
     if (jQuery.expr && jQuery.expr.filters) {
       jQuery.expr.filters.hidden = function (elem) {
         var width = elem.offsetWidth, height = elem.offsetHeight;
         return width === 0 && height === 0 ||
           !jQuery.support.reliableHiddenOffsets && (elem.style.display ||
             jQuery.css(elem, 'display')) === 'none';
       };
       jQuery.expr.filters.visible = function (elem) {
         return !jQuery.expr.filters.hidden(elem);
       };
     }
     var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rhash = /#.*$/,
     rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, rinput =
       /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
     rlocalProtocol =
       /^(?:about|app|app\-storage|.+\-extension|file|widget):$/, rnoContent =
       /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript =
       /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rselectTextarea =
       /^(?:select|textarea)/i, rspacesAjax = /\s+/, rts = /([?&])_=[^&]*/,
     rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, _load =
       jQuery.fn.load, prefilters = {}, transports = {}, ajaxLocation,
     ajaxLocParts;
     try {
       ajaxLocation = location.href;
     } catch (e) {
       ajaxLocation = document.createElement('a');
       ajaxLocation.href = '';
       ajaxLocation = ajaxLocation.href;
     }
     ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [ ];
     function addToPrefiltersOrTransports(structure) {
       return function (dataTypeExpression, func) {
         if (typeof dataTypeExpression !== 'string') {
           func = dataTypeExpression;
           dataTypeExpression = '*';
         }
         if (jQuery.isFunction(func)) {
           var dataTypes = dataTypeExpression.toLowerCase().split(rspacesAjax),
           i = 0, length = dataTypes.length, dataType, list, placeBefore;
           for (; i < length; i++) {
             dataType = dataTypes[ i ];
             placeBefore = /^\+/.test(dataType);
             if (placeBefore) {
               dataType = dataType.substr(1) || '*';
             }
             list = structure[ dataType ] = structure[ dataType ] || [ ];
             list[ placeBefore? 'unshift': 'push' ] (func);
           }
         }
       };
     }
     function inspectPrefiltersOrTransports(structure, options,
       originalOptions, jqXHR, dataType, inspected) {
       dataType = dataType || options.dataTypes[ 0 ];
       inspected = inspected || {};
       inspected[ dataType ] = true;
       var list = structure[ dataType ], i = 0, length = list? list.length: 0,
       executeOnly = structure === prefilters, selection;
       for (; i < length && (executeOnly || !selection); i++) {
         selection = list[ i ] (options, originalOptions, jqXHR);
         if (typeof selection === 'string') {
           if (!executeOnly || inspected[ selection ]) {
             selection = undefined;
           } else {
             options.dataTypes.unshift(selection);
             selection = inspectPrefiltersOrTransports(structure, options,
               originalOptions, jqXHR, selection, inspected);
           }
         }
       }
       if ((executeOnly || !selection) && !inspected[ '*' ]) {
         selection = inspectPrefiltersOrTransports(structure, options,
           originalOptions, jqXHR, '*', inspected);
       }
       return selection;
     }
     jQuery.fn.extend({
         'load': function (url, params, callback) {
           var this___ = this && this.___? void 0: this;
           if (typeof url !== 'string' && _load) {
             return _load.apply(this___, arguments);
           } else if (!this___.length) { return this___; }
           var off = url.indexOf(' ');
           if (off >= 0) {
             var selector = url.slice(off, url.length);
             url = url.slice(0, off);
           }
           var type = 'GET';
           if (params) {
             if (jQuery.isFunction(params)) {
               callback = params;
               params = undefined;
             } else if (typeof params === 'object') {
               params = jQuery.param(params, jQuery.ajaxSettings.traditional);
               type = 'POST';
             }
           }
           var self = this___;
           jQuery.ajax({
               'url': url,
               'type': type,
               'dataType': 'html',
               'data': params,
               'complete': function (jqXHR, status, responseText) {
                 responseText = jqXHR.responseText;
                 if (jqXHR.isResolved()) {
                   jqXHR.done(function (r) { responseText = r; });
                   self.html(selector? jQuery('<div>')
                       .append(responseText.replace(rscript, ''))
                       .find(selector): responseText);
                 }
                 if (callback) {
                   self.each(callback, [ responseText, status, jqXHR ]);
                 }
               }
             });
           return this___;
         },
         'serialize': function () {
           var this___ = this && this.___? void 0: this;
           return jQuery.param(this___.serializeArray());
         },
         'serializeArray': function () {
           var this___ = this && this.___? void 0: this;
           return this___.map(function () {
               var this___ = this && this.___? void 0: this;
               return this___.elements? jQuery.makeArray(this___.elements):
               this___;
             }).filter(function () {
               var this___ = this && this.___? void 0: this;
               return this___.name && !this___.disabled && (this___.checked ||
                   rselectTextarea.test(this___.nodeName) ||
                   rinput.test(this___.type));
             }).map(function (i, elem) {
               var this___ = this && this.___? void 0: this;
               var val = jQuery(this___).val();
               return val == null ? null: jQuery.isArray(val) ? jQuery.map(val,
                 function (val, i) {
                   return {
                     'name': elem.name,
                     'value': val.replace(rCRLF, '\r\n')
                   };
                 }): {
                 'name': elem.name,
                 'value': val.replace(rCRLF, '\r\n')
               };
             }).get();
         }
       });
     jQuery.each('ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend'.split(' ')
         , function (i, o) {
         jQuery.fn[ o ] = function (f) {
           var this___ = this && this.___? void 0: this;
           return this___.bind(o, f);
         };
       });
     jQuery.each([ 'get', 'post' ], function (i, method) {
         jQuery[ method ] = function (url, data, callback, type) {
           if (jQuery.isFunction(data)) {
             type = type || callback;
             callback = data;
             data = undefined;
           }
           return jQuery.ajax({
               'type': method,
               'url': url,
               'data': data,
               'success': callback,
               'dataType': type
             });
         };
       });
     jQuery.extend({
         'getScript': function (url, callback) {
           return jQuery.get(url, undefined, callback, 'script');
         },
         'getJSON': function (url, data, callback) {
           return jQuery.get(url, data, callback, 'json');
         },
         'ajaxSetup': function (target, settings) {
           var x0___;
           if (!settings) {
             settings = target;
             target = jQuery.extend(true, jQuery.ajaxSettings, settings);
           } else {
             jQuery.extend(true, target, jQuery.ajaxSettings, settings);
           }
           for (x0___ in {
               'context': 1,
               'url': 1
             }) {
             if (x0___.match(/___$/)) { continue; }
             field = x0___;
             {
               if (field in settings) {
                 target[ field ] = settings[ field ];
               } else if (field in jQuery.ajaxSettings) {
                 target[ field ] = jQuery.ajaxSettings[ field ];
               }
             }
           }
           return target;
         },
         'ajaxSettings': {
           'url': ajaxLocation,
           'isLocal': rlocalProtocol.test(ajaxLocParts[ 1 ]),
           'global': true,
           'type': 'GET',
           'contentType': 'application/x-www-form-urlencoded',
           'processData': true,
           'async': true,
           'accepts': {
             'xml': 'application/xml, text/xml',
             'html': 'text/html',
             'text': 'text/plain',
             'json': 'application/json, text/javascript',
             '*': '*/*'
           },
           'contents': {
             'xml': /xml/,
             'html': /html/,
             'json': /json/
           },
           'responseFields': {
             'xml': 'responseXML',
             'text': 'responseText'
           },
           'converters': {
             '* text': window.String,
             'text html': true,
             'text json': jQuery.parseJSON,
             'text xml': jQuery.parseXML
           }
         },
         'ajaxPrefilter': addToPrefiltersOrTransports(prefilters),
         'ajaxTransport': addToPrefiltersOrTransports(transports),
         'ajax': function (url, options) {
           var x0___, x1___;
           if (typeof url === 'object') {
             options = url;
             url = undefined;
           }
           options = options || {};
           var s = jQuery.ajaxSetup({}, options), callbackContext = s.context
             || s, globalEventContext = callbackContext !== s &&
             (callbackContext.nodeType || callbackContext instanceof jQuery) ?
             jQuery(callbackContext): jQuery.event, deferred =
             jQuery.Deferred(), completeDeferred = jQuery._Deferred(),
           statusCode = s.statusCode || {}, ifModifiedKey, requestHeaders = {},
           requestHeadersNames = {}, responseHeadersString, responseHeaders,
           transport, timeoutTimer, parts, state = 0, fireGlobals, i, jqXHR = {
             'readyState': 0,
             'setRequestHeader': function (name, value) {
               var this___ = this && this.___? void 0: this;
               if (!state) {
                 var lname = name.toLowerCase();
                 name = requestHeadersNames[ lname ] = requestHeadersNames[
                   lname ] || name;
                 requestHeaders[ name ] = value;
               }
               return this___;
             },
             'getAllResponseHeaders': function () {
               return state === 2? responseHeadersString: null;
             },
             'getResponseHeader': function (key) {
               var match;
               if (state === 2) {
                 if (!responseHeaders) {
                   responseHeaders = {};
                   while (match = rheaders.exec(responseHeadersString)) {
                     responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
                   }
                 }
                 match = responseHeaders[ key.toLowerCase() ];
               }
               return match === undefined? null: match;
             },
             'overrideMimeType': function (type) {
               var this___ = this && this.___? void 0: this;
               if (!state) {
                 s.mimeType = type;
               }
               return this___;
             },
             'abort': function (statusText) {
               var this___ = this && this.___? void 0: this;
               statusText = statusText || 'abort';
               if (transport) {
                 transport.abort(statusText);
               }
               done(0, statusText);
               return this___;
             }
           };
           function done(status, statusText, responses, headers) {
             if (state === 2) { return; }
             state = 2;
             if (timeoutTimer) {
               clearTimeout(timeoutTimer);
             }
             transport = undefined;
             responseHeadersString = headers || '';
             jqXHR.readyState = status? 4: 0;
             var isSuccess, success, error, response = responses?
               ajaxHandleResponses(s, jqXHR, responses): undefined,
             lastModified, etag;
             if (status >= 200 && status < 300 || status === 304) {
               if (s.ifModified) {
                 if (lastModified = jqXHR.getResponseHeader('Last-Modified')) {
                   jQuery.lastModified[ ifModifiedKey ] = lastModified;
                 }
                 if (etag = jqXHR.getResponseHeader('Etag')) {
                   jQuery.etag[ ifModifiedKey ] = etag;
                 }
               }
               if (status === 304) {
                 statusText = 'notmodified';
                 isSuccess = true;
               } else {
                 try {
                   success = ajaxConvert(s, response);
                   statusText = 'success';
                   isSuccess = true;
                 } catch (e) {
                   statusText = 'parsererror';
                   error = e;
                 }
               }
             } else {
               error = statusText;
               if (!statusText || status) {
                 statusText = 'error';
                 if (status < 0) { status = 0; }
               }
             }
             jqXHR.status = status;
             jqXHR.statusText = statusText;
             if (isSuccess) {
               deferred.resolveWith(callbackContext, [ success, statusText,
                   jqXHR ]);
             } else {
               deferred.rejectWith(callbackContext, [ jqXHR, statusText, error
                 ]);
             }
             jqXHR.statusCode(statusCode);
             statusCode = undefined;
             if (fireGlobals) {
               globalEventContext.trigger('ajax' + (isSuccess? 'Success':
                   'Error'), [ jqXHR, s, isSuccess? success: error ]);
             }
             completeDeferred.resolveWith(callbackContext, [ jqXHR, statusText
               ]);
             if (fireGlobals) {
               globalEventContext.trigger('ajaxComplete', [ jqXHR, s ]);
               if (! --jQuery.active) {
                 jQuery.event.trigger('ajaxStop');
               }
             }
           }
           deferred.promise(jqXHR);
           jqXHR.success = jqXHR.done;
           jqXHR.error = jqXHR.fail;
           jqXHR.complete = completeDeferred.done;
           jqXHR.statusCode = function (map) {
             var x0___;
             var this___ = this && this.___? void 0: this;
             if (map) {
               var tmp;
               if (state < 2) {
                 for (x0___ in map) {
                   if (x0___.match(/___$/)) { continue; }
                   tmp = x0___;
                   {
                     statusCode[ tmp ] = [ statusCode[ tmp ], map[ tmp ] ];
                   }
                 }
               } else {
                 tmp = map[ jqXHR.status ];
                 jqXHR.then(tmp, tmp);
               }
             }
             return this___;
           };
           s.url = ((url || s.url) + '').replace(rhash, '').replace(rprotocol,
             ajaxLocParts[ 1 ] + '//');
           s.dataTypes = jQuery.trim(s.dataType || '*').toLowerCase()
             .split(rspacesAjax);
           if (s.crossDomain == null) {
             parts = rurl.exec(s.url.toLowerCase());
             s.crossDomain = ! ! (parts && (parts[ 1 ] != ajaxLocParts[ 1 ] ||
                 parts[ 2 ] != ajaxLocParts[ 2 ] || (parts[ 3 ] || (parts[ 1 ]
                     === 'http:'? 80: 443)) != (ajaxLocParts[ 3 ] ||
                   (ajaxLocParts[ 1 ] === 'http:'? 80: 443))));
           }
           if (s.data && s.processData && typeof s.data !== 'string') {
             s.data = jQuery.param(s.data, s.traditional);
           }
           inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
           if (state === 2) { return false; }
           fireGlobals = s.global;
           s.type = s.type.toUpperCase();
           s.hasContent = !rnoContent.test(s.type);
           if (fireGlobals && jQuery.active++ === 0) {
             jQuery.event.trigger('ajaxStart');
           }
           if (!s.hasContent) {
             if (s.data) {
               s.url += (rquery.test(s.url) ? '&': '?') + s.data;
             }
             ifModifiedKey = s.url;
             if (s.cache === false) {
               var ts = jQuery.now(), ret = s.url.replace(rts, '$1_=' + ts);
               s.url = ret + (ret === s.url? (rquery.test(s.url) ? '&': '?') +
                 '_=' + ts: '');
             }
           }
           if (s.data && s.hasContent && s.contentType !== false ||
             options.contentType) {
             jqXHR.setRequestHeader('Content-Type', s.contentType);
           }
           if (s.ifModified) {
             ifModifiedKey = ifModifiedKey || s.url;
             if (jQuery.lastModified[ ifModifiedKey ]) {
               jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[
                   ifModifiedKey ]);
             }
             if (jQuery.etag[ ifModifiedKey ]) {
               jqXHR.setRequestHeader('If-None-Match', jQuery.etag[
                   ifModifiedKey ]);
             }
           }
           jqXHR.setRequestHeader('Accept', s.dataTypes[ 0 ] && s.accepts[
               s.dataTypes[ 0 ] ] ? s.accepts[ s.dataTypes[ 0 ] ] +
             (s.dataTypes[ 0 ] !== '*'? ', */*; q=0.01': ''): s.accepts[ '*' ])
             ;
           for (x0___ in s.headers) {
             if (x0___.match(/___$/)) { continue; }
             i = x0___;
             {
               jqXHR.setRequestHeader(i, s.headers[ i ]);
             }
           }
           if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s)
               === false || state === 2)) {
             jqXHR.abort();
             return false;
           }
           for (x1___ in {
               'success': 1,
               'error': 1,
               'complete': 1
             }) {
             if (x1___.match(/___$/)) { continue; }
             i = x1___;
             {
               jqXHR[ i ] (s[ i ]);
             }
           }
           transport = inspectPrefiltersOrTransports(transports, s, options,
             jqXHR);
           if (!transport) {
             done(-1, 'No Transport');
           } else {
             jqXHR.readyState = 1;
             if (fireGlobals) {
               globalEventContext.trigger('ajaxSend', [ jqXHR, s ]);
             }
             if (s.async && s.timeout > 0) {
               timeoutTimer = setTimeout(function () {
                   jqXHR.abort('timeout');
                 }, s.timeout);
             }
             try {
               state = 1;
               transport.send(requestHeaders, done);
             } catch (e) {
               if (status < 2) {
                 done(-1, e);
               } else {
                 jQuery.error(e);
               }
             }
           }
           return jqXHR;
         },
         'param': function (a, traditional) {
           var x0___;
           var s = [ ], add = function (key, value) {
             value = jQuery.isFunction(value) ? value(): value;
             s[ s.length ] = encodeURIComponent(key) + '=' +
               encodeURIComponent(value);
           };
           if (traditional === undefined) {
             traditional = jQuery.ajaxSettings.traditional;
           }
           if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
             jQuery.each(a, function () {
                 var this___ = this && this.___? void 0: this;
                 add(this___.name, this___.value);
               });
           } else {
             for (x0___ in a) {
               if (x0___.match(/___$/)) { continue; }
               prefix = x0___;
               {
                 buildParams(prefix, a[ prefix ], traditional, add);
               }
             }
           }
           return s.join('&').replace(r20, '+');
         }
       });
     function buildParams(prefix, obj, traditional, add) {
       var x0___;
       if (jQuery.isArray(obj)) {
         jQuery.each(obj, function (i, v) {
             if (traditional || rbracket.test(prefix)) {
               add(prefix, v);
             } else {
               buildParams(prefix + '[' + (typeof v === 'object' ||
                     jQuery.isArray(v) ? i: '') + ']', v, traditional, add);
             }
           });
       } else if (!traditional && obj != null && typeof obj === 'object') {
         for (x0___ in obj) {
           if (x0___.match(/___$/)) { continue; }
           name = x0___;
           {
             buildParams(prefix + '[' + name + ']', obj[ name ], traditional,
               add);
           }
         }
       } else {
         add(prefix, obj);
       }
     }
     jQuery.extend({
         'active': 0,
         'lastModified': {},
         'etag': {}
       });
     function ajaxHandleResponses(s, jqXHR, responses) {
       var x0___, x1___, x2___;
       var contents = s.contents, dataTypes = s.dataTypes, responseFields =
         s.responseFields, ct, type, finalDataType, firstDataType;
       for (x0___ in responseFields) {
         if (x0___.match(/___$/)) { continue; }
         type = x0___;
         {
           if (type in responses) {
             jqXHR[ responseFields[ type ] ] = responses[ type ];
           }
         }
       }
       while (dataTypes[ 0 ] === '*') {
         dataTypes.shift();
         if (ct === undefined) {
           ct = s.mimeType || jqXHR.getResponseHeader('content-type');
         }
       }
       if (ct) {
         for (x1___ in contents) {
           if (x1___.match(/___$/)) { continue; }
           type = x1___;
           {
             if (contents[ type ] && contents[ type ].test(ct)) {
               dataTypes.unshift(type);
               break;
             }
           }
         }
       }
       if (dataTypes[ 0 ] in responses) {
         finalDataType = dataTypes[ 0 ];
       } else {
         for (x2___ in responses) {
           if (x2___.match(/___$/)) { continue; }
           type = x2___;
           {
             if (!dataTypes[ 0 ] || s.converters[ type + ' ' + dataTypes[ 0 ] ]
             ) {
               finalDataType = type;
               break;
             }
             if (!firstDataType) {
               firstDataType = type;
             }
           }
         }
         finalDataType = finalDataType || firstDataType;
       }
       if (finalDataType) {
         if (finalDataType !== dataTypes[ 0 ]) {
           dataTypes.unshift(finalDataType);
         }
         return responses[ finalDataType ];
       }
     }
     function ajaxConvert(s, response) {
       var x0___, x1___;
       if (s.dataFilter) {
         response = s.dataFilter(response, s.dataType);
       }
       var dataTypes = s.dataTypes, converters = {}, i, key, length =
         dataTypes.length, tmp, current = dataTypes[ 0 ], prev, conversion,
       conv, conv1, conv2;
       for (i = 1; i < length; i++) {
         if (i === 1) {
           for (x0___ in s.converters) {
             if (x0___.match(/___$/)) { continue; }
             key = x0___;
             {
               if (typeof key === 'string') {
                 converters[ key.toLowerCase() ] = s.converters[ key ];
               }
             }
           }
         }
         prev = current;
         current = dataTypes[ i ];
         if (current === '*') { current = prev; } else if (prev !== '*' && prev
             !== current) {
           conversion = prev + ' ' + current;
           conv = converters[ conversion ] || converters[ '* ' + current ];
           if (!conv) {
             conv2 = undefined;
             for (x1___ in converters) {
               if (x1___.match(/___$/)) { continue; }
               conv1 = x1___;
               {
                 tmp = conv1 .split(' ');
                 if (tmp[ 0 ] === prev || tmp[ 0 ] === '*') {
                   conv2 = converters[ tmp[ 1 ] + ' ' + current ];
                   if (conv2) {
                     conv1 = converters[ conv1 ];
                     if (conv1 === true) { conv = conv2; } else if (conv2 ===
                         true) { conv = conv1; }
                     break;
                   }
                 }
               }
             }
           }
           if (! (conv || conv2)) {
             jQuery.error('No conversion from ' + conversion.replace(' ',
                 ' to '));
           }
           if (conv !== true) {
             response = conv? conv(response): conv2(conv1(response));
           }
         }
       }
       return response;
     }
     var jsc = jQuery.now(), jsre = /(\=)\?(&|$)|\?\?/i;
     jQuery.ajaxSetup({
         'jsonp': 'callback',
         'jsonpCallback': function () {
           return jQuery.expando + '_' + jsc++;
         }
       });
     jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
         var inspectData = s.contentType ===
           'application/x-www-form-urlencoded' && typeof s.data === 'string';
         if (s.dataTypes[ 0 ] === 'jsonp' || s.jsonp !== false &&
           (jsre.test(s.url) || inspectData && jsre.test(s.data))) {
           var responseContainer, jsonpCallback = s.jsonpCallback =
             jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback():
           s.jsonpCallback, previous = window[ jsonpCallback ], url = s.url,
           data = s.data, replace = '$1' + jsonpCallback + '$2';
           if (s.jsonp !== false) {
             url = url.replace(jsre, replace);
             if (s.url === url) {
               if (inspectData) {
                 data = data.replace(jsre, replace);
               }
               if (s.data === data) {
                 url += (/\?/.test(url) ? '&': '?') + s.jsonp + '=' +
                   jsonpCallback;
               }
             }
           }
           s.url = url;
           s.data = data;
           window[ jsonpCallback ] = function (response) {
             responseContainer = [ response ];
           };
           jqXHR.always(function () {
               window[ jsonpCallback ] = previous;
               if (responseContainer && jQuery.isFunction(previous)) {
                 window[ jsonpCallback ] (responseContainer[ 0 ]);
               }
             });
           s.converters[ 'script json' ] = function () {
             if (!responseContainer) {
               jQuery.error(jsonpCallback + ' was not called');
             }
             return responseContainer[ 0 ];
           };
           s.dataTypes[ 0 ] = 'json';
           return 'script';
         }
       });
     jQuery.ajaxSetup({
         'accepts': {
           'script':
           'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
         },
         'contents': {
           'script': /javascript|ecmascript/
         },
         'converters': {
           'text script': function (text) {
             jQuery.globalEval(text);
             return text;
           }
         }
       });
     jQuery.ajaxPrefilter('script', function (s) {
         if (s.cache === undefined) {
           s.cache = false;
         }
         if (s.crossDomain) {
           s.type = 'GET';
           s.global = false;
         }
       });
     jQuery.ajaxTransport('script', function (s) {
         if (s.crossDomain) {
           var script, head = document.head ||
             (document.getElementsByTagName('head'))[ 0 ] ||
             document.documentElement;
           return {
             'send': function (_, callback) {
               script = document.createElement('script');
               script.async = 'async';
               if (s.scriptCharset) {
                 script.charset = s.scriptCharset;
               }
               script.src = s.url;
               script.onload = script.onreadystatechange = function (_,
                 isAbort) {
                 if (isAbort || !script.readyState ||
                     /loaded|complete/.test(script.readyState)) {
                   script.onload = script.onreadystatechange = null;
                   if (head && script.parentNode) {
                     head.removeChild(script);
                   }
                   script = undefined;
                   if (!isAbort) {
                     callback(200, 'success');
                   }
                 }
               };
               head.insertBefore(script, head.firstChild);
             },
             'abort': function () {
               if (script) {
                 script.onload(0, 1);
               }
             }
           };
         }
       });
     var xhrOnUnloadAbort = window.ActiveXObject? function () {
       var x0___;
       for (x0___ in xhrCallbacks) {
         if (x0___.match(/___$/)) { continue; }
         key = x0___;
         {
           xhrCallbacks[ key ] (0, 1);
         }
       }
     }: false, xhrId = 0, xhrCallbacks;
     function createStandardXHR() {
       try {
         return new window.XMLHttpRequest();
       } catch (e) {}
     }
     function createActiveXHR() {
       try {
         return new window.ActiveXObject('Microsoft.XMLHTTP');
       } catch (e) {}
     }
     jQuery.ajaxSettings.xhr = window.ActiveXObject? function () {
       var this___ = this && this.___? void 0: this;
       return !this___.isLocal && createStandardXHR() || createActiveXHR();
     }: createStandardXHR;
     (function (xhr) {
        jQuery.extend(jQuery.support, {
            'ajax': ! !xhr,
            'cors': ! !xhr && 'withCredentials' in xhr
          });
      })(jQuery.ajaxSettings.xhr());
     if (jQuery.support.ajax) {
       jQuery.ajaxTransport(function (s) {
           if (!s.crossDomain || jQuery.support.cors) {
             var callback;
             return {
               'send': function (headers, complete) {
                 var x0___, x1___;
                 var xhr = s.xhr(), handle, i;
                 if (s.username) {
                   xhr.open(s.type, s.url, s.async, s.username, s.password);
                 } else {
                   xhr.open(s.type, s.url, s.async);
                 }
                 if (s.xhrFields) {
                   for (x0___ in s.xhrFields) {
                     if (x0___.match(/___$/)) { continue; }
                     i = x0___;
                     {
                       xhr[ i ] = s.xhrFields[ i ];
                     }
                   }
                 }
                 if (s.mimeType && xhr.overrideMimeType) {
                   xhr.overrideMimeType(s.mimeType);
                 }
                 if (!s.crossDomain && !headers[ 'X-Requested-With' ]) {
                   headers[ 'X-Requested-With' ] = 'XMLHttpRequest';
                 }
                 try {
                   for (x1___ in headers) {
                     if (x1___.match(/___$/)) { continue; }
                     i = x1___;
                     {
                       xhr.setRequestHeader(i, headers[ i ]);
                     }
                   }
                 } catch (_) {}
                 xhr.send(s.hasContent && s.data || null);
                 callback = function (_, isAbort) {
                   var status, statusText, responseHeaders, responses, xml;
                   try {
                     if (callback && (isAbort || xhr.readyState === 4)) {
                       callback = undefined;
                       if (handle) {
                         xhr.onreadystatechange = jQuery.noop;
                         if (xhrOnUnloadAbort) {
                           delete xhrCallbacks[ handle ];
                         }
                       }
                       if (isAbort) {
                         if (xhr.readyState !== 4) { xhr.abort(); }
                       } else {
                         status = xhr.status;
                         responseHeaders = xhr.getAllResponseHeaders();
                         responses = {};
                         xml = xhr.responseXML;
                         if (xml && xml.documentElement) {
                           responses.xml = xml;
                         }
                         responses.text = xhr.responseText;
                         try {
                           statusText = xhr.statusText;
                         } catch (e) { statusText = ''; }
                         if (!status && s.isLocal && !s.crossDomain) {
                           status = responses.text? 200: 404;
                         } else if (status === 1223) { status = 204; }
                       }
                     }
                   } catch (firefoxAccessException) {
                     if (!isAbort) {
                       complete(-1, firefoxAccessException);
                     }
                   }
                   if (responses) {
                     complete(status, statusText, responses, responseHeaders);
                   }
                 };
                 if (!s.async || xhr.readyState === 4) { callback(); } else {
                   handle = ++xhrId;
                   if (xhrOnUnloadAbort) {
                     if (!xhrCallbacks) {
                       xhrCallbacks = {};
                       jQuery(window).unload(xhrOnUnloadAbort);
                     }
                     xhrCallbacks[ handle ] = callback;
                   }
                   xhr.onreadystatechange = callback;
                 }
               },
               'abort': function () {
                 if (callback) {
                   callback(0, 1);
                 }
               }
             };
           }
         });
     }
     var elemdisplay = {}, iframe, iframeDoc, rfxtypes =
       /^(?:toggle|show|hide)$/, rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
     timerId, fxAttrs = [ [ 'height', 'marginTop', 'marginBottom',
         'paddingTop', 'paddingBottom' ], [ 'width', 'marginLeft',
         'marginRight', 'paddingLeft', 'paddingRight' ], [ 'opacity' ] ],
     fxNow, requestAnimationFrame = window.webkitRequestAnimationFrame ||
       window.mozRequestAnimationFrame || window.oRequestAnimationFrame;
     jQuery.fn.extend({
         'show': function (speed, easing, callback) {
           var this___ = this && this.___? void 0: this;
           var elem, display;
           if (speed || speed === 0) {
             return this___.animate(genFx('show', 3), speed, easing, callback);
           } else {
             for (var i = 0, j = this___.length; i < j; i++) {
               elem = this___[ i ];
               if (elem.style) {
                 display = elem.style.display;
                 if (!jQuery._data(elem, 'olddisplay') && display === 'none') {
                   display = elem.style.display = '';
                 }
                 if (display === '' && jQuery.css(elem, 'display') === 'none')
                   {
                   jQuery._data(elem, 'olddisplay',
                     defaultDisplay(elem.nodeName));
                 }
               }
             }
             for (i = 0; i < j; i++) {
               elem = this___[ i ];
               if (elem.style) {
                 display = elem.style.display;
                 if (display === '' || display === 'none') {
                   elem.style.display = jQuery._data(elem, 'olddisplay') || '';
                 }
               }
             }
             return this___;
           }
         },
         'hide': function (speed, easing, callback) {
           var this___ = this && this.___? void 0: this;
           if (speed || speed === 0) {
             return this___.animate(genFx('hide', 3), speed, easing, callback);
           } else {
             for (var i = 0, j = this___.length; i < j; i++) {
               if (this___[ i ].style) {
                 var display = jQuery.css(this___[ i ], 'display');
                 if (display !== 'none' && !jQuery._data(this___[ i ],
                     'olddisplay')) {
                   jQuery._data(this___[ i ], 'olddisplay', display);
                 }
               }
             }
             for (i = 0; i < j; i++) {
               if (this___[ i ].style) {
                 this___[ i ].style.display = 'none';
               }
             }
             return this___;
           }
         },
         '_toggle': jQuery.fn.toggle,
         'toggle': function (fn, fn2, callback) {
           var this___ = this && this.___? void 0: this;
           var bool = typeof fn === 'boolean';
           if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
             this___._toggle.apply(this___, arguments);
           } else if (fn == null || bool) {
             this___.each(function () {
                 var this___ = this && this.___? void 0: this;
                 var state = bool? fn: jQuery(this___).is(':hidden');
                 (jQuery(this___))[ state? 'show': 'hide' ] ();
               });
           } else {
             this___.animate(genFx('toggle', 3), fn, fn2, callback);
           }
           return this___;
         },
         'fadeTo': function (speed, to, easing, callback) {
           var this___ = this && this.___? void 0: this;
           return this___.filter(':hidden').css('opacity', 0).show().end()
             .animate({ 'opacity': to }, speed, easing, callback);
         },
         'animate': function (prop, speed, easing, callback) {
           var this___ = this && this.___? void 0: this;
           var optall = jQuery.speed(speed, easing, callback);
           if (jQuery.isEmptyObject(prop)) {
             return this___.each(optall.complete, [ false ]);
           }
           prop = jQuery.extend({}, prop);
           return this___[ optall.queue === false ? 'each': 'queue' ] (function
               () {
               var x0___, x1___;
               var this___ = this && this.___? void 0: this;
               if (optall.queue === false) {
                 jQuery._mark(this___);
               }
               var opt = jQuery.extend({}, optall), isElement =
                 this___.nodeType === 1, hidden = isElement && jQuery(this___)
                 .is(':hidden'), name, val, p, display, e, parts, start, end,
               unit;
               opt.animatedProperties = {};
               for (x0___ in prop) {
                 if (x0___.match(/___$/)) { continue; }
                 p = x0___;
                 {
                   name = jQuery.camelCase(p);
                   if (p !== name) {
                     prop[ name ] = prop[ p ];
                     delete prop[ p ];
                   }
                   val = prop[ name ];
                   if (jQuery.isArray(val)) {
                     opt.animatedProperties[ name ] = val[ 1 ];
                     val = prop[ name ] = val[ 0 ];
                   } else {
                     opt.animatedProperties[ name ] = opt.specialEasing &&
                       opt.specialEasing[ name ] || opt.easing || 'swing';
                   }
                   if (val === 'hide' && hidden || val === 'show' && !hidden) {
                     return opt.complete.call(this___);
                   }
                   if (isElement && (name === 'height' || name === 'width')) {
                     opt.overflow = [ this___.style.overflow,
                       this___.style.overflowX, this___.style.overflowY ];
                     if (jQuery.css(this___, 'display') === 'inline' &&
                         jQuery.css(this___, 'float') === 'none') {
                       if (!jQuery.support.inlineBlockNeedsLayout) {
                         this___.style.display = 'inline-block';
                       } else {
                         display = defaultDisplay(this___.nodeName);
                         if (display === 'inline') {
                           this___.style.display = 'inline-block';
                         } else {
                           this___.style.display = 'inline';
                           this___.style.zoom = 1;
                         }
                       }
                     }
                   }
                 }
               }
               if (opt.overflow != null) {
                 this___.style.overflow = 'hidden';
               }
               for (x1___ in prop) {
                 if (x1___.match(/___$/)) { continue; }
                 p = x1___;
                 {
                   e = new jQuery.fx(this___, opt, p);
                   val = prop[ p ];
                   if (rfxtypes.test(val)) {
                     e[ val === 'toggle'? hidden? 'show': 'hide': val ] ();
                   } else {
                     parts = rfxnum.exec(val);
                     start = e.cur();
                     if (parts) {
                       end = parseFloat(parts[ 2 ]);
                       unit = parts[ 3 ] || (jQuery.cssNumber[ p ] ? '': 'px');
                       if (unit !== 'px') {
                         jQuery.style(this___, p, (end || 1) + unit);
                         start = (end || 1) / e.cur() * start;
                         jQuery.style(this___, p, start + unit);
                       }
                       if (parts[ 1 ]) {
                         end = (parts[ 1 ] === '-='? -1: 1) * end + start;
                       }
                       e.custom(start, end, unit);
                     } else {
                       e.custom(start, val, '');
                     }
                   }
                 }
               }
               return true;
             });
         },
         'stop': function (clearQueue, gotoEnd) {
           var this___ = this && this.___? void 0: this;
           if (clearQueue) {
             this___.queue([ ]);
           }
           this___.each(function () {
               var this___ = this && this.___? void 0: this;
               var timers = jQuery.timers, i = timers.length;
               if (!gotoEnd) {
                 jQuery._unmark(true, this___);
               }
               while (i--) {
                 if (timers[ i ].elem === this___) {
                   if (gotoEnd) {
                     timers[ i ] (true);
                   }
                   timers.splice(i, 1);
                 }
               }
             });
           if (!gotoEnd) { this___.dequeue(); }
           return this___;
         }
       });
     function createFxNow() {
       setTimeout(clearFxNow, 0);
       return fxNow = jQuery.now();
     }
     function clearFxNow() { fxNow = undefined; }
     function genFx(type, num) {
       var obj = {};
       jQuery.each(fxAttrs.concat.apply([ ], fxAttrs.slice(0, num)), function
           () {
           var this___ = this && this.___? void 0: this;
           obj[ this___ ] = type;
         });
       return obj;
     }
     jQuery.each({
         'slideDown': genFx('show', 1),
         'slideUp': genFx('hide', 1),
         'slideToggle': genFx('toggle', 1),
         'fadeIn': { 'opacity': 'show' },
         'fadeOut': { 'opacity': 'hide' },
         'fadeToggle': {
           'opacity': 'toggle'
         }
       }, function (name, props) {
         jQuery.fn[ name ] = function (speed, easing, callback) {
           var this___ = this && this.___? void 0: this;
           return this___.animate(props, speed, easing, callback);
         };
       });
     jQuery.extend({
         'speed': function (speed, easing, fn) {
           var opt = speed && typeof speed === 'object'? jQuery.extend({},
             speed): {
             'complete': fn || !fn && easing || jQuery.isFunction(speed) &&
               speed,
             'duration': speed,
             'easing': fn && easing || easing && !jQuery.isFunction(easing) &&
               easing
           };
           opt.duration = jQuery.fx.off? 0: typeof opt.duration === 'number'?
             opt.duration: opt.duration in jQuery.fx.speeds? jQuery.fx.speeds[
             opt.duration ]: jQuery.fx.speeds._default;
           opt.old = opt.complete;
           opt.complete = function (noUnmark) {
             var this___ = this && this.___? void 0: this;
             if (jQuery.isFunction(opt.old)) {
               opt.old.call(this___);
             }
             if (opt.queue !== false) {
               jQuery.dequeue(this___);
             } else if (noUnmark !== false) {
               jQuery._unmark(this___);
             }
           };
           return opt;
         },
         'easing': {
           'linear': function (p, n, firstNum, diff) {
             return firstNum + diff * p;
           },
           'swing': function (p, n, firstNum, diff) {
             return ((-Math.cos(p * Math.PI)) / 2 + 0.5) * diff + firstNum;
           }
         },
         'timers': [ ],
         'fx': function (elem, options, prop) {
           var this___ = this && this.___? void 0: this;
           this___.options = options;
           this___.elem = elem;
           this___.prop = prop;
           options.orig = options.orig || {};
         }
       });
     jQuery.fx.prototype = {
       'update': function () {
         var this___ = this && this.___? void 0: this;
         if (this___.options.step) {
           this___.options.step.call(this___.elem, this___.now, this___);
         }
         (jQuery.fx.step[ this___.prop ] || jQuery.fx.step._default)(this___);
       },
       'cur': function () {
         var this___ = this && this.___? void 0: this;
         if (this___.elem[ this___.prop ] != null && (!this___.elem.style ||
               this___.elem.style[ this___.prop ] == null)) {
           return this___.elem[ this___.prop ];
         }
         var parsed, r = jQuery.css(this___.elem, this___.prop);
         return isNaN(parsed = parseFloat(r)) ? !r || r === 'auto'? 0: r:
         parsed;
       },
       'custom': function (from, to, unit) {
         var this___ = this && this.___? void 0: this;
         var self = this___, fx = jQuery.fx, raf;
         this___.startTime = fxNow || createFxNow();
         this___.start = from;
         this___.end = to;
         this___.unit = unit || this___.unit || (jQuery.cssNumber[ this___.prop
           ] ? '': 'px');
         this___.now = this___.start;
         this___.pos = this___.state = 0;
         function t(gotoEnd) {
           return self.step(gotoEnd);
         }
         t.elem = this___.elem;
         if (t() && jQuery.timers.push(t) && !timerId) {
           if (requestAnimationFrame) {
             timerId = true;
             raf = function () {
               if (timerId) {
                 requestAnimationFrame(raf);
                 fx.tick();
               }
             };
             requestAnimationFrame(raf);
           } else {
             timerId = setInterval(fx.tick, fx.interval);
           }
         }
       },
       'show': function () {
         var this___ = this && this.___? void 0: this;
         this___.options.orig[ this___.prop ] = jQuery.style(this___.elem,
           this___.prop);
         this___.options.show = true;
         this___.custom(this___.prop === 'width' || this___.prop === 'height'?
             1: 0, this___.cur());
         jQuery(this___.elem).show();
       },
       'hide': function () {
         var this___ = this && this.___? void 0: this;
         this___.options.orig[ this___.prop ] = jQuery.style(this___.elem,
           this___.prop);
         this___.options.hide = true;
         this___.custom(this___.cur(), 0);
       },
       'step': function (gotoEnd) {
         var x0___, x1___;
         var this___ = this && this.___? void 0: this;
         var t = fxNow || createFxNow(), done = true, elem = this___.elem,
         options = this___.options, i, n;
         if (gotoEnd || t >= options.duration + this___.startTime) {
           this___.now = this___.end;
           this___.pos = this___.state = 1;
           this___.update();
           options.animatedProperties[ this___.prop ] = true;
           for (x0___ in options.animatedProperties) {
             if (x0___.match(/___$/)) { continue; }
             i = x0___;
             {
               if (options.animatedProperties[ i ] !== true) { done = false; }
             }
           }
           if (done) {
             if (options.overflow != null && !jQuery.support.shrinkWrapBlocks)
               {
               jQuery.each([ '', 'X', 'Y' ], function (index, value) {
                   elem.style[ 'overflow' + value ] = options.overflow[ index ]
                     ;
                 });
             }
             if (options.hide) {
               jQuery(elem).hide();
             }
             if (options.hide || options.show) {
               for (x1___ in options.animatedProperties) {
                 if (x1___.match(/___$/)) { continue; }
                 p = x1___;
                 {
                   jQuery.style(elem, p, options.orig[ p ]);
                 }
               }
             }
             options.complete.call(elem);
           }
           return false;
         } else {
           if (options.duration == Infinity) {
             this___.now = t;
           } else {
             n = t - this___.startTime;
             this___.state = n / options.duration;
             this___.pos = jQuery.easing[ options.animatedProperties[
                 this___.prop ] ] (this___.state, n, 0, 1, options.duration);
             this___.now = this___.start + (this___.end - this___.start) *
               this___.pos;
           }
           this___.update();
         }
         return true;
       }
     };
     jQuery.extend(jQuery.fx, {
         'tick': function () {
           for (var timers = jQuery.timers, i = 0; i < timers.length; ++i) {
             if (!timers[ i ] ()) {
               timers.splice(i--, 1);
             }
           }
           if (!timers.length) {
             jQuery.fx.stop();
           }
         },
         'interval': 13,
         'stop': function () {
           clearInterval(timerId);
           timerId = null;
         },
         'speeds': {
           'slow': 600,
           'fast': 200,
           '_default': 400
         },
         'step': {
           'opacity': function (fx) {
             jQuery.style(fx.elem, 'opacity', fx.now);
           },
           '_default': function (fx) {
             if (fx.elem.style && fx.elem.style[ fx.prop ] != null) {
               fx.elem.style[ fx.prop ] = (fx.prop === 'width' || fx.prop ===
                   'height'? Math.max(0, fx.now): fx.now) + fx.unit;
             } else {
               fx.elem[ fx.prop ] = fx.now;
             }
           }
         }
       });
     if (jQuery.expr && jQuery.expr.filters) {
       jQuery.expr.filters.animated = function (elem) {
         return jQuery.grep(jQuery.timers, function (fn) {
             return elem === fn.elem;
           }).length;
       };
     }
     function defaultDisplay(nodeName) {
       if (!elemdisplay[ nodeName ]) {
         var body = document.body, elem = jQuery('<' + nodeName + '>')
           .appendTo(body), display = elem.css('display');
         elem.remove();
         if (display === 'none' || display === '') {
           if (!iframe) {
             iframe = document.createElement('iframe');
             iframe.frameBorder = iframe.width = iframe.height = 0;
           }
           body.appendChild(iframe);
           if (!iframeDoc || !iframe.createElement) {
             iframeDoc = (iframe.contentWindow || iframe.contentDocument)
               .document;
             iframeDoc.write((document.compatMode === 'CSS1Compat'?
                   '<!doctype html>': '') + '<html><body>');
             iframeDoc.close();
           }
           elem = iframeDoc.createElement(nodeName);
           iframeDoc.body.appendChild(elem);
           display = jQuery.css(elem, 'display');
           body.removeChild(iframe);
         }
         elemdisplay[ nodeName ] = display;
       }
       return elemdisplay[ nodeName ];
     }
     var rtable = /^t(?:able|d|h)$/i, rroot = /^(?:body|html)$/i;
     if ('getBoundingClientRect' in document.documentElement) {
       jQuery.fn.offset = function (options) {
         var this___ = this && this.___? void 0: this;
         var elem = this___[ 0 ], box;
         if (options) {
           return this___.each(function (i) {
               var this___ = this && this.___? void 0: this;
               jQuery.offset.setOffset(this___, options, i);
             });
         }
         if (!elem || !elem.ownerDocument) { return null; }
         if (elem === elem.ownerDocument.body) {
           return jQuery.offset.bodyOffset(elem);
         }
         try {
           box = elem.getBoundingClientRect();
         } catch (e) {}
         var doc = elem.ownerDocument, docElem = doc.documentElement;
         if (!box || !jQuery.contains(docElem, elem)) {
           return box? {
             'top': box.top,
             'left': box.left
           }: {
             'top': 0,
             'left': 0
           };
         }
         var body = doc.body, win = getWindow(doc), clientTop =
           docElem.clientTop || body.clientTop || 0, clientLeft =
           docElem.clientLeft || body.clientLeft || 0, scrollTop =
           win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop ||
           body.scrollTop, scrollLeft = win.pageXOffset ||
           jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
         top = box.top + scrollTop - clientTop, left = box.left + scrollLeft -
           clientLeft;
         return {
           'top': top,
           'left': left
         };
       };
     } else {
       jQuery.fn.offset = function (options) {
         var this___ = this && this.___? void 0: this;
         var elem = this___[ 0 ];
         if (options) {
           return this___.each(function (i) {
               var this___ = this && this.___? void 0: this;
               jQuery.offset.setOffset(this___, options, i);
             });
         }
         if (!elem || !elem.ownerDocument) { return null; }
         if (elem === elem.ownerDocument.body) {
           return jQuery.offset.bodyOffset(elem);
         }
         jQuery.offset.initialize();
         var computedStyle, offsetParent = elem.offsetParent, prevOffsetParent
           = elem, doc = elem.ownerDocument, docElem = doc.documentElement,
         body = doc.body, defaultView = doc.defaultView, prevComputedStyle =
           defaultView? defaultView.getComputedStyle(elem, null):
         elem.currentStyle, top = elem.offsetTop, left = elem.offsetLeft;
         while ((elem = elem.parentNode) && elem !== body && elem !== docElem)
           {
           if (jQuery.offset.supportsFixedPosition &&
               prevComputedStyle.position === 'fixed') { break; }
           computedStyle = defaultView? defaultView.getComputedStyle(elem,
             null): elem.currentStyle;
           top -= elem.scrollTop;
           left -= elem.scrollLeft;
           if (elem === offsetParent) {
             top += elem.offsetTop;
             left += elem.offsetLeft;
             if (jQuery.offset.doesNotAddBorder && !
               (jQuery.offset.doesAddBorderForTableAndCells &&
                  rtable.test(elem.nodeName))) {
               top += parseFloat(computedStyle.borderTopWidth) || 0;
               left += parseFloat(computedStyle.borderLeftWidth) || 0;
             }
             prevOffsetParent = offsetParent;
             offsetParent = elem.offsetParent;
           }
           if (jQuery.offset.subtractsBorderForOverflowNotVisible &&
               computedStyle.overflow !== 'visible') {
             top += parseFloat(computedStyle.borderTopWidth) || 0;
             left += parseFloat(computedStyle.borderLeftWidth) || 0;
           }
           prevComputedStyle = computedStyle;
         }
         if (prevComputedStyle.position === 'relative' ||
           prevComputedStyle.position === 'static') {
           top += body.offsetTop;
           left += body.offsetLeft;
         }
         if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position
           === 'fixed') {
           top += Math.max(docElem.scrollTop, body.scrollTop);
           left += Math.max(docElem.scrollLeft, body.scrollLeft);
         }
         return {
           'top': top,
           'left': left
         };
       };
     }
     jQuery.offset = {
       'initialize': function () {
         var this___ = this && this.___? void 0: this;
         var body = document.body, container = document.createElement('div'),
         innerDiv, checkDiv, table, td, bodyMarginTop =
           parseFloat(jQuery.css(body, 'marginTop')) || 0, html =
           '<div style=\'position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;\'><div></div></div><table style=\'position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;\' cellpadding=\'0\' cellspacing=\'0\'><tr><td></td></tr></table>';
         jQuery.extend(container.style, {
             'position': 'absolute',
             'top': 0,
             'left': 0,
             'margin': 0,
             'border': 0,
             'width': '1px',
             'height': '1px',
             'visibility': 'hidden'
           });
         container.innerHTML = html;
         body.insertBefore(container, body.firstChild);
         innerDiv = container.firstChild;
         checkDiv = innerDiv.firstChild;
         td = innerDiv.nextSibling.firstChild.firstChild;
         this___.doesNotAddBorder = checkDiv.offsetTop !== 5;
         this___.doesAddBorderForTableAndCells = td.offsetTop === 5;
         checkDiv.style.position = 'fixed';
         checkDiv.style.top = '20px';
         this___.supportsFixedPosition = checkDiv.offsetTop === 20 ||
           checkDiv.offsetTop === 15;
         checkDiv.style.position = checkDiv.style.top = '';
         innerDiv.style.overflow = 'hidden';
         innerDiv.style.position = 'relative';
         this___.subtractsBorderForOverflowNotVisible = checkDiv.offsetTop ===
           -5;
         this___.doesNotIncludeMarginInBodyOffset = body.offsetTop !==
           bodyMarginTop;
         body.removeChild(container);
         jQuery.offset.initialize = jQuery.noop;
       },
       'bodyOffset': function (body) {
         var top = body.offsetTop, left = body.offsetLeft;
         jQuery.offset.initialize();
         if (jQuery.offset.doesNotIncludeMarginInBodyOffset) {
           top += parseFloat(jQuery.css(body, 'marginTop')) || 0;
           left += parseFloat(jQuery.css(body, 'marginLeft')) || 0;
         }
         return {
           'top': top,
           'left': left
         };
       },
       'setOffset': function (elem, options, i) {
         var position = jQuery.css(elem, 'position');
         if (position === 'static') {
           elem.style.position = 'relative';
         }
         var curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop =
           jQuery.css(elem, 'top'), curCSSLeft = jQuery.css(elem, 'left'),
         calculatePosition = (position === 'absolute' || position === 'fixed')
           && jQuery.inArray('auto', [ curCSSTop, curCSSLeft ]) > -1, props =
           {}, curPosition = {}, curTop, curLeft;
         if (calculatePosition) {
           curPosition = curElem.position();
           curTop = curPosition.top;
           curLeft = curPosition.left;
         } else {
           curTop = parseFloat(curCSSTop) || 0;
           curLeft = parseFloat(curCSSLeft) || 0;
         }
         if (jQuery.isFunction(options)) {
           options = options.call(elem, i, curOffset);
         }
         if (options.top != null) {
           props.top = options.top - curOffset.top + curTop;
         }
         if (options.left != null) {
           props.left = options.left - curOffset.left + curLeft;
         }
         if ('using' in options) {
           options.using.call(elem, props);
         } else {
           curElem.css(props);
         }
       }
     };
     jQuery.fn.extend({
         'position': function () {
           var this___ = this && this.___? void 0: this;
           if (!this___[ 0 ]) { return null; }
           var elem = this___[ 0 ], offsetParent = this___.offsetParent(),
           offset = this___.offset(), parentOffset = rroot.test(offsetParent[ 0
             ].nodeName) ? {
             'top': 0,
             'left': 0
           }: offsetParent.offset();
           offset.top -= parseFloat(jQuery.css(elem, 'marginTop')) || 0;
           offset.left -= parseFloat(jQuery.css(elem, 'marginLeft')) || 0;
           parentOffset.top += parseFloat(jQuery.css(offsetParent[ 0 ],
               'borderTopWidth')) || 0;
           parentOffset.left += parseFloat(jQuery.css(offsetParent[ 0 ],
               'borderLeftWidth')) || 0;
           return {
             'top': offset.top - parentOffset.top,
             'left': offset.left - parentOffset.left
           };
         },
         'offsetParent': function () {
           var this___ = this && this.___? void 0: this;
           return this___.map(function () {
               var this___ = this && this.___? void 0: this;
               var offsetParent = this___.offsetParent || document.body;
               while (offsetParent && (!rroot.test(offsetParent.nodeName) &&
                     jQuery.css(offsetParent, 'position') === 'static')) {
                 offsetParent = offsetParent.offsetParent;
               }
               return offsetParent;
             });
         }
       });
     jQuery.each([ 'Left', 'Top' ], function (i, name) {
         var method = 'scroll' + name;
         jQuery.fn[ method ] = function (val) {
           var this___ = this && this.___? void 0: this;
           var elem, win;
           if (val === undefined) {
             elem = this___[ 0 ];
             if (!elem) { return null; }
             win = getWindow(elem);
             return win? 'pageXOffset' in win? win[ i? 'pageYOffset':
               'pageXOffset' ]: jQuery.support.boxModel &&
               win.document.documentElement[ method ] || win.document.body[
               method ]: elem[ method ];
           }
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               win = getWindow(this___);
               if (win) {
                 win.scrollTo(!i? val: jQuery(win).scrollLeft(), i? val:
                   jQuery(win).scrollTop());
               } else {
                 this___[ method ] = val;
               }
             });
         };
       });
     function getWindow(elem) {
       return jQuery.isWindow(elem) ? elem: elem.nodeType === 9?
         elem.defaultView || elem.parentWindow: false;
     }
     jQuery.each([ 'Height', 'Width' ], function (i, name) {
         var type = name.toLowerCase();
         jQuery.fn[ 'inner' + name ] = function () {
           var this___ = this && this.___? void 0: this;
           var elem = this___[ 0 ];
           return elem && elem.style? parseFloat(jQuery.css(elem, type,
               'padding')): null;
         };
         jQuery.fn[ 'outer' + name ] = function (margin) {
           var this___ = this && this.___? void 0: this;
           var elem = this___[ 0 ];
           return elem && elem.style? parseFloat(jQuery.css(elem, type, margin?
                 'margin': 'border')): null;
         };
         jQuery.fn[ type ] = function (size) {
           var this___ = this && this.___? void 0: this;
           var elem = this___[ 0 ];
           if (!elem) {
             return size == null ? null: this___;
           }
           if (jQuery.isFunction(size)) {
             return this___.each(function (i) {
                 var this___ = this && this.___? void 0: this;
                 var self = jQuery(this___);
                 self[ type ] (size.call(this___, i, self[ type ] ()));
               });
           }
           if (jQuery.isWindow(elem)) {
             var docElemProp = elem.document.documentElement[ 'client' + name ]
               ;
             return elem.document.compatMode === 'CSS1Compat' && docElemProp ||
               elem.document.body[ 'client' + name ] || docElemProp;
           } else if (elem.nodeType === 9) {
             return Math.max(elem.documentElement[ 'client' + name ],
               elem.body[ 'scroll' + name ], elem.documentElement[ 'scroll' +
                   name ], elem.body[ 'offset' + name ], elem.documentElement[
                 'offset' + name ]);
           } else if (size === undefined) {
             var orig = jQuery.css(elem, type), ret = parseFloat(orig);
             return jQuery.isNaN(ret) ? orig: ret;
           } else {
             return this___.css(type, typeof size === 'string'? size: size + 'px');
}
};
});
window.jQuery = window.$ = jQuery;
})(window);
}