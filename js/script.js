
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
    document.getElementById("name").innerHTML = jsonObj[0]['name'];
    document.getElementById("description").innerHTML = jsonObj[0]['description'];
    document.getElementById("price").innerHTML = jsonObj[0]['price'];
    
    let im = document.getElementById("image");
    let imUrl = jsonObj[0]['imageUrl'];
    im.src = imUrl;
};


