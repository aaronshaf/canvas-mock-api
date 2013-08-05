module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    
    jshint:
      all: [
        'index.js',
        'standalone.js',
        'models/*.js'
      ]

    watch:
      scripts:
        files: [
          '**/*.js',
        ]
        tasks: ['coffee']
  
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-notify'

  grunt.registerTask 'default', [
    'jshint',
    'watch'
  ]