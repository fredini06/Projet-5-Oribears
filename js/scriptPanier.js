let tabRec = localStorage.getItem("TabStore");
let qteRec = localStorage.getItem("Quantité");
let tabId = localStorage.getItem("TabId");
tabId = JSON.parse(tabId);
qteRec = parseInt(qteRec);
let qteDiv = qteRec / tabId.length;
let tabRecJson = JSON.parse(tabRec);

// Sous-total
let totalCost = localStorage.getItem('CoutTotal');
totalCost = parseInt(totalCost);
// console.log(typeof totalCost);
let div = document.createElement("div");
let htmlDiv = `<div class="sTotalPrix">${totalCost} €</div>`;
div.innerHTML = htmlDiv;
document.getElementsByClassName('sTotal')[0].appendChild(div);

for (let i = 0; i < tabRecJson.length; i++) {
    let tr = document.createElement("tr");
    let htmlTr = `<tr><td class = "tName">${tabRecJson[i].nom}</td><td class = "tColor">${tabRecJson[i].couleur}</td><td>${tabRecJson[i].prix} €</td><ion-icon name="caret-back-outline" class="decBtn"></ion-icon><p class="qte">${qteDiv}</p><ion-icon name="caret-forward-outline" class="incBtn"></ion-icon></tr><td class="price">${tabRecJson[i].prix} €</td>`;
    tr.innerHTML = htmlTr;
    document.getElementById('table__body').appendChild(tr);

    let qteString = document.querySelectorAll('.qte');
    let qte = parseInt(qteString[i].textContent, 10);

    // Flèche Augmenter quantité
    let price = document.querySelectorAll('.price');
    let incBtn = document.querySelectorAll('.incBtn');
    incBtn[i].addEventListener('click', function() {
        let totalCost = localStorage.getItem('CoutTotal');
        totalCost = parseInt(totalCost);
        qte++;
        qteString[i].innerHTML = qte;
        price[i].innerHTML = `${tabRecJson[i].prix * qte} €`;
        tabRecJson[i].qte +=1;
        totalCost = totalCost + (tabRecJson[i].prix);
        localStorage.setItem("CoutTotal", totalCost);
        document.getElementsByClassName('sTotalPrix')[0].innerHTML = totalCost + ' €';

        // Mettre nouveau tab en place
        
        // localStorage.setItem("TabStore", JSON.stringify(tabRecJson[i]));
        
        let qtePan = localStorage.getItem("Quantité panier");
        if (qtePan == undefined) {
            qteDiv = qteDiv + qteRec;
            localStorage.setItem("Quantité panier", qteDiv);
        }else {
            qteDiv++;
            localStorage.setItem("Quantité panier", qteDiv);
        };
    });


    // Flèche Baisser quantité
    let decBtn = document.querySelectorAll('.decBtn');
    decBtn[i].addEventListener('click', function() {
        let totalCost = localStorage.getItem('CoutTotal');
        totalCost = parseInt(totalCost);
        qte--;
        qteDiv--;
        localStorage.setItem("Quantité panier", qteDiv);
        if (qte < 1) {
            qte = 1;
        }else {        
            qteString[i].innerHTML = qte;
            price[i].innerHTML = `${tabRecJson[i].prix * qte} €`;
            totalCost = totalCost - (tabRecJson[i].prix);
            localStorage.setItem("CoutTotal", totalCost);
            document.getElementsByClassName('sTotalPrix')[0].innerHTML = totalCost + ' €';
        }        
    });
    
};



