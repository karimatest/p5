
//Récupérer les données stocker dans le localStorage
let saveProduct = JSON.parse(localStorage.getItem("product"));

//Afficher les produits du panier
let panier = document.querySelector('#cart__items');

//si le panier est vide
if(saveProduct === null) {
    //
}else{
    //si le panier n'est pas vide afficher les produits dans le localstorage    

    for(let k = 0; k < saveProduct.length; k++) {
        
         panier.innerHTML += `
        <article class="cart__item" data-id="${saveProduct[k].id}" data-color="${saveProduct[k].colors}">
        <div class="cart__item__img">
        <img src=${saveProduct[k].image} alt=${saveProduct[k].altTxt}>
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${saveProduct[k].title}</h2>
        <p>${saveProduct[k].colors}</p>
        <p>${saveProduct[k].price}</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${saveProduct[k].quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        </article> `;
    }    
    
}



 


