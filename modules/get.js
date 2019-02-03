const axios = require('axios');

const getLugLatLon = async(URL) => {

    let encodedUrl = encodeURI(URL);

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=AIzaSyB_fGbZ90mfNYYX_zpq9j1XzlAimZEfNao`)

    if (resp.data.status === "ZERO_RESULTS") {
        throw new Error(`No hay resultados para la ciudad ${direccion}`);
    }




    let results = resp.data.results[0];

    let direccion = results.formatted_address;

    let coordinates = results.geometry.location;

    let lat = coordinates.lat;
    let lng = coordinates.lng;






    return {
        direccion: direccion,
        lat: lat,
        lng: lng
    }
}



const clima = async(direccion) => {

    let error = '';
    let locationLngLat;

    let result = await getLugLatLon(direccion)
        .then(resp => {
            locationLngLat = resp;
            //console.log(resp.direccion);
            // console.log(resp.lat);
            //console.log(resp.lng);
        })
        .catch(e => error += e);




    let clima = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationLngLat.lat}&lon=${locationLngLat.lng}&units=metric&appid=bad61c8098ff8739581a874fe9ebacbf`)
        .then(resp => { return resp })
        .catch(e => { error += e });



    if (error != '') {
        console.log(error);
        throw new Error(error);
    }

    let main_temp = clima.data.main;



    return {
        direccion: locationLngLat.direccion,
        latitud: locationLngLat.lat,
        longitud: locationLngLat.lng,
        temperatura: main_temp.temp,
        tempMax: main_temp.temp_max,
        tempMin: main_temp.temp_min


    }

}




module.exports = {
    getLugLatLon,
    clima
}