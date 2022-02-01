
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
        fetch("http://localhost:3000/api/products/" + saveProduct[k].id)
        .then(response => response.json()
        .then(data =>{
            console.log(data)
         panier.innerHTML += `
        <article class="cart__item" data-id="${saveProduct[k].id}" data-color="${saveProduct[k].colors}">
        <div class="cart__item__img">
        <img src=${data.imageUrl} alt=${data.altTxt}>
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${data.title}</h2>
        <p>${saveProduct[k].colors}</p>
        <p>${data.price}</p>
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
        </article>`;
        
    }
   ))};
}

    //supprimer un article
    function productDElete() {
        let btnDelete = document.getElementsByClassName(".deleteItem");
         console.log(btnDelete)
         for (let n = 0; n < btnDelete.length; n++) {
            btnDelete[n].addEventListener("click", (event) => {
                event.preventDefault();
    
                //Selection de l'element à supprimer en fonction de son id ET sa couleur
                let idDelete = saveProduct[n].id;
                let colorsDelete = saveProduct[n].colors;
    
               saveProduct = saveProduct.filter(
                    (el) => el.id !== idDelete || el.colors !== colorsDelete
                );
    
                localStorage.setItem("product", JSON.stringify(saveProduct));
    
                //Alerte produit supprimé et refresh
                alert("Ce produit est supprimé de votre panier");
    
                location.reload();
            });
        }
    }
    productDElete();





