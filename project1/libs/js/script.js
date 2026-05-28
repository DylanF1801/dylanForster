// ---------------------------------------------------------
// GLOBAL DECLARATIONS
// ---------------------------------------------------------

var map;

// tile layers

var streets = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
  }
);

var satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  }
);

var basemaps = {
  "Streets": streets,
  "Satellite": satellite
};


/*document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('hide.bs.modal', () => {
    document.activeElement.blur();
  });
});*/

// buttons

var infoBtn = L.easyButton('<i class="fa-solid fa-circle-info"></i>', function (btn, map) {
  $("#countryInfoModal").modal("show");
});

var weatherBtn = L.easyButton('<i class="fa-solid fa-cloud"></i>', function (btn, map) {
  $("#weatherModal").modal("show");
});

var currencyBtn = L.easyButton('<i class="fa-solid fa-coins"></i>', function (btn, map) {
  $("#currencyModal").modal("show");
});

var markerBtn = L.easyButton('<i class="fa-solid fa-map-marker-alt"></i>', function (btn, map) {
  $("#markerModal").modal("show");
});

var newsBtn = L.easyButton('<i class="fa-solid fa-newspaper"></i>', function (btn, map) {
  $("#newsModal").modal("show");
});

// ---------------------------------------------------------
// EVENT HANDLERS
// ---------------------------------------------------------

// initialise and add controls once DOM is ready

$(document).ready(function () {
  
  map = L.map("map", {
    layers: [streets]
  }).setView([54.5, -4], 6);

  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) { // Check if geolocation is available in the browser
        var lat = position.coords.latitude;
        var lng = position.coords.longitude; // Get the user's latitude and longitude
        map.setView([lat, lng], 10); // Set the map view to the user's location with a zoom level of 10
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    };

  // setView is not required in your application as you will be
  // deploying map.fitBounds() on the country border polygon
  

  layerControl = L.control.layers(basemaps).addTo(map);

  let borderLayer = null; // Declare a variable to hold the border layer

  // AJAX request to get country data
  $("#countrySelect").click(function () {
    $.ajax({
      url: '../libs/php/getCountry.php', 
      type: 'GET',
      dataType: 'json',
        success: function(response) {
        if (response.status.code === "200") {
          let dropDown = $('#countrySelect'); // Select the dropdown element by its ID
          dropDown.empty(); // Clear any existing options in the dropdown
          dropDown.append('<option value="" disabled selected>Select a Country</option>'); // Append a default option to prompt the user to select a country

          // Access the 'data' property of the response
          response.data.forEach(country => { // Loop through each country in the data array
            dropDown.append(`<option value="${country.iso_a2}">${country.name}</option>`); // Append an option element to the dropdown for each country, using the ISO code as the value and the country name as the display text
          });

          // Return borders of the selected country to the map
          $("#countrySelect").change(function () {
            let selectedCountry = $(this).val(); // Get the value of the selected option in the dropdown
            let countryData = response.data.find(country => country.iso_a2 === selectedCountry);
            if(countryData) {
              if (borderLayer) {
                map.removeLayer(borderLayer); // Remove the existing border layer from the map if it exists
              }
              borderLayer = L.geoJSON(countryData.geometry, {
                style: {
                  color: 'red', // Set the border color to green
                  weight: 3, // Set the border weight to 3
                  fillColor: 'red', // Set the fill color to green
                  fillOpacity: 0.2 // Set the fill opacity to 0.2 for a semi-transparent effect
                }
              }).addTo(map); // Create a new GeoJSON layer with the selected country's geometry and add it to the map
              map.fitBounds(borderLayer.getBounds()); // Fit the map view to the bounds of the new border layer
            }
          });
      }},
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
      }
    });
  });

  // add buttons to map

  infoBtn.addTo(map);
  weatherBtn.addTo(map);
  currencyBtn.addTo(map);
  markerBtn.addTo(map);
  newsBtn.addTo(map);
});




