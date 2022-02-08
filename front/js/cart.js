
//Récupérer les données stocker dans le localStorage
let saveProduct = JSON.parse(localStorage.getItem("product"));

//Afficher les produits du panier
let panier = document.querySelector('#cart__items');
let btnDelete = document.querySelector('.deleteItem');
let quantity = document.getElementsByClassName(".itemQuantity");
//si le panier est vide
if (saveProduct === null || saveProduct == 0) {
    //
} else {
    //si le panier n'est pas vide afficher les produits dans le localstorage    

    for (let k = 0; k < saveProduct.length; k++) {
        fetch("http://localhost:3000/api/products/" + saveProduct[k].id)
            .then(response => response.json()
                .then(data => {
                    addCanape(saveProduct[k], data)
                    //panier.innerHTML += `
                    //<article class="cart__item" data-id="${saveProduct[k].id}" data-color="${saveProduct[k].colors}">
                    // <div class="cart__item__img">
                    // <img src=${data.imageUrl} alt=${data.altTxt}>
                    //  </div>
                    // <div class="cart__item__content">
                    // <div class="cart__item__content__description">
                    // <h2>${data.name}</h2>
                    //  <p>${saveProduct[k].colors}</p>
                    //   <p>${data.price}€</p>
                    //  </div>
                    // <div class="cart__item__content__settings">
                    //  <div class="cart__item__content__settings__quantity">
                    //  <p>Qté : </p>
                    // <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${saveProduct[k].quantity}>
                    //    </div>
                    //<div class="cart__item__content__settings__delete">
                    //<p class="deleteItem">Supprimer</p>
                    //</div>
                    //</div>
                    // </div>
                    //  </article>`;

                }
                ))
    };
}
function addCanape(localStorageData, apiData) {
    let article = document.createElement('article')
    article.dataset.id = localStorageData.id
    article.dataset.colors = localStorageData.colors
    panier.append(article);

    let productDivImg = document.createElement("div");
    article.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Insertion de l'image
    let image = document.createElement("img");
    productDivImg.appendChild(image);
    image.src = apiData.imageUrl;
    image.alt = apiData.altTxt;

    // Insertion de l'élément "div" pour la description produit
    let productItemContent = document.createElement("div");
    article.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__ccontent__titlePrice";

    let name = document.createElement('h2')
    productItemContentTitlePrice.appendChild(name);
    name.textContent = apiData.name

    // Insertion de la couleur
    let productColors = document.createElement("p");
    productColors.textContent = localStorageData.colors;
    productItemContentTitlePrice.appendChild(productColors);
   

    // Insertion du prix
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.textContent = apiData.price + " €";

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

    // Insertion de "Qté : "
    let productQty = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQty);
    productQty.textContent = "Qté : ";

    // Insertion de la quantité
    let buttonAdd = document.createElement("input");
    buttonAdd.value = localStorageData.quantity;
    buttonAdd.className = "itemQuantity";
    buttonAdd.setAttribute("type", "number");
    buttonAdd.setAttribute("min", "1");
    buttonAdd.setAttribute("max", "100");
    buttonAdd.setAttribute("name", "itemQuantity");
    productItemContentSettingsQuantity.appendChild(buttonAdd);
    
    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    let button = document.createElement("p");
    productItemContentSettingsDelete.appendChild(button);
    button.className = "deleteItem";
    button.textContent = "Supprimer";

    button.addEventListener("click", (event) => {
        let article = event.target.closest("article");
        //Selection de l'element à supprimer en fonction de son id ET sa couleur
        let idDelete = article.dataset.id;
        let colorsDelete = article.dataset.colors;
        let products = JSON.parse(localStorage.getItem("product"));

        products = products.filter(
            (el) => el.id !== idDelete && el.colors !== colorsDelete
        );

        localStorage.setItem("product", JSON.stringify(products));
        article.remove();

      alert('votre article a bien été supprimer.');

    })
    
}
 