// Affichage des produits sélectionnés sur la page panier
function cartDisplay() {
    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);
    let totalCost = localStorage.getItem('prixTotal');
    totalCost = parseInt(totalCost);
    let prodContainer = document.querySelector("#table__body");
    
    if(totalCost != 0) {
        prodContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td class="tName">${item.nom}</td><td class="tColor">${item.couleur}</td><td>${item.prix} €</td><ion-icon name="caret-back-outline" class="decBtn"></ion-icon><p class="qte">${item.qte}</p><ion-icon name="caret-forward-outline" class="incBtn"></ion-icon><td class="price">${item.prix * item.qte} €</td><td class="supprime">Supprimer</td>
            `;
            prodContainer.appendChild(tr);
            
            // Sous-total
            let div = document.querySelector('.sTotal');
            div.innerHTML = `<p>Sous-total :</p><span class="sTotalPrix">${totalCost} €</span>`;

        }); 
    } else {
        document.querySelector('.legend').textContent = 'Panier vide';
        document.querySelector('.container').innerHTML=`<div id="card_btn">
        <p class="btn btn_prod" id="btnValid">Retour</p>
    </div>`;

        document.getElementById('card_btn').addEventListener('click', function() {
            window.history.go(-1)
        });
    
    };

    
    deleteBtn()
    quantityBtn()
};

// Effacer les produits du panier
function deleteBtn() {
    let deleteBtn = document.querySelectorAll('.supprime');
    let productName;
    let productColor;
    let productNb = localStorage.getItem('quantity');
    let prixTotal = localStorage.getItem('prixTotal')
    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems);
    // console.log(cartItems.NorbertTan);

    for(let i=0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', () => {
            productName = deleteBtn[i].parentElement.cells[0].textContent;
            
            productColor = deleteBtn[i].parentElement.cells[1].textContent;
            
            let prod = productName + productColor;
            localStorage.setItem('quantity', productNb - cartItems[prod].qte);
            localStorage.setItem('prixTotal', prixTotal - (cartItems[prod].qte * cartItems[prod].prix));

            delete cartItems[prod];
            localStorage.setItem('panier', JSON.stringify(cartItems));

            cartDisplay();
        });
    }
};

// Fonction qui permet d'augmenter ou de baisser la quantité des produits
function quantityBtn() {
    let decreaseBtn = document.querySelectorAll('.decBtn');
    let increaseBtn = document.querySelectorAll('.incBtn');
    let currentQty;
    let productName;
    let productColor;

    let cartItems = localStorage.getItem('panier');
    cartItems = JSON.parse(cartItems);
    let productNb = localStorage.getItem('quantity');
    productNb = parseInt(productNb);
    let prixTotal = localStorage.getItem('prixTotal');
    prixTotal = parseInt(prixTotal);

    for(let i=0; i < decreaseBtn.length; i++) {
        decreaseBtn[i].addEventListener('click', () => {
            currentQty = decreaseBtn[i].parentElement.querySelector('.qte').textContent;
            productName = decreaseBtn[i].parentElement.cells[0].textContent;
            
            productColor = decreaseBtn[i].parentElement.cells[1].textContent;

            let prod = productName + productColor;
            if(cartItems[prod].qte > 1) {
                cartItems[prod].qte -= 1;
                localStorage.setItem('panier', JSON.stringify(cartItems));
                localStorage.setItem('quantity', productNb -1);
                localStorage.setItem('prixTotal', prixTotal - parseInt(cartItems[prod].prix));
                
                cartDisplay();
            }
        });
    };

    for(let i=0; i < increaseBtn.length; i++) {
        increaseBtn[i].addEventListener('click', () => {
            currentQty = increaseBtn[i].parentElement.querySelector('.qte').textContent;
            productName = increaseBtn[i].parentElement.cells[0].textContent;
            
            productColor = increaseBtn[i].parentElement.cells[1].textContent;

            let prod = productName + productColor;

            cartItems[prod].qte += 1;
            localStorage.setItem('panier', JSON.stringify(cartItems));
            localStorage.setItem('quantity', productNb + 1);
            localStorage.setItem('prixTotal', prixTotal + parseInt(cartItems[prod].prix));
            
            cartDisplay();
        });
    };

};


cartDisplay();
