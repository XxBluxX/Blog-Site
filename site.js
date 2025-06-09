/* these are variables for the imported modules*/
/*express is the web framework*/
/*body parser is what reads the form data*/
/*site is the express instance*/
const express = require('express');
const bodyParser = require('body-parser');
const site = express();

/*posts is an array to store the posted messages*/
/*post id keeps count and gives each post a unique id*/
let posts = []
let postId = 1;

/*set tells express to use the EJS templates to render HTML*/
/*use express serves files like styles.css from the public folder*/
/*use body parser parses form submissions*/
site.set('view engine', 'ejs');
site.use(express.static('public'));
site.use(bodyParser.urlencoded({extended: true}));

/*gets views/index.ejs and provides all posts*/
site.get('/', (req, res) => {
    res.render('index', { posts });
});

/*when the post form is submitted a new post object is created, it redirects back to backslash to show the updated posts*/
site.post('/add', (req, res) => {
    const post = {
        id: postId++,
        date: req.body.date,
        name: req.body.name,
        message: req.body.message
    };
    posts.push(post);
    res.redirect('/');
});

/*when the user clicks edit, using the unique id it finds the post and renders edit.ejs passing the post data to be edited*/
site.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).send('post not found.');
    res.render('edit', { post });
});

/*allows submission of the edited post and updates the post's values then redirects to the homepage*/
site.post('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        post.date = req.body.date;
        post.name = req.body.name;
        post.message = req.body.message;
    }
    res.redirect('/');
});

/*finds the post id in the array and removes it then returns to the homepage*/
site.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

/*creates a listener on port 3000*/
site.listen(3000, () => {
    console.log('server running at port 3000');
});

