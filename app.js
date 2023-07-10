const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000

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
  res.send('restaurants listing')
})

//restaurants清單detail route設定
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  res.send(`read list is ${id}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})