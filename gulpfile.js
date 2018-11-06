/* 'css' : le nom que l'on a donné à la tâche
ici-ma-source : chemin indiquant l'endroit où se trouve le(s) fichier(s) source à traiter
ici-ma-destination : chemin vers lequel les fichiers seront créés après l'exécution des tâches Gulp  */

//Requis
var gulp = require('gulp');

//Include plugins
var plugins = require ('gulp-load-plugins')();
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
// tous les plugins de package.json

//variables de chemins
var source = './src'; // dossier de travail
    destination = './dist'; // dossier à livrer

//Comment exécuter cette tâche ? Tapez simplement : gulp css
gulp.task('css', function(){
    return gulp.src(source + '/assets/css/styles.scss')
    /* ici les plugins Gulp à éxécuter */
    .pipe(sourcemaps.init())
    .pipe(plugins.plumberNotifier())
    .pipe(plugins.sass( {sourceComments: 'map'}))//Compiler SASS vers  CSS 
    .pipe(plugins.csscomb()) //Réordonner les propriétés
    .pipe(plugins.cssbeautify({indent: ' '})) //Ré-indenter et reformater 
    .pipe(plugins.autoprefixer('last 2 version', '> 1%', 'ie 9', 'ie 8'))//Ajouter automatiquement les préfixes CSS3
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destination + '/assets/css/'))
    .pipe(browserSync.reload({stream: true}));
});

//Comment exécuter cette tâche ? Tapez simplement : gulp jade
gulp.task('jade', function(){
    return gulp.src(source + '/html/*.jade')
    .pipe(plugins.jade({
        pretty: true
    }))
    .pipe(gulp.dest(destination))
});

//Comment exécuter cette tâche ? Tapez simplement : gulp minify
gulp.task('minify', function() {
    return gulp.src(destination + '/assets/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(plugins.csso())//minification le css
    .pipe(plugins.rename({
        suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destination + '/assets/css/'));
});

// Static Server + watching scss/html files
gulp.task('serve',function() {

    browserSync.init({
        server: "dist",
        notify: true,
        port: 8001,
        open: "local",
        startPath: "index.html"
    });

    gulp.watch(source + '/assets/css/**/*.scss', ['build']).on('change', browserSync.reload);
   // gulp.watch(destination + '/index.html', ['build']).on('change', browserSync.reload);
   gulp.watch(source + '/html/**/**/*.jade', ['build']).on('change', browserSync.reload);
});

//Tâche "build"
gulp.task('build', ['css', 'jade', 'serve']);

//Tâche "prod" = build + minify
gulp.task('prod', ['build', 'minify']);

//Tâche par défaut
gulp.task('default', ['build']);