$(function() {

    $('body').one('pinegrow-ready', function(e, pinegrow) {
        var f = new PgFramework('foundation.5.4.5', 'Foundation 5.4.5');
        f.type = "foundation";
        f.allow_single_type = true;

        f.ignore_css_files = [/(^|\/)foundation\.css/i, /(^|\/)foundation\.min\.css/i, /(^|\/)normalize(\.min|)\.css/i];
        f.detect = function(crsaPage) {
            return crsaPage.hasStylesheet(/(^|\/)foundation(\.min|)\.css/i);
        }

        pinegrow.addFramework(f);


        var getPlaceholderImage = function() {
            return pinegrow.getPlaceholderImage();
        }

        var reflowPage = function($el, what) {
        }

        var removeDisplayStyle = function($m) {
            var s = $m.attr('style');
            if(s) {
                s = s.replace(/display\:\s*[a-z]*;/i,'');
                s = s.replace(/visibility\:\s*[a-z]*;/i,'');
                s = s.replace(/opacity\:\s*[a-z0-9\.]*;/i,'');
                s = s.replace(/top\:\s*[a-z0-9\.\-]*;/i,'');
                s = $.trim(s);
                if(s.length > 0) {
                    $m.attr('style', s);
                } else {
                    $m.removeAttr('style');
                }
            }
        }

        var dataOptionsField = function(field, name, type, options) {
            if(!type) type = 'checkbox';
            var d = {
                type: type,
                name: name,
                action: 'custom',
                get_value: function(obj) {
                    var $el = obj.data;
                    var pgel = new pgQuery($el);
                    var d = pgel.attr('data-options');
                    if(d) {
                        var re = new RegExp(field + '\\s*:\\s*([^;]*)(;|^)','i');
                        var m = d.match(re);
                        if(m) return m[1];
                    }
                    return null;
                },
                set_value: function(obj, value, values) {
                    var $el = obj.data;
                    var pgel = new pgQuery($el);
                    var v = value ? "false" : "true";
                    var d = pgel.attr('data-options');
                    if(!d) {
                        d = field + ':' + v;
                    } else {
                        var re = new RegExp(field + '\\s*:\\s*[^;]*(;|^)','i');
                        d = d.replace(re, field + ':' + v);
                    }
                    pgel.attr('data-options', d);
                    showOrbitMessage();
                    return value;
                }
            }
            if(type == 'checkbox') {
                d.value = '1';
            }
            if(type == 'select') {
                d.options = options;
            }
            return d;
        }

        var linkOptionsSection = {
            name : 'Link options',
            fields : {
                fdlabel : {
                    'type' : 'text',
                    'name' : 'Text',
                    'action' : 'element_html'
                },
                fdreveal : {
                    'type' : 'text',
                    'name' : 'Reveal id',
                    live_update : false,
                    'action' : 'custom',
                    get_value: function(obj) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        return pgel.attr('data-reveal-id');
                    },
                    set_value: function(obj, value, values, oldValue, eventType) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        if(value) {
                            if($el.closest('body').find("#" + value).length == 0) {
                                showAlert("Can't find dialog (or something else) with this element id. Add a Reveal Modal first.", "Element not found");
                                return value;
                            } else {
                                pgel.attr('data-reveal-id', value);
                            }
                        } else {
                            pgel.removeAttr('data-reveal-id');
                        }
                        showOrbitMessage();
                        return value;
                    }
                },
                fdrevealajax : {
                    'type' : 'checkbox',
                    'name' : 'Reveal ajax',
                    value : 'true',
                    'action' : 'custom',
                    get_value: function(obj) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        return pgel.attr('data-reveal-id');
                    },
                    set_value: function(obj, value, values, oldValue, eventType) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        if(value == 'true') {
                            pgel.attr('data-reveal-ajax', value);
                        } else {
                            pgel.removeAttr('data-reveal-ajax');
                        }
                        showOrbitMessage();
                        return value;
                    }
                },
                fddropdown : {
                    'type' : 'text',
                    'name' : 'Dropdown id',
                    live_update : false,
                    'action' : 'custom',
                    get_value: function(obj) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        return pgel.attr('data-dropdown');
                    },
                    set_value: function(obj, value, values, oldValue, eventType) {
                        var $el = obj.data;
                        var pgel = new pgQuery($el);
                        if(value) {
                            if($el.closest('body').find("#" + value).length == 0) {
                                showAlert("Can't find dropdown (or something else) with this element id. Add a Dropdown first.", "Dropdown not found");
                                return value;
                            } else {
                                pgel.attr('data-dropdown', value);
                            }
                        } else {
                            pgel.removeAttr('data-dropdown');
                        }
                        showOrbitMessage();
                        return value;
                    }
                },
                fdhoverdropdown: {
                    type: 'checkbox',
                    name: 'Dropdown on hover',
                    action: 'custom',
                    value: '1',
                    get_value: function(obj) {
                        return getDataOption(obj, 'is_hover', 'bool', '1');
                    },
                    set_value: function(obj, value, values) {
                        return setDataOption(obj, 'is_hover', 'bool', value, '1');
                    }
                },
                fddirdropdown: {
                    type: 'select',
                    name: 'Dropdown position',
                    action: 'custom',
                    'show_empty' : true,
                    options : [
                        { 'key' : 'bottom', 'name' : 'bottom'},
                        { 'key' : 'top', 'name' : 'top'},
                        { 'key' : 'left', 'name' : 'left'},
                        { 'key' : 'right', 'name' : 'right'}
                        ],
                    get_value: function(obj) {
                        return getDataOption(obj, 'align', 'as_is');
                    },
                    set_value: function(obj, value, values) {
                        return setDataOption(obj, 'align', 'as_is', value);
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
                'fdtext' : {
                    name: 'Text &amp; Context',
                    fields: {
                        fdtextalign : bsAlign,
                        fdtextalignsmall : createResponsiveTextAlign('Small', 'small'),
                        fdtextalignmedium : createResponsiveTextAlign('Medium', 'medium'),
                        fdtextalignlarge : createResponsiveTextAlign('Large', 'large'),
                        fdtextalignxlarge : createResponsiveTextAlign('XLarge', 'xlarge'),
                        fdtextalignxxlarge : createResponsiveTextAlign('XXlarge', 'xxlarge'),
                        fdantialiased : { //ok
                            'type' : 'checkbox',
                            'name' : 'Antialiased',
                            'action' : 'apply_class',
                            'value' : 'antialiased'
                        }
                    }
                },
                'fdlayout' : {
                    name: 'Layout',
                    fields: {
                        fdfloat : {
                            'type' : 'select',
                            'name' : 'Float',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {
                                    'key' : 'left',
                                    'name' : 'Left'
                                },
                                {
                                    'key' : 'right',
                                    'name' : 'Right'
                                }
                            ]
                        },
                        fdclearfix : { //ok
                            'type' : 'checkbox',
                            'name' : 'Clear floats',
                            'action' : 'apply_class',
                            'value' : 'clearfix'
                        },
                        fdcorners : {
                            'type' : 'select',
                            'name' : 'Corners',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {
                                    'key' : 'radius',
                                    'name' : 'Radius'
                                },
                                {
                                    'key' : 'round',
                                    'name' : 'Round'
                                }
                            ]
                        }
                    }
                },
                'fdvisible' : {
                    name: 'Visibility & Responsiveness',
                    fields: {
                        fdhide : { //ok
                            'type' : 'checkbox',
                            'name' : 'Hide',
                            'action' : 'apply_class',
                            'value' : 'hide'
                        },
                        'fdresponsive-small' : createResponsiveSelect('Small', 'small'),
                        'fdresponsive-medium' : createResponsiveSelect('Medium', 'medium'),
                        'fdresponsive-large' : createResponsiveSelect('Large', 'large'),
                        'fdresponsive-xlarge' : createResponsiveSelect('XLarge', 'xlarge'),
                        'fdresponsive-xxlarge' : createResponsiveSelect('XXLarge', 'xxlarge'),
                        fdorientation : {
                            'type' : 'select',
                            'name' : 'Show for orientation',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {
                                    'key' : 'show-for-landscape',
                                    'name' : 'Landscape'
                                },
                                {
                                    'key' : 'show-for-portrait',
                                    'name' : 'Portrait'
                                }
                            ]
                        },
                        fdtouch : {
                            'type' : 'select',
                            'name' : 'Show for touch',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {
                                    'key' : 'show-for-touch',
                                    'name' : 'Show'
                                },
                                {
                                    'key' : 'hide-for-touch',
                                    'name' : 'Hide'
                                }
                            ]
                        },
                        fdinterchange : {
                            'type' : 'text',
                            'name' : 'Interchange',
                            'action' : 'custom',
                            live_update : false,
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                pgel.attr('data-interchange', value);
                                showOrbitMessage();
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.attr('data-interchange');
                            }
                        },
                        fdmagellandest : {
                            'type' : 'text',
                            'name' : 'Magellan destination',
                            'action' : 'custom',
                            live_update : false,
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                pgel.attr('data-magellan-destination', value);
                                reflowPage($el);
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.attr('data-magellan-destination');
                            }
                        },
                        fdeq : {
                            'type' : 'checkbox',
                            'name' : 'Equalizer',
                            'action' : 'custom',
                            value: '1',
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.attr('data-equalizer','');
                                } else {
                                    pgel.removeAttr('data-equalizer');
                                }
                                showOrbitMessage();
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.attr('data-equalizer') != null ? '1' : null;
                            }
                        },
                        fdeqwatcher : {
                            'type' : 'checkbox',
                            'name' : 'Equalizer watch',
                            'action' : 'custom',
                            value: '1',
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.attr('data-equalizer-watch','');
                                } else {
                                    pgel.removeAttr('data-equalizer-watch');
                                }
                                showOrbitMessage();
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.attr('data-equalizer-watch') != null ? '1' : null;
                            }
                        }
                    }
                }
            };

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
        var createColumnSpans = function(name, base, empty) {
            var span_select = {
                'type' : 'select',
                'name' : null,
                'action' : 'apply_class',
                'show_empty' : empty,
                'options' : []
            }
            for(var n = 1; n <= 12; n++) {
                span_select.options.push({key: base + '-' + n, name: n});
            }
            return span_select;
        }

        var createResponsiveSelect = function(name, size) {
            var span_select = {
                'type' : 'select',
                'name' : name,
                'action' : 'apply_class',
                'show_empty' : true,
                'options' : [
                    {key: 'show-for-' + size + '-up', name: 'Show ' + size + ' & up'},
                    {key: 'show-for-' + size + '-only', name: 'Show ' + size + ' only'},
                    {key: 'hide-for-' + size + '-up', name: 'Hide ' + size + ' & up'},
                    {key: 'hide-for-' + size + '-only', name: 'Hide ' + size + ' only'}
                ]
            }
            if(size == 'small') {
                span_select.options.splice(0,1);
                span_select.options.splice(1,1);
            }
            return span_select;
        }

        var createResponsiveTextAlign = function(name, size) {
            var span_select = {
                'type' : 'select',
                'name' : name,
                'action' : 'apply_class',
                'show_empty' : true,
                'options' : [
                    {key: size + '-text-left', name: 'Left'},
                    {key: size + '-text-right', name: 'Right'},
                    {key: size + '-text-center', name: 'Center'},
                    {key: size + '-text-justify', name: 'Justify'},
                    {key: size + '-only-text-left', name: 'Left (only ' + size + ')'},
                    {key: size + '-only-text-right', name: 'Right (only ' + size + ')'},
                    {key: size + '-only-text-center', name: 'Center (only ' + size + ')'},
                    {key: size + '-only-text-justify', name: 'Justify (only ' + size + ')'}
                ]
            }
            if(size == 'xxlarge') {
                span_select.options.splice(4,4);
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

        //Row
        f.addComponentType({
            'type' : 'fd-row',
            'selector' : '.row',
            tags: 'major',
            preview: getGridPreview('row'),
            'code' : '<div class="row"></div>',
            'drag_helper' : '<div class="row pg-empty-placeholder"></div>',
            empty_placeholder : true,
            'name' : 'Row',
            action_menu : {
                add: ['fd-column', 'fd-clear']
            },
            'sections' : crsaAddStandardSections({
                'fdrow' : {
                    name : 'Row options',
                    fields : {
                        'fdinline' : {
                            'type' : 'checkbox',
                            'name' : 'Collapse',
                            'value' : 'collapse',
                            'action' : 'apply_class'
                        }
                    }
                }
            })
        });

        //Column clear
        f.addComponentType({
            'type' : 'fd-clear',
            'selector' : 'div.clear-columns',
            'code' : '<div class="clearfix clear-columns"></div>',
            'drag_helper' : '<div class="pg-empty-placeholder"></div>',
            'name' : 'Clear columns',
            'sections' : crsaAddStandardSections({})
        });

        f.addComponentType({
            'type' : 'fd-column',
            tags: 'major',
            'selector' : function($el) {
                if($el.is('.column,.columns')) return true;
                return false;
            },
            preview: getGridPreview('column'),
            parent_selector: '.row',
            invalid_drop_msg : 'Put <b>Column</b> in a <b>Row</b>. If you want to put it somewhere else, drop it on the tree.',
            'code' : '<div class="medium-4 columns"><h3>Column title</h3>\
        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\
        </div>',
            'empty_placeholder' : true,
            action_menu : {
                add: ['fd-row', 'h3', 'p', 'img']
            },
            'name' : 'Column',
            'inline_edit' : true,
            'sections' : crsaAddStandardSections({
                fdcollayout : {
                    name : "Grid",
                    fields : {
                        fdcollayout_control: {
                            type: 'custom',
                            name: 'layout_control',
                            action: 'none',
                            show: function($dest, obj, fn, fdef, values) {
                                var sizes = ["small", "medium", "large"];
                                var fields = ["", "-offset", "-push", "-pull"];
                                var field_names = ["Span&nbsp;", "Offs&nbsp;", "Push&nbsp;", "Pull&nbsp;"];
                                var field_keys = ["span_", "offset_", "push_", "pull_"];
                                var $table = $("<table/>", {class: 'grid-control columns-control'}).appendTo($dest);
                                var $row = $("<tr/>").html("<td></td><td><label>Sm</label></td><td><label>Md</label></td><td><label>Lg</label></td>").appendTo($table);

                                for(var n = 0; n < fields.length; n++) {
                                    $row = $("<tr/>").appendTo($table);
                                    var $td = $("<td/>").html('<label>' + field_names[n] + '</label>').appendTo($row);
                                    for(var m = 0; m < sizes.length; m++) {
                                        $td = $("<td/>").appendTo($row).css('width', '56px');

                                        var field = field_keys[n] + sizes[m];
                                        $.fn.crsa("addInputField", $td, obj, field, createColumnSpans(field_names[n], sizes[m] + fields[n], true), values);
                                        //$td.append('&nbsp;');
                                    }
                                }
                            }
                        },
                        fdlast : {
                            'type' : 'checkbox',
                            'name' : 'Last in row',
                            'action' : 'apply_class',
                            'value' : 'end'
                        },
                        fdsmallcenter : {
                            'type' : 'select',
                            'name' : 'Small centered',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {key: 'small-centered', name: 'Centered'}
                            ]
                        },
                        fdlargecenter : {
                            'type' : 'select',
                            'name' : 'Large centered',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {key: 'large-centered', name: 'Centered'},
                                {key: 'large-uncentered', name: 'Uncentered'}
                            ]
                        }
                    }
                },
                layout_phone : {
                    name : 'Phone',
                    show : false,
                    fields : {
                        span_small : createColumnSpans("Span", "small", true),
                        offset_small : createColumnSpans("Offs", "small-offset", true),
                        push_small : createColumnSpans("Push", "small-push", true),
                        pull_small : createColumnSpans("Pull", "small-pull", true),
                        span_medium : createColumnSpans("Span", "medium", true),
                        offset_medium : createColumnSpans("Offs", "medium-offset", true),
                        push_medium : createColumnSpans("Push", "medium-push", true),
                        pull_medium : createColumnSpans("Pull", "medium-pull", true),
                        span_large : createColumnSpans("Span", "large", true),
                        offset_large : createColumnSpans("Offs", "large-offset", true),
                        push_large : createColumnSpans("Push", "large-push", true),
                        pull_large : createColumnSpans("Pull", "large-pull", true)
                    }
                }
            })
        });


        f.addComponentType({
            'type' : 'fd-block-column',
            tags: 'major',
            'selector' : function($el) {
                var cls = $el.attr('class');
                if(cls) {
                    if(cls.match(/\-block\-grid\-/i)) return true;
                }
                return false;
            },
            'code' : '<ul class="small-block-grid-3">\
                <li><img class="th" src="' + getPlaceholderImage() + '"></li>\
                <li><img class="th" src="' + getPlaceholderImage() + '"></li>\
                <li><img class="th" src="' + getPlaceholderImage() + '"></li>\
            </ul>',
            'empty_placeholder' : false,
            priority: 100,
            'name' : 'Block columns',
            'inline_edit' : true,
            'sections' : crsaAddStandardSections({
                layout : {
                    name : "Layout",
                    fields : {
                        fdlayout_control: {
                            type: 'custom',
                            name: 'layout_control',
                            action: 'none',
                            show: function($dest, obj, fn, fdef, values) {
                                var sizes = ["small", "medium", "large"];
                                var $table = $("<table/>", {class: 'grid-control columns-control'}).appendTo($dest);
                                var $row = $("<tr/>").html("<td></td><td><label>Sm</label></td><td><label>Md</label></td><td><label>Lg</label></td>").appendTo($table);

                                $row = $("<tr/>").appendTo($table).html('<td><label>Items / Row&nbsp;</label></td>');
                                for(var m = 0; m < sizes.length; m++) {
                                    var $td = $("<td/>").appendTo($row);

                                    var field = 'fdblockgrid_' + sizes[m];
                                    $.fn.crsa("addInputField", $td, obj, field, createColumnSpans('name', sizes[m] + '-block-grid', true), values);
                                }

                            }
                        }
                    }
                },
                layout_phone : {
                    name : 'Phone',
                    show : false,
                    fields : {
                        fdblockgrid_small : createColumnSpans("Span", "small-block-grid", true),
                        fdblockgrid_medium : createColumnSpans("Span", "medium-block-grid", true),
                        fdblockgrid_large : createColumnSpans("Span", "large-block-grid", true)
                    }
                }
            })
        });



        f.addComponentType({
            'type' : 'fd-offsite',
            'selector' : '.off-canvas-wrap',
            'code' : '<div class="off-canvas-wrap" data-offcanvas>\
                <div class="inner-wrap">\
                    <nav class="tab-bar">\
                        <section class="left-small">\
                            <a class="left-off-canvas-toggle menu-icon"><span></span></a>\
                        </section>\
                        <section class="middle tab-bar-section">\
                            <h1 class="title">Foundation</h1>\
                        </section>\
                        <section class="right-small">\
                            <a class="right-off-canvas-toggle menu-icon"><span></span></a>\
                        </section>\
                    </nav>\
                    <aside class="left-off-canvas-menu">\
                        <ul class="off-canvas-list">\
                            <li><label>Foundation</label></li>\
                            <li><a href="#">The Psychohistorians</a></li>\
                        </ul>\
                    </aside>\
                    <aside class="right-off-canvas-menu">\
                        <ul class="off-canvas-list">\
                            <li><label>Users</label></li>\
                            <li><a href="#">Hari Seldon</a></li>\
                        </ul>\
                    </aside>\
                    <section class="main-section">\
                        <p>Content for the main section</p>\
                    </section>\
                    <a class="exit-off-canvas"></a>\
                </div>\
            </div>',
            'name' : 'Offcanvas',
            tags: 'major',
            on_inserted : function() {
                showOrbitMessage();
            },
            'sections' : crsaAddStandardSections({})
        });



        //Top bar

        f.addComponentType({
            'type' : 'fd-topbar-form',
            'selector' : null,
            'code' : '<li class="has-form">\
                <div class="row collapse">\
            <div class="large-8 small-9 columns">\
                <input type="text" placeholder="Find Stuff">\
                </div>\
                <div class="large-4 small-3 columns">\
                    <a href="#" class="alert button expand">Search</a>\
                </div>\
            </div>\
            </li>',
            'name' : 'Top bar form',
            'sections' : crsaAddStandardSections({
            })
        });

        f.addComponentType({
            'type' : 'fd-divider',
            'selector' : null,
            'code' : '<li class="divider"></li>',
            'name' : 'Divider',
            'sections' : crsaAddStandardSections({
            })
        });



        f.addComponentType({
            'type' : 'fd-topbar-button',
            'selector' : null,
            'code' : '<li class="has-form">\
                <a href="#" class="button">Get Lucky</a>\
        </li>',
            'name' : 'Button',
            'sections' : crsaAddStandardSections({
            })
        });

        f.addComponentType({
            'type' : 'fd-topbar-link',
            'selector' : null,
            'code' : '<li>\
                <a href="#">Get Lucky</a>\
        </li>',
            'name' : 'Link',
            'sections' : crsaAddStandardSections({
            })
        });

        f.addComponentType({
            'type' : 'fd-topbar-dropdown',
            'selector' : null,
            'code' : '<li class="has-dropdown">\
            <a href="#">Right Button with Dropdown</a>\
            <ul class="dropdown">\
                <li><a href="#">First link in dropdown</a></li>\
            </ul>\
        </li>',
            'name' : 'Dropdown',
            'sections' : crsaAddStandardSections({
            })
        });



        f.addComponentType({
            'type' : 'fd-topbar-list',
            'selector' : function($el) {
                return $el.parent().is('.top-bar-section');
            },
            priority: 100,
            'code' : '<ul class="left">\
                        <li><a href="#">Left Nav Button</a></li>\
                    </ul>',
            'name' : 'Top bar list',
            tags : 'major',
            action_menu: {
                add: ['fd-topbar-form', 'fd-divider','fd-topbar-link', 'fd-topbar-button', 'fd-topbar-dropdown']
            },
            'sections' : crsaAddStandardSections({
                layout : {
                    name : "Layout",
                    fields : {
                        fdposition: {
                            type: 'select',
                            name: 'Position',
                            action: 'apply_class',
                            show_empty : true,
                            options : [
                                {key: 'left', name: 'Left'},
                                {key: 'right', name: 'Right'}
                            ]
                        }
                    }
                }
            })
        });


        f.addComponentType({
            'type' : 'fd-topbar-title',
            'selector' : function($el) {
                return $el.is('.title-area');
            },
            'code' : '<ul class="title-area">\
                    <li class="name">\
                        <h1><a href="#">My Site</a></h1>\
                    </li>\
                    <li class="toggle-topbar menu-icon"><a href="#">Menu</a></li>\
                </ul>',
            'name' : 'Title area',
            'sections' : crsaAddStandardSections({
            })
        });


        f.addComponentType({
            'type' : 'fd-topbar',
            'selector' : '.top-bar',
            'code' : '<nav class="top-bar" data-topbar>\
                <ul class="title-area">\
                    <li class="name">\
                        <h1><a href="#">My Site</a></h1>\
                    </li>\
                    <li class="toggle-topbar menu-icon"><a href="#">Menu</a></li>\
                </ul>\
                <section class="top-bar-section">\
                    <!-- Right Nav Section -->\
                    <ul class="right">\
                        <li class="active"><a href="#">Right Button Active</a></li>\
                        <li class="has-dropdown">\
                            <a href="#">Right Button with Dropdown</a>\
                            <ul class="dropdown">\
                                <li><a href="#">First link in dropdown</a></li>\
                            </ul>\
                        </li>\
                    </ul>\
                    <!-- Left Nav Section -->\
                    <ul class="left">\
                        <li><a href="#">Left Nav Button</a></li>\
                    </ul>\
                </section>\
        </nav>',
            'name' : 'Top bar',
            tags: 'major',
            action_menu: {
                add: ['fd-topbar-list', 'fd-topbar-title'],
                on_add : function($el, $new, newdef, prepend) {

                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);

                    var getSection = function() {
                        var $s = $el.find('.top-bar-section');
                        var pgs = new pgQuery($s);
                        if($s.length == 0) {
                            pgs = new pgQuery().create('<section class="top-bar-section"></section>');
                            pgel.append(pgs);
                        }
                        return pgs;
                    }

                    if(newdef.type == 'fd-topbar-list') {
                        if(prepend) {
                            getSection().prepend(pgnew);
                        } else {
                            getSection().append(pgnew);
                        }
                    } else if(newdef.type == 'fd-topbar-title') {
                        if(prepend) {
                            pgel.prepend(pgnew);
                        } else {
                            pgel.prepend(pgnew);
                        }
                    } else if(newdef.type == 'fd-topbar-section') {
                        if(prepend) {
                            pgel.prepend(pgnew);
                        } else {
                            pgel.append(pgnew);
                        }
                    }
                }
            },
            'sections' : crsaAddStandardSections({
                layout : {
                    name : "Layout",
                    fields : {
                        fdposition: {
                            type: 'select',
                            name: 'Position',
                            action: 'custom',
                            show_empty : true,
                            options : [
                                {key: 'fixed', name: 'Fixed'},
                                {key: 'contain-to-grid', name: 'Contain to grid'},
                                {key: 'fixed contain-to-grid', name: 'Fixed &amp; Contain'},
                                {key: 'contain-to-grid sticky', name: 'Sticky &amp; Contain'}
                            ],
                            get_value: function(obj) {
                                var $el = obj.data;
                                var $p = $el.parent();
                                if($p.is('.fixed') && $p.is('.contain-to-grid')) {
                                    return 'fixed contain-to-grid';
                                } else if($p.is('.sticky') && $p.is('.contain-to-grid')) {
                                    return 'contain-to-grid sticky';
                                } else if($p.is('.fixed')) {
                                    return 'fixed';
                                } else if($p.is('.contain-to-grid')) {
                                    return 'contain-to-grid';
                                }
                                return null;
                            },
                            set_value: function(obj, value, values) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var $update = $el;
                                var $p = $el.parent();
                                var pgp = new pgQuery($p);
                                pinegrow.willChangeDom();
                                if(value) {
                                    var pgdiv;
                                    if($p.is('div')) {
                                        pgdiv = pgp;
                                    } else {
                                        pgdiv = new pgQuery().create('<div></div>');
                                        pgel.replaceWith(pgdiv, true);
                                        pgdiv.append(pgel);
                                        $update = $(pgdiv.get(0).el);
                                    }
                                    pgdiv.removeClass('fixed contain-to-grid sticky').addClass(value);
                                } else {
                                    if($p.is('div')) {
                                        pgp.removeClass('fixed contain-to-grid sticky');
                                        if($p.children().length == 1) {
                                            $update = $p.parent();
                                            pgel.detach();
                                            pgp.replaceWith(pgel);
                                        }
                                    }
                                }
                                pinegrow.setNeedsUpdate($update);
                                reflowPage($update);
                                return value;
                            }
                        },
                        fdclickable: {
                            type: 'checkbox',
                            name: 'Clickable',
                            action: 'custom',
                            value: '1',
                            get_value: function(obj) {
                                return getDataOption(obj, 'is_hover', 'bool', '1') ? null : '1';
                            },
                            set_value: function(obj, value, values) {
                                setDataOption(obj, 'is_hover', 'bool', value ? null : '1', '1');
                                return value;
                            }
                        }

                    }
                }
            })

        });

        //icon bar
        f.addComponentType({
            'type' : 'fd-iconbar-item-img',
            'selector' : null,
            'code' : '<a class="item">\
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBmaWxsPSIjREFEQURBIiBkPSJNNTAsMTIuNWMtMjAuNywwLTM3LjUsMTYuOC0zNy41LDM3LjVjMCwyMC43LDE2LjgsMzcuNSwzNy41LDM3LjVTODcuNSw3MC43LDg3LjUsNTAKCQlDODcuNSwyOS4zLDcwLjcsMTIuNSw1MCwxMi41eiBNNTMuOCw3MC45YzAsMC43LTAuNiwxLjMtMS4zLDEuM2gtNWMtMC43LDAtMS4zLTAuNi0xLjMtMS4zVjQ2LjZjMC0wLjcsMC42LTEuMywxLjMtMS4zaDUKCQljMC43LDAsMS4zLDAuNiwxLjMsMS4zVjcwLjl6IE01MCwzOS45Yy0yLjUsMC00LjUtMi00LjUtNC42YzAtMi41LDItNC41LDQuNS00LjVjMi41LDAsNC42LDIsNC42LDQuNUM1NC41LDM3LjksNTIuNSwzOS45LDUwLDM5LjkKCQl6Ii8+CjwvZz4KPC9zdmc+Cg==" >\
                <label>Home</label>\
            </a>',
            'name' : 'Icon bar item - img',
            on_inserted: function() {
                crsaQuickMessage('Set <b>Number of items</b> on Icon bar.', 3000);
            },
            'sections' : crsaAddStandardSections({
            })
        });

        f.addComponentType({
            'type' : 'fd-iconbar-item-font',
            'selector' : null,
            'code' : '<a class="item">\
                <i class="fi-home"></i>\
        </a>',
            'name' : 'Icon bar item - font',
            on_inserted: function() {
                crsaQuickMessage('Set <b>Number of items</b> on Icon bar.', 3000);
            },
            'sections' : crsaAddStandardSections({
            })
        });

        f.addComponentType({
            'type' : 'fd-iconbar',
            'selector' : '.icon-bar',
            'code' : '<div class="icon-bar four-up">\
                <a class="item">\
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBmaWxsPSIjREFEQURBIiBkPSJNNTAsMTIuNWMtMjAuNywwLTM3LjUsMTYuOC0zNy41LDM3LjVjMCwyMC43LDE2LjgsMzcuNSwzNy41LDM3LjVTODcuNSw3MC43LDg3LjUsNTAKCQlDODcuNSwyOS4zLDcwLjcsMTIuNSw1MCwxMi41eiBNNTMuOCw3MC45YzAsMC43LTAuNiwxLjMtMS4zLDEuM2gtNWMtMC43LDAtMS4zLTAuNi0xLjMtMS4zVjQ2LjZjMC0wLjcsMC42LTEuMywxLjMtMS4zaDUKCQljMC43LDAsMS4zLDAuNiwxLjMsMS4zVjcwLjl6IE01MCwzOS45Yy0yLjUsMC00LjUtMi00LjUtNC42YzAtMi41LDItNC41LDQuNS00LjVjMi41LDAsNC42LDIsNC42LDQuNUM1NC41LDM3LjksNTIuNSwzOS45LDUwLDM5LjkKCQl6Ii8+CjwvZz4KPC9zdmc+Cg==" >\
                <label>Home</label>\
            </a>\
            <a class="item">\
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBmaWxsPSIjREFEQURBIiBkPSJNNjguMywxMy4xSDMxLjdjLTEuNywwLTMsMS4zLTMsM3Y2Ljd2NDUuOXYxNS45YzAsMS4yLDEsMi4yLDIuMiwyLjJjMC42LDAsMS4xLTAuMiwxLjUtMC42aDBsMTYuMS0xNi4xaDAKCQljMC40LTAuNCwwLjktMC43LDEuNS0wLjdzMS4xLDAuMywxLjUsMC43aDBsMTUuOSwxNS45YzAuNCwwLjUsMSwwLjgsMS43LDAuOGMxLjIsMCwyLjItMSwyLjItMi4yVjY4LjhWMjIuOXYtNi43CgkJQzcxLjMsMTQuNSw3MCwxMy4xLDY4LjMsMTMuMXoiLz4KPC9nPgo8L3N2Zz4K" >\
                <label>Bookmark</label>\
            </a>\
            <a class="item">\
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBmaWxsPSIjREFEQURBIiBkPSJNNTAsMTIuNWMtMjAuNywwLTM3LjUsMTYuOC0zNy41LDM3LjVjMCwyMC43LDE2LjgsMzcuNSwzNy41LDM3LjVTODcuNSw3MC43LDg3LjUsNTAKCQlDODcuNSwyOS4zLDcwLjcsMTIuNSw1MCwxMi41eiBNNTMuOCw3MC45YzAsMC43LTAuNiwxLjMtMS4zLDEuM2gtNWMtMC43LDAtMS4zLTAuNi0xLjMtMS4zVjQ2LjZjMC0wLjcsMC42LTEuMywxLjMtMS4zaDUKCQljMC43LDAsMS4zLDAuNiwxLjMsMS4zVjcwLjl6IE01MCwzOS45Yy0yLjUsMC00LjUtMi00LjUtNC42YzAtMi41LDItNC41LDQuNS00LjVjMi41LDAsNC42LDIsNC42LDQuNUM1NC41LDM3LjksNTIuNSwzOS45LDUwLDM5LjkKCQl6Ii8+CjwvZz4KPC9zdmc+Cg==" >\
                <label>Info</label>\
            </a>\
            <a class="item">\
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBmaWxsPSIjREFEQURBIiBkPSJNODIuNSw3NC4zYzAtMC4xLDAtMC4yLDAtMC4zVjQ3LjFoMGMwLDAsMCwwLDAsMGMwLTEuNC0xLjEtMi41LTIuNS0yLjVjMCwwLTAuMSwwLTAuMSwwSDc1djAKCQljLTEuNCwwLTIuNSwxLjEtMi41LDIuNWgwdjI3LjVoMGMwLjEsMS4zLDEuMSwyLjIsMi40LDIuM3YwaDVsMCwwbDAsMGwwLDBsMCwwQzgxLjQsNzYuOSw4Mi41LDc1LjcsODIuNSw3NC4zeiIvPgoJPHBhdGggZmlsbD0iI0RBREFEQSIgZD0iTTY3LjUsNzguNnYtOC4zbDAsMFY0Mi4xbDAsMGMwLDAsMCwwLDAsMGMwLTEuNC0xLjEtMi41LTIuNS0yLjVjMCwwLTAuMSwwLTAuMSwwaC05LjkKCQljLTAuMi0wLjItMC4zLTAuNS0wLjUtMC42bC05LjktMTcuMWwwLDBjLTEtMS44LTIuOC0yLjktNS0yLjljLTMuMiwwLTUuNywyLjYtNS43LDUuOGwwLDBoLTAuMXYzLjNWMjh2MTEuNUgyMHYwCgkJYy0xLjQsMC0yLjUsMS4xLTIuNSwyLjVoMHYyOC4yaDBjMCwwLjMsMC4xLDAuNiwwLjQsMC45bDAsMGw5LjgsOS44bDAsMGMwLjMsMC4yLDAuNiwwLjMsMSwwLjNoMzYuMWMwLjEsMCwwLjEsMCwwLjIsMAoJCWMxLjQsMCwyLjUtMS4xLDIuNS0yLjRoMHYtMC4xQzY3LjUsNzguNiw2Ny41LDc4LjYsNjcuNSw3OC42QzY3LjUsNzguNiw2Ny41LDc4LjYsNjcuNSw3OC42eiBNMjAuNSw3MC4yTDIwLjUsNzAuMkwyMC41LDcwLjIKCQlMMjAuNSw3MC4yeiIvPgo8L2c+Cjwvc3ZnPgo=" >\
                <label>Like</label>\
            </a>\
            </div>',
            'name' : 'Icon bar',
            tags: 'major',
            action_menu: {
                add: ['fd-iconbar-item-img', 'fd-iconbar-item-font']
            },
            'sections' : crsaAddStandardSections({
                fdiconbar : {
                    name : "Icon bar options",
                    fields : {
                        'fdnumitems' : {
                            'type' : 'select',
                            'name' : 'Num. of items',
                            'show_empty' : false,
                            action: 'apply_class',
                            options: [
                                {key: 'one-up', name: '1'},
                                {key: 'two-up', name: '2'},
                                {key: 'three-up', name: '3'},
                                {key: 'four-up', name: '4'},
                                {key: 'five-up', name: '5'},
                                {key: 'six-up', name: '6'}
                            ]
                        },
                        fdvertical: {
                            type: 'checkbox',
                            name: 'Vertical',
                            action: 'apply_class',
                            value: 'vertical'
                        }
                    }
                }
            })
        });


        //sidenav
        f.addComponentType({
            'type' : 'fd-list-item',
            'selector' : 'li',
            'code' : '<li><a href="#">Link</a></li>',
            'name' : 'List item',
            'sections' : crsaAddStandardSections({
                fdstatus : {
                    name : "Status",
                    fields : {
                        fdactive: {
                            type: 'checkbox',
                            name: 'Active',
                            action: 'apply_class',
                            value: 'active'
                        }
                    }
                }
            })
        });



        f.addComponentType({
            'type' : 'fd-sidenav',
            priority: 100,
            'selector' : '.side-nav',
            'code' : '<ul class="side-nav">\
                <li class="active"><a href="#">Link 1</a></li>\
            <li><a href="#">Link 2</a></li>\
        <li class="divider"></li>\
            <li><a href="#">Link 3</a></li>\
            <li><a href="#">Link 4</a></li>\
        </ul>',
            'name' : 'Side nav',
            tags : 'major',
            action_menu: {
                add: ['fd-list-item', 'fd-divider']
            },
            'sections' : crsaAddStandardSections({

            })
        });


        //Sticky nav
        f.addComponentType({
            'type' : 'fd-stickynav-arrival',
            'selector' : 'dd[data-magellan-arrival]',
            'code' : '<dd data-magellan-arrival="build"><a href="#build">Build with HTML</a></dd>',
            'name' : 'Sticky nav arrival',
            priority: 100,
            'sections' : crsaAddStandardSections({
                'fdstickynav' : {
                    name: 'Navigation',
                    fields: {
                        fdarrival : {
                            'type' : 'text',
                            'name' : 'Arrival',
                            'action' : 'custom',
                            live_update : false,
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                pgel.attr('data-magellan-arrival', value);
                                var $a = $el.find('>a').each(function(i,a) {
                                    new pgQuery($(a)).attr('href', '#' + value);
                                });
                                reflowPage($el);
                                showOrbitMessage();
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.attr('data-magellan-arrival');
                            }
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-stickynav-dest',
            'selector' : '*[data-magellan-destination]',
            'code' : '<a name="arrival"></a>\
                <h3 data-magellan-destination="arrival">Arrival</h3>',
            'name' : 'Sticky nav destination',
            'sections' : crsaAddStandardSections({
                'fdvisible' : {
                    name: 'Navigation',
                    fields: {
                        fddest : {
                            'type' : 'text',
                            'name' : 'Destination',
                            'action' : 'custom',
                            live_update : false,
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                pgel.attr('data-magellan-destination', value);
                                var $a = $el.prev();
                                if($a.is('a')) {
                                    new pgQuery($a).attr('name', value);
                                }
                                reflowPage($el);
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.attr('data-magellan-destination');
                            }
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-stickynav',
            'selector' : 'div[data-magellan-expedition]',
            'code' : '<div data-magellan-expedition="fixed">\
                <dl class="sub-nav">\
            <dd data-magellan-arrival="build"><a href="#build">Build with HTML</a></dd>\
            <dd data-magellan-arrival="js"><a href="#js">Arrival 2</a></dd>\
        </dl>\
        </div>',
            'name' : 'Sticky nav',
            tags : 'major',
            action_menu: {
                add: ['fd-stickynav-arrival'],
                on_add : function($el, $new, newdef, prepend) {
                    var pgdl = new pgQuery($el.find('>dl'));
                    var pgnew = new pgQuery($new);
                    if(prepend) {
                        pgdl.prepend(pgnew);
                    } else {
                        pgdl.append(pgnew);
                    }
                }
            },
            'sections' : crsaAddStandardSections({

            })
        });


        //Subnav
        f.addComponentType({
            'type' : 'fd-dd',
            'selector' : 'dd',
            'code' : '<dd><a href="#">Link</a></dd>',
            'name' : 'Definition item',
            'sections' : crsaAddStandardSections({
                fdstatus : {
                    name : "Status",
                    fields : {
                        fdactive: {
                            type: 'checkbox',
                            name: 'Active',
                            action: 'apply_class',
                            value: 'active'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-subnav',
            'selector' : '.sub-nav',
            'code' : '<dl class="sub-nav">\
                <dt>Filter:</dt>\
            <dd class="active"><a href="#">All</a></dd>\
            <dd><a href="#">Active</a></dd>\
            <dd><a href="#">Pending</a></dd>\
            <dd><a href="#">Suspended</a></dd>\
        </dl>',
            'name' : 'Side nav',
            tags : 'major',
            action_menu: {
                add: ['fd-dd']
            },
            'sections' : crsaAddStandardSections({

            })
        });


        f.addComponentType({
            'type' : 'fd-bc-item',
            'selector' : function($el) {
                if($el.parent().is('.breadcrumbs')) {
                    return true;
                }
                return false;
            },
            'code' : '<li><a href="#">Item</a></li>',
            'name' : 'Breadcrumbs item',
            priority: 99,
            'sections' : crsaAddStandardSections({
                'fdbcstyle' : {
                    name : 'Status',
                    fields : {
                        'percent' : {
                            'type' : 'select',
                            'name' : 'Status',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {
                                    'key' : 'current',
                                    'name' : 'Current'
                                },
                                {
                                    'key' : 'unavailable',
                                    'name' : 'Unavailable'
                                }
                            ]
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-breadcrumbs',
            'selector' : '.breadcrumbs',
            priority: 100,
            'code' : '<ul class="breadcrumbs">\
                <li><a href="#">Home</a></li>\
                <li><a href="#">Features</a></li>\
                <li class="unavailable"><a href="#">Gene Splicing</a></li>\
                <li class="current"><a href="#">Cloning</a></li>\
        </ul>',
            'name' : 'Breadcrumbs',
            tags: 'major',
            action_menu: {
                add: ['fd-bc-item'],
                on_add : function($el, $new, newdef, prepend) {
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    if($el.is('nav')) {
                        var $a = $new.find('a');
                        var pga = new pgQuery($a);
                        if(prepend) {
                            pgel.prepend(pga);
                        } else {
                            pgel.append(pga);
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
                'fdbcstyle' : {
                    name : 'Layout',
                    fields : {
                        'percent' : {
                            'type' : 'checkbox',
                            'name' : 'Nav element',
                            'value' : '1',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.is('nav') ? '1' : null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var dmain = value == '1' ? 'nav' : 'ul';
                                var ditem = value == '1' ? 'a' : 'li';
                                var $newel;
                                var pgnewel;
                                var items;
                                var pgitems = new pgQuery($el.children()).detach();
                                if(!$el.is(dmain)) {
                                    pgnewel = pgel.replaceTag(dmain);
                                    obj.data = $(pgnewel.get(0));
                                } else {
                                    pgnewel = pgel;
                                }

                                var newels = [];
                                items.each(function(i, item) {
                                    var $item = $(item);
                                    var pgitem = new pgQuery($item);
                                    if($item.is(ditem)) {
                                        newels.push( pgitem);
                                    } else {
                                        var pgnew;
                                        if(ditem == 'a') {
                                            pgnew = new pgQuery($item.find('>a')).detach();
                                        } else {
                                            pgnew = new pgQuery().create('<li></li>').append(pgitem);
                                        }
                                        if(pgitem.hasClass('current')) {
                                            pgnew.addClass('current');
                                            pgitem.removeClass('current');
                                        }
                                        if(pgitem.hasClass('unavailable')) {
                                            pgnew.addClass('unavailable');
                                            pgitem.removeClass('unavailable');
                                        }
                                        newels.push(pgnew);
                                    }
                                });
                                for(var n = 0; n < newels.length; n++) {
                                    pgnewel.append(newels[n]);
                                }
                                pinegrow.setNeedsUpdate(obj.data);
                                return value;
                            }
                        }
                    }
                }
            })
        });


        //Pagination
        f.addComponentType({
            'type' : 'fd-pag-item',
            'selector' : function($el) {
                if($el.parent().is('.pagination')) {
                    return true;
                }
                return false;
            },
            'code' : '<li><a href="#">Item</a></li>',
            'name' : 'Pagination item',
            priority: 99,
            'sections' : crsaAddStandardSections({
                'fdbcstyle' : {
                    name : 'Status',
                    fields : {
                        'percent' : {
                            'type' : 'select',
                            'name' : 'Status',
                            'action' : 'apply_class',
                            'show_empty' : true,
                            'options' : [
                                {
                                    'key' : 'current',
                                    'name' : 'Current'
                                },
                                {
                                    'key' : 'unavailable',
                                    'name' : 'Unavailable'
                                }
                            ]
                        },
                        arrow : {
                            'type' : 'checkbox',
                            'name' : 'Arrow',
                            'value' : 'arrow',
                             action : 'apply_class'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-pagination',
            'selector' : '.pagination',
            priority: 100,
            'code' : '<ul class="pagination">\
                <li class="arrow unavailable"><a href="">&laquo;</a></li>\
            <li class="current"><a href="">1</a></li>\
            <li><a href="">2</a></li>\
            <li><a href="">3</a></li>\
            <li><a href="">4</a></li>\
            <li class="unavailable"><a href="">&hellip;</a></li>\
            <li><a href="">12</a></li>\
            <li><a href="">13</a></li>\
        <li class="arrow"><a href="">&raquo;</a></li>\
        </ul>',
            'name' : 'Pagination',
            tags: 'major',
            action_menu: {
                add: ['fd-pag-item']
            },
            'sections' : crsaAddStandardSections({
                'fdbcstyle' : {
                    name : 'Layout',
                    fields : {
                        'percent' : {
                            'type' : 'checkbox',
                            'name' : 'Centered',
                            'value' : '1',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                return $el.parent().is('.pagination-centered') ? '1' : null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    var $div = $el.parent();
                                    var pgdiv = new pgQuery($div);
                                    if($div.children().length > 1) {
                                        var pgnd = new pgQuery().create('<div></div>');
                                        //pgdiv.append(pgnd);
                                        pgel.replaceWith(pgnd, true);
                                        pgnd.append(pgel);
                                        $div = $(pgnd.get(0).el);
                                        pgdiv = pgnd;
                                    }
                                    pgdiv.addClass('pagination-centered');
                                    $el = $div;
                                    pgel = pgdiv;
                                } else {
                                    var $div = $el.parent();
                                    var pgdiv = new pgQuery($div);
                                    if(pgdiv.hasClass('pagination-centered')) {
                                        pgdiv.removeClass('pagination-centered');
                                        if($div.children().length == 1) {
                                            pgdiv.replaceWith(pgel);
                                        }
                                    }

                                }
                                pinegrow.setNeedsUpdate($el.parent());
                                return value;
                            }
                        }
                    }
                }
            })
        });



        //orbit slider

        var item_section = {
            name : 'Slide options',
                fields : {
                'fdslideid' : {
                    'type' : 'text',
                    'name' : 'Slide id',
                    'value' : '1',
                    'action' : 'element_attribute',
                    attribute : 'data-orbit-slide'
                }
            }
        };

        f.addComponentType({
            'type' : 'fd-orbit-item-image',
            'selector' : function($el) {
                return $el.parent().attr('data-orbit') != null;
            },
            priority: 100,
            parent_selector : '*[data-orbit]',
            'code' : '<li>\
                <img src="' + pinegrow.getPlaceholderImage() + '" alt="slide 1" />\
                <div class="orbit-caption">\
                    Caption One.\
                </div>\
                </li>',
            'name' : 'Orbit slide image',
            tags: 'major',
            'sections' : crsaAddStandardSections({
                fdorbit : item_section
            })
        });

        f.addComponentType({
            'type' : 'fd-orbit-item-nonimage',
            'selector' : function($el) {
                return $el.parent().attr('data-orbit') != null;
            },
            priority: 100,
            parent_selector : '*[data-orbit]',
            'code' : '<li>\
                <div>\
                <h2>Headline 3</h2>\
                <h3>Subheadline</h3>\
        </div>\
        </li>',
            'name' : 'Orbit slide non-image',
            tags: 'major',
            'sections' : crsaAddStandardSections({
                fdorbit : item_section
            })
        });

        var removeGeneratedCodeForOrbit = function($el) {
        }

        var reinitOrbits = function($el) {

        }

        var showOrbitMessage = function() {
            crsaQuickMessage('Refresh the page (Page -&gt; Refresh / CMD + R) to activate changes.', 2000, true);
        }

        f.addComponentType({
            'type' : 'fd-orbit',
            'selector' : function($el) {
                return $el.attr('data-orbit') != null;
            },
            priority: 100,
            'code' : '<ul data-orbit>\
                <li>\
                <img src="' + pinegrow.getPlaceholderImage() + '" alt="slide 1" />\
                <div class="orbit-caption">\
                    Caption One.\
                </div>\
                </li>\
                <li>\
                <img src="' + pinegrow.getPlaceholderImage() + '" alt="slide 2" />\
                <div class="orbit-caption">\
                    Caption Two.\
                </div>\
                </li>\
            </ul>',
            'name' : 'Orbit slider',
            on_changed : function($el, page) {
                showOrbitMessage();
            },
            on_inserted : function() {
                showOrbitMessage();
            },
            tags: 'major',
            last_type: true,
            action_menu: {
                add: ['fd-orbit-item-image', 'fd-orbit-item-nonimage'],
                on_add : function($el, $new, newdef, prepend) {
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    if(prepend) {
                        pgel.prepend(pgnew);
                    } else {
                        pgel.append(pgnew);
                    }
                    showOrbitMessage();
                }
            }
        });

        f.addComponentType({
            'type' : 'fd-thumbnail',
            'selector' : 'a.th',
            priority: 100,
            'code' : function() {
                var img = pinegrow.getPlaceholderImage();
                var thumb = pinegrow.getThumbnailForPlaceholderImage(img);
                return '<a class="th" href="' + img + '">\
                    <img src="' + thumb + '">\
                    </a>';
            },
            'name' : 'Thumbnail',
            tags: 'major',
            'sections' : crsaAddStandardSections({
            })
        });

        //Lightbox
        var removeGeneratedCodeForLightbox = function($el) {
        }

        f.addComponentType({
            'type' : 'fd-lightbox-image',
            'selector' : function($el) {
                return $el.parent().is('ul.clearing-thumbs');
            },
            priority: 100,
            parent_selector : 'ul.clearing-thumbs',
            'code' : function() {
                var img = pinegrow.getPlaceholderImage();
                var thumb = pinegrow.getThumbnailForPlaceholderImage(img);
                return '<li><a href="' + img + '"><img src="' + thumb + '"></a></li>';
            },
            'name' : 'Lightbox image',
            'sections' : crsaAddStandardSections({
                fdlightboxitem : {
                    name : 'Image options',
                    fields : {
                        'fdfeatured' : {
                            'type' : 'checkbox',
                            'name' : 'Featured',
                            'value' : '1',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return $el.is('clearing-featured-img') ? '1' : null;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    new pgQuery($el.parent().find('>li.clearing-featured-img')).removeClass('clearing-featured-img');
                                    pgel.addClass('clearing-featured-img');
                                } else {
                                    pgel.removeClass('clearing-featured-img');
                                }
                                return value;
                            }
                        },
                        'fdcaption' : {
                            'type' : 'text',
                            'name' : 'Caption',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return new pgQuery($el.find('img')).attr('data-caption');
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                new pgQuery($el.find('img')).attr('data-caption', value);
                                return value;
                            }
                        }
                    }
                }

            })
        });

        f.addComponentType({
            'type' : 'fd-lightbox',
            'selector' : 'ul.clearing-thumbs',
            priority: 100,
            'code' : function() {
                var img = pinegrow.getPlaceholderImage();
                var thumb = pinegrow.getThumbnailForPlaceholderImage(img);
                var img2 = pinegrow.getPlaceholderImage();
                var thumb2 = pinegrow.getThumbnailForPlaceholderImage(img2);
                var img3 = pinegrow.getPlaceholderImage();
                var thumb3 = pinegrow.getThumbnailForPlaceholderImage(img3);
                return '<ul class="clearing-thumbs" data-clearing>\
                    <li><a href="' + img + '"><img src="' + thumb + '"></a></li>\
                    <li><a href="' + img2 + '"><img src="' + thumb2 + '"></a></li>\
                    <li><a href="' + img3 + '"><img src="' + thumb3 + '"></a></li>\
                    </ul>';
            },
            'name' : 'Clearing lightbox',
            tags: 'major',
            on_inserted : function($el, page) {
                showOrbitMessage();
            },
            on_changed : function($el, page) {
                showOrbitMessage();
            },
            action_menu: {
                add: ['fd-lightbox-image']
            },
            'sections' : crsaAddStandardSections({
                fdlightbox : {
                    name : 'Lightbox options',
                    fields : {
                        'fdfeatured' : {
                            'type' : 'checkbox',
                            'name' : 'Featured image',
                            'value' : 'clearing-feature',
                            'action' : 'apply_class'
                        }
                    }
                }
            })
        });


        //flex video
        f.addComponentType({
            'type' : 'fd-flexvideo',
            'selector' : '.flex-video',
            priority: 100,
            'code' : '<div class="flex-video">\
                <iframe src="http://player.vimeo.com/video/60122989" width="400" height="225" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>\
            </div>',
            'drag_helper' : '<div class="flex-video pg-empty-placeholder"></div>',
            empty_placeholder : false,
            'name' : 'Flex video',
            tags: 'major',
            'sections' : crsaAddStandardSections({
                fdlightbox : {
                    name : 'Video options',
                    fields : {
                        'fdcode' : {
                            'type' : 'text',
                            'name' : 'Embed code',
                            'action' : 'element_html',
                            live_update: false
                        },
                        'fdwidescreen' : {
                            'type' : 'checkbox',
                            'name' : 'Widescreen',
                            'value' : 'widescreen',
                            'action' : 'apply_class'
                        },
                        'fdvimeo' : {
                            'type' : 'checkbox',
                            'name' : 'Vimeo',
                            'value' : 'vimeo',
                            'action' : 'apply_class'
                        }
                    }
                }
            })
        });




        //forms
        var form = {
            'type' : 'fd-form',
            tags: 'major',
            priority: 100,
            'selector' : 'form',
            'code' : '<form>\
                <div class="row">\
            <div class="large-12 columns">\
                <label>Input Label\
                    <input type="text" placeholder="large-12.columns" />\
                </label>\
            </div>\
            </div>\
            <div class="row">\
                <div class="large-4 columns">\
                    <label>Input Label\
                        <input type="text" placeholder="large-4.columns" />\
                    </label>\
                </div>\
                <div class="large-4 columns">\
                    <label>Input Label\
                        <input type="text" placeholder="large-4.columns" />\
                    </label>\
                </div>\
                <div class="large-4 columns">\
                    <div class="row collapse">\
                        <label>Input Label</label>\
                        <div class="small-9 columns">\
                            <input type="text" placeholder="small-9.columns" />\
                        </div>\
                        <div class="small-3 columns">\
                            <span class="postfix">.com</span>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        <div class="row">\
            <div class="large-12 columns">\
                <label>Select Box\
                    <select>\
                        <option value="husker">Husker</option>\
                        <option value="starbuck">Starbuck</option>\
                        <option value="hotdog">Hot Dog</option>\
                        <option value="apollo">Apollo</option>\
                    </select>\
                </label>\
            </div>\
            </div>\
        <div class="row">\
            <div class="large-6 columns">\
                <label>Choose Your Favorite</label>\
                <input type="radio" name="pokemon" value="Red" id="pokemonRed"><label for="pokemonRed">Red</label>\
                    <input type="radio" name="pokemon" value="Blue" id="pokemonBlue"><label for="pokemonBlue">Blue</label>\
                    </div>\
                    <div class="large-6 columns">\
                        <label>Check these out</label>\
                        <input id="checkbox1" type="checkbox"><label for="checkbox1">Checkbox 1</label>\
                            <input id="checkbox2" type="checkbox"><label for="checkbox2">Checkbox 2</label>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <div class="large-12 columns">\
                                <label>Textarea Label\
                                    <textarea placeholder="small-12.columns"></textarea>\
                                </label>\
                            </div>\
                        </div>\
                    </form>',
            'name' : 'Form',
            action_menu: {
                add: ['fd-row']
            },
            'sections' : crsaAddStandardSections({
                attributes : {
                    //inherit this from html framework
                    inherit: true
                },
                'layout' : {
                    name : 'Style',
                    fields : {

                    }
                }
            })
        }
        f.addComponentType(form);

        var defineInputField = function(type) {
            var code;
            var name;
            switch(type) {
                case 'input':
                    code = '<input type="text" placeholder="input fiels" />';
                    name = 'Input';
                    break;
                case 'textarea':
                    code = '<textarea></textarea>';
                    name = 'Textarea';
                    break;
                case 'select':
                    code = '<select />';
                    name = 'Select';
                    break;
                case 'button':
                    code = '<button value="Button" />';
                    name = 'Button';
                    break;
            }

            var enableForField = function($field, req) {
                var pgfield = new pgQuery($field);
                new pgQuery($field.closest('form')).attr("data-abide", '');
                var $lab = $field.parent();
                var pglab = new pgQuery($lab);
                if(req) {
                    if($lab.is('label') && $lab.find('small').length == 0) {
                        new pgQuery().create('<small>required</small>').insertBefore(pgfield);
                    }
                }
                if($lab.is('label') && !$lab.next().is('.error')) {
                    new pgQuery().create('<small class="error">Field is required.</small>').insertAfter(pglab);
                }
            }

            f.addComponentType({
                'type' : 'fd-' + type,
                'selector' : type,
                priority: 100,
                'code' : '<label>Input Label' + code + '</label>',
                'name' : name,
                'sections' : crsaAddStandardSections({
                    attributes : {
                        //inherit this from html framework
                        inherit: true
                    },
                    'fdvalidation' : {
                        name : 'Validation',
                        fields : {
                            'fdrequired' : {
                                'type' : 'checkbox',
                                'name' : 'Required',
                                'value' : '1',
                                'action' : 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('required') ? '1' : null;
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    if(value) {
                                        enableForField($el, true);
                                        pgel.attr('required', '');
                                        showOrbitMessage();
                                    } else {
                                        $el.removeAttr('required');
                                    }
                                    return value;
                                }
                            },
                            'fdpattern' : {
                                'type' : 'select',
                                'name' : 'Pattern',
                                'show_empty' : true,
                                options: [
                                    {key: 'alpha', name: 'alpha'},
                                    {key: 'alpha_numeric', name: 'alpha_numeric'},
                                    {key: 'integer', name: 'integer'},
                                    {key: 'number', name: 'number'},
                                    {key: 'password', name: 'password'},
                                    {key: 'card', name: 'card'},
                                    {key: 'cvv', name: 'cvv'},
                                    {key: 'email', name: 'email'},
                                    {key: 'url', name: 'url'},
                                    {key: 'domain', name: 'domain'},
                                    {key: 'datetime', name: 'datetime'},
                                    {key: 'date', name: 'date'},
                                    {key: 'time', name: 'time'},
                                    {key: 'dateISO', name: 'dateISO'},
                                    {key: 'month_day_year', name: 'month_day_year'},
                                    {key: 'color', name: 'color'}
                                ],
                                'action' : 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('pattern');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    if(value) {
                                        enableForField($el)
                                        pgel.attr('pattern', value);
                                        showOrbitMessage();
                                    } else {
                                        pgel.removeAttr('pattern');
                                    }
                                    return value;
                                }
                            },
                            'fdcustompat' : {
                                'type' : 'text',
                                'name' : 'Custom pattern',
                                'value' : '1',
                                'action' : 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('pattern');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    if(value) {
                                        enableForField($el)
                                        pgel.attr('pattern', value);
                                        showOrbitMessage();
                                    } else {
                                        pgel.removeAttr('pattern');
                                    }
                                    return value;
                                }
                            }
                        }
                    }
                })
            });
        }
        defineInputField('input');
        defineInputField('textarea');
        defineInputField('select');
        defineInputField('button');

        f.addComponentType({
            'type' : 'fd-label-only',
            'selector' : null,
            priority: 100,
            'code' : '<label>Input Label</label>',
            'name' : 'Label'
        });

        f.addComponentType({
            'type' : 'fd-form-column',
            'selector' : function($el) {
                return $el.is('.columns,.column') && $el.closest('form').length;
            },
            tags: 'major',
            priority: 100,
            'code' : '<div class="columns">\
                <label>Input Label\
            <input type="text" placeholder="text" />\
            </label>\
            </div>',
            'name' : 'Form column',
            action_menu: {
                add: ['fd-input', 'fd-textarea', 'fd-select', 'fd-button', 'fd-switch', 'fd-fieldset']
            },
            'sections' : crsaAddStandardSections({
                fdcollayout : {
                    inherit: true
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-label',
            'selector' : 'label',
            priority: 100,
            'code' : '<label>Input Label\
                <input type="text" placeholder="input fiels" />\
            </label>',
            'name' : 'Label + Field',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name : 'Label options',
                    fields : {
                        'fdinline' : {
                            'type' : 'checkbox',
                            'name' : 'Inline',
                            'value' : 'inline',
                            'action' : 'apply_class'
                        },
                        'fderror' : {
                            'type' : 'checkbox',
                            'name' : 'Error',
                            'value' : 'error',
                            'action' : 'apply_class'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-switch',
            'selector' : 'div.switch',
            priority: 100,
            'preview' : function() {
                var id = "previewSwitch";
                return '<div class="switch">\
                <input id="' + id + '" type="checkbox">\
            <label for="' + id + '"></label>\
            </div>';
            },
            'code' : function() {
                var id = getUniqueId("switch");
                return '<div class="switch">\
                <input id="' + id + '" type="checkbox">\
            <label for="' + id + '"></label>\
            </div>';
            },
            'name' : 'Switch',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name : 'Switch options',
                    fields : {
                        'fdtype' : {
                            'type' : 'select',
                            'name' : 'Type',
                            'show_empty' : false,
                            action: 'custom',
                            options: [
                                {key: 'checkbox', name: 'Checkbox'},
                                {key: 'radio', name: 'Radio'}
                            ],
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return new pgQuery($el.find('input')).attr('type');
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                new pgQuery($el.find('input')).attr('type', value);
                                pinegrow.setNeedsUpdate($el);
                                return value;
                            }
                        },
                        'fdsize' : {
                            'type' : 'select',
                            'name' : 'Size',
                            'show_empty' : true,
                            action: 'apply_class',
                            options: [
                                {key: 'tiny', name: 'Tiny'},
                                {key: 'small', name: 'Small'},
                                {key: 'large', name: 'Large'}
                            ]
                        },
                        'fdshape' : {
                            'type' : 'select',
                            'name' : 'Shape',
                            'show_empty' : true,
                            action: 'apply_class',
                            options: [
                                {key: 'radius', name: 'Radius'},
                                {key: 'round', name: 'Round'}
                            ]
                        }
                    }
                }
            })
        });


        f.addComponentType({
            'type' : 'fd-fieldset',
            'selector' : 'fieldset',
            priority: 100,
            'code' : '<fieldset>\
                <legend>Fieldset Legend</legend>\
        <label>Input Label\
            <input type="text" placeholder="Inputs and other form elements go inside...">\
            </label>\
        </fieldset>',
            'name' : 'Fieldset',
            'sections' : crsaAddStandardSections({
                fdlightboxitem : {
                    name : 'Fieldset options',
                    fields : {
                        'fdlegend' : {
                            'type' : 'text',
                            'name' : 'Legend',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return new pgQuery($el.find('legend')).html();
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                new pgQuery($el.find('legend')).html(value);
                                return value;
                            }
                        }
                    }
                }

            })
        });


        var addPostfixPrefix = function(what, name) {
            f.addComponentType({
                'type' : 'fd-' + what,
                'selector' : '.' + what,
                priority: 100,
                'code' : '<span class="' + what + '">http://</span>',
                'name' : name,
                'sections' : crsaAddStandardSections({
                    fdlightboxitem : {
                        name : name + ' options',
                        fields : {
                            'fdtype' : {
                                'type' : 'select',
                                'name' : 'Type',
                                show_empty: false,
                                options: [
                                    {key: 'span', name: 'Text'},
                                    {key: 'a', name: 'Button'}
                                ],
                                'action' : 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    return $el.is('span') ? "span" : 'a';
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    if(value == 'span') {
                                        var pgnew = pgel.replaceTag('span');
                                        obj.data = $(pgnew.get(0).el);
                                        pgnew.removeClass('button');
                                        pgnew.removeAttr('href');
                                    } else {
                                        var pgnew = pgel.replaceTag('a');
                                        obj.data = $(pgnew.get(0).el);
                                        pgnew.addClass('button');
                                    }
                                    return value;
                                }
                            },
                            'fdcaption' : {
                                'type' : 'text',
                                'name' : 'Caption',
                                'action' : 'element_html'
                            }
                        }
                    }

                })
            });
        }
        addPostfixPrefix('prefix', 'Prefix');
        addPostfixPrefix('postfix', 'Postfix');


        f.addComponentType({
            'type' : 'fd-error',
            'selector' : '.error',
            parent_selector: '.columns,.column',
            priority: 100,
            'code' : '<small class="error">Invalid entry</small>',
            'name' : 'Error',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name : 'Error options',
                    fields : {
                        'fdinline' : {
                            'type' : 'text',
                            'name' : 'Message',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        });


        //Buttons
        f.addComponentType({
            'type' : 'fd-a-button',
            'selector' : '.button',
            priority: 100,
            'code' : '<a href="#" class="button">Button</a>',
            'name' : 'Button',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name : 'Button options',
                    fields : {
                        'fdsize' : {
                            'type' : 'select',
                            'name' : 'Size',
                            'show_empty' : true,
                            action: 'apply_class',
                            options: [
                                {key: 'tiny', name: 'Tiny'},
                                {key: 'small', name: 'Small'},
                                {key: 'large', name: 'Large'}
                            ]
                        },
                        'fdcolor' : {
                            'type' : 'select',
                            'name' : 'Color',
                            'show_empty' : true,
                            action: 'apply_class',
                            options: [
                                {key: 'secondary', name: 'Secondary'},
                                {key: 'success', name: 'Success'},
                                {key: 'alert', name: 'Alert'},
                                {key: 'warning', name: 'Warning'},
                                {key: 'info', name: 'Info'}
                            ]
                        },
                        'fddisabled' : {
                            'type' : 'checkbox',
                            'name' : 'Disabled',
                            'value' : 'disabled',
                            'action' : 'apply_class'
                        },
                        'fdexpand' : {
                            'type' : 'checkbox',
                            'name' : 'Expand',
                            'value' : 'expand',
                            'action' : 'apply_class'
                        }
                    }
                },
                fdlink : linkOptionsSection
            })
        });



        f.addComponentType({
            'type' : 'fd-button-group',
            'selector' : '.button-group',
            priority: 100,
            'code' : '<ul class="button-group">\
                <li><a href="#" class="button">Button 1</a></li>\
            <li><a href="#" class="button">Button 2</a></li>\
            <li><a href="#" class="button">Button 3</a></li>\
        </ul>',
            'name' : 'Button group',
            tags: 'major',
            action_menu: {
                add: ['fd-a-button'],
                on_add : function($el, $new, newdef, prepend) {
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    var pgli = new pgQuery().create('<li></li>').append(pgnew);
                    if(prepend) {
                        pgel.prepend(pgli);
                    } else {
                        pgel.append(pgli);
                    }
                }
            },
            'sections' : crsaAddStandardSections({
                'fdbuttongroup' : {
                    name : 'Button group options',
                    fields : {
                        'fdbuttonstacking' : {
                            'type' : 'select',
                            'name' : 'Stacking',
                            'show_empty' : true,
                            action: 'apply_class',
                            options: [
                                {key: 'stack', name: 'Stack'},
                                {key: 'stack-for-small', name: 'Stack small'}
                            ]
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-button-bar',
            'selector' : '.button-bar',
            priority: 100,
            'code' : '<div class="button-bar">\
                <ul class="button-group">\
            <li><a href="#" class="small button">Button 1</a></li>\
            <li><a href="#" class="small button">Button 2</a></li>\
        </ul>\
            <ul class="button-group">\
                <li><a href="#" class="small button">Button 1</a></li>\
            </ul>\
        </div>',
            'name' : 'Button bar',
            tags: 'major',
            action_menu: {
                add: ['fd-button-group']
            },
            'sections' : crsaAddStandardSections({

            })
        });

        f.addComponentType({
            'type' : 'fd-split-button',
            'selector' : '.button.split',
            priority: 99,
            'code' : function() {
                var id = getUniqueId('drop');
                return '<a href="#" class="button split">Split Button <span data-dropdown="' + id + '"></span></a>';
            },
            'name' : 'Split button',
            tags: 'major',
            action_menu: {
                add: ['fd-a-button'],
                on_add : function($el, $new, newdef, prepend) {
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    var pgli = new pgQuery().create('<li></li>').append(pgnew);
                    var id = $el.find('[data-dropdown]').attr('data-dropdown');
                    if(id) {
                        var $ul = $el.parent().find('#' + id);
                        var pgul = new pgQuery($ul);
                        if($ul.length > 0) {
                            if(prepend) {
                                pgul.prepend(pgli);
                            } else {
                                pgul.append(pgli);
                            }
                            showOrbitMessage();
                            return;
                        }
                    }
                    crsaQuickMessage("Dropdown content not found!");
                }
            },
            on_inserted : function($el) {
                var id = $el.find('[data-dropdown]').attr('data-dropdown');
                var c = '<ul id="' + id + '" class="f-dropdown" data-dropdown-content>\
                    <li><a href="#">This is a link</a></li>\
                    <li><a href="#">This is another</a></li>\
                    <li><a href="#">Yet another</a></li>\
                </ul>';
                var pgel = new pgQuery($el);
                var pgbr = new pgQuery().create('<br/>').insertAfter(pgel);
                var pgc = new pgQuery().create(c).insertAfter(pgbr);
                showOrbitMessage();
            },
            'sections' : crsaAddStandardSections({
                fdlink : linkOptionsSection
            })
        });


        f.addComponentType({
            'type' : 'fd-dropdown-button',
            'selector' : '.button.dropdown',
            priority: 99,
            'code' : function() {
                var id = getUniqueId('drop');
                return '<a href="#" data-dropdown="' + id + '" class="button dropdown">Dropdown Button</a>';
            },
            'name' : 'Dropdown button',
            tags: 'major',
            action_menu: {
                add: ['html-a'],
                on_add : function($el, $new, newdef, prepend) {
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    var pgli = new pgQuery().create('<li></li>').append(pgnew);
                    var id = pgel.attr('data-dropdown');
                    if(id) {
                        var $ul = $el.parent().find('#' + id);
                        var pgul = new pgQuery($ul);
                        if($ul.length > 0) {
                            if(prepend) {
                                pgul.prepend(pgli);
                            } else {
                                pgul.append(pgli);
                            }
                            showOrbitMessage();
                            return;
                        }
                    }
                    crsaQuickMessage("Dropdown content not found!");
                }
            },
            on_inserted : function($el) {
                var id = $el.attr('data-dropdown');
                var c = '<ul id="' + id + '" class="f-dropdown" data-dropdown-content>\
                    <li><a href="#">This is a link</a></li>\
                    <li><a href="#">This is another</a></li>\
                    <li><a href="#">Yet another</a></li>\
                </ul>';
                var pgel = new pgQuery($el);
                var pgbr = new pgQuery().create('<br/>').insertAfter(pgel);
                var pgc = new pgQuery().create(c).insertAfter(pgbr);
                showOrbitMessage();
                setTimeout(function() {
                    $.fn.crsa("setNeedsUpdate", true, $el.parent());
                }, 500);
            },
            'sections' : crsaAddStandardSections({
                fdlink : linkOptionsSection
            })
        });


        //Type
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
                'type' : 'fd-' + h,
                'selector' : h,
                'code' : '<' + h + '>Heading ' + (i+1) + '</' + h + '>',
                'name' : h,
                action_menu: {
                    add: ['fd-small']
                },
                'sections' : crsaAddStandardSections({
                    'fdstyle' : {
                        name : 'Heading',
                        fields : {
                            fdtext : {
                                'type' : 'text',
                                'name' : 'Caption',
                                'action' : 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    //var $p = $el.clone(true).find('small').remove();
                                    var $p = $el.find('small');
                                    return $p.html();
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    crsaWillChangeDom();
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    var pgsmall = new pgQuery($el.find('small')).detach();
                                    pgel.html(value);
                                    pgel.append(pgsmall);
                                    return value;
                                }
                            },
                            fdlevel : {
                                'type' : 'select',
                                'name' : 'Level',
                                'action' : 'custom',
                                'show_empty' : false,
                                options: hoptions,
                                get_value: function(obj) {
                                    var $el = obj.data;
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
                                    var $p = $el.parent();
                                    var pgel = new pgQuery($el);
                                    var pgnewel = pgel.replaceTag(value);
                                    $.fn.crsa('setNeedsUpdate', false, $p);
                                    $.fn.crsa('setSelectElementOnUpdate', $(pgnewel.get(0).el));
                                    return value;
                                }
                            },
                            fdsubheading : {
                                'type' : 'checkbox',
                                'name' : 'Subheader',
                                'value' : 'subheader',
                                'action' : 'apply_class'
                            }
                        }
                    }
                })
            }
            f.addComponentType(hdef);
        });

        var secondaryText = {
            'type' : 'fd-small',
            'selector' : function($el) {
                return $el.is('small') && $el.parent().is('h1,h2,h3,h4,h5,h6');
            },
            'code' : '<small>Secondary text</small>',
            'preview' : '<h1>Title<small>Secondary text</small></h1>',
            'name' : 'Secondary text',
            priority : 100,
            'sections' : crsaAddStandardSections({
                'fdstyle' : {
                    name : 'Secondary text options',
                    fields : {
                        content : {
                            'type' : 'text',
                            'name' : 'Caption',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        }
        f.addComponentType(secondaryText);


        f.addComponentType({
            'type' : 'fd-p',
            'selector' : 'p',
            'code' : '<p>Paragraph</p>',
            'name' : 'p',
            'sections' : crsaAddStandardSections({
            })
        });

        f.addComponentType({
            'type' : 'fd-a',
            'selector' : 'a',
            'code' : '<a href="#">Link</a>',
            'name' : 'a',
            'sections' : crsaAddStandardSections({
                'fdlink' : linkOptionsSection
            })
        });

        var list = {
            'type' : 'fd-list',
            tags: 'major',
            'selector' : 'ul,ol',
            'code' : '<ul>\
        <li>Lorem ipsum dolor sit amet</li>\
    <li>Phasellus iaculis neque</li>\
    <li>Purus sodales ultricies</li>\
</ul>',
            'name' : 'List',
            action_menu: {
                add: ['fd-list', 'fd-list-item']
            },
            'sections' : crsaAddStandardSections({
                'fdstyle' : {
                    name : 'Style',
                    fields : {
                        'fdordered' : {
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

                                $.fn.crsa("setNeedsUpdate", false, obj.data);
                                return value;
                            }
                        },
                        'fdstyle' : {
                            'type' : 'select',
                            'name' : 'Bullet',
                            'show_empty' : true,
                            action: 'apply_class',
                            options: [
                                {key: 'disc', name: 'Disc'},
                                {key: 'circle', name: 'Circle'},
                                {key: 'square', name: 'Square'},
                                {key: 'no-bullet', name: 'No bullet'}
                            ]
                        },
                        'fdinline' : {
                            'type' : 'checkbox',
                            'name' : 'Inline',
                            'action' : 'apply_class',
                            'value' : 'inline-list'
                        }
                    }
                }
            })
        }
        f.addComponentType(list);

        /*
        var list_item = {
            'type' : 'fd-list-item',
            'selector' : 'li',
            parent_selector: 'ol,ul',
            'code' : '<li>List item</li>',
            'name' : 'List Item',
            'sections' : crsaAddStandardSections({
                'fdcontent' : {
                    name : 'List item options',
                    fields : {
                        content : {
                            'type' : 'text',
                            'name' : 'Text',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        }
        f.addComponentType(list_item);
*/

        var description = {
            'type' : 'fd-description',
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
                add: ['fd-description-term', 'fd-description-def']
            },
            'sections' : crsaAddStandardSections({
            })
        }
        f.addComponentType(description);


        var description_term = {
            'type' : 'fd-description-term',
            'selector' : 'dt',
            parent_selector: 'dl',
            'code' : '<dt>Term</dt>',
            'name' : 'Description term',
            'sections' : crsaAddStandardSections({
                'fdcontent' : {
                    name : 'Term options',
                    fields : {
                        content : {
                            'type' : 'text',
                            'name' : 'Text',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        }
        f.addComponentType(description_term);

        var description_def = {
            'type' : 'fd-description-def',
            'selector' : 'dd',
            parent_selector: 'dl',
            'code' : '<dd>Term definition.</dd>',
            'name' : 'Description definition',
            'sections' : crsaAddStandardSections({
                'fdcontent' : {
                    name : 'Definition options',
                    fields : {
                        content : {
                            'type' : 'text',
                            'name' : 'Text',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        }
        f.addComponentType(description_def);


        var blockQuoteCitationSetValue = function(obj, value, values, oldValue) {
            var $el = obj.data;
            var pgel = new pgQuery($el);
            var source = values.source;
            var $small = $el.find('cite');
            var pgsmall = new pgQuery($small);
            if(!value || value.length == 0) {
                crsaWillChangeDom();
                pgsmall.remove();
            } else {
                if($small.length == 0) {
                    crsaWillChangeDom();
                    pgsmall = new pgQuery().create('<cite></cite>');
                    pgel.append(pgsmall);
                }
                pgsmall.html(value);
            }
            return value;
        };

        var blockquote = {
            'type' : 'fd-blockquote',
            'selector' : 'blockquote',
            tags: 'major',
            'code' : '<blockquote>\
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.\
    <cite>Source Title</cite>\
</blockquote>',
            'name' : 'Blockquote',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name: "Blockquote options",
                    fields: {
                        citation: {
                            type: 'text',
                            name: 'Citation',
                            action: 'custom',
                            live_update: true,
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var $small = $el.find('cite');
                                if($small.length == 0) return null;
                                var s = new pgQuery($small).html();
                                return s;
                            },
                            set_value: blockQuoteCitationSetValue
                        }
                    }
                }
            })
        }
        f.addComponentType(blockquote);


        f.addComponentType({
            'type' : 'fd-vcard',
            'selector' : '.vcard',
            'code' : '<ul class="vcard">\
                <li class="fn">Gaius Baltar</li>\
            <li class="street-address">123 Colonial Ave.</li>\
        <li class="locality">Caprica City</li>\
            <li><span class="state">Caprica</span>, <span class="zip">12345</span></li>\
        <li class="email"><a href="#">g.baltar@cmail.com</a></li>\
        </ul>',
            'name' : 'VCard',
            priority: 100,
            'sections' : crsaAddStandardSections({
            })
        });


        f.addComponentType({
            'type' : 'fd-span-label',
            'selector' : '.label',
            'code' : '<span class="label">Regular Label</span>',
            'name' : 'Label',
            priority: 100,
            'sections' : crsaAddStandardSections({
                'fdcontent' : {
                    name : 'Label options',
                    fields : {
                        content : {
                            'type' : 'text',
                            'name' : 'Text',
                            'action' : 'element_html'
                        },
                        'fdcolor' : {
                            'type' : 'select',
                            'name' : 'Color',
                            'show_empty' : true,
                            action: 'apply_class',
                            options: [
                                {key: 'secondary', name: 'Secondary'},
                                {key: 'success', name: 'Success'},
                                {key: 'alert', name: 'Alert'}
                            ]
                        }
                    }
                }
            })
        });


        f.addComponentType({
            'type' : 'fd-kdb',
            'selector' : 'kbd',
            'code' : '<kbd>Cmd</kbd>',
            'name' : 'Keystroke',
            priority: 100,
            'sections' : crsaAddStandardSections({
                'fdcontent' : {
                    name : 'Keystroke options',
                    fields : {
                        content : {
                            'type' : 'text',
                            'name' : 'Text',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        });


        //Callouts
        f.addComponentType({
            'type' : 'fd-reveal-modal',
            'selector' : '.reveal-modal',
            'code' : function() {
                var id = getUniqueId('modal');
                return '<div id="' + id + '" class="reveal-modal pg-show-modal" data-reveal>\
                <h2>Awesome. I have it.</h2>\
            <p class="lead">Your couch.  It is mine.</p>\
            <p>Im a cool paragraph that lives inside of an even cooler modal. Wins</p>\
            <a class="close-reveal-modal">&#215;</a>\
        </div>'
            },
            'name' : 'Reveal modal',
            tags: 'major',
            on_inserted : function() {
                showOrbitMessage();
            },
            priority: 100,
            'sections' : crsaAddStandardSections({
                'fdcontent' : {
                    name : 'Reveal modal options',
                    fields : {
                        'fdsize' : {
                            'type' : 'select',
                            'name' : 'Size',
                            'show_empty' : true,
                            action: 'apply_class',
                            options: [
                                {key: 'tiny', name: 'Tiny'},
                                {key: 'small', name: 'Small'},
                                {key: 'medium', name: 'Medium'},
                                {key: 'large', name: 'Large'},
                                {key: 'xlarge', name: 'Xlarge'}
                            ]
                        },
                        fdeditshow : {
                            'type' : 'checkbox',
                            'name' : 'Show during editing',
                            'value' : 'pg-show-modal',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.hasClass('pg-show-modal') ? 'pg-show-modal' : null;
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
            'type' : 'fd-alert',
            'selector' : '.alert-box',
            'code' : '<div data-alert class="alert-box success radius">\
            This is a nice alert.\
        <a href="#" class="close">&times;</a>\
        </div>',
            'name' : 'Alert',
            tags: 'major',
            on_inserted : function() {
                showOrbitMessage();
            },
            priority: 100,
            'sections' : crsaAddStandardSections({
                'fdcontent' : {
                    name : 'Alert options',
                    fields : {
                        'fdcolor' : {
                            'type' : 'select',
                            'name' : 'Color',
                            'show_empty' : true,
                            action: 'apply_class',
                            options: [
                                {key: 'success', name: 'Success'},
                                {key: 'warning', name: 'Warning'},
                                {key: 'info', name: 'Info'}
                            ]
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-panel',
            'selector' : '.panel',
            'code' : '<div class="panel">\
                <h5>This is a regular panel.</h5>\
            <p>It has an easy to override visual style, and is appropriately subdued.</p>\
        </div>',
            'name' : 'Panel',
            tags: 'major',
            priority: 100,
            'sections' : crsaAddStandardSections({
                'fdcontent' : {
                    name : 'Panel options',
                    fields : {
                        'fdcallout' : {
                            'type' : 'checkbox',
                            'name' : 'Callout',
                            action: 'apply_class',
                            value: 'callout'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-tooltip',
            'selector' : '*[data-tooltip]',
            'code' : '<span data-tooltip class="has-tip" title="Tooltips are awesome, you should totally use them!">extended information</span>',
            'name' : 'Tooltip',
            tags: 'major',
            priority: 100,
            on_changed : function() {
                showOrbitMessage();
            },
            on_inserted : function() {
                showOrbitMessage();
            },
            'sections' : crsaAddStandardSections({
                'fdcontent' : {
                    name : 'Tooltip options',
                    fields : {
                        'fdtiptext' : {
                            'type' : 'text',
                            'name' : 'Tip text',
                            action: 'custom',
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.attr('title', value);
                                } else {
                                    pgel.removeAttr('title');
                                }
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.attr('title');
                            }
                        },
                        'fdtargettext' : {
                            'type' : 'text',
                            'name' : 'Target text',
                            action: 'element_html'
                        },
                        'fddisabletouch' : {
                            'type' : 'checkbox',
                            'name' : 'Disable touch',
                            value:'1',
                            action: 'custom',
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.attr('data-options', 'disable_for_touch:true');
                                } else {
                                    pgel.removeAttr('data-options');
                                }
                                showOrbitMessage();
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var opts = pgel.attr('data-options');
                                return opts && opts.indexOf('disable_for_touch:true') >= 0 ? '1' : null;
                            }
                        },
                        'fdposition' : {
                            'type' : 'select',
                            'name' : 'Position',
                            'show_empty' : true,
                            action: 'apply_class',
                            options: [
                                {key: 'tip-top', name: 'Top'},
                                {key: 'tip-right', name: 'Right'},
                                {key: 'tip-bottom', name: 'Bottom'},
                                {key: 'tip-left', name: 'Left'}
                            ]
                        }
                    }
                }
            })
        });


        f.addComponentType({
            'type' : 'fd-joyride-item',
            'selector' : function($el) {
                return $el.parent().is('.joyride-list');
            },
            'code' : '<li data-button="Next" >\
                <h4>Title</h4>\
            <p>Tell me something nice!</p>\
        </li>',
            'name' : 'Joyride item',
            parent_selector: '.joyride-list',
            tags: 'major',
            priority: 100,
            on_changed : function() {
                showOrbitMessage();
            },
            on_inserted : function() {
                showOrbitMessage();
            },
            'sections' : crsaAddStandardSections({
                'fdcontent' : {
                    name : 'Joyride item options',
                    fields : {
                        fdid : {
                            'type' : 'text',
                            'name' : 'Stop id',
                            'action' : 'element_attribute',
                            attribute : 'data-id'
                        },
                        fdbutton : {
                            'type' : 'text',
                            'name' : 'Button text',
                            'action' : 'element_attribute',
                            attribute : 'data-button'
                        },
                        fdtitle : {
                            'type' : 'text',
                            'name' : 'Title',
                            action: 'custom',
                            live_update: false,
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return new pgQuery($el.find('h4')).html();
                            },
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var $h4 = $el.find('h4');
                                var pgh4 = new pgQuery($h4);
                                if(value) {
                                    if($h4.length == 0) {
                                        pgh4 = new pgQuery().create('<h4></h4>');
                                        pgel.prepend(pgh4);
                                    }
                                    pgh4.html(value);
                                } else {
                                    pgh4.remove();
                                }
                                return value;
                            }
                        },
                        fdmsg : {
                            'type' : 'text',
                            'name' : 'Message',
                            action: 'custom',
                            live_update: false,
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return new pgQuery(el.find('p')).html();
                            },
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var $p = $el.find('p');
                                var pgel = new pgQuery($el);
                                var pgp = new pgQuery($p);
                                if(value) {
                                    if($p.length == 0) {
                                        pgp = new pgQuery().create('<p></p>');
                                        pgel.append(pgp);
                                    }
                                    pgp.html(value);
                                } else {
                                    pgp.remove();
                                }
                                return value;
                            }
                        },
                        fdposition : dataOptionsField('tip_location', 'select', [
                            {key: 'top', 'name' : 'Top'},
                            {key: 'bottom', 'name' : 'Bottom'}
                        ]
                        ),
                        fdanimation : dataOptionsField('tip_animation', 'select', [
                            {key: 'pop', 'name' : 'Pop'},
                            {key: 'fade', 'name' : 'Fade'}
                        ]
                        )
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-joyride',
            'selector' : '.joyride-list',
            'code' : '<ol class="joyride-list" data-joyride></ol>',
            'name' : 'Joyride',
            parent_selector: 'body',
            tags: 'major',
            last_type: true,
            priority: 100,
            on_changed : function() {
                showOrbitMessage();
            },
            on_inserted : function() {
                showAlert('<p>Add Joyride items with Actions menu of a selected Joyride.</p><p>Joyride needs to be started with JavaScript:</p> <code>$(document).foundation(\'joyride\', \'start\');</code>', 'Notice');
            },
            action_menu: {
                add: ['fd-joyride-item']
            },
            'sections' : crsaAddStandardSections({

            })
        });

        //Content

        var setDataOption = function(obj, key, type, value, on_value) {
            if(typeof on_value == 'undefined') on_value = '1';
            var $el = obj.data;
            var pgel = new pgQuery($el);

            var v;
            switch(type) {
                case 'as_is':
                    v = value;
                    break;
                default:
                    v = value == on_value ? 'true' : 'false';
            }
            var d = pgel.attr('data-options');
            if(!d) {
                d = key + ':' + v + ';';
            } else {
                var find = new RegExp(key + '\\s*:\\s*([^;]*)', 'i');
                if(d.match(find)) {
                    var re = new RegExp(key + '\\s*:\\s*([^;]*)','i');
                    d = d.replace(re, key + ':' + v);
                } else {
                    if(d.charAt(d.length-1) != ';') d += ';';
                    d += key + ':' + v + ';';
                }
            }
            pgel.attr('data-options', d);
            return value;
        }

        var getDataOption = function(obj, key, type, value) {
            if(typeof value == 'undefined') value = '1';
            var $el = obj.data;
            var pgel = new pgQuery($el);
            var d = pgel.attr('data-options');
            var re = new RegExp(key + '\\s*:\\s*([^;]*)', 'i');
            if(d) {
                var m = d.match(re);
                if(m) {
                    switch(type) {
                        case 'as_is':
                            return $.trim(m[1]);
                            break;
                        default:
                            return m[1] == 'true' ? value : null;
                    }
                }
            }
            return null;
        }

        f.addComponentType({
            type : 'fd-dropdown-list-item',
            selector : null,
            code : '<li><a href="#">This is a link</a></li>',
            'name' : 'Dropdown list item',
            'sections' : crsaAddStandardSections({
            })
        });

        f.addComponentType({
            type : 'fd-dropdown-list',
            selector : 'ul[data-dropdown-content]',
            name : 'Dropdown list',
            code: function() {
                var id = getUniqueId('dropdown');
                return '<ul id="' + id + '" class="f-dropdown" data-dropdown-content aria-hidden="true" tabindex="-1">\
                    <li><a href="#">This is a link</a></li>\
                    <li><a href="#">This is another</a></li>\
                    <li><a href="#">Yet another</a></li>\
                </ul>';
            },
            priority: 100,
            last_type: true,
            action_menu: {
                add: ['fd-dropdown-list-item']
            },
            tags: 'major',
            on_inserted: function($el) {
                $el.addClass('open');
            },
            sections : crsaAddStandardSections({
                fddropbox : {
                    name : 'Dropbox options',
                    fields : {
                        'fddropboxsize' : {
                            'type' : 'select',
                            'name' : 'Size',
                            'action' : 'apply_class',
                            show_empty : true,
                            options: [
                                {key: 'tiny', name: 'tiny'},
                                {key: 'small', name: 'small'},
                                {key: 'medium', name: 'medium'},
                                {key: 'large', name: 'large'},
                                {key: 'mega', name: 'mega'}
                            ]
                        },
                        fddropboxcontent : {
                            'type' : 'checkbox',
                            'name' : 'Content',
                            'action' : 'apply_class',
                            'value' : 'content'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            type : 'fd-dropdown-content',
            selector : '[data-dropdown-content]',
            name : 'Dropdown content',
            code: function() {
                var id = getUniqueId('dropdown');
                return '<div id="' + id + '" data-dropdown-content class="f-dropdown content" aria-hidden="true" tabindex="-1">\
                    <p>Some text that people will think is awesome! Some text that people will think is awesome! Some text that people will think is awesome!</p>\
                </div>';
            },
            priority: 101,
            tags: 'major',
            on_inserted: function($el) {
                $el.addClass('open');
            },
            sections : crsaAddStandardSections({
                fddropbox : {
                    name : 'Dropbox options',
                    fields : {
                        'fddropboxsize' : {
                            'type' : 'select',
                            'name' : 'Size',
                            'action' : 'apply_class',
                            show_empty : true,
                            options: [
                                {key: 'tiny', name: 'tiny'},
                                {key: 'small', name: 'small'},
                                {key: 'medium', name: 'medium'},
                                {key: 'large', name: 'large'},
                                {key: 'mega', name: 'mega'}
                            ]
                        },
                        fddropboxcontent : {
                            'type' : 'checkbox',
                            'name' : 'Content',
                            'action' : 'apply_class',
                            'value' : 'content'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            type : 'fd-pricing-title',
            selector : function($el) {
                return $el.is('li') && $el.is('.title') && $el.parent().is('.pricing-table');
            },
            parent_selector: '.pricing-table',
            code : '<li class="title">Standard</li>',
            'name' : 'Title',
            priority: 100,
            'sections' : crsaAddStandardSections({
                fdpricing : {
                    name : 'Title options',
                    fields : {
                        'fdcode' : {
                            'type' : 'text',
                            'name' : 'Text',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            type : 'fd-pricing-price',
            selector : function($el) {
                return $el.is('li') && $el.is('.price') && $el.parent().is('.pricing-table');
            },
            parent_selector: '.pricing-table',
            code : '<li class="price">$99.99</li>',
            'name' : 'Price',
            priority: 100,
            'sections' : crsaAddStandardSections({
                fdpricing : {
                    name : 'Price options',
                    fields : {
                        'fdcode' : {
                            'type' : 'text',
                            'name' : 'Text',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            type : 'fd-pricing-desc',
            selector : function($el) {
                return $el.is('li') && $el.is('.description') && $el.parent().is('.pricing-table');
            },
            parent_selector: '.pricing-table',
            code : '<li class="description">An awesome description</li>',
            'name' : 'Description',
            priority: 100,
            'sections' : crsaAddStandardSections({
                fdpricing : {
                    name : 'Description options',
                    fields : {
                        'fdcode' : {
                            'type' : 'text',
                            'name' : 'Text',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            type : 'fd-pricing-item',
            selector : function($el) {
                return $el.is('li') && $el.is('.bullet-item') && $el.parent().is('.pricing-table');
            },
            parent_selector: '.pricing-table',
            code : '<li class="bullet-item">1 Database</li>',
            'name' : 'Bullet item',
            priority: 100,
            'sections' : crsaAddStandardSections({
                fdpricing : {
                    name : 'Item options',
                    fields : {
                        'fdcode' : {
                            'type' : 'text',
                            'name' : 'Text',
                            'action' : 'element_html'
                        }
                    }
                }
            })
        });

        f.addComponentType({
            type : 'fd-pricing-cta',
            selector : function($el) {
                return $el.is('li') && $el.is('.cta-button') && $el.parent().is('.pricing-table');
            },
            parent_selector: '.pricing-table',
            code : '<li class="cta-button"><a class="button" href="#">Buy Now</a></li>',
            'name' : 'Button',
            priority: 100,
            'sections' : crsaAddStandardSections({
            })
        });

        f.addComponentType({
            'type' : 'fd-pricing',
            'selector' : '.pricing-table',
            'code' : '<ul class="pricing-table">\
                <li class="title">Standard</li>\
            <li class="price">$99.99</li>\
        <li class="description">An awesome description</li>\
            <li class="bullet-item">1 Database</li>\
        <li class="bullet-item">5GB Storage</li>\
            <li class="bullet-item">20 Users</li>\
        <li class="cta-button"><a class="button" href="#">Buy Now</a></li>\
        </ul>',
            'name' : 'Pricing table',
            tags: 'major',
            priority: 100,
            action_menu: {
                add: ['fd-pricing-title', 'fd-pricing-price', 'fd-pricing-desc', 'fd-pricing-item', 'fd-pricing-cta']
            },
            'sections' : crsaAddStandardSections({

            })
        });

        f.addComponentType({
            'type' : 'fd-progress-bar',
            'selector' : 'div.progress',
            'code' : '<div class="progress">\
                <span class="meter" style="width:65%;"></span>\
        </div>',
            'name' : 'Progress bar',
            'sections' : crsaAddStandardSections({
                'fdstyle' : {
                    name : 'Progress bar options',
                    fields : {
                        'fdpercent' : {
                            'type' : 'text',
                            'name' : 'Completed %',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data.find('span');
                                //var pgel = new pgQuery($el);
                                var w = $el.get(0).style.width;
                                w = w != null ? w.replace('%', '') : null;
                                return w;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data.find('span');
                                var v = value == null ? 50 : parseInt(value);
                                if(v > 100) v = 100;
                                var pgel = new pgQuery($el);
                                pgel.attr('style', 'width:' + v + '%;');
                                //$el.get(0).style.width = v + '%';
                                return value;
                            }
                        }
                    }
                }
            })
        });


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
            'type' : 'fd-table',
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
                }
            })
        }
        f.addComponentType(table);


        f.addComponentType({
            'type' : 'fd-accordion',
            'selector' : '.accordion',
            'code' : function() {
                var id1 = getUniqueId('panel');
                var id2 = getUniqueId('panel');
                var id3 = getUniqueId('panel');

                return '<dl class="accordion" data-accordion>\
                <dd>\
                    <a href="#' + id1 + '">Accordion 1</a>\
                    <div id="' + id1 + '" class="content active">\
                    Panel 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\
                    </div>\
                </dd>\
                <dd>\
                    <a href="#' + id2 + '">Accordion 2</a>\
                    <div id="' + id2 + '" class="content">\
                    Panel 2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\
                    </div>\
                </dd>\
                <dd>\
                    <a href="#' + id3 + '">Accordion 3</a>\
                    <div id="' + id3 + '" class="content">\
                    Panel 3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\
                    </div>\
                </dd>\
        </dl>'
            },
            'name' : 'Accordion',
            last_type: true,
            tags: 'major',
            priority: 100,
            on_inserted : function() {
                showOrbitMessage();
            },
            on_changed : function() {
                showOrbitMessage();
            },
            action_menu: {
                add: ['fd-accordion-item']
            },
            'sections' : crsaAddStandardSections({

            })
        });

        f.addComponentType({
            'type' : 'fd-accordion-item',
            'selector' : function($el) {
                return $el.is('dd') && $el.parent().is('.accordion');
            },
            'code' : function() {
                var id1 = getUniqueId('panel');

                return '<dd>\
                    <a href="#' + id1 + '">Accordion item</a>\
                    <div id="' + id1 + '" class="content">\
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\
                    </div>\
                </dd>';
            },
            'name' : 'Accordion item',
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
                                new pgQuery($el.find('>div')).attr('id', value);
                                new pgQuery($el.find('>a')).attr('href', '#' + value);
                                showOrbitMessage();
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                return new pgQuery($el.find('>div')).attr('id');
                            }
                        },
                        fdname : {
                            'type' : 'text',
                            'name' : 'Name',
                            'action' : 'custom',
                            live_update : true,
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                new pgQuery($el.find('>a')).html(value);
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                return new pgQuery($el.find('>a')).html();
                            }
                        },
                        fdactive: {
                            type: 'checkbox',
                            name: 'Active',
                            action: 'apply_class',
                            value: 'active'
                        }
                    }
                }
            })
        });


        f.addComponentType({
            'type' : 'fd-tabs',
            'selector' : '.tabs',
            'code' : function() {
                var id1 = getUniqueId('panel');
                var id2 = getUniqueId('panel');
                var id3 = getUniqueId('panel');
                var id4 = getUniqueId('panel');

                return '<dl class="tabs" data-tab>\
                    <dd class="active"><a href="#' + id1 + '">Tab 1</a></dd>\
                    <dd><a href="#' + id2 + '">Tab 2</a></dd>\
                    <dd><a href="#' + id3 + '">Tab 3</a></dd>\
                    <dd><a href="#' + id4 + '">Tab 4</a></dd>\
                </dl>';
            },
            'name' : 'Tabs',
            tags: 'major',
            last_type: true,
            priority: 100,
            on_inserted : function($el) {
                var pgel = new pgQuery($el);
                var pgtc = new pgQuery().create('<div class="tabs-content"></div>').insertAfter(pgel);
                $el.children().each(function(i, t) {
                    var id = $(t).find('>a').attr('href');
                    if(id) id = id.replace('#', '');
                    var pgp = new pgQuery().create('<div class="content"><p>Tab ' + (i+1) + ' content goes here...</p></div>');
                    if(id) pgp.attr('id', id);
                    if(i == 0) pgp.addClass('active');
                    pgtc.append(pgp);
                });
                showOrbitMessage();
            },
            on_changed : function() {
                showOrbitMessage();
            },
            action_menu: {
                add: ['fd-tabs-item'],
                on_add : function($el, $new, newdef, prepend) {
                    var pgel = new pgQuery($el);
                    var pgnew = new pgQuery($new);
                    var id = $new.find('>a').attr('href').replace('#','');
                    var pgdiv = new pgQuery().create('<div class="content" id="' + id + '"><p>Tab content goes here...</p></div>');
                    var $tabs = $el.next('.tabs-content');
                    var pgtabs = new pgQuery($tabs);
                    if(prepend) {
                        pgtabs.prepend(pgdiv);
                        pgel.prepend(pgnew);
                    } else {
                        pgtabs.append(pgdiv);
                        pgel.append(pgnew);
                    }
                }
            },
            'sections' : crsaAddStandardSections({
                'fdtabs' : {
                    name: 'Tabs options',
                    fields: {
                        fddest : {
                            'type' : 'checkbox',
                            'name' : 'Vertical',
                            value : '1',
                            'action' : 'custom',
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                if(value) {
                                    pgel.addClass('vertical');
                                    var $tabs = $el.next('.tabs-content');
                                    new pgQuery($tabs).addClass('vertical');
                                } else {
                                    pgel.removeClass('vertical');
                                    var $tabs = $el.next('.tabs-content');
                                    new pgQuery($tabs).removeClass('vertical');
                                }
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                return pgel.hasClass('vertical');
                            }
                        }
                    }
                }
            })
        });

        f.addComponentType({
            'type' : 'fd-tabs-item',
            'selector' : function($el) {
                return $el.is('dd') && $el.parent().is('.tabs');
            },
            'code' : function() {
                var id1 = getUniqueId('panel');

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
                                var pgel = new pgQuery($el);
                                new pgQuery($el.find('>a')).attr('href', '#' + value);
                                var $tabs = $el.parent().next('.tabs-content');
                                if($tabs.find('#' + value).length == 0) {
                                    showAlert('Can not find tab content with this id.', 'No tab content');
                                } else {
                                    showOrbitMessage();
                                }
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                var pgel = new pgQuery($el);
                                var h = new pgQuery($el.find('>a')).attr('href');
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
                                var pgel = new pgQuery($el);
                                new pgQuery($el.find('>a')).html(value);
                                return value;
                            },
                            get_value: function(obj) {
                                var $el = obj.data;
                                return new pgQuery($el.find('>a')).html();
                            }
                        },
                        fdactive: {
                            type: 'checkbox',
                            name: 'Active',
                            action: 'custom',
                            value: '1',
                            set_value : function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var h = new pgQuery($el.find('>a')).attr('href');
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
                                var pgel = new pgQuery($el);
                                return pgel.hasClass('active');
                            }
                        }
                    }
                }
            })
        });

        //
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

        var section = new PgFrameworkLibSection('fdgrid', 'Grid');
        section.setComponentTypes(getTypes(['fd-row','fd-column','fd-block-column', 'fd-clear']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('fdnavigation', 'Navigation');
        section.setComponentTypes( getTypes(['fd-offsite', 'fd-topbar', 'fd-iconbar', 'fd-sidenav', 'fd-stickynav','fd-breadcrumbs', 'fd-pagination']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('fdmedia', 'Media');
        section.setComponentTypes( getTypes(['fd-orbit', 'fd-thumbnail', 'fd-lightbox', 'fd-flexvideo']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('fdforms', 'Forms');
        section.setComponentTypes( getTypes(['fd-form', 'fd-form-column', 'fd-label', 'fd-label-only', 'fd-input', 'fd-switch', 'fd-textarea', 'fd-select', 'fd-button', 'fd-fieldset', 'fd-prefix', 'fd-postfix', 'fd-error']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('fdbuttons', 'Buttons');
        section.setComponentTypes( getTypes(['fd-a-button', 'fd-button-group', 'fd-button-bar', 'fd-split-button', 'fd-dropdown-button']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('fdtype', 'Type');
        section.setComponentTypes( getTypes(['fd-h1','fd-h2','fd-h3','fd-h4','fd-h5','fd-h6','fd-small', 'fd-p', 'fd-a', 'fd-list', 'fd-list-item', 'fd-description', 'fd-description-term', 'fd-description-def', 'fd-blockquote', 'fd-vcard', 'fd-span-label','fd-kbd' ]));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('fdcallouts', 'Callouts &amp; Prompts');
        section.setComponentTypes( getTypes(['fd-reveal-modal', 'fd-alert', 'fd-panel', 'fd-tooltip', 'fd-joyride']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('fdcontent', 'Content');
        section.setComponentTypes( getTypes(['fd-dropdown-list', 'fd-dropdown-content', 'fd-pricing', 'fd-progress-bar', 'fd-table','fd-accordion','fd-tabs']));
        f.addLibSection(section);


        f.pppon_page_loaded = function(crsaPage) {
            /*
            var $html = crsaPage.get$Html();

            if($html.find('ul.clearing-thumbs').length > 0) {
                pinegrow.setNeedsUpdate($(crsaPage.getBody()));
            }

            $html.find('[data-orbit]').each(function(i,e) {
                crsaQuickMessage("Orbit slider detected. It is recommended to pause the slider for better performance.", 2000);

            });
            */
        }

        f.on_set_inline_style = function(page, o) {
            o.css += '\
            .pg-show-modal {\
            visibility: visible;\
            display: block;\
            position: relative;\
            opacity: 1;\
            }';
        }

    });
});