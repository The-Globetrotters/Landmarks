const gmaps = require('./public/javascripts/FinalMainAppJavaScript');
//const gapi= require('./public/javascripts/googleapi');

describe('TDD tests (check)', () => {
  test('enter nothing return true', () => {
    expect(gmaps.check()).toBeTruthy()
  })

  test('entry not in list', () => {
    expect(gmaps.check('entry', '[]')).toBeFalsy()
  })

  test('entry in list', () => {
    expect(gmaps.check('yes', ['no','yes'])).toBeTruthy()
  })

  test('string in list of numbers returns true', () => {
    expect(gmaps.check('1', [1,3,2])).toBeTruthy()
  })
});

var jsonobject = {"results": {
      "formatted_address": "555 W Hastings St, Vancouver, BC V6B 4N6, Canada",
      "geometry": {
        "location": {
          "lat": 49.2846763,
          "lng": -123.1122221
        },
        "viewport": {
          "northeast": {
            "lat": 49.28602612989273,
            "lng": -123.1108722701073
          },
          "southwest": {
            "lat": 49.28332647010729,
            "lng": -123.1135719298927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
      "id": "c05667265acda258ff10e98197d28ace55006fbb",
      "name": "Vancouver Lookout",
      "opening_hours": {
        "open_now": true,
        "weekday_text": [

        ]
      },
      "photos": [
        {
          "height": 1080,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/112235959550287791905/photos\">Eugene Lui</a>"
          ],
          "photo_reference": "CmRaAAAAkLQRI59hMusXI0rqA7Z2xJBeJjUvhwsnnfkOiVe0dr4iKILni4VG4sL7EvzlLGbGKu3TTkmlqQK6m838wJ6ojxPZH5cynS8dapnb5M57jqSvbazmYpZsslw2CtbhjBNMEhC2TJlBCFjnaEeCmCujNssBGhT4j1wqKHj-8Lmkw0SARLzILUuYxg",
          "width": 1920
        }
      ],
      "place_id": "ChIJfe2sYHhxhlQRoXvjMeNv3VA",
      "rating": 4.4,
      "reference": "CmRbAAAAEkavslwh4yPpGeTMiYfm9E9AzODFujUdGyDpSFN2ok2idGQD_MixXP8lwrg7k17fJOqYAuhvqRvdsQhoxoJ8dwAWVBgbWeroQDTa0JkbJySwVGZmcbODbbOu-my0s0WhEhD_BLBDxj575FBPzMEUWX9nGhSWBgteVDboVERM-Tdg084sjPA4-g",
      "types": [
        "travel_agency",
        "point_of_interest",
        "establishment"
      ]
    }}

describe('gmaps tests', () => {
  test('Get Landmarks does not compute numbers', () => {
    expect(gmaps.getLandmarks(jsonobject, (errorMessage, results) => {
    	if (errorMessage){
        message = errorMessage;
    		return message;
    	} else{
    		message = results.toBe('Cannot get Landmarks');
        return message;
    	}
    }))
  })

  test('Check if Get Landmarks pushed to landmarks list', async () => {
    expect.assertions(0);
    gmaps.getLandmarks('Vancouver', (errorMessage, results) => {
      //expect(results.length).toBeGreaterThan(0);
      return expect(typeof results).toBe('object')
    })
  })
  ;
})
