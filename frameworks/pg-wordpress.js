$(function() {

    $('body').one('pinegrow-ready', function(e, pinegrow) {//Wait for Pinegrow to start-up

        var f = new PgFramework('wordpress.pinegrow', 'Wordpress Pinegrow');//Create new Pinegrow framework object
        pinegrow.addFramework(f);//Tell Pinegrow about your amazing framework


        //---------------- Start Functions --------------------

            var Html_filters = [];
            Html_filters._thePost = true;
            Html_filters.isThePostNeeded = function() {
                if(this._thePost == true) {
                    this._thePost = false;
                    return ['the_post();'];
                } else {
                    return [];
                }
            }//end isThePostNeeded
            Html_filters.getPhpParams = function(element,pgel) {
                params = [];
                if(element.hasOwnProperty('sections')) {
                    element = element.sections;
                    for (prop in element) {
                        if(element[prop].hasOwnProperty('fields')) {
                            for(field in element[prop]['fields']) {
                                var order = parseInt(element[prop]['fields'][field]['p_order']);
                                if(isNaN(order)) {
                                    var order = 0;
                                }
                                params.push([element[prop]['fields'][field]['attribute'],order]);
                            }//for
                        }//if
                    }//for
                    params.sort(function(a, b) {
                        if (a[1] === b[1]) {
                            return 0;
                        } else {
                            return (a[1] < b[1]) ? -1 : 1;
                        }
                    });//sort
                    var php = '';
                    params.forEach(function(elem) {
                        if(pgel.getAttr(elem[0]) == null) {
                            php += "null,";
                        } else if(pgel.getAttr(elem[0]) == "") {
                            php += "null,";
                        } else if((pgel.getAttr(elem[0]).toLowerCase() == 'false') || (pgel.getAttr(elem[0]).toLowerCase() == 'true')) {
                            php += pgel.getAttr(elem[0]) + ',';
                        } else {
                            php += "'" + pgel.getAttr(elem[0]).replace(/(['])/g, "\\$1") + "',";
                        }
                    });//forEach
                    return php.slice(0,-1);
                }
                return '';
            }//end getPhpParams
            Html_filters.writePhpCode = function (pgel,php) {
                    var code = '<?php\n';
                    php.forEach(function(element, index) {
                        code += element+"\n";
                    });//end foreach function
                    code += '?>';
                    var phpNode = pgCreateNodeFromHtml(code);
                    pgel.replaceWith(phpNode);
            };//replaceWith
            Html_filters.resetFilters = function() {
                this._thePost = true;
            }




            var transformHtmlDocToPhp = function(originalDocumentNode) {
                var outputDocument = originalDocumentNode.clone();//clone the DOM structure bacause we will change it.
                outputDocument.walk(function(pgel) {//lets walk through DOM structure
                    for (index = 0; index < Html_filters.length; index++) {
                        if(Html_filters[index](pgel) == false) {
                            break;
                        }
                    }//end for
                    return true; //continue down the tree
                });//end outputDocument.walk
                Html_filters.resetFilters();
                return outputDocument.toStringOriginal(true); //output formatted code
            }// end transformHtmlDocToPhp


        //---------------- End Functions --------------------



        //---------------- Start Components --------------------

            var wp_pg_comp_list = [];


            //the_title()
            var wp_the_title = new PgComponentType('wp_pg_the_title', 'WP the title');
            wp_the_title.selector = "wp-the-title";
            wp_the_title.code = '<wp-the-title>Vivamus ac dolor blandit</wp-the-title>';
            wp_the_title.sections = {
                parameters : {
                    name : 'Parameters',
                    fields : {
                        before : {
                            type : 'text',
                            name : 'Before',
                            action : "element_attribute",
                            attribute : 'before',
                            p_order: 1
                        },
                         after : {
                            type : 'text',
                            name : 'After',
                            action : "element_attribute",
                            attribute : 'after',
                            p_order: 2
                        }
                    }
                }
            }
            f.addComponentType(wp_the_title);
            wp_pg_comp_list.push(wp_the_title);
            Html_filters.push(function(pgel) {
                if(pgel.isSelector(wp_the_title.selector)) {
                    var php = this.isThePostNeeded();
                    php.push('the_title('+this.getPhpParams(wp_the_title,pgel)+');');
                    this.writePhpCode(pgel,php);
                    return false;//stop
                }
                return true;
            });



            //the_content()
            var wp_the_content = new PgComponentType('wp_pg_the_content', 'WP the content');
            wp_the_content.selector = "wp-the-content";
            wp_the_content.code = '<wp-the-content more="(more...)"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt imperdiet sem, at semper dui blandit et. Mauris pretium mattis nunc non ornare. Vestibulum placerat a ante suscipit bibendum.</p><p>Maecenas feugiat ut eros id molestie. Sed leo augue, lobortis interdum mollis at, accumsan a metus. Ut orci enim, vehicula eget fringilla sed, gravida vel arcu.</p></wp-the-content>';
            wp_the_content.sections = {
                parameters : {
                    name : 'Parameters',
                    fields : {
                        more : {
                            type : 'text',
                            name : 'More link text',
                            action : "element_attribute",
                            attribute : 'more',
                            p_order : 1
                        },
                        stripteaser : {
                            type : 'checkbox',
                            name : 'Stripteaser',
                            action : "element_attribute",
                            attribute : 'stripteaser',
                            value: 'true',
                            negvalue: 'false',
                            p_order : 2
                        }
                    }
                }
            }
            f.addComponentType(wp_the_content);
            wp_pg_comp_list.push(wp_the_content);
            Html_filters.push(function(pgel) {
                if(pgel.isSelector(wp_the_content.selector)) {
                    var php = this.isThePostNeeded();
                    php.push('the_content('+this.getPhpParams(wp_the_content,pgel)+');');
                    this.writePhpCode(pgel,php);
                    return false;//stop
                }
                return true;
            });





            //the_excerpt()
            var wp_the_excerpt = new PgComponentType('wp_pg_the_excerpt', 'WP the excerpt');
            wp_the_excerpt.selector = "wp-the-excerpt";
            wp_the_excerpt.code = '<wp-the-excerpt>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt imperdiet sem, at semper dui blandit et. Mauris pretium mattis nunc non ornare.</wp-the-excerpt>';
            f.addComponentType(wp_the_excerpt);
            wp_pg_comp_list.push(wp_the_excerpt);
            Html_filters.push(function(pgel) {
                if(pgel.isSelector(wp_the_excerpt.selector)) {
                    var php = this.isThePostNeeded();
                    php.push('the_excerpt();');
                    this.writePhpCode(pgel,php);
                    return false;//stop
                }
                return true;
            });





            //the_permalink()
            var wp_the_permalink = new PgComponentType('wp_pg_the_permalink', 'WP the permalink');
            wp_the_permalink.selector = "[data-pg-elm='wp-the-permalink']";
            wp_the_permalink.code = '<a href="#" data-pg-elm="wp-the-permalink">Proin feugiat dignissim</a>';
            f.addComponentType(wp_the_permalink);
            wp_pg_comp_list.push(wp_the_permalink);
            Html_filters.push(function(pgel) {
                if(pgel.getAttr('data-pg-elm') == 'wp-the-permalink') {
                    var php = this.isThePostNeeded();
                    if(php.length > 0) {
                        var phpNode = pgCreateNodeFromHtml('<?php '+php[0]+' ?>');
                        phpNode.insertBefore(pgel);
                    }
                    pgel.setAttr( 'href', '<?php the_permalink(); ?>' );
                    pgel.removeAttr('data-pg-elm');
                    return true;//continue
                }
                return true;
            });






            //the_author()
            var wp_the_author = new PgComponentType('wp_pg_the_author', 'WP the author');
            wp_the_author.selector = "wp-the-author";
            wp_the_author.code = '<wp-the-author>Curae Donec</wp-the-author>';
            f.addComponentType(wp_the_author);
            wp_pg_comp_list.push(wp_the_author);
            Html_filters.push(function(pgel) {
                if(pgel.isSelector(wp_the_author.selector)) {
                    var php = this.isThePostNeeded();
                    php.push('the_author();');
                    this.writePhpCode(pgel,php);
                    return false;//stop
                }
                return true;
            });





            //get_the_date()
            var wp_get_the_date = new PgComponentType('wp_get_the_date', 'WP the date');
            wp_get_the_date.selector = "wp-get-the-date";
            wp_get_the_date.code = '<wp-get-the-date>November 6, 2010</wp-get-the-date>';
            wp_get_the_date.sections = {
                parameters : {
                    name : 'Parameters',
                    fields : {
                        format : {
                            type : 'text',
                            name : 'PHP Date Format',
                            action : "element_attribute",
                            attribute : 'format',
                            p_order : 1
                        }
                    }
                }
            }
            f.addComponentType(wp_get_the_date);
            wp_pg_comp_list.push(wp_get_the_date);
            Html_filters.push(function(pgel) {
                if(pgel.isSelector(wp_get_the_date.selector)) {
                    php = ['get_the_date('+this.getPhpParams(wp_get_the_date,pgel)+');'];
                    this.writePhpCode(pgel,php);
                    return false;//stop
                }
                return true;
            });








        //---------------- End Components --------------------


        var section = new PgFrameworkLibSection('wp_pg_sec', 'Wordpress');//define section and elements shown in LIB tab
        section.setComponentTypes(wp_pg_comp_list);
        f.addLibSection(section);


        //---------------- Start Events --------------------

            f.on_page_saved = function(crsaPage) {
                console.log('on page saved called');
                var phpCode = transformHtmlDocToPhp(crsaPage.sourceNode);//crsaPage.sourceNode is the root document node (of class pgParserNode)
                var outputFile = crsaPage.localFile.replace('.html', '.php');
                crsaWriteFileWithBackup(null, outputFile, phpCode);//save php file
            }// end on_page_saved

        //---------------- End Events --------------------


    });// end $('body').one('pinegrow-ready'

});//end $(function()