$(document).ready(function () {
  let canvas = $("#mycanvas");
  let ctx = canvas.get(0).getContext("2d");
  let canvasWidth = canvas.width();
  let canvasHeight = canvas.height();
  let PIXELSIZE = canvasWidth / DIMENSION;
  let selectedColor = '#222244';
  let enabled = true;
  let filledPixels = {};

  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  for (let i = 0; i < DIMENSION; ++i) {
    x = Math.floor(i * canvasWidth / DIMENSION);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();

    y = Math.floor(i * canvasHeight / DIMENSION);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  canvas.on('mousemove touchmove touchstart mousedown', mouseFill);
  function mouseFill(e) {
    e.preventDefault(); // Disables scrolling for touch events.

    var touchstart = e.type === 'touchstart' || e.type === 'touchmove';
    e = touchstart ? e.originalEvent : e;
    var rect = $("#mycanvas");
    var offsetX = touchstart ? e.targetTouches[0].pageX - rect.offset().left : e.offsetX;
    var offsetY = touchstart ? e.targetTouches[0].pageY - rect.offset().top : e.offsetY;

    if (!enabled) return;
    if (e.which != 1 && !touchstart) return;

    pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
    fillPixel(pixel);
  }

  function fillPixel(pixel) {
    let key = pixel[0] + ',' + pixel[1];
    filledPixels[key] = selectedColor;

    ctx.fillStyle = selectedColor;
    ctx.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
  }

  const PICKR = Pickr.create({
    el: '#picker',
    comparison: false,
    components: {
      opacity: false,
      hue: true,
      palette: true,
      interaction: {
        input: true,
      }
    }
  });

  PICKR.on('init', function () {
    PICKR.setColor(selectedColor);
  });
  PICKR.on('show', function () {
    enabled = false;
  });
  PICKR.on('hide', function () {
    setTimeout(function () {
      enabled = true;
    }, 300);
  });
  PICKR.on('change', function () {
    selectedColor = PICKR.getColor().toHEXA().toString();
  });

  window.save = function (x, y) {
    var data = {};
    data['x'] = x;
    data['y'] = y;
    data['data'] = filledPixels;
    $("#saveButton").attr('disabled', 'true');
    $("#spinner").html("Saving...");

    $.post('draw.php?submit=1', data, function (rsp) {
      $('body').append(rsp);
    });
  }
  window.PICKR = PICKR;
});
