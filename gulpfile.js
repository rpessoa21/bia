/*
Back end deve usar
dev = 'back'

Front end deve usar
dev = 'front'

Insira o nome do tema do WP na var theme

*/

var theme = '';



// ================================
// FRONT END
// ================================
var gulp        = require('gulp'),
    pug         = require('gulp-pug'),
    browserSync = require('browser-sync'),
    stylus      = require('gulp-stylus'),
    prefix      = require('autoprefixer-stylus'),
    uglify      = require('gulp-uglify'),
    // imagemin    = require('gulp-imagemin'),
    concat      = require('gulp-concat');
var reload      = browserSync.reload;



function swallowError (error) {
    console.log(error.toString())
    this.emit('end')
}


// ================================
// JADE
// ================================

gulp.task('templates', function() {

    return gulp.src(['./assets/pug/**/*.pug', '!./assets/pug/**/layout.pug', '!./assets/pug/**/_*.pug'])
        .pipe(pug({
            data: {
                // imgHref: 'https://raw.githubusercontent.com/rpessoa21/nsws/master/',
                imgHref: '/',
                // baseHref: '',
                baseHref: '/',
            },
            pretty: true
        }))
        .on('error', swallowError)
        .pipe(gulp.dest('./'));
});
// 

gulp.task('jade-watch', ['templates'], reload);



// ================================
// STYLUS
// ================================

gulp.task('css', function() {
    return gulp.src(['./assets/stylus/style.styl'])
        .pipe(stylus({
            use: prefix(),
            compress: true
            // linenos: true
        }))
        .on('error', swallowError)
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream: true}));
});


// ================================
// IMAGE
// ================================

// gulp.task('optimize', () =>
//     gulp.src('./assets/images/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('./img'))
//     );


// ================================
// UGLIFY
// ================================

// gulp.task('js', function() {
//   return gulp.src('./assets/js/*.js')
//     .pipe(uglify())
//     .on('error', swallowError)
//     .pipe(concat('main.min.js'))
//     .pipe(gulp.dest('./js'))
//     .pipe(browserSync.reload({stream: true}));
// });

gulp.task('default', ['css', 'templates'], function () {

    browserSync({server: './'});

    // gulp.watch('./assets/js/*.js', ['js']);
    gulp.watch('./assets/stylus/**/*.styl', ['css']);
    gulp.watch('./assets/**/*.pug', ['jade-watch']);
});
