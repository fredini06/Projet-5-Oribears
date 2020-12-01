// Affichage les produits sélectionnés sur la page panier ou panier vide
function cartDisplay() {
    let totalCost = localStorage.getItem('prixTotal');
    
    if(totalCost == null || parseInt(totalCost) === 0) {
        emptyDisplay(); 
    } else {
        itemDisplay();  
    };

    deleteBtn()
    quantityBtn()
};


// Affichage les produits sélectionnés sur la page panier
function itemDisplay() {
    let cartItems = JSON.parse(localStorage.getItem('panier'));
    let totalCost = localStorage.getItem('prixTotal');
    let prodContainer = document.querySelector(".table__body");
    
    prodContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${item.nom}</td><td class="tColor">${item.couleur}</td><td>${item.prix} €</td><ion-icon name="caret-back-outline" class="btnQty decBtn" data-id = ${item.id}></ion-icon><p class="qte">${item.qte}</p><ion-icon name="caret-forward-outline" class="btnQty incBtn" data-id = ${item.id}></ion-icon><td class="price">${item.prix * item.qte} €</td><td class="supprime" data-id = ${item.id}>Supprimer</td>
        `;
        prodContainer.appendChild(tr);
        
        // Sous-total
        let div = document.querySelector('.sTotal');
        div.innerHTML = `<p>Sous-total :</p><span class="sTotalPrix">${totalCost} €</span>`;
    });
    // qtyBtn()
};

// Affiche le panier vide
function emptyDisplay() {
    document.querySelector('.legend').textContent = 'Panier vide';
        document.querySelector('.container').innerHTML=`<div id="card_btn">
        <p class="btn btn_prod" id="btnValid">Retour</p>
    </div><tbody class="table__body"></tbody>`;

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

function quantityBtn() {
    let btn = document.querySelectorAll('.btnQty');
    let cartItems = JSON.parse(localStorage.getItem('panier'));
    let productNb = parseInt(localStorage.getItem('quantity'));
    let prixTotal = parseInt(localStorage.getItem('prixTotal'));

    for(let i=0; i < btn.length; i++) {
        let productId = btn[i].dataset.id;
        btn[i].addEventListener('click', () => {
            // if (btn[i].classList.contains('incBtn')) {
            //     // cartItems[productId].qte += 1;
            //     // localStorage.setItem('panier', JSON.stringify(cartItems));
            //     localStorage.setItem('quantity', productNb + 1);
            //     localStorage.setItem('prixTotal', prixTotal + parseInt(cartItems[productId].prix));
                
            //     cartDisplay();
            // }else {
            //     if(cartItems[productId].qte > 1) {
            //     // cartItems[productId].qte -= 1;
            //     localStorage.setItem('panier', JSON.stringify(cartItems));
            //     localStorage.setItem('quantity', productNb -1);
            //     localStorage.setItem('prixTotal', prixTotal - parseInt(cartItems[productId].prix));
                
            //     cartDisplay();
            //     }
            // }
            let variant = (btn[i].classList.contains('incBtn') ? 1 : -1);
            if(cartItems[productId].qte >= 1) {
                cartItems[productId].qte += variant;
                localStorage.setItem('panier', JSON.stringify(cartItems));
                localStorage.setItem('quantity', productNb + variant);
                if (variant === 1) {
                    localStorage.setItem('prixTotal', prixTotal + parseInt(cartItems[productId].prix));
                }else {
                    localStorage.setItem('prixTotal', prixTotal - parseInt(cartItems[productId].prix));
                }
            }
            cartDisplay();
        })
    }
};


let btnVider = document.querySelector('.videpanier');

btnVider.addEventListener('click', () => {
    videpanier();
    cartDisplay();
});

function videpanier() {
    Storage.Clear()
};

cartDisplay();
