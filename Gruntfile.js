'use strict';

module.exports = function(grunt) {
  require('load-grunt-config')(grunt);
};

  //// Configure Tasks
  //grunt.initConfig({
    //pkg: grunt.file.readJSON('package.json'),
    //jscs: {
      //src: [ 'Gruntfile.js',
             //'*.js',
             //'public/js/**/*.js',
             //'lib/**/*.js',
             //'test/**/*.js'
           //],
      //options: {
        //verbose: true
      //}
    //},
    //jshint: {
      //dev: {
        //src: [ 'Gruntfile.js',
              //'*.js',
              //'public/js/**/*.js',
              //'lib/**/*.js',
              //'test/**/*.js'
            //]
      //},
      //options: {
        //jshintrc: true
      //}
    //},
    //nodemon: {
      //dev: {
        //script: 'server.js'
      //}
    //},
    //watch: {
      //jshint: {
        //files: [ 'Gruntfile.js',
               //'*.js',
               //'lib/**/*.js',
               //'models/**/*.js',
               //'routes/**/*.js',
               //'test/**/*.js'
             //],
        //tasks: ['jshint:dev'],
        //options: { spawn: false }
      //}
    //},
    //execute: {
      //target: {
        //src: ['./lib/task/populate_db_task.js']
      //}
    //},
    //mochaTest: {
      //test: {
        //options: {
          //reporter: 'spec',
          //captureFile: false,
          //quiet: false,
          //clearRequireCache: false
        //},
        //src: ['test/**/*_test.js']  // all _test files
      //}
    //}
  //});

  //// Custom Task Chains
  //grunt.registerTask('test', ['jshint:dev', 'jscs', 'mochaTest']);
  //grunt.registerTask('popdb', ['execute']);
  //grunt.registerTask('default' ,['test']);
//};
