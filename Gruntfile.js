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
        }
    });

    // Load the plugin that provides the "coffee" task.
    grunt.loadNpmTasks('grunt-contrib-coffee');

    // Load the plugin that provides the "compass" task
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Default task(s).
    grunt.registerTask('default', ['coffee', 'compass']);

};
