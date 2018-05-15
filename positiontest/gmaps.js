const request = require('request');

module.exports.getLandmarks = (address, callback) => {

    request({
        //https://maps.googleapis.com/maps/api/place/textsearch/json?query=point+of+interest+in+canada&key=AIzaSyA5XukOn9Ji2Bl-BEFw9l-UJl2D4TaLDhM
        //url: 'http://maps.googleapis.com/maps/api/geocode/json?address=folwark%20leszcyznowka',
        url: 'https://maps.googleapis.com/maps/api/place/textsearch/json' +
            '?query=point+of+interest+in+Canada&key=AIzaSyA5XukOn9Ji2Bl-BEFw9l-UJl2D4TaLDhM',
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to Google Maps');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Cannot find landmarks');
        } else if (body.status === 'OK') {
            landmarks = [];
            for (i = 0; i < body.results.length; i++) {
                landmarks.push({
                    name: body.results[i].name,
                    address: body.results[i].formatted_address,
                    latitude: body.results[i].geometry.location.lat,
                    longitude: body.results[i].geometry.location.lng,
                    photo: body.results[i].photos
                })
            }
            locations =[]
            for (i<0;i < landmarks.length;i++){
                locations.push({lat:landmarks[i].latitude,lng:landmarks[i].longitude})
            }
        };
        //console.log(`Your requested venue: ${address}`);
        //console.log(`Address: ${body.results[0].formatted_address}`);
        //console.log(`Type: ${body.results[0].types[0]}`);
    })
    return locations
};
