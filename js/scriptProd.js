// fetch("http://localhost:3000/api/teddies")
//     .then(function (response) {
//         response.json()
//             .then(function (value) {
//                 showTeddy(Value);
//             })            
//     });

//     function showTeddy(tab){
//         tab.forEach(function(user){
//         let divProd = document.createElement("div");
//         divProd.classList.add("card_prod");
//         let htmlDiv = `<div class ="card__info"><img id ="image" src="${user.imageUrl}" width = 600px height = 400px alt="ours en peluche"><p class="name">Nom : ${user.name}</p2><p class = "descr">Description : ${user.description}</p><p class = "price">Prix : ${user.price /100} euros</p><div class="card_btn"><a href="produits.html" class="btn">Sélectionner</a></div></div>`;
//         divProd.innerHTML = htmlDiv;
//         document.querySelector(".container").appendChild(divProd);
     
//         })
//     };

let idRecup = location.search;
let idReelle = idRecup.substring(4);
// console.log(idReelle);

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

        // let opt = document.createElement("option");
        // let optContent = `1`;
        // opt.innerHTML = optContent;
        // color.appendChild(opt);
        // color = new Option;

        // Boucle pour ajouter les options à la balise select avec le tableau "tab"
        for (let i=0; i < tab.colors.length; i++) {
            color[i] = new Option(tab.colors[i], tab.colors[i]);
        }

        // Test pour vérifier la valeur du formulaire récupérée (avec lien désactivé)
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
        })

        
        
        // color.addEventListener('change', function() {
        //     // alert(color.options[color.selectedIndex].innerHTML);
        //     localStorage.setItem('couleur', color.options[color.selectedIndex].innerHTML);
        // })

        // for (let i=0; i < tab.colors.length; i++) {
        //     color[i] = new Option(tab.colors[i]);
        // }

        // LocalStorage

        // let btnValid = document.getElementById('card_btn');

        // btnValid.onclick = function() {
        // localStorage.setItem('color', tab.colors[i]);
        // }
    }

    