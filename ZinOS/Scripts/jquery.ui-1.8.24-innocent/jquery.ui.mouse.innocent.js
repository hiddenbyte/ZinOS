{
  (function ($, undefined) {
     var mouseHandled = false;
     $(document).mousedown(function (e) {
         mouseHandled = false;
       });
     $.widget('ui.mouse', {
         'options': {
           'cancel': ':input,option',
           'distance': 1,
           'delay': 0
         },
         '_mouseInit': function () {
           var this___ = this && this.___? void 0: this;
           var self = this___;
           this___.element.bind('mousedown.' + this___.widgetName, function
             (event) {
               return self._mouseDown(event);
             }).bind('click.' + this___.widgetName, function (event) {
               if (true === $.data(event.target, self.widgetName +
                   '.preventClickEvent')) {
                 $.removeData(event.target, self.widgetName +
                   '.preventClickEvent');
                 event.stopImmediatePropagation();
                 return false;
               }
             });
           this___.started = false;
         },
         '_mouseDestroy': function () {
           var this___ = this && this.___? void 0: this;
           this___.element.unbind('.' + this___.widgetName);
         },
         '_mouseDown': function (event) {
           var this___ = this && this.___? void 0: this;
           if (mouseHandled) { return; };
           this___._mouseStarted && this___._mouseUp(event);
           this___._mouseDownEvent = event;
           var self = this___, btnIsLeft = event.which == 1, elIsCancel =
             typeof this___.options.cancel == 'string'? $(event.target)
             .closest(this___.options.cancel).length: false;
           if (!btnIsLeft || elIsCancel || !this___._mouseCapture(event)) {
             return true; }
           this___.mouseDelayMet = !this___.options.delay;
           if (!this___.mouseDelayMet) {
             this___._mouseDelayTimer = setTimeout(function () {
                 self.mouseDelayMet = true;
               }, this___.options.delay);
           }
           if (this___._mouseDistanceMet(event) &&
             this___._mouseDelayMet(event)) {
             this___._mouseStarted = this___._mouseStart(event) !== false;
             if (!this___._mouseStarted) {
               event.preventDefault();
               return true;
             }
           }
           if (true === $.data(event.target, this___.widgetName +
               '.preventClickEvent')) {
             $.removeData(event.target, this___.widgetName +
               '.preventClickEvent');
           }
           this___._mouseMoveDelegate = function (event) {
             return self._mouseMove(event);
           };
           this___._mouseUpDelegate = function (event) {
             return self._mouseUp(event);
           };
           $(document).bind('mousemove.' + this___.widgetName,
             this___._mouseMoveDelegate).bind('mouseup.' + this___.widgetName,
             this___._mouseUpDelegate);
           event.preventDefault();
           mouseHandled = true;
           return true;
         },
         '_mouseMove': function (event) {
           var this___ = this && this.___? void 0: this;
           if ($.browser.msie && ! (document.documentMode >= 9) &&
             !event.button) {
             return this___._mouseUp(event);
           }
           if (this___._mouseStarted) {
             this___._mouseDrag(event);
             return event.preventDefault();
           }
           if (this___._mouseDistanceMet(event) &&
             this___._mouseDelayMet(event)) {
             this___._mouseStarted =
               this___._mouseStart(this___._mouseDownEvent, event) !== false;
             this___._mouseStarted? this___._mouseDrag(event):
             this___._mouseUp(event);
           }
           return !this___._mouseStarted;
         },
         '_mouseUp': function (event) {
           var this___ = this && this.___? void 0: this;
           $(document).unbind('mousemove.' + this___.widgetName,
             this___._mouseMoveDelegate).unbind('mouseup.' +
             this___.widgetName, this___._mouseUpDelegate);
           if (this___._mouseStarted) {
             this___._mouseStarted = false;
             if (event.target == this___._mouseDownEvent.target) {
               $.data(event.target, this___.widgetName + '.preventClickEvent',
                 true);
             }
             this___._mouseStop(event);
           }
           return false;
         },
         '_mouseDistanceMet': function (event) {
           var this___ = this && this.___? void 0: this;
           return Math.max(Math.abs(this___._mouseDownEvent.pageX -
               event.pageX), Math.abs(this___._mouseDownEvent.pageY -
               event.pageY)) >= this___.options.distance;
         },
         '_mouseDelayMet': function (event) {
           var this___ = this && this.___? void 0: this;
           return this___.mouseDelayMet;
         },
         '_mouseStart': function (event) {},
         '_mouseDrag': function (event) {},
         '_mouseStop': function (event) {},
         '_mouseCapture': function (event) { return true; }
       });
   })(jQuery);
}