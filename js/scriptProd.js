let idRecup = location.search;
let idReelle = idRecup.substring(4);

fetch("http://localhost:3000/api/teddies/" + idReelle)
    .then(function (response) {
        response.json()
            .then(function (value) {
                showTeddy(value);
                let obj = JSON.stringify(value);
        })            
    }).catch((err) => console.log('ERREUR : ', err));
    
let tabVide = [];


// Affiche le produit sélectionné précedemment
function showTeddy(product) {
    document.getElementById("name").innerHTML += product.name;
    document.getElementById("description").innerHTML += product.description;
    document.getElementById("price").innerHTML += product.price/100;
    
    let im = document.getElementById("img");
    let imUrl = product.imageUrl;
    im.src = imUrl;

    let color = document.getElementById('couleur');

    // Boucle pour ajouter les options à la balise select avec le tableau "product"
    for (let i=0; i < product.colors.length; i++) {
        color[i] = new Option(product.colors[i], product.colors[i]);
    }

    let btnValid = document.getElementById('btnValid');
    btnValid.addEventListener('click', () => {
        quantity(product);
    });
};

// Afficher le nombre de produits présents dans le panier
function onLoadQuantity() {
    let qty = localStorage.getItem('quantity');

    if (qty) {
        document.getElementById('cart-items').textContent = qty;
    }
};

// Mise à jour du nombre de produits sélectionnés dans le Local Storage
function quantity(product) {
    let color = document.getElementById('couleur');
    let colorTeddy = color.options[color.selectedIndex].text;
    
    let qty = localStorage.getItem('quantity');
    qty = parseInt(qty);

    if (qty) {
        localStorage.setItem('quantity', qty + 1);
        document.getElementById('cart-items').textContent = qty + 1;
    }else {
        localStorage.setItem('quantity', 1);
        document.getElementById('cart-items').textContent = 1;
    };

    // Récupération des données dans un objet
    let tabRecap = {
        nom: product.name,
        tag: product.name + colorTeddy,
        description: product.description,
        prix: product.price/100,
        id: product._id + colorTeddy.replace(/ /g, ""),
        couleur: colorTeddy,
        qte: 0
    };

    setItems(tabRecap);
    totalCost(tabRecap);
};

// Mise à jour des produits dans le panier
function setItems(tabRecap) {
    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null) {

        if(cartItems[tabRecap.id] == undefined) {
            cartItems = {
                ...cartItems,
                [tabRecap.id]: tabRecap            
            };
        }
        cartItems[tabRecap.id].qte += 1;
    } else {
        tabRecap.qte = 1;
        cartItems = {
            [tabRecap.id]: tabRecap
        };
    };
    
    localStorage.setItem('panier', JSON.stringify(cartItems));
};

// Mise à jour du coût total dans le Local Storage
function totalCost(tabRecap) {
    let cartCost = localStorage.getItem('prixTotal');

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('prixTotal', cartCost + tabRecap.prix);
    }else {
        localStorage.setItem('prixTotal', tabRecap.prix);
    }
};

onLoadQuantity();



