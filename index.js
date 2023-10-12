const express = require('express')
const path = require('path')
const app = express()
const PORT = 5000

// setup to call hbs 
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

// set static file server
app.use(express.static('src/assets'))

// parsing data from client
app.use(express.urlencoded({ extended: false }))

// routing
app.get('/', home)
app.get('/testimonial', testimonial)
app.get('/contact-me', contactme)
app.get('/blog', blog)
app.get('/blog-detail/:id', blogDetail) //url params
app.get('/addblog', formblog)
app.post('/addblog', addblog)

// example render template html without template engine
app.get('/testes', (req, res) => {
  const filePath = path.resolve(__dirname, 'src/views/testimonial.html');
  res.sendFile(filePath);
})


// local server
app.listen(PORT, () => {
  console.log("Server running on port 5000");
})

function home(req, res) {
  res.render('index')
}

function testimonial(req, res) {
  res.render('testimonial.html')
}

function contactme(req, res) {
  res.render('contact-me')
}

function blog(req, res) {
  res.render('blog')
}

function blogDetail(req, res) {
  const { id } = req.params
  // const id = req.params.id

  const data = {
    id,
    title: "Saya adalah peminat nomor one piece",
    content: "REPUBLIKA.CO.ID, JAKARTA -- Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir. Khusus di sektor teknologi yang berkembang pesat, menurut Kemendikbudristek, Indonesia kekurangan sembilan juta pekerja teknologi hingga tahun 2030. Hal itu berarti Indonesia memerlukan sekitar 600 ribu SDM digital yang memasuki pasar setiap tahunnya."
  }

  res.render('blog-detail', { data })
}

function formblog(req, res) {
  res.render('add-blog')
}

function addblog(req, res) {
  const { title, content } = req.body
  // const title = req.body.title
  // const content = req.body.content
  console.log(title);
  console.log(content);
}