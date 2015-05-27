$(function() {

    $('body').one('pinegrow-ready', function(e, pinegrow) {
        var f = new PgFramework('bs2.3.2', 'Bootstrap 2.3.2');
        f.type = "bootstrap";
        f.allow_single_type = true;

        f.ignore_css_files = [/(^|\/)bootstrap\.(css|less)/i, /(^|\/)bootstrap\.min\.(css|less)/i, /(^|\/)bootstrap-responsive\.(css|less)/i, /(^|\/)bootstrap-responsive\.min\.(css|less)/i, /(^|\/)font(\-|)awesome(\.min|)\.(css|less)/i];
        f.detect = function(crsaPage) {
            return crsaPage.hasStylesheet(/(^|\/)bootstrap(\.min|)\.(css|less)/i);
        }

        pinegrow.addFramework(f);


        //f.default = true;

        var getPlaceholderImage = function() {
            return pinegrow.getPlaceholderImage();
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
                                var sizes = ["phone", "tablet", "desktop"];
                                var $table = $("<table/>", {class: 'grid-control resp-control'}).appendTo($dest);
                                var $row = $("<tr/>").html("<td><label>Ph</label></td><td><label>Tab</label></td><td><label>Desk</label></td>").appendTo($table);

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
                        'responsive-xs' : createResponsiveSelect('phone'),
                        'responsive-sm' : createResponsiveSelect('tablet'),
                        'responsive-md' : createResponsiveSelect('desktop')
                    }
                }
            };

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
                'name' : name,
                'action' : 'apply_class',
                'show_empty' : empty,
                'options' : []
            }
            for(var n = 1; n <= 12; n++) {
                span_select.options.push({key: base + n, name: n});
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
                    {key: 'hidden-' + size, name: 'Hidden'}
                ]
            }
            return span_select;
        }

        function getGridPreview(t) {
            return '<div class="container preview-' + t + '">\
            <div class="row sel">\
                <div class="span4 sel"><div></div></div>\
                <div class="span4"><div></div></div>\
                <div class="span4"><div></div></div>\
            </div>\
            <div class="row">\
                <div class="span4"><div></div></div>\
                <div class="span4"><div></div></div>\
                <div class="span4"><div></div></div>\
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
                layout : {
                    name : 'Layout',
                    show : true,
                    fields : {
                        fluid: {
                            'type' : 'checkbox',
                            'name' : 'Fluid',
                            value : '1',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var val = $el.hasClass('container-fluid') ? '1' : null;
                                return val;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                if(value) {
                                    $el.addClass('container-fluid').removeClass('container');
                                } else {
                                    $el.removeClass('container-fluid').addClass('container');
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
            'selector' : 'div.row,div.row-fluid',
            tags: 'major',
            preview: getGridPreview('row'),
            'parent_selector' : '.container',
            'code' : '<div class="row"></div>',
            empty_placeholder : true,
            'name' : 'Row',
            action_menu : {
                add: ['bs-column', 'thumbnail-img', 'thumbnail-content']
            },
            'sections' : crsaAddStandardSections({
                layout : {
                    name : 'Layout',
                    show : true,
                    fields : {
                        fluid: {
                            'type' : 'checkbox',
                            'name' : 'Fluid',
                            value : '1',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var $el = obj.data;
                                var val = $el.hasClass('row-fluid') ? '1' : null;
                                return val;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                if(value) {
                                    $el.addClass('row-fluid').removeClass('row');
                                } else {
                                    $el.removeClass('row-fluid').addClass('row');
                                }
                                return value;
                            }
                        }
                    }
                }
            })
        });

        //Column clear
        f.addComponentType({
            'type' : 'bs-clear',
            'selector' : 'div.clear-columns',
            'code' : '<div class="clearfix clear-columns"></div>',
            'name' : 'Clear columns',
            'sections' : crsaAddStandardSections({})
        });

        f.addComponentType({
            'type' : 'bs-column',
            tags: 'major',
            'selector' : function($el) {
                if($el.is('div')) {
                    var $p = $el.parent();
                    if($p.is('.row,.control-group,.row-fluid')) return true;
                }
                if($el.is('label')) return false;
                var cls = $el.attr('class');
                if(cls) {
                    if(cls.match(/(\s|^)span/i)) return true;
                }
                return false;
            },
            preview: getGridPreview('column'),
            parent_selector: '.row,.row-fluid',
            'code' : '<div class="span4"><h3>Column title</h3>\
        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\
        </div>',
            'empty_placeholder' : true,
            'name' : 'Column',
            'inline_edit' : true,
            'sections' : crsaAddStandardSections({
                layout : {
                    name : 'Grids',
                    show : true,
                    fields : {
                        span : createColumnSpans("Span", "span", true),
                        offset : createColumnSpans("Offs", "offset", true)
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
                                    var $newel = replaceTag($el, value);
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
            if(!value || value.length == 0) {
                $small.remove();
            } else {
                if(source && source.length > 0) {
                    source = '<cite title="' + source + '">' + source + '</cite>';
                } else {
                    source = '';
                }
                if((!oldValue || oldValue.length == 0) && (source && source.length > 0)) value += " @SOURCE";
                var text = value.replace(/@source/i, source);
                if($small.length == 0) {
                    $small = $("<small/>").appendTo($el);
                }
                $small.html(text);
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
                                if($small.length == 0) return null;
                                var s = $small.html();
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
                                return $cite.text();
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
                                var cls = $el.attr('class');
                                var m = cls.match(/glyphicon-[a-z\-]*/i);
                                return m;
                            },
                            set_value: function(obj, value, values) {
                                var $el = obj.data;
                                var cls = $el.attr('class');
                                var m = cls.match(/glyphicon-[a-z\-]*/i);
                                if(m) $el.removeClass(m[0]);
                                $el.addClass(value);
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
                    name: "Info",
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
                                var $tbody = $el.find('>tbody');
                                if($tbody.length == 0) $tbody = $('<tbody/>').appendTo($el);
                                var $rows = $tbody.find('>tr');
                                var cols = values.columns;
                                var change = false;
                                var empty_count = countNonEmptyTableRows($tbody);
                                var new_value = value;

                                if($rows.length < value) {
                                    for(var n = 0; n < value - $rows.length; n++) {
                                        var $tr = $('<tr/>').appendTo($tbody);
                                        for(var c = 0; c < cols; c++) {
                                            $('<td/>').appendTo($tr);
                                        }
                                    }
                                    change = true;
                                } else if($rows.length > value) {
                                    var remove = $rows.length - value;
                                    $rows.each(function(i,tr) {
                                        var $tr = $(tr);
                                        if(isTableRowEmpty($tr)) {
                                            $tr.remove();
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
                                                    $td.remove();
                                                    remove--;
                                                    if(remove == 0) return false;
                                                }
                                            });
                                        } else if(cells.length < value) {
                                            for(var n = cells.length; n < value; n++) {
                                                var tag = $(tr).parent().is('thead') ? 'th' : 'td';
                                                $('<' + tag +'/>').appendTo($(tr));
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
                                var $p = $el.parent();
                                if(value) {
                                    if(!$p.is('div.table-responsive')) {
                                        if($p.is('div') && false) {
                                            $p.addClass('table-responsive');
                                        } else {
                                            var $div = $('<div/>', {'class' : 'table-responsive'});
                                            $el.replaceWith($div);
                                            $div.append($el);
                                        }
                                    }
                                } else {
                                    if($p.is('div.table-responsive')) {
                                        if($p.children().length > 1) {
                                            $p.removeClass('table-responsive');
                                        } else {
                                            $el.detach();
                                            $p.replaceWith($el);
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
            var horiz = $el.is('.form-horizontal');
            var $groups = $el.find('>div,>button,>fieldset>div,>fieldset>button');
            var col1 = values['horizontal-col1'] || 2;
            var col2 = values['horizontal-col2'] || 10;
            var base = 'col-sm-';

            $el.find('label').addClass('control-label');

            $groups.each(function(i, group) {
                var $group = $(group);

                if(!$group.is('.control-group')) {
                    if(horiz) {
                        var $div = $('<div/>', {'class' : 'control-group'});
                        $group.replaceWith($div);
                        $div.append($group);
                        $group = $div;
                    }
                }
                var $ch = $group.children();
                if($ch.length >= 2) {
                    var lab = $($ch.get(0));
                    var field = $($ch.get(1));

                    if(horiz) {
                        if(!field.is('div') || !field_has_cols) {
                            var $div = $('<div/>', {class: 'control'});
                            field.replaceWith($div);
                            $div.append(field);
                            field = $div;
                        }
                        if($ch.length > 2) {
                            for(var n = 2; n < $ch.length; n++) {
                                $($ch.get(n)).appendTo(field);
                            }
                        }
                    }
                } else if($ch.length == 1) {
                    var field = $($ch.get(0));
                    if(horiz) {
                        if(!field.is('div')) {
                            var $div = $('<div/>');
                            field.replaceWith($div);
                            $div.append(field);
                            field = $div;
                        }
                    }
                }
            });

            if($el.is('.form-search, .navbar-form')) {
                $el.find('label').addClass('sr-only');
                $el.find('div.checkbox > label').removeClass('sr-only');
            } else {
                $el.find('label').removeClass('sr-only');
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
        <div class="control-group">\
    <label class="control-label" for="exampleInputEmail1">Email address</label>\
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">\
    </div>\
        <div class="control-group">\
            <label class="control-label" for="exampleInputPassword1">Password</label>\
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">\
            </div>\
            <div class="control-group">\
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
                add: ['control-group', 'form-textarea-group', 'form-select-group', 'form-checkbox-group', 'form-radio-group', 'form-static-group', 'form-fieldset'],
                on_add : function($el, $new, newdef) {
                    var values = $.fn.crsa('getValuesForElement', $el);
                    $el.append($new);
                    restructureForm($el, values);
                }
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
                                {key: 'form-search', name: 'Search'},
                                {key: 'form-horizontal', name: 'Horizontal'},
                                {key: 'navbar-form', name: 'Navbar'}
                            ],
                            get_value: function(obj) {
                                var $el = obj.data;
                                if($el.is('.form-horizontal')) return 'form-horizontal';
                                if($el.is('.form-search')) return 'form-search';
                                if($el.is('.navbar-form')) return 'navbar-form';
                                return 'form-normal';
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                crsaWillChangeDom();
                                var $el = obj.data;
                                $el.removeClass('form-horizontal').removeClass('form-search').removeClass('form-normal').removeClass('navbar-form');
                                $el.addClass(value);
                                restructureForm($el, values);
                                $.fn.crsa("setNeedsUpdate", false, $el);
                            }
                        }
                    }
                }
            })
        }
        f.addComponentType(form);




        var form_group = {
            'type' : 'control-group',
            'selector' : function($el) {
                //if($el.is('input') && $el.attr('type') != 'checkbox') return true;
                if($el.is('div.control-group')) return true;
                return false;
            },
            parent_selector: 'form,fieldset,div',
            'code' : function(env) {
                var n = 1;
                var $body = $(env.body);
                while($body.find('#formInput' + n).length > 0) {
                    n++;
                }
                var id = 'formInput' + n;
                return '<div class="control-group">\
        <label class="control-label" for="' + id + '">Field label</label>\
<input type="text" class="form-control" id="' + id + '" placeholder="Placeholder text">\
</div>'
            },
            'name' : 'Input group',
            action_menu: {
                add: ['form-static', 'form-input', 'textarea', 'form-checkbox','form-radio', 'label',  'form-help', 'form-select'],
                on_add : function($el, $new, newdef) {
                    //var values = $.fn.crsa('getValuesForElement', $el);
                    $el.append($new);
                    //restructureForm($el, values);
                }
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
                        }
                    }
                }
            })
        }
        f.addComponentType(form_group);



        var form_ta_group = {
            'type' : 'form-textarea-group',
            'selector' : null,
            parent_selector: 'form,fieldset,div',
            'code' : function(env) {
                var n = 1;
                var $body = $(env.body);
                while($body.find('#formInput' + n).length > 0) {
                    n++;
                }
                var id = 'formInput' + n;
                return '<div class="control-group">\
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

        var control_sizing = {
            'type' : 'select',
            'name' : 'Size',
            'action' : 'apply_class',
            'show_empty' : true,
            'options' : [
                {key: 'input-mini', name: 'Mini'},
                {key: 'input-small', name: 'Small'},
                {key: 'input-medium', name: 'Medium'},
                {key: 'input-large', name: 'Large'},
                {key: 'input-xlarge', name: 'X Large'},
                {key: 'input-xxlarge', name: 'MXX large'}
            ]
        };


        var form_input = {
            'type' : 'form-input',
            'selector' : function($el) {
                if($el.is('input') && $el.attr('type') != 'checkbox') return true;
                //if($el.is('div.control-group')) return true;
                return false;
            },
            'code' : '<input type="text" class="form-control" placeholder="Placeholder text">',
            'name' : 'Input',
            'sections' : crsaAddStandardSections({
                'data' : {
                    name : 'Data',
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
                                var $input = $el;
                                return $input.attr('type');
                                return val;
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                var $el = obj.data;
                                var $input = $el;
                                $input.attr('type', value);
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
                        'block-level' : {
                            type: 'checkbox',
                            action: 'apply_class',
                            name: 'Block level',
                            value: 'input-block-level'
                        },
                        disabled: disabled
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
            parent_selector: 'form,fieldset,div',
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
                                var $input = $el.find('>label');
                                if(value) {
                                    $input.addClass('checkbox-inline');
                                    $el.removeClass('checkbox');
                                } else {
                                    $input.removeClass('checkbox-inline');
                                    $el.addClass('checkbox');
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
                                $input.attr('disabled', value);
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
            parent_selector: 'form,fieldset,div',
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
                                $input.attr('name', value);
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
                                if(value) {
                                    $input.addClass('radio-inline');
                                    $el.removeClass('radio');
                                } else {
                                    $input.removeClass('radio-inline');
                                    $el.addClass('radio');
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
                                $input.attr('disabled', value);
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
            parent_selector: 'form,fieldset,div',
            'code' : function(env) {
                var n = 1;
                var $body = $(env.body);
                while($body.find('#formInput' + n).length > 0) {
                    n++;
                }
                var id = 'formInput' + n;
                return '<div class="control-group">\
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
            parent_selector: 'form,fieldset,div',
            'code' : '<div class="control-group">\
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
            'code' : '<label class="control-label" for="exampleInputEmail1">Email address</label>',
            'name' : 'Form label',
            'sections' : crsaAddStandardSections({
                'style' : {
                    name : 'Style',
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
                add: ['control-group', 'form-textarea-group', 'form-select-group', 'form-checkbox-group', 'form-radio-group', 'form-static-group']
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
            'selector' : 'span.help-inline',
            'code' : '<span class="help-inline">A block of help text.</span>',
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
            'name' : 'Input group',
            action_menu : {
                'add' : ['input-group-span', 'form-checkbox-naked', 'form-radio-naked', 'bs-button', 'button-dropdown'],
                'on_add' : function($el, $new, newdef) {
                    var spanCls = 'input-group-addon';
                    if(['form-checkbox-naked', 'form-radio-naked'].indexOf(newdef.type) >= 0) {
                        $new = $('<span/>').append($new);
                    } else if(['button-dropdown'].indexOf(newdef.type) >= 0) {
                        $new.addClass('input-group-btn').removeClass('btn-group');
                    }
                    if($new.is('span')) {
                        $new.addClass(spanCls);
                    }
                    $el.prepend($new);
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
                    name : 'Button',
                    fields : {
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
                                var attrs = { };

                                $.each($el[0].attributes, function(idx, attr) {
                                    attrs[attr.nodeName] = attr.nodeValue;
                                });

                                var tag = value;
                                $el.replaceWith(function () {
                                    var $n = $("<" + tag + "/>", attrs).append($el.contents());
                                    obj.data = $n;
                                    return $n;
                                });
                                $.fn.crsa('setNeedsUpdate', false, $el);
                                return value;
                            }
                        },
                        'href' : {name : 'Href (if a)', type : 'text', action: 'element_attribute', attribute: 'href'},
                        'target' : {name : 'Target (if a)', type : 'text', action: 'element_attribute', attribute: 'target'},
                        type : {
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
                                if($el.is('button')) {
                                    $el.attr('disabled', value);
                                } else {
                                    if(value) {
                                        $el.addClass('disabled');
                                    } else {
                                        $el.removeClass('disabled');
                                    }
                                }
                                return value;
                            }
                        }/*,
                         dropdown_toggle: {
                         type: 'checkbox',
                         name: 'Is dropdown toggle',
                         action: 'custom',
                         value: '1',
                         get_value: function(obj) {
                         var $el = obj.data;
                         return $el.hasClass('dropdown-toggle');
                         },
                         set_value: function(obj, value, values, oldValue, eventType) {
                         var $el = obj.data;
                         if(value) {
                         $el.addClass('dropdown-toggle');
                         $el.attr('data-toggle', 'dropdown');
                         } else {
                         $el.removeClass('dropdown-toggle');
                         $el.attr('data-toggle', '');
                         }
                         return value;
                         }
                         }*/
                    }
                }
            })
        };

        f.addComponentType(button);


        var button_dropdown = {
            'type' : 'button-dropdown',
            'selector' : function($el) {
                if($el.is('.btn-group') && $el.find('> .btn').length > 0) return true;
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
                'on_add' : function($el, $new, newdef) {
                    var $ul = $el.find('> ul.dropdown-menu');
                    if($ul.length == 0) $ul = $('<ul class="dropdown-menu" role="menu"></ul>').appendTo($el);
                    $ul.append($new);
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
                return $el.is('li') && $el.parent().is('ul.dropdown-menu');
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
                                var $a = $el.find('>a');
                                var need_a = value != 'dropdown-header' && value != 'divider';
                                var text = $a.length == 0 ? $el.html() : $a.html();
                                if(need_a) {
                                    if(!text) text = 'Action';
                                    if($a.length == 0) {
                                        $a = $('<a role="menuitem" tabindex="-1" href="#">Action</a>').appendTo($el);
                                    }
                                    $a.html(text);
                                } else {
                                    $a.remove();
                                    $el.html(text);
                                }
                                $.each(dropdown_classes, function(i,c) {
                                    if($el.hasClass(c.key)) {
                                        $el.removeClass(c.key);
                                    }
                                });
                                $el.addClass(value);
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
                        }
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
                            }
                        }
                    }
                })
            }
            f.addComponentType(list_item);





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
                    'add' : ['nav-list-item', 'navbar-dropdown'],
                    'on_add' : function($el, $new, newdef) {
                        if(!$new.is('li')) {
                            $new = $('<li/>').append($new).addClass('dropdown');
                        }
                        $el.append($new);
                    }
                },
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
                            }
                        }
                    }
                })
            }
            f.addComponentType(tag);

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
                    'add' : ['nav-list-item', 'nav-list-item-current'],
                    'on_add' : function($el, $new, newdef) {
                        $el.append($new);
                    }
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
                    'on_add' : function($el, $new, newdef) {
                        if(newdef.type == 'pagination-previous') {
                            $el.prepend($new);
                        } else if(newdef.type == 'pagination-next') {
                            $el.append($new);
                        } else {
                            var max = 0;
                            var list = $el.find('>li').each(function(i,li) {
                                var val = parseInt($(li).text());
                                if(val && val > max) max = val;
                            });
                            max++;
                            $new.html($new.html().replace('_NUM_', max));

                            if(list.length > 0) {
                                var last = $(list.get(list.length-1));
                                //console.log(last.text());
                                var t = last.text();
                                if(t.match(/(&raquo;|»)/i)) {
                                    $new.insertBefore(last);
                                } else {
                                    $el.append($new);
                                }
                            } else {
                                $el.append($new);
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
                    'add' : ['pager-item', 'pager-prev', 'pager-next'],
                    'on_add' : function($el, $new, newdef) {
                        $el.append($new);
                    }
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
                'code' : '<div class="navbar">\
                    <div class="navbar-inner">\
                <div class="container">\
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-responsive-collapse">\
                        <span class="icon-bar"></span>\
                        <span class="icon-bar"></span>\
                        <span class="icon-bar"></span>\
                    </a>\
                    <a class="brand" href="#">Title</a>\
                    <div class="nav-collapse collapse navbar-responsive-collapse">\
                        <ul class="nav">\
                            <li class="active"><a href="#">Home</a></li>\
                            <li><a href="#">Link</a></li>\
                            <li><a href="#">Link</a></li>\
                            <li class="dropdown">\
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>\
                                <ul class="dropdown-menu">\
                                    <li><a href="#">Action</a></li>\
                                    <li><a href="#">Another action</a></li>\
                                    <li><a href="#">Something else here</a></li>\
                                    <li class="divider"></li>\
                                    <li class="nav-header">Nav header</li>\
                                    <li><a href="#">Separated link</a></li>\
                                    <li><a href="#">One more separated link</a></li>\
                                </ul>\
                            </li>\
                        </ul>\
                        <form class="navbar-search pull-left" action="">\
                            <input type="text" class="search-query span2" placeholder="Search">\
                            </form>\
                            <ul class="nav pull-right">\
                                <li><a href="#">Link</a></li>\
                                <li class="divider-vertical"></li>\
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
                        </div><!-- /.nav-collapse -->\
                    </div>\
                </div><!-- /navbar-inner -->\
            </div>',
                'name' : 'Navigation bar',
                tags: 'major',
                'action_menu' : {
                    'add' : ['link', 'navbar-brand', 'navbar-form', 'navbar-list', 'navbar-dropdown'],
                    'on_add' : function($el, $new, newdef) {

                        if(['link', 'navbar-dropdown'].indexOf(newdef.type) >= 0) {
                            var $div = findDiv($el, '.navbar-collapse');
                            var $ul = findUl($div);
                            var $li = $('<li/>').appendTo($ul);
                            $li.append($new);

                        } else if(['navbar-brand'].indexOf(newdef.type) >= 0) {
                            var $div = findDiv($el, '.navbar-header');
                            $div.append($new);
                        } else if(['navbar-form' ,'navbar-list'].indexOf(newdef.type) >= 0) {
                            var $div = findDiv($el, '.navbar-collapse');
                            $div.append($new);
                        }
                    }
                },
                'sections' : crsaAddStandardSections({
                    navbar : {
                        name : 'Navbar style',
                        fields : {

                            type : {
                                name : 'Type',
                                'type': 'select' ,
                                show_empty: true,
                                action: "apply_class",
                                options: [
                                    {key: "navbar-fixed-top", name: "Fixed - top", tip: "Add padding-top to body to prevent navbar overlapping the content."},
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
        <div class="control-group">\
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
                'name' : 'Section',
                'action_menu' : {
                    'add' : ['link', 'navbar-dropdown'],
                    'on_add' : function($el, $new, newdef) {
                        var $li = $('<li/>').appendTo($el);
                        $li.append($new);
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
                            }
                        }
                    }
                })
            }
            f.addComponentType(section);



            var dropdown = {
                'type' : 'navbar-dropdown',
                'selector' : null,
                'code' : '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>\
                        <ul class="dropdown-menu">\
                            <li><a href="#">Action</a></li>\
                            <li><a href="#">Another action</a></li>\
                            <li class="divider"></li>\
                            <li><a href="#">Separated link</a></li>\
                        </ul>',
                'name' : 'Dropdown',
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
                                var attrs = { };

                                $.each($el[0].attributes, function(idx, attr) {
                                    attrs[attr.nodeName] = attr.nodeValue;
                                });

                                var tag = value == "1" ? 'ol' : 'ul';
                                $el.replaceWith(function () {
                                    var $n = $("<" + tag + "/>", attrs).append($el.contents());
                                    obj.data = $n;
                                    return $n;
                                });
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
                'selector' : 'div.hero-unit',
                'code' : '<div class="hero-unit">\
            <h1>Hello, world!</h1>\
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>\
            <p><a class="btn btn-primary btn-large" role="button">Learn more</a></p>\
        </div>',
                'name' : 'Hero unit',
                'action_menu' : {
                    'add' : ['jumbotron-h1', 'jumbotron-p', 'jumbotron-b'],
                    'on_add' : function($el, $new, newdef) {
                        var $c = $el.find('.container');
                        if($c.length > 0) {
                            $el = $($c.get(0));
                        }
                        if(newdef.type == 'jumbotron-b') {
                            var $bs = $el.find('.btn').last();
                            if($bs.length > 0) {
                                $new.insertAfter($bs);
                                $new.before('&nbsp;');
                            } else {
                                $new = $('<p/>').append($new);
                                $el.append($new);
                            }
                        } else {
                            $el.append($new);
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
                                    var $c = $el.closest('.container');
                                    return $c.length == 0 ? '1' : null;
                                },
                                set_value: function(obj, value, values) {
                                    crsaWillChangeDom();
                                    var $el = obj.data;

                                    var putOutOfContainer = function() {
                                        var list = $el.parents('.container');
                                        if(list.length == 0) return;
                                        var top = $(list.get(0));
                                        $el.detach();
                                        $el.insertBefore(top);
                                    }

                                    var putContentInContainer = function() {
                                        var $c = $el.find('> .container');
                                        if($c.length == 0) {
                                            $c = $('<div/>', {class: 'container'});
                                        }
                                        $c.append($el.contents());
                                        $c.appendTo($el);
                                    }

                                    var putContentOutOfContainer = function() {
                                        var $c = $el.find('> .container');
                                        if($c.length == 0) return;
                                        $c.detach();
                                        $el.prepend($c.contents());
                                        $c.remove();
                                    }

                                    var putInContainer = function() {
                                        var list = $el.parents('.container');
                                        if(list.length > 0) return;

                                        var $body = $el.closest('body');
                                        $el.detach();
                                        var $clist = $body.find('.container');
                                        var $c = null;
                                        $clist.each(function(i, ctr) {
                                            if($(ctr).closest('.navbar').length == 0) {
                                                $c = $(ctr);
                                                return false;
                                            }
                                        });
                                        $c = $c.length > 0 ? $($c.get(0)) : $('<div/>', {class: 'container'}).prependTo($body);
                                        $c.prepend($el);
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
                parent_selector: '.hero-unit',
                'code' : '<p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>',
                'name' : 'Text',
                'sections' : crsaAddStandardSections({
                })
            });
            f.addComponentType({
                'type' : 'jumbotron-h1',
                'selector' : null,
                parent_selector: '.hero-unit',
                'code' : '<h1>Hello, world!</h1>',
                'name' : 'Title',
                'sections' : crsaAddStandardSections({
                })
            });
            f.addComponentType({
                'type' : 'jumbotron-b',
                'selector' : null,
                parent_selector: '.hero-unit,.hero-unit p',
                'code' : '<a class="btn btn-primary btn-large" role="button">Learn more</a>',
                'name' : 'Button',
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
                                    var $b = $el.find('button.close');
                                    if(value) {
                                        if($b.length == 0) {
                                            $b = $('<button/>', {type: "button", class: "close", 'data-dismiss': "alert", 'aria-hidden': "true"}).html('&times;').prependTo($el);
                                        }
                                    } else {
                                        $b.remove();
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
                'code' : '<div class="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">\
        <span class="sr-only">30% Complete</span>\
        </div>\
    </div>',
                'preview' : '<div class="progress">\
            <div class="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">\
        <span class="sr-only">30% Complete</span>\
        </div>\
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


        })();


        //media
        (function() {

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

            f.addComponentType({
                'type' : 'media-list',
                'selector' : 'ul.media-list',
                'code' : '<ul class="media-list"></ul>',
                'name' : 'Media list',
                preview: 'none',
                'action_menu' : {
                    'add' : ['media-list-item']
                },
                'sections' : crsaAddStandardSections({
                })
            });

            f.addComponentType({
                'type' : 'media-list-item',
                'priority' : 100,
                'selector' : 'div.media',
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
                                    var dmain = value == '1' ? 'div' : 'ul';
                                    var ditem = value == '1' ? 'a' : 'li';
                                    var $newel;
                                    if(!$el.is(dmain)) {
                                        var items = $el.children().detach();
                                        $newel = replaceTag($el, dmain);
                                        obj.data = $newel;
                                    } else {
                                        $newel = $el;
                                    }

                                    var newels = [];
                                    items.each(function(i, item) {
                                        var $item = $(item);
                                        if($item.is(ditem)) {
                                            newels.push($item);
                                        } else {
                                            var $new = replaceTag($item, ditem);
                                            if(ditem == 'a') $new.attr('href', '#')
                                            newels.push($new);
                                        }
                                    });
                                    for(var n = 0; n < newels.length; n++) {
                                        newels[n].appendTo($newel);
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
            'code' : '<div class="panel panel-default">\
        <div class="panel-body">Basic panel example</div>\
    </div>',
            'name' : 'Panel',
            action_menu: {
                add: ['panel-heading', 'panel-footer', 'table', 'list-group'],
                on_add : function($el, $new, newdef) {
                    if(newdef.type == 'panel-heading') {
                        $el.prepend($new);
                    } else if(newdef.type == 'panel-footer') {
                        $el.append($new);
                    } else if(newdef.type == 'table' || newdef.type == 'list-group') {

                        var $b = $el.find('>.panel-body');
                        if($b.length == 0) {

                            $el.append($new);
                        } else {
                            $new.insertAfter($b.last());
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
                                var t = $el.text();
                                if(value) {
                                    var $h = $('<' + value + '/>').html(t);
                                    $el.html('').append($h);
                                } else {
                                    $el.html(t);
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
                }
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


        tag = {
            'type' : 'tag',
            'selector' : function($el) { return true },
            'name' : 'Div',
            'display_name' : 'tag',
            'priority' : 2001,
            'sections' : crsaAddStandardSections({})
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
        section.setComponentTypes(getTypes(['bs-container','bs-row','bs-column', 'thumbnail-content', 'bs-clear']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bsbuttons', 'Buttons');
        section.setComponentTypes( getTypes(['bs-button' ,'img', 'button-close', 'caret', 'button-toolbar', 'button-group', 'button-dropdown','button-dropdown-item']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bstypo', 'Text &amp; Images');
        section.setComponentTypes( getTypes(['h1','h2','h3','h4','h5','h6','small', 'page-header', 'p', 'link', 'anchor', 'abbr','address','blockquote', 'glyphicon','img','hr']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bsui', 'UI elements');
        section.setComponentTypes( getTypes(['span-label', 'badge', 'alert', 'progress', 'progress-bar', 'media', 'media-list', 'media-list-item', 'list-group', 'list-group-item', 'panel', 'panel-heading', 'panel-footer', 'well']));
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
        section.setComponentTypes( getTypes(['form', 'control-group', 'form-textarea-group', 'form-select-group', 'form-select', 'form-option', 'form-checkbox-group', 'form-radio-group', 'form-static-group', 'form-static', 'form-input', 'textarea', 'form-checkbox','form-radio', 'label', 'form-fieldset', 'form-help', 'form-input-group']));
        f.addLibSection(section);

        section = new PgFrameworkLibSection('bsnavbar', 'Navigation');
        section.setComponentTypes( getTypes(['navbar','tabs', 'breadcrumb', 'pagination', 'pager', 'jumbotron']));
        f.addLibSection(section);

    });
});