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

const controllers = require('./controllers');
app.get('/', controllers.home);
app.get('/orders', controllers.orderList)
app.get('/orders/:orderType', controllers.orderDetails);


app.get('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});

server.listen(PORT, () => {
    console.log(`Aw yiss. Go to: http://localhost:${PORT}`)
});