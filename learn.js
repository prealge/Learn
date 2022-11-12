var label, input, button, progressBar, container, termNumber, progress, q;
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

function setupLearn() {
    loadSet();
    button.textContent = "Next";
    progressBar.max = set.length;
    progress = 0;
    termNumber = 0, q = false;
}

function next() {
    if (set.length === 0) setupLearn();
    if (q) answer();
    else question();
    input.focus();
}

function loadLearn() {
    input = document.getElementById("inpt");
    label = document.getElementById("lbl");
    button = document.getElementById("btn");
    container = document.getElementById("container");
    progressBar = document.getElementById("progress");
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
    setupLearn();
    question();
}