$(document).ready(function () {
  let PIXELSIZE = 2;
  let REPEATSX = 20;
  let REPEATSY = 15;

  let canvas = $("#mycanvas");
  let ctx = canvas.get(0).getContext("2d");
  let canvasWidth = DIMENSION * REPEATSX * PIXELSIZE;
  let canvasHeight = DIMENSION * REPEATSY * PIXELSIZE;
  let selectedBox = null;

  canvas.attr('width', canvasWidth);
  canvas.attr('height', canvasHeight);

  // Initialize Firebase
  let firebaseConfig = {
    apiKey: "AIzaSyA8o_azigp1r55Kf4-ksJnffY7o3WT9ZhQ",
    authDomain: "bigcanvas-f7fef.firebaseapp.com",
    databaseURL: "https://bigcanvas-f7fef.firebaseio.com",
    projectId: "bigcanvas-f7fef",
    storageBucket: "bigcanvas-f7fef.appspot.com",
    messagingSenderId: "429765921665",
    appId: "1:429765921665:web:8d5199605dbda353383680"
  };
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();

  db.collection('app').onSnapshot(function (grid) {
    for(let change of grid.docChanges()) {
      if (!change.doc) continue;
      let key = change.doc.id;
      let data = change.doc.data().data;
      if (key == 'grid') continue;

      let coord = key.split(",");
      let json = data;
      let pixelData = JSON.parse(json);
      clearGrid(coord);
      for (let subkey in pixelData) {
        let subcoord = subkey.split(",");
        let color = pixelData[subkey];
	if(color == '#2') color = '#222244'; // hack to save some space on encoding.

        fillPixel(coord, subcoord, color);
      }
    }
  });

  // Draw grid.
  ctx.strokeStyle = '#cccccc';
  for (let i = 0; i < DIMENSION * REPEATSX; ++i) {
    if (i % DIMENSION != 0) { continue; }
    x = i * PIXELSIZE;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();

    y = i * PIXELSIZE;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  // Canvas Behaviors.
  canvas.click(function (e) {
    selectBox(e);
  });
  canvas.mousemove(function (e) {
    let pixel = [Math.floor(e.offsetX / (PIXELSIZE * DIMENSION)), Math.floor(e.offsetY / (PIXELSIZE * DIMENSION))];
    if (pixel[0] < 0 || pixel[1] < 0 ||
      pixel[0] >= REPEATSX || pixel[1] >= REPEATSY) {
      return;
    }
    if (!selectedBox) {
      selectedBox = $("<div id=selectedBox></div");
      selectedBox.css({ width: DIMENSION * PIXELSIZE - 2, height: DIMENSION * PIXELSIZE - 2 });
      $("#mycanvasWrapper").prepend(selectedBox);
    }
    selectedBox.css({
      left: pixel[0] * PIXELSIZE * DIMENSION + 1,
      top: pixel[1] * PIXELSIZE * DIMENSION
    });
  });

  let SELECTED = 0;
  function selectBox(e) {
    if (SELECTED) return;
    SELECTED = 1;

    let pixel = [Math.floor(e.offsetX / (PIXELSIZE * DIMENSION)), Math.floor(e.offsetY / (PIXELSIZE * DIMENSION))];
    window.location = "draw.php?x=" + pixel[0] + "&y=" + pixel[1];
  }

  function clearGrid(coord) {
    let coordX = parseInt(coord[0]);
    let coordY = parseInt(coord[1]);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(coordX * DIMENSION * PIXELSIZE, coordY * DIMENSION * PIXELSIZE,
      PIXELSIZE * DIMENSION, PIXELSIZE * DIMENSION);
    ctx.fillStyle = '#cccccc';
    ctx.strokeRect(coordX * DIMENSION * PIXELSIZE, coordY * DIMENSION * PIXELSIZE,
      PIXELSIZE * DIMENSION, PIXELSIZE * DIMENSION);
  }

  function fillPixel(coord, subcoord, color) {
    let coordX = parseInt(coord[0]);
    let coordY = parseInt(coord[1]);
    let subCoordX = parseInt(subcoord[0]);
    let subCoordY = parseInt(subcoord[1]);
    if (coordX < 0 || coordY < 0 ||
      coordX >= REPEATSX || coordY >= REPEATSY ||
      subCoordX < 0 || subCoordX >= DIMENSION ||
      subCoordY < 0 || subCoordY >= DIMENSION) {
      return;
    }

    ctx.fillStyle = color;
    let x = (coordX * DIMENSION + subCoordX) * PIXELSIZE;
    let y = (coordY * DIMENSION + subCoordY) * PIXELSIZE;
    ctx.fillRect(x, y, PIXELSIZE, PIXELSIZE);
  }
});
