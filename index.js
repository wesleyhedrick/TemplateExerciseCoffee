const http = require('http');
const express = require('express');
const morgan = require('morgan');
const es6Renderer = require('express-es6-template-engine');

const pets = require('./pets');

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const logger = morgan('tiny');

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express.static('public'));
app.use(logger);

app.get('/', (req, res) => {
    res.render('home', {
        partials: {
            header: '/partials/header',
            footer: '/partials/footer',
        }        
    });
});

app.get('/pets', (req, res) => {
    // render a list of all pets
    // translate each pet name into:
    // <a href="/pets/Oakley">Oakley</a>

    // use .map() b/c there is 1-1 correspondence
    // between pet name and pet link (<a>)
    const petLinks = pets.map(p => `<li><a href="/pets/${p}">${p}</a></li>`).join('');
    console.log(pets);
    console.log(petLinks);
    res.render('list', {
        locals: {
            pets: petLinks,
        },
        partials: {
            header: '/partials/header',
            footer: '/partials/footer',
        }
    });
});

app.get('/pets/:name', (req, res) => {
    // Find a pet whose name matches, show just that pet
    res.render('details', {
        locals: {
            pet: req.params.name,
        },
        partials: {
            header: '/partials/header',
            footer: '/partials/footer',
        }
    });    
});

app.get('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});

server.listen(PORT, () => {
    console.log(`Aw yiss. Go to: http://localhost:${PORT}`)
});