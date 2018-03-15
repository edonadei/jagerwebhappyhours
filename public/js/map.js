var map;
var position;
var distance;
var magasin;

var coordinates = document.getElementById('coords').innerHTML;
console.log(coordinates);

//var b = new L.LatLng(49.246568, 1.4192000000000462);
var b = new L.LatLng(coordinates);

function init() {
   map = new L.Map('map');
   L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
   }).addTo(map);
   map.attributionControl.setPrefix(''); 
   map.setView(new L.LatLng(48.856614, 2.3522219000000177), 13);
}

function onLocationFound(e) {
   var location = e.latlng;
   position = L.marker(location,{title: 'Votre position'}).addTo(map);
   magasin = L.marker(b).addTo(map);
   magasin.bindPopup('<a href="https://www.google.fr">Decouvrir la page du magasin !</a>');
   distance = (location.distanceTo(b) / 1000);
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

// Algo pour faire apparaitre le bon nombre de marker en fonction de la base de donnée 

for (var i = 0; i < planes.length; i++) {
marker = new L.marker([planes[i][1],planes[i][2]])
.bindPopup(planes[i][0])
.addTo(map);
}

*/


