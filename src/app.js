import express from 'express'

const app = express()
const port = process.env.PORT || 3000

// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

// app.get('/weather', (req, res) => {
//     res.send('Your weather')
// })

// app.get('', (req, res) => {
//     // Provide HTML to render in the browser
//     res.send('<h1>Weather</h1>')
// })

// app.get('/weather', (req, res) => {
//     // Provide an object to send as JSON
//     res.send({
//     forecast: 'It is snowing',
//     location: 'Philadelphia'
//     })
// })

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

// Define paths for Express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


//home page
app.get('', (req, res) => {
  res.render('index', {
  title: 'Weather',
  })
})

//help page
app.get('/help', (req, res) => {
  res.render('help', {
    helpText : "hellllllllp"
  });
});

//about page
app.get('/about', (req, res) => {
  res.render('about',{
    name : "rashwaaan"
  });
});


app.get('/weather', (req, res) => {
  if (!req.query.address) {
      return res.send({
          error: 'You must provide an address!'
      })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
          return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
              return res.send({ error })
          }

          res.send({
              forecast: forecastData,
              location,
              address: req.query.address
          })
      })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
  title: '404',
  errorMessage: 'Page not found.'
  })
 })


 app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
