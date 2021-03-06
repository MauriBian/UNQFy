const m = require('./main')
const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const spotifyClient = require('./spotifyClient');
const spotifyInstance = new spotifyClient.SpotifyClient();
// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}



const _addArtist = function(argus){
  const unqInst = getUNQfy();
  const artistData = {
    name : parseName(argus[0]),
    country: argus[1]
  }
  try {
  unqInst.addArtist(artistData)
  saveUNQfy(unqInst)
  }
  catch(error){
    console.log(error.message)
  }
}

const _addAlbum = function(argus){
  const unqInst = getUNQfy();
  const albumData = {
    name : parseName(argus[1]),
    year: argus[2]
  }
  try{
  unqInst.addAlbum(argus[0],albumData)
  saveUNQfy(unqInst)
  }
  catch(error){
    console.log(error.message)
  }
}

const _addTrack = function(argus){
  const unqInst = getUNQfy();
  const trackData = {
    name : parseName(argus[1]),
    duration: argus[2],
    genres: argus.slice(3)
  }
  try{
  unqInst.addTrack(argus[0],trackData)
  saveUNQfy(unqInst)
  }
  catch(error){
    console.log(error.message)
  }
}

const _removeTrack = function(argus){
  const unqInst = getUNQfy();
  
  try{
    unqInst.RemoveTrack(argus[0])
    saveUNQfy(unqInst)
  }
  catch(error){
    console.log(error.message)
  }

}

const _removeAlbum = function(argus){
  const unqInst = getUNQfy();
  
  try{
    unqInst.RemoveAlbum(argus[0])
    saveUNQfy(unqInst)
  }
  catch(error){
    console.log(error.message)
  }
}

const _removeArtist = function(argus){
  const unqInst = getUNQfy();
  
  try{
  unqInst.RemoveArtist(argus[0])
  saveUNQfy(unqInst)
  }
  catch(error){
    console.log(error.message)
  }
}

const _searchSongsByArtist = function (argus){
  const unqInst = getUNQfy();
  unqInst.getTracksMatchingArtist(argus[0]).forEach ( x => console.log(x));
  saveUNQfy(unqInst);
}

const _searchSongsByGenre = function (argus){
  const unqInst = getUNQfy();
  unqInst.getTracksMatchingGenres(argus).forEach ( x => console.log(x));
  saveUNQfy(unqInst);
}

const searchArtistByName = function(artistName){
  const unqInst = getUNQfy();
  return unqInst.getArtistByName(parseName(artistName));
}

const _createPlaylist = function (argus){
  const unqInst = getUNQfy();
  unqInst.createPlaylist(argus[0],argus.slice(2), argus[1])
  saveUNQfy(unqInst);
}

const _getAllArtist = function(){
  const unqInst = getUNQfy();
  const artists = unqInst.getAllArtists();
  artists.forEach ( x => console.log(x.name));
}

const _getAllArtistAlbums = function(argus){
  const unqInst = getUNQfy();
  const albums = unqInst.getAllAlbumsOfAnArtist(argus[0]);
  albums.forEach ( x => console.log(x.name));
}

const _getAllAlbumTracks = function(argus){
  const unqInst = getUNQfy();
  const tracks = unqInst.getAllTracksOfAnAlbum(argus[0]);
  tracks.forEach ( x => console.log(x.name));
}

const _getAlbumsForArtist = function (artistName){
  try{
    const unqInst = getUNQfy();
    const albums = unqInst.getAlbumsForArtist(parseName(artistName))
    console.log(albums)
  }
  catch(error){
    console.log(error.name)
  }

  
}

const _populateAlbumsForArtist = function (artistName){

  let name = parseName(artistName.toString());
  let id = 0;
  try {
    id = searchArtistByName(name).id;
  }catch(e){
    console.log("NO existe el artista en la BD");
  }

 
   spotifyInstance.getArtistAlbums(name)
   .then ( resp => resp.items)
   .then ( items => {
      items.forEach( album => { 
        _addAlbum([id,album.name, album.release_date.substring(0,4)])
       console.log("Album agregado: " + album.name);
      });
   } )
   .catch(error =>  {
     console.log("Error al buscar el artista")
   })
  
}

