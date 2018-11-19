const metalsmith = require('metalsmith');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');
const markdown = require('metalsmith-markdown');
const metadata = require('metalsmith-metadata');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const discoverpartials = require('metalsmith-discover-partials');
const helpers       = require('handlebars-helpers')();


const serverport = 5000;

metalsmith(__dirname)
  .destination('./build')
  .clean(true) 
  .use(markdown())
  .use(metadata({
    config: '_config.yaml'
  }))
  .use(discoverpartials({
    directory: 'layouts/partials',
    pattern: /\.hbs$/
  }))
  .use(layouts({
    default: 'default.hbs',
    pattern: '**/*.html',
    suppressNoFilesError: true
  })) 
  .use(permalinks({
      pattern: ':slug',
      relative: 'off'
  }))
  .use(serve({
      port: serverport,
      verbose: true,
      http_error_files: {
        404: '/404/index.html'
      }
  }))
  .use(
      watch({
        paths: {
            "${source}/**/*": true, // every changed files will trigger a rebuild of themselves
            "layouts/**/*": "**/*", // every templates changed will trigger a rebuild of all files
            },
        livereload: true
      })
    )
  .build(function(err){
  if (err) throw err;
});