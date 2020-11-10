// Afficher le nombre de produits présents dans le panier
function onLoadQuantity() {
    let qty = localStorage.getItem('quantity');

    if (qty) {
        document.getElementById('cart-items').textContent = qty;
    }
};

onLoadQuantity();

let contact = localStorage.getItem('formulaire');
contact = JSON.parse(contact);
console.log("Contact : ", contact);
let products = localStorage.getItem('panier');
products = JSON.parse(products);
console.log ("Panier :", products);
let totalPrice = localStorage.getItem('prixTotal');
console.log();
let order_id = localStorage.getItem('idCommande');
order_id = JSON.parse(order_id);
console.log("Id commande :", order_id);

// Afficher les données utilisateur
let adress = document.querySelector('.adress');
adress.innerHTML += `
<div class="coord"><div>${contact[0].nom} ${contact[0].prenom}</div><div>${contact[0].adresse}</div><div>${contact[0].zip} ${contact[0].ville}</div></div><hr>
`;

// Récapitulatif des produits commandés
Object.values(products).map(item => {
    let valid = document.querySelector('.valid2');
    valid.innerHTML += `
    <div class="recapProd">${item.nom} - Couleur : ${item.couleur} - Prix : ${item.prix} € - Quantité : ${item.qte}</div>
    `;
});

let montTot = document.querySelector('.montTotal');
montTot.innerHTML += `
${totalPrice} €
`

// **********Fetch*************

let btn = document.querySelector('.btn_com');
console.log(btn);

btn.addEventListener('submit', function(e) {
    e.preventDefault();

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
        console.log("response", data);
    })
})
