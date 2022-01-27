const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');
const port = process.env.PORT || 5000 ;
app.get("/", (req, res, next) => {
    res.status(200).render('home.ejs',{pageTitle: 'Home', path:'/'});
    next();
});
app.get("/events", (req, res, next) => {
    res.status(200).render('events.ejs',{pageTitle: 'Events', path:'/events'});
    next();
});
app.get("/team", (req, res, next) => {
    res.status(200).render('team.ejs',{pageTitle: 'Team', path:'/team'});
    next();
});
app.get("/contact", (req, res, next) => {
    res.status(200).render('contact.ejs',{pageTitle: 'Contact', path:'/contact'});
});

app.listen(port, () => console.log (`Server running on port ${port} 🔥`));