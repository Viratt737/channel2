const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require("path");
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const ejsMate = require("ejs-mate");
const News = require('./models/news.js');
const Sports = require('./models/sports.js');
const Techs = require('./models/techs.js');
const Finances = require('./models/finances.js');
const Medias = require('./models/medias.js');
const Cultures = require('./models/cultures.js');
const Gamings = require('./models/gamings.js');
const Travels = require('./models/travels.js');
const Latests = require('./models/latests.js');


const models = {
    news: News,
    sports: Sports,
    techs: Techs,
    finances: Finances,
    medias: Medias,
    cultures: Cultures,
    gamings:Gamings,
    travels:Travels,
    latests:Latests
};

// Connect to MongoDB
mongoose.connect('mongodb://localhost/Channel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

// Routes
app.use('/user', userRoutes);
app.use('/post', postRoutes);

// Main Page Route 
app.get("/", (req, res) => {
    res.render("main.ejs");
})

// Home page route (displaying news articles)
app.get('/api', async (req, res) => {
    const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=511126fc6a2d420fb4f2d10c58109a9b';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.render('index', { news: data.articles, user: req.session.user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching news');
    }
});

// show route-news
app.get("/api/news", async (req, res) => {
    const allnews = await News.find({});
    res.render('show', { allnews });
});

// show route-sports
app.get("/api/sports", async (req, res) => {
    const allnews = await Sports.find({});
    res.render('show', { allnews });
});

// show route-tech
app.get("/api/techs", async (req, res) => {
    const allnews = await Techs.find({});
    res.render('show', { allnews });
});

// show route-media
app.get("/api/medias", async (req, res) => {
    const allnews = await Medias.find({});
    res.render('show', { allnews });
});

// show route-finance
app.get("/api/finances", async (req, res) => {
    const allnews = await Finances.find({});
    res.render('show', { allnews });
});

// show route-Culture
app.get("/api/cultures", async (req, res) => {
    const allnews = await Cultures.find({});
    res.render('show', { allnews });
});

// show route-Gaming
app.get("/api/gamings", async (req, res) => {
    const allnews = await Gamings.find({});
    res.render('show', { allnews });
});

// show route-Travel
app.get("/api/travels", async (req, res) => {
    const allnews = await Travels.find({});
    res.render('show', { allnews });
});

// show route-Latest
app.get("/api/latests", async (req, res) => {
    const allnews = await Latests.find({});
    res.render('show', { allnews });
});

// Create POSt Route
app.get("/api/create", async (req, res) => {
    res.render("create");
})

app.post("/api/create", async (req, res) => {
    const { category, title, heading, url, description } = req.body;
    console.log(category, title, heading, url, description);

    const Model = models[category.toLowerCase()];
    // Create a new instance of the appropriate model
    const newRecord = new Model({
        title,
        heading,
        description,
        image:{
            url,
            filename: "newslisting"
        }
    });

    await newRecord.save();
    console.log("Saved success");
    res.render('index');
})

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});