function cartDisplay() {
    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);
    let totalCost = localStorage.getItem('prixTotal');
    totalCost = parseInt(totalCost);
    
    if(cartItems) {
        Object.values(cartItems).map(item => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <tr><td class = "tName">${item.nom}</td><td class = "tColor">${item.couleur}</td><td>${item.prix} €</td><ion-icon name="caret-back-outline" class="decBtn"></ion-icon><p class="qte">${item.qte}</p><ion-icon name="caret-forward-outline" class="incBtn"></ion-icon></tr><td class="price">${item.prix * item.qte} €</td><td class="supprime">Supprimer</td>
            `;
            document.getElementById('table__body').appendChild(tr);
            
            // Sous-total
            let div = document.querySelector('.sTotal');
            div.innerHTML = `<p>Sous-total</p><span class="sTotalPrix">${totalCost} €</span>`;
        }); 
    }
};

cartDisplay()


// let tabRec = localStorage.getItem("panier");
// tabRec = JSON.parse(tabRec);
// console.log(tabRec);
// let qteRec = localStorage.getItem("quantity");
// qteRec = parseInt(qteRec);

// // Sous-total
// let totalCost = localStorage.getItem('prixTotal');
// totalCost = parseInt(totalCost);
// let div = document.createElement("div");
// let htmlDiv = `<div class="sTotalPrix">${totalCost} €</div>`;
// div.innerHTML = htmlDiv;
// document.getElementsByClassName('sTotal')[0].appendChild(div);

// for (let i = 0; i < tabRec.length; i++) {
//     let tr = document.createElement("tr");
//     let htmlTr = `<tr><td class = "tName">${tabRec[i].nom}</td><td class = "tColor">${tabRec[i].couleur}</td><td>${tabRec[i].prix} €</td><ion-icon name="caret-back-outline" class="decBtn"></ion-icon><p class="qte">${tabRec[i].qte}</p><ion-icon name="caret-forward-outline" class="incBtn"></ion-icon></tr><td class="price">${tabRec[i].prix * tabRec[i].qte} €</td><td class="supprime">Supprimer</td>`;
//     tr.innerHTML = htmlTr;
//     document.getElementById('table__body').appendChild(tr);

//     let qteString = document.querySelectorAll('.qte');
//     let qte = parseInt(qteString[i].textContent, 10);

//     // Flèche Augmenter quantité
//     let price = document.querySelectorAll('.price');
//     let incBtn = document.querySelectorAll('.incBtn');
//     incBtn[i].addEventListener('click', function() {
//         let totalCost = localStorage.getItem('prixTotal');
//         totalCost = parseInt(totalCost);
//         qte++;
//         qteRec++;
//         qteString[i].innerHTML = qte;
//         price[i].innerHTML = `${tabRec[0].prix * qte} €`;
//         tabRec[i].qte +=1;
//         totalCost = totalCost + (tabRec[i].prix);
//         localStorage.setItem("prixTotal", totalCost);
//         localStorage.setItem("quantity", qteRec);
//         document.getElementsByClassName('sTotalPrix')[0].innerHTML = totalCost + ' €';
        
//         localStorage.setItem("panier", JSON.stringify(tabRec));
        
//     });


//     // Flèche Baisser quantité
//     let decBtn = document.querySelectorAll('.decBtn');
//     decBtn[i].addEventListener('click', function() {
//         let totalCost = localStorage.getItem('prixTotal');
//         totalCost = parseInt(totalCost);
//         qte--;
//         qteRec--;
//         if (qte < 1) {
//             qte = 1;
//         }else {        
//             qteString[i].innerHTML = qte;
//             price[i].innerHTML = `${tabRec[i].prix * qte} €`;
//             tabRec[i].qte -=1;
//             totalCost = totalCost - (tabRec[i].prix);
//             localStorage.setItem("prixTotal", totalCost);
//             localStorage.setItem("quantity", qteRec);
//             document.getElementsByClassName('sTotalPrix')[0].innerHTML = totalCost + ' €';
//             localStorage.setItem("panier", JSON.stringify(tabRec));
//         };        
//     });


//     // Bouton Supprimer
//     let btnSup = document.querySelectorAll('.supprime');
//     btnSup[i].addEventListener('click', function(e) {
//         var btnclick = e.target;
//         btnclick.parentElement.remove();
//         tabRec.splice(i, 1);
//         // document.getElementById('table__body').removeChild(tr);
//         // totalCost = totalCost - (tabRec[i].prix);
//         totalCost = totalCost - (tabRec[i].prix * tabRec[i].qte);
//         localStorage.setItem("prixTotal", totalCost);
//         document.getElementsByClassName('sTotalPrix')[0].innerHTML = totalCost + ' €';
//         localStorage.setItem("panier", JSON.stringify(tabRec));
//         document.location.reload();
//     });
    
// };

// function onLoadQuantity() {
//     let qty = localStorage.getItem('quantity');

//     if (qty) {
//         document.getElementById('cart-items').textContent = qty;
//     }
// };

// onLoadQuantity();


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