var map = L.map('map').setView([42.35144, -71.06644], 12);
var APP_TOKEN = 'I4DSpFA3uVR5D3j4jSLliGPq4';

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(map);

    var typeIcon = L.Icon.extend({
      options: {
              iconSize: [20, 20]
      }
    })


    var foodIcon = new typeIcon({iconUrl: 'icons/food-icon.png'}),
          drinkIcon = new typeIcon({iconUrl: 'icons/drink-icon.png'});

    function fillMapFood(map) {
      $.ajax({
        url: 'https://opendata.socrata.com/resource/kwzk-xvba?$$app_token=' + APP_TOKEN,
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function (json) {
          var unplotted = 0;

          for (var i=0; i< json.length; i++) {

            var arrayCoord = json[i]['coordinates'].split(",");
            var lat = Number(arrayCoord[0].replace("(", ""));
            var lng = Number(arrayCoord[1].replace(")",""));

            L.marker([lat, lng], {icon: foodIcon}).addTo(map).bindPopup(json[i]['businessname'] + "<br />" + json[i]['address']);
        }
      }
      });
    }

    function fillMapLiquor(map) {
      $.ajax({
        url: 'https://opendata.socrata.com/resource/n2ib-bm5m?$$app_token=' + APP_TOKEN,
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function (json) {
          var unplotted = 0;

          for (var i=0; i< json.length; i++) {


            var arrayCoord = json[i]['location'].split(",");
            var lat = Number(arrayCoord[0].replace("(", ""));
            var lng = Number(arrayCoord[1].replace(")",""));

            L.marker([lat, lng], {icon: drinkIcon}).addTo(map).bindPopup(json[i]['businessname']);
        }
      }
      });
    }

    fillMapFood(map);
    fillMapLiquor(map);