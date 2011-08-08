{
  (function ($, undefined) {
     $.ui = $.ui || {};
     var horizontalPositions = /left|center|right/, verticalPositions =
       /top|center|bottom/, center = 'center', _position = $.fn.position,
     _offset = $.fn.offset;
     $.fn.position = function (options) {
       var this___ = this && this.___? void 0: this;
       if (!options || !options.of) {
         return _position.apply(this___, arguments);
       }
       options = $.extend({}, options);
       var target = $(options.of), targetElem = target[ 0 ], collision =
         (options.collision || 'flip').split(' '), offset = options.offset?
         options.offset.split(' '): [ 0, 0 ], targetWidth, targetHeight,
       basePosition;
       if (targetElem.nodeType === 9) {
         targetWidth = target.width();
         targetHeight = target.height();
         basePosition = {
           'top': 0,
           'left': 0
         };
       } else if (targetElem.setTimeout) {
         targetWidth = target.width();
         targetHeight = target.height();
         basePosition = {
           'top': target.scrollTop(),
           'left': target.scrollLeft()
         };
       } else if (targetElem.preventDefault) {
         options.at = 'left top';
         targetWidth = targetHeight = 0;
         basePosition = {
           'top': options.of.pageY,
           'left': options.of.pageX
         };
       } else {
         targetWidth = target.outerWidth();
         targetHeight = target.outerHeight();
         basePosition = target.offset();
       }
       $.each([ 'my', 'at' ], function () {
           var this___ = this && this.___? void 0: this;
           var pos = (options[ this___ ] || '').split(' ');
           if (pos.length === 1) {
             pos = horizontalPositions.test(pos[ 0 ]) ? pos.concat([ center ]):
             verticalPositions.test(pos[ 0 ]) ? [ center ].concat(pos): [
               center, center ];
           }
           pos[ 0 ] = horizontalPositions.test(pos[ 0 ]) ? pos[ 0 ]: center;
           pos[ 1 ] = verticalPositions.test(pos[ 1 ]) ? pos[ 1 ]: center;
           options[ this___ ] = pos;
         });
       if (collision.length === 1) {
         collision[ 1 ] = collision[ 0 ];
       }
       offset[ 0 ] = parseInt(offset[ 0 ], 10) || 0;
       if (offset.length === 1) {
         offset[ 1 ] = offset[ 0 ];
       }
       offset[ 1 ] = parseInt(offset[ 1 ], 10) || 0;
       if (options.at[ 0 ] === 'right') {
         basePosition.left += targetWidth;
       } else if (options.at[ 0 ] === center) {
         basePosition.left += targetWidth / 2;
       }
       if (options.at[ 1 ] === 'bottom') {
         basePosition.top += targetHeight;
       } else if (options.at[ 1 ] === center) {
         basePosition.top += targetHeight / 2;
       }
       basePosition.left += offset[ 0 ];
       basePosition.top += offset[ 1 ];
       return this___.each(function () {
           var this___ = this && this.___? void 0: this;
           var elem = $(this___), elemWidth = elem.outerWidth(), elemHeight =
             elem.outerHeight(), marginLeft = parseInt($.curCSS(this___,
               'marginLeft', true)) || 0, marginTop =
             parseInt($.curCSS(this___, 'marginTop', true)) || 0,
           collisionWidth = elemWidth + marginLeft +
             (parseInt($.curCSS(this___, 'marginRight', true)) || 0),
           collisionHeight = elemHeight + marginTop +
             (parseInt($.curCSS(this___, 'marginBottom', true)) || 0), position
             = $.extend({}, basePosition), collisionPosition;
           if (options.my[ 0 ] === 'right') {
             position.left -= elemWidth;
           } else if (options.my[ 0 ] === center) {
             position.left -= elemWidth / 2;
           }
           if (options.my[ 1 ] === 'bottom') {
             position.top -= elemHeight;
           } else if (options.my[ 1 ] === center) {
             position.top -= elemHeight / 2;
           }
           position.left = Math.round(position.left);
           position.top = Math.round(position.top);
           collisionPosition = {
             'left': position.left - marginLeft,
             'top': position.top - marginTop
           };
           $.each([ 'left', 'top' ], function (i, dir) {
               if ($.ui.position[ collision[ i ] ]) {
                 $.ui.position[ collision[ i ] ] [ dir ] (position, {
                     'targetWidth': targetWidth,
                     'targetHeight': targetHeight,
                     'elemWidth': elemWidth,
                     'elemHeight': elemHeight,
                     'collisionPosition': collisionPosition,
                     'collisionWidth': collisionWidth,
                     'collisionHeight': collisionHeight,
                     'offset': offset,
                     'my': options.my,
                     'at': options.at
                   });
               }
             });
           if ($.fn.bgiframe) { elem.bgiframe(); }
           elem.offset($.extend(position, {
                 'using': options.using
               }));
         });
     };
     $.ui.position = {
       'fit': {
         'left': function (position, data) {
           var win = $(window), over = data.collisionPosition.left +
             data.collisionWidth - win.width() - win.scrollLeft();
           position.left = over > 0? position.left - over:
           Math.max(position.left - data.collisionPosition.left, position.left)
             ;
         },
         'top': function (position, data) {
           var win = $(window), over = data.collisionPosition.top +
             data.collisionHeight - win.height() - win.scrollTop();
           position.top = over > 0? position.top - over: Math.max(position.top
             - data.collisionPosition.top, position.top);
         }
       },
       'flip': {
         'left': function (position, data) {
           if (data.at[ 0 ] === center) { return; }
           var win = $(window), over = data.collisionPosition.left +
             data.collisionWidth - win.width() - win.scrollLeft(), myOffset =
             data.my[ 0 ] === 'left'? -data.elemWidth: data.my[ 0 ] ===
             'right'? data.elemWidth: 0, atOffset = data.at[ 0 ] === 'left'?
             data.targetWidth: -data.targetWidth, offset = -2 * data.offset[ 0
           ];
           position.left += data.collisionPosition.left < 0? myOffset +
             atOffset + offset: over > 0? myOffset + atOffset + offset: 0;
         },
         'top': function (position, data) {
           if (data.at[ 1 ] === center) { return; }
           var win = $(window), over = data.collisionPosition.top +
             data.collisionHeight - win.height() - win.scrollTop(), myOffset =
             data.my[ 1 ] === 'top'? -data.elemHeight: data.my[ 1 ] ===
             'bottom'? data.elemHeight: 0, atOffset = data.at[ 1 ] === 'top'?
             data.targetHeight: -data.targetHeight, offset = -2 * data.offset[
             1 ];
           position.top += data.collisionPosition.top < 0? myOffset + atOffset
             + offset: over > 0? myOffset + atOffset + offset: 0;
         }
       }
     };
     if (!$.offset.setOffset) {
       $.offset.setOffset = function (elem, options) {
         if (/static/.test($.curCSS(elem, 'position'))) {
           elem.style.position = 'relative';
         }
         var curElem = $(elem), curOffset = curElem.offset(), curTop =
           parseInt($.curCSS(elem, 'top', true), 10) || 0, curLeft =
           parseInt($.curCSS(elem, 'left', true), 10) || 0, props = {
           'top': options.top - curOffset.top + curTop,
           'left': options.left - curOffset.left + curLeft
         };
         if ('using' in options) {
           options.using.call(elem, props);
         } else {
           curElem.css(props);
         }
       };
       $.fn.offset = function (options) {
         var this___ = this && this.___? void 0: this;
         var elem = this___[ 0 ];
         if (!elem || !elem.ownerDocument) { return null; }
         if (options) {
           return this___.each(function () {
               var this___ = this && this.___? void 0: this;
               $.offset.setOffset(this___, options);
             });
         }
         return _offset.call(this___);
       };
     }
   })(jQuery);
}