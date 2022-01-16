 const container = document.querySelector("#items");


fetch("http://localhost:3000/api/products")
  .then(response => {
      return response.json();
  })

  .then((dataKanap) => {
    const litsKanap = dataKanap;
    // console.log(listKanap);
     litsKanap.forEach(element => {
        container .innerHTML +=
        `<a href="./product.html?id=${element._id}">
          <article>
              <img src=${element.imageUrl} alt=${element.altTxt}>
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
          </article>
         </a>`
        
    });
      
   })
    .catch(function (err) {
      console.log("fetch erreur");
      alert("produit n'est pas disponible pour le moment");
    }); 
      
     



  