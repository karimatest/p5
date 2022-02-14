// afficher le numéro de commande //
function confirmation() {
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id"); 
    console.log(id);
    document.getElementById("orderId").textContent = id;
}
confirmation();