let tabRec = localStorage.getItem("TabStore");
let qteRec = localStorage.getItem("Quantité");
console.log(tabRec);
console.log(qteRec);
console.log(typeof qteRec);
let tabRecJson = JSON.parse(tabRec);
console.log(tabRecJson);
console.log(tabRecJson.nom);

let tr = document.createElement("tr");
let htmlTr = `<tr><td>${tabRecJson.nom}</td><td>${tabRecJson.couleur}</td><td>${tabRecJson.prix} €</td><ion-icon name="caret-back-outline" id="decBtn"></ion-icon><p id="qte">${qteRec}</p><ion-icon name="caret-forward-outline" id="incBtn"></ion-icon></tr><td id="price">${tabRecJson.prix * qteRec} €</td>`;
tr.innerHTML = htmlTr;
document.getElementById('table__body').appendChild(tr);

let qteString = document.getElementById('qte');
let qte = parseInt(qteString.textContent, 10);

console.log("input= ", qte);
// console.log(typeof tabRecJson.prix);
console.log(typeof qte);

// Flèche Augmenter quantité
let price = document.getElementById('price');
let incBtn = document.getElementById('incBtn');
incBtn.addEventListener('click', function() {
    qte++;
    qteString.innerHTML = qte;
    price.innerHTML = `${tabRecJson.prix * qte} €`;
    localStorage.setItem("Quantité", qte);
});

// Flèche Baisser quantité
let decBtn = document.getElementById('decBtn');
decBtn.addEventListener('click', function() {
    qte--;
    if (qte < 1) {
        qte = 1;
    }else {        
        qteString.innerHTML = qte;
        price.innerHTML = `${tabRecJson.prix * qte} €`;
    }
    localStorage.setItem("Quantité", qte);
});

