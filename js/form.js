const nom = document.getElementById('nom');
const prenom = document.getElementById('prenom');
const mail = document.getElementById('mail');
const phone = document.getElementById('phone');
const adress = document.getElementById('adresse');
const zip = document.getElementById('zip');
const ville = document.getElementById('ville');
const pays = document.getElementById('pays');

let productNb = localStorage.getItem('quantity');
let totalCost = localStorage.getItem('prixTotal');
let contact = JSON.parse(localStorage.getItem('formulaire'));
let products = JSON.parse(localStorage.getItem('panier'));
let order_id = JSON.parse(localStorage.getItem('idCommande'));

let formRecap = [];

let input = document.getElementsByTagName('input');
let btn2 = document.getElementById('btn_com');

// Génère un id de commande
function generateId() {
    let id = {id_commande : ((1 + Math.random()) * 58624).toString(16).substring(7)};
    localStorage.setItem('idCommande', JSON.stringify(id));
};

// Initialise les données du formulaire et les enregistre dans local Storage
let formStore = localStorage.getItem('formulaire');
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
    let formJson = JSON.parse(formStore);
    nom.value = formJson[0].nom;
    prenom.value = formJson[0].prenom;
    mail.value = formJson[0].mail;
    phone.value = formJson[0].phone;
    adresse.value = formJson[0].adresse;
    zip.value = formJson[0].zip;
    ville.value = formJson[0].ville;
    pays.value = formJson[0].pays;
};

// Enregistre les données du formulaire
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
    localStorage.setItem('formulaire', JSON.stringify(formRecap));
    localStorage.setItem('prixCommande', totalCost);
    localStorage.setItem('qtyCommande', productNb);
    videpanier();
});

function videpanier() {
    localStorage.removeItem('panier');
    localStorage.removeItem('quantity');
    localStorage.removeItem('prixTotal');
};

document.getElementById('formOrder').addEventListener('submit', function(e){
    e.preventDefault();
    sendData();
})

// Envoie les données au serveur
function sendData() {
        
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        body: JSON.stringify(contact, products, order_id),
        headers: {
            'Content-type': 'application/json'
            }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
    });

    window.location.href="confirm.html";
}

generateId();
