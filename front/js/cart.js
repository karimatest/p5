
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

     }      
     ))
    };
}

function addCanape(localStorageData, apiData) {
    let article = document.createElement('article')
    article.className = "cart__item";
    article.dataset.id = localStorageData.id
    article.dataset.colors = localStorageData.colors
    panier.appendChild(article);

    let productDivImg = document.createElement("div");
    productDivImg.className = "cart__item__img";
    article.appendChild(productDivImg);

    // Insertion de l'image
    let image = document.createElement("img");
    image.src = apiData.imageUrl;
    image.alt = apiData.altTxt;
    productDivImg.appendChild(image);
    
    // Insertion de l'élément "div" pour la description produit
    let productItemContent = document.createElement("div");
    productItemContent.className = "cart__item__content";
    article.appendChild(productItemContent);

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContentTitlePrice.className = "cart__item__ccontent__titlePrice";
    productItemContent.appendChild(productItemContentTitlePrice);

    let name = document.createElement('h2')
    name.textContent = apiData.name
    productItemContentTitlePrice.appendChild(name);

    // Insertion de la couleur
    let productColors = document.createElement("p");
    productColors.textContent = localStorageData.colors;
    productItemContentTitlePrice.appendChild(productColors);
   

    // Insertion du prix
    let productPrice = document.createElement("p");
    productPrice.textContent = apiData.price + " €";
    productItemContentTitlePrice.appendChild(productPrice);

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContentSettings.className = "cart__item__content__settings";
    productItemContent.appendChild(productItemContentSettings);

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);

    // Insertion de "Qté : "
    let productQty = document.createElement("p");
    productQty.textContent = "Qté : ";
    productItemContentSettingsQuantity.appendChild(productQty);

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
    // insertion du button supprimer //
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
         calculTotal();
      alert('votre article a bien été supprimer.');

    })

    /*Quantité à modifier page panier*/
   //selectionner l'element à modifier en fonction de son id et sa couleur/
    buttonAdd.addEventListener("change",(event) => {
        let article = event.target.closest("article");
        let id = article.dataset.id
        let colors = article.dataset.colors
        let quantity = parseInt(buttonAdd.value);
        for(let n = 0; n < saveProduct.length; n++){
            if(saveProduct[n].id == id && saveProduct[n].colors == colors){
                saveProduct[n].quantity = quantity;
                localStorage.setItem("product", JSON.stringify(saveProduct)); 
               calculTotal()

            }
        }
    })
    }
//fonction du prix totale / quantités totale du panier //
function calculTotal() {
    let saveProduct = JSON.parse(localStorage.getItem("product"));
    let totalQuantity = 0;
    let totalPrice = 0;
  
    for (let productPrice of saveProduct) {
      totalPrice += productPrice.price * productPrice.quantity;
      totalQuantity += productPrice.quantity;
    }
    document.getElementById("totalQuantity").textContent = totalQuantity;
    document.getElementById("totalPrice").textContent = totalPrice;
  }
  
  calculTotal();   
  

 //-------------Formulaire --------------------//

let form = document.querySelector("cart__order__form");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let commander = document.getElementById("order");

//creation expression régulière  FirstName //
firstName.addEventListener('change', function(){
    validFirstName(this)
})
const validFirstName = function(inputFirstName) {
    let FirstNameRegexExp = new RegExp ("^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$", "g");
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    if (FirstNameRegexExp.test(inputFirstName.value)) {
      firstNameErrorMsg.textContent = "prénom Valide ";
      return true
    }else{
      firstNameErrorMsg.textContent = "Veuillez renseigner ce champ";
      return false
    }
};

//creation expression régulière lastName //
lastName.addEventListener('change' , function (){
    validLastName(this)
})
const validLastName = function(inputLastName){
    let LastNameRegexExp = new RegExp("^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$", "g");
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if(LastNameRegexExp.test(inputLastName.value)){
        lastNameErrorMsg.textContent = "Nom valide";
        return true   
    }else{
        lastNameErrorMsg.textContent =" Veuillez renseigner ce champ !";
        return false
    }
};
//creation expression régulière Adresse //
address.addEventListener('change',function (){
    validAddress(this)
})
const validAddress = function(inputAddress){
    let AddressRegexExp = new RegExp("^[0-9]{1,4}[a-zA-ZÀ-Ÿà-ÿ,'0-9\\s]+$" , 'g');
    let addressErrorMsg = inputAddress.nextElementSibling;
    if(AddressRegexExp.test(inputAddress.value)){
        addressErrorMsg.textContent = "Adresse valide";
        return true
    }else{
        addressErrorMsg.textContent = "Veuillez renseigner ce champ";
        return false
    }
};
// creation expression régulière Ville //
city.addEventListener("change", function (){
    validCity(this)
})
const validCity = function(inputCity){
    let CityRegexExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let cityErrorMsg = inputCity.nextElementSibling;
    if(CityRegexExp.test(inputCity.value)){
        cityErrorMsg.textContent = "Ville valide";
        return true
    }else{
        cityErrorMsg.textContent = "Veuillez renseigner ce champ";
        return false
    }
};
//creation expression régulière email //
email.addEventListener("change", function(){
    validEmail(this)
})
const validEmail = function(inputEmail){
    let EmailRegexExp = new RegExp('^[a-zA-Z0-9ôöáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let emailErrorMsg = inputEmail.nextElementSibling;
    if(EmailRegexExp.test(inputEmail.value)){
        emailErrorMsg.textContent = "Email valide";
        return true
    }else{
        emailErrorMsg.textContent = "Veuillez renseigner ce champ";
        return false
    }
};
//validation des inputs//
function validInputs() {
    return validFirstName(document.querySelector('#firstName')) && validLastName(document.querySelector('#lastName')) && validAddress(document.querySelector('#address')) && validCity(document.querySelector('#city')) && validEmail(document.querySelector('#email'));
}
// validation du formulaire//
function validForm(){
    const commander = document.getElementById("order");
    commander.addEventListener('click',(e)=>{
        e.preventDefault();
          if(!validInputs()) {
              alert('Merci de renseigner tous les champs obligatoire');
              return false
        
          } 
          //envoie les information dans localStorage //
            const contact ={
                firstName : firstName.value,
                lastName :lastName.value,
                address :address.value,
                city :city.value,
                email : email.value
            }
       localStorage.setItem("contact", JSON.stringify(contact));
        // objet contenant les produits et le contact //
       let products = [];
       saveProduct.forEach((element) => products.push(element.id));
       
       const objet = {
           contact,
           products
       }
    
       // j'envois le formulaire et localStorag (objet) au serveur//
        const options = {
            method : 'post',
            body : JSON.stringify(objet),
            headers: { 
                'Content-Type': 'application/json',
              }
        }

        fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let orderId = data.orderId;
            window.location.href = `./confirmation.html?id=${orderId}`;
    
        
});
   
});
}
// fin de l'envoie du formulaire //
validForm ();
