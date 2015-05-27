$(function() {

    $('body').one('pinegrow-ready', function(e, pinegrow) {
        var f = new PgFramework('bs3.2.0', 'Bootstrap 3.2');
        f.type = "bootstrap";
        f.allow_single_type = true;

        f.ignore_css_files = [/(^|\/)bootstrap\.(css|less)/i, /(^|\/)bootstrap\.min\.(css|less)/i, /(^|\/)font(\-|)awesome(\.min|)\.(css|less)/i];
        f.detect = function(crsaPage) {
            var is = crsaPage.hasStylesheet(/(^|\/)bootstrap(\.min|)\.(css|less)/i);
            return is;
        }

        pinegrow.addFramework(f);


        //f.default = true;

        var getPlaceholderImage = function() {
            return pinegrow.getPlaceholderImage();
        }

        var showJavascriptMessage = function() {
            //crsaQuickMessage('You might need to Save and Reload the page (Page -&gt; Reload / CMD + R) to activate this change.', 3000, true);
        }

        var replaceTag = function($el, tag) {
            var attrs = { };

            $.each($el[0].attributes, function(idx, attr) {
                attrs[attr.nodeName] = attr.nodeValue;
            });
            var $n;
            $el.replaceWith(function () {
                $n = $("<" + tag + "/>", attrs).append($el.contents());
                return $n;
            });
            return $n;
        }


        var bsDataTarget =  {
            type: 'text',
            name: 'Data target',
            type: 'text',
            live_update: false,
            action : 'custom',
            get_value: function(obj) {
                var $el = obj.data;
                //if(!$el.is('>a,>button')) $el = $el.find('a,button');
                var pgEl = new pgQuery($el);
                return pgEl.attr('data-target');
            },
            set_value: function(obj, value, values, oldValue, eventType) {
                var $el = obj.data;
                var pgEl = new pgQuery($el);
                //if(!$el.is('a,button')) $el = $el.find('a,button');
                if(value) {
                    pgEl.attr('data-target', value);
                } else {
                    pgEl.removeAttr('data-target');
                }
                showJavascriptMessage();
                return value;
            }
        }


        var bsDataToggle = {
            type: 'select',
            name: 'Data toggle',
            live_update: false,
            show_empty: true,
            options : [
                {key : 'dropdown', name : 'Dropdown' },
                {key : 'modal', name : 'Modal' },
                {key : 'tab', name : 'tab' },
                {key : 'pill', name : 'Pill' },
                {key : 'tooltip', name : 'Tooltip' },
                {key : 'popover', name : 'Popover' },
                {key : 'button', name : 'Button' },
                {key : 'buttons', name : 'Buttons' },
                {key : 'collapse', name : 'Collapse' },
                {key : 'popover', name : 'Popover' }
            ],
            action : 'custom',
            get_value: function(obj) {
                var $el = obj.data;
                var pgEl = new pgQuery($el);
                if(!$el.is('a,button')) $el = $el.find('a,button');
                return pgEl.attr('data-toggle');
            },
            set_value: function(obj, value, values, oldValue, eventType) {
                var $el = obj.data;
                if(!$el.is('a,button')) $el = $el.find('a,button');
                var pgel = new pgQuery($el);
                if(value) {
                    pgel.attr('data-toggle', value);
                } else {
                    pgel.removeAttr('data-toggle');
                }
                showJavascriptMessage();
                return value;
            }
        }

        var tooltipMsgShown = false;

        var bsTooltipsSection = {
            name : 'Tooltip',
            fields : {
                tooltip : {
                    'type' : 'checkbox',
                    'name' : 'Tooltip',
                    'value' : "1",
                    'action' : 'custom',
                    get_value: function(obj) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        return pgel.attr('data-toggle') == 'tooltip';
                    },
                    set_value: function(obj, value, values, oldValue, eventType) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        if(value) {
                            pgel.attr('data-toggle', 'tooltip');
                            if(!tooltipMsgShown) {
                                tooltipMsgShown = true;
                                showNotice('You also need to add JavaScript to initialize Tooltips. <a class="link external" target="_blank" href="http://getbootstrap.com/javascript/#tooltips">Read more about it.</a>', 'Notice', 'bs-tooltip-notice');
                            }
                        } else {
                            if(pgel.attr('data-toggle') == 'tooltip') {
                                pgel.removeAttr('data-toggle');
                            }
                        }
                        showJavascriptMessage();
                        return value;
                    }
                },
                tooltptext : {
                    type: 'text',
                    name: 'Text',
                    live_update : false,
                    'action' : 'custom',
                    get_value: function(obj) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        var t = pgel.attr('title');
                        if(!t || t.length == 0) {
                            t = pgel.attr('data-original-title');
                        }
                        return t;
                    },
                    set_value: function(obj, value, values, oldValue, eventType) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        if(value) {
                            pgel.attr('title', value);
                            if(pgel.attr('data-original-title')) {
                                pgel.attr('data-original-title', value);
                            }
                        } else {
                            pgel.removeAttr('title');
                            pgel.removeAttr('data-original-title');
                        }
                        return value;
                    },
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                tooltipos : {
                    type: 'select',
                    name: 'Placement',
                    action: 'element_attribute',
                    attribute : 'data-placement',
                    'show_empty' : true,
                    'options' : [
                        {'key' : 'top', 'name' : 'Top'},
                        {'key' : 'right', 'name' : 'Right'},
                        {'key' : 'bottom', 'name' : 'Bottom'},
                        {'key' : 'left', 'name' : 'Left'},
                        {'key' : 'auto top', 'name' : 'Auto top'},
                        {'key' : 'auto right', 'name' : 'Auto right'},
                        {'key' : 'auto bottom', 'name' : 'Auto bottom'},
                        {'key' : 'auto left', 'name' : 'Auto left'}
                    ],
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                tooltiphtml : {
                    type: 'checkbox',
                    name: 'Html',
                    action: 'element_attribute',
                    attribute: 'data-html',
                    value: 'true',
                    negvalue: 'false',
                    live_update : false,
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                tooltiptrigger : {
                    type: 'select',
                    name: 'Trigger',
                    action: 'element_attribute',
                    attribute : 'data-trigger',
                    'show_empty' : true,
                    'options' : [
                        {'key' : 'click', 'name' : 'Click'},
                        {'key' : 'hover', 'name' : 'Hover'},
                        {'key' : 'focus', 'name' : 'Focus'},
                        {'key' : 'manual', 'name' : 'Manual'}
                    ],
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                tooltpdelay : {
                    type: 'text',
                    name: 'Delay in ms',
                    action: 'element_attribute',
                    attribute: 'data-delay',
                    live_update : false,
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                tooltpcontainer : {
                    type: 'text',
                    name: 'Container',
                    action: 'element_attribute',
                    attribute: 'data-container',
                    live_update : false,
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                }
            }
        }

        var popoverMsgShown = false;

        var bsPopoverSection = {
            name : 'Popover',
            fields : {
                popover : {
                    'type' : 'checkbox',
                    'name' : 'Popover',
                    'value' : "1",
                    'action' : 'custom',
                    get_value: function(obj) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        return pgel.attr('data-toggle') == 'popover';
                    },
                    set_value: function(obj, value, values, oldValue, eventType) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        if(value) {
                            pgel.attr('data-toggle', 'popover');
                            if(!popoverMsgShown) {
                                popoverMsgShown = true;
                                showNotice('You also need to add JavaScript to initialize Popovers. <a class="link external" target="_blank" href="http://getbootstrap.com/javascript/#popovers">Read more about it.</a>', 'Notice', 'bs-popovers');
                            }
                        } else {
                            if(pgel.attr('data-toggle') == 'popover') {
                                pgel.removeAttr('data-toggle');
                            }
                        }
                        showJavascriptMessage();
                        return value;
                    }
                },
                popovertext : {
                    type: 'text',
                    name: 'Text',
                    live_update : false,
                    'action' : 'custom',
                    get_value: function(obj) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        var t = pgel.attr('title');
                        if(!t || t.length == 0) {
                            t = pgel.attr('data-original-title');
                        }
                        return t;
                    },
                    set_value: function(obj, value, values, oldValue, eventType) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        if(value) {
                            pgel.attr('title', value);
                            if(pgel.attr('data-original-title')) {
                                pgel.attr('data-original-title', value);
                            }
                        } else {
                            pgel.removeAttr('title');
                            pgel.removeAttr('data-original-title');
                        }
                        return value;
                    },
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                popovercontent : {
                    type: 'text',
                    name: 'Content',
                    action: 'element_attribute',
                    attribute: 'data-content',
                    live_update : false,
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                popoverpos : {
                    type: 'select',
                    name: 'Placement',
                    action: 'element_attribute',
                    attribute : 'data-placement',
                    'show_empty' : true,
                    'options' : [
                        {'key' : 'top', 'name' : 'Top'},
                        {'key' : 'right', 'name' : 'Right'},
                        {'key' : 'bottom', 'name' : 'Bottom'},
                        {'key' : 'left', 'name' : 'Left'},
                        {'key' : 'auto top', 'name' : 'Auto top'},
                        {'key' : 'auto right', 'name' : 'Auto right'},
                        {'key' : 'auto bottom', 'name' : 'Auto bottom'},
                        {'key' : 'auto left', 'name' : 'Auto left'}
                    ],
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                popoverhtml : {
                    type: 'checkbox',
                    name: 'Html',
                    action: 'element_attribute',
                    attribute: 'data-html',
                    value: 'true',
                    negvalue: 'false',
                    live_update : false,
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                popovertrigger : {
                    type: 'select',
                    name: 'Trigger',
                    action: 'element_attribute',
                    attribute : 'data-trigger',
                    'show_empty' : true,
                    'options' : [
                        {'key' : 'click', 'name' : 'Click'},
                        {'key' : 'hover', 'name' : 'Hover'},
                        {'key' : 'focus', 'name' : 'Focus'},
                        {'key' : 'manual', 'name' : 'Manual'}
                    ],
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                popoverdelay : {
                    type: 'text',
                    name: 'Delay in ms',
                    action: 'element_attribute',
                    attribute: 'data-delay',
                    live_update : false,
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                },
                popovercontainer : {
                    type: 'text',
                    name: 'Container',
                    action: 'element_attribute',
                    attribute: 'data-container',
                    live_update : false,
                    on_changed : function() {
                        showJavascriptMessage();
                    }
                }
            }
        }

        var crsaAddStandardSections = function(addTo) {
            var bsAlign = {
                'type' : 'select',
                'name' : 'Text align',
                'action' : 'apply_class',
                'show_empty' : true,
                'options' : [
                    {
                        'key' : 'text-left',
                        'name' : 'Left'
                    },
                    {
                        'key' : 'text-center',
                        'name' : 'Center'
                    },
                    {
                        'key' : 'text-right',
                        'name' : 'Right'
                    },
                    {
                        'key' : 'text-justify',
                        'name' : 'Justify'
                    }
                ]
            };

            var bsTextEmphasis = {
                'type' : 'select',
                'name' : 'Text context',
                'action' : 'apply_class',
                'show_empty' : true,
                'options' : [
                    {
                        'key' : 'text-muted',
                        'name' : 'Muted'
                    },
                    {
                        'key' : 'text-primary',
                        'name' : 'Primary'
                    },
                    {
                        'key' : 'text-success',
                        'name' : 'Success'
                    },
                    {
                        'key' : 'text-info',
                        'name' : 'Info'
                    },
                    {
                        'key' : 'text-warning',
                        'name' : 'Warning'
                    },
                    {
                        'key' : 'text-danger',
                        'name' : 'Danger'
                    }
                ]
            };


            var bsBckEmphasis = {
                'type' : 'select',
                'name' : 'Background context',
                'action' : 'apply_class',
                'show_empty' : true,
                'options' : [
                    {
                        'key' : 'bg-primary',
                        'name' : 'Primary'
                    },
                    {
                        'key' : 'bg-success',
                        'name' : 'Success'
                    },
                    {
                        'key' : 'bg-info',
                        'name' : 'Info'
                    },
                    {
                        'key' : 'bg-warning',
                        'name' : 'Warning'
                    },
                    {
                        'key' : 'bg-danger',
                        'name' : 'Danger'
                    }
                ]
            };

            var bsLead = {
                'type' : 'checkbox',
                'name' : 'Lead',
                'action' : 'apply_class',
                'value' : 'lead'
            };

            var rules_section = {
                name : 'CSS Rules',
                fields : {
                    'rules' : {
                        'type' : 'rules',
                        'name' : null,
                        'action' : 'rules'
                    }
                }
            };

            var s = {
                'bstext' : {
                    name: 'Text &amp; Context',
                    fields: {
                        bstextalign : bsAlign,
                        bsemphasis: bsTextEmphasis,
                        bsbckcontext: bsBckEmphasis,
                        bslead: bsLead
                    }
                },
                'bslayout' : {
                    name: 'Layout',
                    fields: {
                        bsfloat : {
                            'type' : 'select',
                            'name' : 'Pull',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {
                                    'key' : 'pull-left',
                                    'name' : 'Left'
                                },
                                {
                                    'key' : 'pull-right',
                                    'name' : 'Right'
                                }
                            ]
                        },
                        clearfix : {
                            'type' : 'checkbox',
                            'name' : 'Clear floats',
                            'action' : 'apply_class',
                            'value' : 'clearfix'
                        }
                        /*     bscenter : {
                         'type' : 'checkbox',
                         'name' : 'Center block',
                         'action' : 'apply_class',
                         'value' : 'center-block'
                         }*/
                    }
                },
                'bsvisible' : {
                    name: 'Visibility',
                    fields: {
                        bsvisibiity : {
                            'type' : 'select',
                            'name' : 'Visibility',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {
                                    'key' : 'show',
                                    'name' : 'Shown'
                                },
                                {
                                    'key' : 'hidden',
                                    'name' : 'Hidden'
                                },
                                {
                                    'key' : 'invisible',
                                    'name' : 'Invisible'
                                }
                            ]
                        },
                        bsprint : {
                            'type' : 'select',
                            'name' : 'Print',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {
                                    'key' : 'visible-print',
                                    'name' : 'Visible'
                                },
                                {
                                    'key' : 'hidden-print',
                                    'name' : 'Hidden'
                                }
                            ]
                        },
                        'sr-only' : {
                            'type' : 'checkbox',
                            'name' : 'Scr.rdr only',
                            'action' : 'apply_class',
                            'value' : 'sr-only'
                        },

                        bstexthide : {
                            'type' : 'checkbox',
                            'name' : 'Hide text',
                            'action' : 'apply_class',
                            'value' : 'text-hide'
                        }

                    }
                },
                'bsresponsive' : {
                    name: 'Responsivness',
                    fields: {
                        responsive_control: {
                            type: 'custom',
                            name: 'layout_control',
                            action: 'none',
                            show: function($dest, obj, fn, fdef, values) {
                                var sizes = ["xs", "sm", "md", "lg"];
                                var $table = $("<table/>", {class: 'grid-control resp-control'}).appendTo($dest);
                                var $row = $("<tr/>").html("<td><label>Xs</label></td><td><label>Sm</label></td><td><label>Md</label></td><td><label>Lg</label></td>").appendTo($table);

                                $row = $("<tr/>").appendTo($table);
                                for(var m = 0; m < sizes.length; m++) {
                                    $td = $("<td/>").appendTo($row);
                                    var field = 'responsive-' + sizes[m];
                                    $.fn.crsa("addInputField", $td, obj, field, createResponsiveSelect(sizes[m]), values);
                                }
                            }
                        }
                    }
                },
                responsive_fields : {
                    name : 'Resposnive fields',
                    show : false,
                    fields : {
                        'responsive-xs' : createResponsiveSelect('xs'),
                        'responsive-sm' : createResponsiveSelect('sm'),
                        'responsive-md' : createResponsiveSelect('md'),
                        'responsive-lg' : createResponsiveSelect('lg')
                    }
                },
                'bsjavascript' : {
                    name: 'Javascript',
                    fields: {
                        bsdatatarget: bsDataTarget,
                        bsdatatoggle: bsDataToggle,
                        affix : {
                            name : 'Affix',
                            'type': 'checkbox' ,
                            value: '1',
                            action: "custom",
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(pgel.attr('data-spy') == 'affix') {
                                    return '1';
                                }
                                return null;
                            },
                            set_value: function(obj, value, values) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.attr('data-spy', 'affix');
                                } else {
                                    pgel.removeAttr('data-spy');
                                }
                                showJavascriptMessage();
                                return value;
                            }
                        },
                        affixtop : {
                            name : 'Affix top',
                            'type': 'text' ,
                            action: "custom",
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.attr('data-offset-top');
                            },
                            set_value: function(obj, value, values) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.attr('data-offset-top', value);
                                } else {
                                    pgel.removeAttr('data-offset-top');
                                }
                                showJavascriptMessage();
                                return value;
                            }
                        },
                        affixbottom : {
                            name : 'Affix bottom',
                            'type': 'text' ,
                            action: "custom",
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.attr('data-offset-bottom');
                            },
                            set_value: function(obj, value, values) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.attr('data-offset-bottom', value);
                                } else {
                                    pgel.removeAttr('data-offset-bottom');
                                }
                                showJavascriptMessage();
                                return value;
                            }
                        }
                    }
                }
            };
