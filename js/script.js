
const section = document.querySelector("section");
let xhr = new XMLHttpRequest();

xhr.open("GET", "http://localhost:3000/api/teddies");
xhr.responseType = 'json';
xhr.send();
xhr.onload = function() {
    let teddies = xhr.response;
    showTeddies(teddies);
};


function showTeddies(jsonObj) {
    let myH1 = document.createElement("h1");
    myH1.textContent = jsonObj[0]['colors'][2];
    section.appendChild(myH1);
};