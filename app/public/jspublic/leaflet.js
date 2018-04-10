window.addEventListener('load',init);

var map;
var position;
var distance;
var magasin;

function init() {
    if (!document.getElementById('coords')){
        return;
      }

    var coordinates = document.getElementById('coords').innerHTML;
    var coordinatesarray = coordinates.split(',');
    magasin = new L.LatLng(parseFloat(coordinatesarray[0]),parseFloat(coordinatesarray[1]));
    map = new L.Map('map');
    L.tileLayer('https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=cf25d3ea837f4645b79eb5559281ba3a', {
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
    map.attributionControl.setPrefix(''); 
    map.setView(new L.LatLng(parseFloat(coordinatesarray[0]),parseFloat(coordinatesarray[1])), 15);
    magasin_m = L.marker(magasin).addTo(map);
    magasin_m.bindPopup('<a href="https://www.google.fr">Decouvrir la page du magasin !</a>');
}

function onLocationFound(e) {
    var location = e.latlng;
   position = L.marker(location,{title: 'Votre position'}).addTo(map);
   var affichage_m = [magasin, location]; //permet d'afficher entre la position et le magasin 
   var bounds = new L.LatLngBounds(affichage_m);
   map.fitBounds(bounds);
   distance = (location.distanceTo(magasin) / 1000);
   if (distance < 10)
   {
      alert ("La distance entre votre position et le magasin est de : " + distance + " km");
   }
   else 
   {
      alert("Ce magasin n'est pas fait pour vous !");
   }
}

function onLocationError(e) {
   alert(e.message);
}


function getLocationLeaflet() {
   map.on('locationfound', onLocationFound);
   map.on('locationerror', onLocationError);

   map.locate({setView: true, maxZoom: 16});
}



/*

Algo pour faire apparaitre le bon nombre de marker en fonction de la base de donnée 

for (var i = 0; i < planes.length; i++) {
marker = new L.marker([planes[i][1],planes[i][2]])
.bindPopup(planes[i][0])
.addTo(map);
}

*/