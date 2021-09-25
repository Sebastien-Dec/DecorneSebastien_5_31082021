let form = document.querySelector("#order");
form.addEventListener("click", function(event) {
    event.preventDefault();
    let firstName = document.querySelector("input[name='firstName']").value;
    let lastName = document.querySelector("input[name='lastName']");
    let address = document.querySelector("input[name='address']").value;
    let city = document.querySelector("input[name='city']").value;
    let email = document.querySelector("input[name='email']").value;

    console.log(firstName, lastName, address, city, email);

    //Appeler la fonction pour construire le contact avec let contact
    let contact = buildContact(firstName, lastName, address, city, email);
    let message = validateContact(contact);
    //let email = validateEmail(email);

    if(message != null) {
        alert(message);
    }
}, false);

let teddiesCart = getTeddiesFromCart();
let teddyIds = getIdFromTeddies(teddiesCart);
let orderPromise = sendOrder(contact, teddyIds);

orderPromise.then(function(order) {
    console.log(order.contact, order.products, order.orderId);
    let totalPrice = computeTotalPriceFromCart();
})