// Set.JS
// prealge

// Read URL parameters
const urlParams = new URLSearchParams(window.location.search);

$.getJSON("sets/" + urlParams.get('file') + ".json", function(data){
    document.getElementById("setTitle").textContent = data.title;
    document.getElementById("setHeader").textContent = data.title;
    document.getElementById("setLearn").onclick = function () {
        window.location.href = "learn.html?file=" + urlParams.get('file');
    };
    for (let i = 0; i < Object.keys(data.set).length; i++) {
        let newRow =document.getElementById("setTable").insertRow(-1)
        newRow.insertCell(0).textContent = Object.keys(data.set)[i];
        newRow.insertCell(1).textContent = Object.entries(data.set)[i][1];
    }
}).fail(function(error){
    console.log(error);
});