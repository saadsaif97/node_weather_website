const axios = require('axios')

async function get_weather_info(query, callback) {
  const response = await axios.get('http://api.weatherstack.com/forecast', {
    params: {
      access_key: '946d28d14f8d9684d86c0c7502cf694d',
      query: `${query}`,
    },
  })
  if (response == undefined) {
    callback(
      'Something went wrong while connecting to weather api :/',
      undefined
    )
  } else if (response.data['success'] == false) {
    console.log('Please enter valid location')
  } else {
    const current = response.data.current
    const temp = current.temperature
    const observe_time = current.observation_time
    const chance_of_rain = current.precip
    const description = current.weather_descriptions[0]
    callback(
      undefined,
      `${description}. Today is ${temp} degree and ${chance_of_rain} % chance of rain as recorded at ${observe_time}`
    )
  }
}

module.exports = get_weather_info
