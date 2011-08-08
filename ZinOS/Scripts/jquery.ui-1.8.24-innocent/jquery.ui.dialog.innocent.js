{
  (function ($, undefined) {
     var uiDialogClasses = 'ui-dialog ' + 'ui-widget ' + 'ui-widget-content ' +
       'ui-corner-all ', sizeRelatedOptions = {
       'buttons': true,
       'height': true,
       'maxHeight': true,
       'maxWidth': true,
       'minHeight': true,
       'minWidth': true,
       'width': true
     }, resizableRelatedOptions = {
       'maxHeight': true,
       'maxWidth': true,
       'minHeight': true,
       'minWidth': true
     }, attrFn = $.attrFn || {
       'val': true,
       'css': true,
       'html': true,
       'text': true,
       'data': true,
       'width': true,
       'height': true,
       'offset': true,
       'click': true
     };
     $.widget('ui.dialog', {
         'options': {
           'autoOpen': true,
           'buttons': {},
           'closeOnEscape': true,
           'closeText': 'close',
           'dialogClass': '',
           'draggable': true,
           'hide': null,
           'height': 'auto',
           'maxHeight': false,
           'maxWidth': false,
           'minHeight': 150,
           'minWidth': 150,
           'modal': false,
           'position': {
             'my': 'center',
             'at': 'center',
             'collision': 'fit',
             'using': function (pos) {
               var this___ = this && this.___? void 0: this;
               var topOffset = $(this___).css(pos).offset().top;
               if (topOffset < 0) {
                 $(this___).css('top', pos.top - topOffset);
               }
             }
           },
           'resizable': true,
           'show': null,
           'stack': true,
           'title': '',
           'width': 300,
           'zIndex': 1000
         },
         '_create': function () {
           var this___ = this && this.___? void 0: this;
           this___.originalTitle = this___.element.attr('title');
           if (typeof this___.originalTitle !== 'string') {
             this___.originalTitle = '';
           }
           this___.options.title = this___.options.title ||
             this___.originalTitle;
           var self = this___, options = self.options, title = options.title ||
             '&#160;', titleId = $.ui.dialog.getTitleId(self.element), uiDialog
             = (self.uiDialog = $('<div></div>')).appendTo(document.body)
             .hide().addClass(uiDialogClasses + options.dialogClass).css({
               'zIndex': options.zIndex
             }).attr('tabIndex', -1).css('outline', 0).keydown(function (event)
             {
               if (options.closeOnEscape && event.keyCode && event.keyCode ===
                 $.ui.keyCode.ESCAPE) {
                 self.close(event);
                 event.preventDefault();
               }
             }).attr({
               'role': 'dialog',
               'aria-labelledby': titleId
             }).mousedown(function (event) {
               self.moveToTop(false, event);
             }), uiDialogContent = self.element.show().removeAttr('title')
             .addClass('ui-dialog-content ' + 'ui-widget-content')
             .appendTo(uiDialog), uiDialogTitlebar = (self.uiDialogTitlebar =
             $('<div></div>')).addClass('ui-dialog-titlebar ' +
             'ui-widget-header ' + 'ui-corner-all ' + 'ui-helper-clearfix')
             .prependTo(uiDialog), uiDialogTitlebarClose =
             $('<a href=\"#\"></a>').addClass('ui-dialog-titlebar-close ' +
             'ui-corner-all').attr('role', 'button').hover(function () {
               uiDialogTitlebarClose.addClass('ui-state-hover');
             }, function () {
               uiDialogTitlebarClose.removeClass('ui-state-hover');
             }).focus(function () {
               uiDialogTitlebarClose.addClass('ui-state-focus');
             }).blur(function () {
               uiDialogTitlebarClose.removeClass('ui-state-focus');
             }).click(function (event) {
               self.close(event);
               return false;
             }).appendTo(uiDialogTitlebar), uiDialogTitlebarCloseText =
             (self.uiDialogTitlebarCloseText = $('<span></span>'))
             .addClass('ui-icon ' + 'ui-icon-closethick')
             .text(options.closeText).appendTo(uiDialogTitlebarClose),
           uiDialogTitle = $('<span></span>').addClass('ui-dialog-title')
             .attr('id', titleId).html(title).prependTo(uiDialogTitlebar);
           if ($.isFunction(options.beforeclose) &&
             !$.isFunction(options.beforeClose)) {
             options.beforeClose = options.beforeclose;
           }
           uiDialogTitlebar.find('*').add(uiDialogTitlebar).disableSelection();
           if (options.draggable && $.fn.draggable) {
             self._makeDraggable();
           }
           if (options.resizable && $.fn.resizable) {
             self._makeResizable();
           }
           self._createButtons(options.buttons);
           self._isOpen = false;
           if ($.fn.bgiframe) {
             uiDialog.bgiframe();
           }
         },
         '_init': function () {
           var this___ = this && this.___? void 0: this;
           if (this___.options.autoOpen) { this___.open(); }
         },
         'destroy': function () {
           var this___ = this && this.___? void 0: this;
           var self = this___;
           if (self.overlay) {
             self.overlay.destroy();
           }
           self.uiDialog.hide();
           self.element.unbind('.dialog').removeData('dialog')
             .removeClass('ui-dialog-content ui-widget-content').hide()
             .appendTo('body');
           self.uiDialog.remove();
           if (self.originalTitle) {
             self.element.attr('title', self.originalTitle);
           }
           return self;
         },
         'widget': function () {
           var this___ = this && this.___? void 0: this;
           return this___.uiDialog;
         },
         'close': function (event) {
           var this___ = this && this.___? void 0: this;
           var self = this___, maxZ, thisZ;
           if (false === self._trigger('beforeClose', event)) { return; }
           if (self.overlay) {
             self.overlay.destroy();
           }
           self.uiDialog.unbind('keypress.ui-dialog');
           self._isOpen = false;
           if (self.options.hide) {
             self.uiDialog.hide(self.options.hide, function () {
                 self._trigger('close', event);
               });
           } else {
             self.uiDialog.hide();
             self._trigger('close', event);
           }
           $.ui.dialog.overlay.resize();
           if (self.options.modal) {
             maxZ = 0;
             $('.ui-dialog').each(function () {
                 var this___ = this && this.___? void 0: this;
                 if (this___ !== self.uiDialog[ 0 ]) {
                   thisZ = $(this___).css('z-index');
                   if (!isNaN(thisZ)) {
                     maxZ = Math.max(maxZ, thisZ);
                   }
                 }
               });
             $.ui.dialog.maxZ = maxZ;
           }
           return self;
         },
         'isOpen': function () {
           var this___ = this && this.___? void 0: this;
           return this___._isOpen;
         },
         'moveToTop': function (force, event) {
           var this___ = this && this.___? void 0: this;
           var self = this___, options = self.options, saveScroll;
           if (options.modal && !force || !options.stack && !options.modal) {
             return self._trigger('focus', event);
           }
           if (options.zIndex > $.ui.dialog.maxZ) {
             $.ui.dialog.maxZ = options.zIndex;
           }
           if (self.overlay) {
             $.ui.dialog.maxZ += 1;
             self.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ =
               $.ui.dialog.maxZ);
           }
           saveScroll = {
             'scrollTop': self.element.attr('scrollTop'),
             'scrollLeft': self.element.attr('scrollLeft')
           };
           $.ui.dialog.maxZ += 1;
           self.uiDialog.css('z-index', $.ui.dialog.maxZ);
           self.element.attr(saveScroll);
           self._trigger('focus', event);
           return self;
         },
         'open': function () {
           var this___ = this && this.___? void 0: this;
           if (this___._isOpen) { return; }
           var self = this___, options = self.options, uiDialog =
             self.uiDialog;
           self.overlay = options.modal? new $.ui.dialog.overlay(self): null;
           self._size();
           self._position(options.position);
           uiDialog.show(options.show);
           self.moveToTop(true);
           if (options.modal) {
             uiDialog.bind('keypress.ui-dialog', function (event) {
                 var this___ = this && this.___? void 0: this;
                 if (event.keyCode !== $.ui.keyCode.TAB) { return; }
                 var tabbables = $(':tabbable', this___), first =
                   tabbables.filter(':first'), last = tabbables.filter(':last')
                   ;
                 if (event.target === last[ 0 ] && !event.shiftKey) {
                   first.focus(1);
                   return false;
                 } else if (event.target === first[ 0 ] && event.shiftKey) {
                   last.focus(1);
                   return false;
                 }
               });
           }
           $(self.element.find(':tabbable').get()
             .concat(uiDialog.find('.ui-dialog-buttonpane :tabbable').get()
               .concat(uiDialog.get()))).eq(0).focus();
           self._isOpen = true;
           self._trigger('open');
           return self;
         },
         '_createButtons': function (buttons) {
           var this___ = this && this.___? void 0: this;
           var self = this___, hasButtons = false, uiDialogButtonPane =
             $('<div></div>').addClass('ui-dialog-buttonpane ' +
               'ui-widget-content ' + 'ui-helper-clearfix'), uiButtonSet =
             $('<div></div>').addClass('ui-dialog-buttonset')
             .appendTo(uiDialogButtonPane);
           self.uiDialog.find('.ui-dialog-buttonpane').remove();
           if (typeof buttons === 'object' && buttons !== null) {
             $.each(buttons, function () {
                 return ! (hasButtons = true);
               });
           }
           if (hasButtons) {
             $.each(buttons, function (name, props) {
                 props = $.isFunction(props) ? {
                   'click': props,
                   'text': name
                 }: props;
                 var button = $('<button type=\"button\"></button>')
                   .click(function () {
                     props.click.apply(self.element[ 0 ], arguments);
                   }).appendTo(uiButtonSet);
                 $.each(props, function (key, value) {
                     if (key === 'click') { return; }
                     if (key in attrFn) {
                       button[ key ] (value);
                     } else {
                       button.attr(key, value);
                     }
                   });
                 if ($.fn.button) { button.button(); }
               });
             uiDialogButtonPane.appendTo(self.uiDialog);
           }
         },
         '_makeDraggable': function () {
           var this___ = this && this.___? void 0: this;
           var self = this___, options = self.options, doc = $(document),
           heightBeforeDrag;
           function filteredUi(ui) {
             return {
               'position': ui.position,
               'offset': ui.offset
             };
           }
           self.uiDialog.draggable({
               'cancel': '.ui-dialog-content, .ui-dialog-titlebar-close',
               'handle': '.ui-dialog-titlebar',
               'containment': 'document',
               'start': function (event, ui) {
                 var this___ = this && this.___? void 0: this;
                 heightBeforeDrag = options.height === 'auto'? 'auto':
                 $(this___).height();
                 $(this___).height($(this___).height())
                   .addClass('ui-dialog-dragging');
                 self._trigger('dragStart', event, filteredUi(ui));
               },
               'drag': function (event, ui) {
                 self._trigger('drag', event, filteredUi(ui));
               },
               'stop': function (event, ui) {
                 var this___ = this && this.___? void 0: this;
                 options.position = [ ui.position.left - doc.scrollLeft(),
                   ui.position.top - doc.scrollTop() ];
                 $(this___).removeClass('ui-dialog-dragging')
                   .height(heightBeforeDrag);
                 self._trigger('dragStop', event, filteredUi(ui));
                 $.ui.dialog.overlay.resize();
               }
             });
         },
         '_makeResizable': function (handles) {
           var this___ = this && this.___? void 0: this;
           handles = handles === undefined? this___.options.resizable: handles;
           var self = this___, options = self.options, position =
             self.uiDialog.css('position'), resizeHandles = typeof handles ===
             'string'? handles: 'n,e,s,w,se,sw,ne,nw';
           function filteredUi(ui) {
             return {
               'originalPosition': ui.originalPosition,
               'originalSize': ui.originalSize,
               'position': ui.position,
               'size': ui.size
             };
           }
           self.uiDialog.resizable({
               'cancel': '.ui-dialog-content',
               'containment': 'document',
               'alsoResize': self.element,
               'maxWidth': options.maxWidth,
               'maxHeight': options.maxHeight,
               'minWidth': options.minWidth,
               'minHeight': self._minHeight(),
               'handles': resizeHandles,
               'start': function (event, ui) {
                 var this___ = this && this.___? void 0: this;
                 $(this___).addClass('ui-dialog-resizing');
                 self._trigger('resizeStart', event, filteredUi(ui));
               },
               'resize': function (event, ui) {
                 self._trigger('resize', event, filteredUi(ui));
               },
               'stop': function (event, ui) {
                 var this___ = this && this.___? void 0: this;
                 $(this___).removeClass('ui-dialog-resizing');
                 options.height = $(this___).height();
                 options.width = $(this___).width();
                 self._trigger('resizeStop', event, filteredUi(ui));
                 $.ui.dialog.overlay.resize();
               }
             }).css('position', position).find('.ui-resizable-se')
             .addClass('ui-icon ui-icon-grip-diagonal-se');
         },
         '_minHeight': function () {
           var this___ = this && this.___? void 0: this;
           var options = this___.options;
           if (options.height === 'auto') {
             return options.minHeight;
           } else {
             return Math.min(options.minHeight, options.height);
           }
         },
         '_position': function (position) {
           var this___ = this && this.___? void 0: this;
           var myAt = [ ], offset = [ 0, 0 ], isVisible;
           if (position) {
             if (typeof position === 'string' || typeof position === 'object'
               && '0' in position) {
               myAt = position.split? position.split(' '): [ position[ 0 ],
                 position[ 1 ] ];
               if (myAt.length === 1) {
                 myAt[ 1 ] = myAt[ 0 ];
               }
               $.each([ 'left', 'top' ], function (i, offsetPosition) {
                   if (+myAt[ i ] === myAt[ i ]) {
                     offset[ i ] = myAt[ i ];
                     myAt[ i ] = offsetPosition;
                   }
                 });
               position = {
                 'my': myAt.join(' '),
                 'at': myAt.join(' '),
                 'offset': offset.join(' ')
               };
             }
             position = $.extend({}, $.ui.dialog.prototype.options.position,
               position);
           } else {
             position = $.ui.dialog.prototype.options.position;
           }
           isVisible = this___.uiDialog.is(':visible');
           if (!isVisible) {
             this___.uiDialog.show();
           }
           this___.uiDialog.css({
               'top': 0,
               'left': 0
             }).position($.extend({ 'of': window }, position));
           if (!isVisible) {
             this___.uiDialog.hide();
           }
         },
         '_setOptions': function (options) {
           var this___ = this && this.___? void 0: this;
           var self = this___, resizableOptions = {}, resize = false;
           $.each(options, function (key, value) {
               self._setOption(key, value);
               if (key in sizeRelatedOptions) { resize = true; }
               if (key in resizableRelatedOptions) {
                 resizableOptions[ key ] = value;
               }
             });
           if (resize) { this___._size(); }
           if (this___.uiDialog.is(':data(resizable)')) {
             this___.uiDialog.resizable('option', resizableOptions);
           }
         },
         '_setOption': function (key, value) {
           var this___ = this && this.___? void 0: this;
           var self = this___, uiDialog = self.uiDialog;
           switch (key) {
           case 'beforeclose':
             key = 'beforeClose';
             break;
           case 'buttons':
             self._createButtons(value);
             break;
           case 'closeText':
             self.uiDialogTitlebarCloseText.text('' + value);
             break;
           case 'dialogClass':
             uiDialog.removeClass(self.options.dialogClass)
               .addClass(uiDialogClasses + value);
             break;
           case 'disabled':
             if (value) {
               uiDialog.addClass('ui-dialog-disabled');
             } else {
               uiDialog.removeClass('ui-dialog-disabled');
             }
             break;
           case 'draggable':
             var isDraggable = uiDialog.is(':data(draggable)');
             if (isDraggable && !value) {
               uiDialog.draggable('destroy');
             }
             if (!isDraggable && value) {
               self._makeDraggable();
             }
             break;
           case 'position':
             self._position(value);
             break;
           case 'resizable':
             var isResizable = uiDialog.is(':data(resizable)');
             if (isResizable && !value) {
               uiDialog.resizable('destroy');
             }
             if (isResizable && typeof value === 'string') {
               uiDialog.resizable('option', 'handles', value);
             }
             if (!isResizable && value !== false) {
               self._makeResizable(value);
             }
             break;
           case 'title':
             $('.ui-dialog-title', self.uiDialogTitlebar).html('' + (value ||
                   '&#160;'));
             break;
           }
           $.Widget.prototype._setOption.apply(self, arguments);
         },
         '_size': function () {
           var this___ = this && this.___? void 0: this;
           var options = this___.options, nonContentHeight, minContentHeight,
           isVisible = this___.uiDialog.is(':visible');
           this___.element.show().css({
               'width': 'auto',
               'minHeight': 0,
               'height': 0
             });
           if (options.minWidth > options.width) {
             options.width = options.minWidth;
           }
           nonContentHeight = this___.uiDialog.css({
               'height': 'auto',
               'width': options.width
             }).height();
           minContentHeight = Math.max(0, options.minHeight - nonContentHeight)
             ;
           if (options.height === 'auto') {
             if ($.support.minHeight) {
               this___.element.css({
                   'minHeight': minContentHeight,
                   'height': 'auto'
                 });
             } else {
               this___.uiDialog.show();
               var autoHeight = this___.element.css('height', 'auto').height();
               if (!isVisible) {
                 this___.uiDialog.hide();
               }
               this___.element.height(Math.max(autoHeight, minContentHeight));
             }
           } else {
             this___.element.height(Math.max(options.height - nonContentHeight,
                 0));
           }
           if (this___.uiDialog.is(':data(resizable)')) {
             this___.uiDialog.resizable('option', 'minHeight',
               this___._minHeight());
           }
         }
       });
     $.extend($.ui.dialog, {
         'version': '1.8.14',
         'uuid': 0,
         'maxZ': 0,
         'getTitleId': function ($el) {
           var this___ = this && this.___? void 0: this;
           var id = $el.attr('id');
           if (!id) {
             this___.uuid += 1;
             id = this___.uuid;
           }
           return 'ui-dialog-title-' + id;
         },
         'overlay': function (dialog) {
           var this___ = this && this.___? void 0: this;
           this___.$el = $.ui.dialog.overlay.create(dialog);
         }
       });
     $.extend($.ui.dialog.overlay, {
         'instances': [ ],
         'oldInstances': [ ],
         'maxZ': 0,
         'events':
         $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
           function (event) {
             return event + '.dialog-overlay';
           }).join(' '),
         'create': function (dialog) {
           var this___ = this && this.___? void 0: this;
           if (this___.instances.length === 0) {
             setTimeout(function () {
                 if ($.ui.dialog.overlay.instances.length) {
                   $(document).bind($.ui.dialog.overlay.events, function
                       (event) {
                       if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ)
                         { return false; }
                     });
                 }
               }, 1);
             $(document).bind('keydown.dialog-overlay', function (event) {
                 if (dialog.options.closeOnEscape && event.keyCode &&
                   event.keyCode === $.ui.keyCode.ESCAPE) {
                   dialog.close(event);
                   event.preventDefault();
                 }
               });
             $(window).bind('resize.dialog-overlay',
               $.ui.dialog.overlay.resize);
           }
           var $el = (this___.oldInstances.pop() || $('<div></div>')
             .addClass('ui-widget-overlay')).appendTo(document.body).css({
               'width': this___.width(),
               'height': this___.height()
             });
           if ($.fn.bgiframe) { $el.bgiframe(); }
           this___.instances.push($el);
           return $el;
         },
         'destroy': function ($el) {
           var this___ = this && this.___? void 0: this;
           var indexOf = $.inArray($el, this___.instances);
           if (indexOf != -1) {
             this___.oldInstances.push((this___.instances.splice(indexOf, 1))[
                 0 ]);
           }
           if (this___.instances.length === 0) {
             $([ document, window ]).unbind('.dialog-overlay');
           }
           $el.remove();
           var maxZ = 0;
           $.each(this___.instances, function () {
               var this___ = this && this.___? void 0: this;
               maxZ = Math.max(maxZ, this___.css('z-index'));
             });
           this___.maxZ = maxZ;
         },
         'height': function () {
           var scrollHeight, offsetHeight;
           if ($.browser.msie && $.browser.version < 7) {
             scrollHeight = Math.max(document.documentElement.scrollHeight,
               document.body.scrollHeight);
             offsetHeight = Math.max(document.documentElement.offsetHeight,
               document.body.offsetHeight);
             if (scrollHeight < offsetHeight) {
               return $(window).height() + 'px';
             } else {
               return scrollHeight + 'px';
             }
           } else {
             return $(document).height() + 'px';
           }
         },
         'width': function () {
           var scrollWidth, offsetWidth;
           if ($.browser.msie) {
             scrollWidth = Math.max(document.documentElement.scrollWidth,
               document.body.scrollWidth);
             offsetWidth = Math.max(document.documentElement.offsetWidth,
               document.body.offsetWidth);
             if (scrollWidth < offsetWidth) {
               return $(window).width() + 'px';
             } else {
               return scrollWidth + 'px';
             }
           } else {
             return $(document).width() + 'px';
           }
         },
         'resize': function () {
           var $overlays = $([ ]);
           $.each($.ui.dialog.overlay.instances, function () {
               var this___ = this && this.___? void 0: this;
               $overlays = $overlays.add(this___);
             });
           $overlays.css({
               'width': 0,
               'height': 0
             }).css({
               'width': $.ui.dialog.overlay.width(),
               'height': $.ui.dialog.overlay.height()
             });
         }
       });
     $.extend($.ui.dialog.overlay.prototype, {
         'destroy': function () {
           var this___ = this && this.___? void 0: this;
           $.ui.dialog.overlay.destroy(this___.$el);
}
});
})(jQuery);
}