const _getArtistTracks = function(argus){
    const unqInst = getUNQfy();
    try{
    const tracks = unqInst.searchArtistTracks(parseName(argus[0]))
    console.log(tracks)
    }
    catch(error){
      console.log("No se pudo realizar la busqueda de tracks del artista."+ error.message)
    }
}

const _getLyrics = function (argus){
  const unqInst = getUNQfy();
  try{
    let track = unqInst.searchTrackByName(parseName(argus[0]) )
    const promise = Promise.resolve(track.getLyrics(parseName(argus[1])))
    return promise.then((lyrics)=>{
      console.log(lyrics)
      saveUNQfy(unqInst)
    })
  }
  catch(error){
    console.log("Error al traer las lyrics. "+ error.message)
  }
}

const _searchByName = function(argus){
  const unqInst = getUNQfy();
  const elems  = unqInst.searchByName(parseName(argus[0]));
  console.log("Artistas: " );
  elems.artists.forEach (x => console.log(x));
  console.log("Albumes: " );
  elems.albums.forEach (x => console.log(x));
  console.log("Tracks: " );
  elems.tracks.forEach (x => console.log(x));
  console.log("Playlist: " );
  elems.playlists.forEach (x => console.log(x));
}

const _help = function (argus){
  console.log("- addArtist [nombre] [nacionalidad] :  Agrega un artista con su nombre y nacionalidad")
  console.log("- addTrack [albumID] [track Name] [genero1] [genero2] [genero3] ...  : Agrega un track al album ")
  console.log("- addAlbum [artist ID] [album Name] [album Year] : Agrega un album")
  console.log ("- removeArtist [artistID] : borra el artista")
  console.log ("- removeAlbum [albumID] : borra el album")
  console.log ("- removeTrack [trackID] : borra la cancion")
  console.log("- getAllArtist : Lista todos los artistas")
  console.log("- getAllArtistAlbums [artistID] : devuelve todos los albums del artista")
  console.log("- searchSongsByArtist [artistID] : devuelve todas las canciones del artista")
  console.log("- searchSongsByGenre [genero1] [genero2] ... : devuelve los tracks que sean de los generos mencionados")
  console.log("- searchByName [name]: busca tracks, artistas, playlist y albums por el nombre")
  console.log("- createPlaylist [name] [duration] [genero1] [genero2]..  : crea una playList en base a la duracionMaxima y generos elegidos")
  console.log("- getAlbumsForArtist [artistName] : devuelve todos los albums de un artista dado")
  console.log("- populateAlbumsForArtist [artistName] consulta a Spotify los albums del artista y los devuelve ")
  console.log("- getLyrics [trackName] [artistName]: devuelve las lyrics del track , actualizadas desde MusixMatch, si éstas están disponibles")
  console.log("- getArtistTracks [artistName] : devuelve un listado con los tracks que pertencen al artista")
}

const comandos = {
  addArtist  : _addArtist,
  addTrack : _addTrack,
  addAlbum : _addAlbum,
  removeArtist : _removeArtist,
  removeAlbum : _removeAlbum,
  removeTrack : _removeTrack,
  getAllArtist : _getAllArtist,
  getAllArtistAlbums : _getAllArtistAlbums,
  getAllAlbumTracks : _getAllAlbumTracks,
  searchSongsByArtist : _searchSongsByArtist,
  searchSongsByGenre : _searchSongsByGenre,
  searchByName : _searchByName,
  createPlaylist : _createPlaylist,
  getAlbumsForArtist : _getAlbumsForArtist,
  populateAlbumsForArtist : _populateAlbumsForArtist,
  help : _help,
  getLyrics : _getLyrics,
  getArtistTracks : _getArtistTracks

};

  function parseName(name){
      return name.replace(/_/g," ");
  }


  function executeIfExists(argumList){
    const posibleComando = argumList[2];
    const argumentos = argumList.slice(3, argumList.length )

        
        if ( posibleComando in comandos ){
            
            comandos[posibleComando](argumentos);
        }else{
            console.log("No existe ese comando");
        } 

  }


module.exports = {
    executeIfExists
  };

  