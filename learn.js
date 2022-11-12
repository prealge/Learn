// Learn.JS
// prealge

// Reads URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Defines HTML elements
var input = document.getElementById("learnInput");
var label = document.getElementById("learnLabel");
var button = document.getElementById("learnButton");
var container = document.getElementById("learnContainer");
var progressBar = document.getElementById("learnProgress");

// Defines miscellaneous variables
var termNumber, progress, q;

// Defines set variable
var set;

// Sets mode for learn
var mode;
if (urlParams.get('mode')) mode = Number(urlParams.get('mode'));
else mode = 0;

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

// Checks answers
function answer() {
    q = false;
    input.readOnly = true;
    if (input.value === set[termNumber][mode]) {
        progress += 1;
        container.className = "correct";
        set.splice(termNumber, 1);
        if (set.length == 0) {
            label.textContent = ("set complete!");
            button.textContent = "Restart";
        } else label.textContent = "good job!";
    } else {
        container.className = "incorrect";
        label.textContent = set[termNumber][mode];
        if (termNumber < set.length) termNumber++;
    }
    if (termNumber >= set.length) {
        termNumber = 0;
        set = shuffle(set);
    }
}

// Shows next question
function question() {
    q = true;
    label.textContent = set[termNumber][mode == 0 ? 1 : 0];
    input.value = "";
    container.className = "";
    input.readOnly = false;
    button.disabled = true;
    input.select();
}

// Reads study set from JSON file and resets HTML elements
function setupLearn() {
    $.getJSON("sets/" + urlParams.get('file') + ".json", function(data){
        set = Object.entries(data.set);
        if (urlParams.get('i') && urlParams.get('c')) set = set.splice(Number(urlParams.get('i')), Number(urlParams.get('c')));
        set = shuffle(set);
        button.textContent = "Next";
        progressBar.max = set.length;
        progress = 0;
        termNumber = 0, q = false;
        question();
    }).fail(function(error){
        console.log(error);
    });
}

// Handles question, answer, and reset functions
function next() {
    if (set.length === 0) setupLearn("APJuniorEnlgish", 0, 20);
    if (q) answer();
    else question();
    input.focus();
}

// Sets interval to run progress bar animation
setInterval(function() {
    if (progressBar.value < progress) progressBar.value += (progress-progressBar.value)/50;
    if (progressBar.value > progress) progressBar.value -= (progressBar.value-progress)/50;
}, 1);

// Event listener to run next function and enable/disable button
input.addEventListener('keyup', function (event) {
    if (input.value === "") button.disabled = true;
    else {
        button.disabled = false;
        if (event.key === "Enter" && input.value !== "") next();
    }
});

// Calls setup function
setupLearn();