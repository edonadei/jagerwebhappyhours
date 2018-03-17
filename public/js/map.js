var map;
var position;
var distance;
var magasin;

var coordinates = document.getElementById('coords').innerHTML;
var coordinatesarray = coordinates.split(',');

console.log(parseFloat(coordinatesarray[0]));
console.log(parseFloat(coordinatesarray[1]));

//var b = new L.LatLng(49.246568, 1.4192000000000462);
var b = new L.LatLng(parseFloat(coordinatesarray[0]),parseFloat(coordinatesarray[1]));


function init() {
   map = new L.Map('map');
   L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
   }).addTo(map);
   map.attributionControl.setPrefix(''); 
   map.setView(new L.LatLng(parseFloat(coordinatesarray[0]),parseFloat(coordinatesarray[1])), 13);
   magasin = L.marker(b).addTo(map);
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

// Autocomplete google adress

      // This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var placeSearch, autocomplete;
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
      }

      function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }
      }

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }


