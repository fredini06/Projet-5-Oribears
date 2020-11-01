let idRecup = location.search;
let idReelle = idRecup.substring(4);
// console.log(idReelle);

let cartCount = localStorage.getItem("Quantité");
let cartItemsString = document.getElementById('cart-items');
if (cartCount == undefined) {
    cartItemsString.innerHTML = 0;
}else {
    cartItemsString.innerHTML = cartCount;
}

fetch("http://localhost:3000/api/teddies/" + idReelle)
    .then(function (response) {
        response.json()
            .then(function (value) {
                showTeddy(value);
                // console.log(value);
                let obj = JSON.stringify(value);
                // console.log(obj);
        })            
    }).catch((err) => console.log('ERREUR : ', err));
    
    let tabVide = [];

    // Vérification de localStorage et initialisation de son contenu
    let verifLocalStore = localStorage.getItem("TabStore");
    if (verifLocalStore == undefined) {
        console.log("LocalStorage vide");
    } else {
        console.log("localStorage existant", verifLocalStore);
        let tabParse = JSON.parse(verifLocalStore);
        // console.log("tabParse", tabParse);
        // console.log(tabParse[0].nom);
        
        for (let i=0; i < tabParse.length; i++) {
            tabVide.push(tabParse[i]);
            // console.log("Ajout du localStorage dans le tableau ", tabVide);
        }
    }

    function showTeddy(tab) {
        // console.log(tab);
        document.getElementById("name").innerHTML += tab.name;
        document.getElementById("description").innerHTML += tab.description;
        document.getElementById("price").innerHTML += tab.price/100;
        
        let im = document.getElementById("image");
        let imUrl = tab.imageUrl;
        im.src = imUrl;

        let color = document.getElementById('couleur');
        // console.log("Le select est", color);

        // Boucle pour ajouter les options à la balise select avec le tableau "tab"
        for (let i=0; i < tab.colors.length; i++) {
            color[i] = new Option(tab.colors[i], tab.colors[i]);
        }

        let tabId = localStorage.getItem('TabId');
        tabId = JSON.parse(tabId);

        // Ajouter un produit
        let btnValid = document.getElementById('btnValid');
        btnValid.addEventListener('click', function() {
            let aff = color.options[color.selectedIndex].text;
            // console.log(aff);

            // Récupération des données dans un tableau
            let tabRecap = {
                nom: tab.name,
                description: tab.description,
                prix: tab.price/100,
                id: tab._id,
                couleur: aff,
                qte: 0
            };
            console.log("Tableau page actuelle", tabRecap);

            tabRecap.qte++;

            // Vérification de la présence du produit dans le panier
            if (tabId == undefined) {
                tabId = [];
                tabId.push(tabRecap.nom + tabRecap.couleur, tabRecap.qte);
                console.log("Nom produit :", tabId);
            } else if (tabId.find(elt => elt === tabRecap.nom + tabRecap.couleur)) {
                alert("Ce produit est déjà présent dans le panier");
                return
            }else {
                tabId.push(tabRecap.nom + tabRecap.couleur, tabRecap.qte);
                console.log("Noms produits :", tabId);
            };

            tabVide.push(tabRecap);

            let cartCost = localStorage.getItem('CoutTotal');
            
            // Ajout du total commandé au localStorage
            if(cartCost != null) {
                cartCost = parseInt(cartCost);
                localStorage.setItem('CoutTotal', cartCost + (tab.price/100));
            } else {
                localStorage.setItem('CoutTotal', tab.price/100);
            }
            
            
            let tabRecJson = JSON.stringify(tabVide);
            // console.log("tabJson", tabRecJson);
            localStorage.setItem("TabStore", tabRecJson);
            let tabIdJson = JSON.stringify(tabId);
            // console.log(tabIdJson);
            localStorage.setItem("TabId", tabIdJson);

            
            cartCount++;
            cartItemsString.innerHTML = cartCount;
            localStorage.setItem("Quantité", cartCount);
            
        })
    }

