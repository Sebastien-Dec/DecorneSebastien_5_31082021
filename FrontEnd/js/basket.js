// We create a table of products that are in the basket
let teddies = getTeddiesFromCart();
let teddiesHTMLForTable = "";

for(let teddy of teddies) {
    // Builds the rows of the Teddys table in the basket
    teddiesHTMLForTable += buildTeddyForTable(teddy);
}
// Add the total price line
teddiesHTMLForTable += buildTeddiesTotalPriceForTable();

document.querySelector("#productInCart").innerHTML = teddiesHTMLForTable;

let orderButton = document.querySelector("#order");

orderButton.addEventListener("click", function(event) {
    event.preventDefault();

    //Call the function to build the contact with let contact
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let address = document.querySelector("#address").value;
    let city = document.querySelector("#city").value;
    let email = document.querySelector("#email").value;

    let contact = buildContact(firstName, lastName, address, city, email);
    let message = validateContact(contact);

    if(message != null) {
        alert(message);
        return;
    }
    // We retrieve an array of product IDs in the basket
    let teddyIds = getIdFromTeddies(teddies);
    console.log("teddyIds", teddyIds, contact);
    // We send the order information to the server
    let orderPromise = sendOrder(contact, teddyIds);
    console.log(orderPromise);

    orderPromise.then((order) => {
        
        console.log(order.contact, order.products, order.orderId);
        // We modify the url of the validation page by adding 
        // the order number and the total price of the order
        window.location.href = `ordered.html?orderId=${order.orderId}&totalPrice=${computeTotalPriceFromCart()}`;

    })
    
}, false);











