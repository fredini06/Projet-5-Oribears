fetch("http://localhost:3000/api/teddies")
    .then(function (response) {
        response.json()
            .then(function (value) {
                showTeddies(value);
            })            
    });

    function showTeddies(tab){
        tab.forEach(function(user){
        let div = document.createElement("div");
        div.classList.add("card");
        let htmlDiv = `<div class ="card__info"><img id ="image" src="${user.imageUrl}" width = 600px height = 400px alt="ours en peluche"><p class="name">Nom : ${user.name}</p><p class = "descr">Description : ${user.description}</p><p class = "price">Prix : ${user.price /100} euros</p><div class="card_btn"><a href="produits.html?id=${user._id}" class="btn">Sélectionner</a></div></div>`;
        div.innerHTML = htmlDiv;
        document.querySelector(".container").appendChild(div);
     
        })
    };

   

    