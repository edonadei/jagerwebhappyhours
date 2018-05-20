window.addEventListener('load',init);

var map, position, distance, magasin, eventscontent, events, datetime;
var currentdate = new Date(); 

function init() {
    
    if (!document.getElementById('stringify')){
        return;
      }
      // On récupère l'objet évènement en Json
      eventscontent = document.getElementById('stringify').innerHTML;
      // On le retransforme en object javascript
      events = JSON.parse(eventscontent)
      // On récupère la date actuelle
      datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
}

function sortEventsByLocations2(location,events) 
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

function onLocationFound(e,events){
var location = e.latlng;
      position = L.marker(location,{title: 'Votre position'}).addTo(map);
      location = e.LatLng;
      sortEventsByLocations(location,events);
}

function sortEventsByLocations(location,eventscontentobject) 
{
  var eventsbylocations, magasin;
  for (var i = 0; i < events.length; i++) {
    magasin = new L.LatLng(parseFloat((events[i].latitude)),parseFloat((events[i].longitude)));
    distance = location.distanceTo(magasin)/1000;
    events[i].dist = distance;
    eventsbylocations.push(events[i]);
  }

  eventsbylocations.sort(function(a, b) {
    return a - b;
  });

 alert(eventsbylocations);
}

function sortEventsByTime(currenttime,events) 
{
  var eventsbytime;
  for (var i = 0; i < events.length; i++) {

  } 
    return eventsbylocations;
}