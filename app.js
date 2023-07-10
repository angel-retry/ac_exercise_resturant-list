const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.send('restaurants listing')
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  res.send(`read list is ${id}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})