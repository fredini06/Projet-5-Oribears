let idRecup = location.search;
let idReelle = idRecup.substring(4);
// console.log(idReelle);

fetch("http://localhost:3000/api/teddies/" + idReelle)
    .then(function (response) {
        response.json()
            .then(function (value) {
                showTeddy(value);
                // console.log("value : ", value);
                let obj = JSON.stringify(value);
                // console.log("obj : ", obj);
        })            
    }).catch((err) => console.log('ERREUR : ', err));
    
let tabVide = [];



function showTeddy(product) {
    // console.log("produit sélectionné : ", product);
    document.getElementById("name").innerHTML += product.name;
    document.getElementById("description").innerHTML += product.description;
    document.getElementById("price").innerHTML += product.price/100;
    
    let im = document.getElementById("image");
    let imUrl = product.imageUrl;
    im.src = imUrl;

    let color = document.getElementById('couleur');
    // console.log("Le select est", color);

    // Boucle pour ajouter les options à la balise select avec le tableau "product"
    for (let i=0; i < product.colors.length; i++) {
        color[i] = new Option(product.colors[i], product.colors[i]);
    }

    let tabId = localStorage.getItem('TabId');
    tabId = JSON.parse(tabId);


    let btnValid = document.getElementById('btnValid');
    btnValid.addEventListener('click', () => {
        quantity();
    });

    function onLoadQuantity() {
        let qty = localStorage.getItem('quantity');

        if (qty) {
            document.getElementById('cart-items').textContent = qty;
        };
    };

function quantity() {
    let colorTeddy = color.options[color.selectedIndex].text;
    // console.log(colorTeddy);
    
    let qty = localStorage.getItem('quantity');
    qty = parseInt(qty);

    if (qty) {
        localStorage.setItem('quantity', qty + 1);
        document.getElementById('cart-items').textContent = qty + 1;
    }else {
        localStorage.setItem('quantity', 1);
        document.getElementById('cart-items').textContent = 1;
    };

    // Récupération des données dans un tableau
    let tabRecap = {
        nom: product.name,
        description: product.description,
        prix: product.price/100,
        id: product._id,
        couleur: colorTeddy,
        qte: 0
    }; 

    // product = {
    //     [tabRecap.nom + tabRecap.couleur]: tabRecap
    // };

    // console.log("Produit sélectionné", tabRecap);

    setItems(tabRecap);

};

function setItems(tabRecap) {
    console.log("Produit sélectionné dans la fonction", tabRecap);
    tabRecap.qte +=1;
    localStorage.setItem('panier', JSON.stringify(tabRecap));
};


    // // Ajouter un produit
    // let btnValid = document.getElementById('btnValid');
    // btnValid.addEventListener('click', function() {
    //     let aff = color.options[color.selectedIndex].text;
    //     // console.log(aff);

    //     // Récupération des données dans un tableau
    //     let tabRecap = {
    //         nom: product.name,
    //         description: product.description,
    //         prix: product.price/100,
    //         id: product._id,
    //         couleur: aff,
    //         qte: 0
    //     };
    //     console.log("Tableau page actuelle", tabRecap);

    //     tabRecap.qte++;

    //     let cartCost = localStorage.getItem('CoutTotal');
        
    //     // Ajout du total commandé au localStorage
    //     if(cartCost != null) {
    //         cartCost = parseInt(cartCost);
    //         localStorage.setItem('CoutTotal', cartCost + (product.price/100));
    //     } else {
    //         localStorage.setItem('CoutTotal', product.price/100);
    //     }
        
        
    //     let tabRecJson = JSON.stringify(tabVide);
    //     // console.log("tabJson", tabRecJson);
    //     localStorage.setItem("TabStore", tabRecJson);
    //     let tabIdJson = JSON.stringify(tabId);
    //     // console.log(tabIdJson);
    //     localStorage.setItem("TabId", tabIdJson);

        
    //     cartCount++;
    //     cartItemsString.innerHTML = cartCount;
    //     localStorage.setItem("Quantité", cartCount);
        
    // })
    onLoadQuantity();
};





