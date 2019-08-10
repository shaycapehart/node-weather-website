const weatherForm = document.querySelector('form')
const addressInput = document.getElementById('autocomplete_search')

document.addEventListener('DOMContentLoaded', () => {
  var autocomplete = new google.maps.places.Autocomplete(addressInput)
  autocomplete.setFields(['formatted_address'])
})

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  fetch('/weather?address=' + addressInput.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        document.getElementById('location').innerHTML = data.location
        document.getElementById('forecast').innerHTML = data.forecast
        document.getElementById('streetView').src = 'https://www.google.com/maps/embed/v1/streetview?location=' + data.latitude + ',' + data.longitude + '&key=AIzaSyC8Es9ghSwn5wbgoRqRiR6CeniIUF4xN1E'
        document.getElementById("forecastCard").style.display = 'block'
      }
    })
  })
})