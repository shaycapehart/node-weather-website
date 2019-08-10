const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=AIzaSyC8Es9ghSwn5wbgoRqRiR6CeniIUF4xN1E'
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to google geocoding service!', undefined)
    }
    else if (body.results.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    }
    else {
      console.log(body.results)
      const data = {
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
        location: body.results[0].formatted_address
      }
      callback(undefined, data)
    }
  })
}

module.exports = geocode