let form = document.querySelector("#order");

form.addEventListener("click", function(event) {
    event.preventDefault();

    

    //Call the function to build the contact with let contact
    let contact = buildContact(firstName, lastName, address, city, email);
    let message = validateContact(contact);

    if(message != null) {
        alert(message);
        return;
    }

    let teddyIds = getIdFromTeddies(teddies);
    console.log("teddyds", teddyIds, contact);
    let orderPromise = sendOrder(contact, teddyIds);
    console.log(orderPromise);
    orderPromise.then((order) => {
        
        console.log(order.contact, order.products, order.orderId);
        window.location.href = `ordered.html?orderId=${order.orderId}&totalPrice=${computeTotalPriceFromCart()}`;

    })
    
    }, false);

let teddies = getTeddiesFromCart();
    let teddiesHTMLForTable = "";

    for(let teddy of teddies) {
        teddiesHTMLForTable += buildTeddyForTable(teddy);
    }

    teddiesHTMLForTable += buildTeddiesTotalPriceForTable();

    document.querySelector("#productInCart").innerHTML = teddiesHTMLForTable;









