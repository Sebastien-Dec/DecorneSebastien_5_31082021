// Creates and returns a new object with URLSearchParams
// Sends a string of data to the server 
// by modifying the search property with window.location.search
const params = new URLSearchParams(window.location.search);
// We retrieve the totalPrice
let totalPrice = params.get("totalPrice");
// We retrieve the orderId 
let orderId = params.get("orderId");

document.querySelector(".totalPrice").innerHTML = `${formatPrice(totalPrice)}`;
document.querySelector(".orderNumber").innerHTML = `Commande n°${orderId}`;
// We empty the basket
clearCart();