const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

//connect to Mongo DB
const dbURI = 'mongodb+srv://Blog-Kitchen:KitchenPractice2020@cluster0.yyidb.mongodb.net/Blog-Kitchen?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//setting up a view engine
app.set('view engine', 'ejs');


//static files
app.use(express.static('public'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'My new Blog',
        snippet: 'About my new blog',
        body: 'Hello, this is my new blog about the most amazing recipe for friday night'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
            
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) =>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('5f512845a383a4225434336b')
        .then((result) =>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        })
})

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