{
  (function ($, undefined) {
     $.widget('ui.resizable', $.ui.mouse, {
         'widgetEventPrefix': 'resize',
         'options': {
           'alsoResize': false,
           'animate': false,
           'animateDuration': 'slow',
           'animateEasing': 'swing',
           'aspectRatio': false,
           'autoHide': false,
           'containment': false,
           'ghost': false,
           'grid': false,
           'handles': 'e,s,se',
           'helper': false,
           'maxHeight': null,
           'maxWidth': null,
           'minHeight': 10,
           'minWidth': 10,
           'zIndex': 1000
         },
         '_create': function () {
           var this___ = this && this.___? void 0: this;
           var self = this___, o = this___.options;
           this___.element.addClass('ui-resizable');
           $.extend(this___, {
               '_aspectRatio': ! !o.aspectRatio,
               'aspectRatio': o.aspectRatio,
               'originalElement': this___.element,
               '_proportionallyResizeElements': [ ],
               '_helper': o.helper || o.ghost || o.animate? o.helper ||
                 'ui-resizable-helper': null
             });
           if (this___.element[ 0 ]
             .nodeName.match(/canvas|textarea|input|select|button|img/i)) {
             if (/relative/.test(this___.element.css('position')) &&
               $.browser.opera) this___.element.css({
                 'position': 'relative',
                 'top': 'auto',
                 'left': 'auto'
               });
             this___.element.wrap($('<div class=\"ui-wrapper\" style=\"overflow: hidden;\"></div>')
               .css({
                   'position': this___.element.css('position'),
                   'width': this___.element.outerWidth(),
                   'height': this___.element.outerHeight(),
                   'top': this___.element.css('top'),
                   'left': this___.element.css('left')
                 }));
             this___.element = this___.element.parent().data('resizable',
               this___.element.data('resizable'));
             this___.elementIsWrapper = true;
             this___.element.css({
                 'marginLeft': this___.originalElement.css('marginLeft'),
                 'marginTop': this___.originalElement.css('marginTop'),
                 'marginRight': this___.originalElement.css('marginRight'),
                 'marginBottom': this___.originalElement.css('marginBottom')
               });
             this___.originalElement.css({
                 'marginLeft': 0,
                 'marginTop': 0,
                 'marginRight': 0,
                 'marginBottom': 0
               });
             this___.originalResizeStyle =
               this___.originalElement.css('resize');
             this___.originalElement.css('resize', 'none');
             this___._proportionallyResizeElements.push(this___.originalElement.css({
                   'position': 'static',
                   'zoom': 1,
                   'display': 'block'
                 }));
             this___.originalElement.css({
                 'margin': this___.originalElement.css('margin')
               });
             this___._proportionallyResize();
           }
           this___.handles = o.handles || (!$('.ui-resizable-handle',
               this___.element).length? 'e,s,se': {
               'n': '.ui-resizable-n',
               'e': '.ui-resizable-e',
               's': '.ui-resizable-s',
               'w': '.ui-resizable-w',
               'se': '.ui-resizable-se',
               'sw': '.ui-resizable-sw',
               'ne': '.ui-resizable-ne',
               'nw': '.ui-resizable-nw'
             });
           if (this___.handles.constructor == String) {
             if (this___.handles == 'all') this___.handles =
               'n,e,s,w,se,sw,ne,nw';
             var n = this___.handles.split(',');
             this___.handles = {};
             for (var i = 0; i < n.length; i++) {
               var handle = $.trim(n[ i ]), hname = 'ui-resizable-' + handle;
               var axis = $('<div class=\"ui-resizable-handle ' + hname +
                 '\"></div>');
               if (/sw|se|ne|nw/.test(handle)) axis.css({
                   'zIndex': ++o.zIndex
                 });
               if ('se' == handle) {
                 axis.addClass('ui-icon ui-icon-gripsmall-diagonal-se');
               };
               this___.handles[ handle ] = '.ui-resizable-' + handle;
               this___.element.append(axis);
             }
           }
           this___._renderAxis = function (target) {
             var x0___;
             var this___ = this && this.___? void 0: this;
             target = target || this___.element;
             for (x0___ in this.handles) {
               if (x0___.match(/___$/)) { continue; }
               i = x0___;
               {
                 if (this___.handles[ i ].constructor == String)
                   this___.handles[ i ] = $(this___.handles[ i ],
                   this___.element).show();
                 if (this___.elementIsWrapper && this___.originalElement[ 0 ]
                   .nodeName.match(/textarea|input|select|button/i)) {
                   var axis = $(this___.handles[ i ], this___.element),
                   padWrapper = 0;
                   padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight():
                   axis.outerWidth();
                   var padPos = [ 'padding', /ne|nw|n/.test(i) ? 'Top':
                     /se|sw|s/.test(i) ? 'Bottom': /^e$/.test(i) ? 'Right':
                     'Left' ].join('');
                   target.css(padPos, padWrapper);
                   this___._proportionallyResize();
                 }
                 if (!$(this___.handles[ i ]).length) continue;
               }
             }
           };
           this___._renderAxis(this___.element);
           this___._handles = $('.ui-resizable-handle', this___.element)
             .disableSelection();
           this___._handles.mouseover(function () {
               var this___ = this && this.___? void 0: this;
               if (!self.resizing) {
                 if (this___.className) var axis =
                   this___.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                   ;
                 self.axis = axis && axis[ 1 ] ? axis[ 1 ]: 'se';
               }
             });
           if (o.autoHide) {
             this___._handles.hide();
             $(this___.element).addClass('ui-resizable-autohide')
               .hover(function () {
                 var this___ = this && this.___? void 0: this;
                 if (o.disabled) return;
                 $(this___).removeClass('ui-resizable-autohide');
                 self._handles.show();
               }, function () {
                 var this___ = this && this.___? void 0: this;
                 if (o.disabled) return;
                 if (!self.resizing) {
                   $(this___).addClass('ui-resizable-autohide');
                   self._handles.hide();
                 }
               });
           }
           this___._mouseInit();
         },
         'destroy': function () {
           var this___ = this && this.___? void 0: this;
           this___._mouseDestroy();
           var _destroy = function (exp) {
             $(exp)
               .removeClass('ui-resizable ui-resizable-disabled ui-resizable-resizing')
               .removeData('resizable').unbind('.resizable')
               .find('.ui-resizable-handle').remove();
           };
           if (this___.elementIsWrapper) {
             _destroy(this___.element);
             var wrapper = this___.element;
             wrapper.after(this___.originalElement.css({
                   'position': wrapper.css('position'),
                   'width': wrapper.outerWidth(),
                   'height': wrapper.outerHeight(),
                   'top': wrapper.css('top'),
                   'left': wrapper.css('left')
                 })).remove();
           }
           this___.originalElement.css('resize', this___.originalResizeStyle);
           _destroy(this___.originalElement);
           return this___;
         },
         '_mouseCapture': function (event) {
           var x0___;
           var this___ = this && this.___? void 0: this;
           var handle = false;
           for (x0___ in this.handles) {
             if (x0___.match(/___$/)) { continue; }
             i = x0___;
             {
               if (($(this___.handles[ i ]))[ 0 ] == event.target) { handle =
                   true; }
             }
           }
           return !this___.options.disabled && handle;
         },
         '_mouseStart': function (event) {
           var this___ = this && this.___? void 0: this;
           var o = this___.options, iniPos = this___.element.position(), el =
             this___.element;
           this___.resizing = true;
           this___.documentScroll = {
             'top': $(document).scrollTop(),
             'left': $(document).scrollLeft()
           };
           if (el.is('.ui-draggable') || /absolute/.test(el.css('position'))) {
             el.css({
                 'position': 'absolute',
                 'top': iniPos.top,
                 'left': iniPos.left
               });
           }
           if ($.browser.opera && /relative/.test(el.css('position'))) el.css({
               'position': 'relative',
               'top': 'auto',
               'left': 'auto'
             });
           this___._renderProxy();
           var curleft = num(this___.helper.css('left')), curtop =
             num(this___.helper.css('top'));
           if (o.containment) {
             curleft += $(o.containment).scrollLeft() || 0;
             curtop += $(o.containment).scrollTop() || 0;
           }
           this___.offset = this___.helper.offset();
           this___.position = {
             'left': curleft,
             'top': curtop
           };
           this___.size = this___._helper? {
             'width': el.outerWidth(),
             'height': el.outerHeight()
           }: {
             'width': el.width(),
             'height': el.height()
           };
           this___.originalSize = this___._helper? {
             'width': el.outerWidth(),
             'height': el.outerHeight()
           }: {
             'width': el.width(),
             'height': el.height()
           };
           this___.originalPosition = {
             'left': curleft,
             'top': curtop
           };
           this___.sizeDiff = {
             'width': el.outerWidth() - el.width(),
             'height': el.outerHeight() - el.height()
           };
           this___.originalMousePosition = {
             'left': event.pageX,
             'top': event.pageY
           };
           this___.aspectRatio = typeof o.aspectRatio == 'number'?
             o.aspectRatio: this___.originalSize.width /
             this___.originalSize.height || 1;
           var cursor = $('.ui-resizable-' + this___.axis).css('cursor');
           $('body').css('cursor', cursor == 'auto'? this___.axis + '-resize':
             cursor);
           el.addClass('ui-resizable-resizing');
           this___._propagate('start', event);
           return true;
         },
         '_mouseDrag': function (event) {
           var this___ = this && this.___? void 0: this;
           var el = this___.helper, o = this___.options, props = {}, self =
             this___, smp = this___.originalMousePosition, a = this___.axis;
           var dx = event.pageX - smp.left || 0, dy = event.pageY - smp.top ||
             0;
           var trigger = this___._change[ a ];
           if (!trigger) return false;
           var data = trigger.apply(this___, [ event, dx, dy ]), ie6 =
             $.browser.msie && $.browser.version < 7, csdif = this___.sizeDiff;
           this___._updateVirtualBoundaries(event.shiftKey);
           if (this___._aspectRatio || event.shiftKey) data =
             this___._updateRatio(data, event);
           data = this___._respectSize(data, event);
           this___._propagate('resize', event);
           el.css({
               'top': this___.position.top + 'px',
               'left': this___.position.left + 'px',
               'width': this___.size.width + 'px',
               'height': this___.size.height + 'px'
             });
           if (!this___._helper &&
             this___._proportionallyResizeElements.length)
             this___._proportionallyResize();
           this___._updateCache(data);
           this___._trigger('resize', event, this___.ui());
           return false;
         },
         '_mouseStop': function (event) {
           var this___ = this && this.___? void 0: this;
           this___.resizing = false;
           var o = this___.options, self = this___;
           if (this___._helper) {
             var pr = this___._proportionallyResizeElements, ista = pr.length
               && /textarea/i.test(pr[ 0 ].nodeName), soffseth = ista &&
               $.ui.hasScroll(pr[ 0 ], 'left') ? 0: self.sizeDiff.height,
             soffsetw = ista? 0: self.sizeDiff.width;
             var s = {
               'width': self.helper.width() - soffsetw,
               'height': self.helper.height() - soffseth
             }, left = parseInt(self.element.css('left'), 10) +
               (self.position.left - self.originalPosition.left) || null, top =
               parseInt(self.element.css('top'), 10) + (self.position.top -
               self.originalPosition.top) || null;
             if (!o.animate) this___.element.css($.extend(s, {
                   'top': top,
                   'left': left
                 }));
             self.helper.height(self.size.height);
             self.helper.width(self.size.width);
             if (this___._helper && !o.animate) this___._proportionallyResize()
               ;
           }
           $('body').css('cursor', 'auto');
           this___.element.removeClass('ui-resizable-resizing');
           this___._propagate('stop', event);
           if (this___._helper) this___.helper.remove();
           return false;
         },
         '_updateVirtualBoundaries': function (forceAspectRatio) {
           var this___ = this && this.___? void 0: this;
           var o = this___.options, pMinWidth, pMaxWidth, pMinHeight,
           pMaxHeight, b;
           b = {
             'minWidth': isNumber(o.minWidth) ? o.minWidth: 0,
             'maxWidth': isNumber(o.maxWidth) ? o.maxWidth: Infinity,
             'minHeight': isNumber(o.minHeight) ? o.minHeight: 0,
             'maxHeight': isNumber(o.maxHeight) ? o.maxHeight: Infinity
           };
           if (this___._aspectRatio || forceAspectRatio) {
             pMinWidth = b.minHeight * this___.aspectRatio;
             pMinHeight = b.minWidth / this___.aspectRatio;
             pMaxWidth = b.maxHeight * this___.aspectRatio;
             pMaxHeight = b.maxWidth / this___.aspectRatio;
             if (pMinWidth > b.minWidth) b.minWidth = pMinWidth;
             if (pMinHeight > b.minHeight) b.minHeight = pMinHeight;
             if (pMaxWidth < b.maxWidth) b.maxWidth = pMaxWidth;
             if (pMaxHeight < b.maxHeight) b.maxHeight = pMaxHeight;
           }
           this___._vBoundaries = b;
         },
         '_updateCache': function (data) {
           var this___ = this && this.___? void 0: this;
           var o = this___.options;
           this___.offset = this___.helper.offset();
           if (isNumber(data.left)) this___.position.left = data.left;
           if (isNumber(data.top)) this___.position.top = data.top;
           if (isNumber(data.height)) this___.size.height = data.height;
           if (isNumber(data.width)) this___.size.width = data.width;
         },
         '_updateRatio': function (data, event) {
           var this___ = this && this.___? void 0: this;
           var o = this___.options, cpos = this___.position, csize =
             this___.size, a = this___.axis;
           if (isNumber(data.height)) data.width = data.height *
             this___.aspectRatio;
           else if (isNumber(data.width)) data.height = data.width /
             this___.aspectRatio;
           if (a == 'sw') {
             data.left = cpos.left + (csize.width - data.width);
             data.top = null;
           }
           if (a == 'nw') {
             data.top = cpos.top + (csize.height - data.height);
             data.left = cpos.left + (csize.width - data.width);
           }
           return data;
         },
         '_respectSize': function (data, event) {
           var this___ = this && this.___? void 0: this;
           var el = this___.helper, o = this___._vBoundaries, pRatio =
             this___._aspectRatio || event.shiftKey, a = this___.axis, ismaxw =
             isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,
           ismaxh = isNumber(data.height) && o.maxHeight && o.maxHeight <
             data.height, isminw = isNumber(data.width) && o.minWidth &&
             o.minWidth > data.width, isminh = isNumber(data.height) &&
             o.minHeight && o.minHeight > data.height;
           if (isminw) data.width = o.minWidth;
           if (isminh) data.height = o.minHeight;
           if (ismaxw) data.width = o.maxWidth;
           if (ismaxh) data.height = o.maxHeight;
           var dw = this___.originalPosition.left + this___.originalSize.width,
           dh = this___.position.top + this___.size.height;
           var cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
           if (isminw && cw) data.left = dw - o.minWidth;
           if (ismaxw && cw) data.left = dw - o.maxWidth;
           if (isminh && ch) data.top = dh - o.minHeight;
           if (ismaxh && ch) data.top = dh - o.maxHeight;
           var isNotwh = !data.width && !data.height;
           if (isNotwh && !data.left && data.top) data.top = null;
           else if (isNotwh && !data.top && data.left) data.left = null;
           return data;
         },
         '_proportionallyResize': function () {
           var this___ = this && this.___? void 0: this;
           var o = this___.options;
           if (!this___._proportionallyResizeElements.length) return;
           var element = this___.helper || this___.element;
           for (var i = 0; i < this___._proportionallyResizeElements.length;
             i++) {
             var prel = this___._proportionallyResizeElements[ i ];
             if (!this___.borderDif) {
               var b = [ prel.css('borderTopWidth'),
                 prel.css('borderRightWidth'), prel.css('borderBottomWidth'),
                 prel.css('borderLeftWidth') ], p = [ prel.css('paddingTop'),
                 prel.css('paddingRight'), prel.css('paddingBottom'),
                 prel.css('paddingLeft') ];
               this___.borderDif = $.map(b, function (v, i) {
                   var border = parseInt(v, 10) || 0, padding = parseInt(p[ i ]
                     , 10) || 0;
                   return border + padding;
                 });
             }
             if ($.browser.msie && ! ! ($(element).is(':hidden') || $(element)
                 .parents(':hidden').length)) continue;
             prel.css({
                 'height': element.height() - this___.borderDif[ 0 ] -
                   this___.borderDif[ 2 ] || 0,
                 'width': element.width() - this___.borderDif[ 1 ] -
                   this___.borderDif[ 3 ] || 0
               });
           };
         },
         '_renderProxy': function () {
           var this___ = this && this.___? void 0: this;
           var el = this___.element, o = this___.options;
           this___.elementOffset = el.offset();
           if (this___._helper) {
             this___.helper = this___.helper ||
               $('<div style=\"overflow:hidden;\"></div>');
             var ie6 = $.browser.msie && $.browser.version < 7, ie6offset =
               ie6? 1: 0, pxyoffset = ie6? 2: -1;
             this___.helper.addClass(this___._helper).css({
                 'width': this___.element.outerWidth() + pxyoffset,
                 'height': this___.element.outerHeight() + pxyoffset,
                 'position': 'absolute',
                 'left': this___.elementOffset.left - ie6offset + 'px',
                 'top': this___.elementOffset.top - ie6offset + 'px',
                 'zIndex': ++o.zIndex
               });
             this___.helper.appendTo('body').disableSelection();
           } else {
             this___.helper = this___.element;
           }
         },
         '_change': {
           'e': function (event, dx, dy) {
             var this___ = this && this.___? void 0: this;
             return {
               'width': this___.originalSize.width + dx
             };
           },
           'w': function (event, dx, dy) {
             var this___ = this && this.___? void 0: this;
             var o = this___.options, cs = this___.originalSize, sp =
               this___.originalPosition;
             return {
               'left': sp.left + dx,
               'width': cs.width - dx
             };
           },
           'n': function (event, dx, dy) {
             var this___ = this && this.___? void 0: this;
             var o = this___.options, cs = this___.originalSize, sp =
               this___.originalPosition;
             return {
               'top': sp.top + dy,
               'height': cs.height - dy
             };
           },
           's': function (event, dx, dy) {
             var this___ = this && this.___? void 0: this;
             return {
               'height': this___.originalSize.height + dy
             };
           },
           'se': function (event, dx, dy) {
             var this___ = this && this.___? void 0: this;
             return $.extend(this___._change.s.apply(this___, arguments),
               this___._change.e.apply(this___, [ event, dx, dy ]));
           },
           'sw': function (event, dx, dy) {
             var this___ = this && this.___? void 0: this;
             return $.extend(this___._change.s.apply(this___, arguments),
               this___._change.w.apply(this___, [ event, dx, dy ]));
           },
           'ne': function (event, dx, dy) {
             var this___ = this && this.___? void 0: this;
             return $.extend(this___._change.n.apply(this___, arguments),
               this___._change.e.apply(this___, [ event, dx, dy ]));
           },
           'nw': function (event, dx, dy) {
             var this___ = this && this.___? void 0: this;
             return $.extend(this___._change.n.apply(this___, arguments),
               this___._change.w.apply(this___, [ event, dx, dy ]));
           }
         },
         '_propagate': function (n, event) {
           var this___ = this && this.___? void 0: this;
           $.ui.plugin.call(this___, n, [ event, this___.ui() ]);
           n != 'resize' && this___._trigger(n, event, this___.ui());
         },
         'plugins': {},
         'ui': function () {
           var this___ = this && this.___? void 0: this;
           return {
             'originalElement': this___.originalElement,
             'element': this___.element,
             'helper': this___.helper,
             'position': this___.position,
             'size': this___.size,
             'originalSize': this___.originalSize,
             'originalPosition': this___.originalPosition
           };
         }
       });
     $.extend($.ui.resizable, {
         'version': '1.8.14'
       });
     $.ui.plugin.add('resizable', 'alsoResize', {
         'start': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options;
           var _store = function (exp) {
             $(exp).each(function () {
                 var this___ = this && this.___? void 0: this;
                 var el = $(this___);
                 el.data('resizable-alsoresize', {
                     'width': parseInt(el.width(), 10),
                     'height': parseInt(el.height(), 10),
                     'left': parseInt(el.css('left'), 10),
                     'top': parseInt(el.css('top'), 10),
                     'position': el.css('position')
                   });
               });
           };
           if (typeof o.alsoResize == 'object' && !o.alsoResize.parentNode) {
             if (o.alsoResize.length) {
               o.alsoResize = o.alsoResize[ 0 ];
               _store(o.alsoResize);
             } else {
               $.each(o.alsoResize, function (exp) { _store(exp); });
             }
           } else {
             _store(o.alsoResize);
           }
         },
         'resize': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options, os =
             self.originalSize, op = self.originalPosition;
           var delta = {
             'height': self.size.height - os.height || 0,
             'width': self.size.width - os.width || 0,
             'top': self.position.top - op.top || 0,
             'left': self.position.left - op.left || 0
           }, _alsoResize = function (exp, c) {
             $(exp).each(function () {
                 var this___ = this && this.___? void 0: this;
                 var el = $(this___), start = $(this___)
                   .data('resizable-alsoresize'), style = {}, css = c &&
                   c.length? c: el.parents(ui.originalElement[ 0 ]).length? [
                   'width', 'height' ]: [ 'width', 'height', 'top', 'left' ];
                 $.each(css, function (i, prop) {
                     var sum = (start[ prop ] || 0) + (delta[ prop ] || 0);
                     if (sum && sum >= 0) style[ prop ] = sum || null;
                   });
                 if ($.browser.opera && /relative/.test(el.css('position'))) {
                   self._revertToRelativePosition = true;
                   el.css({
                       'position': 'absolute',
                       'top': 'auto',
                       'left': 'auto'
                     });
                 }
                 el.css(style);
               });
           };
           if (typeof o.alsoResize == 'object' && !o.alsoResize.nodeType) {
             $.each(o.alsoResize, function (exp, c) {
                 _alsoResize(exp, c);
               });
           } else {
             _alsoResize(o.alsoResize);
           }
         },
         'stop': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options;
           var _reset = function (exp) {
             $(exp).each(function () {
                 var this___ = this && this.___? void 0: this;
                 var el = $(this___);
                 el.css({
                     'position': el.data('resizable-alsoresize').position
                   });
               });
           };
           if (self._revertToRelativePosition) {
             self._revertToRelativePosition = false;
             if (typeof o.alsoResize == 'object' && !o.alsoResize.nodeType) {
               $.each(o.alsoResize, function (exp) { _reset(exp); });
             } else {
               _reset(o.alsoResize);
             }
           }
           $(this___).removeData('resizable-alsoresize');
         }
       });
     $.ui.plugin.add('resizable', 'animate', {
         'stop': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options;
           var pr = self._proportionallyResizeElements, ista = pr.length &&
             /textarea/i.test(pr[ 0 ].nodeName), soffseth = ista &&
             $.ui.hasScroll(pr[ 0 ], 'left') ? 0: self.sizeDiff.height,
           soffsetw = ista? 0: self.sizeDiff.width;
           var style = {
             'width': self.size.width - soffsetw,
             'height': self.size.height - soffseth
           }, left = parseInt(self.element.css('left'), 10) +
             (self.position.left - self.originalPosition.left) || null, top =
             parseInt(self.element.css('top'), 10) + (self.position.top -
             self.originalPosition.top) || null;
           self.element.animate($.extend(style, top && left? {
                 'top': top,
                 'left': left
               }: {}), {
               'duration': o.animateDuration,
               'easing': o.animateEasing,
               'step': function () {
                 var data = {
                   'width': parseInt(self.element.css('width'), 10),
                   'height': parseInt(self.element.css('height'), 10),
                   'top': parseInt(self.element.css('top'), 10),
                   'left': parseInt(self.element.css('left'), 10)
                 };
                 if (pr && pr.length) $(pr[ 0 ]).css({
                     'width': data.width,
                     'height': data.height
                   });
                 self._updateCache(data);
                 self._propagate('resize', event);
               }
             });
         }
       });
     $.ui.plugin.add('resizable', 'containment', {
         'start': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options, el =
             self.element;
           var oc = o.containment, ce = oc instanceof $? oc.get(0):
           /parent/.test(oc) ? el.parent().get(0): oc;
           if (!ce) return;
           self.containerElement = $(ce);
           if (/document/.test(oc) || oc == document) {
             self.containerOffset = {
               'left': 0,
               'top': 0
             };
             self.containerPosition = {
               'left': 0,
               'top': 0
             };
             self.parentData = {
               'element': $(document),
               'left': 0,
               'top': 0,
               'width': $(document).width(),
               'height': $(document).height() ||
                 document.body.parentNode.scrollHeight
             };
           } else {
             var element = $(ce), p = [ ];
             $([ 'Top', 'Right', 'Left', 'Bottom' ]).each(function (i, name) {
                 p[ i ] = num(element.css('padding' + name));
               });
             self.containerOffset = element.offset();
             self.containerPosition = element.position();
             self.containerSize = {
               'height': element.innerHeight() - p[ 3 ],
               'width': element.innerWidth() - p[ 1 ]
             };
             var co = self.containerOffset, ch = self.containerSize.height, cw
               = self.containerSize.width, width = $.ui.hasScroll(ce, 'left') ?
               ce.scrollWidth: cw, height = $.ui.hasScroll(ce) ?
               ce.scrollHeight: ch;
             self.parentData = {
               'element': ce,
               'left': co.left,
               'top': co.top,
               'width': width,
               'height': height
             };
           }
         },
         'resize': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options, ps =
             self.containerSize, co = self.containerOffset, cs = self.size, cp
             = self.position, pRatio = self._aspectRatio || event.shiftKey, cop
             = {
             'top': 0,
             'left': 0
           }, ce = self.containerElement;
           if (ce[ 0 ] != document && /static/.test(ce.css('position'))) cop =
             co;
           if (cp.left < (self._helper? co.left: 0)) {
             self.size.width = self.size.width + (self._helper?
               self.position.left - co.left: self.position.left - cop.left);
             if (pRatio) self.size.height = self.size.width / o.aspectRatio;
             self.position.left = o.helper? co.left: 0;
           }
           if (cp.top < (self._helper? co.top: 0)) {
             self.size.height = self.size.height + (self._helper?
               self.position.top - co.top: self.position.top);
             if (pRatio) self.size.width = self.size.height * o.aspectRatio;
             self.position.top = self._helper? co.top: 0;
           }
           self.offset.left = self.parentData.left + self.position.left;
           self.offset.top = self.parentData.top + self.position.top;
           var woset = Math.abs((self._helper? self.offset.left - cop.left:
               self.offset.left - cop.left) + self.sizeDiff.width), hoset =
             Math.abs((self._helper? self.offset.top - cop.top: self.offset.top
               - co.top) + self.sizeDiff.height);
           var isParent = self.containerElement.get(0) == self.element.parent()
             .get(0), isOffsetRelative =
             /relative|absolute/.test(self.containerElement.css('position'));
           if (isParent && isOffsetRelative) woset -= self.parentData.left;
           if (woset + self.size.width >= self.parentData.width) {
             self.size.width = self.parentData.width - woset;
             if (pRatio) self.size.height = self.size.width / self.aspectRatio;
           }
           if (hoset + self.size.height >= self.parentData.height) {
             self.size.height = self.parentData.height - hoset;
             if (pRatio) self.size.width = self.size.height * self.aspectRatio;
           }
         },
         'stop': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options, cp =
             self.position, co = self.containerOffset, cop =
             self.containerPosition, ce = self.containerElement;
           var helper = $(self.helper), ho = helper.offset(), w =
             helper.outerWidth() - self.sizeDiff.width, h =
             helper.outerHeight() - self.sizeDiff.height;
           if (self._helper && !o.animate && /relative/.test(ce.css('position')
             )) $(this___).css({
               'left': ho.left - cop.left - co.left,
               'width': w,
               'height': h
             });
           if (self._helper && !o.animate && /static/.test(ce.css('position')))
             $(this___).css({
               'left': ho.left - cop.left - co.left,
               'width': w,
               'height': h
             });
         }
       });
     $.ui.plugin.add('resizable', 'ghost', {
         'start': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options, cs =
             self.size;
           self.ghost = self.originalElement.clone();
           self.ghost.css({
               'opacity': 0.25,
               'display': 'block',
               'position': 'relative',
               'height': cs.height,
               'width': cs.width,
               'margin': 0,
               'left': 0,
               'top': 0
             }).addClass('ui-resizable-ghost').addClass(typeof o.ghost ==
             'string'? o.ghost: '');
           self.ghost.appendTo(self.helper);
         },
         'resize': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options;
           if (self.ghost) self.ghost.css({
               'position': 'relative',
               'height': self.size.height,
               'width': self.size.width
             });
         },
         'stop': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options;
           if (self.ghost && self.helper) self.helper.get(0)
             .removeChild(self.ghost.get(0));
         }
       });
     $.ui.plugin.add('resizable', 'grid', {
         'resize': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var self = $(this___).data('resizable'), o = self.options, cs =
             self.size, os = self.originalSize, op = self.originalPosition, a =
             self.axis, ratio = o._aspectRatio || event.shiftKey;
           o.grid = typeof o.grid == 'number'? [ o.grid, o.grid ]: o.grid;
           var ox = Math.round((cs.width - os.width) / (o.grid[ 0 ] || 1)) *
             (o.grid[ 0 ] || 1), oy = Math.round((cs.height - os.height) /
             (o.grid[ 1 ] || 1)) * (o.grid[ 1 ] || 1);
           if (/^(se|s|e)$/.test(a)) {
             self.size.width = os.width + ox;
             self.size.height = os.height + oy;
           } else if (/^(ne)$/.test(a)) {
             self.size.width = os.width + ox;
             self.size.height = os.height + oy;
             self.position.top = op.top - oy;
           } else if (/^(sw)$/.test(a)) {
             self.size.width = os.width + ox;
             self.size.height = os.height + oy;
             self.position.left = op.left - ox;
           } else {
             self.size.width = os.width + ox;
             self.size.height = os.height + oy;
             self.position.top = op.top - oy;
             self.position.left = op.left - ox;
           }
         }
       });
     var num = function (v) {
       return parseInt(v, 10) || 0;
     };
     var isNumber = function (value) {
       return !isNaN(parseInt(value, 10));
};
})(jQuery);
}