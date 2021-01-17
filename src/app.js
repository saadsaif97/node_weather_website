const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const getWeatherInfo = require('./utils/get_weather_info')

const app = express()
const PORT = process.env.PORT || 3000

// define path for express config
const staticFilesDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// setting up the static files directory
app.use(express.static(staticFilesDirectory))

// setting up the handlebars engine and views folder path
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'saad_saif',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'saad_saif',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'saad_saif',
    message: 'Input your address to see the weather',
  })
})

// api
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide the address',
    })
  }

  geocode(
    req.query.address,
    (err, { latitude, longitude, place_name } = {}) => {
      //we have provided here an empty object which prevents the destructuring to break if no data was recieved, destructured values would be undefined in that case
      if (err) {
        return res.send({
          error: err,
        })
      }

      getWeatherInfo(`${latitude},${longitude}`, (err, weatherData) => {
        if (err) {
          return res.send({
            error: err,
          })
        }

        res.send({
          address: req.query.address,
          place: place_name,
          weather: weatherData,
        })
      })
    }
  )
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Opps 404 :/',
    message: 'help article not found',
    name: 'saad_saif',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Opps 404 :/',
    message: 'page not found',
    name: 'saad_saif',
  })
})

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
})
