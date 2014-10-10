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
        uncss: {
          dist: {
            files: {
              'stylesheets/tidy.css': ['index.html']
            }
          }
        },//uncss
        processhtml: {
            dist: {
              files: {
                'index2.html': ['index.html']
              }
            }
        },//processhtml
        copy: {
          main: {
            files: [
                {expand: true, cwd: 'bower_components/fontawesome/fonts/', src: ['**'], dest: 'fonts/'},
            ]

          }
        }//copy
        
        
    });

    // Load the plugin that provides the "coffee" task.
    grunt.loadNpmTasks('grunt-contrib-coffee');

    // Load the plugin that provides the "compass" task
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Load the plugin that provides the "watch" task
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin that provides the "uncss" task
    grunt.loadNpmTasks('grunt-uncss');

    // Load the plugin that provides the "processhtml" task
    grunt.loadNpmTasks('grunt-processhtml');

    // Load the plugin that provides the "contribcopy" task
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['coffee', 'compass', 'processhtml', 'uncss', 'copy']);

};