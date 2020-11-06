function onLoadQuantity() {
    let qty = localStorage.getItem('quantity');

    if (qty) {
        document.getElementById('cart-items').textContent = qty;
    }
};

onLoadQuantity();

let form = localStorage.getItem('formulaire');
form = JSON.parse(form);
console.log(form);
let cartItems = localStorage.getItem('panier');
cartItems = JSON.parse(cartItems);
console.log(cartItems);
let totalPrice = localStorage.getItem('prixTotal');
console.log();

let adress = document.querySelector('.adress');
adress.innerHTML += `
<div class="coord"><div>${form[0].nom} ${form[0].prenom}</div><div>${form[0].adresse}</div><div>${form[0].zip} ${form[0].ville}</div></div><hr>
`;

Object.values(cartItems).map(item => {
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
        body: JSON.stringify(form, cartItems),
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
