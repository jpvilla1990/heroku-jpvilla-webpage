const express = require('express');
const app = express();
const hbs = require('hbs');
const get = require('./modules/get.js');

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

app.get('/googleMapsResp', (req, res) => {

    //requerir coordenadas de la direccion y el clima
    direccion = req.query.direccion;

    let clima = get.clima(direccion)
        .then(resp => {
            console.log(`En la ciudad de ${resp.direccion} con latitud: ${resp.latitud} y longitud: ${resp.longitud} hay una temperatura promedio de ${resp.temperatura} con un maximo de ${resp.tempMax} y un minimo de ${resp.tempMin}`);

            res.render('googleMapsResp', {
                nombre: 'Google Maps',
                direccion: resp.direccion,
                latitud: resp.latitud,
                longitud: resp.longitud,
                temperatura: resp.temperatura,
                tempMax: resp.tempMax,
                tempMin: resp.tempMin


            });

        })
        .catch(e => { return e });




})

app.get('/googleMapsInput', (req, res) => {

    res.render('googleMapsInput', {
        nombre: 'Google Maps',
    });
})


app.listen(port, () => {
    console.log('Escuchando peticiones en el puerto ', port);
})