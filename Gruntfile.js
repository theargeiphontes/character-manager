module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      express: {
        files:  ['src/**/*', '!src/data/* '],
        tasks:  ['jshint', 'express:dev'],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'src/javascript/*.js',
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
          script: 'src/main.js'
        }
      },
      test: {
        options: {
          script: 'src/main.js'
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['spec/unit/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['jshint', 'express:dev', 'watch']);

  grunt.registerTask('test:setup', ['jshint']);
  grunt.registerTask('test', ['test:setup', 'mochaTest']);
};