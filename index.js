const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');


const app = express();
require('dotenv').config();

const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', async (req, res) => {
    res.render('index');
});

app.get('/test', async (req, res) => {
    res.render('test');
});

app.post('/api', async (req, res) => {
    res.render('api');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
