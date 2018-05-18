//const save = require("/save.js");

/*-------------------------JSON OF COUNTRIES AND PLACES---------------------------------------------------*/


var favouritesList = [];

var Countries= {Canada: {center: {
                            coor: {lat: 51.4968, lng: -100.9281}
                            },
                         locations: [{
                             title:'Banff National Park',
                             address:'Banff National Park, Improvement District No. 9, AB T0L',
                             coor: {
                                 lat: 51.4968,
                                 lng: -115.9281},
                             picture: "pictures/banffpark.jpg"},{
                            title: 'CN Tower',
                            address: '301 Front St W, Toronto, ON M5V 2T6',
                             coor: {
                                    lat: 43.6426,
                                    lng: -79.3871},
                             picture: 'pictures/cntower.jpg'},{
                               title: 'Stanley Park',
                               address: 'Vancouver, BC V6G 1Z4',
                             coor: {
                                    lat: 49.3017,
                                    lng: -123.1417},
                             picture: 'pictures/stanleypark.jpg'}],
                         zoom: 4
                        },
                USA: {center: {
                            coor: {lat: 38.4968, lng: -100}
                            },
                         locations: [{
                           title: 'Central Park',
                           address: 'New York, NY, USA',
                             coor: {
                                 lat: 40.7829,
                                 lng: -73.9654},
                             picture: "pictures/centralpark.jpg"},{
                            title: 'Golden Gate Bridge',
                            address: 'Golden Gate Bridge, San Francisco, CA, USA',
                             coor: {
                                    lat: 37.8199,
                                    lng: -122.4783},
                             picture: "pictures/goldengatebridge.jpg"},{
                            title: 'Statue of Liberty',
                            address: 'New York, NY 10004, USA',
                             coor: {
                                    lat: 40.6892,
                                    lng: -74.0445},
                             picture: "pictures/statueofliberty.jpg"}],
                      zoom: 4
                        },
                Russia: {center: {
                            coor: {lat: 58.7520, lng: 33.6175}
                            },
                         locations: [{
                           title: 'Moscow Kremlin',
                           address: 'Moscow, Russia, 103073',
                             coor: {
                                 lat: 55.7520,
                                 lng: 37.6175},
                             picture: "pictures/moscowkremlin.jpg"},{
                            title: 'Red Square',
                            address: 'Moscow, Russia',
                             coor: {
                                    lat: 55.7539,
                                    lng: 37.6208},
                             picture: "pictures/redsquare.jpg"},{
                            title: 'Hermitage Museum',
                            address: 'Palace Square, 2, Sankt-Peterburg, Russia, 190000',
                             coor: {
                                    lat: 59.9398,
                                    lng: 30.3146},
                             picture: "pictures/hermitage.jpg"}],
                         zoom: 5
                        },
                China: {center: {
                            coor: {lat: 39.95, lng: 116.3}
                            },
                         locations: [{
                           title: 'Tiananmen Square',
                           address: 'Dongcheng, China',
                             coor: {
                                 lat:39.9055,
                                 lng: 116.3976},
                             picture: "pictures/tiananmensquare.jpg"},{
                            title: 'Forbidden City',
                            address: '4 Jingshan Front St, Dongcheng Qu, Beijing Shi, China, 100006',
                             coor: {
                                    lat: 39.9163,
                                    lng: 116.3972},
                             picture: "pictures/forbiddencity.jpg"},{
                            title: 'Summer Palace',
                            address: '19 Xinjiangongmen Rd, Haidian Qu, China, 100000',
                             coor: {
                                    lat: 40.0000,
                                    lng: 116.2755},
                             picture: "pictures/summerpalace.jpg"}],
                         zoom: 11
                        },
                Japan: {center: {
                            coor: {
                              lat:35.3394,
                              lng: 137.7292}
                            },
                         locations: [{
                           title: 'Kinkaku-ji',
                           address: '1 Kinkakujicho, Kita, Kyoto, Kyoto Prefecture 603-8361, Japan',
                             coor: {
                                 lat:35.0394,
                                 lng: 135.7292},
                             picture: "pictures/kinkakuji.jpg"},{
                            title: 'Senso-ji',
                            address: ' 2 Chome-3-1 Asakusa, Taitō, Tokyo 111-0032, Japan',
                             coor: {
                                    lat: 35.7148,
                                    lng: 139.7967},
                             picture: "pictures/sensoji.jpg"},{
                            title: 'Tokyo Tower',
                            address: '4 Chome-2-8 Shibakoen, Minato, Tokyo 105-0011, Japan',
                             coor: {
                                    lat: 35.6586,
                                    lng: 139.7454},
                             picture: "pictures/tokyotower.jpg"}],
                         zoom: 7
                        },
                Mexico: {center: {
                            coor: {lat:19.3394,
                                 lng: -93.7292}
                            },
                         locations: [{
                           title: 'Pyramid of the Magician',
                           address: 'Yucatán, Mexico',
                             coor: {
                                 lat:20.359444,
                                 lng: -89.771389},
                             picture: "pictures/uxmal.jpg"},{
                            title: 'Coba',
                            address: 'Km. 47, Carretera Federal Tulum 307, 77793 Cobá, Q.R., Mexico',
                             coor: {
                                    lat: 20.49472,
                                    lng: -87.736111},
                             picture: "pictures/coba.jpg"},{
                            title: 'Monte Alban',
                            address: 'Oaxaca, Mexico',
                             coor: {
                                    lat: 17.043889,
                                    lng: -96.767778},
                             picture: "pictures/montealban.jpg"}],
                         zoom: 6
                        },

            }

