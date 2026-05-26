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

var infoBtn = L.easyButton('<i class="fa-solid fa-circle-info fa-xl"></i>', function (btn, map) {
  $("#countryInfoModal").modal("show");
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
      }, function(error) {
        console.error("Error getting user location:", error);
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }

  // setView is not required in your application as you will be
  // deploying map.fitBounds() on the country border polygon

  layerControl = L.control.layers(basemaps).addTo(map);

  infoBtn.addTo(map);

});

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
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Error: " + textStatus);
    }
  });
});
