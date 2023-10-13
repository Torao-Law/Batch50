const express = require('express')
const path = require('path')
const data = require('./src/mocks/blogs.json')
// const data2 = require('./src/mocks/blogs.js')
// const fetchData = require('./src/config/api')
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
app.get('/delete-blog/:id', deleteBlog)
app.get('/addblog', formblog)
app.post('/addblog', addblog)

// async function getData() {
//   let fetchdatafromapi = await fetchData()
//   console.log(fetchdatafromapi);
// }
//  getData()

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
  res.render('testimonial')
}

function contactme(req, res) {
  res.render('contact-me')
}

function blog(req, res) {
  // console.log(data2);
  res.render('blog', { blogs: data })
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

  console.log(title);
  console.log(content);

  const data = {
    title,
    content,
    author: "Rebbecca Eltra",
    postedAt: new Date()
  }

  // blogs.push(data) => add an element last element
  data.unshift(data) // add an element first element

  res.redirect('/blog')
}

function deleteBlog(req, res) {
  const { id } = req.params
  console.log(id);

  data.splice(id, 1)
  res.redirect('/blog')
}
