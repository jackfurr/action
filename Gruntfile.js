module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        '**/*.js'
      ],
      options: {
        jshintrc: true,
        ignores: [
          'node_modules/**/*.js',
          './public/js/vendor/**/*.js'
        ]
      }
    },
    watch: {
      scripts: {
        files: [
          './**/*.js'
        ],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    },
    nodemon: {
      dev: {
          script: './server.js',
          options: {
              /** Environment variables required by the NODE application **/
              env: {
                "HTTP_PORT": 3000,
                "HTTPS_PORT": 443,
                "NODE_ENV": "development",
                "NODE_CONFIG": "dev"
              },
              watch: ["scripts"],
              delay: 300,
              nodeArgs: ['--debug'],
              callback: function (nodemon) {
                  nodemon.on('log', function (event) {
                      console.log(event.colour);
                  });
              }
          }
      }
    },
    'node-inspector': {
        custom: {
          options: {
            'web-port': 1337,
            'web-host': 'localhost',
            'debug-port': 5858,
            'save-live-edit': true,
            'no-preload': true,
            'stack-trace-limit': 4,
            'hidden': ['node_modules']
          }
        }
    },
    clean: {
      all: ['./build', './dist'],
      build: ['./build'],
      dist: ['./dist']
    },
    copy: {
      'server': {
        files: [
          // includes files within path and its sub-directories
          {
            expand: true,
            src: [
              './**',
              '!./config/config.js',
              '!./node_modules/**',
              '!./Gruntfile.js',
              '!./dist',
              '!./build'
              ],
            dest: 'build/'
          }
        ],
      }
    },
    'revision-count': {
      options: {
        property: 'build_count',
        ref: 'HEAD'
      }
    },
    revision: {
      options: {
        property: 'meta.revision',
        ref: 'HEAD',
        short: true
      }
    },
    'string-replace': {
        'server-version': {
          files: {
            'build/':'app/version.json'
          },
          options: {
            replacements: [{
              pattern: /{{ BUILD_DATE }}/g,
              replacement: '<%= grunt.template.today("yyyy-mm-dd HH:mm:ss Z") %>'
            },
            {
              pattern: /{{ REVISION }}/g,
              replacement: '<%= meta.revision %>'
            },
            {
              pattern: /{{ BUILD }}/g,
              replacement: '<%= build_count %>'
            },
            {
              pattern: /{{ MAJOR_MINOR }}/g,
              replacement: '<%= pkg.version %>'
            }]
          }
        }
      },
    compress: {
      all: {
        options: {
          archive: 'dist/digdug-<%= meta.revision %>.zip'
        },
        files: [
          { expand: true, src : '**/*', cwd : 'build/' }
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-git-revision');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-git-revision-count');


  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('run', ['nodemon']);
  grunt.registerTask('debug', ['node-inspector']);

  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory, then compresses the build directory and places the compressed file in the dist directory.',
    ['clean:all', 'copy', 'revision-count', 'revision', 'string-replace:server-version', 'compress:all']
  );

};
