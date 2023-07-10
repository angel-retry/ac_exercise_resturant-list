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

//搜尋結果 route設定
app.get('/search', (req, res) => {
  //使用query抓取keyword值
  const keyword = req.query.keyword?.trim() //搜尋關鍵字左右兩側空白使用trim()省略
  //matchedRestaurants的值接收搜尋結果
  //使用?來判斷keyword有無值決定以下執行指令
  //使用filter回傳查詢結果
  const matchedRestaurants = keyword ? restaurants.filter( restaurant =>
    //使用Object可抓取resturant Obj的屬性
    //使用some設定條件判斷是否能通過，才可繼續下面指令
    Object.values(restaurant).some( property => {
      if(typeof property === 'string') {
        //屬性為string，可繼續以下指令，並return以下結果
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : restaurants
  
  //判斷matchedRestaurants有無值(是否有查詢結果)
  if(matchedRestaurants.length) {
    //有結果，顯示結果
    res.render('index', {restaurants: matchedRestaurants, keyword})
  } else {
    //沒結果，顯示無此結果
    res.render('notFound', {keyword})
  }
  

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})