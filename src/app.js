const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const layoutsPath = path.join(__dirname,'../templates/layouts')

// Setup handlebars engine and views location
app.engine( 'hbs', exphbs( {
  extname: 'hbs',
  viewsPath: viewsPath,
  layoutsDir: layoutsPath,
  partialsDir: partialsPath
}));
app.set('view engine', 'hbs')
app.set('views', viewsPath)



// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get tells the server what to do when an outside user makes a 'GET' request
app.get('', (req, res) => {
  res.render('index', {
    layout: 'layout',
    page: 'home',
    title: 'Weather',
    name: 'Shay Capehart'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    layout: 'layout',
    title: 'Help',
    name: 'Shay Capehart',
    message: 'Find answers to your questions here.'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layout',
    title: 'About Me',
    name: 'Shay Capehart'
  })
})

app.get('/playground', (req, res) => {
  res.render('playground', {
    layout: 'layout',
    page: 'playground',
    title: 'About Me',
    name: 'Shay Capehart'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    } 
    console.log(location)
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error })
      } 
      res.send({ 
        location, 
        forecast
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    layout: 'layout',
    template: 'home-template',
    title: '404',
    name: 'Shay Capehart',
    errorMessage: 'Help article not found!'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    layout: 'layout',
    template: 'home-template',
    title: '404',
    name: 'Shay Capehart',
    errorMessage: 'Page not found!'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
