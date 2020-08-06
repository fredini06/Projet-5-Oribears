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
console.log(idReelle);

fetch("http://localhost:3000/api/teddies/`${idReelle}`")
    .then(function (response) {
        response.json()
            .then(function (value) {
                showTeddy(value);
                console.log(value)
            })            
    });

    function showTeddy(tab) {
        console.log(tab);
        document.getElementById("name").innerHTML += tab.name;
        document.getElementById("description").innerHTML += tab.description;
        document.getElementById("price").innerHTML += tab.price/100;
        
        let im = document.getElementById("image");
        let imUrl = tab.imageUrl;
        im.src = imUrl;
    }

    