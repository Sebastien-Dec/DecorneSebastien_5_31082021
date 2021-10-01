let form = document.querySelector("#order");

form.addEventListener("click", function(event) {
    event.preventDefault();

    firstName = document.querySelector("#firstName").value;
    lastName = document.querySelector("#lastName").value;
    address = document.querySelector("#address").value;
    city = document.querySelector("#city").value;
    email = document.querySelector("#email").value;

    //Call the function to build the contact with let contact
    let contact = buildContact(firstName, lastName, address, city, email);
    let message = validateContact(contact);
    //let email = validateEmail(email);

    if(message != null) {
        alert(message);
        return;
    }

    

    let teddyIds = getIdFromTeddies(teddies);
    let orderPromise = sendOrder(contact, teddyIds);

    orderPromise.then(function(order) {
        console.log(order.contact, order.products, order.orderId);
    })
}, false);

let teddies = getTeddiesFromCart();
    let teddiesHTMLForTable = "";

    for(let teddy of teddies) {
        teddiesHTMLForTable += buildTeddyForTable(teddy);
    }

    teddiesHTMLForTable += buildTeddiesTotalPriceForTable();

    document.querySelector("#productInCart").innerHTML = teddiesHTMLForTable;









