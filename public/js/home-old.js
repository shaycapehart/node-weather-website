const search = document.getElementById("pac-input");
const locationAddress = document.getElementById("locationAddress");
const locationForecast = document.getElementById("locationForecast");

function initAutocomplete() {
  var searchBox = new google.maps.places.Autocomplete(search);
  searchBox.setFields(["formatted_address", "geometry"]);

  // Create streatview element
  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById("street-view"),
    {
      position: { lat: 37.86926, lng: -122.254811 },
      pov: { heading: 165, pitch: 0 },
      zoom: 1
    }
  );

  searchBox.addListener("place_changed", function() {
    var place = searchBox.getPlace();

    if (!place) {
      console.log("No place found!");
      return;
    }
    console.log(place);
    panorama.setPosition(place.geometry.location);

    fetch("/weather?address=" + place).then(response => {
      response.json().then(data => {
        if (data.error) {
          locationAddress.textContent = data.error;
        } else {
          locationAddress.textContent = data.location;
          locationForecast.textContent = data.forecast;
          // unhideElement(locationCard)
        }
      });
    });
  });
}
