// Récupérer l'id de notre produit depuit l'url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
//console.log(id);

// Dom elements
let productElement = document.querySelector('.item');
let image = document.querySelector('.item_img');
let title = document.querySelector('#title');
let price = document.querySelector('#price');
let description = document.querySelector('#description');
let colors = document.querySelector('#colors');
let quantity = document.querySelector('#quantity');


 const promiseListKanap =  fetch("http://localhost:3000/api/products/" + id);

    promiseListKanap
    .then(response => response.json()
    .then(listKanap => {
        console.log(listKanap)

    let image = document.createElement('img');
     image.setAttribute('src', listKanap.imageUrl)
     image.setAttribute('alt', listKanap.altTxt)
    document.querySelector('.item__img').append(image);

    let title = `${listKanap['name']}`;
    document.querySelector('#title').textContent = title;

    let price = `${listKanap['price']} `;
    document.querySelector('#price').textContent = price;

    let description = `${listKanap['description']}`;
    document.querySelector('#description').textContent = description;

     //affichage le tableau de couleurs
     for (let i = 0; i < listKanap.colors.length; i++) {
       let color = document.createElement('option')
       color.setAttribute('value',listKanap.colors[i])  
       selectorColor = document.getElementById("colors");
       color.textContent = listKanap.colors[i];
       selectorColor.append(color);
    }

})
 )
 .catch(function (err) {
    console.log("fetch erreur");
    alert("produit n'est pas disponible pour le moment");
  }); 

  //Enregistrer le choix de l'utilisateur
let boutton = document.querySelector('#addToCart');
boutton.addEventListener("click", () => {
    let colors = document.getElementById("colors").value; 
    let quantity = Number(document.getElementById("quantity").value);
    let image = document.querySelector(".item__img").src;
    let title = document.querySelector('#title').textContent;
    let price = document.querySelector('#price').textContent;
    let description = document.querySelector('#description').textContent; 

    if (!colors) {
        alert("Veuillez choisir une couleur");
        return;
      }
      if (!(quantity > 0 && quantity < 101)) {
        alert("Veuillez choisir une quantité entre 1 et 100");
        return;
      }
      //sauvegarder dans le localStorage
      let information = {
          id,
          colors,
          quantity,
          title,
          price,
          description,
          image, 
      };
      console.log(information);

      /*Convertir du Json en JS/ou l'inverse
      Le local storage lit que les chaînes de caractères et non les tableaux donc cela permet de transformer en chaine de caractère, sinon la lecture serait (objet,object)
      A l'inverse cela permet de transformer la chaine de caractère en objet*/
      let saveProduct = JSON.parse(localStorage.getItem("product"));
        if (!saveProduct) {
         saveProduct = [];
         saveProduct.push(information);
        } else {
         for (let p = 0; p < saveProduct.length; p++) {
         if (saveProduct[p].id == id && saveProduct[p].colors == colors) {
        saveProduct[p].quantity += quantity;
        localStorage.setItem("product", JSON.stringify(saveProduct));
        return;
      }
    }
    saveProduct.push(information);
  }
  localStorage.setItem("product", JSON.stringify(saveProduct)); 
})

  