/*
            var before = {
                rules : rules_section,
                'id' : {
                    name : 'Element',
                    fields : {
                        'element_id' : {
                            'type' : 'text',
                            'name' : 'Element Id',
                            'action' : 'element_id'
                        }
                    }
                }
            }
*/
            var before = {
                css : {
                    //inherit this from html framework
                    inherit: true
                }
            }

            var list = {};

            $.each(addTo, function(k,v) {
                list[k] = v;
            });

            $.each(before, function(k,v) {
                list[k] = v;
            });



            $.each(s, function(k,v) {
                list[k] = v;
            });
            return list;
        }



        //Columns
        var createColumnSpans = function(name, base, empty, start) {
            if(typeof start == 'undefined') start = 1;
            var span_select = {
                'type' : 'select',
                'name' : null,
                'action' : 'apply_class',
                'show_empty' : empty,
                'options' : []
            }
            for(var n = start; n <= 12; n++) {
                span_select.options.push({key: base + '-' + n, name: n});
            }
            return span_select;
        }

        var createResponsiveSelect = function(size) {
            var span_select = {
                'type' : 'select',
                'name' : null,
                'action' : 'apply_class',
                'show_empty' : true,
                'options' : [
                    {key: 'visible-' + size, name: 'Visible'},
                    {key: 'hidden-' + size, name: 'Hidden'},
                    {key: 'visible-' + size + '-block', name: 'Block'},
                    {key: 'visible-' + size + '-inline-block', name: 'Inline block'},
                    {key: 'visible-' + size + '-inline', name: 'Inline'}
                ]
            }
            return span_select;
        }

        function getGridPreview(t) {
            return '<div class="container preview-' + t + '">\
            <div class="row sel">\
                <div class="col-xs-4 sel"><div></div></div>\
                <div class="col-xs-4"><div></div></div>\
                <div class="col-xs-4"><div></div></div>\
            </div>\
            <div class="row">\
                <div class="col-xs-4"><div></div></div>\
                <div class="col-xs-4"><div></div></div>\
                <div class="col-xs-4"><div></div></div>\
            </div>\
            </div>';
        };

        //Container
        f.addComponentType({
            'type' : 'bs-container',
            'selector' : '.container,.container-fluid',
            tags: 'major',
            preview: getGridPreview('container'),
            'code' : '<div class="container"></div>',
            'name' : 'Container',
            empty_placeholder : true,
            action_menu: {
                add: ['bs-row']
            },
            'inline_edit' : true,
            'sections' : crsaAddStandardSections({
                bscontaineropt : {
                    name : "Container options",
                    fields : {
                        fluid : {
                            name : 'Fluid',
                            'type': 'checkbox' ,
                            value: '1',
                            action: "custom",
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.hasClass('container-fluid') ? '1' : null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.removeClass('container');
                                    pgel.addClass('container-fluid');
                                } else {
                                    pgel.addClass('container');
                                    pgel.removeClass('container-fluid');
                                }
                                return value;
                            }
                        }
                    }
                }
            })
        });

        //Row
        f.addComponentType({
            'type' : 'bs-row',
            'selector' : 'div.row',
            tags: 'major',
            preview: getGridPreview('row'),
            //'parent_selector' : '.container',
            invalid_drop_msg : "Row can only be dropped into a Container. Drop it to the tree if you want to put it somewhere else.",
            'code' : '<div class="row"></div>',
            empty_placeholder : true,
            'name' : 'Row',
            action_menu : {
                add: ['bs-column', 'thumbnail-img', 'thumbnail-content']
            },
            'sections' : crsaAddStandardSections({})
        });

        //Column clear
        f.addComponentType({
            'type' : 'bs-clear',
            'selector' : 'div.clear-columns',
            'code' : '<div class="clearfix clear-columns"></div>',
            'name' : 'Clear columns',
            'sections' : crsaAddStandardSections({})
        });

        var columnPlaceMsg = 'Put <b>Column</b> in a <b>Row</b>. If you want to put it somewhere else, drop it on the tree.';

        f.addComponentType({
            'type' : 'bs-column',
            tags: 'major',
            'selector' : function($el) {
                if($el.is('div')) {
                    var $p = $el.parent();
                    if($p.is('.row,.form-group') && !$el.is('.row')) return true;
                }
                if($el.is('label')) return false;
                var cls = $el.attr('class');
                if(cls) {
                    if(cls.match(/(\s|^)col\-/i)) return true;
                }
                return false;
            },
            preview: getGridPreview('column'),
            parent_selector: '.row',
            invalid_drop_msg : columnPlaceMsg,
            'code' : '<div class="col-md-4"><h3>Column title</h3>\
        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\
        </div>',
            'empty_placeholder' : true,
            'name' : 'Column',
            'inline_edit' : true,
            'sections' : crsaAddStandardSections({
                layout : {
                    name : "Layout",
                    fields : {
                        layout_control: {
                            type: 'custom',
                            name: 'layout_control',
                            action: 'none',
                            show: function($dest, obj, fn, fdef, values) {
                                var sizes = ["xs", "sm", "md", "lg"];
                                var fields = ["", "-offset", "-push", "-pull"];
                                var field_names = ["Span&nbsp;", "Offs&nbsp;", "Push&nbsp;", "Pull&nbsp;"];
                                var field_keys = ["span_", "offset_", "push_", "pull_"];
                                var $table = $("<table/>", {class: 'grid-control columns-control'}).appendTo($dest);
                                var $row = $("<tr/>").html("<td></td><td><label>Xs</label></td><td><label>Sm</label></td><td><label>Md</label></td><td><label>Lg</label></td>").appendTo($table);

                                for(var n = 0; n < fields.length; n++) {
                                    $row = $("<tr/>").appendTo($table);
                                    var $td = $("<td/>").html('<label>' + field_names[n] + '</label>').appendTo($row);
                                    for(var m = 0; m < sizes.length; m++) {
                                        $td = $("<td/>").appendTo($row);

                                        var field = field_keys[n] + sizes[m];
                                        $.fn.crsa("addInputField", $td, obj, field, createColumnSpans(field_names[n], "col-" + sizes[m] + fields[n], true, fields[n] == '' ? 1 : 0), values);
                                    }
                                }
                            }
                        }
                    }
                },
                layout_phone : {
                    name : 'Phone',
                    show : false,
                    fields : {
                        span_xs : createColumnSpans("Span", "col-xs", true),
                        offset_xs : createColumnSpans("Offs", "col-xs-offset", true, 0),
                        push_xs : createColumnSpans("Push", "col-xs-push", true, 0),
                        pull_xs : createColumnSpans("Pull", "col-xs-pull", true, 0),
                        span_sm : createColumnSpans("Span", "col-sm", true),
                        offset_sm : createColumnSpans("Offs", "col-sm-offset", true, 0),
                        push_sm : createColumnSpans("Push", "col-sm-push", true, 0),
                        pull_sm : createColumnSpans("Pull", "col-sm-pull", true, 0),
                        span_md : createColumnSpans("Span", "col-md", true),
                        offset_md : createColumnSpans("Offs", "col-md-offset", true, 0),
                        push_md : createColumnSpans("Push", "col-md-push", true, 0),
                        pull_md : createColumnSpans("Pull", "col-md-pull", true, 0),
                        span_lg : createColumnSpans("Span", "col-lg", true),
                        offset_lg : createColumnSpans("Offs", "col-lg-offset", true, 0),
                        push_lg : createColumnSpans("Push", "col-lg-push", true, 0),
                        pull_lg : createColumnSpans("Pull", "col-lg-pull", true, 0)
                    }
                }
            })
        });




        var bsPullRight = {
            'type' : 'checkbox',
            'name' : 'Pull right',
            'action' : 'apply_class',
            'value' : 'pull-right'
        };
        var hoptions = [
            {key: 'h1', name: 'Heading 1'},
            {key: 'h2', name: 'Heading 2'},
            {key: 'h3', name: 'Heading 3'},
            {key: 'h4', name: 'Heading 4'},
            {key: 'h5', name: 'Heading 5'},
            {key: 'h6', name: 'Heading 6'}
        ];

        var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        $.each(headings, function(i,h) {
            var hdef = {
                'type' : h,
                'selector' : h,
                'code' : '<' + h + '>Heading ' + (i+1) + '</' + h + '>',
                'name' : h,
                action_menu: {
                    add: ['small']
                },
                'sections' : crsaAddStandardSections({
                    'style' : {
                        name : 'Heading',
                        fields : {
                            description : {
                                'type' : 'select',
                                'name' : 'Level',
                                'action' : 'custom',
                                'show_empty' : false,
                                options: hoptions,
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    for(var i = 0; i < hoptions.length; i++) {
                                        if($el.is(hoptions[i].key)) {
                                            return hoptions[i].key;
                                        }
                                    }
                                    return null;
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    crsaWillChangeDom();
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    var $p = $el.parent();
                                    //var $newel = replaceTag($el, value);
                                    var newpgel = pgel.replaceTag(value);
                                    var $newel = $(newpgel.get(0).el);
                                    $.fn.crsa('setNeedsUpdate', false, $p);
                                    $.fn.crsa('setSelectElementOnUpdate', $newel);
                                    return value;
                                }
                            }
                        }
                    }
                })
            }
            f.addComponentType(hdef);
        });

        var secondaryText = {
            'type' : 'small',
            'selector' : 'small',
            'code' : '<small>Secondary text</small>',
            'preview' : '<h1><small>Secondary text</small></h1>',
            'name' : 'Secondary text',
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(secondaryText);

        var tag = {
            'type' : 'p',
            'selector' : 'p',
            'code' : '<p>Paragraph</p>',
            'name' : 'p',
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(tag);

        var abbreviation = {
            'type' : 'abbr',
            'selector' : 'abbr',
            'code' : '<abbr title="Description">term</abbr>',
            'name' : 'Abbreviation',
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Abbreviation',
                    fields : {
                        description : {
                            'type' : 'text',
                            'name' : 'Description',
                            'action' : 'element_attribute',
                            'attribute' : 'title'
                        },
                        initialism : {
                            'type' : 'checkbox',
                            'name' : 'All caps',
                            'action' : 'apply_class',
                            'value' : 'initialism'
                        }
                    }
                }
            })
        }
        f.addComponentType(abbreviation);


        var address = {
            'type' : 'address',
            'selector' : 'address',
            'code' : '<address>\
        <strong>Twitter, Inc.</strong><br/>\
795 Folsom Ave, Suite 600<br/>\
    San Francisco, CA 94107<br/>\
            <abbr title="Phone">P:</abbr> (123) 456-7890<br/>\
            <br/>\
            <strong>Full Name</strong><br>\
            <a href="mailto:#">first.last@example.com</a>\
        </address>',
            'name' : 'Address',
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(address);


        var blockQuoteCitationSetValue = function(obj, value, values, oldValue) {
            crsaWillChangeDom();

            var $el = obj.data;
            var source = values.source;
            var $small = $el.find('small');
            var pgsmall = new pgQuery($small);
            if(!value || value.length == 0) {
                //$small.remove();
                pgsmall.remove();
            } else {
                if(source && source.length > 0) {
                    source = '<cite title="' + source + '">' + source + '</cite>';
                } else {
                    source = '';
                }
                if((!oldValue || oldValue.length == 0) && (source && source.length > 0)) value += " @SOURCE";
                var text = value.replace(/@source/i, source);
                if($small.length == 0) {
                    //$small = $("<small/>").appendTo($el);
                    pgsmall = new pgQuery().create("<small></small>");
                    new pgQuery($el).append(pgsmall);
                }
                pgsmall.html(text);
            }
            return value;
        };

        var blockquote = {
            'type' : 'blockquote',
            'selector' : 'blockquote',
            tags: 'major',
            'code' : '<blockquote>\
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\
    <small>Someone famous in <cite title="Source Title">Source Title</cite></small>\
</blockquote>',
            'name' : 'Blockquote',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name: "Info",
                    fields: {
                        citation: {
                            type: 'text',
                            name: 'Citation',
                            action: 'custom',
                            live_update: false,
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $small = $el.find('small');
                                var pgsmall = new pgQuery($small);
                                if($small.length == 0) return null;
                                var s = pgsmall.get(0).pgel.html();
                                s = s.replace(/<cite.*<\/cite>/i, '@SOURCE');
                                return s;
                            },
                            set_value: blockQuoteCitationSetValue
                        },
                        source: {
                            type: 'text',
                            name: 'Source',
                            action: 'custom',
                            live_update: false,
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $cite = $el.find('cite');
                                if($cite.length == 0) return null;
                                return new pgQuery($cite).text();
                            },
                            set_value: function(obj, value, values) {
                                var $el = obj.data;
                                var citation = values.citation;
                                if(value && value.length > 0) {
                                    if(!citation) {
                                        citation = '@SOURCE';
                                    } else {
                                        if(!citation.match(/@source/i)) {
                                            citation += ' @SOURCE';
                                        }
                                    }
                                }
                                setTimeout(function() {
                                    //wait for source set_value cycle to complete and commit before updating
                                    $.fn.crsa('setSelectedElementProperty', 'citation', citation);
                                }, 100);
                                return value;
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(blockquote);

        //hr
        f.addComponentType({
            'type' : 'hr',
            'selector' : 'hr',
            'code' : '<hr/>',
            'name' : 'hr',
            'sections' : crsaAddStandardSections({})
        });

        var glyphs = ['glyphicon-adjust' , 'glyphicon-align-center' , 'glyphicon-align-justify' , 'glyphicon-align-left' , 'glyphicon-align-right' , 'glyphicon-arrow-down' , 'glyphicon-arrow-left' , 'glyphicon-arrow-right' , 'glyphicon-arrow-up' , 'glyphicon-asterisk' , 'glyphicon-backward' , 'glyphicon-ban-circle' , 'glyphicon-barcode' , 'glyphicon-bell' , 'glyphicon-bold' , 'glyphicon-book' , 'glyphicon-bookmark' , 'glyphicon-briefcase' , 'glyphicon-bullhorn' , 'glyphicon-calendar' , 'glyphicon-camera' , 'glyphicon-certificate' , 'glyphicon-check' , 'glyphicon-chevron-down' , 'glyphicon-chevron-left' , 'glyphicon-chevron-right' , 'glyphicon-chevron-up' , 'glyphicon-circle-arrow-down' , 'glyphicon-circle-arrow-left' , 'glyphicon-circle-arrow-right' , 'glyphicon-circle-arrow-up' , 'glyphicon-cloud' , 'glyphicon-cloud-download' , 'glyphicon-cloud-upload' , 'glyphicon-cog' , 'glyphicon-collapse-down' , 'glyphicon-collapse-up' , 'glyphicon-comment' , 'glyphicon-compressed' , 'glyphicon-copyright-mark' , 'glyphicon-credit-card' , 'glyphicon-cutlery' , 'glyphicon-dashboard' , 'glyphicon-download' , 'glyphicon-download-alt' , 'glyphicon-earphone' , 'glyphicon-edit' , 'glyphicon-eject' , 'glyphicon-envelope' , 'glyphicon-euro' , 'glyphicon-exclamation-sign' , 'glyphicon-expand' , 'glyphicon-export' , 'glyphicon-eye-close' , 'glyphicon-eye-open' , 'glyphicon-facetime-video' , 'glyphicon-fast-backward' , 'glyphicon-fast-forward' , 'glyphicon-file' , 'glyphicon-film' , 'glyphicon-filter' , 'glyphicon-fire' , 'glyphicon-flag' , 'glyphicon-flash' , 'glyphicon-floppy-disk' , 'glyphicon-floppy-open' , 'glyphicon-floppy-remove' , 'glyphicon-floppy-save' , 'glyphicon-floppy-saved' , 'glyphicon-folder-close' , 'glyphicon-folder-open' , 'glyphicon-font' , 'glyphicon-forward' , 'glyphicon-fullscreen' , 'glyphicon-gbp' , 'glyphicon-gift' , 'glyphicon-glass' , 'glyphicon-globe' , 'glyphicon-hand-down' , 'glyphicon-hand-left' , 'glyphicon-hand-right' , 'glyphicon-hand-up' , 'glyphicon-hd-video' , 'glyphicon-hdd' , 'glyphicon-header' , 'glyphicon-headphones' , 'glyphicon-heart' , 'glyphicon-heart-empty' , 'glyphicon-home' , 'glyphicon-import' , 'glyphicon-inbox' , 'glyphicon-indent-left' , 'glyphicon-indent-right' , 'glyphicon-info-sign' , 'glyphicon-italic' , 'glyphicon-leaf' , 'glyphicon-link' , 'glyphicon-list' , 'glyphicon-list-alt' , 'glyphicon-lock' , 'glyphicon-log-in' , 'glyphicon-log-out' , 'glyphicon-magnet' , 'glyphicon-map-marker' , 'glyphicon-minus' , 'glyphicon-minus-sign' , 'glyphicon-move' , 'glyphicon-music' , 'glyphicon-new-window' , 'glyphicon-off' , 'glyphicon-ok' , 'glyphicon-ok-circle' , 'glyphicon-ok-sign' , 'glyphicon-open' , 'glyphicon-paperclip' , 'glyphicon-pause' , 'glyphicon-pencil' , 'glyphicon-phone' , 'glyphicon-phone-alt' , 'glyphicon-picture' , 'glyphicon-plane' , 'glyphicon-play' , 'glyphicon-play-circle' , 'glyphicon-plus' , 'glyphicon-plus-sign' , 'glyphicon-print' , 'glyphicon-pushpin' , 'glyphicon-qrcode' , 'glyphicon-question-sign' , 'glyphicon-random' , 'glyphicon-record' , 'glyphicon-refresh' , 'glyphicon-registration-mark' , 'glyphicon-remove' , 'glyphicon-remove-circle' , 'glyphicon-remove-sign' , 'glyphicon-repeat' , 'glyphicon-resize-full' , 'glyphicon-resize-horizontal' , 'glyphicon-resize-small' , 'glyphicon-resize-vertical' , 'glyphicon-retweet' , 'glyphicon-road' , 'glyphicon-save' , 'glyphicon-saved' , 'glyphicon-screenshot' , 'glyphicon-sd-video' , 'glyphicon-search' , 'glyphicon-send' , 'glyphicon-share' , 'glyphicon-share-alt' , 'glyphicon-shopping-cart' , 'glyphicon-signal' , 'glyphicon-sort' , 'glyphicon-sort-by-alphabet' , 'glyphicon-sort-by-alphabet-alt' , 'glyphicon-sort-by-attributes' , 'glyphicon-sort-by-attributes-alt' , 'glyphicon-sort-by-order' , 'glyphicon-sort-by-order-alt' , 'glyphicon-sound-5-1' , 'glyphicon-sound-6-1' , 'glyphicon-sound-7-1' , 'glyphicon-sound-dolby' , 'glyphicon-sound-stereo' , 'glyphicon-star' , 'glyphicon-star-empty' , 'glyphicon-stats' , 'glyphicon-step-backward' , 'glyphicon-step-forward' , 'glyphicon-stop' , 'glyphicon-subtitles' , 'glyphicon-tag' , 'glyphicon-tags' , 'glyphicon-tasks' , 'glyphicon-text-height' , 'glyphicon-text-width' , 'glyphicon-th' , 'glyphicon-th-large' , 'glyphicon-th-list' , 'glyphicon-thumbs-down' , 'glyphicon-thumbs-up' , 'glyphicon-time' , 'glyphicon-tint' , 'glyphicon-tower' , 'glyphicon-transfer' , 'glyphicon-trash' , 'glyphicon-tree-conifer' , 'glyphicon-tree-deciduous' , 'glyphicon-unchecked' , 'glyphicon-upload' , 'glyphicon-usd' , 'glyphicon-user' , 'glyphicon-volume-down' , 'glyphicon-volume-off' , 'glyphicon-volume-up' , 'glyphicon-warning-sign' , 'glyphicon-wrench' , 'glyphicon-zoom-in' , 'glyphicon-zoom-out'];
        var glyphs_options = [];
        for(var i = 0; i < glyphs.length; i++) {
            var g = glyphs[i];
            glyphs_options.push({key: g, name: g.replace('glyphicon-',''), html: '<span class="glyphicon ' + g + '"></span>'});
        }

        var glyphs_def = {
            'type' : 'glyphicon',
            'selector' : 'span.glyphicon',
            'code' : '<span class="glyphicon glyphicon-star"></span>',
            'name' : 'Glyphicon',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name: "Icon",
                    fields: {
                        icon: {
                            type: 'select',
                            name: 'Icon',
                            options: glyphs_options,
                            rich: {
                                title: 'Select icon',
                                modal: true,
                                class: 'icon-grid'
                            },
                            action: 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var cls = pgel.attr('class');
                                var m = cls.match(/glyphicon-[a-z\-]*/i);
                                return m;
                            },
                            set_value: function(obj, value, values) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var cls = pgel.attr('class');
                                var m = cls.match(/glyphicon-[a-z\-]*/i);
                                if(m) pgel.removeClass(m[0]);
                                pgel.addClass(value);
                                return value;
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(glyphs_def);




        var description = {
            'type' : 'description',
            'selector' : 'dl',
            'code' : '<dl>\
        <dt>Description lists</dt>\
    <dd>A description list is perfect for defining terms.</dd>\
    <dt>Euismod</dt>\
    <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>\
</dl>',
            'name' : 'Description list',
            tags: 'major',
            action_menu: {
                add: ['description-term', 'description-def']
            },
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'horizontal' : {
                            'type' : 'checkbox',
                            'name' : 'Horizontal',
                            'action' : 'apply_class',
                            'value' : 'dl-horizontal'
                        }
                    }
                }
            })
        }
        f.addComponentType(description);


        var description_term = {
            'type' : 'description-term',
            'selector' : 'dt',
            parent_selector: 'dl',
            'code' : '<dt>Term</dt>',
            'name' : 'Description term',
            'sections' : crsaAddStandardSections({})
        }
        f.addComponentType(description_term);

        var description_def = {
            'type' : 'description-def',
            'selector' : 'dd',
            parent_selector: 'dl',
            'code' : '<dd>Term definition.</dd>',
            'name' : 'Description definition',
            'sections' : crsaAddStandardSections({})
        }
        f.addComponentType(description_def);



        var code = {
            'type' : 'code',
            'selector' : 'code',
            'code' : '<code>&lt;section&gt;</code>',
            'name' : 'Code',
            'sections' : crsaAddStandardSections({})
        }
        f.addComponentType(code);

        var code_block = {
            'type' : 'code-block',
            'selector' : 'pre',
            'code' : '<pre>&lt;p&gt;Sample text here...&lt;/p&gt;</pre>',
            'name' : 'Code block',
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'scroll' : {
                            'type' : 'checkbox',
                            'name' : 'Scrollable',
                            'action' : 'apply_class',
                            'value' : 'pre-scrollable'
                        }
                    }
                }
            })
        }
        f.addComponentType(code_block);


        //tables
        var isTableRowEmpty = function($tr) {
            var empty = true;
            $tr.find(">td").each(function(i,td) {
                if($.trim(td.innerHTML).length > 0) {
                    empty = false;
                    return false;
                }
            });
            return empty;
        }

        var countNonEmptyTableRows = function($tbody) {
            var c = 0;
            $tbody.find(">tr").each(function(i,tr) {
                if(isTableRowEmpty($(tr))) c++;
            });
            return c;
        }

        var getTablePreviewCode = function(t) {
            return '<table class="table preview-' + t + '">\
        <thead>\
        <tr>\
            <th>#</th>\
            <th>First Name</th>\
            <th>Last Name</th>\
            <th>Username</th>\
        </tr>\
        </thead>\
    <tbody>\
        <tr class="sel">\
            <td>1</td>\
            <td class="sel">Mark</td>\
            <td>Otto</td>\
            <td>@mdo</td>\
        </tr>\
        <tr>\
            <td>2</td>\
            <td>Jacob</td>\
            <td>Thornton</td>\
            <td>@fat</td>\
        </tr>\
        <tr>\
            <td>3</td>\
            <td>Larry</td>\
            <td>the Bird</td>\
            <td>@twitter</td>\
        </tr>\
    </tbody>\
</table>';
        }

        var table = {
            'type' : 'table',
            'selector' : 'table',
            tags: 'major',
            'code' : '<table class="table">\
        <thead>\
        <tr>\
            <th>#</th>\
            <th>First Name</th>\
            <th>Last Name</th>\
            <th>Username</th>\
        </tr>\
        </thead>\
    <tbody>\
        <tr>\
            <td>1</td>\
            <td>Mark</td>\
            <td>Otto</td>\
            <td>@mdo</td>\
        </tr>\
        <tr>\
            <td>2</td>\
            <td>Jacob</td>\
            <td>Thornton</td>\
            <td>@fat</td>\
        </tr>\
        <tr>\
            <td>3</td>\
            <td>Larry</td>\
            <td>the Bird</td>\
            <td>@twitter</td>\
        </tr>\
    </tbody>\
</table>',
            preview: getTablePreviewCode('table'),
            'name' : 'Table',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name: "Table options",
                    fields: {
                        rows: {
                            type: 'text',
                            name: 'Rows',
                            action: 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $tbody = $el.find('>tbody');
                                var $rows = $tbody.find('>tr');
                                return $rows.length;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {

                                crsaWillChangeDom();

                                value = parseInt(value) || 0;
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var $tbody = $el.find('>tbody');
                                var pgtbody = new pgQuery($tbody);
                                if($tbody.length == 0) {
                                    //$tbody = $('<tbody/>').appendTo($el);
                                    pgtbody = new pgQuery().create('<tbody></tbody>');
                                    pgel.append(pgtbody);
                                    $tbody = $(pgtbody.get(0).el);
                                }
                                var $rows = $tbody.find('>tr');

                                var cols = values.columns;
                                var change = false;
                                var empty_count = countNonEmptyTableRows($tbody);
                                var new_value = value;

                                if($rows.length < value) {
                                    for(var n = 0; n < value - $rows.length; n++) {
                                        //var $tr = $('<tr/>').appendTo($tbody);
                                        var pgtr = new pgQuery().create('<tr></tr>');
                                        pgtbody.append(pgtr);
                                        var $tr = $(pgtr.get(0).el);
                                        for(var c = 0; c < cols; c++) {
                                            pgtr.append(new pgQuery().create('<td></td>'));
                                            //$('<td/>').appendTo($tr);
                                        }
                                    }
                                    change = true;
                                } else if($rows.length > value) {
                                    var remove = $rows.length - value;
                                    $rows.each(function(i,tr) {
                                        var $tr = $(tr);
                                        var pgtr = new pgQuery($tr);
                                        if(isTableRowEmpty($tr)) {
                                            pgtr.remove();
                                            remove--;
                                            if(remove == 0) return false;
                                        }
                                    });
                                    new_value = value + remove;
                                } else {

                                }
                                if(eventType == "change") {
                                    $.fn.crsa("setNeedsUpdate", false, $el);
                                    value = new_value;
                                }
                                return value;
                            }
                        },
                        columns: {
                            type: 'text',
                            name: 'Columns',
                            action: 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $tbody = $el.find('>tbody');
                                var $rows = $tbody.find('>tr');
                                var max_c = 0;
                                $rows.each(function(i, tr) {
                                    var c = $(tr).find('>td').length;
                                    if(c > max_c) max_c = c;
                                });
                                $el.find('>thead >tr').each(function(i, tr) {
                                    var c = $(tr).find('>th').length;
                                    if(c > max_c) max_c = c;
                                });
                                return max_c;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {

                                crsaWillChangeDom();

                                value = parseInt(value) || 0;
                                var $el = obj.data;
                                var $tbody = $el.find('>tbody,>thead');
                                var $rows = $tbody.find('>tr');
                                var new_value = value;
                                if(value) {
                                    var max_c = 0;
                                    $rows.each(function(i, tr) {
                                        var cells = $(tr).find('>td,>th');
                                        if(cells.length > value) {
                                            var remove = cells.length - value;
                                            cells.each(function(n, td) {
                                                var $td = $(td);
                                                if($.trim(td.innerHTML) == '') {
                                                    //$td.remove();
                                                    new pgQuery($td).remove();
                                                    remove--;
                                                    if(remove == 0) return false;
                                                }
                                            });
                                        } else if(cells.length < value) {
                                            for(var n = cells.length; n < value; n++) {
                                                var tag = $(tr).parent().is('thead') ? 'th' : 'td';
                                                new pgQuery($(tr)).append(new pgQuery().create('<' + tag + '></' + tag + '>'));
                                                //$('<' + tag +'/>').appendTo($(tr));
                                            }
                                        }
                                        var c = $(tr).find('>td,>th');
                                        if(c > max_c) max_c = c;
                                    });
                                    new_value = max_c;
                                }
                                if(eventType == "change") {
                                    $.fn.crsa("setNeedsUpdate", false, $el);
                                    value = new_value;
                                }
                                return value;
                            }
                        }
                    }
                },
                'style' : {
                    name : 'Style',
                    fields : {
                        'striped' : {
                            'type' : 'checkbox',
                            'name' : 'Striped',
                            'action' : 'apply_class',
                            'value' : 'table-striped'
                        },
                        'bordered' : {
                            'type' : 'checkbox',
                            'name' : 'Bordered',
                            'action' : 'apply_class',
                            'value' : 'table-bordered'
                        },
                        'hover-rows' : {
                            'type' : 'checkbox',
                            'name' : 'Hover rows',
                            'action' : 'apply_class',
                            'value' : 'table-hover'
                        },
                        'condensed' : {
                            'type' : 'checkbox',
                            'name' : 'Condensed',
                            'action' : 'apply_class',
                            'value' : 'table-condensed'
                        },
                        'responsive' : {
                            'type' : 'checkbox',
                            'name' : 'Responsive',
                            'action' : 'custom',
                            'value' : '1',
                            get_value: function(obj) {
                                var $el = obj.data;
                                if($el.parent().is('div.table-responsive')) return '1';
                                return null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var $p = $el.parent();
                                var pgp = new pgQuery($p);
                                if(value) {
                                    if(!$p.is('div.table-responsive')) {
                                        if($p.is('div') && false) {
                                            //$p.
                                            new pgQuery($p).addClass('table-responsive');
                                        } else {
                                            //var $div = $('<div/>', {'class' : 'table-responsive'});
                                            var pgdiv = new pgQuery().create('<div class="table-responsive"></div>');
                                            pgel.replaceWith(pgdiv.get(0), true);
                                            pgdiv.append(pgel);
                                            //$el.replaceWith($div);
                                            //$div.append($el);
                                        }
                                    }
                                } else {
                                    if($p.is('div.table-responsive')) {
                                        if($p.children().length > 1) {
                                            pgp.removeClass('table-responsive');
                                        } else {
                                            pgel.detach();
                                            pgp.replaceWith(pgel.get(0));
                                        }
                                    }
                                }
                                $.fn.crsa("setNeedsUpdate", false, $el);
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(table);

        var table_head = {
            'type' : 'thead',
            'selector' : 'thead',
            parent_selector: 'table',
            'code' : '<thead><tr><td></td></tr></thead>',
            preview: getTablePreviewCode('thead'),
            'name' : 'Table heading',
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(table_head);

        var table_body = {
            'type' : 'tbody',
            'selector' : 'tbody',
            parent_selector: 'table',
            'code' : '<tbody><tr><td></td></tr></tbody>',
            preview: getTablePreviewCode('tbody'),
            'name' : 'Table body',
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(table_body);

        var tableContext = {
            'type' : 'select',
            'name' : 'Context',
            'action' : 'apply_class',
            show_empty: true,
            'options' : [
                {
                    'key' : 'info',
                    'name' : 'Info'
                },
                {
                    'key' : 'active',
                    'name' : 'Active'
                },
                {
                    'key' : 'success',
                    'name' : 'Success'
                },
                {
                    'key' : 'warning',
                    'name' : 'Warning'
                },
                {
                    'key' : 'danger',
                    'name' : 'Danger'
                }
            ]
        };

        var table_row = {
            'type' : 'tr',
            'selector' : 'tr',
            parent_selector: 'table,tbody,thead,tfooter',
            'code' : '<tr><td></td></tr>',
            preview: getTablePreviewCode('tr'),
            'name' : 'Table row',
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'context' : tableContext
                    }
                }
            })
        }
        f.addComponentType(table_row);

        var table_cell = {
            'type' : 'td',
            'selector' : 'td',
            parent_selector: 'tr',
            'code' : '<td></td>',
            preview: getTablePreviewCode('td'),
            'name' : 'Table cell',
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'context' : tableContext
                    }
                }
            })
        }
        f.addComponentType(table_cell);


        var restructureForm = function($el, values) {
            var pgel = new pgQuery($el);
            var horiz = $el.is('.form-horizontal');
            var $groups = $el.find('>div,>button,>fieldset>div,>fieldset>button');
            var col1 = values['horizontal-col1'] || 2;
            var col2 = values['horizontal-col2'] || 10;
            var base = 'col-sm-';

            $el.find('label').addClass('control-label');

            $groups.each(function(i, group) {
                var $group = $(group);

                if(!$group.is('.form-group')) {
                    if(horiz) {
                       /* var $div = $('<div/>', {'class' : 'form-group'});
                        $group.replaceWith($div);
                        $div.append($group);
                        $group = $div;
                        */
                        var pgdiv = new pgQuery().create('<div class="form-group"></div>');
                        var pggroup = new pgQuery($group);
                        pggroup.replaceWith(pgdiv, true);
                        pgdiv.append(pggroup);
                        $group = $(pgdiv.get(0).el);
                    }
                }
                var $ch = $group.children();
                if($ch.length >= 2) {
                    var lab = $($ch.get(0));
                    var field = $($ch.get(1));

                    var pglab = new pgQuery(lab);
                    var pgfield = new pgQuery(field);

                    var cls = lab.attr('class');
                    if(cls) pglab.attr('class', cls.replace(/col-[a-z][a-z]-[0-9]*/ig, ''));

                    cls = field.attr('class');
                    var field_has_cols = cls && cls.match(/col-[a-z][a-z]-[0-9]*/ig) != null;
                    if(cls && field_has_cols) pgfield.attr('class', cls.replace(/col-[a-z][a-z]-[0-9]*/ig, ''));

                    if(horiz) {
                        pglab.addClass('col-sm-' + col1);
                        if(!field.is('div') || !field_has_cols) {
                            /*var $div = $('<div/>');
                            field.replaceWith($div);
                            $div.append(field);
                            field = $div;
                            */
                            var pgdiv = new pgQuery().create('<div></div>');
                            pgfield.replaceWith(pgdiv, true);
                            pgdiv.append(pgfield);
                            pgfield = pgdiv;
                            field = $(pgfield.get(0).el);
                        }
                        pgfield.addClass('col-sm-' + col2);
                        if($ch.length > 2) {
                            for(var n = 2; n < $ch.length; n++) {
                                //$($ch.get(n)).appendTo(field);
                                pgfield.append(new pgQuery($($ch.get(n))));
                            }
                        }
                    }
                } else if($ch.length == 1) {
                    var field = $($ch.get(0));
                    var pgfield = new pgQuery(field);
                    cls = field.attr('class');
                    var field_has_cols = cls && cls.match(/col-[a-z][a-z]-[a-z\-0-9]*/ig) != null;
                    if(cls && field_has_cols) pgfield.attr('class', cls.replace(/col-[a-z][a-z]-[a-z\-0-9]*/ig, ''));

                    if(horiz) {
                        if(!field.is('div') || !field_has_cols) {
                            /*var $div = $('<div/>');
                            field.replaceWith($div);
                            $div.append(field);
                            field = $div;*/

                            var pgdiv = new pgQuery().create('<div></div>');
                            pgfield.replaceWith(pgdiv, true);
                            pgdiv.append(pgfield);
                            pgfield = pgdiv;
                            field = $(pgfield.get(0).el);
                        }

                        pgfield.addClass('col-sm-offset-' + col1).addClass('col-sm-' + col2);
                    }
                }
            });

            if($el.is('.form-inline, .navbar-form')) {
                pgel.find('label').addClass('sr-only');
                pgel.find('div.checkbox >label').removeClass('sr-only');
            } else {
                pgel.find('label').removeClass('sr-only');
            }

        }

        var spanOptions = [];
        for(var n = 1; n <= 12; n++) spanOptions.push({key: n, name: n});

        //forms
        var form = {
            'type' : 'form',
            tags: 'major',
            'selector' : 'form',
            'code' : '<form role="form">\
        <div class="form-group">\
    <label class="control-label" for="exampleInputEmail1">Email address</label>\
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">\
    </div>\
        <div class="form-group">\
            <label class="control-label" for="exampleInputPassword1">Password</label>\
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">\
            </div>\
            <div class="form-group">\
                <label class="control-label" for="exampleInputFile">File input</label>\
                <input type="file" id="exampleInputFile">\
                    <p class="help-block">Example block-level help text here.</p>\
                </div>\
                <div class="checkbox">\
                    <label class="control-label" >\
                        <input type="checkbox"> Check me out\
                        </label>\
                    </div>\
                    <button type="submit" class="btn">Submit</button>\
                </form>',
            'name' : 'Form',
            action_menu: {
                add: ['form-group', 'form-textarea-group', 'form-select-group', 'form-checkbox-group', 'form-radio-group', 'form-static-group', 'form-fieldset'],
                on_add : function($el, $new, newdef, prepend) {
                    var values = $.fn.crsa('getValuesForElement', $el);

                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);

                    if(prepend) {
                        pgel.prepend(pgnew);
                    } else {
                        pgel.append(pgnew);
                    }
                    restructureForm($el, values);
                }
            },
            on_child_inserted : function($pel, $el, cp) {
                var values = $.fn.crsa('getValuesForElement', $pel);
                restructureForm($pel, values);
            },
            'sections' : crsaAddStandardSections({
                'layout' : {
                    name : 'Style',
                    fields : {
                        'layout' : {
                            'type' : 'select',
                            'name' : 'Layout',
                            'action' : 'custom',
                            'options' : [
                                {key: 'form-normal', name: 'Normal'},
                                {key: 'form-inline', name: 'Inline'},
                                {key: 'form-horizontal', name: 'Horizontal'},
                                {key: 'navbar-form', name: 'Navbar'}
                            ],
                            get_value: function(obj) {
                                var $el = obj.data;
                                if($el.is('.form-horizontal')) return 'form-horizontal';
                                if($el.is('.form-inline')) return 'form-inline';
                                if($el.is('.navbar-form')) return 'navbar-form';
                                return 'form-normal';
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                pgel.removeClass('form-horizontal').removeClass('form-inline').removeClass('form-normal').removeClass('navbar-form');
                                pgel.addClass(value);
                                restructureForm($el, values);
                                $.fn.crsa("setNeedsUpdate", false, $el);
                            }
                        }
                    }
                },
                'horizontal' : {
                    name : 'Horizontal',
                    fields : {
                        'horizontal-col1' : {
                            'type' : 'select',
                            'name' : 'Label span',
                            'options' : spanOptions,
                            'show_empty' : true,
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var val = null;
                                $el.find('label').each(function(i,e) {
                                    var $e = $(e);
                                    var cls = $e.attr('class');
                                    if(cls) {
                                        var m = cls.match(/col-[a-z][a-z]-([0-9]*)/i);
                                        if(m) {
                                            val = parseInt(m[1]);
                                            return false;
                                        }
                                    }
                                });
                                if(val === null) {
                                    $el.find('div').each(function(i,e) {
                                        var $e = $(e);
                                        var cls = $e.attr('class');
                                        if(cls) {
                                            var m = cls.match(/col-[a-z][a-z]-offset-([0-9]*)/i);
                                            if(m) {
                                                val = parseInt(m[1]);
                                                return false;
                                            }
                                        }
                                    });
                                }
                                if(val === null) val = $el.data('crsa-form-col1');
                                return val;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                setTimeout(function() {
                                    restructureForm($el, values);
                                    $.fn.crsa("setNeedsUpdate", true, $el);
                                }, 100);
                                $el.data('crsa-form-col1', value);
                                return value;
                            }
                        },
                        'horizontal-col2' : {
                            'type' : 'select',
                            'name' : 'Field span',
                            'options' : spanOptions,
                            'show_empty' : true,
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var val = null;
                                $el.find('input,textarea,div.checkbox,button').parent().each(function(i,e) {
                                    var $e = $(e);
                                    var cls = $e.attr('class');
                                    if(cls) {
                                        var m = cls.match(/col-[a-z][a-z]-([0-9]*)/i);
                                        if(m) {
                                            val = parseInt(m[1]);
                                            return false;
                                        }
                                    }
                                });
                                if(val === null) val = $el.data('crsa-form-col2');
                                return val;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                setTimeout(function() {
                                    restructureForm($el, values);
                                    $.fn.crsa("setNeedsUpdate", true, $el);
                                }, 100);
                                $el.data('crsa-form-col2', value);
                                return value;
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(form);




        var form_group = {
            'type' : 'form-group',
            'selector' : function($el) {
                //if($el.is('input') && $el.attr('type') != 'checkbox') return true;
                if($el.is('div.form-group')) return true;
                return false;
            },
            parent_selector: 'form,fieldset',
            'code' : function(env) {
                var id = getUniqueId('formInput');
                return '<div class="form-group">\
        <label class="control-label" for="' + id + '">Field label</label>\
<input type="text" class="form-control" id="' + id + '" placeholder="Placeholder text">\
</div>'
            },
            'name' : 'Input group',
            action_menu: {
                add: ['form-static', 'form-input', 'textarea', 'form-checkbox','form-radio', 'label',  'form-help', 'form-select']
            },
            'sections' : crsaAddStandardSections({
                'data' : {
                    name : 'Group options',
                    fields : {
                        'validation' : {
                            'type' : 'select',
                            'name' : 'Validation state',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {key: 'has-success', name: 'Success'},
                                {key: 'has-warning', name: 'Warning'},
                                {key: 'has-error', name: 'Error'}
                            ]
                        },
                        'feedback' : {
                            'type' : 'checkbox',
                            'name' : 'Feedback icon',
                            value : '1',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var val = ($el.hasClass('has-feedback') && $el.find('.form-control-feedback').length > 0) ? '1' : null;
                                return val;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.addClass('has-feedback');
                                    var code = '<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
                                    if($el.data('crsa-old-feedback')) {
                                        code = $el.data('crsa-old-feedback');
                                    }
                                    pgel.append(new pgQuery().create(code));
                                } else {
                                    var $old = $el.find('.form-control-feedback');
                                    if($old.length > 0) {
                                        $el.data('crsa-old-feedback', $old.get(0).outerHTML);
                                        new pgQuery($old).remove();
                                    }
                                    pgel.removeClass('has-feedback');
                                }
                                pinegrow.setNeedsUpdate($el);
                                return value;
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(form_group);



        var form_ta_group = {
            'type' : 'form-textarea-group',
            'selector' : null,
            parent_selector: 'form,fieldset',
            'code' : function(env) {
                var id = getUniqueId('formInput');
                return '<div class="form-group">\
        <label class="control-label" for="' + id + '">Field label</label>\
        <textarea class="form-control" rows="3" id="' + id + '"></textarea>\
</div>'
            },
            'name' : 'Textarea group',
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(form_ta_group);


        var disabled = {
            type: 'checkbox',
            action: 'element_attribute',
            attribute: 'disabled',
            name: 'Disabled',
            value: 'disabled'
        };

        var required = {
            type: 'checkbox',
            action: 'element_attribute',
            attribute: 'required',
            name: 'Reguired',
            value: 'reguired',
            empty_attribute: true
        };

        var control_sizing = {
            'type' : 'select',
            'name' : 'Size',
            'action' : 'apply_class',
            'show_empty' : true,
            'options' : [
                {key: 'input-sm', name: 'Small'},
                {key: '', name: 'Default'},
                {key: 'input-lg', name: 'Large'}
            ]
        };


        var form_input = {
            'type' : 'form-input',
            'selector' : function($el) {
                if($el.is('input') && $el.attr('type') != 'checkbox') return true;
                //if($el.is('div.form-group')) return true;
                return false;
            },
            'code' : '<input type="text" class="form-control" placeholder="Placeholder text">',
            'name' : 'Input',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name : 'Input options',
                    fields : {
                        'type' : {
                            'type' : 'select',
                            'name' : 'Type',
                            'action' : 'custom',
                            'options' : [
                                {key: 'text', name: 'Text'},
                                {key: 'password', name: 'Password'},
                                {key: 'number', name: 'Number'},
                                {key: 'email', name: 'Email'},
                                {key: 'file', name: 'File'},
                                {key: 'url', name: 'Url'},
                                {key: 'search', name: 'Search'},
                                {key: 'tel', name: 'Tel'},
                                {key: 'color', name: 'Color'},
                                {key: 'datetime', name: 'Datetime'},
                                {key: 'datetime-local', name: 'Datetime local'},
                                {key: 'date', name: 'Date'},
                                {key: 'month', name: 'Month'},
                                {key: 'time', name: 'Time'},
                                {key: 'week', name: 'Week'}
                            ],
                            get_value: function(obj) {
                                var $el = obj.data;
                                return $el.attr('type');
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                pgel.attr('type', value);
                                return value;
                            }
                        },
                        value: {
                            type: 'text',
                            name: 'Value',
                            action: 'custom',
                            attribute: 'value',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $input = $el;
                                return $input.attr('value');
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                pgel.attr('value', value);
                                pgel.val(value);
                                return value;
                            }
                        },
                        placeholder: {
                            type: 'text',
                            name: 'Placeholder',
                            action: 'element_attribute',
                            attribute: 'placeholder'
                        },
                        'control-size' : control_sizing,
                        disabled: disabled,
                        required: required
                    }
                }
            })
        }
        f.addComponentType(form_input);





        var form_textarea = {
            'type' : 'textarea',
            'selector' : 'textarea',
            'code' : '<textarea class="form-control" rows="3"></textarea>',
            'name' : 'Textarea',
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'rows' : {
                            'type' : 'text',
                            'name' : 'Rows',
                            'action' : 'element_attribute',
                            'attribute' : 'rows'
                        },
                        'control-size' : control_sizing,
                        disabled: disabled
                    }
                }
            })
        }
        f.addComponentType(form_textarea);


        var form_checkbox_group = {
            'type' : 'form-checkbox-group',
            'selector' : function($el) {
                if($el.is('div.checkbox') || $el.children('label.checkbox').length > 0) return true;
                return false;
            },
            parent_selector: 'form,fieldset',
            'code' : '<div class="checkbox">\
        <label class="control-label">\
        <input type="checkbox" value="">\
        Option one is this and that&mdash;be sure to include why it\'s great\
        </label>\
        </div>',
            'name' : 'Checkbox group',
            action_menu: {
                add: ['form-checkbox','label', 'form-help']
            },
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'rows' : {
                            'type' : 'checkbox',
                            'name' : 'Inline',
                            'action' : 'custom',
                            'value' : '1',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $input = $el.find('>label');
                                return $input.hasClass('checkbox-inline') ? "1" : null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var $input = $el.find('>label');
                                var pginput = new pgQuery($input);
                                if(value) {
                                    pginput.addClass('checkbox-inline');
                                    pgel.removeClass('checkbox');
                                } else {
                                    pginput.removeClass('checkbox-inline');
                                    pgel.addClass('checkbox');
                                }
                                return value;
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(form_checkbox_group);

        var form_checkbox = {
            'type' : 'form-checkbox',
            'selector' : function($el) {
                if($el.is('label') && $el.find('>input[type="checkbox"]').length > 0) return true;
                return false;
            },
            'code' : '<label>\
        <input class="control-label" type="checkbox" value="">\
        Checkbox label\
        </label>',
            'name' : 'Checkbox',
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'disabled' : {
                            'type' : 'checkbox',
                            'name' : 'Disabled',
                            'action' : 'custom',
                            'value' : '1',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $input = $el.find('input[type="checkbox"]');
                                return $input.attr("disabled") ? "1" : null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var $input = $el.find('input[type="checkbox"]');
                                new pgQuery($input).attr('disabled', value);
                                return value;
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(form_checkbox);


        var form_radio_group = {
            'type' : 'form-radio-group',
            'selector' : function($el) {
                if($el.is('div.radio') || $el.children('label.radio').length > 0) return true;
                return false;
            },
            parent_selector: 'form,fieldset',
            'code' : '<div class="radio">\
        <label class="control-label">\
        <input type="radio" name="group" value="option1" checked>\
        Option one\
        </label>\
        </div>',
            'name' : 'Radio group',
            action_menu: {
                add: ['form-radio','label', 'form-help']
            },
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'group' : {
                            'type' : 'text',
                            'name' : 'name',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $input = $el.find('input[type="radio"]');
                                return $input.attr('name');
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var $input = $el.find('input[type="radio"]');
                                new pgQuery($input).attr('name', value);
                                return value;
                            }
                        },
                        'rows' : {
                            'type' : 'checkbox',
                            'name' : 'Inline',
                            'action' : 'custom',
                            'value' : '1',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $input = $el.find('>label');
                                return $input.hasClass('radio-inline') ? "1" : null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var $input = $el.find('>label');
                                var pgel = new pgQuery($el);
                                var pginput = new pgQuery($input);
                                if(value) {
                                    pginput.addClass('radio-inline');
                                    pgel.removeClass('radio');
                                } else {
                                    pginput.removeClass('radio-inline');
                                    pgel.addClass('radio');
                                }
                                return value;
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(form_radio_group);

        var form_radio = {
            'type' : 'form-radio',
            'selector' : function($el) {
                if($el.is('label') && $el.find('>input[type="radio"]').length > 0) return true;
                return false;
            },
            'code' : '<label class="control-label">\
        <input type="radio" name="group" value="option1" checked>\
        Option one\
        </label>',
            'name' : 'Radio',
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'disabled' : {
                            'type' : 'checkbox',
                            'name' : 'Disabled',
                            'action' : 'custom',
                            'value' : '1',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $input = $el.find('input[type="radio"]');
                                return $input.attr("disabled") ? "1" : null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var $input = $el.find('input[type="radio"]');
                                var pgel = new pgQuery($el);
                                var pginput = new pgQuery($input);
                                pginput.attr('disabled', value);
                                return value;
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(form_radio);




        var form_select_group = {
            'type' : 'form-select-group',
            'selector' : function($el) {
                return false;
            },
            parent_selector: 'form,fieldset',
            'code' : function(env) {
                var id = getUniqueId('formInput');
                return '<div class="form-group">\
        <label class="control-label" for="' + id + '">Field label</label>\
        <select id="' + id + '" class="form-control">\
            <option>1</option>\
            <option>2</option>\
            <option>3</option>\
        </select>\
</div>'
            },
            'name' : 'Select group',
            action_menu: {
                add: ['form-select','label', 'form-help']
            },
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(form_select_group);


        var form_select = {
            'type' : 'form-select',
            'selector' : 'select',
            'code' : '<select class="form-control">\
            <option>1</option>\
            <option>2</option>\
            <option>3</option>\
        </select>',
            'name' : 'Select',
            action_menu: {
                add: ['form-option']
            },
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'multiple' : {
                            'type' : 'checkbox',
                            'name' : 'Multiple',
                            'action' : 'element_attribute',
                            'attribute' : 'multiple',
                            'value' : 'multiple',
                            'attribute_without_value' : true
                        },
                        'control-size' : control_sizing,
                        disabled: disabled
                    }
                }
            })
        }
        f.addComponentType(form_select);

        var form_option = {
            'type' : 'form-option',
            'selector' : 'option',
            'code' : '<option value="value">Name</option>',
            preview: 'none',
            'name' : 'Select option',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name : 'Data',
                    fields : {
                        'value' : {
                            'type' : 'text',
                            'name' : 'Value',
                            'action' : 'element_attribute',
                            'attribute' : 'value'
                        },
                        'name' : {
                            'type' : 'text',
                            'name' : 'Name',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        }
        f.addComponentType(form_option);


        var form_static_group = {
            'type' : 'form-static-group',
            'selector' : null,
            parent_selector: 'form,fieldset',
            'code' : '<div class="form-group">\
        <label class="control-label">Email</label>\
        <p class="form-control-static">email@example.com</p>\
    </div>',
            'name' : 'Static group',
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(form_static_group);


        var form_static = {
            'type' : 'form-static',
            'selector' : 'p.form-control-static',
            'code' : '<p class="form-control-static">email@example.com</p>',
            'name' : 'Static field',
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(form_static);


        var form_label = {
            'type' : 'label',
            'selector' : 'label',
            'code' : '<label class="control-label">Email address</label>',
            'name' : 'Form label',
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Label options',
                    fields : {
                        'for_id' : {
                            'type' : 'text',
                            'name' : 'For field id',
                            'action' : 'element_attribute',
                            'attribute' : 'for'
                        }
                    }
                }
            })
        }
        f.addComponentType(form_label);



        var form_fieldset = {
            'type' : 'form-fieldset',
            'selector' : 'fieldset',
            parent_selector: 'form',
            'code' : '<fieldset></fieldset>',
            'name' : 'Fieldset',
            action_menu: {
                add: ['form-group', 'form-textarea-group', 'form-select-group', 'form-checkbox-group', 'form-radio-group', 'form-static-group']
            },
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        disabled: disabled
                    }
                }
            })
        }
        f.addComponentType(form_fieldset);


        var form_help = {
            'type' : 'form-help',
            'selector' : 'span.help-block',
            'code' : '<span class="help-block">A block of help text.</span>',
            'name' : 'Help text',
            'sections' : crsaAddStandardSections({

            })
        }
        f.addComponentType(form_help);

        var igspan = {
            'type' : 'input-group-span',
            'selector' : null,
            'code' : '<span>Text</span>',
            'name' : 'Text',
            'sections' : crsaAddStandardSections({})
        }
        f.addComponentType(igspan);

        var form_naked_checkbox = {
            'type' : 'form-checkbox-naked',
            'selector' : null,
            'code' : '<input type="checkbox">',
            'name' : 'Checkbox',
            'sections' : crsaAddStandardSections({

            })
        }
        f.addComponentType(form_naked_checkbox);

        var form_naked_radio = {
            'type' : 'form-radio-naked',
            'selector' : null,
            'code' : '<input type="radio">',
            'name' : 'Radio',
            'sections' : crsaAddStandardSections({

            })
        }
        f.addComponentType(form_naked_radio);


        var form_input_group = {
            'type' : 'form-input-group',
            'selector' : 'div.input-group',
            priority: 100,
            'code' : '<div class="input-group">\
        <span class="input-group-addon">@</span>\
    <input type="text" class="form-control" placeholder="Username">\
    </div>',
            'name' : 'Input field group',
            action_menu : {
                'add' : ['input-group-span', 'form-checkbox-naked', 'form-radio-naked', 'bs-button', 'button-dropdown'],
                'on_add' : function($el, $new, newdef, prepend) {
                    var spanCls = 'input-group-addon';
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    if(['form-checkbox-naked', 'form-radio-naked'].indexOf(newdef.type) >= 0) {
                        //$new = $('<span/>').append($new);
                        pgnew = new pgQuery().create('<span></span>').append(pgnew);
                    } else if(['button-dropdown'].indexOf(newdef.type) >= 0) {
                        pgnew.addClass('input-group-btn').removeClass('btn-group');
                    }
                    if($new.is('span')) {
                        pgnew.addClass(spanCls);
                    }
                    if(prepend) {
                        pgel.prepend(pgnew);
                    } else {
                        pgel.prepend(pgnew);
                    }
                }
            },
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Input group',
                    fields : {
                        size: {
                            name: 'Size',
                            type: 'select',
                            action: 'apply_class',
                            show_empty : true,
                            options: [
                                {key: 'input-group-lg', name: 'Large'},
                                {key: 'input-group-sm', name: 'Small'}
                            ]
                        }
                    }
                }
            })
        }
        f.addComponentType(form_input_group);



        //button
        var button = {
            'type' : 'bs-button',
            'selector' : '.btn',
            'name' : 'Button',
            'code' : '<button type="button" class="btn btn-default">Label</button>',
            'content_selector' : null,
            'drag_code' : null, //same as panel code
            'allowed_in' : null, //everywhere
            'sections' : crsaAddStandardSections({
                'button' : {
                    name : 'Button options',
                    fields : {
                        btlabel : {
                            type: 'text',
                            name: 'Label',
                            action: 'element_html'
                        },
                        tag : {
                            'type' : 'select',
                            'name' : 'a or button',
                            'action' : 'custom',
                            'options' : [
                                {
                                    'key' : 'a',
                                    'name' : 'Link - a tag'
                                },
                                {
                                    'key' : 'button',
                                    'name' : 'Button - button tag'
                                }
                            ],
                            show_empty: false,
                            get_value: function(obj) {
                                var $el = obj.data;
                                return $el.is('button') ? 'button' : 'a';
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                var tag = value;
                                var pgel = new pgQuery($el);
                                pgel = pgel.replaceTag(tag);
                                obj.data = $(pgel.get(0).el);

                                $.fn.crsa('setNeedsUpdate', false, obj.data);
                                return value;
                            }
                        },
                        'href' : {name : 'Href (if a)', type : 'text', action: 'element_attribute', attribute: 'href'},
                        'target' : {name : 'Target (if a)', type : 'text', action: 'element_attribute', attribute: 'target'},
                        'button-type' : {
                            'type' : 'select',
                            'name' : 'Type',
                            'action' : 'apply_class',
                            show_empty: true,
                            'options' : [
                                {
                                    'key' : 'btn-primary',
                                    'name' : 'Primary'
                                },
                                {
                                    'key' : 'btn-info',
                                    'name' : 'Info'
                                },
                                {
                                    'key' : 'btn-success',
                                    'name' : 'Success'
                                },
                                {
                                    'key' : 'btn-warning',
                                    'name' : 'Warning'
                                },
                                {
                                    'key' : 'btn-danger',
                                    'name' : 'Danger'
                                },
                                /*     {
                                 'key' : 'btn-inverse',
                                 'name' : 'Inverse'
                                 },*/
                                {
                                    'key' : 'btn-link',
                                    'name' : 'Link'
                                }
                            ]
                        },
                        size : {
                            'type' : 'select',
                            'name' : 'Size',
                            'action' : 'apply_class',
                            'show_empty' : false,
                            'options' : [
                                {
                                    'key' : 'btn-lg',
                                    'name' : 'Large'
                                },
                                {
                                    'key' : '__EMPTY__',
                                    'name' : 'Default'
                                },
                                {
                                    'key' : 'btn-sm',
                                    'name' : 'Small'
                                },
                                {
                                    'key' : 'btn-xs',
                                    'name' : 'Extra small'
                                }
                            ]
                        },
                        block : {
                            type: 'checkbox',
                            name: 'Block level',
                            action: 'apply_class',
                            value: 'btn-block'
                        },
                        active : {
                            type: 'checkbox',
                            name: 'Active',
                            action: 'apply_class',
                            value: 'active'
                        },
                        disabled: {
                            type: 'checkbox',
                            name: 'Disabled',
                            action: 'custom',
                            value: '1',
                            get_value: function(obj) {
                                var $el = obj.data;
                                return ($el.attr('disabled') != null || $el.hasClass('disabled')) ? '1' : null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if($el.is('button')) {
                                    if(value) {
                                        pgel.attr('disabled', 'disabled');
                                    } else {
                                        pgel.removeAttr('disabled');
                                    }
                                } else {
                                    if(value) {
                                        pgel.addClass('disabled');
                                    } else {
                                        pgel.removeClass('disabled');
                                    }
                                }
                                return value;
                            }
                        }
                    }
                },
                css : {
                    //inherit this from html framework
                    inherit: true
                },
                bstooltip : bsTooltipsSection,
                bspopover : bsPopoverSection,
                bsjs : {
                    name : 'Javascript',
                    fields : {
                        bsshowmodal : {
                            'type' : 'text',
                            'name' : 'Show modal',
                            'action' : 'custom',
                            live_update: false,
                            get_value: function(obj) {
                                var $el = obj.data;
                                if($el.attr('data-toggle') != 'modal') return null;
                                return $el.attr('data-target');
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.attr('data-target', value);
                                    pgel.attr('data-toggle', 'modal');
                                } else {
                                    pgel.removeAttr('data-target');
                                    pgel.removeAttr('data-toggle');
                                }
                                showJavascriptMessage();
                                return value;
                            }
                        },
                        bsdatatarget : bsDataTarget,
                        bsdatatoggle : bsDataToggle,
                        bsloading : {
                            type: 'text',
                            name: 'Loading text',
                            action: 'element_attribute',
                            attribute: 'data-loading-text',
                            live_update : false,
                            on_changed : function() {
                                showJavascriptMessage();
                            }
                        }
                    }
                }
            })
        };

        f.addComponentType(button);


        var dropdown_menu = {
            'type' : 'dropdown-menu',
            'selector' : 'ul.dropdown-menu',
            'code' : '<ul class="dropdown-menu" role="menu">\
    <li><a href="#">Action</a></li>\
    <li><a href="#">Another action</a></li>\
    <li><a href="#">Something else here</a></li>\
<li class="divider"></li>\
    <li><a href="#">Separated link</a></li>\
</ul>',
            'name' : 'Dropdown menu',
            tags: 'major',
            'action_menu' : {
                'add' : ['button-dropdown-item']
            },
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(dropdown_menu);


        var button_dropdown = {
            'type' : 'button-dropdown',
            'selector' : function($el) {
                if($el.is('.btn-group') && $el.find('> .dropdown-menu').length > 0) return true;
                return false;
            },
            'code' : '<div class="btn-group">\
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\
    Action <span class="caret"></span>\
</button>\
    <ul class="dropdown-menu" role="menu">\
    <li><a href="#">Action</a></li>\
    <li><a href="#">Another action</a></li>\
    <li><a href="#">Something else here</a></li>\
<li class="divider"></li>\
    <li><a href="#">Separated link</a></li>\
</ul>\
    </div>',
            'name' : 'Button dropdown',
            tags: 'major',
            'action_menu' : {
                'add' : ['button-dropdown-item'],
                'on_add' : function($el, $new, newdef, prepend) {
                    var $ul = $el.find('> ul.dropdown-menu');
                    var pgul = new pgQuery($ul);
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    if($ul.length == 0) {
                        pgul = new pgQuery().create('<ul class="dropdown-menu" role="menu"></ul>');
                        pgel.append(pgul);
                    }
                    if(prepend) {
                        pgul.prepend(pgnew);
                    } else {
                        pgul.append(pgnew);
                    }
                }
            },
            'sections' : crsaAddStandardSections({
                'variation' : {
                    name : 'Variations',
                    fields : {
                        dropup : {
                            name : "Dropup",
                            type : "checkbox",
                            value: 'dropup',
                            action: 'apply_class'
                        }
                    }
                }
            })
        }
        f.addComponentType(button_dropdown);

        var dropdown_classes = [
            {key: 'dropdown-header', name: 'Header'},
            {key: 'divider', name: 'Divider'},
            {key: 'disabled', name: 'Disabled'}
        ];

        var button_dropdown_item = {
            'type' : 'button-dropdown-item',
            'selector' : function($el) {
                return $el.is('li') && $el.parent().is('.dropdown-menu');
            },
            parent_selector: 'ul.dropdown-menu',
            'code' : '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>',
            'name' : 'Button dropdown item',
            'sections' : crsaAddStandardSections({
                'variation' : {
                    name : 'Dropdown item',
                    fields : {
                        type : {
                            name : "Type",
                            type : "select",
                            options : dropdown_classes,
                            show_empty: true,
                            action: 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var val = null;
                                $.each(dropdown_classes, function(i,c) {
                                    if($el.hasClass(c.key)) {
                                        val = c.key;
                                        return false;
                                    }
                                });
                                return val;
                            },
                            set_value: function(obj, value, values) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var $a = $el.find('>a');
                                var pga = new pgQuery($a);
                                var need_a = value != 'dropdown-header' && value != 'divider';
                                var text = $a.length == 0 ? pgel.html() : pga.html();
                                if(need_a) {
                                    if(!text) text = 'Action';
                                    if($a.length == 0) {
                                        pgel.html('');
                                        pga = new pgQuery().create('<a role="menuitem" tabindex="-1" href="#">Action</a>');
                                        pgel.append(pga);
                                        $a = $(pga.get(0).el);
                                    }
                                    pga.html(text);
                                } else {
                                    pga.remove();
                                    pgel.html(text);
                                }
                                $.each(dropdown_classes, function(i,c) {
                                    if(pgel.hasClass(c.key)) {
                                        pgel.removeClass(c.key);
                                    }
                                });
                                pgel.addClass(value);
                                $.fn.crsa('setNeedsUpdate', false, $el);
                                return value;
                            }
                        },
                        label : {
                            name : "Label",
                            type : "text",
                            action: 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $a = $el.find('>a');
                                if($a.length) $el = $a;
                                return $el.html();
                            },
                            set_value: function(obj, value, values) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var $a = $el.find('>a');
                                var pga = new pgQuery($a);
                                if($a.length) pgel = pga;
                                pga.html(value);
                                return value;
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(button_dropdown_item);


        var button_group_size = {
            type: 'select',
            action: 'apply_class',
            show_empty: true,
            name: 'Size',
            options: [
                {key: 'btn-group-lg', name: "Large"},
                {key: 'btn-group-sm', name: "Small"},
                {key: 'btn-group-xs', name: "Extra small"}
            ]
        }



        var button_group = {
            'type' : 'button-group',
            'selector' : 'div.btn-group, div.btn-group-vertical',
            'code' : '<div class="btn-group">\
        <button type="button" class="btn btn-default">Left</button>\
    <button type="button" class="btn btn-default">Middle</button>\
<button type="button" class="btn btn-default">Right</button>\
</div>',
            'name' : 'Button group',
            tags: 'major',
            'sections' : crsaAddStandardSections({
                'buttons' : {
                    name : 'Buttons',
                    fields : {
                        size : button_group_size,
                        orientation : {
                            name: "Orientation",
                            show_empty: false,
                            type: 'select',
                            action: 'apply_class',
                            options: [
                                {key: 'btn-group', name: "Horizontal"},
                                {key: 'btn-group-vertical', name: "Vertical"}
                            ]
                        },
                        justified : {
                            name : "Justified",
                            type : "checkbox",
                            value: 'btn-group-justified',
                            action: 'apply_class',
                            tip: "Requires link(a tag) buttons"
                        },
                        bstoggle : bsDataToggle
                    }
                }
            })
        }
        f.addComponentType(button_group);


        var button_toolbar = {
            'type' : 'button-toolbar',
            'selector' : 'div.btn-toolbar',
            'code' : '<div class="btn-toolbar" role="toolbar">\
        <div class="btn-group">\
    <button type="button" class="btn btn-default">1</button>\
    <button type="button" class="btn btn-default">2</button>\
</div>\
    <div class="btn-group">\
        <button type="button" class="btn btn-default">8</button>\
    </div>\
</div>',
            'name' : 'Button toolbar',
            'sections' : crsaAddStandardSections({

            })
        }
        f.addComponentType(button_toolbar);


        var image = {
            'type' : 'img',
            'selector' : 'img',
            'code' : function() {
                return '<img src="' + getPlaceholderImage() + '" width="200"/>'
            },
            'name' : 'Image',
            'sections' : crsaAddStandardSections({
                'image' : {
                    name : 'Image',
                    fields : {
                        'src' : {name : 'Url', type : 'image', action: 'element_attribute', attribute: 'src'},
                        'alt' : {name : 'Alt', type : 'text', action: 'element_attribute', attribute: 'alt'},
                        'width' : {name : 'Width', type : 'text', action: 'element_attribute', attribute: 'width'},
                        'height' : {name : 'Height', type : 'text', action: 'element_attribute', attribute: 'height'},
                        shape : {
                            'type' : 'select',
                            'name' : 'Shape',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {
                                    'key' : 'img-rounded',
                                    'name' : 'Rounded'
                                },
                                {
                                    'key' : 'img-circle',
                                    'name' : 'Circle'
                                },
                                {
                                    'key' : 'img-thumbnail',
                                    'name' : 'Thumbnail'
                                }
                            ]
                        },
                        responsive : {
                            type: 'checkbox',
                            name: 'Responsive',
                            action: 'apply_class',
                            value: 'img-responsive'
                        }
                    }
                }
            })
        }
        f.addComponentType(image);


        var close_button = {
            'type' : 'button-close',
            'selector' : 'button.close',
            'code' : '<button type="button" class="close" aria-hidden="true">&times;</button>',
            'name' : 'Close button',
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(close_button);


        var caret = {
            'type' : 'caret',
            'selector' : 'span.caret',
            'code' : '<span class="caret"></span>',
            'name' : 'Caret',
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(caret);


        //tabs and pills
        (function() {

            var list_item = {
                'type' : 'nav-list-item',
                'selector' : function($el) {
                    return $el.is('li') && $el.parent().is('.nav,.breadcrumb,.pagination');
                },
                parent_selector: 'ul,ol',
                'code' : '<li><a href="#">Title</a></li>',
                'name' : 'Nav item',
                priority: 100,
                'sections' : crsaAddStandardSections({
                    'list' : {
                        name : 'Nav item',
                        fields : {
                            stacked : {
                                type: 'select',
                                name: 'State',
                                action: 'apply_class',
                                'show_empty' : true,
                                'options' : [
                                    {'key' : 'active', 'name' : 'Active'},
                                    {'key' : 'disabled', 'name' : 'Disabled'}
                                ]
                            },
                            bsdropdown : {
                                'type' : 'checkbox',
                                'name' : 'Dropdown',
                                'value' : '1',
                                'action' : 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    return $el.hasClass('dropdown') ? '1' : null;
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var $a = $el.find('>a,>button');
                                    var pgel = new pgQuery($el);
                                    var pga = new pgQuery($a);
                                    if(value) {
                                        pgel.addClass('dropdown');
                                        pga.attr('data-toggle', 'dropdown');
                                        if($a.find('b.caret').length == 0) {
                                            pga.html(pga.html() + ' <b class="caret"></b>');
                                        }
                                        var $dm = $el.find('>.dropdown-menu');
                                        var pgdm = new pgQuery($dm);
                                        if($dm.length == 0) {
                                            pgdm = new pgQuery().create('<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"></ul>');
                                            pgel.append(pgdm);
                                        }
                                        showJavascriptMessage();
                                    } else {
                                        pgel.removeClass('dropdown');
                                        pga.html(pga.html().replace(/\s*<b class="caret"><\/b>/i,''));
                                        pga.removeAttr('data-toggle');
                                    }
                                    $.fn.crsa('setNeedsUpdate', false, $el);
                                    $.fn.crsa('setSelectElementOnUpdate', $el);
                                    return value;
                                }
                            },
                            bsdatatarget : bsDataTarget,
                            bsdatatoggle : bsDataToggle
                        }
                    }
                })
            }
            f.addComponentType(list_item);



            var findTabsContentPanes = function($tabs) {
                if($tabs.next().is('.tab-content')) {
                    return $tabs.next();
                }
                var $a = $tabs.find('a');
                if($a.attr('data-toggle') == 'tab') {
                    var $p = findTabPane($a);
                    if($p) {
                        var $div = $p.parent();
                        if($div.is('.tab-content')) return $div;
                    }
                }
                return null;
            }

            var findTabSel = function($a) {
                var sel = $a.attr('data-target');
                if(!sel) sel = $a.attr('href');
                if(sel) sel = sel.replace('#','');
                if(sel && sel.length == 0) sel = null;
                return sel;
            }

            var findTabPane = function($a) {
                var sel = findTabSel($a);
                if(!sel) return null;
                try {
                    var $p = $a.closest('body').find(sel);
                    return $p;
                }
                catch(err) {}
                return null;
            }

            var tag = {
                'type' : 'tabs',
                'selector' : 'ul.nav-tabs,ul.nav-pills',
                'code' : '<ul class="nav nav-tabs">\
            <li class="active"><a href="#">Home</a></li>\
        <li><a href="#">Profile</a></li>\
        <li><a href="#">Messages</a></li>\
    </ul>',
                'name' : 'Tabs',
                'action_menu' : {
                    'add' : ['nav-list-item', 'navbar-dropdown', 'bs-tab-pane'],
                    'on_add' : function($el, $new, newdef, prepend) {
                        var $panes = findTabsContentPanes($el);
                        var pgpanes = new pgQuery($panes);
                        var pgel = new pgQuery($el);
                        var pgnew = new pgQuery($new);
                        if($new.is('.tab-pane')) {
                            if(!$panes) {
                                //$panes = $('<div class="tab-content"></div>').insertAfter($el);
                                pgpanes = new pgQuery().create('<div class="tab-content"></div>').insertAfter(pgel);
                            }
                            if(prepend) {
                                pgpanes.prepend(pgnew);
                            } else {
                                pgpanes.append(pgnew);
                            }
                        } else {
                            if(!$new.is('li')) {
                                pgnew = new pgQuery().create('<li></li>').append(pgnew).addClass('dropdown');
                            }
                            if(prepend) {
                                pgel.prepend(pgnew);
                            } else {
                                pgel.append(pgnew);
                            }
                        }

                        if($panes && $new.is('li')) {
                            var $a = $new.find('>a');
                            var sel = findTabSel($a);
                            var $p = findTabPane($a);

                            var pga = new pgQuery($a);
                            var pgel = new pgQuery($el);
                            var pgp = new pgQuery($p);

                            if(!$p) {
                                if(!sel) {
                                    sel = getUniqueId('tab', null, 0);
                                    pga.attr('href', '#' + sel);
                                }
                                pga.attr('data-toggle', 'tab');
                                pgnew = new pgQuery().create('<div class="tab-pane" id="' + sel + '"><p>Tab ' + sel + ' content goes here...</p></div>');
                                if(prepend) {
                                    pgpanes.prepend(pgnew);
                                } else {
                                    pgpanes.append(pgnew);
                                }
                            }
                        }
                    }
                },
                tags : 'major',
                'sections' : crsaAddStandardSections({
                    'tabs' : {
                        name : 'Tabs and Pills',
                        fields : {
                            type : {
                                'type' : 'select',
                                'name' : 'Type',
                                'action' : 'apply_class',
                                'show_empty' : false,
                                'options' : [
                                    {'key' : 'nav-tabs', 'name' : 'Tabs'},
                                    {'key' : 'nav-pills', 'name' : 'Pills'}
                                ]
                            },
                            stacked : {
                                type: 'checkbox',
                                name: 'Stacked',
                                action: 'apply_class',
                                value: 'nav-stacked'
                            },
                            justified : {
                                type: 'checkbox',
                                name: 'Justified',
                                action: 'apply_class',
                                value: 'nav-justified'
                            },
                            'withpanes' : {
                                'type' : 'checkbox',
                                'name' : 'With panes',
                                'action' : 'custom',
                                'value' : '1',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    return findTabsContentPanes($el) ? '1' : null;
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    crsaWillChangeDom();
                                    var $el = obj.data;
                                    var $panes = findTabsContentPanes($el);
                                    var pgel = new pgQuery($el);
                                    var pgpanes = new pgQuery($panes);

                                    if(value) {
                                        var active = $el.find('>li').index($el.find('>li.active'));
                                        if(active < 0) active = 0;

                                        if(!$panes) {
                                            var html = $el.data('crsa-tab-panes');
                                            if(html) {
                                                pgpanes = pgQuery().create(html);
                                            } else {
                                                pgpanes = pgQuery().create('<div class="tab-content"></div>');
                                                $el.find('>li a').each(function(i,tab) {
                                                    var $tab = $(tab);
                                                    var pgtab = new pgQuery($tab);
                                                    var sel = findTabSel($tab);
                                                    if(!sel) {
                                                        sel = getUniqueId('tab', null, 0);
                                                        pgtab.attr('data-target', '#' + sel);
                                                    }
                                                    pgtab.attr('data-toggle', 'tab');
                                                    var pgp = new pgQuery().create('<div class="tab-pane" id="' + sel + '">Tab ' + sel + ' content goes here...</div>');
                                                    pgpanes.append(pgp);
                                                    if(i == active) {
                                                        pgp.addClass('active');
                                                    }
                                                })
                                            }
                                            pgpanes.insertAfter(pgel);
                                        }
                                        $.fn.crsa("setNeedsUpdate", false, $el.parent().has($panes) ? $el.parent() : $el.closest('body'));
                                    } else {
                                        var next = $panes && $el.parent().has($panes);
                                        if($panes) {
                                            $el.data('crsa-tab-panes', pgpanes.get(0).el.outerHTML);
                                            $panes.remove();
                                        }
                                        $.fn.crsa("setNeedsUpdate", false, next ? $el.parent() : $el.closest('body'));
                                    }
                                    showJavascriptMessage();
                                }
                            }
                        }
                    }
                })
            }
            f.addComponentType(tag);

            f.addComponentType({
                'type' : 'bs-tab-pane',
                'selector' : '.tab-pane',
                parent_selector: '.tab-content',
                'code' : '<div class="tab-pane"><p>Tab content goes here...</p></div>',
                'name' : 'Tab pane',
                //priority: 100,
                'sections' : crsaAddStandardSections({
                })
            });

        })();

        //breadcrumbs
        (function() {

            var list_item = {
                'type' : 'nav-list-item-current',
                'selector' : null,
                parent_selector: 'ul,ol',
                'code' : '<li class="active">Data</li>',
                'name' : 'Active item',
                //priority: 100,
                'sections' : crsaAddStandardSections({
                })
            }
            f.addComponentType(list_item);

            var tag = {
                'type' : 'breadcrumb',
                tags: 'major',
                'selector' : 'ol.breadcrumb',
                'code' : '<ol class="breadcrumb">\
            <li><a href="#">Home</a></li>\
        <li><a href="#">Library</a></li>\
    <li class="active">Data</li>\
    </ol>',
                'name' : 'Breadcrumbs',
                'action_menu' : {
                    'add' : ['nav-list-item', 'nav-list-item-current']
                },
                'sections' : crsaAddStandardSections({
                })
            }
            f.addComponentType(tag);

        })();


        //pagination
        (function() {

            f.addComponentType({
                'type' : 'pagination-item',
                'selector' : null,
                parent_selector: 'ul.pagination',
                'code' : '<li><a href="#">_NUM_</a></li>',
                'name' : 'Item'
            });

            f.addComponentType({
                'type' : 'pagination-current',
                'selector' : null,
                parent_selector: 'ul.pagination',
                'code' : '<li class="active"><a href="#">_NUM_ <span class="sr-only">(current)</span></a></li>',
                'name' : 'Active item'
            });

            f.addComponentType({
                'type' : 'pagination-previous',
                'selector' : null,
                parent_selector: 'ul.pagination',
                'code' : '<li><a href="#">&laquo;</a></li>',
                'name' : 'Previous'
            });

            f.addComponentType({
                'type' : 'pagination-next',
                'selector' : null,
                parent_selector: 'ul.pagination',
                'code' : '<li><a href="#">&raquo;</a></li>',
                'name' : 'Next'
            });

            var tag = {
                'type' : 'pagination',
                tags: 'major',
                'selector' : 'ul.pagination',
                'code' : '<ul class="pagination">\
            <li><a href="#">&laquo;</a></li>\
        <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>\
        <li><a href="#">2</a></li>\
        <li><a href="#">3</a></li>\
        <li><a href="#">&raquo;</a></li>\
    </ul>',
                'name' : 'Pagination',
                'action_menu' : {
                    'add' : ['pagination-item', 'pagination-current', 'pagination-previous', 'pagination-next'],
                    'on_add' : function($el, $new, newdef, prepend) {
                        var pgel = new pgQuery($el);
                        var pgnew = new pgQuery($new);
                        if(newdef.type == 'pagination-previous') {
                            pgel.prepend(pgnew);
                        } else if(newdef.type == 'pagination-next') {
                            pgel.append(pgnew);
                        } else {
                            var max = 0;
                            var list = $el.find('>li').each(function(i,li) {
                                var val = parseInt($(li).text());
                                if(val && val > max) max = val;
                            });
                            max++;
                            pgnew.html(pgnew.html().replace('_NUM_', max));

                            if(list.length > 0) {
                                var last = $(list.get(list.length-1));
                                var pglast = new pgQuery(last);
                                //console.log(last.text());
                                var t = pglast.text();
                                if(t.match(/(&raquo;|»)/i)) {
                                    pgnew.insertBefore(pglast);
                                } else {
                                    pgel.append(pgnew);
                                }
                            } else {
                                pgel.append(pgnew);
                            }
                        }
                    }
                },
                'sections' : crsaAddStandardSections({
                    'list' : {
                        name : 'Pagination',
                        fields : {
                            stacked : {
                                type: 'select',
                                name: 'Size',
                                action: 'apply_class',
                                'show_empty' : true,
                                'options' : [
                                    {'key' : 'pagination-lg', 'name' : 'Large'},
                                    {'key' : 'pagination-sm', 'name' : 'Small'}
                                ]
                            }
                        }
                    }
                })
            }
            f.addComponentType(tag);

        })();


        //pager
        (function() {

            f.addComponentType({
                'type' : 'pager-item',
                'selector' : function($el) {
                    return $el.is('li') && $el.parent().is('.pager');
                },
                parent_selector: '.pager',
                'code' : '<li><a href="#">Title</a></li>',
                'name' : 'Item',
                'sections' : crsaAddStandardSections({
                    'list' : {
                        name : 'Pager item',
                        fields : {
                            stacked : {
                                type: 'select',
                                name: 'Type',
                                action: 'apply_class',
                                'show_empty' : true,
                                'options' : [
                                    {'key' : 'previous', 'name' : 'Previous'},
                                    {'key' : 'next', 'name' : 'Next'}
                                ]
                            },
                            disabled : disabled
                        }
                    }
                })
            });

            f.addComponentType({
                'type' : 'pager-prev',
                'selector' : null,
                parent_selector: '.pager',
                'code' : '<li class="previous"><a href="#">&larr; Older</a></li>',
                'name' : 'Previous'
            });

            f.addComponentType({
                'type' : 'pager-next',
                'selector' : null,
                parent_selector: '.pager',
                'code' : '<li class="next"><a href="#">Newer &rarr;</a></li>',
                'name' : 'Next'
            });




            var tag = {
                'type' : 'pager',
                'selector' : 'ul.pager',
                'code' : '<ul class="pager">\
            <li><a href="#">Previous</a></li>\
        <li><a href="#">Next</a></li>\
    </ul>',
                'name' : 'Pager',
                'action_menu' : {
                    'add' : ['pager-item', 'pager-prev', 'pager-next']
                },
                'sections' : crsaAddStandardSections({
                })
            }
            f.addComponentType(tag);

        })();


        //navbar
        (function() {

            var findDiv = function($el, cls) {
                var $div = $el.find('div' + cls);
                if($div.length == 0) {
                    $div = $el.find('> div');
                }
                if($div.length == 0) {
                    $div = $el;
                }
                $div = $($div.get(0));
                return $div;
            }

            var findUl = function($div) {
                var $ul = $div.find('>ul.nav');
                if($ul.length == 0) {
                    $ul = $('<ul/>', {class: 'nav navbar-nav'}).appendTo($div);
                }
                return $($ul.get(0));
            }


            var navbar = {
                'type' : 'navbar',
                'selector' : '.navbar',
                'code' : '<nav class="navbar navbar-default" role="navigation">\
                <div class="container-fluid">\
                <div class="navbar-header">\
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\
                        <span class="sr-only">Toggle navigation</span>\
                        <span class="icon-bar"></span>\
                        <span class="icon-bar"></span>\
                        <span class="icon-bar"></span>\
                    </button>\
                    <a class="navbar-brand" href="#">Brand</a>\
                </div>\
\
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\
                    <ul class="nav navbar-nav">\
                        <li class="active"><a href="#">Link</a></li>\
                        <li><a href="#">Link</a></li>\
                        <li class="dropdown">\
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>\
                            <ul class="dropdown-menu">\
                                <li><a href="#">Action</a></li>\
                                <li><a href="#">Another action</a></li>\
                                <li><a href="#">Something else here</a></li>\
                                <li class="divider"></li>\
                                <li><a href="#">Separated link</a></li>\
                                <li class="divider"></li>\
                                <li><a href="#">One more separated link</a></li>\
                            </ul>\
                        </li>\
                    </ul>\
                    <form class="navbar-form navbar-left" role="search">\
                        <div class="form-group">\
                            <input type="text" class="form-control" placeholder="Search">\
                            </div>\
                            <button type="submit" class="btn btn-default">Submit</button>\
                        </form>\
                        <ul class="nav navbar-nav navbar-right">\
                            <li><a href="#">Link</a></li>\
                            <li class="dropdown">\
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>\
                                <ul class="dropdown-menu">\
                                    <li><a href="#">Action</a></li>\
                                    <li><a href="#">Another action</a></li>\
                                    <li><a href="#">Something else here</a></li>\
                                    <li class="divider"></li>\
                                    <li><a href="#">Separated link</a></li>\
                                </ul>\
                            </li>\
                        </ul>\
                    </div>\
                </div>\
            </nav>',
                'name' : 'Navbar',
                tags: 'major',
                'action_menu' : {
                    'add' : ['link', 'navbar-brand', 'navbar-form', 'navbar-list', 'navbar-dropdown'],
                    'on_add' : function($el, $new, newdef, prepend) {

                        var pgel = new pgQuery($el);
                        var pgnew = new pgQuery($new);

                        if(['link', 'navbar-dropdown'].indexOf(newdef.type) >= 0) {
                            var $div = findDiv($el, '.navbar-collapse');
                            var $ul = findUl($div);
                            var pgli = new pgQuery().create('<li></li>');
                            var pgul = new pgQuery($ul);
                            pgul.append(pgli);

                            if(prepend) {
                                pgli.prepend(pgnew);
                            } else {
                                pgli.append(pgnew);
                            }

                        } else if(['navbar-brand'].indexOf(newdef.type) >= 0) {
                            var $div = findDiv($el, '.navbar-header');
                            var pgdiv = new pgQuery($div);
                            if(prepend) {
                                pgdiv.prepend(pgnew);
                            } else {
                                pgdiv.append(pgnew);
                            }
                        } else if(['navbar-form' ,'navbar-list'].indexOf(newdef.type) >= 0) {
                            var $div = findDiv($el, '.navbar-collapse');
                            var pgdiv = new pgQuery($div);
                            if(prepend) {
                                pgdiv.prepend(pgnew);
                            } else {
                                pgdiv.append(pgnew);
                            }
                        }
                    }
                },
                'sections' : crsaAddStandardSections({
                    navbar : {
                        name : 'Navbar style',
                        fields : {
                            collapse : {
                                name : 'Collapsable',
                                'type': 'checkbox' ,
                                value: '1',
                                action: "custom",
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    return $el.find('.navbar-collapse').length > 0 ? '1' : null;
                                },
                                set_value: function(obj, value, values) {
                                    crsaWillChangeDom();
                                    var $el = obj.data;
                                    var $container = $el.find('.container,.container-fluid');
                                    var pgel = new pgQuery($el);
                                    var pgcontainer = new pgQuery($container);
                                    if($container.length == 0) {
                                        $container = $el;
                                        pgcontainer = pgel;
                                    }
                                    if(value) {

                                        var $header = $el.find('.navbar-header');
                                        var pgheader = new pgQuery($header);
                                        if($header.length == 0) {
                                            pgheader = new pgQuery().create('<div class="navbar-header"></div>');
                                            pgcontainer.prepend(pgheader);
                                        }
                                        var $brand = $el.find('.navbar-brand');
                                        var pgbrand = new pgQuery($brand);
                                        if($brand.length > 0) {
                                            if($header.has($brand).length == 0) {
                                                pgheader.append(pgbrand);
                                            }
                                        }
                                        var $content = $el.find('.navbar-collapse');
                                        var pgcontent = new pgQuery($content);
                                        var cid = null;
                                        if($content.length) pgcontent.attr('id');
                                        if(!cid) cid = getUniqueId("nav", null, 0);
                                        if($content.length == 0) {
                                            pgcontent = new pgQuery().create('<div class="collapse navbar-collapse" id="' + cid + '"></div>');
                                            pgcontainer.append(pgcontent);
                                        } else {
                                            pgcontent.addClass('collapse').addClass('navbar-collapse');
                                        }
                                        var $button = $el.find('.navbar-toggle');
                                        var pgbutton = new pgQuery($button);
                                        if($button.length == 0) {
                                            var pgbutton = new pgQuery().create('<button class="navbar-toggle" data-toggle="collapse" data-target="#' + cid + '"></button>');
                                            pgbutton.html('<span class="sr-only">Toggle navigation</span>\
                    <span class="icon-bar"></span>\
                    <span class="icon-bar"></span>\
                    <span class="icon-bar"></span>');
                                        }
                                        pgheader.prepend(pgbutton);

                                        $container.children().each(function(i, e) {
                                            if(e != $header.get(0) && e != $content.get(0)) {
                                                pgcontent.append(new pgQuery($(e)));
                                            }
                                        });

                                    } else {
                                        var $header = $el.find('.navbar-header');
                                        var $button = $el.find('.navbar-toggle').remove();
                                        var $content = $el.find('.navbar-collapse');

                                        var pgheader = new pgQuery($header);
                                        var pgbutton = new pgQuery($button);
                                        var pgcontent = new pgQuery($content);


                                        $content.children().each(function(i, e) {
                                            if(e != $button.get(0)) {
                                                pgcontainer.append(new pgQuery($(e)));
                                            }
                                        });
                                       // $header.remove();
                                        pgbutton.remove();
                                        pgcontent.remove();
                                    }
                                    $.fn.crsa('setNeedsUpdate', false, $el);
                                    return value;
                                }
                            },
                            type : {
                                name : 'Type',
                                'type': 'select' ,
                                show_empty: true,
                                action: "apply_class",
                                options: [
                                    {key: "navbar-fixed-top", name: "Fixed - top", tip: "Add padding-top to body to prevent navbar overlapping the content."},
                                    {key: "navbar-fixed-bottom", name: "Fixed - bottom", tip: "Add padding-bottom to body to prevent navbar overlapping the content."},
                                    {key: "navbar-static-top", name: "Static - top"}
                                ]
                            },
                            inverse : {
                                name : 'Inverse',
                                'type': 'checkbox' ,
                                value: 'navbar-inverse',
                                action: "apply_class"
                            }
                        }
                    }
                })
            }
            f.addComponentType(navbar);

            var brand = {
                'type' : 'navbar-brand',
                'selector' : '.navbar-brand',
                'code' : '<a class="navbar-brand" href="#">Brand</a>',
                'name' : 'Brand',
                'sections' : crsaAddStandardSections({
                    link : {
                        name : 'Link',
                        fields : {
                            'href' : {name : 'Url', type : 'text', action: 'element_attribute', attribute: 'href'},
                            'target' : {name : 'Target', type : 'text', action: 'element_attribute', attribute: 'target'}
                        }
                    }
                })
            }
            f.addComponentType(brand);

            var form = {
                'type' : 'navbar-form',
                'selector' : null,
                'code' : '<form class="navbar-form navbar-left" role="search">\
        <div class="form-group">\
            <input type="text" class="form-control" placeholder="Search">\
            </div>\
            <button type="submit" class="btn btn-default">Submit</button>\
        </form>',
                'name' : 'Navbar form',
                'sections' : crsaAddStandardSections({
                })
            }
            f.addComponentType(form);


            var section = {
                'type' : 'navbar-list',
                'selector' : 'ul.navbar-nav',
                'code' : '<ul class="nav navbar-nav"></ul>',
                'name' : 'Navbar section',
                tags: 'major',
                'action_menu' : {
                    'add' : ['link', 'navbar-dropdown'],
                    'on_add' : function($el, $new, newdef, prepend) {
                        var pgel = new pgQuery($el);
                        var pgli = new pgQuery().create('<li></li>');
                        var pgnew = new pgQuery($new);
                        pgel.append(pgli);

                        if(prepend) {
                            pgli.prepend(pgnew);
                        } else {
                            pgli.append(pgnew);
                        }
                    }
                },
                'sections' : crsaAddStandardSections({
                    layout : {
                        name : 'Navbar section',
                        fields : {
                            type : {
                                name : 'Position',
                                'type': 'select' ,
                                show_empty: true,
                                action: "apply_class",
                                options: [
                                    {key: "navbar-left", name: "Left" },
                                    {key: "navbar-right", name: "Right" }
                                ]
                            },
                            scrollspy : {
                                name : 'Scrollspy',
                                'type': 'checkbox' ,
                                value: '1',
                                action: "custom",
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var $b = $el.closest('body');
                                    var dt = $b.attr('data-target');
                                    if($b.attr('data-spy') == 'scroll' && dt && $el.parent().is(dt)) {
                                        return '1';
                                    }
                                    return null;
                                },
                                set_value: function(obj, value, values) {
                                    var $el = obj.data;
                                    var $b = $el.closest('body');
                                    var pgel = new pgQuery($el);
                                    var pgb = new pgQuery($b);
                                    if(value) {
                                        var $p = $el.parent();
                                        var pgp = new pgQuery($p);
                                        var id = pgp.attr('id');
                                        if(!id) {
                                            id = getUniqueId('nav', null, 0);
                                            pgp.attr('id', id);
                                        }
                                        pgb.attr('data-spy', 'scroll');
                                        pgb.attr('data-target', '#' + id);
                                    } else {
                                        pgb.removeAttr('data-spy');
                                        pgb.removeAttr('data-target');
                                    }
                                    showJavascriptMessage();
                                    return value;
                                }
                            }
                        }
                    }
                })
            }
            f.addComponentType(section);



            var dropdown = {
                'type' : 'navbar-dropdown',
                'selector' : null,
                'code' : '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>',
                'name' : 'Dropdown',
                on_inserted : function($el, page) {
                    var pgel = new pgQuery($el);
                    var pgul = new pgQuery().create('<ul class="dropdown-menu">\
                            <li><a href="#">Action</a></li>\
                            <li><a href="#">Another action</a></li>\
                            <li class="divider"></li>\
                            <li><a href="#">Separated link</a></li>\
                        </ul>');
                    pgul.insertAfter(pgel);
                },
                'sections' : crsaAddStandardSections({

                })
            }
            f.addComponentType(dropdown);

        })();



        //lists

        var list = {
            'type' : 'list',
            tags: 'major',
            'selector' : 'ul,ol',
            'code' : '<ul>\
        <li>Lorem ipsum dolor sit amet</li>\
    <li>Consectetur adipiscing elit</li>\
    <li>Integer molestie lorem at massa</li>\
    <li>Nulla volutpat aliquam velit\
    <ul>\
    <li>Phasellus iaculis neque</li>\
    <li>Purus sodales ultricies</li>\
    </ul>\
    </li>\
</ul>',
            'name' : 'List',
            'action_menu' : {
                'add' : ['list_item']
            },
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
                    fields : {
                        'ordered' : {
                            'type' : 'checkbox',
                            'name' : 'Ordered',
                            'action' : 'custom',
                            'value' : '1',
                            get_value: function(obj) {
                                var $el = obj.data;
                                return $el.get(0).nodeName == "OL" ? "1" : null;
                            },
                            set_value: function(obj, value, values) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var tag = value == "1" ? 'ol' : 'ul';
                                pgel = pgel.replaceTag(tag);
                                obj.data = $(pgel.get(0).el);

                                $.fn.crsa("setNeedsUpdate", false, $el);
                                return value;
                            }
                        },
                        'unstyled' : {
                            'type' : 'checkbox',
                            'name' : 'Unstyled',
                            'action' : 'apply_class',
                            'value' : 'list-unstyled'
                        },
                        'inline' : {
                            'type' : 'checkbox',
                            'name' : 'Inline',
                            'action' : 'apply_class',
                            'value' : 'list-inline'
                        }
                    }
                }
            })
        }
        f.addComponentType(list);

        var list_item = {
            'type' : 'list_item',
            'selector' : 'li',
            parent_selector: 'ol,ul',
            'code' : '<li>List item</li>',
            'name' : 'List Item',
            'sections' : crsaAddStandardSections({

            })
        }
        f.addComponentType(list_item);


        //labels, badges
        (function() {

            f.addComponentType({
                'type' : 'span-label',
                'selector' : 'span.label',
                'code' : '<span class="label label-default">New</span>',
                'name' : 'Label',
                'sections' : crsaAddStandardSections({
                    'list' : {
                        name : 'Label',
                        fields : {
                            value : {
                                type: 'text',
                                name: 'Value',
                                action: 'element_html'
                            },
                            variation : {
                                type: 'select',
                                name: 'Type',
                                action: 'apply_class',
                                'show_empty' : true,
                                'options' : [
                                    {'key' : 'label-default', 'name' : 'Default'},
                                    {'key' : 'label-primary', 'name' : 'Primary'},
                                    {'key' : 'label-success', 'name' : 'Success'},
                                    {'key' : 'label-info', 'name' : 'Info'},
                                    {'key' : 'label-warning', 'name' : 'Warning'},
                                    {'key' : 'label-danger', 'name' : 'Danger'}
                                ]
                            }
                        }
                    }
                })
            });

            f.addComponentType({
                'type' : 'badge',
                'selector' : 'span.badge',
                'code' : '<span class="badge">42</span>',
                'name' : 'Badge',
                'sections' : crsaAddStandardSections({
                    'badge' : {
                        name : 'Badge',
                        fields : {
                            value : {
                                type: 'text',
                                name: 'Value',
                                action: 'element_html'
                            }
                        }
                    }
                })
            });


            f.addComponentType({
                'type' : 'page-header',
                'selector' : 'div.page-header',
                'code' : '<div class="page-header">\
            <h1>Example page header <small>Subtext for header</small></h1>\
        </div>',
                'name' : 'Page header',
                'sections' : crsaAddStandardSections({
                })
            });

        })();


        //jumbotron
        (function() {

            f.addComponentType({
                'type' : 'jumbotron',
                tags: 'major',
                'selector' : 'div.jumbotron',
                'code' : '<div class="jumbotron">\
            <h1>Hello, world!</h1>\
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>\
            <p><a class="btn btn-primary btn-lg" role="button">Learn more</a></p>\
        </div>',
                'name' : 'Jumbotron',
                'action_menu' : {
                    'add' : ['jumbotron-h1', 'jumbotron-p', 'jumbotron-b'],
                    'on_add' : function($el, $new, newdef, prepend) {
                        var $c = $el.find('.container,.container-fluid');
                        var pgel = new pgQuery($el);
                        var pgnew = new pgQuery($new);
                        if($c.length > 0) {
                            $el = $($c.get(0));
                            pgel = new pgQuery($el);
                        }
                        if(newdef.type == 'jumbotron-b') {
                            var $bs = $el.find('.btn').last();
                            var pgbs = new pgQuery($bs);
                            if($bs.length > 0) {
                                pgnew.insertAfter(pgbs);
                                pgCreateNodeFromHtml('&nbsp;').insertBefore(pgnew.get(0).pgel);
                                $new.before('&nbsp;');
                            } else {
                                $new = $('<p/>').append($new);
                                pgnew = new pgQuery('<p></p>').append(pgnew);
                                if(prepend) {
                                    pgel.prepend(pgnew);
                                } else {
                                    pgel.append(pgnew);
                                }
                            }
                        } else {
                            if(prepend) {
                                pgel.prepend(pgnew);
                            } else {
                                pgel.append(pgnew);
                            }
                        }
                    }
                },
                'sections' : crsaAddStandardSections({
                    'list' : {
                        name : 'Jumbotron',
                        fields : {
                            fullscreen : {
                                type: 'checkbox',
                                name: 'Full width',
                                action: 'custom',
                                value: "1",
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var $c = $el.closest('.container,.container-fluid');
                                    return $c.length == 0 ? '1' : null;
                                },
                                set_value: function(obj, value, values) {
                                    crsaWillChangeDom();
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);

                                    var putOutOfContainer = function() {
                                        var list = $el.parents('.container,.container-fluid');
                                        if(list.length == 0) return;
                                        var top = $(list.get(0));
                                        var pgtop = new pgQuery(top);
                                        pgel.detach();
                                        pgel.insertBefore(pgtop);
                                    }

                                    var putContentInContainer = function() {
                                        var $c = $el.find('> .container, > .container-fluid');
                                        var pgc = new pgQuery($c);
                                        if($c.length == 0) {
                                            pgc = new pgQuery().create('<div class="container"></div>');
                                        }
                                        //pgc.html(pgc.html() + pgel.html());
                                        pgc.append(pgel.contents());
                                        pgel.append(pgc);
                                    }

                                    var putContentOutOfContainer = function() {
                                        var $c = $el.find('> .container, > .container-fluid');
                                        if($c.length == 0) return;
                                        var pgc = new pgQuery($c);
                                        pgc.detach();
                                        //pgel.html(pgc.html() + pgel.html());
                                        pgel.append(pgc.contents());
                                        pgc.remove();
                                    }

                                    var putInContainer = function() {
                                        var list = $el.parents('.container,.container-fluid');
                                        if(list.length > 0) return;

                                        var $body = $el.closest('body');
                                        pgel.detach();
                                        var $clist = $body.find('.container,.container-fluid');
                                        var $c = null;
                                        $clist.each(function(i, ctr) {
                                            if($(ctr).closest('.navbar').length == 0) {
                                                $c = $(ctr);
                                                return false;
                                            }
                                        });
                                        var pgc;
                                        if($c.length > 0) {
                                            pgc = new pgQuery($($c.get(0)));
                                        } else {
                                            pgc = new pgQuery().create('<div class="container"></div>');
                                            new pgQuery($body).prepend(pgc);
                                        }
                                        pgc.prepend(pgel);
                                    }

                                    if(value) {
                                        putOutOfContainer();
                                        putContentInContainer();
                                    } else {
                                        putInContainer();
                                        putContentOutOfContainer();
                                    }
                                    $.fn.crsa('setNeedsUpdate');
                                    return value;
                                }
                            }
                        }
                    }
                })
            });

            f.addComponentType({
                'type' : 'jumbotron-p',
                'selector' : null,
                parent_selector: '.jumbotron',
                'code' : '<p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>',
                'name' : 'Text',
                'sections' : crsaAddStandardSections({
                })
            });
            f.addComponentType({
                'type' : 'jumbotron-h1',
                'selector' : null,
                parent_selector: '.jumbotron',
                'code' : '<h1>Hello, world!</h1>',
                'name' : 'Title',
                'sections' : crsaAddStandardSections({
                })
            });
            f.addComponentType({
                'type' : 'jumbotron-b',
                'selector' : null,
                parent_selector: '.jumbotron,.jumbotron p',
                'code' : '<a class="btn btn-primary btn-lg" role="button">Learn more</a>',
                'name' : 'Button',
                'sections' : crsaAddStandardSections({
                })
            });

        })();



        //thumbnails
        (function() {

            f.addComponentType({
                'type' : 'thumbnail-img',
                'selector' : null,
                tags: 'major',
                parent_selector: '.row',
                invalid_drop_msg : columnPlaceMsg,
                'code' : function() {
                    return '<div class="col-xs-6 col-md-3">\
        <a href="#" class="thumbnail">\
            <img src="' + getPlaceholderImage() + '" alt="">\
        </a>\
        </div>';
                },
                'preview' : function() {
                    return '<div class="col-xs-12">\
        <a href="#" class="thumbnail">\
            <img src="' + getPlaceholderImage() + '" alt="">\
        </a>\
        </div>';
                },
                'name' : 'Image thumbnail',
                'sections' : crsaAddStandardSections({
                })
            });


            f.addComponentType({
                'type' : 'thumbnail-content',
                'selector' : null,
                tags: 'major',
                parent_selector: '.row',
                invalid_drop_msg : columnPlaceMsg,
                'code' : '<div class="col-sm-6 col-md-4">\
            <div class="thumbnail">\
        <img src="' + getPlaceholderImage() + '" alt="">\
            <div class="caption">\
                <h3>Thumbnail label</h3>\
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\
                <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>\
            </div>\
        </div>\
        </div>',
                'preview' : '<div class="col-sm-12">\
            <div class="thumbnail">\
        <img src="' + getPlaceholderImage() + '" alt="">\
            <div class="caption">\
                <h3>Thumbnail label</h3>\
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\
                <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>\
            </div>\
        </div>\
        </div>',
                'name' : 'Content thumbnail',
                'sections' : crsaAddStandardSections({
                })
            });



        })();



        //alerts
        (function() {

            f.addComponentType({
                'type' : 'alert',
                'selector' : 'div.alert',
                'code' : '<div class="alert alert-success">\
            <strong>Well done!</strong> You successfully read this important alert message.\
        </div>',
                'name' : 'Alert',
                action_menu: {
                    actions : [
                        {label: "Style links", action: function($el) {
                            $el.find('a').addClass('alert-link');
                        }}
                    ]
                },
                'sections' : crsaAddStandardSections({
                    'style' : {
                        name : 'Alert',
                        fields : {
                            'type' : {
                                'type' : 'select',
                                'name' : 'Type',
                                'action' : 'apply_class',
                                show_empty: false,
                                'options' : [
                                    {key: 'alert-success', name: 'Success'},
                                    {key: 'alert-info', name: 'Info'},
                                    {key: 'alert-warning', name: 'Warning'},
                                    {key: 'alert-danger', name: 'Danger'}
                                ]
                            },
                            'close' : {
                                'type' : 'checkbox',
                                'name' : 'Dismissable',
                                'value' : "1",
                                'action' : 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    return $el.find("button.close").length > 0 ? "1" : null;
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    crsaWillChangeDom();
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    var $b = $el.find('button.close');
                                    var pgb = new pgQuery($b);
                                    if(value) {
                                        if($b.length == 0) {
                                            pgb = new pgQuery().create('<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>').html('&times;');
                                            pgel.prepend(pgb);
                                        }
                                    } else {
                                        pgb.remove();
                                    }
                                    $.fn.crsa('setNeedsUpdate', false, $el);
                                    return value;
                                }
                            }
                        }
                    }
                })
            });

        })();

        //progress bar
        (function() {

            f.addComponentType({
                'type' : 'progress',
                'selector' : 'div.progress',
                'code' : '<div class="progress">\
            <div class="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">\
        <span class="sr-only">30% Complete</span>\
        </div>\
    </div>',
                'preview' : '<div class="progress progress-striped active">\
            <div class="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">\
        <span class="sr-only">30% Complete</span>\
        </div>\
        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%;">\
        <span class="sr-only">20% Complete</span>\
        </div>\
    </div>',
                'name' : 'Progress bar',
                tags: 'major',
                action_menu : {
                    add: ['progress-bar']
                },
                'sections' : crsaAddStandardSections({
                    'style' : {
                        name : 'Progress bar',
                        fields : {
                            'striped' : {
                                'type' : 'checkbox',
                                'name' : 'Striped',
                                'value' : "progress-striped",
                                'action' : 'apply_class'
                            },
                            'animated' : {
                                'type' : 'checkbox',
                                'name' : 'Animated',
                                'value' : "active",
                                'action' : 'apply_class'
                            }
                        }
                    }
                })
            });

            var options = [
                {key: 'progress-bar-success', name: 'Success'},
                {key: 'progress-bar-info', name: 'Info'},
                {key: 'progress-bar-warning', name: 'Warning'},
                {key: 'progress-bar-danger', name: 'Danger'}
            ];

            f.addComponentType({
                'type' : 'progress-bar',
                'selector' : 'div.progress-bar',
                parent_selector: 'div.progress',
                'code' : '<div class="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%;">\
        <span class="sr-only">30% Complete</span>\
    </div>',
                'preview' : '<div class="progress">\
            <div class="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%;">\
        <span class="sr-only">30% Complete</span>\
    </div>',
                'name' : 'Progress bar section',
                'sections' : crsaAddStandardSections({
                    'style' : {
                        name : 'Progress bar section',
                        fields : {
                            'type' : {
                                'type' : 'select',
                                'name' : 'Type',
                                'action' : 'apply_class',
                                show_empty: false,
                                'options' : options
                            },
                            'percent' : {
                                'type' : 'text',
                                'name' : 'Completed %',
                                'action' : 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    var v = pgel.attr('aria-valuenow');
                                    if(v !== null) return v;
                                    var w = $el.get(0).style.width;
                                    w = w != null ? w.replace('%', '') : null;
                                    return w;
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    var v = value == null ? 50 : parseInt(value);
                                    if(v > 100) v = 100;
                                    //$el.get(0).style.width = v + '%';
                                    pgel.attr('aria-valuenow', v).attr('style', 'width:' + v + '%');
                                    var t = v + '% Complete';
                                    for(var n = 0; n < options.length; n++) {
                                        if(pgel.hasClass(options[n].key)) {
                                            t += ' (' + options[n].name + ')';
                                            break;
                                        }
                                    }
                                    new pgQuery($el.find('span')).html(t);
                                    return value;
                                }
                            }
                        }
                    }
                })
            });


        })();


        //media
        (function() {

            /*
            f.addComponentType({
                'type' : 'media',
                tags: 'major',
                'selector' : 'div.media',
                'code' : function() {
                    return '<div class="media">\
            <a class="pull-left" href="#">\
        <img class="media-object" src="' + getPlaceholderImage() + '" width="100">\
        </a>\
        <div class="media-body">\
        <h4 class="media-heading">Media heading</h4>\
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\
    </div>\
    </div>';
                },
                'name' : 'Media',
                'sections' : crsaAddStandardSections({
                })
            });
            */

            f.addComponentType({
                'type' : 'media-list',
                'selector' : 'ul.media-list',
                'code' : function() {
                    return '<ul class="media-list">\
                    <li class="media">\
                            <a class="pull-left" href="#">\
                        <img class="media-object" src="' + getPlaceholderImage() + '" width="100">\
                        </a>\
                        <div class="media-body">\
                        <h4 class="media-heading">Media heading</h4>\
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\
                    </div>\
                    </li>\
                    <li class="media">\
                        <a class="pull-left" href="#">\
                            <img class="media-object" src="' + getPlaceholderImage() + '" width="100">\
                            </a>\
                            <div class="media-body">\
                                <h4 class="media-heading">Media heading</h4>\
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\
                            </div>\
                        </li>\
                    </ul>';
                },
                'name': 'Media list',
                priority: 100,
                //preview: 'none',
                'action_menu' : {
                    'add' : ['media-list-item']
                },
                'sections' : crsaAddStandardSections({
                })
            });

            f.addComponentType({
                'type' : 'media-list-item',
                'priority' : 100,
                'selector' : 'li.media',
                'code' : function() {
                    return '<li class="media">\
                            <a class="pull-left" href="#">\
                        <img class="media-object" src="' + getPlaceholderImage() + '" width="100">\
                        </a>\
                        <div class="media-body">\
                        <h4 class="media-heading">Media heading</h4>\
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\
                    </div>\
                    </li>';
                },
                'name': 'Media list item',
                'sections' : crsaAddStandardSections({
                })
            });

            /*

             f.addComponentType({
             'type' : 'progress-bar',
             'selector' : 'div.progress-bar',
             'code' : '',
             'name' : 'Progress bar section',
             'sections' : crsaAddStandardSections({
             'style' : {
             name : 'Progress bar section',
             fields : {
             'type' : {
             'type' : 'select',
             'name' : 'Type',
             'action' : 'apply_class',
             show_empty: false,
             'options' : options
             },
             'percent' : {
             'type' : 'text',
             'name' : 'Completed %',
             'action' : 'custom',
             get_value: function(obj) {
             var $el = obj.data;
             var w = $el.get(0).style.width;
             w = w != null ? w.replace('%', '') : null;
             return w;
             },
             set_value: function(obj, value, values, oldValue, eventType) {
             var $el = obj.data;
             var v = value == null ? 50 : parseInt(value);
             if(v > 100) v = 100;
             $el.get(0).style.width = v + '%';
             $el.attr('aria-valuenow', v);
             var t = v + '% Complete';
             for(var n = 0; n < options.length; n++) {
             if($el.hasClass(options[n].key)) {
             t += ' (' + options[n].name + ')';
             break;
             }
             }
             var $s = $el.find('span').html(t);
             return value;
             }
             }
             }
             }
             })
             });
             */

        })();


        //list group
        (function() {

            f.addComponentType({
                'type' : 'list-group',
                'selector' : 'ul.list-group,div.list-group',
                priority: 100,
                'code' : '<ul class="list-group">\
            <li class="list-group-item">Cras justo odio</li>\
            <li class="list-group-item">Dapibus ac facilisis in</li>\
            <li class="list-group-item">Morbi leo risus</li>\
    </ul>',
                'name' : 'List group',
                'action_menu' : {
                    'add' : ['list-group-item']
                },
                tags: 'major',
                'sections' : crsaAddStandardSections({
                    'style' : {
                        name : 'List group',
                        fields : {
                            'percent' : {
                                'type' : 'checkbox',
                                'name' : 'Linked',
                                'value' : '1',
                                'action' : 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    return $el.is('div') ? '1' : null;
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    crsaWillChangeDom();
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    var dmain = value == '1' ? 'div' : 'ul';
                                    var ditem = value == '1' ? 'a' : 'li';
                                    var $newel;
                                    var pgnewel;
                                    if(!$el.is(dmain)) {
                                        var items = $el.children().detach();
                                        //$newel = replaceTag($el, dmain);
                                        pgnewel = pgel.replaceTag(dmain);
                                        obj.data = $(pgnewel.get(0).el);
                                        $newel = obj.data;
                                    } else {
                                        $newel = $el;
                                        pgnewel = pgel;
                                    }

                                    var newels = [];
                                    items.each(function(i, item) {
                                        var $item = $(item);
                                        var pgitem = new pgQuery($item);
                                        if($item.is(ditem)) {
                                            newels.push(pgitem);
                                        } else {
                                            var pgnew = pgitem.replaceTag(ditem);
                                            if(ditem == 'a') pgnew.attr('href', '#')
                                            newels.push(pgnew);
                                        }
                                    });
                                    for(var n = 0; n < newels.length; n++) {
                                        pgnewel.append(newels[n]);
                                    }
                                    $.fn.crsa('setNeedsUpdate', false, $newel);
                                    return value;
                                }
                            }
                        }
                    }
                })
            });

            f.addComponentType({
                'type' : 'list-group-item',
                'selector' : 'li.list-group-item',
                priority: 100,
                parent_selector: 'ul,ol',
                'code' : '<li class="list-group-item">Cras justo odio</li>',
                'name' : 'List group item',
                'action_menu' : {
                    'add' : ['h4', 'p', 'img','badge']
                },
                'sections' : crsaAddStandardSections({
                })
            });

            f.addComponentType({
                'type' : 'list-group-item-link',
                'selector' : 'a.list-group-item',
                priority: 100,
                parent_selector: '.list-group',
                'code' : '<a class="list-group-item" href="#">Cras justo odio</a>',
                'name' : 'List group item',
                'action_menu' : {
                    'add' : ['h4', 'p', 'img','badge']
                },
                'sections' : crsaAddStandardSections({
                    link : {
                        name : 'Link',
                        fields : {
                            'href' : {name : 'Url', type : 'text', action: 'element_attribute', attribute: 'href'},
                            'active' : {
                                'type' : 'checkbox',
                                'name' : 'Active',
                                'value' : 'active',
                                'action' : 'apply_class'
                            }
                        }
                    }
                })
            });

        })()


        //panels

        f.addComponentType({
            'type' : 'panel',
            tags: 'major',
            'selector' : 'div.panel',
            priority: 100,
            'code' : '<div class="panel">\
        <div class="panel-body">Basic panel example</div>\
    </div>',
            'name' : 'Panel',
            action_menu: {
                add: ['panel-heading', 'panel-footer', 'table', 'list-group'],
                on_add : function($el, $new, newdef) {
                    var pgEl = new pgQuery($el);
                    var pgNew = new pgQuery($new);
                    if(newdef.type == 'panel-heading') {
                        pgEl.prepend(pgNew);
                        //$el.prepend($new);
                    } else if(newdef.type == 'panel-footer') {
                        pgEl.append(pgNew);
                        //$el.append($new);
                    } else if(newdef.type == 'table' || newdef.type == 'list-group') {

                        var $b = $el.find('>.panel-body');
                        if($b.length == 0) {
                            pgEl.append(pgNew);
                            //$el.append($new);
                        } else {
                            pgNew.insertAfter(new pgQuery($b.last()));
                            //$new.insertAfter($b.last());
                        }
                    }
                }
            },
            'sections' : crsaAddStandardSections({
                'panel' : {
                    name : 'Panel',
                    fields : {
                        variation : {
                            type: 'select',
                            name: 'Type',
                            action: 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {'key' : 'panel-primary', 'name' : 'Primary'},
                                {'key' : 'panel-success', 'name' : 'Success'},
                                {'key' : 'panel-info', 'name' : 'Info'},
                                {'key' : 'panel-warning', 'name' : 'Warning'},
                                {'key' : 'panel-danger', 'name' : 'Danger'}
                            ]
                        }
                    }
                }
            })
        });



        f.addComponentType({
            'type' : 'panel-heading',
            'selector' : 'div.panel-heading',
            parent_selector: '.panel',
            priority: 100,
            'code' : '<div class="panel-heading">Panel heading without title</div>',
            'name' : 'Panel heading',
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Panel heading',
                    fields : {
                        'tag' : {
                            'type' : 'select',
                            'name' : 'Title tag',
                            'action' : 'custom',
                            show_empty: true,
                            'options' : hoptions,
                            get_value: function(obj) {
                                var $el = obj.data;
                                for(var i = 0; i < hoptions.length; i++) {
                                    if($el.find(hoptions[i].key).length > 0) {
                                        return hoptions[i].key;
                                    }
                                }
                                return null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var t = pgel.text();
                                if(value) {
                                    var pgh = new pgQuery().create('<' + value + '></' + value + '>').html(t);
                                    pgel.html('').append(pgh);
                                } else {
                                    pgel.html(t);
                                }
                                return value;
                            }
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'panel-footer',
            'selector' : 'div.panel-footer',
            parent_selector: '.panel',
            'code' : '<div class="panel-footer">Panel footer</div>',
            'name' : 'Panel footer',
            'sections' : crsaAddStandardSections({
            })
        });



/*
        var getCssValueForShorthandable = function(values, f, sf, base_on_equal) {
            var ptoa = {
                left: [0, 1, 1, 3],
                right: [0, 1, 1, 1],
                top: [0, 0, 0, 0],
                bottom: [0, 0, 2, 2]
            };
            var v = null;
            $.each(values, function(fn, fv) {
                var vobj = null;
                if(fn == f + '-' + sf) {
                    v = fv.value;
                } else if(fn == f) {
                    if(base_on_equal) {
                        v = fv.value;
                    } else {
                        var a = splitCssValue(fv.value);
                        if(a.length == 0) return null;

                        var imp = null;
                        if(a[a.length-1].match(/!important/i)) {
                            imp = a.pop();
                        }
                        if(a.length > 0 && a.length <= 4) {
                            v = a[ptoa[sf][a.length-1]];
                        }
                        if(imp) v = v + " " + imp;
                    }
                }
            });
            return v;
        }
*/

        f.addComponentType({
            'type' : 'well',
            'selector' : 'div.well',
            'code' : '<div class="well">Look, I\'m in a well!</div>',
            'name' : 'Well',
            'sections' : crsaAddStandardSections({
                'panel' : {
                    name : 'Well',
                    fields : {
                        variation : {
                            type: 'select',
                            name: 'Size',
                            action: 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {'key' : 'well-lg', 'name' : 'Large'},
                                {'key' : 'well-sm', 'name' : 'Small'}
                            ]
                        }
                    }
                }
            })
        });


        var link = {
            'type' : 'link',
            'selector' : 'a[href]',
            'code' : '<a href="http://">Link</a>',
            'name' : 'Link',
            'inline_edit' : true,
            'sections' : crsaAddStandardSections({
                link : {
                    name : 'Link',
                    fields : {
                        'href' : {name : 'Url', type : 'text', action: 'element_attribute', attribute: 'href'},
                        'target' : {name : 'Target', type : 'text', action: 'element_attribute', attribute: 'target'}
                    }
                },
                bstooltip : bsTooltipsSection,
                bspopover : bsPopoverSection
            })
        }
        f.addComponentType(link);

        link = {
            'type' : 'anchor',
            'selector' : 'a[name]',
            'code' : '<a name="name"></a>',
            preview: 'none',
            'name' : 'Anchor',
            'inline_edit' : true,
            'sections' : crsaAddStandardSections({
                link : {
                    name : 'Anchor',
                    fields : {
                        'name' : {name : 'Name', type : 'text', action: 'element_attribute', attribute: 'name'}
                    }
                }
            })
        }
        f.addComponentType(link);

        //Javascript
        f.addComponentType({
            'type' : 'bs-modal',
            'selector' : '.modal',
            'code' : function() {
                var id = getUniqueId('modal', null, 0);
                return '<div class="modal fade pg-show-modal" id="' + id + '" tabindex="-1" role="dialog" aria-hidden="true">\
                <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h4 class="modal-title">Modal title</h4>\
                </div>\
                <div class="modal-body">\
                    <p>One fine body&hellip;</p>\
                </div>\
                <div class="modal-footer">\
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                    <button type="button" class="btn btn-primary">Save changes</button>\
                </div>\
            </div>\
            </div>\
            </div>'
            },
            preview: '<div class="modal open fade in" style="display:block;opacity:1;height:300px;width:500px;position:relative;">\
                <div class="modal-dialog modal-sm">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h4 class="modal-title">Modal title</h4>\
                </div>\
                <div class="modal-body">\
                    <p>One fine body&hellip;</p>\
                </div>\
                <div class="modal-footer">\
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                    <button type="button" class="btn btn-primary">Save changes</button>\
                </div>\
            </div>\
            </div>\
            </div>\
            ',
            'name' : 'Modal',
            tags: 'major',
            on_inserted : function($el, page) {
                showJavascriptMessage();
            },
            'sections' : crsaAddStandardSections({
                bsmodal : {
                    name : 'Modal options',
                    fields : {
                        'bssize' : {
                            'type' : 'select',
                            'name' : 'Size',
                            'action' : 'custom',
                            'show_empty' : true,
                            'options' : [
                                {key: 'modal-sm', name: 'Small'},
                                {key: 'modal-lg', name: 'Large'}
                            ],
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $m = $el.find('.modal-dialog');
                                if($m.hasClass('modal-sm')) return 'modal-sm';
                                if($m.hasClass('modal-lg')) return 'modal-lg';
                                return null
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var $m = $el.find('.modal-dialog');
                                var pgm = new pgQuery($m);
                                pgm.removeClass('modal-sm modal-lg');
                                if(value) {
                                    pgm.addClass(value);
                                }
                                return value;
                            }
                        },
                        bsbackdrop : {
                            'type' : 'select',
                            'name' : 'Backdrop',
                            'action' : 'element_attribute',
                            attribute : 'data-backdrop',
                            'show_empty' : true,
                            'options' : [
                                {key: 'true', name: 'Yes'},
                                {key: 'false', name: 'No'},
                                {key: 'static', name: 'Static'}
                            ]
                        },
                        bsescape : {
                            'type' : 'select',
                            'name' : 'Close on ESC',
                            'action' : 'element_attribute',
                            attribute : 'data-keyboard',
                            'show_empty' : true,
                            'options' : [
                                {key: 'true', name: 'Yes'},
                                {key: 'false', name: 'No'}
                            ]
                        },
                        bsremote : {
                            'type' : 'text',
                            'name' : 'Remote url',
                            'action' : 'element_attribute',
                            attribute : 'data-remote'
                        },
                        bseditshow : {
                            'type' : 'checkbox',
                            'name' : 'Show during editing',
                            'value' : 'pg-show-modal',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                return $el.hasClass('pg-show-modal') ? 'pg-show-modal' : null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.addClass(value);
                                } else {
                                    pgel.removeClass('pg-show-modal');
                                }
                                removeDisplayStyle($el);
                                return value;
                            }
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'bs-dropdown',
            'selector' : '.dropdown',
            'code' : '<div class="dropdown">\
                <a data-toggle="dropdown" href="#">Dropdown trigger</a>\
    <ul class="dropdown-menu" role="menu">\
    <li><a href="#">Action</a></li>\
    <li><a href="#">Another action</a></li>\
    <li><a href="#">Something else here</a></li>\
<li class="divider"></li>\
    <li><a href="#">Separated link</a></li>\
</ul>\
    </div>',
            on_inserted : function() {
                showJavascriptMessage();
            },
            on_changed : function() {
               // showJavascriptMessage();
            },
            'name' : 'Dropdown',
            tags: 'major',
            'action_menu' : {
                'add' : ['button-dropdown-item'],
                'on_add' : function($el, $new, newdef, prepend) {
                    var $ul = $el.find('> ul.dropdown-menu');
                    var pgul = new pgQuery($ul);
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    if($ul.length == 0) {
                        pgul = new pgQuery().create('<ul class="dropdown-menu" role="menu"></ul>');
                        pgel.append(pgul);
                    }
                    if(prepend) {
                        pgul.prepend(pgnew);
                    } else {
                        pgul.append(pgnew);
                    }
                }
            },
            'sections' : crsaAddStandardSections({
            })
        });



        f.addComponentType({
            'type' : 'bs-js-tabs',
            'selector' : null,
            'code' : function() {
                var id1 = getUniqueId('tab', null, 0);
                var id2 = getUniqueId('tab', null, id1);
                var id3 = getUniqueId('tab', null, id2);
                var id4 = getUniqueId('tab', null, id3);

                return '<ul class="nav nav-tabs">\
                    <li class="active"><a href="#' + id1 + '" data-toggle="tab">Home</a></li>\
                    <li><a href="#' + id2 + '" data-toggle="tab">Profile</a></li>\
                    <li><a href="#' + id3 + '" data-toggle="tab">Messages</a></li>\
                    <li><a href="#' + id4 + '" data-toggle="tab">Settings</a></li>\
                </ul>';
            },
            'name' : 'Tabs + Panes',
            tags: 'major',
            priority: 100,
            on_inserted : function($el) {
                var pgel = new pgQuery($el);
                var pgtc = new pgQuery().create('<div class="tab-content"></div>').insertAfter(pgel);
                $el.children().each(function(i, t) {
                    var id = $(t).find('>a').attr('href');
                    if(id) id = id.replace('#', '');
                    var pgp = new pgQuery().create('<div class="tab-pane"><p>Tab ' + (i+1) + ' content goes here...</p></div>');
                    if(id) pgp.attr('id', id);
                    if(i == 0) pgp.addClass('active');
                    pgtc.append(pgp);
                });
                showJavascriptMessage();
            },
            on_changed : function() {
                //showJavascriptMessage();
            },
            'sections' : crsaAddStandardSections({
            })
        });

        f.addComponentType({
            'type' : 'fd-tabs-item',
            'selector' : function($el) {
                return $el.is('dd') && $el.parent().is('.tabs');
            },
            'code' : function() {
                var id1 = getUniqueId('panel', null, 0);

                return '<dd><a href="#' + id1 + '">Tab</a></dd>';
            },
            'name' : 'Tabs item',
            tags: 'major',
            priority: 100,
            'sections' : crsaAddStandardSections({
                'fdacc' : {
                    name: 'Item options',
                    fields: {
                        fddest : {
                            'type' : 'text',
                            'name' : 'Panel id',
                            'action' : 'custom',
                            live_update : false,
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var $a = $el.find('>a');
                                var pga = new pgQuery($a);
                                pga.attr('href', '#' + value);
                                var $tabs = $el.parent().next('.tabs-content');
                                if($tabs.find('#' + value).length == 0) {
                                    showAlert('Can not find tab content with this id.', 'No tab content');
                                } else {
                                    //showOrbitMessage();
                                }
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var h = $el.find('>a').attr('href');
                                return h ? h.replace('#','') : null;
                            }
                        },
                        fdname : {
                            'type' : 'text',
                            'name' : 'Name',
                            'action' : 'custom',
                            live_update : true,
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var $a = $el.find('>a');
                                var pga = new pgQuery($a);
                                pga.html(value);
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                return $el.find('>a').html();
                            }
                        },
                        fdactive: {
                            type: 'checkbox',
                            name: 'Active',
                            action: 'custom',
                            value: '1',
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var $a = $el.find('>a');
                                var pga = new pgQuery($a);
                                var h = pga.attr('href');
                                var $tabs = $el.parent().next('.tabs-content');
                                if(h) {
                                    var $tab = $tabs.find(h);
                                    var pgtab = new pgQuery($tab);
                                    if(value) {
                                        pgtab.addClass('active');
                                    } else {
                                        pgtab.removeClass('active');
                                    }
                                }
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                return $el.hasClass('active');
                            }
                        }
                    }
                }
            })
        });


        f.addComponentType({
            'type' : 'bs-accordion',
            'selector' : '.panel-group',
            'code' : function() {
                var pid = getUniqueId('panels', null, 0);
                var id1 = getUniqueId('collapse', null, 0);
                var id2 = getUniqueId('collapse', null, id1);
                var id3 = getUniqueId('collapse', null, id2);

                return '<div class="panel-group" id="' + pid + '">\
                    <div class="panel panel-default">\
                    <div class="panel-heading">\
                        <h4 class="panel-title">\
                            <a data-toggle="collapse" data-parent="#' + pid + '" href="#' + id1 + '">\
                            Collapsible Group Item #1\
                            </a>\
                        </h4>\
                    </div>\
                    <div id="' + id1 + '" class="panel-collapse collapse in">\
                    <div class="panel-body">\
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.\
                    </div>\
                    </div>\
                </div>\
                    <div class="panel panel-default">\
                        <div class="panel-heading">\
                            <h4 class="panel-title">\
                                <a data-toggle="collapse" data-parent="#' + pid + '" href="#' + id2 + '">\
                                Collapsible Group Item #2\
                                </a>\
                            </h4>\
                        </div>\
                        <div id="' + id2 + '" class="panel-collapse collapse">\
                            <div class="panel-body">\
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.\
                            </div>\
                        </div>\
                    </div>\
                    <div class="panel panel-default">\
                        <div class="panel-heading">\
                            <h4 class="panel-title">\
                                <a data-toggle="collapse" data-parent="#' + pid + '" href="#' + id3 + '">\
                                Collapsible Group Item #3\
                                </a>\
                            </h4>\
                        </div>\
                        <div id="' + id3 + '" class="panel-collapse collapse">\
                            <div class="panel-body">\
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.\
                            </div>\
                        </div>\
                    </div>\
                </div>';
            },
            'name' : 'Accordion',
            tags: 'major',
            priority: 100,
            action_menu: {
                add: ['bs-accordion-item'],
                on_add : function($el, $new, newdef, prepend) {
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    var id = pgel.attr('id');
                    if(id) {
                        var $a = $new.find('.panel-title >a');
                        var pga = new pgQuery($a);
                        pga.attr('data-parent', '#' + id);
                    }
                    if(prepend) {
                        pgel.prepend(pgnew);
                    } else {
                        pgel.append(pgnew);
                    }
                }
            },
            on_inserted : function() {
                showJavascriptMessage();
            },
            on_changed : function() {
                //showJavascriptMessage();
            },
            'sections' : crsaAddStandardSections({

            })
        });

        f.addComponentType({
            'type' : 'bs-accordion-item',
            'selector' : null,
            'code' : function() {
                var id1 = getUniqueId('collapse', null, 0);

                return '<div class="panel panel-default">\
                    <div class="panel-heading">\
                    <h4 class="panel-title">\
                    <a data-toggle="collapse" data-parent="#accordion" href="#' + id1 + '">\
                    Collapsible Group Item\
                    </a>\
                    </h4>\
                </div>\
                    <div id="' + id1 + '" class="panel-collapse collapse">\
                        <div class="panel-body">\
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.\
                    </div>\
                    </div>\
                </div></div>';
            },
            'name' : 'Accordion item',
            tags: 'major',
            priority: 100,
            'sections' : crsaAddStandardSections({

            })
        });

        var callSlider = function($el, func, msg) {
            var id = $el.attr('data-pg-id');
            var code = '$(\'[data-pg-id="' + id + '"]\').' + func + ';';
            var page = pinegrow.getPageForElement($el);
            pinegrow.setIgnoreClicks(true);
            pinegrow.executeScriptInPage(page, code);
            pinegrow.setIgnoreClicks(false);
            if(msg) {
                pinegrow.showQuickMessage(msg);
            }
        }

        var gotoSlide = function($el) {
            var $slider = $el.closest('.carousel');
            callSlider($slider, "carousel('pause')");
            var num = $el.index();
            callSlider($slider, "carousel(" + (num) + ")", "Going to slide " + (num + 1) + "...");
        }

        f.addComponentType({
            'type' : 'bs-carousel',
            'selector' : '.carousel',
            'code' : function() {
                var pid = getUniqueId('carousel', null, 0);

                return '<div id="' + pid + '" class="carousel slide" data-ride="carousel">\
                    <!-- Indicators -->\
                    <ol class="carousel-indicators">\
                        <li data-target="#' + pid + '" data-slide-to="0" class="active"></li>\
                        <li data-target="#' + pid + '" data-slide-to="1"></li>\
                        <li data-target="#' + pid + '" data-slide-to="2"></li>\
                    </ol>\
                    <!-- Wrapper for slides -->\
                     <div class="carousel-inner">\
                         <div class="item active">\
                             <img src="' + getPlaceholderImage() + '" alt=""/>\
                             <div class="carousel-caption">\
                                 <h3>Slide 1 title</h3>\
                                 <p>Slide 1 description.</p>\
                             </div>\
                         </div>\
                         <div class="item">\
                             <img src="' + getPlaceholderImage() + '" alt=""/>\
                             <div class="carousel-caption">\
                                 <h3>Slide 2 title</h3>\
                                 <p>Slide 2 description.</p>\
                             </div>\
                         </div>\
                         <div class="item">\
                             <img src="' + getPlaceholderImage() + '" alt=""/>\
                             <div class="carousel-caption">\
                                 <h3>Slide 3 title</h3>\
                                 <p>Slide 3 description.</p>\
                             </div>\
                         </div>\
                     </div>\
                     <!-- Controls -->\
                     <a class="left carousel-control" href="#' + pid + '" data-slide="prev">\
                         <span class="glyphicon glyphicon-chevron-left"></span>\
                     </a>\
                     <a class="right carousel-control" href="#' + pid + '" data-slide="next">\
                         <span class="glyphicon glyphicon-chevron-right"></span>\
                     </a>\
                 </div>';
            },
            'name' : 'Carousel',
            tags: 'major',
            priority: 100,
            action_menu: {
                actions : [
                    {label: "Pause Carousel", action: function($el) {
                        callSlider($el, "carousel('pause')", "Carousel paused.");
                    }},
                    {label: "Resume Carousel", action: function($el) {
                        callSlider($el, "carousel('cycle')", "Carousel resumed.");
                    }},
                    {label: "Next Slide", action: function($el) {
                        callSlider($el, "carousel('next')");
                    }},
                    {label: "Previous Slide", action: function($el) {
                        callSlider($el, "carousel('prev')");
                    }}
                ],
                add: ['bs-carousel-item'],
                on_add : function($el, $new, newdef, prepend) {
                    var $ol = $el.find('.carousel-indicators');
                    var pgol = new pgQuery($ol);
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    var max = 0;
                    var $inner = $el.find('.carousel-inner');
                    var pginner = new pgQuery($inner);
                    var i = $inner.children().length;
                    var id = pgel.attr('id');
                    if(!id) id = '';
                    var pgli = new pgQuery().create('<li data-target="#' + id + '" data-slide-to="' + i + '"></li>');
                    if(prepend) {
                        pginner.prepend(pgnew);
                        if($ol.length) pgol.prepend(pgli);
                    } else {
                        if($ol.length) pgol.append(pgli);
                        pginner.append(pgnew);
                    }
                }
            },
            on_inserted : function() {
                showJavascriptMessage();
            },
            on_changed : function() {
                //showJavascriptMessage();
            },
            'sections' : crsaAddStandardSections({
                bscarousel : {
                    name : 'Carousel options',
                    fields : {
                        bsinterval : {
                            'type' : 'text',
                            'name' : 'Interval',
                            'action' : 'element_attribute',
                            attribute : 'data-interval'
                        },
                        bspause : {
                            'type' : 'select',
                            'name' : 'Pause on',
                            'action' : 'element_attribute',
                            attribute : 'data-pause',
                            'show_empty' : true,
                            'options' : [
                                {key: 'hover', name: 'Hover'}
                            ]
                        },
                        bswrap : {
                            'type' : 'select',
                            'name' : 'Wrap',
                            'action' : 'element_attribute',
                            attribute : 'data-wrap',
                            'show_empty' : true,
                            'options' : [
                                {key: 'true', name: 'Yes'},
                                {key: 'false', name: 'No'}
                            ]
                        }
                    }
                }
            })
        });


        f.addComponentType({
            'type' : 'bs-carousel-item',
            'selector' : function($el) {
                return $el.is('.item') && $el.parent().is('.carousel-inner');
            },
            'code' : function() {
                return '<div class="item">\
                             <img src="' + getPlaceholderImage() + '" alt=""/>\
                             <div class="carousel-caption">\
                                 <h3>Slide title</h3>\
                                 <p>Slide description.</p>\
                             </div>\
                         </div>';
            },
            'name' : 'Carousel slide',
            tags: 'major',
            priority: 100,
            on_selected: function($el) {
                gotoSlide($el);
            },
            'sections' : crsaAddStandardSections({
                'carouselslide' : {
                    name : 'Slide',
                    fields : {
                        active : {
                            'type' : 'checkbox',
                            'name' : 'Active slide',
                            'action' : 'apply_class',
                            'value' : 'active'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'bsmedia',
            'selector' : '.embed-responsive',
            'code' : '<div class="embed-responsive embed-responsive-16by9">\
                <iframe class="embed-responsive-item" src="http://www.youtube.com/embed/tbbKjDjMDok"></iframe>\
                </div>',
            'drag_helper' : '<div class="embed-responsive embed-responsive-16by9">\
                <div class="pg-empty-placeholder">Media</div>\
                </div>',
            'name' : 'Responsive media',
            tags: 'major',
            priority: 100,
            action_menu: {
                add: ['html-iframe', 'html-embed', 'html-object']
            },
            'sections' : crsaAddStandardSections({
                'bsmedia' : {
                    name : 'Media options',
                    fields : {
                        active : {
                            'type' : 'select',
                            'name' : 'Aspect ratio',
                            'action' : 'apply_class',
                            'show_empty' : false,
                            'options' : [
                                {key: 'embed-responsive-4by3', name: '4 x 3'},
                                {key: 'embed-responsive-16by9', name: '16 x 9'}
                            ]
                        }
                    }
                }
            })
        });

        //Add BS common sections to all elements
        var tag = {
            'type' : 'tag',
            'selector' : function($el) { return true },
            'name' : 'Div',
            'display_name' : 'tag',
            'priority' : 2001,
            'sections' : crsaAddStandardSections({
                attributes : {
                    inherit: true
                }
            })
        }
        f.addComponentType(tag);



        var getTypes = function(list) {
            var r = [];
            for(var i = 0; i < list.length; i++) {
                if(typeof list[i] == 'string') {
                    var def = f.getComponentType(list[i]);
                    if(def) {
                        r.push(def);
                    }
                } else {
                    r.push(list[i]);
                }
            }
            return r;
        }

        var section = new PgFrameworkLibSection('bsgrid', 'Grid');
        section.setComponentTypes(getTypes(['bs-container','bs-row','bs-column','thumbnail-img', 'thumbnail-content', 'bs-clear']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bsbuttons', 'Buttons');
        section.setComponentTypes( getTypes(['bs-button' ,'img', 'button-close', 'caret', 'button-toolbar', 'button-group', 'button-dropdown', 'dropdown-menu', 'button-dropdown-item']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bstypo', 'Text &amp; Images');
        section.setComponentTypes( getTypes(['h1','h2','h3','h4','h5','h6','small', 'page-header', 'p', 'link', 'anchor', 'abbr','address','blockquote', 'glyphicon','img','hr']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bsui', 'UI elements');
        section.setComponentTypes( getTypes(['span-label', 'badge', 'alert', 'progress', 'progress-bar', 'media-list', 'media-list-item', 'list-group', 'list-group-item', 'panel', 'panel-heading', 'panel-footer', 'well']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bslists', 'Lists');
        section.setComponentTypes(getTypes(['list', 'list_item', 'description', 'description-term', 'description-def']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bstable', 'Tables');
        section.setComponentTypes( getTypes(['table','thead', 'tbody', 'tr', 'td']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bscode', 'Code');
        section.setComponentTypes( getTypes(['code', 'code-block']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bsform', 'Forms');
        section.setComponentTypes( getTypes(['form', 'form-group', 'form-textarea-group', 'form-select-group', 'form-select', 'form-option', 'form-checkbox-group', 'form-radio-group', 'form-static-group', 'form-static', 'form-input', 'textarea', 'form-checkbox','form-radio', 'label', 'form-fieldset', 'form-help', 'form-input-group']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bsnavbar', 'Navigation');
        section.setComponentTypes( getTypes(['navbar','tabs', 'breadcrumb', 'pagination', 'pager', 'jumbotron']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bsmedia', 'Media');
        section.setComponentTypes( getTypes(['bsmedia']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bsjs', 'Javascript');
        section.setComponentTypes( getTypes(['bs-modal','bs-dropdown','button-dropdown-item', 'bs-js-tabs', 'alert', 'bs-accordion', 'bs-carousel']));
        f.addLibSection(section);

        f.on_set_inline_style = function(page, o) {
            o.css += '\
            .pg-show-modal {\
            position: relative;\
            top: auto;\
            right: auto;\
            left: auto;\
            bottom: auto;\
            display: block;\
            opacity: 1;\
            }\
            .pg-show-modal.fade .modal-dialog {\
            -webkit-transform: translate(0, 0);\
            -moz-transform: translate(0, 0);\
            transform: translate(0, 0);\
            }';
        }

        var removeDisplayStyle = function($m) {
            var s = $m.attr('style');
            if(s) {
                s = s.replace(/display\:\s*[a-z]*;/i,'');
                if(s.length > 0) {
                    $m.attr('style', s);
                } else {
                    $m.removeAttr('style');
                }
            }
        }

        f.aaaon_get_source = function(crsaPage, $html) {
            $html.find('.modal-backdrop').remove();
            $html.find('.modal').each(function(i,m) {
                var $m = $(m);
                removeDisplayStyle($m);
            });
            $html.find('body').removeClass('modal-open');
            $html.find('.tooltip').remove();
            $html.find('.popover').remove();

            $html.find('[data-original-title]').each(function(i,e) {
                var $e = $(e);
                $e.attr('title', $e.attr('data-original-title')).removeAttr('data-original-title');
            });
        }

        f.on_page_loaded = function(crsaPage) {
            return;
            $(function() {
                var $html = crsaPage.get$Html();
                $html.find('.carousel').each(function(i,c) {
                    var $c = $(c);
                    $c.carousel('pause');
                    crsaQuickMessage("Carousel was paused.", 2000, false);
                });
            });
        }
    });
});