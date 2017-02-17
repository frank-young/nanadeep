//引入插件
var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'), //代码验证检查
    uglify = require('gulp-uglify'), //压缩js代码
    rename = require('gulp-rename'), //文件重命名
    concat = require('gulp-concat'), //合并js文件
    notify = require('gulp-notify'), //更改提醒
    livereload = require('gulp-livereload'); //自动刷新页面

// 使用less
gulp.task('less', function () {
    gulp.src('src/less/**/*.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(gulp.dest('src/css'));
});
//js代码校验、合并和压缩（类似jquery的链式操作，牛）
gulp.task('scripts', function() {
    return gulp.src('src/**/*.js') //源文件
        .pipe(jshint('.jshintrc')) //1、校验JS文件，jshint校验规则
        .pipe(jshint.reporter('default'))
        .pipe(concat('goodgis.js')) //2、合并js文件，goodgis.js为合并的文件名称
        .pipe(gulp.dest('dist')) //合并后文件存放位置
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify()) //3、执行压缩任务
        .pipe(gulp.dest('dist')) //压缩后文件存放位置
        .pipe(notify({ //4、操作结束后提示
            message: 'Scripts task complete'
        }));
});
// 默认任务，这里完全可以是多个任务，比如压缩CSS，压缩图片，压缩js等
gulp.task('default', ['watch'], function() {
    gulp.start('scripts');
    gulp.start('less');
});
// 监听（前端自动化的情怀）
gulp.task('watch', function() {
    // 监听 .js文件改动，一旦改动就会自动压缩合并
    gulp.watch('src/**/*.js', ['scripts']);
    // 监听 .less文件改动，一旦改动就会自动压缩合并
    gulp.watch('src/less/**/*.js', ['less']);
    // Create LiveReload server（用来自动刷新浏览器）
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});
