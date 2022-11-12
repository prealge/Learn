var input = document.getElementById("inpt");
var label = document.getElementById("lbl");
var button = document.getElementById("btn");
var container = document.getElementById("container");
var progressBar = document.getElementById("progress");
var termNumber, progress, q, set;
var mode = 0;

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

function question() {
    q = true;
    label.textContent = set[termNumber][mode == 0 ? 1 : 0];
    input.value = "";
    container.className = "";
    input.readOnly = false;
    button.disabled = true;
    input.select();
}

function setupLearn(file, start, count) {
    $.getJSON("sets/" + file + ".json", function(data){
        set = Object.entries(data.set);
        set = set.splice(start, count);
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

function next() {
    if (set.length === 0) setupLearn("APJuniorEnlgish", 0, 20);
    if (q) answer();
    else question();
    input.focus();
}

setInterval(function() {
    if (progressBar.value < progress) progressBar.value += (progress-progressBar.value)/50;
    if (progressBar.value > progress) progressBar.value -= (progressBar.value-progress)/50;
}, 1);

input.addEventListener('keyup', function (event) {
    if (input.value === "") button.disabled = true;
    else {
        button.disabled = false;
        if (event.key === "Enter" && input.value !== "") next();
    }
});

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


setupLearn("APJuniorEnglish", 0, 20)