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
    res.status(200).render('home.ejs',{pageTitle: 'Finance Club IITP | Home', path:'/'});
    next();
});
app.get("/resources", (req, res, next) => {
    res.status(200).render('resources.ejs',{pageTitle: 'Finance Club IITP | Resources', path:'/resources'});
    next();
});
app.get("/events", (req, res, next) => {
    res.status(200).render('events.ejs',{pageTitle: 'Finance Club IITP | Events', path:'/events'});
    next();
});
app.get("/team", (req, res, next) => {
    res.status(200).render('team.ejs',{pageTitle: 'Finance Club IITP | Team', path:'/team'});
    next();
});

app.listen(port, () => console.log (`Server running on port ${port} 🔥`));