fetch("http://localhost:3000/api/teddies")
    .then(function (response) {
        response.json()
            .then(function (value) {
                showTeddies(value);
                console.log(value);
            })            
    }).catch((err) => console.log('ERREUR : ', err));


    // Afficher les données récupérées
    function showTeddies(tab){
        tab.forEach(function(user){
        let div = document.createElement("div");
        div.classList.add("card");
        let htmlDiv = `<div class="row"><div class ="card__info col"><img class="img-fluid center-block" id="image" src="${user.imageUrl}" alt="ours en peluche"><p class="name"><span class="soulign">Nom</span> : ${user.name}</p><p clas ="descr"><span class="soulign">Description</span> : ${user.description}</p><p clas ="price"><span class="soulign">Prix</span> : ${user.price /100} euros</p><div id="card_btn"><a href="produits.html?id=${user._id}" class="btn">Sélectionner</a></div></div></div>`;
        div.innerHTML = htmlDiv;
        document.querySelector(".container").appendChild(div);
        })
    };


    // Afficher le nombre de produits présents dans le panier
    function onLoadQuantity() {
        let qty = localStorage.getItem('quantity');
    
        if (qty) {
            document.getElementById('cart-items').textContent = qty;
        }
    };

    onLoadQuantity();