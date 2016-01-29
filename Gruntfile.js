module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      config: {
        files: [{
          expand: true,
          cwd: 'config/', // set working folder / root to copy
          dot: true,
          dest: 'config/', // destination folder
          src: [
            'config-example.js'
          ],
          rename: function(dest, src) {
            return dest + src.replace('-example.js','.js');
          }
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['copy:config']);
};
