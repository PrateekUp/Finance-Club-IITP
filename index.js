const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const session = require('express-session')
const flash = require('connect-flash')

app.use(
  session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true,
  })
)

app.use(flash())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', 'views')

const port = process.env.PORT || 5000

app.get('/', (req, res, next) => {
  res.status(200).render('home.ejs', {
    pageTitle: 'Finance Club IITP | Home',
    path: '/',
    message: req.flash('message'),
  })
  next()
})

app.post('/', async (req, res) => {
  const { name, email, message } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: 'finclubiitp.noreply@gmail.com',
      pass: 'finclubiitp@2022',
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  try {
    let info = await transporter.sendMail({
      from: `"${name}" finclubiitp.noreply@gmail.com`,
      to: 'fin_club@iitp.ac.in',
      subject: name,
      html: `<h3>${name}</h3><h4>${email}</h4><p>${message}</p>`,
    })

    if (info.messageId) {
      console.log('Mail received successfully')
      req.flash('message', 'Mail received successfully')

      let confirm = await transporter.sendMail({
        from: '"Finance Club IIT Patna" finclubiitp.noreply@gmail.com',
        to: email,
        subject: 'Finance Club IIT Patna',
        html: `<h3>Dear, ${name}</h3>
        <p>Thanks for writing us. We will reach you soon.<br>
        <b>Contact us at : </b>fin_club@iitp.ac.in</p><br>
        <small>This is auto generated email, Please don't reply</small>`,
      })

      if (confirm.messageId) {
        console.log('Confirmation mail sent successfully')
      }
    }
  } catch (error) {
    console.log('Internal server error, please try again')
    req.flash('message', 'Internal server error, please try again')
  }

  res.redirect('/')
})

app.get('/resources', (req, res, next) => {
  res.status(200).render('resources.ejs', {
    pageTitle: 'Finance Club IITP | Resources',
    path: '/resources',
  })
  next()
})
app.get('/events', (req, res, next) => {
  res.status(200).render('events.ejs', {
    pageTitle: 'Finance Club IITP | Events',
    path: '/events',
  })
  next()
})
app.get('/team', (req, res, next) => {
  res.status(200).render('team.ejs', {
    pageTitle: 'Finance Club IITP | Team',
    path: '/team',
  })
  next()
})

app.listen(port, () => console.log(`Server running on port ${port} 🔥`))
