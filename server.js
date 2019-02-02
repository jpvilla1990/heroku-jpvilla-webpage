const express = require('express');
const app = express();
const hbs = require('hbs');

require('./hbs/helpers');

const port = process.env.PORT || 8080;



app.use(express.static(__dirname + '/public'));

// express HBS engine

hbs.registerPartials(__dirname + '/views/parciales');



app.set('view engine', 'hbs');

// helper






app.get('/', (req, res) => {


    res.render('home', {
        nombre: 'juan pablo'

    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        nombre: 'Cintya'

    });
})


app.listen(port, () => {
    console.log('Escuchando peticiones en el puerto ', port);
})