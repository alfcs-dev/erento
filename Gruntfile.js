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
        });
        grunt.loadNpmTasks('grunt-karma');
        grunt.loadNpmTasks('grunt-wiredep');
    }
})();