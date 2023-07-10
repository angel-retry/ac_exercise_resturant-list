const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000

const restaurants = require('./public/jsons/restaurant.json').results

//載入static files
app.use(express.static('public'))

//載入hbs，view engine設定
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


//首頁route設定
app.get('/', (req, res) => {
  res.redirect('/restaurants') //導向restaurants
})

//restaurants清單 route設定
app.get('/restaurants', (req, res) => {
  res.render('index', {restaurants})
})

//restaurants清單detail route設定
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === id)
  res.render('show', {restaurant})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})