const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/d3c001657fe2e56187d02b9693befbe6/' + latitude + ',' + longitude
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    }
    else if (body.error) {
      callback('Unable to find location!', undefined)
    }
    else {
      callback(undefined, body.daily.data[0].summary + ' It is currently '
        + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forecast
