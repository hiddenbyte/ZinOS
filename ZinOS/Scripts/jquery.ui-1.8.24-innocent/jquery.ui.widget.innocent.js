{
  (function ($, undefined) {
     if ($.cleanData) {
       var _cleanData = $.cleanData;
       $.cleanData = function (elems) {
         for (var i = 0, elem; (elem = elems[ i ]) != null; i++) {
           $(elem).triggerHandler('remove');
         }
         _cleanData(elems);
       };
     } else {
       var _remove = $.fn.remove;
       $.fn.remove = function (selector, keepData) {
         var this___ = this && this.___? void 0: this;
         return this___.each(function () {
             var this___ = this && this.___? void 0: this;
             if (!keepData) {
               if (!selector || $.filter(selector, [ this___ ]).length) {
                 $('*', this___).add([ this___ ]).each(function () {
                     var this___ = this && this.___? void 0: this;
                     $(this___).triggerHandler('remove');
                   });
               }
             }
             return _remove.call($(this___), selector, keepData);
           });
       };
     }
     $.widget = function (name, base, prototype) {
       var namespace = (name.split('.'))[ 0 ], fullName;
       name = (name.split('.'))[ 1 ];
       fullName = namespace + '-' + name;
       if (!prototype) {
         prototype = base;
         base = $.Widget;
       }
       $.expr[ ':' ] [ fullName ] = function (elem) {
         return ! !$.data(elem, name);
       };
       $[ namespace ] = $[ namespace ] || {};
       $[ namespace ] [ name ] = function (options, element) {
         var this___ = this && this.___? void 0: this;
         if (arguments.length) {
           this___._createWidget(options, element);
         }
       };
       var basePrototype = new base();
       basePrototype.options = $.extend(true, {}, basePrototype.options);
       $[ namespace ] [ name ].prototype = $.extend(true, basePrototype, {
           'namespace': namespace,
           'widgetName': name,
           'widgetEventPrefix': $[ namespace ] [ name ]
             .prototype.widgetEventPrefix || name,
           'widgetBaseClass': fullName
         }, prototype);
       $.widget.bridge(name, $[ namespace ] [ name ]);
     };
     $.widget.bridge = function (name, object) {
       $.fn[ name ] = function (options) {
         var this___ = this && this.___? void 0: this;
         var isMethodCall = typeof options === 'string', args =
           Array.prototype.slice.call(arguments, 1), returnValue = this___;
         options = !isMethodCall && args.length? $.extend.apply(null, [ true,
             options ].concat(args)): options;
         if (isMethodCall && options.charAt(0) === '_') {
           return returnValue;
         }
         if (isMethodCall) {
           this___.each(function () {
               var this___ = this && this.___? void 0: this;
               var instance = $.data(this___, name), methodValue = instance &&
                 $.isFunction(instance[ options ]) ? instance[ options ]
                 .apply(instance, args): instance;
               if (methodValue !== instance && methodValue !== undefined) {
                 returnValue = methodValue;
                 return false;
               }
             });
         } else {
           this___.each(function () {
               var this___ = this && this.___? void 0: this;
               var instance = $.data(this___, name);
               if (instance) {
                 instance.option(options || {})._init();
               } else {
                 $.data(this___, name, new object(options, this___));
               }
             });
         }
         return returnValue;
       };
     };
     $.Widget = function (options, element) {
       var this___ = this && this.___? void 0: this;
       if (arguments.length) {
         this___._createWidget(options, element);
       }
     };
     $.Widget.prototype = {
       'widgetName': 'widget',
       'widgetEventPrefix': '',
       'options': { 'disabled': false },
       '_createWidget': function (options, element) {
         var this___ = this && this.___? void 0: this;
         $.data(element, this___.widgetName, this___);
         this___.element = $(element);
         this___.options = $.extend(true, {}, this___.options,
           this___._getCreateOptions(), options);
         var self = this___;
         this___.element.bind('remove.' + this___.widgetName, function () {
             self.destroy(); });
         this___._create();
         this___._trigger('create');
         this___._init();
       },
       '_getCreateOptions': function () {
         var this___ = this && this.___? void 0: this;
         return $.metadata && ($.metadata.get(this___.element[ 0 ]))[
           this___.widgetName ];
       },
       '_create': function () {},
       '_init': function () {},
       'destroy': function () {
         var this___ = this && this.___? void 0: this;
         this___.element.unbind('.' + this___.widgetName)
           .removeData(this___.widgetName);
         this___.widget().unbind('.' + this___.widgetName)
           .removeAttr('aria-disabled').removeClass(this___.widgetBaseClass +
           '-disabled ' + 'ui-state-disabled');
       },
       'widget': function () {
         var this___ = this && this.___? void 0: this;
         return this___.element;
       },
       'option': function (key, value) {
         var this___ = this && this.___? void 0: this;
         var options = key;
         if (arguments.length === 0) {
           return $.extend({}, this___.options);
         }
         if (typeof key === 'string') {
           if (value === undefined) {
             return this___.options[ key ];
           }
           options = {};
           options[ key ] = value;
         }
         this___._setOptions(options);
         return this___;
       },
       '_setOptions': function (options) {
         var this___ = this && this.___? void 0: this;
         var self = this___;
         $.each(options, function (key, value) {
             self._setOption(key, value);
           });
         return this___;
       },
       '_setOption': function (key, value) {
         var this___ = this && this.___? void 0: this;
         this___.options[ key ] = value;
         if (key === 'disabled') {
           (this___.widget())[ value? 'addClass': 'removeClass' ]
           (this___.widgetBaseClass + '-disabled' + ' ' + 'ui-state-disabled')
           .attr('aria-disabled', value);
         }
         return this___;
       },
       'enable': function () {
         var this___ = this && this.___? void 0: this;
         return this___._setOption('disabled', false);
       },
       'disable': function () {
         var this___ = this && this.___? void 0: this;
         return this___._setOption('disabled', true);
       },
       '_trigger': function (type, event, data) {
         var this___ = this && this.___? void 0: this;
         var callback = this___.options[ type ];
         event = $.Event(event);
         event.type = (type === this___.widgetEventPrefix? type:
           this___.widgetEventPrefix + type).toLowerCase();
         data = data || {};
         if (event.originalEvent) {
           for (var i = $.event.props.length, prop; i;) {
             prop = $.event.props[ --i ];
             event[ prop ] = event.originalEvent[ prop ];
           }
         }
         this___.element.trigger(event, data);
         return ! ($.isFunction(callback) && callback.call(this___.element[ 0 ]
               , event, data) === false || event.isDefaultPrevented());
       }
     };
   })(jQuery);
}