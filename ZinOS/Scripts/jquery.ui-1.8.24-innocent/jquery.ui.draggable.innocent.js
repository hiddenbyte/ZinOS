{
  (function ($, undefined) {
     $.widget('ui.draggable', $.ui.mouse, {
         'widgetEventPrefix': 'drag',
         'options': {
           'addClasses': true,
           'appendTo': 'parent',
           'axis': false,
           'connectToSortable': false,
           'containment': false,
           'cursor': 'auto',
           'cursorAt': false,
           'grid': false,
           'handle': false,
           'helper': 'original',
           'iframeFix': false,
           'opacity': false,
           'refreshPositions': false,
           'revert': false,
           'revertDuration': 500,
           'scope': 'default',
           'scroll': true,
           'scrollSensitivity': 20,
           'scrollSpeed': 20,
           'snap': false,
           'snapMode': 'both',
           'snapTolerance': 20,
           'stack': false,
           'zIndex': false
         },
         '_create': function () {
           var this___ = this && this.___? void 0: this;
           if (this___.options.helper == 'original' &&
             !/^(?:r|a|f)/.test(this___.element.css('position')))
             this___.element[ 0 ].style.position = 'relative';
           this___.options.addClasses &&
             this___.element.addClass('ui-draggable');
           this___.options.disabled &&
             this___.element.addClass('ui-draggable-disabled');
           this___._mouseInit();
         },
         'destroy': function () {
           var this___ = this && this.___? void 0: this;
           if (!this___.element.data('draggable')) return;
           this___.element.removeData('draggable').unbind('.draggable')
             .removeClass('ui-draggable' + ' ui-draggable-dragging' +
             ' ui-draggable-disabled');
           this___._mouseDestroy();
           return this___;
         },
         '_mouseCapture': function (event) {
           var this___ = this && this.___? void 0: this;
           var o = this___.options;
           if (this___.helper || o.disabled || $(event.target)
             .is('.ui-resizable-handle')) return false;
           this___.handle = this___._getHandle(event);
           if (!this___.handle) return false;
           $(o.iframeFix === true ? 'iframe': o.iframeFix).each(function () {
               var this___ = this && this.___? void 0: this;
               $('<div class=\"ui-draggable-iframeFix\" style=\"background: #fff;\"></div>')
                 .css({
                   'width': this___.offsetWidth + 'px',
                   'height': this___.offsetHeight + 'px',
                   'position': 'absolute',
                   'opacity': '0.001',
                   'zIndex': 1000
                 }).css($(this___).offset()).appendTo('body');
             });
           return true;
         },
         '_mouseStart': function (event) {
           var this___ = this && this.___? void 0: this;
           var o = this___.options;
           this___.helper = this___._createHelper(event);
           this___._cacheHelperProportions();
           if ($.ui.ddmanager) $.ui.ddmanager.current = this___;
           this___._cacheMargins();
           this___.cssPosition = this___.helper.css('position');
           this___.scrollParent = this___.helper.scrollParent();
           this___.offset = this___.positionAbs = this___.element.offset();
           this___.offset = {
             'top': this___.offset.top - this___.margins.top,
             'left': this___.offset.left - this___.margins.left
           };
           $.extend(this___.offset, {
               'click': {
                 'left': event.pageX - this___.offset.left,
                 'top': event.pageY - this___.offset.top
               },
               'parent': this___._getParentOffset(),
               'relative': this___._getRelativeOffset()
             });
           this___.originalPosition = this___.position =
             this___._generatePosition(event);
           this___.originalPageX = event.pageX;
           this___.originalPageY = event.pageY;
           o.cursorAt && this___._adjustOffsetFromHelper(o.cursorAt);
           if (o.containment) this___._setContainment();
           if (this___._trigger('start', event) === false) {
             this___._clear();
             return false;
           }
           this___._cacheHelperProportions();
           if ($.ui.ddmanager && !o.dropBehaviour)
             $.ui.ddmanager.prepareOffsets(this___, event);
           this___.helper.addClass('ui-draggable-dragging');
           this___._mouseDrag(event, true);
           if ($.ui.ddmanager) $.ui.ddmanager.dragStart(this___, event);
           return true;
         },
         '_mouseDrag': function (event, noPropagation) {
           var this___ = this && this.___? void 0: this;
           this___.position = this___._generatePosition(event);
           this___.positionAbs = this___._convertPositionTo('absolute');
           if (!noPropagation) {
             var ui = this___._uiHash();
             if (this___._trigger('drag', event, ui) === false) {
               this___._mouseUp({});
               return false;
             }
             this___.position = ui.position;
           }
           if (!this___.options.axis || this___.options.axis != 'y')
             this___.helper[ 0 ].style.left = this___.position.left + 'px';
           if (!this___.options.axis || this___.options.axis != 'x')
             this___.helper[ 0 ].style.top = this___.position.top + 'px';
           if ($.ui.ddmanager) $.ui.ddmanager.drag(this___, event);
           return false;
         },
         '_mouseStop': function (event) {
           var this___ = this && this.___? void 0: this;
           var dropped = false;
           if ($.ui.ddmanager && !this___.options.dropBehaviour) dropped =
             $.ui.ddmanager.drop(this___, event);
           if (this___.dropped) {
             dropped = this___.dropped;
             this___.dropped = false;
           }
           if ((!this___.element[ 0 ] || !this___.element[ 0 ].parentNode) &&
             this___.options.helper == 'original') return false;
           if (this___.options.revert == 'invalid' && !dropped ||
             this___.options.revert == 'valid' && dropped ||
             this___.options.revert === true ||
             $.isFunction(this___.options.revert) &&
             this___.options.revert.call(this___.element, dropped)) {
             var self = this___;
             $(this___.helper).animate(this___.originalPosition,
               parseInt(this___.options.revertDuration, 10), function () {
                 if (self._trigger('stop', event) !== false) { self._clear(); }
               });
           } else {
             if (this___._trigger('stop', event) !== false) { this___._clear();
             }
           }
           return false;
         },
         '_mouseUp': function (event) {
           var this___ = this && this.___? void 0: this;
           if (this___.options.iframeFix === true) {
             $('div.ui-draggable-iframeFix').each(function () {
                 var this___ = this && this.___? void 0: this;
                 this___.parentNode.removeChild(this___);
               });
           }
           if ($.ui.ddmanager) $.ui.ddmanager.dragStop(this___, event);
           return $.ui.mouse.prototype._mouseUp.call(this___, event);
         },
         'cancel': function () {
           var this___ = this && this.___? void 0: this;
           if (this___.helper.is('.ui-draggable-dragging')) {
             this___._mouseUp({});
           } else { this___._clear(); }
           return this___;
         },
         '_getHandle': function (event) {
           var this___ = this && this.___? void 0: this;
           var handle = !this___.options.handle || !$(this___.options.handle,
             this___.element).length? true: false;
           $(this___.options.handle, this___.element).find('*').andSelf()
             .each(function () {
               var this___ = this && this.___? void 0: this;
               if (this___ == event.target) handle = true;
             });
           return handle;
         },
         '_createHelper': function (event) {
           var this___ = this && this.___? void 0: this;
           var o = this___.options;
           var helper = $.isFunction(o.helper) ?
             $(o.helper.apply(this___.element[ 0 ], [ event ])): o.helper ==
             'clone'? this___.element.clone().removeAttr('id'):
           this___.element;
           if (!helper.parents('body').length) helper.appendTo(o.appendTo ==
             'parent'? this___.element[ 0 ].parentNode: o.appendTo);
           if (helper[ 0 ] != this___.element[ 0 ] &&
               !/(fixed|absolute)/.test(helper.css('position')))
             helper.css('position', 'absolute');
           return helper;
         },
         '_adjustOffsetFromHelper': function (obj) {
           var this___ = this && this.___? void 0: this;
           if (typeof obj == 'string') {
             obj = obj.split(' ');
           }
           if ($.isArray(obj)) {
             obj = {
               'left': +obj[ 0 ],
               'top': +obj[ 1 ] || 0
             };
           }
           if ('left' in obj) {
             this___.offset.click.left = obj.left + this___.margins.left;
           }
           if ('right' in obj) {
             this___.offset.click.left = this___.helperProportions.width -
               obj.right + this___.margins.left;
           }
           if ('top' in obj) {
             this___.offset.click.top = obj.top + this___.margins.top;
           }
           if ('bottom' in obj) {
             this___.offset.click.top = this___.helperProportions.height -
               obj.bottom + this___.margins.top;
           }
         },
         '_getParentOffset': function () {
           var this___ = this && this.___? void 0: this;
           this___.offsetParent = this___.helper.offsetParent();
           var po = this___.offsetParent.offset();
           if (this___.cssPosition == 'absolute' && this___.scrollParent[ 0 ]
             != document && $.ui.contains(this___.scrollParent[ 0 ],
               this___.offsetParent[ 0 ])) {
             po.left += this___.scrollParent.scrollLeft();
             po.top += this___.scrollParent.scrollTop();
           }
           if (this___.offsetParent[ 0 ] == document.body ||
             this___.offsetParent[ 0 ].tagName && this___.offsetParent[ 0 ]
             .tagName.toLowerCase() == 'html' && $.browser.msie) po = {
             'top': 0,
             'left': 0
           };
           return {
             'top': po.top +
               (parseInt(this___.offsetParent.css('borderTopWidth'), 10) || 0),
             'left': po.left +
               (parseInt(this___.offsetParent.css('borderLeftWidth'), 10) || 0)
           };
         },
         '_getRelativeOffset': function () {
           var this___ = this && this.___? void 0: this;
           if (this___.cssPosition == 'relative') {
             var p = this___.element.position();
             return {
               'top': p.top - (parseInt(this___.helper.css('top'), 10) || 0) +
                 this___.scrollParent.scrollTop(),
               'left': p.left - (parseInt(this___.helper.css('left'), 10) || 0)
                 + this___.scrollParent.scrollLeft()
             };
           } else {
             return {
               'top': 0,
               'left': 0
             };
           }
         },
         '_cacheMargins': function () {
           var this___ = this && this.___? void 0: this;
           this___.margins = {
             'left': parseInt(this___.element.css('marginLeft'), 10) || 0,
             'top': parseInt(this___.element.css('marginTop'), 10) || 0,
             'right': parseInt(this___.element.css('marginRight'), 10) || 0,
             'bottom': parseInt(this___.element.css('marginBottom'), 10) || 0
           };
         },
         '_cacheHelperProportions': function () {
           var this___ = this && this.___? void 0: this;
           this___.helperProportions = {
             'width': this___.helper.outerWidth(),
             'height': this___.helper.outerHeight()
           };
         },
         '_setContainment': function () {
           var this___ = this && this.___? void 0: this;
           var o = this___.options;
           if (o.containment == 'parent') o.containment = this___.helper[ 0 ]
             .parentNode;
           if (o.containment == 'document' || o.containment == 'window')
             this___.containment = [ o.containment == 'document'? 0: $(window)
               .scrollLeft() - this___.offset.relative.left -
               this___.offset.parent.left, o.containment == 'document'? 0:
             $(window).scrollTop() - this___.offset.relative.top -
               this___.offset.parent.top, (o.containment == 'document'? 0:
               $(window).scrollLeft()) + $(o.containment == 'document'?
               document: window).width() - this___.helperProportions.width -
               this___.margins.left, (o.containment == 'document'? 0: $(window)
               .scrollTop()) + ($(o.containment == 'document'? document:
                 window).height() || document.body.parentNode.scrollHeight) -
               this___.helperProportions.height - this___.margins.top ];
           if (!/^(document|window|parent)$/.test(o.containment) &&
             o.containment.constructor != Array) {
             var c = $(o.containment);
             var ce = c[ 0 ];
             if (!ce) return;
             var co = c.offset();
             var over = $(ce).css('overflow') != 'hidden';
             this___.containment = [ (parseInt($(ce).css('borderLeftWidth'),
                   10) || 0) + (parseInt($(ce).css('paddingLeft'), 10) || 0),
               (parseInt($(ce).css('borderTopWidth'), 10) || 0) +
               (parseInt($(ce).css('paddingTop'), 10) || 0), (over?
                 Math.max(ce.scrollWidth, ce.offsetWidth): ce.offsetWidth) -
               (parseInt($(ce).css('borderLeftWidth'), 10) || 0) -
               (parseInt($(ce).css('paddingRight'), 10) || 0) -
               this___.helperProportions.width - this___.margins.left -
               this___.margins.right, (over? Math.max(ce.scrollHeight,
                   ce.offsetHeight): ce.offsetHeight) - (parseInt($(ce)
                   .css('borderTopWidth'), 10) || 0) - (parseInt($(ce)
                   .css('paddingBottom'), 10) || 0) -
               this___.helperProportions.height - this___.margins.top -
               this___.margins.bottom ];
             this___.relative_container = c;
           } else if (o.containment.constructor == Array) {
             this___.containment = o.containment;
           }
         },
         '_convertPositionTo': function (d, pos) {
           var this___ = this && this.___? void 0: this;
           if (!pos) pos = this___.position;
           var mod = d == 'absolute'? 1: -1;
           var o = this___.options, scroll = this___.cssPosition == 'absolute'
             && ! (this___.scrollParent[ 0 ] != document &&
             $.ui.contains(this___.scrollParent[ 0 ], this___.offsetParent[ 0 ]
             )) ? this___.offsetParent: this___.scrollParent, scrollIsRootNode
             = /(html|body)/i.test(scroll[ 0 ].tagName);
           return {
             'top': pos.top + this___.offset.relative.top * mod +
               this___.offset.parent.top * mod - ($.browser.safari &&
               $.browser.version < 526 && this___.cssPosition == 'fixed'? 0:
               (this___.cssPosition == 'fixed'?
                -this___.scrollParent.scrollTop(): scrollIsRootNode? 0:
                scroll.scrollTop()) * mod),
             'left': pos.left + this___.offset.relative.left * mod +
               this___.offset.parent.left * mod - ($.browser.safari &&
               $.browser.version < 526 && this___.cssPosition == 'fixed'? 0:
               (this___.cssPosition == 'fixed'?
                -this___.scrollParent.scrollLeft(): scrollIsRootNode? 0:
                scroll.scrollLeft()) * mod)
           };
         },
         '_generatePosition': function (event) {
           var this___ = this && this.___? void 0: this;
           var o = this___.options, scroll = this___.cssPosition == 'absolute'
             && ! (this___.scrollParent[ 0 ] != document &&
             $.ui.contains(this___.scrollParent[ 0 ], this___.offsetParent[ 0 ]
             )) ? this___.offsetParent: this___.scrollParent, scrollIsRootNode
             = /(html|body)/i.test(scroll[ 0 ].tagName);
           var pageX = event.pageX;
           var pageY = event.pageY;
           if (this___.originalPosition) {
             var containment;
             if (this___.containment) {
               if (this___.relative_container) {
                 var co = this___.relative_container.offset();
                 containment = [ this___.containment[ 0 ] + co.left,
                   this___.containment[ 1 ] + co.top, this___.containment[ 2 ]
                     + co.left, this___.containment[ 3 ] + co.top ];
               } else {
                 containment = this___.containment;
               }
               if (event.pageX - this___.offset.click.left < containment[ 0 ])
                 pageX = containment[ 0 ] + this___.offset.click.left;
               if (event.pageY - this___.offset.click.top < containment[ 1 ])
                 pageY = containment[ 1 ] + this___.offset.click.top;
               if (event.pageX - this___.offset.click.left > containment[ 2 ])
                 pageX = containment[ 2 ] + this___.offset.click.left;
               if (event.pageY - this___.offset.click.top > containment[ 3 ])
                 pageY = containment[ 3 ] + this___.offset.click.top;
             }
             if (o.grid) {
               var top = o.grid[ 1 ] ? this___.originalPageY +
                 Math.round((pageY - this___.originalPageY) / o.grid[ 1 ]) *
                 o.grid[ 1 ]: this___.originalPageY;
               pageY = containment? ! (top - this___.offset.click.top <
                 containment[ 1 ] || top - this___.offset.click.top >
                 containment[ 3 ]) ? top: ! (top - this___.offset.click.top <
                 containment[ 1 ]) ? top - o.grid[ 1 ]: top + o.grid[ 1 ]: top;
               var left = o.grid[ 0 ] ? this___.originalPageX +
                 Math.round((pageX - this___.originalPageX) / o.grid[ 0 ]) *
                 o.grid[ 0 ]: this___.originalPageX;
               pageX = containment? ! (left - this___.offset.click.left <
                 containment[ 0 ] || left - this___.offset.click.left >
                 containment[ 2 ]) ? left: ! (left - this___.offset.click.left
                 < containment[ 0 ]) ? left - o.grid[ 0 ]: left + o.grid[ 0 ]:
               left;
             }
           }
           return {
             'top': pageY - this___.offset.click.top -
               this___.offset.relative.top - this___.offset.parent.top +
               ($.browser.safari && $.browser.version < 526 &&
               this___.cssPosition == 'fixed'? 0: this___.cssPosition ==
               'fixed'? -this___.scrollParent.scrollTop(): scrollIsRootNode? 0:
               scroll.scrollTop()),
             'left': pageX - this___.offset.click.left -
               this___.offset.relative.left - this___.offset.parent.left +
               ($.browser.safari && $.browser.version < 526 &&
               this___.cssPosition == 'fixed'? 0: this___.cssPosition ==
               'fixed'? -this___.scrollParent.scrollLeft(): scrollIsRootNode?
               0: scroll.scrollLeft())
           };
         },
         '_clear': function () {
           var this___ = this && this.___? void 0: this;
           this___.helper.removeClass('ui-draggable-dragging');
           if (this___.helper[ 0 ] != this___.element[ 0 ] &&
             !this___.cancelHelperRemoval) this___.helper.remove();
           this___.helper = null;
           this___.cancelHelperRemoval = false;
         },
         '_trigger': function (type, event, ui) {
           var this___ = this && this.___? void 0: this;
           ui = ui || this___._uiHash();
           $.ui.plugin.call(this___, type, [ event, ui ]);
           if (type == 'drag') this___.positionAbs =
             this___._convertPositionTo('absolute');
           return $.Widget.prototype._trigger.call(this___, type, event, ui);
         },
         'plugins': {},
         '_uiHash': function (event) {
           var this___ = this && this.___? void 0: this;
           return {
             'helper': this___.helper,
             'position': this___.position,
             'originalPosition': this___.originalPosition,
             'offset': this___.positionAbs
           };
         }
       });
     $.extend($.ui.draggable, {
         'version': '1.8.14'
       });
     $.ui.plugin.add('draggable', 'connectToSortable', {
         'start': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var inst = $(this___).data('draggable'), o = inst.options,
           uiSortable = $.extend({}, ui, {
               'item': inst.element
             });
           inst.sortables = [ ];
           $(o.connectToSortable).each(function () {
               var this___ = this && this.___? void 0: this;
               var sortable = $.data(this___, 'sortable');
               if (sortable && !sortable.options.disabled) {
                 inst.sortables.push({
                     'instance': sortable,
                     'shouldRevert': sortable.options.revert
                   });
                 sortable.refreshPositions();
                 sortable._trigger('activate', event, uiSortable);
               }
             });
         },
         'stop': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var inst = $(this___).data('draggable'), uiSortable = $.extend({},
             ui, {
               'item': inst.element
             });
           $.each(inst.sortables, function () {
               var this___ = this && this.___? void 0: this;
               if (this___.instance.isOver) {
                 this___.instance.isOver = 0;
                 inst.cancelHelperRemoval = true;
                 this___.instance.cancelHelperRemoval = false;
                 if (this___.shouldRevert) this___.instance.options.revert =
                   true;
                 this___.instance._mouseStop(event);
                 this___.instance.options.helper =
                   this___.instance.options._helper;
                 if (inst.options.helper == 'original')
                   this___.instance.currentItem.css({
                     'top': 'auto',
                     'left': 'auto'
                   });
               } else {
                 this___.instance.cancelHelperRemoval = false;
                 this___.instance._trigger('deactivate', event, uiSortable);
               }
             });
         },
         'drag': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var inst = $(this___).data('draggable'), self = this___;
           var checkPos = function (o) {
             var this___ = this && this.___? void 0: this;
             var dyClick = this___.offset.click.top, dxClick =
               this___.offset.click.left;
             var helperTop = this___.positionAbs.top, helperLeft =
               this___.positionAbs.left;
             var itemHeight = o.height, itemWidth = o.width;
             var itemTop = o.top, itemLeft = o.left;
             return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick,
               itemTop, itemLeft, itemHeight, itemWidth);
           };
           $.each(inst.sortables, function (i) {
               var this___ = this && this.___? void 0: this;
               this___.instance.positionAbs = inst.positionAbs;
               this___.instance.helperProportions = inst.helperProportions;
               this___.instance.offset.click = inst.offset.click;
               if
                 (this___.instance._intersectsWith(this___.instance.containerCache)
               ) {
                 if (!this___.instance.isOver) {
                   this___.instance.isOver = 1;
                   this___.instance.currentItem = $(self).clone()
                     .removeAttr('id').appendTo(this___.instance.element)
                     .data('sortable-item', true);
                   this___.instance.options._helper =
                     this___.instance.options.helper;
                   this___.instance.options.helper = function () {
                     return ui.helper[ 0 ];
                   };
                   event.target = this___.instance.currentItem[ 0 ];
                   this___.instance._mouseCapture(event, true);
                   this___.instance._mouseStart(event, true, true);
                   this___.instance.offset.click.top = inst.offset.click.top;
                   this___.instance.offset.click.left = inst.offset.click.left;
                   this___.instance.offset.parent.left -=
                     inst.offset.parent.left -
                     this___.instance.offset.parent.left;
                   this___.instance.offset.parent.top -= inst.offset.parent.top
                     - this___.instance.offset.parent.top;
                   inst._trigger('toSortable', event);
                   inst.dropped = this___.instance.element;
                   inst.currentItem = inst.element;
                   this___.instance.fromOutside = inst;
                 }
                 if (this___.instance.currentItem)
                   this___.instance._mouseDrag(event);
               } else {
                 if (this___.instance.isOver) {
                   this___.instance.isOver = 0;
                   this___.instance.cancelHelperRemoval = true;
                   this___.instance.options.revert = false;
                   this___.instance._trigger('out', event,
                     this___.instance._uiHash(this___.instance));
                   this___.instance._mouseStop(event, true);
                   this___.instance.options.helper =
                     this___.instance.options._helper;
                   this___.instance.currentItem.remove();
                   if (this___.instance.placeholder)
                     this___.instance.placeholder.remove();
                   inst._trigger('fromSortable', event);
                   inst.dropped = false;
                 }
               };
             });
         }
       });
     $.ui.plugin.add('draggable', 'cursor', {
         'start': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var t = $('body'), o = $(this___).data('draggable').options;
           if (t.css('cursor')) o._cursor = t.css('cursor');
           t.css('cursor', o.cursor);
         },
         'stop': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var o = $(this___).data('draggable').options;
           if (o._cursor) $('body').css('cursor', o._cursor);
         }
       });
     $.ui.plugin.add('draggable', 'opacity', {
         'start': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var t = $(ui.helper), o = $(this___).data('draggable').options;
           if (t.css('opacity')) o._opacity = t.css('opacity');
           t.css('opacity', o.opacity);
         },
         'stop': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var o = $(this___).data('draggable').options;
           if (o._opacity) $(ui.helper).css('opacity', o._opacity);
         }
       });
     $.ui.plugin.add('draggable', 'scroll', {
         'start': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var i = $(this___).data('draggable');
           if (i.scrollParent[ 0 ] != document && i.scrollParent[ 0 ].tagName
             != 'HTML') i.overflowOffset = i.scrollParent.offset();
         },
         'drag': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var i = $(this___).data('draggable'), o = i.options, scrolled =
             false;
           if (i.scrollParent[ 0 ] != document && i.scrollParent[ 0 ].tagName
             != 'HTML') {
             if (!o.axis || o.axis != 'x') {
               if (i.overflowOffset.top + i.scrollParent[ 0 ].offsetHeight -
                   event.pageY < o.scrollSensitivity) i.scrollParent[ 0 ]
                 .scrollTop = scrolled = i.scrollParent[ 0 ].scrollTop +
                 o.scrollSpeed;
               else if (event.pageY - i.overflowOffset.top <
                 o.scrollSensitivity) i.scrollParent[ 0 ].scrollTop = scrolled
                 = i.scrollParent[ 0 ].scrollTop - o.scrollSpeed;
             }
             if (!o.axis || o.axis != 'y') {
               if (i.overflowOffset.left + i.scrollParent[ 0 ].offsetWidth -
                   event.pageX < o.scrollSensitivity) i.scrollParent[ 0 ]
                 .scrollLeft = scrolled = i.scrollParent[ 0 ].scrollLeft +
                 o.scrollSpeed;
               else if (event.pageX - i.overflowOffset.left <
                 o.scrollSensitivity) i.scrollParent[ 0 ].scrollLeft = scrolled
                 = i.scrollParent[ 0 ].scrollLeft - o.scrollSpeed;
             }
           } else {
             if (!o.axis || o.axis != 'x') {
               if (event.pageY - $(document).scrollTop() < o.scrollSensitivity)
                 scrolled = $(document).scrollTop($(document).scrollTop() -
                   o.scrollSpeed);
               else if ($(window).height() - (event.pageY - $(document)
                   .scrollTop()) < o.scrollSensitivity) scrolled = $(document)
                 .scrollTop($(document).scrollTop() + o.scrollSpeed);
             }
             if (!o.axis || o.axis != 'y') {
               if (event.pageX - $(document).scrollLeft() <
                 o.scrollSensitivity) scrolled = $(document)
                 .scrollLeft($(document).scrollLeft() - o.scrollSpeed);
               else if ($(window).width() - (event.pageX - $(document)
                   .scrollLeft()) < o.scrollSensitivity) scrolled = $(document)
                 .scrollLeft($(document).scrollLeft() + o.scrollSpeed);
             }
           }
           if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
             $.ui.ddmanager.prepareOffsets(i, event);
         }
       });
     $.ui.plugin.add('draggable', 'snap', {
         'start': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var i = $(this___).data('draggable'), o = i.options;
           i.snapElements = [ ];
           $(o.snap.constructor != String? o.snap.items || ':data(draggable)':
             o.snap).each(function () {
               var this___ = this && this.___? void 0: this;
               var $t = $(this___);
               var $o = $t.offset();
               if (this___ != i.element[ 0 ]) i.snapElements.push({
                   'item': this___,
                   'width': $t.outerWidth(),
                   'height': $t.outerHeight(),
                   'top': $o.top,
                   'left': $o.left
                 });
             });
         },
         'drag': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var inst = $(this___).data('draggable'), o = inst.options;
           var d = o.snapTolerance;
           var x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width, y1
             = ui.offset.top, y2 = y1 + inst.helperProportions.height;
           for (var i = inst.snapElements.length - 1; i >= 0; i--) {
             var l = inst.snapElements[ i ].left, r = l + inst.snapElements[ i
             ].width, t = inst.snapElements[ i ].top, b = t +
               inst.snapElements[ i ].height;
             if (! (l - d < x1 && x1 < r + d && t - d < y1 && y1 < b + d || l -
                 d < x1 && x1 < r + d && t - d < y2 && y2 < b + d || l - d < x2
                 && x2 < r + d && t - d < y1 && y1 < b + d || l - d < x2 && x2
                 < r + d && t - d < y2 && y2 < b + d)) {
               if (inst.snapElements[ i ].snapping) inst.options.snap.release
                 && inst.options.snap.release.call(inst.element, event,
                 $.extend(inst._uiHash(), {
                     'snapItem': inst.snapElements[ i ].item
                   }));
               inst.snapElements[ i ].snapping = false;
               continue;
             }
             if (o.snapMode != 'inner') {
               var ts = Math.abs(t - y2) <= d;
               var bs = Math.abs(b - y1) <= d;
               var ls = Math.abs(l - x2) <= d;
               var rs = Math.abs(r - x1) <= d;
               if (ts) ui.position.top = inst._convertPositionTo('relative', {
                   'top': t - inst.helperProportions.height,
                   'left': 0
                 }).top - inst.margins.top;
               if (bs) ui.position.top = inst._convertPositionTo('relative', {
                   'top': b,
                   'left': 0
                 }).top - inst.margins.top;
               if (ls) ui.position.left = inst._convertPositionTo('relative', {
                   'top': 0,
                   'left': l - inst.helperProportions.width
                 }).left - inst.margins.left;
               if (rs) ui.position.left = inst._convertPositionTo('relative', {
                   'top': 0,
                   'left': r
                 }).left - inst.margins.left;
             }
             var first = ts || bs || ls || rs;
             if (o.snapMode != 'outer') {
               var ts = Math.abs(t - y1) <= d;
               var bs = Math.abs(b - y2) <= d;
               var ls = Math.abs(l - x1) <= d;
               var rs = Math.abs(r - x2) <= d;
               if (ts) ui.position.top = inst._convertPositionTo('relative', {
                   'top': t,
                   'left': 0
                 }).top - inst.margins.top;
               if (bs) ui.position.top = inst._convertPositionTo('relative', {
                   'top': b - inst.helperProportions.height,
                   'left': 0
                 }).top - inst.margins.top;
               if (ls) ui.position.left = inst._convertPositionTo('relative', {
                   'top': 0,
                   'left': l
                 }).left - inst.margins.left;
               if (rs) ui.position.left = inst._convertPositionTo('relative', {
                   'top': 0,
                   'left': r - inst.helperProportions.width
                 }).left - inst.margins.left;
             }
             if (!inst.snapElements[ i ].snapping && (ts || bs || ls || rs ||
                   first)) inst.options.snap.snap &&
               inst.options.snap.snap.call(inst.element, event,
               $.extend(inst._uiHash(), {
                   'snapItem': inst.snapElements[ i ].item
                 }));
             inst.snapElements[ i ].snapping = ts || bs || ls || rs || first;
           };
         }
       });
     $.ui.plugin.add('draggable', 'stack', {
         'start': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var o = $(this___).data('draggable').options;
           var group = $.makeArray($(o.stack)).sort(function (a, b) {
               return (parseInt($(a).css('zIndex'), 10) || 0) - (parseInt($(b)
                   .css('zIndex'), 10) || 0);
             });
           if (!group.length) { return; }
           var min = parseInt(group[ 0 ].style.zIndex) || 0;
           $(group).each(function (i) {
               var this___ = this && this.___? void 0: this;
               this___.style.zIndex = min + i;
             });
           this___[ 0 ].style.zIndex = min + group.length;
         }
       });
     $.ui.plugin.add('draggable', 'zIndex', {
         'start': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var t = $(ui.helper), o = $(this___).data('draggable').options;
           if (t.css('zIndex')) o._zIndex = t.css('zIndex');
           t.css('zIndex', o.zIndex);
         },
         'stop': function (event, ui) {
           var this___ = this && this.___? void 0: this;
           var o = $(this___).data('draggable').options;
           if (o._zIndex) $(ui.helper).css('zIndex', o._zIndex);
}
});
})(jQuery);
}