const autoPrefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    config = require('./config.json'),
    critical = require('critical'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    responsive = require('gulp-responsive'),
    sass = require('gulp-sass'),
    sourceMaps = require('gulp-sourcemaps'),
    styleLint = require('stylelint'),
    styleLintConfigStandard = require('stylelint-config-standard'),
    styleLintOrder = require('stylelint-order'),
    styleLintScss = require('stylelint-scss'),
    svgo = require('gulp-svgo'),
    uglify = require('gulp-uglify');
// const imageMin = require('gulp-imagemin');
// const svgSprite = require('gulp-svg-sprite');

gulp.task('default', gulp.series('serve', gulp.parallel('scripts', 'styles')));

// Launch Server task
gulp.task('serve', () => {
    browserSync({
        server: {
            baseDir: './',
        },
    });
});

// Clean public folder task
gulp.task('clean', del.bind(null, ['./dist']));

// Process CSS files to generate final css files in 'public' folder
gulp.task('styles', () => {
    return gulp
        .src(config.styles.src)
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(sourceMaps.init())
        .pipe(
            sass({
                outputStyle: 'compressed',
            })
        )
        .pipe(
            autoPrefixer({
                browsers: ['last 2 versions', 'ie >= 11'],
                cascade: false,
            })
        )
        .pipe(sourceMaps.write(config.maps.dist))
        .pipe(gulp.dest(config.styles.dist))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(notify({ message: '> Styles task finished!', onLast: true }));
});

// Process Scripts to generate final js file in 'public' folder
gulp.task('scripts', () => {
    return gulp
        .src(config.scripts.src)
        .pipe(
            eslint.results(results => {
                // Called once for all ESLint results.
                console.log(`Total Results: ${results.length}`);
                console.log(`Total Warnings: ${results.warningCount}`);
                console.log(`Total Errors: ${results.errorCount}`);
            })
        )
        .pipe(eslint.formatEach('compact', process.stderr))
        .pipe(sourceMaps.init())
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourceMaps.write(config.maps.dist))
        .pipe(gulp.dest(config.scripts.dist))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(notify({ message: '> tyles task finished!', onLast: true }));
});

// Process SVGs
gulp.task('svg', () => {
    return gulp
        .src(config.svg.src)
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(svgo())
        .pipe(gulp.dest(config.svg.dist))
        .pipe(notify({ message: '> SVG task finished!', onLast: true }));
});

