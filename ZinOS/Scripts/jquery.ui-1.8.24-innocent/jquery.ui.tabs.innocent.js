{
  (function ($, undefined) {
     var tabId = 0, listId = 0;
     function getNextTabId() { return ++tabId; }
     function getNextListId() { return ++listId; }
     $.widget('ui.tabs', {
         'options': {
           'add': null,
           'ajaxOptions': null,
           'cache': false,
           'cookie': null,
           'collapsible': false,
           'disable': null,
           'disabled': [ ],
           'enable': null,
           'event': 'click',
           'fx': null,
           'idPrefix': 'ui-tabs-',
           'load': null,
           'panelTemplate': '<div></div>',
           'remove': null,
           'select': null,
           'show': null,
           'spinner': '<em>Loading&#8230;</em>',
           'tabTemplate':
           '<li><a href=\'#{href}\'><span>#{label}</span></a></li>'
         },
         '_create': function () {
           var this___ = this && this.___? void 0: this;
           this___._tabify(true);
         },
         '_setOption': function (key, value) {
           var this___ = this && this.___? void 0: this;
           if (key == 'selected') {
             if (this___.options.collapsible && value ==
               this___.options.selected) { return; }
             this___.select(value);
           } else {
             this___.options[ key ] = value;
             this___._tabify();
           }
         },
         '_tabId': function (a) {
           var this___ = this && this.___? void 0: this;
           return a.title && a.title.replace(/\s/g, '_')
             .replace(/[^\w\u00c0-\uFFFF-]/g, '') || this___.options.idPrefix +
             getNextTabId();
         },
         '_sanitizeSelector': function (hash) {
           return hash.replace(/:/g, '\\:');
         },
         '_cookie': function () {
           var this___ = this && this.___? void 0: this;
           var cookie = this___.cookie || (this___.cookie =
             this___.options.cookie.name || 'ui-tabs-' + getNextListId());
           return $.cookie.apply(null, [ cookie ].concat($.makeArray(arguments)
             ));
         },
         '_ui': function (tab, panel) {
           var this___ = this && this.___? void 0: this;
           return {
             'tab': tab,
             'panel': panel,
             'index': this___.anchors.index(tab)
           };
         },
         '_cleanup': function () {
           var this___ = this && this.___? void 0: this;
           this___.lis.filter('.ui-state-processing')
             .removeClass('ui-state-processing').find('span:data(label.tabs)')
             .each(function () {
               var this___ = this && this.___? void 0: this;
               var el = $(this___);
               el.html(el.data('label.tabs')).removeData('label.tabs');
             });
         },
         '_tabify': function (init) {
           var this___ = this && this.___? void 0: this;
           var self = this___, o = this___.options, fragmentId = /^#.+/;
           this___.list = this___.element.find('ol,ul').eq(0);
           this___.lis = $(' > li:has(a[href])', this___.list);
           this___.anchors = this___.lis.map(function () {
               var this___ = this && this.___? void 0: this;
               return ($('a', this___))[ 0 ];
             });
           this___.panels = $([ ]);
           this___.anchors.each(function (i, a) {
               var href = $(a).attr('href');
               var hrefBase = (href.split('#'))[ 0 ], baseEl;
               if (hrefBase && (hrefBase === (location.toString().split('#'))[
                     0 ] || (baseEl = ($('base'))[ 0 ]) && hrefBase ===
                   baseEl.href)) {
                 href = a.hash;
                 a.href = href;
               }
               if (fragmentId.test(href)) {
                 self.panels =
                   self.panels.add(self.element.find(self._sanitizeSelector(href)
                   ));
               } else if (href && href !== '#') {
                 $.data(a, 'href.tabs', href);
                 $.data(a, 'load.tabs', href.replace(/#.*$/, ''));
                 var id = self._tabId(a);
                 a.href = '#' + id;
                 var $panel = self.element.find('#' + id);
                 if (!$panel.length) {
                   $panel = $(o.panelTemplate).attr('id', id)
                     .addClass('ui-tabs-panel ui-widget-content ui-corner-bottom')
                     .insertAfter(self.panels[ i - 1 ] || self.list);
                   $panel.data('destroy.tabs', true);
                 }
                 self.panels = self.panels.add($panel);
               } else {
                 o.disabled.push(i);
               }
             });
           if (init) {
             this___.element.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all')
               ;
             this___.list.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all')
               ;
             this___.lis.addClass('ui-state-default ui-corner-top');
             this___.panels.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom')
               ;
             if (o.selected === undefined) {
               if (location.hash) {
                 this___.anchors.each(function (i, a) {
                     if (a.hash == location.hash) {
                       o.selected = i;
                       return false;
                     }
                   });
               }
               if (typeof o.selected !== 'number' && o.cookie) {
                 o.selected = parseInt(self._cookie(), 10);
               }
               if (typeof o.selected !== 'number' &&
                 this___.lis.filter('.ui-tabs-selected').length) {
                 o.selected =
                   this___.lis.index(this___.lis.filter('.ui-tabs-selected'));
               }
               o.selected = o.selected || (this___.lis.length? 0: -1);
             } else if (o.selected === null) {
               o.selected = -1;
             }
             o.selected = o.selected >= 0 && this___.anchors[ o.selected ] ||
               o.selected < 0? o.selected: 0;
             o.disabled =
               $.unique(o.disabled.concat($.map(this___.lis.filter('.ui-state-disabled')
                   , function (n, i) {
                     return self.lis.index(n);
                   }))).sort();
             if ($.inArray(o.selected, o.disabled) != -1) {
               o.disabled.splice($.inArray(o.selected, o.disabled), 1);
             }
             this___.panels.addClass('ui-tabs-hide');
             this___.lis.removeClass('ui-tabs-selected ui-state-active');
             if (o.selected >= 0 && this___.anchors.length) {
               self.element.find(self._sanitizeSelector(self.anchors[
                     o.selected ].hash)).removeClass('ui-tabs-hide');
               this___.lis.eq(o.selected)
                 .addClass('ui-tabs-selected ui-state-active');
               self.element.queue('tabs', function () {
                   self._trigger('show', null, self._ui(self.anchors[
                         o.selected ],
                       (self.element.find(self._sanitizeSelector(self.anchors[
                              o.selected ].hash)))[ 0 ]));
                 });
               this___.load(o.selected);
             }
             $(window).bind('unload', function () {
                 self.lis.add(self.anchors).unbind('.tabs');
                 self.lis = self.anchors = self.panels = null;
               });
           } else {
             o.selected =
               this___.lis.index(this___.lis.filter('.ui-tabs-selected'));
           }
           this___.element[ o.collapsible? 'addClass': 'removeClass' ]
             ('ui-tabs-collapsible');
           if (o.cookie) {
             this___._cookie(o.selected, o.cookie);
           }
           for (var i = 0, li; li = this___.lis[ i ]; i++) {
             ($(li))[ $.inArray(i, o.disabled) != -1 && !$(li)
               .hasClass('ui-tabs-selected') ? 'addClass': 'removeClass' ]
             ('ui-state-disabled');
           }
           if (o.cache === false) {
             this___.anchors.removeData('cache.tabs');
           }
           this___.lis.add(this___.anchors).unbind('.tabs');
           if (o.event !== 'mouseover') {
             var addState = function (state, el) {
               if (el.is(':not(.ui-state-disabled)')) {
                 el.addClass('ui-state-' + state);
               }
             };
             var removeState = function (state, el) {
               el.removeClass('ui-state-' + state);
             };
             this___.lis.bind('mouseover.tabs', function () {
                 var this___ = this && this.___? void 0: this;
                 addState('hover', $(this___));
               });
             this___.lis.bind('mouseout.tabs', function () {
                 var this___ = this && this.___? void 0: this;
                 removeState('hover', $(this___));
               });
             this___.anchors.bind('focus.tabs', function () {
                 var this___ = this && this.___? void 0: this;
                 addState('focus', $(this___).closest('li'));
               });
             this___.anchors.bind('blur.tabs', function () {
                 var this___ = this && this.___? void 0: this;
                 removeState('focus', $(this___).closest('li'));
               });
           }
           var hideFx, showFx;
           if (o.fx) {
             if ($.isArray(o.fx)) {
               hideFx = o.fx[ 0 ];
               showFx = o.fx[ 1 ];
             } else {
               hideFx = showFx = o.fx;
             }
           }
           function resetStyle($el, fx) {
             $el.css('display', '');
             if (!$.support.opacity && fx.opacity) {
               $el[ 0 ].style.removeAttribute('filter');
             }
           }
           var showTab = showFx? function (clicked, $show) {
             $(clicked).closest('li')
               .addClass('ui-tabs-selected ui-state-active');
             $show.hide().removeClass('ui-tabs-hide').animate(showFx,
               showFx.duration || 'normal', function () {
                 resetStyle($show, showFx);
                 self._trigger('show', null, self._ui(clicked, $show[ 0 ]));
               });
           }: function (clicked, $show) {
             $(clicked).closest('li')
               .addClass('ui-tabs-selected ui-state-active');
             $show.removeClass('ui-tabs-hide');
             self._trigger('show', null, self._ui(clicked, $show[ 0 ]));
           };
           var hideTab = hideFx? function (clicked, $hide) {
             $hide.animate(hideFx, hideFx.duration || 'normal', function () {
                 self.lis.removeClass('ui-tabs-selected ui-state-active');
                 $hide.addClass('ui-tabs-hide');
                 resetStyle($hide, hideFx);
                 self.element.dequeue('tabs');
               });
           }: function (clicked, $hide, $show) {
             self.lis.removeClass('ui-tabs-selected ui-state-active');
             $hide.addClass('ui-tabs-hide');
             self.element.dequeue('tabs');
           };
           this___.anchors.bind(o.event + '.tabs', function () {
               var this___ = this && this.___? void 0: this;
               var el = this___, $li = $(el).closest('li'), $hide =
                 self.panels.filter(':not(.ui-tabs-hide)'), $show =
                 self.element.find(self._sanitizeSelector(el.hash));
               if ($li.hasClass('ui-tabs-selected') && !o.collapsible ||
                 $li.hasClass('ui-state-disabled') ||
                 $li.hasClass('ui-state-processing') ||
                 self.panels.filter(':animated').length ||
                 self._trigger('select', null, self._ui(this___, $show[ 0 ]))
                 === false) {
                 this___.blur();
                 return false;
               }
               o.selected = self.anchors.index(this___);
               self.abort();
               if (o.collapsible) {
                 if ($li.hasClass('ui-tabs-selected')) {
                   o.selected = -1;
                   if (o.cookie) {
                     self._cookie(o.selected, o.cookie);
                   }
                   self.element.queue('tabs', function () {
                       hideTab(el, $hide);
                     }).dequeue('tabs');
                   this___.blur();
                   return false;
                 } else if (!$hide.length) {
                   if (o.cookie) {
                     self._cookie(o.selected, o.cookie);
                   }
                   self.element.queue('tabs', function () {
                       showTab(el, $show);
                     });
                   self.load(self.anchors.index(this___));
                   this___.blur();
                   return false;
                 }
               }
               if (o.cookie) {
                 self._cookie(o.selected, o.cookie);
               }
               if ($show.length) {
                 if ($hide.length) {
                   self.element.queue('tabs', function () {
                       hideTab(el, $hide);
                     });
                 }
                 self.element.queue('tabs', function () {
                     showTab(el, $show);
                   });
                 self.load(self.anchors.index(this___));
               } else {
                 throw 'jQuery UI Tabs: Mismatching fragment identifier.';
               }
               if ($.browser.msie) { this___.blur(); }
             });
           this___.anchors.bind('click.tabs', function () { return false; });
         },
         '_getIndex': function (index) {
           var this___ = this && this.___? void 0: this;
           if (typeof index == 'string') {
             index = this___.anchors.index(this___.anchors.filter('[href$=' +
                   index + ']'));
           }
           return index;
         },
         'destroy': function () {
           var this___ = this && this.___? void 0: this;
           var o = this___.options;
           this___.abort();
           this___.element.unbind('.tabs')
             .removeClass('ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible')
             .removeData('tabs');
           this___.list.removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all')
             ;
           this___.anchors.each(function () {
               var this___ = this && this.___? void 0: this;
               var href = $.data(this___, 'href.tabs');
               if (href) {
                 this___.href = href;
               }
               var $this = $(this___).unbind('.tabs');
               $.each([ 'href', 'load', 'cache' ], function (i, prefix) {
                   $this.removeData(prefix + '.tabs');
                 });
             });
           this___.lis.unbind('.tabs').add(this___.panels).each(function () {
               var this___ = this && this.___? void 0: this;
               if ($.data(this___, 'destroy.tabs')) {
                 $(this___).remove();
               } else {
                 $(this___).removeClass([ 'ui-state-default', 'ui-corner-top',
                     'ui-tabs-selected', 'ui-state-active', 'ui-state-hover',
                     'ui-state-focus', 'ui-state-disabled', 'ui-tabs-panel',
                     'ui-widget-content', 'ui-corner-bottom', 'ui-tabs-hide' ]
                   .join(' '));
               }
             });
           if (o.cookie) {
             this___._cookie(null, o.cookie);
           }
           return this___;
         },
         'add': function (url, label, index) {
           var this___ = this && this.___? void 0: this;
           if (index === undefined) {
             index = this___.anchors.length;
           }
           var self = this___, o = this___.options, $li =
             $(o.tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g,
               label)), id = !url.indexOf('#') ? url.replace('#', ''):
           this___._tabId(($('a', $li))[ 0 ]);
           $li.addClass('ui-state-default ui-corner-top').data('destroy.tabs',
             true);
           var $panel = self.element.find('#' + id);
           if (!$panel.length) {
             $panel = $(o.panelTemplate).attr('id', id).data('destroy.tabs',
               true);
           }
           $panel.addClass('ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide')
             ;
           if (index >= this___.lis.length) {
             $li.appendTo(this___.list);
             $panel.appendTo(this___.list[ 0 ].parentNode);
           } else {
             $li.insertBefore(this___.lis[ index ]);
             $panel.insertBefore(this___.panels[ index ]);
           }
           o.disabled = $.map(o.disabled, function (n, i) {
               return n >= index? ++n: n;
             });
           this___._tabify();
           if (this___.anchors.length == 1) {
             o.selected = 0;
             $li.addClass('ui-tabs-selected ui-state-active');
             $panel.removeClass('ui-tabs-hide');
             this___.element.queue('tabs', function () {
                 self._trigger('show', null, self._ui(self.anchors[ 0 ],
                     self.panels[ 0 ]));
               });
             this___.load(0);
           }
           this___._trigger('add', null, this___._ui(this___.anchors[ index ],
               this___.panels[ index ]));
           return this___;
         },
         'remove': function (index) {
           var this___ = this && this.___? void 0: this;
           index = this___._getIndex(index);
           var o = this___.options, $li = this___.lis.eq(index).remove(),
           $panel = this___.panels.eq(index).remove();
           if ($li.hasClass('ui-tabs-selected') && this___.anchors.length > 1)
             {
             this___.select(index + (index + 1 < this___.anchors.length? 1: -1)
             );
           }
           o.disabled = $.map($.grep(o.disabled, function (n, i) {
                 return n != index;
               }), function (n, i) {
               return n >= index? --n: n;
             });
           this___._tabify();
           this___._trigger('remove', null, this___._ui(($li.find('a'))[ 0 ],
               $panel[ 0 ]));
           return this___;
         },
         'enable': function (index) {
           var this___ = this && this.___? void 0: this;
           index = this___._getIndex(index);
           var o = this___.options;
           if ($.inArray(index, o.disabled) == -1) { return; }
           this___.lis.eq(index).removeClass('ui-state-disabled');
           o.disabled = $.grep(o.disabled, function (n, i) {
               return n != index;
             });
           this___._trigger('enable', null, this___._ui(this___.anchors[ index
               ], this___.panels[ index ]));
           return this___;
         },
         'disable': function (index) {
           var this___ = this && this.___? void 0: this;
           index = this___._getIndex(index);
           var self = this___, o = this___.options;
           if (index != o.selected) {
             this___.lis.eq(index).addClass('ui-state-disabled');
             o.disabled.push(index);
             o.disabled.sort();
             this___._trigger('disable', null, this___._ui(this___.anchors[
                   index ], this___.panels[ index ]));
           }
           return this___;
         },
         'select': function (index) {
           var this___ = this && this.___? void 0: this;
           index = this___._getIndex(index);
           if (index == -1) {
             if (this___.options.collapsible && this___.options.selected != -1)
               {
               index = this___.options.selected;
             } else { return this___; }
           }
           this___.anchors.eq(index).trigger(this___.options.event + '.tabs');
           return this___;
         },
         'load': function (index) {
           var this___ = this && this.___? void 0: this;
           index = this___._getIndex(index);
           var self = this___, o = this___.options, a =
             (this___.anchors.eq(index))[ 0 ], url = $.data(a, 'load.tabs');
           this___.abort();
           if (!url || this___.element.queue('tabs').length !== 0 && $.data(a,
               'cache.tabs')) {
             this___.element.dequeue('tabs');
             return;
           }
           this___.lis.eq(index).addClass('ui-state-processing');
           if (o.spinner) {
             var span = $('span', a);
             span.data('label.tabs', span.html()).html(o.spinner);
           }
           this___.xhr = $.ajax($.extend({}, o.ajaxOptions, {
                 'url': url,
                 'success': function (r, s) {
                   self.element.find(self._sanitizeSelector(a.hash)).html(r);
                   self._cleanup();
                   if (o.cache) {
                     $.data(a, 'cache.tabs', true);
                   }
                   self._trigger('load', null, self._ui(self.anchors[ index ],
                       self.panels[ index ]));
                   try {
                     o.ajaxOptions.success(r, s);
                   } catch (e) {}
                 },
                 'error': function (xhr, s, e) {
                   self._cleanup();
                   self._trigger('load', null, self._ui(self.anchors[ index ],
                       self.panels[ index ]));
                   try {
                     o.ajaxOptions.error(xhr, s, index, a);
                   } catch (e) {}
                 }
               }));
           self.element.dequeue('tabs');
           return this___;
         },
         'abort': function () {
           var this___ = this && this.___? void 0: this;
           this___.element.queue([ ]);
           this___.panels.stop(false, true);
           this___.element.queue('tabs', this___.element.queue('tabs')
             .splice(-2, 2));
           if (this___.xhr) {
             this___.xhr.abort();
             delete this___.xhr;
           }
           this___._cleanup();
           return this___;
         },
         'url': function (index, url) {
           var this___ = this && this.___? void 0: this;
           this___.anchors.eq(index).removeData('cache.tabs').data('load.tabs',
             url);
           return this___;
         },
         'length': function () {
           var this___ = this && this.___? void 0: this;
           return this___.anchors.length;
         }
       });
     $.extend($.ui.tabs, {
         'version': '1.8.14'
       });
     $.extend($.ui.tabs.prototype, {
         'rotation': null,
         'rotate': function (ms, continuing) {
           var this___ = this && this.___? void 0: this;
           var self = this___, o = this___.options;
           var rotate = self._rotate || (self._rotate = function (e) {
               clearTimeout(self.rotation);
               self.rotation = setTimeout(function () {
                   var t = o.selected;
                   self.select(++t < self.anchors.length? t: 0);
                 }, ms);
               if (e) {
                 e.stopPropagation();
               }
             });
           var stop = self._unrotate || (self._unrotate = !continuing? function
             (e) {
               if (e.clientX) {
                 self.rotate(null);
               }
             }: function (e) {
               t = o.selected;
               rotate();
             });
           if (ms) {
             this___.element.bind('tabsshow', rotate);
             this___.anchors.bind(o.event + '.tabs', stop);
             rotate();
           } else {
             clearTimeout(self.rotation);
             this___.element.unbind('tabsshow', rotate);
             this___.anchors.unbind(o.event + '.tabs', stop);
             delete this___._rotate;
             delete this___._unrotate;
}
return this___;
}
});
})(jQuery);
}