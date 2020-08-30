let tabRec = localStorage.getItem("TabStore");
let qteRec = localStorage.getItem("Quantité");
// console.log(tabRec);
// console.log(qteRec);
// console.log(typeof qteRec);
let tabRecJson = JSON.parse(tabRec);
console.log("Le tab est", tabRecJson);
console.log(tabRecJson[0].id);

for (let i = 0; i < tabRecJson.length; i++) {
    let tr = document.createElement("tr");
    let htmlTr = `<tr><td class = "tName">${tabRecJson[i].nom}</td><td class = "tColor">${tabRecJson[i].couleur}</td><td>${tabRecJson[i].prix} €</td><ion-icon name="caret-back-outline" class="decBtn"></ion-icon><p class="qte">1</p><ion-icon name="caret-forward-outline" class="incBtn"></ion-icon></tr><td class="price">${tabRecJson[i].prix * qteRec} €</td>`;
    tr.innerHTML = htmlTr;
    document.getElementById('table__body').appendChild(tr);

    let qteString = document.querySelectorAll('.qte');
    console.log(qteString.length);
    let qte = parseInt(qteString[i].textContent, 10);

    // console.log("input= ", qte);
    // console.log(typeof tabRecJson.prix);
    // console.log(typeof qte);

    // Flèche Augmenter quantité
    let price = document.querySelectorAll('.price');
    let incBtn = document.querySelectorAll('.incBtn');
    incBtn[i].addEventListener('click', function() {
        qte++;
        qteString[i].innerHTML = qte;
        price[i].innerHTML = `${tabRecJson[i].prix * qte} €`;
        localStorage.setItem("Quantité", qte);
    });

    // Flèche Baisser quantité
    let decBtn = document.querySelectorAll('.decBtn');
    decBtn[i].addEventListener('click', function() {
        qte--;
        if (qte < 1) {
            qte = 1;
        }else {        
            qteString[i].innerHTML = qte;
            price[i].innerHTML = `${tabRecJson[i].prix * qte} €`;
        }
        localStorage.setItem("Quantité", qte);
    });
    
};

// let tName = document.querySelectorAll ("td");
// console.log(tName);
// tName[0].innerHTML = "test";
