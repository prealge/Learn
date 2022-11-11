var termNumber = 0;
var label, input, progress, mode = 0, q = false;

function answer() {
    q = false;
    input.readOnly = true;
    if (input.value === set[termNumber][mode]) {
        input.style.color = "green";
        progress.value++;
        set.splice(termNumber, 1);
        if (set.length == 0) label.textContent = ("set complete!");
        else label.textContent = "good job!";
    } else {
        input.style.color = "red";
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
    input.style.color = "black";
    input.readOnly = false;
    input.select();
    input.focus();
}

function next() {
    if (q === false) question();
    else if (input.value !== "") answer();
}

function setup () {
    label = document.getElementById("lbl");

    progress = document.getElementById("prgrss");
    progress.max = set.length;
    
    input = document.getElementById("inpt");
    input.addEventListener('keyup', function (event) {
        if (event.key === "Enter") next();
    });

    question();
}