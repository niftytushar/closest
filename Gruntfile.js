module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            compile: {
                files: {
                    'js/app.js': 'coffee/app.coffee'
                }
            }
        },//coffee
        compass: {
            compile: {
                options: {
                    config: "config.rb"
                }
            }
        },//compass
        watch: {
            css: {
                files: ['sass/*.scss'],
                tasks: ['compass']
            },
            scripts: {
                files: ['coffee/app.coffee'],
                tasks: ['coffee']
            }
        },//watch
        webfont: {
            icons: {
                src: 'dev/icons/*.svg',
                dest: 'build/fonts',
                options: {
                    stylesheet: 'scss',
                    relativeFontPath: 'sass/icon-fonts/icons'
                }
            }
        }//webfont
    });

    // Load the plugin that provides the "coffee" task.
    grunt.loadNpmTasks('grunt-contrib-coffee');

    // Load the plugin that provides the "compass" task
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Load the plugin that provides the "watch" task
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin that provides the "webfont" task
    grunt.loadNpmTasks('grunt-webfont');


    // Default task(s).
    grunt.registerTask('default', ['coffee', 'compass']);

};
