
//Récupérer les données stocker dans le localStorage
let saveProduct = JSON.parse(localStorage.getItem("product"));

//Afficher les produits du panier
let panier = document.querySelector('#cart__items');
let btnDelete = document.querySelector('.deleteItem');
let quantity = document.getElementsByClassName(".itemQuantity");
//si le panier est vide
if(saveProduct === null || saveProduct == 0) {
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
        <h2>${data.name}</h2>
        <p>${saveProduct[k].colors}</p>
        <p>${data.price}€</p>
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
        
        let saveProduct = JSON .parse(localStorage.getItem("product"));
        let cart__itemDelete = document.querySelectorAll(".cart__item");
        let btnDelete = document.createElement("p");
        btnDelete.textContent = "supprimer"
        btnDelete.setAttribute(".deleteItem");
         document.querySelectorAll(".cart__item").append(btnDelete);

         for (let n = 0; n < btnDelete.length; n++) {
            btnDelete[n].addEventListener("click", (event) => {
                let article = event.target.closest("article");    
                //Selection de l'element à supprimer en fonction de son id ET sa couleur
                let idDelete = article.dataset.id;
                let colorsDelete =article.dataset.colors ;
    
               saveProduct = saveProduct.filter(
                    (el) => el.id !== idDelete || el.colors !== colorsDelete
                );
    
                localStorage.setItem("product", JSON.stringify(saveProduct));
                article.remove();
                
            
        })
     }
    
    productDElete();

// changement de quantites dans le panier 
 
 function quantityChange() {
    let saveProduct = JSON.parse(localStorage.getItem("product"));
    let butonAdd = document.querySelectorAll(".itemQuantity");
 }
}