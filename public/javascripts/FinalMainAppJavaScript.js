/*-------------------------MAP FUNCTIONS---------------------------------*/
var itr = 0;
var infoWindow = null;

/**
 * [initializes the google map]
 * @return {[none]} [Does not return anything]
 */
function initMap() {
    var marker = "";
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: 51.4968, lng: -115.9281 }
    })
};

/**
 * [Infobox for when you click on one of the placemarkers]
 * @param {[string]} marker  [the marker where you will be creating the info box]
 * @param {[string]} message [the description of the landmark]
 */
function addInfoWindow(marker, message, number) {

    google.maps.event.addListener(marker, 'click', function() {
        if (infoWindow) {
            infoWindow.close();
        }

        infoWindow = new google.maps.InfoWindow({
            content: message
        });
        infoWindow.open(map, marker);
        changeImage(number, newlandmarks);
    });
}

/**
 *[Uses AJAX to grab your location from the googlemaps API then runs the functions]
 * @return {[none]} [Does not return anything]
 */
function loadDoc() { // Load up the API and place everything on the map properly
    var newlocation = document.getElementById('countrysearch').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(xhttp.responseText);
            window.newlandmarks = getLandmarks(jsonObj);
            var newlocations = getLocations(newlandmarks);
            var centering = getZoomAndCenter(newlocations);
            changeMap(centering, newlocations, newlandmarks)
        }
    };
    xhttp.open("GET", "https://maps.googleapis.com/maps/api/place/textsearch/json?query=point+of+interest+in+" + encodeURIComponent(newlocation) + "&key=AIzaSyBWUn1Lc706TRf_lB71AYa3O9IfTEO5Dsk", true);
    xhttp.setRequestHeader("accept", "json/application");
    xhttp.setRequestHeader("Content-Type", "json/application");
    xhttp.send();
    return
}

/*--------------------------Finding and Placing Landmarks on the map------------------------------*/
/**
 *[Does everything, places the markers, finds the pictures and places them in the box, centers the map to the new location]
 *@return {[none]} [Does not return anything]
 */
//Grabbing the Location and making a JSON object
function getLandmarks(json) {
    var landmarks = [];
    var Results = json.results;

    for (i = 0; i < Results.length; i++) {
        landmarks.push({
            name: Results[i].name,
            address: Results[i].formatted_address,
            latitude: Results[i].geometry.location.lat,
            longitude: Results[i].geometry.location.lng,
            photo: Results[i].photos[0].photo_reference
        });
    };
    console.log(landmarks)
    return landmarks
}


//Finding each Latitude and longitude of each location to use as markers


function getLocations(landmarks) {

    var locations = []
    for (var i = 0; i < landmarks.length; i++) {
        locations.push({ lat: landmarks[i].latitude, lng: landmarks[i].longitude })
    };
    return locations
}

//Finding the ranges to use to find center and zoom size

function getZoomAndCenter(locations) {
    if (locations.length > 0) {
        var maxlat = locations[0].lat;
        var minlat = locations[0].lat;
        var maxlng = locations[0].lng;
        var minlng = locations[0].lng;

        for (var i = 1; i < locations.length; i++) {
            if (maxlat < locations[i].lat) {
                maxlat = locations[i].lat
            }
            if (minlat > locations[i].lat) {
                minlat = locations[i].lat
            }
            if (maxlng < locations[i].lng) {
                maxlng = locations[i].lng
            }
            if (minlng > locations[i].lng) {
                minlng = locations[i].lng
            }
        }

        //locating the center

        var newcenter = { lat: ((maxlat + minlat) / 2), lng: ((maxlng + minlng) / 2) }


        //figuring out the zoom

        var newzoom = 0;
        var rangelat = Math.abs(maxlat - minlat);
        var rangelng = Math.abs(maxlng - minlng);
        console.log(rangelat, rangelng)

        if (rangelat > 150 || rangelng > 150) {
            newzoom = 2
        } else if (rangelat > 75 || rangelng > 75) {
            newzoom = 3
        } else if (rangelat > 15 || rangelng > 15) {
            newzoom = 4
        } else if (rangelat > 8 || rangelng > 8) {
            newzoom = 5
        } else if (rangelat > 4 || rangelng > 4) {
            newzoom = 6
        } else if (rangelat > 2 || rangelng > 2) {
            newzoom = 7
        } else if (rangelat > 1 || rangelng > 1) {
            newzoom = 8
        } else if (rangelat > 0.5 || rangelng > 0.5) {
            newzoom = 9
        } else if (rangelat > 0.2 || rangelng > 0.2) {
            newzoom = 10
        } else if (rangelat > 0.1 || rangelng > 0.1) {
            newzoom = 11
        } else if (rangelat > 0.05 || rangelng > 0.05) {
            newzoom = 12
        } else if (rangelat > 0.025 || rangelng > 0.025) {
            newzoom = 13
        } else {
            newzoom = 14
        }
    } else {
        newcenter = { lat: 0, lng: 0 };
        newzoom = 0;
        alert('No landmarks were found in your location')
    }
    return [newzoom, newcenter]
}


