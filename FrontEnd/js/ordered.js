// Creates and returns a new URLSearchParams object from the browser url 
//(at least the part with the `?`)
const params = new URLSearchParams(window.location.search);
// We retrieve the totalPrice
let totalPrice = params.get("totalPrice");
// We retrieve the orderId 
let orderId = params.get("orderId");

document.querySelector(".totalPrice").innerHTML = `${formatPrice(totalPrice)}`;
document.querySelector(".orderNumber").innerHTML = `Commande n°${orderId}`;
// We empty the basket
clearCart();