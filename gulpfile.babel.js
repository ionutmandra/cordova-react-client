import 'babel-polyfill';
import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import watchify from 'watchify';
import notify from 'gulp-notify';
import duration from 'gulp-duration';
import runSequence from 'run-sequence';
import clean from 'gulp-clean';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import debug from 'gulp-debug';
import rename from 'gulp-rename';
import concat from 'gulp-concat';

const opts = Object.assign({}, watchify.args, {
  entries: 'src/index.js',
});

gulp.task('watchify', () => {

  console.log('NODE_ENV is', process.env.NODE_ENV);

  opts.debug = !(process.env.NODE_ENV == 'production');

  console.log('browserify debug mode is ', opts.debug);

  let bundler = watchify(browserify(opts));
  bundler.transform(babelify).on('update', rebundle);
  return rebundle();

  function rebundle() {
    console.log('[' + (new Date().toTimeString().substring(0, 8)) + '] recreating bundle');
    return bundler.bundle()
      .on('error', notify.onError())
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(duration('rebuilding files'))
      .pipe(gulp.dest('./www/dist/js'));
  }
});

const vendor_files = [
  './src/lib/polyfill/*.js',
  './src/lib/jquery/jquery.min.js',
  './src/lib/jquery/jquery.scrollLock.js',
];

gulp.task('vendor', () => {
  let files = vendor_files;

  var piped = gulp.src(vendor_files)
    .pipe(concat('vendor.js'));

  if (process.env.NODE_ENV == 'production') {
    piped.pipe(uglify());
  }

  return piped.pipe(gulp.dest('./www/dist/js'));
});

const imagePaths = ['./src/assets/img/**'];
gulp.task('move-image-files', (callback) => {
    return gulp.src(imagePaths)
      .pipe(gulp.dest('./www/dist/img'));
});

gulp.task('move-site-maps', (callback) => {
    return gulp.src(['./siteMap.xml', './siteMapWww.xml'])
      .pipe(gulp.dest('./wwww/dist'));
});



gulp.task('move-configs-server', (callback) => {
    return gulp.src(['./configServer/envConfig.js', './configServer/.chcpenv'])
      .pipe(gulp.dest('./', {overwrite: true}));
});
gulp.task('move-configs-client', (callback) => {
    return gulp.src(['./configLocal/envConfig.js', './configLocal/.chcpenv'])
      .pipe(gulp.dest('./', {overwrite: true}));
});
gulp.task('move-chcp-server', (callback) => {
    return gulp.src(['./configServer/chcp.json'])
      .pipe(gulp.dest('./www/', {overwrite: true}));
});
gulp.task('move-chcp-client', (callback) => {
    return gulp.src(['./configLocal/chcp.json'])
      .pipe(gulp.dest('./www/', {overwrite: true}));
});


gulp.task('default', ['vendor', 'move-configs-client', 'move-chcp-client', 'watchify', 'move-image-files'], function() {
});

gulp.task('clean', function () {
  return gulp.src('./www/dist', { read: false })
    .pipe(clean());
});

gulp.task('build', function () {

  console.log('NODE_ENV is', process.env.NODE_ENV);

  opts.debug = !(process.env.NODE_ENV == 'production');

  console.log('browserify debug mode is ', opts.debug);

  var bundler = browserify(opts)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'));

  if (process.env.NODE_ENV !== 'production') {

    console.log('extracting source maps for dev mode');

    bundler = bundler.pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'));
  }

  if (process.env.NODE_ENV === 'production') {
    console.log('uglifying');
    bundler = bundler.pipe(buffer()).pipe(uglify());
  }

  return bundler.pipe(duration('rebuilding files'))
    .pipe(gulp.dest('./www/dist/js'));
});

//PRODUCTION
gulp.task('minify-css', function () {
  return gulp.src('./www/dist/css/*.css')
    .pipe(debug({ title: 'Minifying css:' }))
    .pipe(cleanCSS({ compatibility: 'ie8' }, function (details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest('./www/dist/css'));
});

gulp.task('apply-prod-environment', function () {
  //setting this value would make some changes in react code (https://facebook.github.io/react/downloads.html)
  process.env.NODE_ENV = 'production';
});

//gulp.task('deploy', function () {  
//   return runSequence('apply-prod-environment', 'clean', 'vendor', 'build', 'move-image-files', 'move-site-maps', 'minify-css', 'unit-tests');
// });

gulp.task('deploy', function () {
  return runSequence('vendor', 'move-configs-server' ,'move-chcp-server', 'build', 'move-image-files', 'move-site-maps');
});

