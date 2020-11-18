// Afficher le nombre de produits présents dans le panier
function onLoadQuantity() {
    let qty = localStorage.getItem('quantity');

    if (qty) {
        document.getElementById('cart-items').textContent = qty;
    }
};

onLoadQuantity();

let totalPrice = localStorage.getItem('prixTotal');
console.log();
let order_id = JSON.parse(localStorage.getItem('idCommande'));
console.log("Id commande :", order_id);
let quantity = localStorage.getItem('quantity');

// Afficher l'id commande
let adress = document.querySelector('.adress');
adress.innerHTML += `<div class="finalValid">Identifiant de commande : ${order_id.id_commande}</div>`;

let montTot = document.querySelector('.montTotal');
montTot.innerHTML += `${totalPrice} € <p>(${quantity} article(s))</p>`;

// **********Fetch*************

// let btn = document.querySelector('.btn_com');
// console.log(btn);

// btn.addEventListener('submit', function(e) {
//     e.preventDefault();

//     fetch('http://localhost:3000/api/teddies/order', {
//         method: 'POST',
//         body: JSON.stringify(contact, products, order_id),
//         headers: {
//             'Content-type': 'application/json'
//           }
//     })
//     .then(function(response) {
//         return response.json()
//     })
//     .then(function(data) {
//         console.log("response", data);
//     })
// })
