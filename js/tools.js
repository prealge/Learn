// Read URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Defines HTML elements
var label = document.getElementById("label");
var progressBar = document.getElementById("progress");

// Defines miscellaneous variables
var set, termNumber = 0, progress = 0, q = false, mode = urlParams.get('mode') ? Number(urlParams.get('mode')) : 0;

// Shuffles the order of an array
function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

// Return to set page
function exit() {
    window.location.href = "set.html?file=" + urlParams.get('file');
}

// Sets interval to run progress bar animation
setInterval(function() {
  if (progressBar.value < progress) progressBar.value += (progress-progressBar.value)/50;
  if (progressBar.value > progress) progressBar.value -= (progressBar.value-progress)/50;
}, 1);
