const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const ShortUrl = require('./models/ShortUrl');

//Set up mongoose connection
var mongoDB =
  'mongodb://rifandani:rifandani@cluster0-shard-00-00-rqaap.mongodb.net:27017/url_shortener?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primaryPreferred&appname=MongoDB%20Compass&ssl=true';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find();

  res.render('index', { shortUrls: shortUrls });
});
app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({
    full: req.body.fullUrl,
  });

  res.redirect('/');
});
app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server berjalan di port ${port}`));
