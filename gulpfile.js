var gulp         = require('gulp');               //gulp
var sass         = require('gulp-sass');          //scss -> css
var plumber      = require('gulp-plumber');       //watch dont stop
var browserSync  = require('browser-sync');       //browser live reload
var autoprefixer = require('gulp-autoprefixer');  //autoprefixer

//copy to html/js/font/img
gulp.task('copy', function(){
	//
});

//scss -> css
gulp.task('sass', function(){
	gulp.src(['style.scss', 'css/*.scss'])
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}))	//expanded,compressed,nested
		.pipe(autoprefixer({
	        browsers: ['last 2 versions'],
	        cascade: false
	    }))
		.pipe(gulp.dest('./'));
});

//watching files
gulp.task('watch', function(){
	gulp.watch('style.scss', ['sass']);
	gulp.watch('css/*.scss', ['sass']);
	//reload
	gulp.watch('./*.html', ['bs-reload']);
	gulp.watch('style.scss', ['bs-reload']);
	gulp.watch('./js/*.js', ['bs-reload']);
});

//browserSync reload
gulp.task('bs-reload', function(){
	browserSync.reload();
});

//webserver display(browserSync)
gulp.task('webserver', function(){
	browserSync({
		notify: false,
		port: 8000,
		server: {
			baseDir: './',       //対象ディレクトリ
			index  : 'index.html'      //インデックスファイル
		}
	});
});

gulp.task('default', ['copy', 'sass', 'watch', 'webserver']);
