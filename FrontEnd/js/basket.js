let form = document.querySelector("#order");
form.addEventListener("click", function(event) {
    event.preventDefault();
    //Call the function to build the contact with let contact
    let contact = buildContact(firstName, lastName, address, city, email);
    let message = validateContact(contact);
    //let email = validateEmail(email);

    if(message != null) {
        alert(message);
    }
}, false);

let teddies = getTeddiesFromCart();
let teddiesHTMLForTable = "";
for(let teddy of teddies) {
    teddiesHTMLForTable += buildTeddyForTable(teddy);
}
teddiesHTMLForTable += buildTeddiesTotalPriceForTable();

document.querySelector("#productInCart").innerHTML = teddiesHTMLForTable;


let teddyIds = getIdFromTeddies(teddies);
let orderPromise = sendOrder(contact, teddyIds);

orderPromise.then(function(order) {
    console.log(order.contact, order.products, order.orderId);
})

