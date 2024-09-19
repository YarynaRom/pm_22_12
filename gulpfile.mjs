// Використання ESM для імпорту модулів
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import browserSyncModule from 'browser-sync';
import concat from 'gulp-concat';
import file_include from 'gulp-file-include';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';

const { src, dest, series, parallel, watch } = gulp;
const browserSync = browserSyncModule.create();

// Мінімізація SCSS
function compileSass() {
    return src('app/scss/*.scss')
        .pipe(plumber()) // Обробка помилок
        .pipe(gulpSass(sass).on('error', gulpSass.logError))
        .pipe(postcss([cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}
gi
// Мінімізація JS
function minifyJs() {
    return src('app/js/*.js')
        .pipe(plumber()) // Обробка помилок
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

// Об'єднання HTML файлів
function includeHtml() {
    return src(['app/index.html'])
        .pipe(plumber()) // Обробка помилок
        .pipe(file_include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// Компресія зображень
function compressImages() {
    return src('app/img/*', { since: gulp.lastRun(compressImages) })
        .pipe(plumber()) // Обробка помилок
        .pipe(imagemin())
        .pipe(dest('dist/img'));
}

// Синхронізація браузера
function browserSyncInit() {
    browserSync.init({
        server: {
            baseDir: './dist',
        }
    });
}

// Спостереження за файлами
function watchFiles() {
    watch('app/scss/*.scss', compileSass);
    watch('app/js/*.js', minifyJs);
    watch(['app/index.html', 'app/html/*.html'], includeHtml);
    watch('app/img/*', compressImages);
    watch('dist/*').on('change', browserSync.reload);
}

// Завдання за замовчуванням
export default parallel(browserSyncInit, watchFiles);

// Окремі завдання
export const sassTask = compileSass;
export const uglifyTask = minifyJs;
export const htmlTask = includeHtml;
export const imgTask = compressImages;
