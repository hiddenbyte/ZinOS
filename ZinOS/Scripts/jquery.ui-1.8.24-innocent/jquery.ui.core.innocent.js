{
  (function ($, undefined) {
     $.ui = $.ui || {};
     if ($.ui.version) { return; }
     $.extend($.ui, {
         'version': '1.8.14',
         'keyCode': {
           'ALT': 18,
           'BACKSPACE': 8,
           'CAPS_LOCK': 20,
           'COMMA': 188,
           'COMMAND': 91,
           'COMMAND_LEFT': 91,
           'COMMAND_RIGHT': 93,
           'CONTROL': 17,
           'DELETE': 46,
           'DOWN': 40,
           'END': 35,
           'ENTER': 13,
           'ESCAPE': 27,
           'HOME': 36,
           'INSERT': 45,
           'LEFT': 37,
           'MENU': 93,
           'NUMPAD_ADD': 107,
           'NUMPAD_DECIMAL': 110,
           'NUMPAD_DIVIDE': 111,
           'NUMPAD_ENTER': 108,
           'NUMPAD_MULTIPLY': 106,
           'NUMPAD_SUBTRACT': 109,
           'PAGE_DOWN': 34,
           'PAGE_UP': 33,
           'PERIOD': 190,
           'RIGHT': 39,
           'SHIFT': 16,
           'SPACE': 32,
           'TAB': 9,
           'UP': 38,
           'WINDOWS': 91
         }
       });
     $.fn.extend({
         '_focus': $.fn.focus,
         'focus': function (delay, fn) {
           var this___ = this && this.___? void 0: this;
           return typeof delay === 'number'? this___.each(function () {
               var this___ = this && this.___? void 0: this;
               var elem = this___;
               setTimeout(function () {
                   $(elem).focus();
                   if (fn) {
                     fn.call(elem);
                   }
                 }, delay);
             }): this___._focus.apply(this___, arguments);
         },
         'scrollParent': function () {
           var this___ = this && this.___? void 0: this;
           var scrollParent;
           if ($.browser.msie &&
             /(static|relative)/.test(this___.css('position')) ||
             /absolute/.test(this___.css('position'))) {
             scrollParent = this___.parents().filter(function () {
                 var this___ = this && this.___? void 0: this;
                 return /(relative|absolute|fixed)/.test($.curCSS(this___,
                     'position', 1)) && /(auto|scroll)/.test($.curCSS(this___,
                     'overflow', 1) + $.curCSS(this___, 'overflow-y', 1) +
                   $.curCSS(this___, 'overflow-x', 1));
               }).eq(0);
           } else {
             scrollParent = this___.parents().filter(function () {
                 var this___ = this && this.___? void 0: this;
                 return /(auto|scroll)/.test($.curCSS(this___, 'overflow', 1) +
                   $.curCSS(this___, 'overflow-y', 1) + $.curCSS(this___,
                     'overflow-x', 1));
               }).eq(0);
           }
           return /fixed/.test(this___.css('position')) ||
             !scrollParent.length? $(document): scrollParent;
         },
         'zIndex': function (zIndex) {
           var this___ = this && this.___? void 0: this;
           if (zIndex !== undefined) {
             return this___.css('zIndex', zIndex);
           }
           if (this___.length) {
             var elem = $(this___[ 0 ]), position, value;
             while (elem.length && elem[ 0 ] !== document) {
               position = elem.css('position');
               if (position === 'absolute' || position === 'relative' ||
                 position === 'fixed') {
                 value = parseInt(elem.css('zIndex'), 10);
                 if (!isNaN(value) && value !== 0) { return value; }
               }
               elem = elem.parent();
             }
           }
           return 0;
         },
         'disableSelection': function () {
           var this___ = this && this.___? void 0: this;
           return this___.bind(($.support.selectstart? 'selectstart':
               'mousedown') + '.ui-disableSelection', function (event) {
               event.preventDefault();
             });
         },
         'enableSelection': function () {
           var this___ = this && this.___? void 0: this;
           return this___.unbind('.ui-disableSelection');
         }
       });
     $.each([ 'Width', 'Height' ], function (i, name) {
         var side = name === 'Width'? [ 'Left', 'Right' ]: [ 'Top', 'Bottom' ],
         type = name.toLowerCase(), orig = {
           'innerWidth': $.fn.innerWidth,
           'innerHeight': $.fn.innerHeight,
           'outerWidth': $.fn.outerWidth,
           'outerHeight': $.fn.outerHeight
         };
         function reduce(elem, size, border, margin) {
           $.each(side, function () {
               var this___ = this && this.___? void 0: this;
               size -= parseFloat($.curCSS(elem, 'padding' + this___, true)) ||
                 0;
               if (border) {
                 size -= parseFloat($.curCSS(elem, 'border' + this___ +
                     'Width', true)) || 0;
               }
               if (margin) {
                 size -= parseFloat($.curCSS(elem, 'margin' + this___, true))
                   || 0;
               }
             });
           return size;
         }
         $.fn[ 'inner' + name ] = function (size) {
           var this___ = this && this.___? void 0: this;
           if (size === undefined) {
             return orig[ 'inner' + name ].call(this___);
           }
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               $(this___).css(type, reduce(this___, size) + 'px');
             });
         };
         $.fn[ 'outer' + name ] = function (size, margin) {
           var this___ = this && this.___? void 0: this;
           if (typeof size !== 'number') {
             return orig[ 'outer' + name ].call(this___, size);
           }
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               $(this___).css(type, reduce(this___, size, true, margin) + 'px')
                 ;
             });
         };
       });
     function focusable(element, isTabIndexNotNaN) {
       var nodeName = element.nodeName.toLowerCase();
       if ('area' === nodeName) {
         var map = element.parentNode, mapName = map.name, img;
         if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map')
           { return false; }
         img = ($('img[usemap=#' + mapName + ']'))[ 0 ];
         return ! !img && visible(img);
       }
       return (/input|select|textarea|button|object/.test(nodeName) ?
         !element.disabled: 'a' == nodeName? element.href || isTabIndexNotNaN:
         isTabIndexNotNaN) && visible(element);
     }
     function visible(element) {
       return !$(element).parents().andSelf().filter(function () {
           var this___ = this && this.___? void 0: this;
           return $.curCSS(this___, 'visibility') === 'hidden' ||
             $.expr.filters.hidden(this___);
         }).length;
     }
     $.extend($.expr[ ':' ], {
         'data': function (elem, i, match) {
           return ! !$.data(elem, match[ 3 ]);
         },
         'focusable': function (element) {
           return focusable(element, !isNaN($.attr(element, 'tabindex')));
         },
         'tabbable': function (element) {
           var tabIndex = $.attr(element, 'tabindex'), isTabIndexNaN =
             isNaN(tabIndex);
           return (isTabIndexNaN || tabIndex >= 0) && focusable(element,
             !isTabIndexNaN);
         }
       });
     $(function () {
         var body = document.body, div = body.appendChild(div =
           document.createElement('div'));
         $.extend(div.style, {
             'minHeight': '100px',
             'height': 'auto',
             'padding': 0,
             'borderWidth': 0
           });
         $.support.minHeight = div.offsetHeight === 100;
         $.support.selectstart = 'onselectstart' in div;
         body.removeChild(div).style.display = 'none';
       });
     $.extend($.ui, {
         'plugin': {
           'add': function (module, option, set) {
             var x0___;
             var proto = $.ui[ module ].prototype;
             for (x0___ in set) {
               if (x0___.match(/___$/)) { continue; }
               i = x0___;
               {
                 proto.plugins[ i ] = proto.plugins[ i ] || [ ];
                 proto.plugins[ i ].push([ option, set[ i ] ]);
               }
             }
           },
           'call': function (instance, name, args) {
             var set = instance.plugins[ name ];
             if (!set || !instance.element[ 0 ].parentNode) { return; }
             for (var i = 0; i < set.length; i++) {
               if (instance.options[ set[ i ] [ 0 ] ]) {
                 set[ i ] [ 1 ].apply(instance.element, args);
               }
             }
           }
         },
         'contains': function (a, b) {
           return document.compareDocumentPosition?
             a.compareDocumentPosition(b) & 16: a !== b && a.contains(b);
         },
         'hasScroll': function (el, a) {
           if ($(el).css('overflow') === 'hidden') { return false; }
           var scroll = a && a === 'left'? 'scrollLeft': 'scrollTop', has =
             false;
           if (el[ scroll ] > 0) { return true; }
           el[ scroll ] = 1;
           has = el[ scroll ] > 0;
           el[ scroll ] = 0;
           return has;
         },
         'isOverAxis': function (x, reference, size) {
           return x > reference && x < reference + size;
         },
         'isOver': function (y, x, top, left, height, width) {
           return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left,
             width);
         }
       });
   })(jQuery);
}