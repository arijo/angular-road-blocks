module.exports = function (grunt) {

  grunt.initConfig({

      sass: {

        dist: {
          options: {
            style: 'expanded',
            compass: true,
            require: 'susy'
          },
          files: {
            'public/styles/main.css': 'public/styles/main.scss'
          }
        }
      },

      browserify: {
        dist: {
          files: {
            'public/build/app.js': ['public/scripts/init.js']
          }
        }
      }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['browserify', 'sass']);
};
