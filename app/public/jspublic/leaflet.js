window.addEventListener('load',init);

var map;
var position;
var distance;
var magasin;

function init() {
    if (!document.getElementById('longitude')){
        return;
      }

    var latitude = document.getElementById('latitude').innerHTML;
    var longitude = document.getElementById('longitude').innerHTML;
    magasin = new L.LatLng(parseFloat(latitude),parseFloat(longitude));
    map = new L.Map('map');
    L.tileLayer('https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=cf25d3ea837f4645b79eb5559281ba3a', {
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
    map.attributionControl.setPrefix(''); 
    map.setView(new L.LatLng(parseFloat(latitude),parseFloat(longitude)), 15);
    magasin_m = L.marker(magasin).addTo(map);
   // magasin_m.bindPopup('<a href="javascript:void(0);" onclick="onLocationRouting()">Premier lien </a>');
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

   L.Routing.control({
    waypoints: [
      L.latLng(magasin),
      L.latLng(location)
    ],
    language : 'fr'
  }).addTo(map);

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