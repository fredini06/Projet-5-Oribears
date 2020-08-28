
let idRecup = location.search;
let idReelle = idRecup.substring(4);
// console.log(idReelle);

let cartCount = localStorage.getItem("Quantité");
let cartItemsString = document.getElementById('cart-items');
cartItemsString.innerHTML = cartCount;

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

    function showTeddy(tab) {
        // console.log(tab);
        document.getElementById("name").innerHTML += tab.name;
        document.getElementById("description").innerHTML += tab.description;
        document.getElementById("price").innerHTML += tab.price/100;
        
        let im = document.getElementById("image");
        let imUrl = tab.imageUrl;
        im.src = imUrl;

        let color = document.getElementById('couleur');
        console.log(color);
        console.log(tab.colors.length);

 

        // Boucle pour ajouter les options à la balise select avec le tableau "tab"
        for (let i=0; i < tab.colors.length; i++) {
            color[i] = new Option(tab.colors[i], tab.colors[i]);
        }

        let btnValid = document.getElementById('btnValid');
        btnValid.addEventListener('click', function() {
            let aff = color.options[color.selectedIndex].text;
            console.log(aff);
            // Récupération des données dans un tableau
            let tabRecap = {
                nom: tab.name,
                description: tab.description,
                prix: tab.price/100,
                couleur: aff
            };
            console.log(tabRecap);
            let objTab = JSON.stringify(tabRecap);
            console.log(objTab);
            localStorage.setItem("TabStore", objTab);

            // Panier animé
            // let cartItemsString = document.getElementById('cart-items');
            // console.log(typeof cartItemsString.textContent);
            // let cartItems = parseInt(cartItemsString.textContent, 10);
            cartCount++;
            cartItemsString.innerHTML = cartCount;
            localStorage.setItem("Quantité", cartCount);
        })

    }

    