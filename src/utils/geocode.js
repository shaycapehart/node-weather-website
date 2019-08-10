const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYnJpY2tzOTYiLCJhIjoiY2p6NHRqejFlMGh3ZDNnbWV3Z2x6eWZ6ZSJ9.6BsH1CmcvlNKlrWX88PLHA&limit=1'
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to google geocoding service!', undefined)
    }
    else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    }
    else {
      console.log(body.features[0])
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      }
      callback(undefined, data)
    }
  })
}

module.exports = geocode