// Process Images
gulp.task('images', () => {
    return gulp
        .src(config.images.src)
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(
            responsive(
                {
                    '*.png': [
                        {
                            // -small.webp is 320 pixels wide
                            width: 320,
                            rename: {
                                suffix: '-small',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -small@2x.webp is 640 pixels wide
                            width: 320 * 2,
                            rename: {
                                suffix: '-small@2x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -small@3x.webp is 960 pixels wide
                            width: 320 * 3,
                            rename: {
                                suffix: '-small@3x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -medium.webp is 768 pixels wide
                            width: 768,
                            rename: {
                                suffix: '-medium',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -medium@2x.webp is 1.536 pixels wide
                            width: 768 * 2,
                            rename: {
                                suffix: '-medium@2x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -medium@3x.webp is 2.304 pixels wide
                            width: 768 * 3,
                            rename: {
                                suffix: '-medium@3x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -large.webp is 1.280 pixels wide
                            width: 1280,
                            rename: {
                                suffix: '-large',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -large@2x.webp is 2.560 pixels wide
                            width: 1280 * 2,
                            rename: {
                                suffix: '-large@2x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -large@3x.webp is 3.840 pixels wide
                            width: 1280 * 3,
                            rename: {
                                suffix: '-large@3x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -extralarge.webp is 1.440 pixels wide
                            width: 1440,
                            rename: {
                                suffix: '-extralarge',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -extralarge@2x.webp is 2.880 pixels wide
                            width: 1440 * 2,
                            rename: {
                                suffix: '-extralarge@2x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -extralarge@3x.webp is 4.320 pixels wide
                            width: 1440 * 3,
                            rename: {
                                suffix: '-extralarge@3x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -small.webp is 320 pixels wide
                            width: 320,
                            rename: {
                                suffix: '-small',
                                extname: '.webp',
                            },
                        },
                        {
                            // -small@2x.webp is 640 pixels wide
                            width: 320 * 2,
                            rename: {
                                suffix: '-small@2x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -small@3x.webp is 960 pixels wide
                            width: 320 * 3,
                            rename: {
                                suffix: '-small@3x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -medium.webp is 768 pixels wide
                            width: 768,
                            rename: {
                                suffix: '-medium',
                                extname: '.webp',
                            },
                        },
                        {
                            // -medium@2x.webp is 1.536 pixels wide
                            width: 768 * 2,
                            rename: {
                                suffix: '-medium@2x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -medium@3x.webp is 2.304 pixels wide
                            width: 768 * 3,
                            rename: {
                                suffix: '-medium@3x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -large.webp is 1.280 pixels wide
                            width: 1280,
                            rename: {
                                suffix: '-large',
                                extname: '.webp',
                            },
                        },
                        {
                            // -large@2x.webp is 2.560 pixels wide
                            width: 1280 * 2,
                            rename: {
                                suffix: '-large@2x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -large@3x.webp is 3.840 pixels wide
                            width: 1280 * 3,
                            rename: {
                                suffix: '-large@3x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -extralarge.webp is 1.440 pixels wide
                            width: 1440,
                            rename: {
                                suffix: '-extralarge',
                                extname: '.webp',
                            },
                        },
                        {
                            // -extralarge@2x.webp is 2.880 pixels wide
                            width: 1440 * 2,
                            rename: {
                                suffix: '-extralarge@2x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -extralarge@3x.webp is 4.320 pixels wide
                            width: 1440 * 3,
                            rename: {
                                suffix: '-extralarge@3x',
                                extname: '.webp',
                            },
                        },
                    ],
                    '*.jpg': [
                        {
                            // -small.webp is 320 pixels wide
                            width: 320,
                            rename: {
                                suffix: '-small',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -small@2x.webp is 640 pixels wide
                            width: 320 * 2,
                            rename: {
                                suffix: '-small@2x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -small@3x.webp is 960 pixels wide
                            width: 320 * 3,
                            rename: {
                                suffix: '-small@3x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -medium.webp is 768 pixels wide
                            width: 768,
                            rename: {
                                suffix: '-medium',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -medium@2x.webp is 1.536 pixels wide
                            width: 768 * 2,
                            rename: {
                                suffix: '-medium@2x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -medium@3x.webp is 2.304 pixels wide
                            width: 768 * 3,
                            rename: {
                                suffix: '-medium@3x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -large.webp is 1.280 pixels wide
                            width: 1280,
                            rename: {
                                suffix: '-large',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -large@2x.webp is 2.560 pixels wide
                            width: 1280 * 2,
                            rename: {
                                suffix: '-large@2x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -large@3x.webp is 3.840 pixels wide
                            width: 1280 * 3,
                            rename: {
                                suffix: '-large@3x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -extralarge.webp is 1.440 pixels wide
                            width: 1440,
                            rename: {
                                suffix: '-extralarge',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -extralarge@2x.webp is 2.880 pixels wide
                            width: 1440 * 2,
                            rename: {
                                suffix: '-extralarge@2x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -extralarge@3x.webp is 4.320 pixels wide
                            width: 1440 * 3,
                            rename: {
                                suffix: '-extralarge@3x',
                                extname: '.jpg',
                            },
                        },
                        {
                            // -small.webp is 320 pixels wide
                            width: 320,
                            rename: {
                                suffix: '-small',
                                extname: '.webp',
                            },
                        },
                        {
                            // -small@2x.webp is 640 pixels wide
                            width: 320 * 2,
                            rename: {
                                suffix: '-small@2x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -small@3x.webp is 960 pixels wide
                            width: 320 * 3,
                            rename: {
                                suffix: '-small@3x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -medium.webp is 768 pixels wide
                            width: 768,
                            rename: {
                                suffix: '-medium',
                                extname: '.webp',
                            },
                        },
                        {
                            // -medium@2x.webp is 1.536 pixels wide
                            width: 768 * 2,
                            rename: {
                                suffix: '-medium@2x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -medium@3x.webp is 2.304 pixels wide
                            width: 768 * 3,
                            rename: {
                                suffix: '-medium@3x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -large.webp is 1.280 pixels wide
                            width: 1280,
                            rename: {
                                suffix: '-large',
                                extname: '.webp',
                            },
                        },
                        {
                            // -large@2x.webp is 2.560 pixels wide
                            width: 1280 * 2,
                            rename: {
                                suffix: '-large@2x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -large@3x.webp is 3.840 pixels wide
                            width: 1280 * 3,
                            rename: {
                                suffix: '-large@3x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -extralarge.webp is 1.440 pixels wide
                            width: 1440,
                            rename: {
                                suffix: '-extralarge',
                                extname: '.webp',
                            },
                        },
                        {
                            // -extralarge@2x.webp is 2.880 pixels wide
                            width: 1440 * 2,
                            rename: {
                                suffix: '-extralarge@2x',
                                extname: '.webp',
                            },
                        },
                        {
                            // -extralarge@3x.webp is 4.320 pixels wide
                            width: 1440 * 3,
                            rename: {
                                suffix: '-extralarge@3x',
                                extname: '.webp',
                            },
                        },
                    ],
                },
                {
                    // Global configuration for all images
                    // The output quality for JPEG, WebP and TIFF output formats
                    quality: 100,
                    // Use progressive (interlace) scan for JPEG and PNG output
                    progressive: true,
                    // Strip all metadata
                    withMetadata: false,
                    // Do not emit the error when image is enlarged.
                    errorOnEnlargement: false,
                }
            )
        )
        .pipe(gulp.dest(config.images.dist))
        .pipe(notify({ message: '> Images task finished!', onLast: true }));
});
