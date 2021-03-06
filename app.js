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
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
   res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', { title: 'All blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) =>{
            console.log(err);
        })
})



app.get('/blogs/:id([0-9a-f]{24})', (req, res) => {
    const id = req.params.id;
    //console.log(id);
    Blog.findById(id)
        .then(result => {
        res.render('details', { blog: result, title: 'Blog Details'});
        })
        .catch(err => {
            console.log(err);
        });
})

app.delete('/blogs/:id([0-9a-f]{24})', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'});
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
})

//404 page, it should be the last one 

app.use((req, res) => {
    res.status(404).render('404', {title: '404 page not found'});
});