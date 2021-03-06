


const commands = require('./commands');



/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista LISTO
    - Alta y Baja de Albums LISTO
    - Alta y Baja de tracks LISTO

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album LISTO

    - Busqueda de canciones intepretadas por un determinado artista listo
    - Busqueda de canciones por genero LISTO

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function main() {

  //console.log('arguments: ');
  //process.argv.forEach(argument => /*console.log(argument) */    commands.executeIfExists(argument,process.argv)  );
  commands.executeIfExists(process.argv);
}


main();




