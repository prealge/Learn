function flip() {
    if (q) label.innerHTML = set[termNumber][mode == 0 ? 1 : 0];
    else label.innerHTML = set[termNumber][mode == 0 ? 0 : 1];
    q = !q;
}

function restart() {
    termNumber = 0;
    set = shuffle(set);
}

function know() {
    progress += 1;
    set.splice(termNumber, 1);
    if (set.length === 0) exit();
    if (termNumber >= set.length) restart();
    label.innerHTML = set[termNumber][mode == 0 ? 1 : 0]
    q = false;
}

function dontKnow() {
    if (termNumber < set.length) termNumber++;
    else restart();
    label.innerHTML = set[termNumber][mode == 0 ? 1 : 0]
    q = false;
}

$.getJSON("sets/" + urlParams.get('file') + ".json", function(data){
    set = shuffle(Object.entries(data.set));
    progressBar.max = set.length;
    document.getElementById("title").textContent = data.title;
    label.innerHTML = set[termNumber][mode == 0 ? 1 : 0];
}).fail(function(error){
    console.log(error);
});