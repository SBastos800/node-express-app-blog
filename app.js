const express = require('express');

const app = express();

//setting up a view engine
app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blogs/create', (req, res) => {
    res.render('create');
})

//404 page, it should be the last one 

app.use((req, res) => {
    res.status(404).render('404');
});