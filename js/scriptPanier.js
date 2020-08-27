let tabRec = localStorage.getItem("TabStore");
console.log(tabRec);
let tabRecJson = JSON.parse(tabRec);
console.log(tabRecJson);
console.log(tabRecJson.nom);

let tr = document.createElement("tr");
let htmlTr = `<tr><td>${tabRecJson.nom}</td><td>${tabRecJson.couleur}</td><td>${tabRecJson.prix} €</td><ion-icon name="caret-back-outline" id="decBtn"></ion-icon><input type="text" id="qte" value="1" /><ion-icon name="caret-forward-outline" id="incBtn"></ion-icon></tr><td id="price">${tabRecJson.prix} €</td>`;
tr.innerHTML = htmlTr;
document.getElementById('table__body').appendChild(tr);

let qte = document.getElementById('qte');
// console.log("input= ", qte);
// console.log(typeof tabRecJson.prix);

let price = document.getElementById('price');
let incBtn = document.getElementById('incBtn');
incBtn.addEventListener('click', function() {
    console.log("before", qte.value);
    qte.value++;
    console.log("after", qte.value);
    console.log(price);
    price.innerHTML = `${tabRecJson.prix * qte.value} €`;
    console.log(price);
});

let decBtn = document.getElementById('decBtn');
decBtn.addEventListener('click', function() {
    console.log("before", qte.value);
    qte.value--;
    console.log("after", qte.value);
    console.log(price);
    price.innerHTML = `${tabRecJson.prix * qte.value} €`;
    console.log(price);
});

