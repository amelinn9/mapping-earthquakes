// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);

// LOCAL JSON DATA
// Add GeoJSON data.
//let sanFranAirport =
//{"type":"FeatureCollection","features":[{
//    "type":"Feature",
//    "properties":{
//        "id":"3469",
//        "name":"San Francisco International Airport",
//        "city":"San Francisco",
//        "country":"United States",
//       "faa":"SFO",
//        "icao":"KSFO",
//        "alt":"13",
//        "tz-offset":"-8",
//        "dst":"A",
//        "tz":"America/Los_Angeles"},
//    "geometry":{
//        "type":"Point",
//        "coordinates":[-122.375,37.61899948120117]}}
//]};

// MAP ONE POINT
// Create a GeoJSON layer and add it to the map
// Grabbing our GeoJSON data.
//L.geoJson(sanFranAirport, {
//  // We turn each feature into a marker on the map.
//  pointToLayer: function(feature, latlng) {
//    console.log(feature);
//    return L.marker(latlng)
//    .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + 
//    feature.properties.city + ", " + feature.properties.country + "</h3>");
//  }

// MAP MULTIPLE POINTS
// Grabbing our GeoJSON data.
//L.geoJson(sanFranAirport, {
//  // We turn each feature into a marker on the map.
//  onEachFeature: function(feature, layer) {
//    console.log(layer);
//    layer.bindPopup("<h3>Airport code: " + feature.properties.faa + "</h3> <hr> <h3>Airport name: " + 
//    feature.properties.name + "</h3>");
//  }
//
//}).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{styleid}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    styleid: "mapbox/streets-v11", //"mapbox/navigation-preview-night-v2"
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{styleid}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    styleid: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with a center and zoom level. 
// useful when we need to add multiple tile layers or background image of our map(s)
let map = L.map("mapid", {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/amelinn9/mapping-earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
  color: "blue",
  fillColor: "yellow",
  weight: 1
};

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);

  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h3>Neighbourhood: " + feature.properties.AREA_NAME + "</h3>");
    }
  }).addTo(map);
});

// FOR line markers
// Grabbing our GeoJSON data.
//d3.json(torontoData).then(function(data) {
//  console.log(data);

  // Creating a GeoJSON layer with the retrieved data.
//  L.geoJson(data, {
//    style: myStyle,
//    onEachFeature: function(feature, layer) {
//      console.log(layer);
//      layer.bindPopup("<h3>Airline code: " + feature.properties.airline + "</h3> <hr> <h3>Destination: " + 
//      feature.properties.dst + "</h3>");
//    }
//  }).addTo(map);
//});

// FOR POPUP MARKERS
// Grabbing our GeoJSON data.
//d3.json(torontoData).then(function(data) {
//  console.log(data);

  // Creating a GeoJSON layer with the retrieved data.
//  L.geoJson(data, {
//    onEachFeature: function(feature, layer) {
//      console.log(layer);
//      layer.bindPopup("<h3>Airport code: " + feature.properties.faa + "</h3> <hr> <h3>Airport name: " + 
//      feature.properties.name + "</h3>");
//    }
//  }).addTo(map);
//});