const express = require('express');

const app = express();

//setting up a view engine
app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
        {title: 'spaghetti bolognese recipe', snippet:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, necessitatibus non. Dolorem, eius tempore. Obcaecati, sint. Iste aut harum quos ratione perferendis ea soluta quo sit quidem accusantium, commodi ducimus.'},
        {title: 'a quick and delicious dinner', snippet:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, necessitatibus non. Dolorem, eius tempore. Obcaecati, sint. Iste aut harum quos ratione perferendis ea soluta quo sit quidem accusantium, commodi ducimus.'},
        {title: 'a veggie recipe to start the week', snippet:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, necessitatibus non. Dolorem, eius tempore. Obcaecati, sint. Iste aut harum quos ratione perferendis ea soluta quo sit quidem accusantium, commodi ducimus.'}
    ];
    res.render('index', {title: 'Home', blogs: blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
})

//404 page, it should be the last one 

app.use((req, res) => {
    res.status(404).render('404', {title: '404 page not found'});
});