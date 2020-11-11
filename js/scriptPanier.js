// Affichage des produits sélectionnés sur la page panier
function cartDisplay() {
    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);
    let totalCost = localStorage.getItem('prixTotal');
    totalCost = parseInt(totalCost);
    
    if(cartItems) {
        Object.values(cartItems).map(item => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td class="tName">${item.nom}</td><td class="tColor">${item.couleur}</td><td>${item.prix} €</td><ion-icon name="caret-back-outline" class="decBtn"></ion-icon><p class="qte">${item.qte}</p><ion-icon name="caret-forward-outline" class="incBtn"></ion-icon><td class="price">${item.prix * item.qte} €</td><td class="supprime">Supprimer</td>
            `;
            document.getElementById('table__body').appendChild(tr);
            
            // Sous-total
            let div = document.querySelector('.sTotal');
            div.innerHTML = `<p>Sous-total :</p><span class="sTotalPrix">${totalCost} €</span>`;

        }); 
    };

    deleteBtn()
    quantityBtn()
};

// Effacer les produits du panier
function deleteBtn() {
    let deleteBtn = document.querySelectorAll('.supprime');
    let productName;
    let productColor;
    let productNb = localStorage.getItem('quantity');
    let prixTotal = localStorage.getItem('prixTotal')
    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems);
    // console.log(cartItems.NorbertTan);

    for(let i=0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', () => {
            productName = deleteBtn[i].parentElement.cells[0].textContent;
            
            productColor = deleteBtn[i].parentElement.cells[1].textContent;
            
            let prod = productName + productColor;
            localStorage.setItem('quantity', productNb - cartItems[prod].qte);
            localStorage.setItem('prixTotal', prixTotal - (cartItems[prod].qte * cartItems[prod].prix));

            delete cartItems[prod];
            localStorage.setItem('panier', JSON.stringify(cartItems));

            // cartDisplay();
            document.location.reload();
        });
    }
};

// Fonction qui permet d'augmenter ou de baisser la quantité des produits
function quantityBtn() {
    let decreaseBtn = document.querySelectorAll('.decBtn');
    let increaseBtn = document.querySelectorAll('.incBtn');
    let currentQty;
    let productName;
    let productColor;

    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);
    let productNb = localStorage.getItem('quantity');
    productNb = parseInt(productNb);
    let prixTotal = localStorage.getItem('prixTotal');
    prixTotal = parseInt(prixTotal);

    for(let i=0; i < decreaseBtn.length; i++) {
        decreaseBtn[i].addEventListener('click', () => {
            currentQty = decreaseBtn[i].parentElement.querySelector('.qte').textContent;
            productName = decreaseBtn[i].parentElement.cells[0].textContent;
            
            productColor = decreaseBtn[i].parentElement.cells[1].textContent;

            let prod = productName + productColor;
            if(cartItems[prod].qte > 1) {
                cartItems[prod].qte -= 1;
                localStorage.setItem('panier', JSON.stringify(cartItems));
                localStorage.setItem('quantity', productNb -1);
                localStorage.setItem('prixTotal', prixTotal - parseInt(cartItems[prod].prix));
                document.location.reload();
            }
        });
    };

    for(let i=0; i < increaseBtn.length; i++) {
        increaseBtn[i].addEventListener('click', () => {
            currentQty = increaseBtn[i].parentElement.querySelector('.qte').textContent;
            productName = increaseBtn[i].parentElement.cells[0].textContent;
            
            productColor = increaseBtn[i].parentElement.cells[1].textContent;

            let prod = productName + productColor;

            cartItems[prod].qte += 1;
            localStorage.setItem('panier', JSON.stringify(cartItems));
            localStorage.setItem('quantity', productNb + 1);
            localStorage.setItem('prixTotal', prixTotal + parseInt(cartItems[prod].prix));
            document.location.reload();
        });
    };

};

// Génère un id de commande
function generateId() {
    let id = {id_commande : ((1 + Math.random()) * 58624).toString(16).substring(7)};
    localStorage.setItem('idCommande', JSON.stringify(id));
};

cartDisplay();

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
// console.log("bouton", btn2);

// Initialise les données du formulaire et les enregistre dans local Storage
let formStore = localStorage.getItem('formulaire');
// console.log(formStore);
if (formStore == null) {
    nom.value = '';
    prenom.value = '';
    mail.value = '';
    phone.value = '';
    adresse.value = '';
    zip.value = '';
    ville.value = '';
    pays.value = '';
}else {
    // console.log(formStore);
    let formJson = JSON.parse(formStore);
    // console.log(formJson);
    nom.value = formJson[0].nom;
    prenom.value = formJson[0].prenom;
    mail.value = formJson[0].mail;
    phone.value = formJson[0].phone;
    adresse.value = formJson[0].adresse;
    zip.value = formJson[0].zip;
    ville.value = formJson[0].ville;
    pays.value = formJson[0].pays;
};

// Enregistre les données et passe à la page de confirmation
btn2.addEventListener('click', function() {
    let form = {
        nom: nom.value,
        prenom: prenom.value,
        mail: mail.value,
        phone: phone.value,
        adresse: adresse.value,
        zip: zip.value,
        ville: ville.value,
        pays: pays.value
    };
    formRecap.push(form);
    // console.log("form", formRecap);
    localStorage.setItem('formulaire', JSON.stringify(formRecap));
    generateId()
});
