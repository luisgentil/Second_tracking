var app = {
  inicio: function() {
    document.getElementById('notas').innerText ="OK!";
        navigator.mediaDevices.getUserMedia({
      'video': {
        'facingMode': 'environment'
      }
    }).then(function(mediaStream) {
      var mediaControl = document.querySelector('video');
      mediaControl.srcObject = mediaStream;
      mediaControl.src = URL.createObjectURL(mediaStream);
    });
      tracking.ColorTracker.registerColor('red', function(r, g, b) {
    if (r > 100 && g < 50 && b < 50) {
      return true;
    }
    return false;
  });
  var colors = new tracking.ColorTracker(['red','cyan', 'magenta', 'yellow']);
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  colors.on('track', function(event) {
  //  context.strokeStyle = '#fff';
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } else {
     // console.log(event.data);
      event.data.forEach(function(rect) {
        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    //    console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        context.font = '11px Helvetica';
        context.fillStyle = rect.color;
        context.fillText(rect.color, rect.x + rect.width + 5, rect.y + 11);
      });
    }
  });

  tracking.track('#myVideo', colors, {camera: true});
      },
};


if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
      }, false);
    }