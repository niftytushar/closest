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
        },
        compass: {
            compile: {
                options: {
                    config: "config.rb"
                }
            }
        },
        watch: {
            css: {
                files: ['sass/*.scss'],
                tasks: ['compass']
            },
            scripts: {
                files: ['coffee/app.coffee'],
                tasks: ['coffee']
            }
        }
    });

    // Load the plugin that provides the "coffee" task.
    grunt.loadNpmTasks('grunt-contrib-coffee');

    // Load the plugin that provides the "compass" task
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Load the plugin that provides the "watch" task
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['coffee', 'compass']);

};
