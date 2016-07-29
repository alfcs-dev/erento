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
            clean: {
				js: ['.tmpjs'],
				css: ['.tmpcss']
			},
        });
        grunt.loadNpmTasks('grunt-karma');
        grunt.loadNpmTasks('grunt-wiredep');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-ng-annotate');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-sass');
    }
})();