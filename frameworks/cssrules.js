/**
 * Created by Matjaz on 2/3/14.
 */

$(function() {

    $('body').on('pinegrow-ready', function(e, pinegrow) {


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

        var setCssValueForShorthandable = function(rule, f, sf, v, base_on_equal) {

            var vv = v;// != null ? v : "inherit";
            var left = sf == 'left' ? vv : getCssValueForShorthandable(rule.values, f, 'left', base_on_equal);
            var right = sf == 'right' ? vv : getCssValueForShorthandable(rule.values, f, 'right', base_on_equal);
            var top = sf == 'top' ? vv : getCssValueForShorthandable(rule.values, f, 'top', base_on_equal);
            var bottom = sf == 'bottom' ? vv : getCssValueForShorthandable(rule.values, f, 'bottom', base_on_equal);

            var split_dec = left == null || right == null || top == null || bottom == null;
            if(base_on_equal && !split_dec) {
                split_dec = !(left == right && right == top && top == bottom);
            }
            if(split_dec) {

                rule.crsa_stylesheet.genRuleValueChanged( rule, f + '-left', left, null, true);
                rule.crsa_stylesheet.genRuleValueChanged( rule, f + '-right', right, null, true);
                rule.crsa_stylesheet.genRuleValueChanged( rule, f + '-top', top, null, true);
                rule.crsa_stylesheet.genRuleValueChanged( rule, f + '-bottom', bottom, null, true);
                rule.crsa_stylesheet.genRuleValueChanged( rule, f, null);

            } else {
                var nv;

                var imp = false;
                if(left.match(/!important/i)) {
                    left = $.trim(left.replace(/!important/i, ""));
                    imp = true;
                }
                if(right.match(/!important/i)) {
                    right = $.trim(right.replace(/!important/i, ""));
                    imp = true;
                }
                if(top.match(/!important/i)) {
                    top = $.trim(top.replace(/!important/i, ""));
                    imp = true;
                }
                if(bottom.match(/!important/i)) {
                    bottom = $.trim(bottom.replace(/!important/i, ""));
                    imp = true;
                }

                if(left == right && right == top && top == bottom) {
                    nv = left;
                } else if(left == right && top == bottom) {
                    nv = top + " " + left;
                } else if(left == right) {
                    nv = top + " " + left + " " + bottom;
                } else {
                    nv = top + " " + right + " " + bottom + " " + left;
                }

                if(imp) nv = nv + " !important";

                rule.crsa_stylesheet.genRuleValueChanged( rule, f + '-left', null, null, true);
                rule.crsa_stylesheet.genRuleValueChanged( rule, f + '-right', null, null, true);
                rule.crsa_stylesheet.genRuleValueChanged( rule, f + '-top', null, null, true);
                rule.crsa_stylesheet.genRuleValueChanged( rule, f + '-bottom', null, null, true);
                rule.crsa_stylesheet.genRuleValueChanged( rule, f, nv);
            }
            return v;
        }


        var addCssShorthandableDef = function(name, f, sf, base_on_equal) {
            return {
                'type' : 'slider',
                'name' : name,
                'action' : 'custom',
                get_value: function(obj) {
                    var rule = obj.data;
                    return getCssValueForShorthandable(rule.values, f, sf, base_on_equal);
                },
                set_value: function(obj, value, values, oldValue, eventType) {
                    return setCssValueForShorthandable(obj.data, f, sf, value, base_on_equal);
                }
            }
        }

        var getCssBackgroundValue = function(values, sf, url) {
            var getUrls = function(v) {
                var a = splitCssValue(v, true);
                var r = [];
                for(var i = 0; i < a.length; i++) {
                    if(a[i] == ',') continue;
                    r.push(getUrlFromCssUrlValue(a[i]));
                }
                return r.join(", ");
            }

            var f = 'background-' + sf;
            var v = null;
            if(values[f]) {
                v = values[f].value;
                if(url) {
                    v = getUrls(v);
                }
            }/* else if(values['background']) {
             var cp = new CssBackgroundParser(values['background'].value);
             v = cp.getValue(f);
             if(url) {
             v = getUrls(v);
             }
             }*/
            return v;
        }

        var setCssBackgroundValue = function(rule, sf, v) {
            if(sf == 'image' && v) {
                var a = v.split(",");
                v = '';
                for(var i = 0; i < a.length; i++) {
                    if(v.length > 0) v += ", ";
                    if(a[i].indexOf('@') >= 0) {
                        v += "url(" + a[i] + ")";
                    } else {
                        v += "url('" + a[i] + "')";
                    }
                }
            }

            var f = 'background-' + sf;
            if(rule.values[f]) {
                rule.crsa_stylesheet.genRuleValueChanged( rule, f, v);
            } else {
                if(false && rule.values['background']) {
                    var bckv = rule.values['background'].value;
                    var cp = new CssBackgroundParser(bckv);

                    var list = ['color', 'image', 'repeat', 'attachment', 'position'];
                    $.each(list, function(i, listsf) {
                        var val = listsf == sf ? v : cp.getValue('background-' + listsf);
                        rule.crsa_stylesheet.genRuleValueChanged( rule, 'background-' + listsf, val, null, true);
                    });
                    rule.crsa_stylesheet.genRuleValueChanged( rule, 'background', null);
                } else {
                    rule.crsa_stylesheet.genRuleValueChanged( rule, f, v);
                }
            }
        }

        var addCssBackgroundDef = function(name, f) {
            var type = 'text';
            switch(f) {
                case 'color':
                    type = 'color';
                    break;
                case 'repeat':
                    type = 'select';
                    break;
                case 'image':
                    type = 'image';
                    break;
                default:
                    type = 'text';
                    break;
            }
            var d = {
                'type' : type,
                'name' : name,
                'action' : 'custom',
                get_value: function(obj) {
                    var rule = obj.data;
                    return getCssBackgroundValue(rule.values, f, f == "image");
                },
                set_value: function(obj, value, values, oldValue, eventType) {
                    setCssBackgroundValue(obj.data, f, value);
                    return value;
                }
            };
            if(f == 'repeat') {
                d['show_empty'] = true;
                d['options'] = [
                    {key: 'repeat', name: 'Repeat'},
                    {key: 'no-repeat', name: 'No repeat'},
                    {key: 'repeat-x', name: 'Repeat X'},
                    {key: 'repeat-y', name: 'Repeat Y'}
                ];
            }
            return d;
        }

        var getCssUrlValue = function(values, f) {
            var getUrls = function(v) {
                var a = splitCssValue(v, true);
                var r = [];
                for(var i = 0; i < a.length; i++) {
                    if(a[i] == ',') continue;
                    r.push(getUrlFromCssUrlValue(a[i]));
                }
                return r.join(", ");
            }

            var v = null;
            if(values[f]) {
                v = values[f].value;
                v = getUrls(v);
            }
            return v;
        }

        var setCssUrlValue = function(rule, sf, v) {
            if(v) {
                var a = v.split(",");
                v = '';
                for(var i = 0; i < a.length; i++) {
                    if(v.length > 0) v += ", ";
                    if(a[i].indexOf('@') >= 0) {
                        v += "url(" + a[i] + ")";
                    } else {
                        v += "url('" + a[i] + "')";
                    }
                }
            }
            rule.crsa_stylesheet.genRuleValueChanged( rule, sf, v);
            return v;
        }

            var crsaBootstrapAddHtmlSections = function(addTo) {
            var s = {
                dimension : {
                    name : 'Dimension',
                    icons : true,
                    fields : {
                        width : { name : 'Width', 'type': 'slider' , min: 0, max: 2000, units: true },
                        'min-width' : { name : 'Min width', 'type': 'slider' , min: 0, max: 2000, units: true },
                        'max-width' : { name : 'Max width', 'type': 'slider' , min: 0, max: 2000, units: true },
                        height : { name : 'Height', 'type': 'slider' , min: 0, max: 2000, units: true },
                        'min-height' : { name : 'Min height', 'type': 'slider' , min: 0, max: 2000, units: true },
                        'max-height' : { name : 'Max height', 'type': 'slider' , min: 0, max: 2000, units: true },
                        'margin-left': addCssShorthandableDef("Margin left", "margin", "left"),
                        'margin-right': addCssShorthandableDef("Margin right", "margin", "right"),
                        'margin-top': addCssShorthandableDef("Margin top", "margin", "top"),
                        'margin-bottom': addCssShorthandableDef("Margin bottom", "margin", "bottom"),

                        'padding-left': addCssShorthandableDef("Padding left", "padding", "left"),
                        'padding-right': addCssShorthandableDef("Padding right", "padding", "right"),
                        'padding-top': addCssShorthandableDef("Padding top", "padding", "top"),
                        'padding-bottom': addCssShorthandableDef("Padding bottom", "padding", "bottom"),

                        left : { name : 'Left', 'type': 'slider'},
                        right : { name : 'Right', 'type': 'slider'},
                        top : { name : 'Top', 'type': 'slider'},
                        bottom : { name : 'Bottom', 'type': 'slider'},

                        'z-index' : { name : 'Z-Index', 'type': 'text'},
                        'border' : {name : 'Border', type : 'slider'},
                        'border-left': {name : 'Border left', type : 'slider'},//addCssShorthandableDef("Border left", "border", "left", true),
                        'border-right': {name : 'Border right', type : 'slider'},//addCssShorthandableDef("Border right", "border", "right", true),
                        'border-top': {name : 'Border top', type : 'slider'},//addCssShorthandableDef("Border top", "border", "top", true),
                        'border-bottom': {name : 'Border bottom', type : 'slider'},//addCssShorthandableDef("Border bottom", "border", "bottom", true),
                        'border-radius' : {name : 'Border radius', type : 'slider'},
                        'position' : {name : 'Position', type : 'select', show_empty: true, options:[
                            {key:'static', name:'Static'},
                            {key:'relative', name:'Relative'},
                            {key:'absolute', name:'Absolute'},
                            {key:'fixed', name:'Fixed'},
                            {key:'inherit', name:'Inherit'}
                        ]},
                        'display' : {name : 'Display', type : 'select', show_empty: true, options:[
                            {key:'none', name:'None'},
                            {key:'inline', name:'Inline'},
                            {key:'block', name:'Block'},
                            {key:'list-item', name:'List item'},
                            {key:'inline-block', name:'Inline block'},
                            {key:'inline-table', name:'Inline table'},
                            {key:'table', name:'Table'},
                            {key:'table-cell', name:'Table cell'},
                            {key:'table-column', name:'Table column'},
                            {key:'table-column-group', name:'Table column group'},
                            {key:'table-footer-group', name:'Table footer group'},
                            {key:'table-header-group', name:'Table header group'},
                            {key:'table-row', name:'Table row'},
                            {key:'table-row-group', name:'Table row group'},
                            {key:'flex', name:'Flex'},
                            {key:'inline-flex', name:'Inline flex'},
                            {key:'grid', name:'Grid'},
                            {key:'inline-grid', name:'Inline grid'},
                            {key:'run-in', name:'Run in'},
                            {key:'inherit', name:'Inherit'}
                        ]},
                        'overflow' : {name : 'overflow', type : 'select', show_empty: true, options:[
                            {key:'auto', name:'Auto'},
                            {key:'scroll', name:'Scroll'},
                            {key:'hidden', name:'Hidden'},
                            {key:'inherit', name:'Inherit'}
                        ]},
                        float : {name : 'Float', type : 'select', show_empty: true, options:[
                            {key:'left', name:'Left'},
                            {key:'right', name:'Right'},
                            {key:'none', name:'None'}
                        ]},
                        clear : {name : 'Clear', type : 'select', show_empty: true, options:[
                            {key:'left', name:'Left'},
                            {key:'right', name:'Right'},
                            {key:'both', name:'Both'}
                        ]},
                        'vertical-align' : {name : 'Vertical align', type : 'select', show_empty: true, options:[
                            {key:'baseline', name:'baseline'},
                            {key:'sub', name:'sub'},
                            {key:'super', name:'super'},
                            {key:'text-top', name:'text-top'},
                            {key:'text-bottom', name:'text-bottom'},
                            {key:'middle', name:'middle'},
                            {key:'top', name:'top'},
                            {key:'bottom', name:'bottom'},
                            {key:'inherit', name:'inherit'}
                        ]}
                    }
                },
                text : {
                    name : 'Font / Text',
                    icons : true,
                    fields : {
                        'color' : {name : 'Color', type : 'color'},
                        'font-family' : {name : 'Family', type : 'slider'},
                        'font-size' : {name : 'Size', type : 'slider'},
                        'line-height' : {name : 'Line height', type : 'slider'},
                        'font-weight' : {name : 'Weight', type : 'select', show_empty: true, options:[
                            {key:'normal', name:'Normal'},
                            {key:'bold', name:'Bold'},
                            {key:'lighter', name:'Lighter'},
                            {key:'bolder', name:'Bolder'},
                            {key:'100', name:'100'},
                            {key:'200', name:'200'},
                            {key:'300', name:'300'},
                            {key:'400', name:'400'},
                            {key:'500', name:'500'},
                            {key:'600', name:'600'},
                            {key:'700', name:'700'},
                            {key:'800', name:'800'},
                            {key:'900', name:'900'},
                            {key:'inherit', name:'Inherit'}
                        ]},
                        'font-style' : {name : 'Style', type : 'select', show_empty: true, options:[
                            {key:'normal', name:'Normal'},
                            {key:'italic', name:'Italic'},
                            {key:'oblique', name:'Oblique'},
                            {key:'inherit', name:'Inherit'}
                        ]},
                        'font-variant' : {name : 'Variant', type : 'select', show_empty: true, options:[
                            {key:'normal', name:'Normal'},
                            {key:'small-caps', name:'Small caps'},
                            {key:'inherit', name:'Inherit'}
                        ]},
                        'text-decoration' : {name : 'Decoration', type : 'select', show_empty: true, options:[
                            {key:'none', name:'None'},
                            {key:'underline', name:'Underline'},
                            {key:'overline', name:'Overline'},
                            {key:'line-through', name:'Line-through'},
                            {key:'blink', name:'blink'},
                            {key:'inherit', name:'Inherit'}
                        ]},
                        'text-transform' : {name : 'Transform', type : 'select', show_empty: true, options:[
                            {key:'none', name:'None'},
                            {key:'capitalize', name:'Capitalize'},
                            {key:'uppercase', name:'Uppercase'},
                            {key:'lowercase', name:'Lowercase'},
                            {key:'inherit', name:'Inherit'}
                        ]},
                        'text-align' : {name : 'Align', type : 'select', show_empty: true, options:[
                            {key:'left', name:'Left'},
                            {key:'center', name:'Center'},
                            {key:'right', name:'Right'},
                            {key:'justify', name:'Justify'},
                            {key:'inherit', name:'Inherit'}
                        ]},
                        'letter-spacing' : {name : 'Letter spacing', type : 'slider'}
                    }
                },
                background : {
                    name : 'Background',
                    icons : true,
                    fields : {
                        'background' : {name : 'Background', type : 'text'},
                        'background-color' : addCssBackgroundDef("Color", 'color'),
                        'background-image' : addCssBackgroundDef("Image", 'image'),
                        'background-repeat' : addCssBackgroundDef("Repeat", 'repeat'),
                        'background-position' : addCssBackgroundDef("Position", 'position'),
                        'background-attachment' : addCssBackgroundDef("Attachment", 'attachment'),
                        'background-size' : {name : 'Size', type : 'text'},
                        'background-origin' : {name : 'Origin', type : 'text'}
                    }
                },
                list : {
                    name : 'Lists',
                    icons : true,
                    fields : {
                        'list-style-type' : {name : 'List type', type : 'select', show_empty: true, options:[
                            {key:'disc', name:'disc'},
                            {key:'circle', name:'circle'},
                            {key:'square', name:'square'},
                            {key:'decimal', name:'decimal'},
                            {key:'decimal-leading-zero', name:'decimal-leading-zero'},
                            {key:'lower-roman', name:'lower-roman'},
                            {key:'upper-roman', name:'upper-roman'},
                            {key:'lower-greek', name:'lower-greek'},
                            {key:'lower-latin', name:'lower-latin'},
                            {key:'upper-latin', name:'upper-latin'},
                            {key:'armenian', name:'armenian'},
                            {key:'georgian', name:'georgian'},
                            {key:'lower-alpha', name:'lower-alpha'},
                            {key:'upper-alpha', name:'upper-alpha'},
                            {key:'none', name:'none'}
                        ]},
                        'list-style-position' : {name : 'List position', type : 'select', show_empty: true, options:[
                            {key:'inside', name:'inside'},
                            {key:'outside', name:'outside'},
                            {key:'inherit', name:'inherit'}
                        ]},
                        'list-style-image' : {
                            name : 'List image', type : 'image',
                            'action' : 'custom',
                            get_value: function(obj) {
                                var rule = obj.data;
                                return getCssUrlValue(rule.values, 'list-style-image');
                            },
                            set_value: function(obj, value, values, oldValue, eventType) {
                                return setCssUrlValue(obj.data, 'list-style-image', value);
                            }
                        }
                    }
                }
            };
            $.each(s, function(k,v) {
                addTo[k] = v;
            });
            return addTo;
        }


        //rules
        var rule = {
            'type' : 'rule',
            'selector' : 'img',
            'code' : '<img src=""/>',
            'name' : 'Image',
            'sections' : crsaBootstrapAddHtmlSections({
                name : {
                    name : 'CSS Rule',
                    fields : {
                        class_name : {
                            type : 'text',
                            name : 'Selector',
                            action : 'rule_name',
                            live_update : false
                        },
                        media_rule : {
                            type : 'media-query',
                            name : 'Media query',
                            action : 'rule_media',
                            live_update : true
                        }
                    }
                }
            })
        }
        $.fn.crsa.addRulesDefinition(rule);
    });
});
