const express = require('express')
const path = require('path')
const app = express()
const PORT = 5000
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const upload = require('./src/middlewares/uploadFile')
// const { blog } = require('./src/models')

const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require("sequelize")
const sequelize = new Sequelize(config.development)

// setup to call hbs 
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

// set static file server
app.use(express.static('src/assets'))
app.use(express.static('src/uploads'))

// parsing data from client
app.use(express.urlencoded({ extended: false }))

// setup flash
app.use(flash())

// setup session express
app.use(session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 2
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: 'dandiganteng'
  })
)

// routing
app.get('/', home)
app.get('/testimonial', testimonial)
app.get('/contact-me', contactme)
app.get('/blog', blogs)
app.get('/blog-detail/:id', blogDetail) //url params
app.get('/delete-blog/:id', deleteBlog)
app.get('/addblog', formblog)
app.post('/addblog', upload.single('upload-image'), addblog)
app.get('/register', formRegister)
app.post('/register', addUser)
app.get('/login', formLogin)
app.post('/login', userLogin)

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
  res.render('index', {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}

function testimonial(req, res) {
  res.render('testimonial')
}

function contactme(req, res) {
  res.render('contact-me')
}

async function blogs(req, res) {
  try {
    const query = `SELECT blogs.id, title, image, content, blogs."createdAt", users.name AS author FROM blogs LEFT JOIN users ON blogs.author =  users.id ORDER BY blogs.id DESC`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    const data = obj.map((res) => ({
      ...res,
      isLogin: req.session.isLogin
    }))
  
  res.render('blog', { 
    blogs: data,
    isLogin: req.session.isLogin,
    user: req.session.user
  })
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
    const query =`SELECT blogs.id, title, image, content, blogs."createdAt", users.name AS author FROM blogs LEFT JOIN users ON blogs.author =  users.id WHERE blogs.id=${id}` // SELECT * FROM blogs WHERE id=5
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    const data = obj.map((res) => ({
      ...res,
    }))

    console.log(data);
    res.render('blog-detail', { blog: data[0] })
  } catch (err) {
    console.log(err);
  }
}

function formblog(req, res) {
  res.render('add-blog', {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}

async function addblog(req, res) {
  try {
    const { title, content } = req.body
    const idUser = req.session.idUser
    const image = req.file.filename
    const query = `INSERT INTO blogs (title, content, image, author, "createdAt", "updatedAt") VALUES ('${title}', '${content}', '${image}', ${idUser}, NOW(), NOW())`
    
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

// render template engine
function formRegister(req, res) {
  res.render('register')
}

// handle add user into database
async function addUser(req, res) {
  try {
    const { name, email, password } = req.body

    await bcrypt.hash(password, 10, (err, hashPassword) => {
      const query = `INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`
      
      sequelize.query(query)
    })
    res.redirect('/login')
  } catch (err) {
    throw err
  }
}

function formLogin(req, res) {
  res.render('login')
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body
    const query = `SELECT * FROM users WHERE email = '${email}'`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    if(!obj.length) {
      req.flash('danger', "user has not been registered")
      return res.redirect('/login')
    }

    await bcrypt.compare(password, obj[0].password, (err, result) => {
      if(!result) {
        req.flash('danger', 'password wrong')
        return res.redirect('/login')
      } else {
        req.session.isLogin = true,
        req.session.idUser = obj[0].id
        req.session.user = obj[0].name
        req.flash('success', ' login success')
        req.flash('danger', 'password wrong')
        return res.redirect('/')
      }
    })

  } catch (err) {
    throw err
  }
}
