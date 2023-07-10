const express = require('express')
const app = express()
const port = 3000

//載入static files
app.use(express.static('public'))

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