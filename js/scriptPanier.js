let tabRec = localStorage.getItem("TabStore");
let qteRec = localStorage.getItem("Quantité");
let tabId = localStorage.getItem("TabId");
tabId = JSON.parse(tabId);
qteRec = parseInt(qteRec);
let tabRecJson = JSON.parse(tabRec);

// Sous-total
let totalCost = localStorage.getItem('CoutTotal');
totalCost = parseInt(totalCost);
let div = document.createElement("div");
let htmlDiv = `<div class="sTotalPrix">${totalCost} €</div>`;
div.innerHTML = htmlDiv;
document.getElementsByClassName('sTotal')[0].appendChild(div);

for (let i = 0; i < tabRecJson.length; i++) {
    let tr = document.createElement("tr");
    let htmlTr = `<tr><td class = "tName">${tabRecJson[i].nom}</td><td class = "tColor">${tabRecJson[i].couleur}</td><td>${tabRecJson[i].prix} €</td><ion-icon name="caret-back-outline" class="decBtn"></ion-icon><p class="qte">${tabRecJson[i].qte}</p><ion-icon name="caret-forward-outline" class="incBtn"></ion-icon></tr><td class="price">${tabRecJson[i].prix * tabRecJson[i].qte} €</td><td class="supprime">Supprimer</td>`;
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
        qteRec++;
        qteString[i].innerHTML = qte;
        price[i].innerHTML = `${tabRecJson[0].prix * qte} €`;
        tabRecJson[i].qte +=1;
        totalCost = totalCost + (tabRecJson[i].prix);
        localStorage.setItem("CoutTotal", totalCost);
        localStorage.setItem("Quantité", qteRec);
        document.getElementsByClassName('sTotalPrix')[0].innerHTML = totalCost + ' €';
        
        localStorage.setItem("TabStore", JSON.stringify(tabRecJson));
        
    });


    // Flèche Baisser quantité
    let decBtn = document.querySelectorAll('.decBtn');
    decBtn[i].addEventListener('click', function() {
        let totalCost = localStorage.getItem('CoutTotal');
        totalCost = parseInt(totalCost);
        qte--;
        qteRec--;
        if (qte < 1) {
            qte = 1;
        }else {        
            qteString[i].innerHTML = qte;
            price[i].innerHTML = `${tabRecJson[i].prix * qte} €`;
            tabRecJson[i].qte -=1;
            totalCost = totalCost - (tabRecJson[i].prix);
            localStorage.setItem("CoutTotal", totalCost);
            localStorage.setItem("Quantité", qteRec);
            document.getElementsByClassName('sTotalPrix')[0].innerHTML = totalCost + ' €';
            localStorage.setItem("TabStore", JSON.stringify(tabRecJson));
        };        
    });


    // Bouton Supprimer
    let btnSup = document.querySelectorAll('.supprime');
    btnSup[i].addEventListener('click', function(e) {
        var btnclick = e.target;
        btnclick.parentElement.remove();
        tabRecJson.splice(i, 1);
        // document.getElementById('table__body').removeChild(tr);
        // totalCost = totalCost - (tabRecJson[i].prix);
        totalCost = totalCost - (tabRecJson[i].prix * tabRecJson[i].qte);
        localStorage.setItem("CoutTotal", totalCost);
        document.getElementsByClassName('sTotalPrix')[0].innerHTML = totalCost + ' €';
        localStorage.setItem("TabStore", JSON.stringify(tabRecJson));
        document.location.reload();
    });

    // let btnSup = document.querySelectorAll('.supprime');
    // let productName;
    // btnSup[i].addEventListener('click', () => {
    //     productNumber = document.querySelectorAll('.qte');
    //     console.log(productNumber[i].textContent);
    //     productNumber = productNumber[i].textContent;
        

    // });
    
};


// Bouton Supprimer
// for (let i = 0; i < tabRecJson.length; i++) {
//     let btnSup = document.querySelectorAll('.supprime');
//     btnSup[i].addEventListener('click', function(e) {
//         console.log(i);
//         var btnclick = e.target;
//         btnclick.parentElement.remove();
//         tabRecJson.splice(i, 1);
//         totalCost = totalCost - (tabRecJson[i].prix);
//         localStorage.setItem("CoutTotal", totalCost);
//         document.getElementsByClassName('sTotalPrix')[0].innerHTML = totalCost + ' €';
//         localStorage.setItem("TabStore", JSON.stringify(tabRecJson));
//         console.log("test", tabRecJson[i]);
//     });

// };


// Formulaire

let formRecap = [];

const nom = document.getElementById('nom');
const prenom = document.getElementById('prenom');
const mail = document.getElementById('mail');
const phone = document.getElementById('phone');
const adress = document.getElementById('adresse');
const zip = document.getElementById('zip');
const ville = document.getElementById('ville');
const pays = document.getElementById('pays');

let input = document.getElementsByTagName('input');
let btn2 = document.getElementById('card_btn2');
// console.log(btn2);

let formStore = localStorage.getItem('Formulaire');
// console.log(formStore);
if (formStore == null) {
    nom.value = '';
    prenom.value = '';
    mail.value = '';
    phone.value = '';
    adress.value = '';
    zip.value = '';
    ville.value = '';
    pays.value = '';
}else {
    console.log(formStore);
    let formJson = JSON.parse(formStore);
    console.log(formJson);
    nom.value = formJson[0].nom;
    prenom.value = formJson[0].prenom;
    mail.value = formJson[0].mail;
    phone.value = formJson[0].phone;
    adress.value = formJson[0].adress;
    zip.value = formJson[0].zip;
    ville.value = formJson[0].ville;
    pays.value = formJson[0].pays;
};


btn2.addEventListener('click', function() {
    let form = {
        nom: nom.value,
        prenom: prenom.value,
        mail: mail.value,
        phone: phone.value,
        adress: adress.value,
        zip: zip.value,
        pays: pays.value
    };
    formRecap.push(form);
    console.log(formRecap);
    localStorage.setItem('Formulaire', JSON.stringify(formRecap));
});


// Empêcher le form d'être soumis
// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//   });