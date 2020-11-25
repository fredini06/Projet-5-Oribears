// Afficher le nombre de produits présents dans le panier
function onLoadQuantity() {
    let qty = localStorage.getItem('quantity');

    if (qty) {
        document.getElementById('cart-items').textContent = qty;
    }
};

onLoadQuantity();

let totalPrice = localStorage.getItem('prixCommande');
let order_id = JSON.parse(localStorage.getItem('idCommande'));
console.log("Id commande :", order_id);
let quantity = localStorage.getItem('qtyCommande');

// Afficher l'id commande
let adress = document.querySelector('.adress');
adress.innerHTML += `<div class="finalValid">Identifiant de commande : ${order_id.id_commande}</div>`;

let montTot = document.querySelector('.montTotal');
montTot.innerHTML += `${totalPrice} € <p>(${quantity} article(s))</p>`;
