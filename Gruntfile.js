var path = require('path')

module.exports = function(grunt) {
  var t = grunt.template.process;
  var p = grunt.file.readJSON('package.json');

  // Making sure that this path has the correct separator. Just in case.
  p.framework = p.framework.split(/[/|\\]/).join(path.sep);

  grunt.initConfig({
    pkg: p,

    shell: {
      // Run bower from grunt.
      bower: { 
        command: 'bower install' 
      },

      // Clone game-builder from github
      framework: {
        command: t('git clone -b <%= p.frameworkTag %> <%= p.frameworkRepo %> <%= p.framework %>', {data: {p:p}}) 
      }
    },

    clean: {
      // Clean the folder where game-builder is downloaded
      target: {
        src: [path.join(p.framework)],
      },

      options: { force: true }
    },

    open: {
      // Open index.html with the default browser
      index : { path : 'index.html' }
    },

    // Merge files to create asset-map.js
    "merge-json": {
      map: {
        src: [ 'generated/asset-map.js', "config/remote-assets.json"],
        dest: 'generated/asset-map.js'
      }
    },

    // Prepend a variable declaration in asset-map.js
    file_append: {
      default_options: {
        files: {
          'generated/asset-map.js': {
            prepend: "var assetMap = "
          }
        }
      }
    },

    downloadfile: {
      files: []
    },

    less: {
      target: {
        options: {
          paths: ['styles/less'],
          strictMath: true
        },
        files: [{
          expand: true,
          cwd: 'styles/less/',   
          src: ['*/style.less'],
          dest: 'generated/css/',
          rename: function(dest, src) {
            return dest + src.substring(0, src.indexOf('/')) + '.css';
          },
        }]
      }
    },

    concat: {
      generated_sans_main: {
        files: [{
          expand: true,
          cwd: 'generated/css/',
          src: ['*.css', '!*main.css'],
          dest: 'styles/css/',
          rename: function(dest, src) {
            return dest + 'all_styles.css';
          }
        }]
      },
      plain_sans_main: {
        files: [{
          expand: true,
          cwd: 'styles/css/',
          src: ['*.css', '!*main.css'],
          dest: 'styles/css/',
          rename: function(dest, src) {
            return dest + 'all_styles.css';
          }
        }]
      },
      append_main: {
        files: [{
          expand: true,
          src: ['styles/css/all_styles.css', 'generated/css/main.css', 'styles/css/main.css'],
          dest: 'styles/css/',
          rename: function(dest, src) {
            return dest + 'all_styles.css';
          }
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'generated/css/',
          src: ['!(main.css)'],
          dest: 'styles/css/',
          rename: function() {
            return 'all_styles.css';
          }
        }]
      }
    }
  });

  // Npm goodness
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-merge-json');
  grunt.loadNpmTasks('grunt-file-append');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Local tasks
  grunt.loadTasks('tasks');

  // This task creates the asset map 
  grunt.registerTask('asset-map', ['local-assets', 'merge-json', 'file_append']);
  // This task creates all the requirejs configuration needed
  grunt.registerTask('config', ['create-config']);
  // This task downloads game-builder source code
  grunt.registerTask('framework', ['clean', 'shell:framework']);
  // Preprocess .less files
  // grunt.registerTask('less', ['less']);
  grunt.registerTask('concatenate', ['concat:generated_sans_main', 'concat:plain_sans_main', 'concat:append_main']);
  // This task opens index.html
  grunt.registerTask('run', ['open:index']);
  // This task 
    // downloads any bower components
    // downloads game-builder source
    // generates requirejs configuration
    // generates the local and remote asset map
  grunt.registerTask('build', ['shell:bower', 'framework', 'config', 'asset-map']);

  // The default task get's all dependencies, generates everything needed and finally opens index.html 
  grunt.registerTask('default', ['build', 'run']);
};