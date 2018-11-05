sass Compiler SASS vers CSS <br/>
csscomb Réordonner les propriétés <br/>
cssbeautify Ré-indenter et reformater <br/>
autoprefixer Ajouter automatiquement les préfixes CSS3 <br/>
csso minifier le css <br/>
browser-sync Static Server + watching scss/html files <br/>
jade Compiler JADE vers HTML <br/>

Tâche "build" ['css', 'jade', 'serve']);

Tâche "prod" = build + minify ['build', 'minify']);

Tâche par défaut ['build']);
