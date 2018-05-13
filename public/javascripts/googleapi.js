//const save = require("/save.js");

/*-------------------------JSON OF COUNTRIES AND PLACES---------------------------------------------------*/

var favouritesList = [];

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
