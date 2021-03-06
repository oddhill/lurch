module.exports = function(grunt) {

  grunt.registerTask('watch', [ 'watch' ]);

  grunt.initConfig({
    nodewebkit: {
      options: {
        platforms: ['osx'],
        buildDir: '../builds',
        cacheDir: '../cache'
      },
      src: ['./**/*'],
    },
    sass: {
      options: {
        sourcemap: "none",
      },
      style: {
        files: {
          "css/main.css": "sass/main.scss"
        }
      }
    },
    watch: {
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: false,
        }
      },
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['sass:style'],
        options: {
          livereload: false,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
};
