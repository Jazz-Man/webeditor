$(function() {

    //Wait for Pinegrow to wake-up
    $('body').one('pinegrow-ready', function(e, pinegrow) {

        //Create new Pinegrow framework object
        var f = new PgFramework('angular', 'AngularJS');

        //This will prevent activating multiple versions of 960 grid framework, provided that other versions set the same type
        f.type = "angular";
        f.allow_single_type = true;

        //Don't show these files in CSS tab
        f.ignore_css_files = [];

        //Auto detect 960 grid. It can also be manually added / removed from a page with Framework Manager
        f.detect = function(pgPage) {
            return pgPage.hasScript(/(^|\/)angular.*\.js/i);
        }

        //Tell Pinegrow about the framework
        pinegrow.addFramework(f);

        //Add properties common to all components of this framework
        //Properties are arranged in sections

        f.common_sections = {

            //A section
            angular_common : { //Can be anything, good to prefix/suffix
                name : "Angular directives ng*", //Section name
                fields : { //Properties
                    ngApp : { //Can be anything, good to prefix/suffix
                        type : 'text', //This is a checkbox
                        name : 'App', //Name
                        action : "element_attribute", //Apply value to element attribute
                        attribute: 'ng-app'
                    },
                    ngBind : {
                        type : 'text',
                        name : 'Bind',
                        action : "element_attribute",
                        attribute: 'ng-bind'
                    },
                    ngBindHtml : {
                        type : 'text',
                        name : 'BindHtml',
                        action : "element_attribute",
                        attribute: 'ng-bind-html'
                    },
                    ngBindTemplate : {
                        type : 'text',
                        name : 'BindTemplate',
                        action : "element_attribute",
                        attribute: 'ng-bind-template'
                    },
                    ngClass : {
                        type : 'text',
                        name : 'Class',
                        action : "element_attribute",
                        attribute: 'ng-class'
                    },
                    ngClassEven: {
                        type : 'text',
                        name : 'ClassEven',
                        action : "element_attribute",
                        attribute: 'ng-class-even'
                    },
                    ngClassOdd : {
                        type : 'text',
                        name : 'ClassOdd',
                        action : "element_attribute",
                        attribute: 'ng-class-odd'
                    },
                    ngCloak : {
                        type : 'checkbox',
                        name : 'Cloak',
                        action : "element_attribute",
                        attribute: 'ng-cloak',
                        value: '1',
                        empty_attribute: true
                    },
                    ngController : {
                        type : 'text',
                        name : 'Controller',
                        action : "element_attribute",
                        attribute: 'ng-controller'
                    },
                    ngForm : {
                        type : 'text',
                        name : 'Form',
                        action : "element_attribute",
                        attribute: 'ng-form'
                    },
                    ngHide : {
                        type : 'text',
                        name : 'Hide',
                        action : "element_attribute",
                        attribute: 'ng-hide'
                    },
                    ngIf : {
                        type : 'text',
                        name : 'If',
                        action : "element_attribute",
                        attribute: 'ng-if'
                    },
                    ngInclude : {
                        type : 'text',
                        name : 'Include',
                        action : "element_attribute",
                        attribute: 'ng-include'
                    },
                    ngInit : {
                        type : 'text',
                        name : 'Init',
                        action : "element_attribute",
                        attribute: 'ng-init'
                    },
                    ngNonBindable : {
                        type : 'checkbox',
                        name : 'NonBindable',
                        action : "element_attribute",
                        attribute: 'ng-non-bindable',
                        value: '1',
                        empty_attribute: true
                    },
                    ngPluralize : {
                        type : 'checkbox',
                        name : 'Pluralize',
                        action : "element_attribute",
                        attribute: 'ng-pluralize',
                        value: '1',
                        empty_attribute: true
                    },
                    ngPlurCount : {
                        type : 'text',
                        name : 'Plur. count',
                        action : "element_attribute",
                        attribute: 'count'
                    },
                    ngPlurWhen : {
                        type : 'text',
                        name : 'Plur. when',
                        action : "element_attribute",
                        attribute: 'when'
                    },
                    ngPlurOffset : {
                        type : 'text',
                        name : 'Plur. offset',
                        action : "element_attribute",
                        attribute: 'offset'
                    },
                    ngReadOnly : {
                        type : 'text',
                        name : 'Readonly',
                        action : "element_attribute",
                        attribute: 'ng-readonly'
                    },
                    ngRepeat : {
                        type : 'text',
                        name : 'Repeat',
                        action : "element_attribute",
                        attribute: 'ng-repeat'
                    },
                    ngRepeatStart : {
                        type : 'text',
                        name : 'RepeatStart',
                        action : "element_attribute",
                        attribute: 'ng-repeat-start'
                    },
                    ngRepeatEnd : {
                        type : 'checkbox',
                        name : 'RepeatEnd',
                        action : "element_attribute",
                        attribute: 'ng-repeat-end',
                        value: '1',
                        empty_attribute: true
                    },
                    ngShow : {
                        type : 'text',
                        name : 'Show',
                        action : "element_attribute",
                        attribute: 'ng-show'
                    },
                    ngStyle : {
                        type : 'text',
                        name : 'Style',
                        action : "element_attribute",
                        attribute: 'ng-style'
                    },
                    ngSwitch : {
                        type : 'text',
                        name : 'Switch',
                        action : "element_attribute",
                        attribute: 'ng-switch'
                    },
                    ngSwitchWhen : {
                        type : 'text',
                        name : 'SwitchWhen',
                        action : "element_attribute",
                        attribute: 'ng-switch-when'
                    },
                    ngSwitchDefault : {
                        type : 'text',
                        name : 'SwitchDef',
                        action : "element_attribute",
                        attribute: 'ng-switch-default'
                    },
                    ngTransclude : {
                        type : 'checkbox',
                        name : 'Transclude',
                        action : "element_attribute",
                        attribute: 'ng-transclude',
                        value: '1',
                        empty_attribute: true
                    }
                }
            },
            angular_common_events : { //Can be anything, good to prefix/suffix
                name : "Angular events ng*", //Section name
                fields : {
                    ngBlur : {
                        type : 'text',
                        name : 'Blur',
                        action : "element_attribute",
                        attribute: 'ng-blur'
                    },
                    ngChange : {
                        type : 'text',
                        name : 'Change',
                        action : "element_attribute",
                        attribute: 'ng-change'
                    },
                    ngClick : {
                        type : 'text',
                        name : 'Click',
                        action : "element_attribute",
                        attribute: 'ng-click'
                    },
                    ngCopy : {
                        type : 'text',
                        name : 'Copy',
                        action : "element_attribute",
                        attribute: 'ng-copy'
                    },
                    ngCut : {
                        type : 'text',
                        name : 'Cut',
                        action : "element_attribute",
                        attribute: 'ng-cut'
                    },
                    ngDblclick : {
                        type : 'text',
                        name : 'Dblclick',
                        action : "element_attribute",
                        attribute: 'ng-dblclick'
                    },
                    ngFocus : {
                        type : 'text',
                        name : 'Focus',
                        action : "element_attribute",
                        attribute: 'ng-focus'
                    },
                    ngKeydown : {
                        type : 'text',
                        name : 'Keydown',
                        action : "element_attribute",
                        attribute: 'ng-keydown'
                    },
                    ngKeypress : {
                        type : 'text',
                        name : 'Keypress',
                        action : "element_attribute",
                        attribute: 'ng-keypress'
                    },
                    ngKeyup : {
                        type : 'text',
                        name : 'Keyup',
                        action : "element_attribute",
                        attribute: 'ng-keyup'
                    },
                    ngMouseDown : {
                        type : 'text',
                        name : 'Mousedown',
                        action : "element_attribute",
                        attribute: 'ng-mousedown'
                    },
                    ngMouseEnter : {
                        type : 'text',
                        name : 'Mouseenter',
                        action : "element_attribute",
                        attribute: 'ng-mouseenter'
                    },
                    ngMouseLeave : {
                        type : 'text',
                        name : 'Mouseleave',
                        action : "element_attribute",
                        attribute: 'ng-mouseleave'
                    },
                    ngMouseMove : {
                        type : 'text',
                        name : 'Mousemove',
                        action : "element_attribute",
                        attribute: 'ng-mousemove'
                    },
                    ngMouseOver : {
                        type : 'text',
                        name : 'Mouseover',
                        action : "element_attribute",
                        attribute: 'ng-mouseover'
                    },
                    ngMouseUp : {
                        type : 'text',
                        name : 'Mouseup',
                        action : "element_attribute",
                        attribute: 'ng-mouseup'
                    },
                    ngPaste : {
                        type : 'text',
                        name : 'Paste',
                        action : "element_attribute",
                        attribute: 'ng-paste'
                    },
                    ngSubmit : {
                        type : 'text',
                        name : 'Submit',
                        action : "element_attribute",
                        attribute: 'ng-submit'
                    }
                }
            }

        }



        //Lets add components
        //Pinegrow will try to match DOM elements to these components
        //Use type identifiers that will not clash with other framework. angular- prefix is an ok solution.

        //Input
        //==================
        var input = new PgComponentType('angular-input', 'Input');

        //How can we identify DOM elements that are containers?
        input.selector = "input,textarea";

        //Html code for container, that will be inserted into the page
        input.code = '<input type="text" name="userName" ng-model="" />';

        //Set empty_placeholder to true so that empty container gets min-height set. Otherwise empty container would be invisible. This lets us see it and use it as drop target. Placeholder style gets removed as soon as we add something to this element.
        input.empty_placeholder = false;

        //Highlight element in the tree to show it is important and has special features
        input.tags = 'major';

        //Here comes the interesting part: defining property sections and fields, shown in PROP tab when the element is selected
        input.sections = {
            angular_input : { //can be anything, best to prefix/suffix because definitions from multiple frameworks can be combined
                name : 'Angular input options ng*',
                fields : { //Fields
                    ngModel: {
                        type : 'text',
                        name : 'Model',
                        action : "element_attribute",
                        attribute: 'ng-model'
                    },
                    ngRequired: {
                        type : 'text',
                        name : 'Required',
                        action : "element_attribute",
                        attribute: 'ng-required'
                    },
                    ngMinLength: {
                        type : 'text',
                        name : 'MinLength',
                        action : "element_attribute",
                        attribute: 'ng-minlength'
                    },
                    ngMaxLength: {
                        type : 'text',
                        name : 'MaxLength',
                        action : "element_attribute",
                        attribute: 'ng-maxlength'
                    },
                    ngPattern: {
                        type : 'text',
                        name : 'Pattern',
                        action : "element_attribute",
                        attribute: 'ng-pattern'
                    },
                    ngTrim: {
                        type : 'text',
                        name : 'Trim',
                        action : "element_attribute",
                        attribute: 'ng-trim'
                    },
                    ngTrueValue: {
                        type : 'text',
                        name : 'TrueValue',
                        action : "element_attribute",
                        attribute: 'ng-true-value'
                    },
                    ngFalseValue: {
                        type : 'text',
                        name : 'FalseValue',
                        action : "element_attribute",
                        attribute: 'ng-false-value'
                    },
                    ngValue: {
                        type : 'text',
                        name : 'Value',
                        action : "element_attribute",
                        attribute: 'ng-value'
                    },
                    ngChecked: {
                        type : 'text',
                        name : 'Checked',
                        action : "element_attribute",
                        attribute: 'ng-checked'
                    },
                    ngDisabled: {
                        type : 'text',
                        name : 'Disabled',
                        action : "element_attribute",
                        attribute: 'ng-disabled'
                    },
                    ngList: {
                        type : 'text',
                        name : 'List',
                        action : "element_attribute",
                        attribute: 'ng-list'
                    },
                    ngReadOnly : {
                        type : 'text',
                        name : 'Readonly',
                        action : "element_attribute",
                        attribute: 'ng-readonly'
                    },
                    ngOptions : {
                        type : 'text',
                        name : 'Options',
                        action : "element_attribute",
                        attribute: 'ng-options'
                    }
                }
            }
        }
        //Add it to our framework
        f.addComponentType(input);
        //===============
        //End of Input

        //Link - a
        //==================
        var link = new PgComponentType('angular-a', 'Link');

        //How can we identify DOM elements that are containers?
        link.selector = "a";

        //Html code for container, that will be inserted into the page
        link.code = '<a ng-href="http://www.gravatar.com/avatar/{{hash}}">link1</a>';

        //Set empty_placeholder to true so that empty container gets min-height set. Otherwise empty container would be invisible. This lets us see it and use it as drop target. Placeholder style gets removed as soon as we add something to this element.
        link.empty_placeholder = false;

        //Highlight element in the tree to show it is important and has special features
        link.tags = 'major';

        //Here comes the interesting part: defining property sections and fields, shown in PROP tab when the element is selected
        link.sections = {
            angular_input : { //can be anything, best to prefix/suffix because definitions from multiple frameworks can be combined
                name : 'Angular link options ng*',
                fields : { //Fields
                    ngHref: {
                        type : 'text',
                        name : 'Href',
                        action : "element_attribute",
                        attribute: 'ng-href'
                    }
                }
            }
        }
        //Add it to our framework
        f.addComponentType(link);
        //===============
        //End of Input

        //Details
        //==================
        var details = new PgComponentType('angular-details', 'Details');

        details.selector = "details";
        details.code = '<details id="details" ng-open="open">\
                <summary>Show/Hide me</summary>\
            </details>';
        details.tags = 'major';
        details.sections = {
            angular_input : { //can be anything, best to prefix/suffix because definitions from multiple frameworks can be combined
                name : 'Angular details options ng*',
                fields : { //Fields
                    ngOpen: {
                        type : 'text',
                        name : 'Open',
                        action : "element_attribute",
                        attribute: 'ng-open'
                    }
                }
            }
        }
        f.addComponentType(details);

        //Option
        //==================
        var option = new PgComponentType('angular-option', 'Option');

        option.selector = "option";
        option.code = '<option>Hello!</option>';

        option.sections = {
            angular_input : { //can be anything, best to prefix/suffix because definitions from multiple frameworks can be combined
                name : 'Angular option options ng*',
                fields : { //Fields
                    ngSelected: {
                        type : 'text',
                        name : 'Selected',
                        action : "element_attribute",
                        attribute: 'ng-selected'
                    }
                }
            }
        }
        f.addComponentType(option);


        //Img
        //==================
        var image = new PgComponentType('angular-img', 'Image');

        image.selector = "img";
        image.code = '';

        image.sections = {
            angular_input : { //can be anything, best to prefix/suffix because definitions from multiple frameworks can be combined
                name : 'Angular image options ng*',
                fields : { //Fields
                    ngSrc: {
                        type : 'image',
                        name : 'Src',
                        action : "element_attribute",
                        attribute: 'ng-src'
                    },
                    ngSrcSet: {
                        type : 'image',
                        name : 'Src set',
                        action : "element_attribute",
                        attribute: 'ng-srcset'
                    }
                }
            }
        }
        f.addComponentType(image);



        //This will add common sections to all elements
        var tag = {
            'type' : 'tag',
            'selector' : function($el) { return true },
            'name' : 'Div',
            'display_name' : 'tag',
            'priority' : 2001
        }
        f.addComponentType(tag);

        //Now, lets define sections and elements shown in LIB tab
        //var section = new PgFrameworkLibSection('angular-components', 'Angular');
        //Pass components in array
        //section.setComponentTypes([input]);
        //f.addLibSection(section);


    });
});