/*---------------------FUNCTIONS-------------------------------*/

/*---------------------Initializes a map-------------------------------------*/

/**
 * [initializes the google map]
 * @return {[none]} [Does not return anything]
 */
 function initMap() {
        var marker =""
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: 51.4968, lng: -115.9281}
        });

 }

/**
 * [Infobox for when you click on one of the placemarkers]
 * @param {[string]} marker  [the marker where you will be creating the info box]
 * @param {[string]} message [the description of the landmark]
 */
function addInfoWindow(marker, message) {

            var infoWindow = new google.maps.InfoWindow({
                content: message
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        }

/*-------------------------------Changes the map markers-------------------------------*/

/**
 * [changes the map markers]
 * @param  {[dictionary]} center    [dictionary of lat/long]
 * @param  {[list]} locations [list of locations for the country]
 * @param  {[int]} zoom      [the zoom variable for the map markers]
 * @return {[none]}           [does not return. used to initialize the markers]
 */
function changeMap(center, locations, zoom) {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: zoom,
          center: center
        });

        var locations = locations;

        for (var i =0; i < locations.length; i++){
         marker = new google.maps.Marker({
            position: locations[i].coor,
            animation: google.maps.Animation.DROP,
            map: map
          });

          addInfoWindow(marker,"<p><b>" + locations[i].title + "</b></p><p>"+locations[i].address+"</p>")
        }
      }

/*------------------------------------Changes the images on the right side---------------------------*/

/**
 * [function used to change the images shown for the landmarks]
 * @param  {[int]} div    [number used to specify what div image is being changed]
 * @param  {[string]} image  [url of the new image]
 * @param  {[string]} dtitle [title of the landmark]
 * @return {[none]}        [no return. changes the image.]
 */
function changeImage(div, image, dtitle){
  if (div == 0){
    document.getElementById('firstcountry').style.backgroundImage = "url(" + image + ")";
    document.getElementById('title1').innerHTML= dtitle
  }
  else if (div == 1){
    document.getElementById('secondcountry').style.backgroundImage = "url(" + image + ")";
    document.getElementById('title2').innerHTML = dtitle
  }
  else if (div == 2){
    document.getElementById('thirdcountry').style.backgroundImage = "url(" + image + ")";
    document.getElementById('title3').innerHTML= dtitle
  }

}

/*----------------------------------makes info for clicking on picture-------------*/

//change to do something

function showCountry(country){
  var showcount = document.getElementById(country+"info")
    //document.getElementById(country).addEventListener("mouseover", function() {
    showcount.style.display="block";
    showcount.addEventListener("mouseleave", function() {
        showcount.style.display="none";
    });
  }

// var showfirstcountry = document.getElementById("firstcountryinfo")
document.getElementById("firstcountry").addEventListener("mouseover", showCountry("firstcountry"));
//             showfirstcountry.style.display="block";
//         });
//         showfirstcountry.addEventListener("mouseleave", function() {
//             showfirstcountry.style.display="none";
//         });

/*-----------------------------------------get email info---------------------------*/

/**
 * [function created to check if title is already in added list.]
 * @param  {[string]} entry [title of the landmark being checked for]
 * @param  {[list]} list  [list the title is being stored into]
 * @return {[Boolean]}       [returns a boolean value for the check.]
 */
function check(entry, list) {
  var repeated = 0
  for (i=0; i<list.length;i++){
    if (entry == list[i]){
      repeated += 1;
    }
  }
  return repeated
}

// Start of the save function

document.getElementById("save1").addEventListener("click", function(){
  var entry = document.getElementById("title1").innerHTML;
  var test = check(entry, favouritesList);
  if (test > 0) {
    alert('Location already in list!');
  }
  else {
      favouritesList.push(entry);
  }
});

// Start of the show saved locations function

document.getElementById('savedshow').addEventListener("click", function(){
  document.getElementById('displaysaved').innerHTML =""
  for (var n in favouritesList){
    document.getElementById('displaysaved').innerHTML += "" + favouritesList[n]+"<br>"
}
});
