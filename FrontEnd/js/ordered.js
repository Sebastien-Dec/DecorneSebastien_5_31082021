document.querySelector(".totalPrice").innerHTML = `${formatPrice(computeTotalPriceFromCart())}`;
document.querySelector(".orderNumber").innerHTML = `Commande n°${order.orderId}`;