    let myMap;
    let canvas;
    const mappa = new Mappa('Leaflet');

    let options = {
    lat: 43,
    lng: -78.79,
    zoom: 12,
    style: "https://api.mapbox.com/styles/v1/jamiekyl/ckgkz0vri1t1y19o0fw2a4t80/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamFtaWVreWwiLCJhIjoiY2tnZ3NlNm4yMG9kbTJxbWxvdGsxMWtuMiJ9.gpZC_H9jzt9chN0tk3SHHA"
    }


    function preload() {
    hydrantLocations = loadTable('Trees_data.csv', 'csv', 'header');
    cameraLocations = loadTable('Camera_Locations.csv','csv', 'header');
    crimeLocations = loadTable('Crime_Incidents.csv', 'csv', 'header');
    firstPath = loadTable('Miguel.csv', 'csv', 'header');
    secondPath = loadTable('SignPins.csv', 'csv', 'header');
    thirdPath = loadTable('SignsTrackPoints.csv', 'csv', 'header');
    fourthPath = loadTable('Jamie_Antoine.csv', 'csv', 'header');
    fifthPath = loadTable('Jamie.csv', 'csv', 'header');
    sixthPath = loadTable('Antoine.csv', 'csv', 'header');
    }


    function setup() {
    canvas = createCanvas(1200, 800);
    rectMode(CENTER);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    myMap.onChange(clear);

    myMap.onChange(drawHydrant.bind(null, hydrantLocations));
    myMap.onChange(drawCamera.bind(null, cameraLocations));
    myMap.onChange(drawCrime.bind(null, crimeLocations));
    myMap.onChange(drawPathJamieAntoine.bind(null, fourthPath));
    myMap.onChange(drawPathJamie.bind(null, fifthPath));
    myMap.onChange(drawPathAntoine.bind(null, sixthPath));
    myMap.onChange(drawPathMiguel.bind(null, firstPath));
    myMap.onChange(drawCriclesMiguel.bind(null, secondPath));
    myMap.onChange(drawPathMiguel.bind(null, thirdPath));
    }


    function drawHydrant(path) {
    for (let i = 0; i < path.getRowCount() - 1; i++) {
    const hydrantLatLng = path.getString(i, 'the_geom');
    const mainDiameter = path.getString(i, 'Main Diameter')
    const colour = path.getString(i, 'Hydrant Color')
    const segments = hydrantLatLng.split(" ");
    const segments2 = colour.split(" ");
    const hydrantNumber = path.getString(i, 'Hydrant Number');

    const hydrantLng = Number(segments[1].replace('(',''));
    const hydrantLat = Number(segments[2].replace(')',''));
    const hydrantColour = segments2[2];

    if (myMap.map.getBounds().contains({lat: hydrantLat, lng: hydrantLng})) {
    const pos = myMap.latLngToPixel(hydrantLat, hydrantLng);
    noStroke();
    fill(255,0,0);
    circle(pos.x, pos.y, mainDiameter);
    fill(255);
    text(hydrantNumber, pos.x, pos.y);
    }
    }
    }

    function drawCrime(path) {
    for (let i = 0; i < path.getRowCount() - 1; i++) {
    const crimeLat = path.getString(i,'latitude');
    const crimeLng = path.getString(i,'longitude');
    const incident = path.getString(i, 'incident_type_primary');
    const time = path.getString(i, 'hour_of_day');


    if (myMap.map.getBounds().contains({lat: crimeLat, lng: crimeLng})) {
    const pos = myMap.latLngToPixel(crimeLat, crimeLng);
    noStroke();
    if (time < 20 && time > 9){
    fill(150,0,255);
    rect(pos.x, pos.y, 8);
    text(incident, pos.x, pos.y);
    }
    else {
    fill(0,255,0);
    rect(pos.x, pos.y, 8);
    text(incident, pos.x, pos.y);
    }
    }
    }
    }


    function drawCamera(path) {
    for (let i = 0; i < path.getRowCount() - 1; i++) {
    const cameraLatLng = path.getString(i, 'the_geom');
    const cameraName = path.getString(i, 'Name');
    const segments = cameraLatLng.split(" ");

    const cameraLng = Number(segments[1].replace('(',''));
    const cameraLat = Number(segments[2].replace(')',''));

    if (myMap.map.getBounds().contains({lat: cameraLat, lng: cameraLng})) {
    const pos = myMap.latLngToPixel(cameraLat, cameraLng);
    noStroke();
    fill(0,0,255);
    triangleSimple(pos.x, pos.y, 12, 12)
    text(cameraName,pos.x,pos.y)
    }
    }
    }

    function drawPathJamieAntoine(path) {
    for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));
    //const altitude = Number(path.getString(i, 'altitude (ft)'));
    const latitude2 = Number(path.getString(i+1, 'latitude'));
    const longitude2 = Number(path.getString(i+1, 'longitude'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
    const pos = myMap.latLngToPixel(latitude, longitude);
    const pos2 = myMap.latLngToPixel(latitude2, longitude2);

    stroke(0,255,0);
    strokeWeight(4);
    line(pos.x, pos.y, pos2.x, pos2.y);
    }
    }
    }

    function triangleSimple(x,y,w,h){
    triangle(x,y,x+w/2, y-h, x+w, y);
    }

    function drawPathMiguel(path) {
    for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));
    //const altitude = Number(path.getString(i, 'altitude (ft)'));
    const latitude2 = Number(path.getString(i+1, 'latitude'));
    const longitude2 = Number(path.getString(i+1, 'longitude'));



    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
    const pos = myMap.latLngToPixel(latitude, longitude);
    const pos2 = myMap.latLngToPixel(latitude2, longitude2);


    stroke(0,200,0);
    strokeWeight(4);
    line(pos.x, pos.y, pos2.x, pos2.y);
    }
    }
    }
    function drawCriclesMiguel(path) {
    for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));
    //const altitude = Number(path.getString(i, 'altitude (ft)'));
    const latitude2 = Number(path.getString(i+1, 'latitude'));
    const longitude2 = Number(path.getString(i+1, 'longitude'));

    const pinNum = path.getString(i, 'geoidheight');

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
    const pos = myMap.latLngToPixel(latitude, longitude);
    const pos2 = myMap.latLngToPixel(latitude2, longitude2);


    push();
    textFont('Helvetica');
    fill('green');
    text(pinNum, pos.x, pos.y);


    // translate(latitude, longitude);
    fill('blue');
    ellipseMode(CENTER);
    noStroke();
    circle(pos.x, pos.y, 15);
    pop();
    }
    }
    }

    function drawPathJamie(path) {
    for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));
    //const altitude = Number(path.getString(i, 'altitude (ft)'));
    const latitude2 = Number(path.getString(i+1, 'latitude'));
    const longitude2 = Number(path.getString(i+1, 'longitude'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
    const pos = myMap.latLngToPixel(latitude, longitude);
    const pos2 = myMap.latLngToPixel(latitude2, longitude2);

    stroke(255,0,0);
    strokeWeight(4);
    line(pos.x, pos.y, pos2.x, pos2.y);
    }
    }
    }

    function drawPathAntoine(path) {
    for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));
    const latitude2 = Number(path.getString(i+1, 'latitude'));
    const longitude2 = Number(path.getString(i+1, 'longitude'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
    const pos = myMap.latLngToPixel(latitude, longitude);
    const pos2 = myMap.latLngToPixel(latitude2, longitude2);

    stroke(255,0,255);
    strokeWeight(4);
    line(pos.x, pos.y, pos2.x, pos2.y);
    }
    }
    }
