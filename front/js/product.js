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