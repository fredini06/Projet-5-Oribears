// Affichage les produits sélectionnés sur la page panier ou panier vide
function cartDisplay() {
    let totalCost = localStorage.getItem('prixTotal');
    
    if(totalCost != null & totalCost != 0) {
        itemDisplay(); 
    } else {
        emptyDisplay();    
    };

    deleteBtn()
    // quantityBtn()
    qtyBtn()
};


// Affichage les produits sélectionnés sur la page panier
function itemDisplay() {
    let cartItems = JSON.parse(localStorage.getItem('panier'));
    let totalCost = localStorage.getItem('prixTotal');
    let prodContainer = document.querySelector("#table__body");
    
    prodContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${item.nom}</td><td class="tColor">${item.couleur}</td><td>${item.prix} €</td><ion-icon name="caret-back-outline" class="btnQty decBtn"></ion-icon><p class="qte">${item.qte}</p><ion-icon name="caret-forward-outline" class="btnQty incBtn"></ion-icon><td class="price">${item.prix * item.qte} €</td><td class="supprime" data-id = ${item.id}>Supprimer</td>
        `;
        prodContainer.appendChild(tr);
        
        // Sous-total
        let div = document.querySelector('.sTotal');
        div.innerHTML = `<p>Sous-total :</p><span class="sTotalPrix">${totalCost} €</span>`;
    });
};

// Affiche le panier vide
function emptyDisplay() {
    document.querySelector('.legend').textContent = 'Panier vide';
        document.querySelector('.container').innerHTML=`<div id="card_btn">
        <p class="btn btn_prod" id="btnValid">Retour</p>
    </div>`;

        document.getElementById('card_btn').addEventListener('click', function() {
            window.history.go(-1)
        });
}

// Effacer les produits du panier
function deleteBtn() {
    let deleteBtn = document.querySelectorAll('.supprime');
    let productNb = localStorage.getItem('quantity');
    let prixTotal = localStorage.getItem('prixTotal')
    let cartItems = JSON.parse(localStorage.getItem('panier'));
    // console.log(Object.keys(cartItems)[1]);

    for(let i=0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', ()=> {
                let productId = Object.keys(cartItems)[i];
                localStorage.setItem('quantity', productNb - cartItems[productId].qte);
                localStorage.setItem('prixTotal', prixTotal - (cartItems[productId].qte * cartItems[productId].prix));
    
                delete cartItems[productId];
                localStorage.setItem('panier', JSON.stringify(cartItems));
    
                cartDisplay();
        });
    }; 
};

// Fonction qui permet d'augmenter ou de baisser la quantité des produits
function quantityBtn() {
    let decreaseBtn = document.querySelectorAll('.decBtn');
    let increaseBtn = document.querySelectorAll('.incBtn');
    let cartItems = JSON.parse(localStorage.getItem('panier'));
    let productNb = parseInt(localStorage.getItem('quantity'));
    let prixTotal = parseInt(localStorage.getItem('prixTotal'));

    for(let i=0; i < decreaseBtn.length; i++) {
        let productId = Object.keys(cartItems)[i];
        
        decreaseBtn[i].addEventListener('click', () => {

            if(cartItems[productId].qte > 1) {
                cartItems[productId].qte -= 1;
                localStorage.setItem('panier', JSON.stringify(cartItems));
                localStorage.setItem('quantity', productNb -1);
                localStorage.setItem('prixTotal', prixTotal - parseInt(cartItems[productId].prix));
                
                cartDisplay();
            }
        });

        increaseBtn[i].addEventListener('click', () => {
            cartItems[productId].qte += 1;
            localStorage.setItem('panier', JSON.stringify(cartItems));
            localStorage.setItem('quantity', productNb + 1);
            localStorage.setItem('prixTotal', prixTotal + parseInt(cartItems[productId].prix));
            
            cartDisplay();
        })
    };
};


function qtyBtn() {
    let cartItems = JSON.parse(localStorage.getItem('panier'));
    let productNb = parseInt(localStorage.getItem('quantity'));
    let prixTotal = parseInt(localStorage.getItem('prixTotal'));
    let btnQty = document.querySelectorAll('.btnQty');
    for (let i=0; i < btnQty.length; i++) {
        let productId = Object.keys(cartItems)[i];
        btnQty[i].addEventListener('click', ()=> {
            if (btnQty[i].classList.contains('incBtn')) {

                console.log('incBtn');

                cartItems[productId].qte += 1;
                localStorage.setItem('panier', JSON.stringify(cartItems));
                localStorage.setItem('quantity', productNb + 1);
                localStorage.setItem('prixTotal', prixTotal + parseInt(cartItems[productId].prix));
            
            cartDisplay();
            }else {
                console.log('decBtn');
            }
        })
    }
}


let btnVider = document.querySelector('.videpanier');

btnVider.addEventListener('click', () => {
    videpanier();
    cartDisplay();
});

function videpanier() {
    localStorage.removeItem('panier');
    localStorage.removeItem('quantity');
    localStorage.removeItem('prixTotal');
};

cartDisplay();
