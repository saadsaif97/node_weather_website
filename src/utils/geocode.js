const axios = require('axios')

async function geocode(city, callback) {
  try {
    let response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        city
      )}.json`,
      {
        params: {
          access_token:
            'pk.eyJ1Ijoic2FhZHNhaWYiLCJhIjoiY2tqcG41NmFnMGdkajJzcDVuaHF5MXU3eSJ9.qWvqiJyTsuEOCBBBaEBV5w',
          limit: '1',
        },
      }
    )
    if (response == undefined) {
      callback('Unable to connect to the server :/', undefined)
    } else if (response.data.features.length == 0) {
      callback('Please enter the correct city name', undefined)
    } else {
      const coordinates = response.data.features[0].geometry.coordinates
      const place_name = response.data.features[0].place_name
      const info = {
        latitude: coordinates[1],
        longitude: coordinates[0],
        place_name,
      }
      callback(undefined, info)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = geocode
