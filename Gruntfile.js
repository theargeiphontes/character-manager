module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      express: {
        files:  ['src/**/*'],
        tasks:  ['express:dev'],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'src/**/*.js'
      ],
      options: {
        jshintrc: true
      }
    },

    express: {
      options: {
        
      },
      dev: {
        options: {
          script: 'src/app.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'express:dev', 'watch']);

};