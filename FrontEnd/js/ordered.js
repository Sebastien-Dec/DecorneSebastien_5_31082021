const params = new URLSearchParams(window.location.search);
let totalPrice = params.get("totalPrice");
let orderId = params.get("orderId");

document.querySelector(".totalPrice").innerHTML = `${formatPrice(totalPrice)}`;
document.querySelector(".orderNumber").innerHTML = `Commande n°${orderId}`;
clearCart();