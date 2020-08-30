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
    });
    
    let tabVide = [];

    // Vérification de localStorage et initialisation de son contenu
    let verifLocalStore = localStorage.getItem("TabStore");
    if (verifLocalStore == undefined) {
        console.log("LocalStorage vide");
    } else {
        console.log("localStorage existant", verifLocalStore);
        let tabParse = JSON.parse(verifLocalStore);
        // console.log("tabParse", tabParse);
        
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
                couleur: aff
            };
            // console.log("Tableau page actuelle", tabRecap);

            tabVide.push(tabRecap);
            // console.log("Nouveau tab",tabVide);

            let tabId = [];
            for (a = 0; a < tabVide.length; a++) {
                console.log(tabVide[a].nom, tabVide[a].couleur);
                let id = tabVide[a].nom + tabVide[a].couleur;
                console.log(id);
                tabId.push(id);
                console.log(tabId);
                console.log(tabId.includes(id));
            }

            let tabRecJson = JSON.stringify(tabVide);
            // console.log("tabJson", tabRecJson);
            localStorage.setItem("TabStore", tabRecJson);

            // Panier animé
            // let cartItemsString = document.getElementById('cart-items');
            // console.log(typeof cartItemsString.textContent);
            // let cartItems = parseInt(cartItemsString.textContent, 10);
            
            cartCount++;
            cartItemsString.innerHTML = cartCount;
            localStorage.setItem("Quantité", cartCount);
        })

    }


    // let btnValid = document.getElementById('btnValid');
    //     btnValid.addEventListener('click', function() {
    //         let aff = color.options[color.selectedIndex].text;
    //         console.log(aff);

    //         // Récupération des données dans un tableau
    //         let tabRecap = {
    //             nom: tab.name,
    //             description: tab.description,
    //             prix: tab.price/100,
    //             couleur: aff
    //         };
    //         console.log(tabRecap);

    //         tabVide.push(tabRecap);
    //         console.log("Ntab",tabVide);
    //         let tabRecJson = JSON.stringify(tabVide);
    //         console.log("tabJson", tabRecJson);
    //         localStorage.setItem("TabStore", tabRecJson);

    //         cartItemsString.innerHTML = cartCount;
    //         localStorage.setItem("Quantité", cartCount);
    //     })