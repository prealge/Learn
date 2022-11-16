// Defines HTML elements
var input = document.getElementById("learnInput");
var button = document.getElementById("nextButton");
var labelContainer = document.getElementById("label-container");
var container = document.getElementById("container");

// Checks answers
function answer() {
    q = false;
    input.readOnly = true;
    if (input.value === set[termNumber][mode]) {
        progress += 1;
        $( "#container" ).removeClass("incorrect").addClass("correct");
        set.splice(termNumber, 1);
        if (set.length == 0) {
            label.textContent = ("set complete!");
            button.textContent = "Exit";
        } else label.textContent = "good job!";
    } else {
        $( "#container" ).removeClass("correct").addClass("incorrect");
        label.innerHTML = set[termNumber][mode];
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
    label.innerHTML = set[termNumber][mode == 0 ? 1 : 0];
    input.value = "";
    $("#container").removeClass("correct incorrect");
    input.readOnly = false;
    button.disabled = true;
    input.select();
}

// Handles question, answer, and reset functions
function next() {
    if (set.length === 0) exit();
    if (q) answer();
    else question();
    input.focus();
}

// Event listener to run next function and enable/disable button
input.addEventListener('keyup', function (event) {
    if (input.value === "") button.disabled = true;
    else {
        button.disabled = false;
        if (event.key === "Enter" && input.value !== "") next();
    }
});

if (window.mobileCheck()) {
    $("#container").addClass("small");
    $("#label-container").addClass("small");
}

$.getJSON("sets/" + urlParams.get('file') + ".json", function(data){
    set = shuffle(Object.entries(data.set));
    progressBar.max = set.length;
    document.getElementById("title").textContent = data.title;
    question();
}).fail(function(error){
    console.log(error);
});