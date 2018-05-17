window.addEventListener('load',init);

var map;
var position;
var distance;
var magasin;

function init() {
    
    if (!document.getElementsByClassName('index')){
        return;
      }
      location = e.LatLng;
      console.log(location);
      sortEventsByLocations(location,events);
      //sortEventsByTime(currenttime,events);
}

function sortEventsByLocations(location,events) 
{
  var eventsbylocations, magasin;
  for (var i = 0; i < events.length; i++) {
    magasin = new L.LatLng(parseFloat((events[i].latitude)),parseFloat((events[i].longitude)));
    distance = location.distanceTo(magasin)/1000;
    events[i].dist = distance;
    // Si le tableau est nul
    if (eventsbylocations == null){
      eventsbylocations.push(events[i]);
    } else if (events[i].distance < eventsbylocations[0]){
      // Ajout au début du tableau
      eventsbylocations.unshift(events[i]);
    } else if (events[i].distance > eventsbylocations[0]){
        // Comparer au suivant, puis au suivant, jusqu'à trouver un plus grand ou pas
        for (var i = 1; i < eventsbylocations.length; i++){
            if (events[i].distance > eventsbylocations[0]){
                // On fait rien on laisse incrémenter
            } else if (events[i].distance <= eventsbylocations[0]){
                eventsbylocations.splice(i,0,events[i]);          
            }
        }
        //Ajout à la fin d'un tableau
        eventsbylocations.push(events[i]);
      }
    } 
    alert(eventsbylocations);
}

function sortEventsByTime(currenttime,events) 
{
  var eventsbytime;
  for (var i = 0; i < events.length; i++) {

  } 
    return eventsbylocations;
}