const express = require('express')
const path = require('path')
const app = express()
const PORT = 5000
// const { blog } = require('./src/models')

const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require("sequelize")
const sequelize = new Sequelize(config.development)

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
app.get('/blog', blogs)
app.get('/blog-detail/:id', blogDetail) //url params
app.get('/delete-blog/:id', deleteBlog)
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
  res.render('testimonial')
}

function contactme(req, res) {
  res.render('contact-me')
}

async function blogs(req, res) {
  try {
    const query = `SELECT id, title, image, content, "createdAt" FROM blogs`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    const data = obj.map((res) => ({
      ...res,
      author: "Dandi Saputra"
    }))
  
  res.render('blog', { blogs: data })
  } catch (error) {
    console.log(error);
  }
}
// async function blogs(req, res) {
//   try {
//     const data = await blog.findAll()

//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

async function blogDetail(req, res) {
  try {
    const { id } = req.params // 5
    const query =`SELECT * FROM blogs WHERE id=${id}` // SELECT * FROM blogs WHERE id=5
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    const data = obj.map((res) => ({
      ...res,
      author: "Rebbecca Eltra"
    }))

    console.log(data);
    res.render('blog-detail', { blog: data[0] })
  } catch (err) {
    console.log(err);
  }
}

function formblog(req, res) {
  res.render('add-blog')
}

async function addblog(req, res) {
  try {
    const { title, content } = req.body
    const image = "image.png"
    const query = `INSERT INTO blogs (title, content, image, "createdAt", "updatedAt") VALUES ('${title}', '${content}', '${image}', NOW(), NOW())`
    
    await sequelize.query(query)

    res.redirect('/blog')
  } catch (error) {
    console.log(error);
  }
}

async function deleteBlog(req, res) {
  try {
    const { id } = req.params
    
    await sequelize.query("DELETE FROM blogs WHERE id =" + id)
    res.redirect('/blog')
  } catch (error) {
    console.log(error);
  }
}
