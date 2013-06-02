'use strict';
/* jshint camelcase:false */

module.exports = function(grunt) {
	// Configuration
	grunt.initConfig({
		jshint: {
			app: {
        options: {
          jshintrc: 'app/.jshintrc'
        },
				files: {
					src: ['./*.js', 'app/js/**/*.js']
				}
			},
			test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
				files: {
					src: ['test/unit/**/*.js', 'test/e2e/**/*.js']
				}								
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Register tasks
	grunt.registerTask('default', ['jshint']);
};