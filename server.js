const express = require('express');
const mongoose = require('mongoose');
const Url = require('./models/url');
const app = express();

const port = process.env.PORT;

const uri = process.env.DB_CONNECTION;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log("db connected")
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('index', { url: new Url() });
});

app.post('/logs', async (req, res) => {
    const urls = await Url.find().sort({ createdAt: 'desc' })
    res.json(urls);
});

app.post('/url', async (req, res) => {
    const data = {
        link: req.body.link
    }
    const urd = new Url(data);
    try {
        const url = await urd.save((e) => {
            if (e) {
                console.log(e)
            } else {
                console.log("saved")
            }
        });
        res.render('index', { url: urd });
    } catch (e) {
        res.redirect('/');
    }
});

app.get('/:slug', async(req, res) => {
    try {
        const red = await Url.findOne({ slug: req.params.slug });
        res.redirect(red.link);
    } catch (e) {
        res.redirect('/');
    }
});

app.listen(port);