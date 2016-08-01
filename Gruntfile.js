(function(){
    'use strict';
    module.exports = function(grunt) {
        require('time-grunt');
        grunt.initConfig({
            karma: {
                unit: {
                    configFile: 'karma.conf.js',
                    singleRun: true
                }
            },
            wiredep: {
                dist:{
                    src:['index.html']
                },
                test: {
                    devDependencies: true,
                    src: '<%= karma.unit.configFile %>',
                    ignorePath: /\.\.\//,
                    fileTypes: {
                        js: {
                            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                            detect: {
                                js: /'(.*\.js)'/gi
                            },
                            replace: {
                                js: '\'{{filePath}}\','
                            }
                        }
                    }
                }
            },
            ngAnnotate: {
                options: {
                    singleQuotes: true,
                },
                build: {
                    expand: true,
                    src: ['**/*.js', '!**/*.spec.js'],
                    dest: '.tmpjs/',
                    cwd: 'src/js',
                    ext: '.annotated.js',
                    extDot: 'last',
                }
            },
            concat:{
                options:{
                    separator: '\n',
                    stripBanners: false
                },
                dev:{
                    files: {
                        'dist/js/app.min.js' : ['.tmpjs/app.module.annotated.js', '.tmpjs/**/*.annotated.js']
                    }
                }
            },
            uglify: {
                dev:{
                    files: {'dist/js/app.min.js': ['.tmpjs/app.module.annotated.js', '.tmpjs/**/*.annotated.js']}
                }
            },
            sass: {
				dist: {
					files: {
						'.tmpcss/styles.css': "src/scss/styles.scss"
					}
				}

			},
			cssmin: {
				options: {
					banner: '/*\n <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
				},
				dist: {
					files: {
						'dist/css/styles.min.css': ['.tmpcss/styles.css']
					}
				}
			},
            htmlmin:{
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                dist:{
                    files:[
                        {
                            expand: true,
                            cwd: 'src/',
                            src: 'views/**/*.html',
                            dest: 'dist/'  
                        }
                    ]
                } 
            },
            imagemin: {
                dist: {
                    files: [{
                        expand: true,
                        src: 'img/**/*',
                        cwd: 'src/',
                        dest: 'dist/'
                    }]
                }
            },
            clean: {
				js: ['.tmpjs'],
				css: ['.tmpcss']
			},
            watch:{
                js:{
                    files: ['src/js/**/*.js'],
                    tasks: ['karma', 'js-dev']
                },
                css:{
                    files:['src/scss/**/*.scss', '!.sass-cache/**/*.scssc'],
                    tasks:['css']
                },
                html:{
                    files: ['src/views/**/*.html'],
                    tasks: ['html']
                }
            },
            ngtemplates: {
                dist: {
                    src: ['src/views/**/*.html'],
                    dest: 'dist/js/templates.js'
                }
            },
            connect: {
                server: {
                    options: {
                        port: 9001,
                        open: true
                    }
                }
            },
            
        });
        grunt.loadNpmTasks('grunt-karma');
        grunt.loadNpmTasks('grunt-wiredep');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-ng-annotate');
        grunt.loadNpmTasks('grunt-angular-templates');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-sass');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-imagemin')
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-connect');

        grunt.registerTask('js-dev', ['ngAnnotate', 'concat:dev', 'clean:js']);
        grunt.registerTask('js-prod', ['ngAnnotate', 'uglify:dev', 'clean:js']);
        grunt.registerTask('css', ['sass', 'cssmin', 'clean:css']);
        grunt.registerTask('html', ['htmlmin', 'ngtemplates']);

        grunt.registerTask('dev', ['karma','js-dev', 'css', 'html', 'imagemin', 'connect', 'watch']);
        grunt.registerTask('default', ['karma','js-prod', 'css', 'html','imagemin', 'connect', 'watch']);

    };
})();