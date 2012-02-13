/*global config:true, task:true*/
config.init({
  pkg: '<json:package.json>',
  meta: {
    banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= template.today("m/d/yyyy") %>\n' +
            '* <%= pkg.homepage %>\n' +
            '* Copyright (c) <%= template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
  },
  concat: {
    'dist/jquery.twitter.js': ['<banner>', '<file_strip_banner:src/jquery.twitter.js>', 'src/ba-linkify.js']
  },
  min: {
    'dist/jquery.twitter.min.js': ['<banner>', 'dist/jquery.twitter.js']
  },
  qunit: {
    files: ['test/**/*.html']
  },
  lint: {
    files: ['grunt.js', 'src/**/!(ba-linkify)*.js', 'test/**/*.js']
  },
  watch: {
    files: '<config:lint.files>',
    tasks: 'lint qunit'
  },
  jshint: {
    options: {
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      eqnull: true
    },
    globals: {
      jQuery: true
    }
  },
  uglify: {}
});

// Default task.
task.registerTask('default', 'lint qunit concat min');
