const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const metadata = require('metalsmith-metadata');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const discoverpartials = require('metalsmith-discover-partials');
const helpers       = require('handlebars-helpers')();


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
  .build(function(err){
  if (err) throw err;
});