//changing up the map to suit the new function lookup

function changeMap(centering, locations, landmarks) {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: centering[0],
        center: centering[1]
    });
    for (var i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: locations[i],
            animation: google.maps.Animation.DROP,
            map: map
        });
        addInfoWindow(marker, "<p><b>" + landmarks[i].name + "</b></p><p>" + landmarks[i].address + "</p>", i)
    };
};
/**
 * [A function that checks if an entry is already in a users saved locations. returns a boolean value
 * where it will be passed to another function to add or deny the entry.]
 * @param  {[string]} entry [the entry that you are trying to add into the list]
 * @param  {[list]} list  [a list of the locations the user has saved to their database]
 * @return {[boolean]}       [returns true or false depending on if the entry is in the list already]
 */
function check(entry, list) {
    if (list == null) {
        return true
    } else {
        for (i = 0; i < list.length; i++) {
            if (entry == list[i]) {
                return true
            }
        }
        return false
    };
};

//function that initializes image gallery and changes images based on arrow click
function changeImage(num, landmarks) {
    document.getElementById('countrypic').style.backgroundImage = "url(https://maps.googleapis.com/maps/api/place/photo?maxheight=9000&photoreference=" + landmarks[num].photo + "&key=AIzaSyA5XukOn9Ji2Bl-BEFw9l-UJl2D4TaLDhM)";
    document.getElementById('title1').innerHTML = landmarks[num].name;
}

//changes picture by pressing forward arrow
function ScrollPicsForward() {
    if (itr > newlandmarks.length - 1) {
        itr = 0;
        changeImage(itr, newlandmarks);
    } else {
        itr += 1;
        changeImage(itr, newlandmarks);
    }
};

function ScrollPicsBackward() {
    if (itr == 0) {
        itr = newlandmarks.length - 2
        changeImage(itr, newlandmarks);
    } else if (itr > 0) {
        itr -= 1;
        changeImage(itr, newlandmarks);
    }
}

function onkeyUpEnter(e) {
    var enterKey = 13;
    if (e.which == enterKey) {
        loadDoc();
    }
}

var favouritesList = [];
//saves landmarks to list
function SaveLandmarks() {
    var entry = document.getElementById('title1').innerHTML;
    console.log("you pressed ", entry);
    var test = check(entry, favouritesList);
    if (test > 0) {
        alert('Landmark already in list');
    } else {
        favouritesList.push(entry);

        var data = {
            landname: entry
        };
        $.post('/saveland', data);

    };
}

function LoadLandmarks() {
    $.post('/showland', function(data){
        var displaysaved = document.getElementById('displaysaved');
        var places = document.getElementById('savedplaces');
        favlistString = ''
        console.log(data);
        for (i=0; i < data.length; i++){
            favlistString += '<p>'+data[i]+'</p>'
        }
        displaysaved.innerHTML = favlistString;
        places.style.display = 'block';
    });
}

function closeLandmarks(){
    document.getElementById('savedplaces').style.display ='none'
}

module.exports = {
  initMap,
  addInfoWindow,
  loadDoc,
  getLandmarks,
  getLocations,
  getZoomAndCenter,
  changeMap,
  changeImage,
  ScrollPicsForward,
  ScrollPicsBackward,
  check,
  SaveLandmarks,
  LoadLandmarks
}
// document.getElementById('searchbutton').addEventListener('click', function() {
//    loadDoc();
// });
