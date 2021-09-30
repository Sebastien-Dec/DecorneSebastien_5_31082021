// Function to create the List of Products
async function listOfProducts() {
    const response = await fetch(baseUrl + "/teddies");
    const json = await response.json();
    return json; 
}

// Function to call Id
async function getTeddy(teddyId) {
    const response = await fetch(baseUrl + "/teddies/" + teddyId);
    const json = await response.json();
    return json;
}

// Function for Price in Euro
function formatPrice(price) {
    let newPrice = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(price / 100);
    return newPrice;
}

// Function for Build Teddy for HomePage
function buildTeddies(teddy) {
    let teddiesHtml = 
        `<section class="presentation">
            <a href="../FrontEnd/view/products.html?id=${teddy._id}">
                <div class="image">
                    <img src="${teddy.imageUrl}" alt="${teddy.name}" />
                </div>
                <div class="product-name">
                    <h2>${teddy.name}</h2>
                </div>
                <div class="product-description">
                    ${teddy.description}
                </div>
                <div class="product-price">
                    ${formatPrice(teddy.price)}
                </div>
                <button class="button view" type="submit">Je découvre</button>
            </a>
        </section>`;
    return teddiesHtml;
}

// Function Teddy for product page
function buildTeddy(teddy) {
    let optionColors = "";
    for(let color of teddy.colors) {
        optionColors += `<option value="${color}">
                            ${color}
                        </option>`;
        console.log("optionColors", optionColors);
    }
    let teddyHtml = 
    `<h1>${teddy.name}</h1>
    <section class="product">
        <div class="image image-product">
            <img src="${teddy.imageUrl}" alt="${teddy.name}" />
        </div>
        <div class="product-description">
            ${teddy.description}
        </div>
        <div class="product-price">
            ${formatPrice(teddy.price)}
        </div>
    </section>
    <div id="addToCart">
            <select name="colors" id="optionColors">
                <option value="">Choisissez votre couleur</option>
                ${optionColors}
            </select>
            <button class="button" id="addCart" type="submit">Ajouter au panier</button>
    </div>`;
    return teddyHtml;
}

// Function AddCart
function addTeddyToCart(teddy) {
    // Create Object
    let quantity = 1;
    let totalPrice = (teddy.price * quantity);
    let teddyForCart = {
        id : `${teddy._id}`,
        name : `${teddy.name}`,
        price : `${teddy.price}`,
        color : colors,
        image : `${teddy.imageUrl}`,
        quantity : quantity,
        totalPrice : totalPrice
    }
    let teddiesJSON = localStorage.getItem(cartKey);
    if(teddiesJSON == null) {
        let teddies = [];
        if(colors == "") {
            alert("Veuillez choisir une couleur");
            return false;
        } else {
            teddies.push(teddyForCart);
            teddiesJSON = JSON.stringify(teddies);
        }
    } else {
        let teddies = JSON.parse(teddiesJSON);
        if(colors == "") {
            alert("Veuillez choisir une couleur");
            return false;
        } else {
            teddies.push(teddyForCart);
            teddiesJSON = JSON.stringify(teddies);
        }
    }
    localStorage.setItem(cartKey, teddiesJSON);
    confirmAddCart();
}

function confirmAddCart() {
    alert('Cet article a bien été ajouté à votre panier');
}

//Function to remove product in cart
function removeTeddyToCart() {
    teddiesParse.splice(teddiesParse, 1);
    localStorage.setItem(cartKey, JSON.stringify(teddiesParse));
    window.location.reload();
}

//Function that returns an array of teddies that are in the basket (localstorage)
function getTeddiesFromCart() {
    let teddiesJSON = localStorage.getItem(cartKey);
    if(teddiesJSON == null) {
        return[];
    } else {
        teddiesParse = JSON.parse(teddiesJSON);
        return teddiesParse;
    }
}

//Function to build a teddy as a table row for display in a table
function buildTeddyForTable(teddy) {
    return `
        <tr>
            <td><img src="${teddy.image}" alt="${teddy.name}" class="product-image" /></td>
            <td class="id">${teddy.id}</td>
            <td class="product-name">${teddy.name}</td>
            <td class="product-color">${teddy.color}</td>
            <td class="price">${formatPrice(teddy.price)}</td>
            <td class="product-quantity">${teddy.quantity}</td>
            <td class="total-price">${formatPrice(teddy.totalPrice)}</td>
            <td>
                <button class="delete" onclick="removeTeddyToCart()"><i class="far fa-trash-alt"></i></button>
            </td>
        </tr>
        `; 
}

//Function to build the line which will display (in table form)
//the total price of the products 
function buildTeddiesTotalPriceForTable() {
    return `<tr>
                <td colspan="6" class="total-price">TOTAL</td>
                <td class="total-price">${formatPrice(computeTotalPriceFromCart())}</td>
            </tr>`;
}

//A function allowing to calculate the total price 
//of the teddies which are in the basket (localStorage)
function computeTotalPriceFromCart() {
    let teddies = getTeddiesFromCart();
    //browse the teddies object and sum all the `prices`
    let sum = 0;
    for(let teddy of teddies) {
        sum += teddy.totalPrice;
    }
    return sum;
}

//Function which takes as parameter a fuul array of teddies 
//and returns an array of _id of these teddies
function getIdFromTeddies(teddies) {
    let teddiesIds = [];
    for(let teddy of teddies) {
        teddiesIds.push(teddy._id);
    }
    return teddiesIds;
}
//Function that allows you to build the contact object from the contact information
function buildContact(firstName, lastName, address, city, email) {
    firstName = document.querySelector("#firstName").value;
    lastName = document.querySelector("#lastName").value;
    address = document.querySelector("#address").value;
    city = document.querySelector("#city").value;
    email = document.querySelector("#email").value;
    let contact = {
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "city": city,
        "email": email
    };
    return contact;
}

//Function that allows to validate / check the information 
//of the contact placing the order
function validateContact(contact) {
    if(contact == null) {
        alert("Veuillez remplir le formulaire");
        return false;
    } else if(contact.firstName == null || contact.firstName.trim() == "") {
        alert("Veuillez renseigner votre prénom");
        return false;
    } else if(contact.lastName == null || contact.lastName.trim() == "") {
        alert("Veuillez renseigner votre nom");
        return false;
    } else if(contact.address == null || contact.address.trim() == "") {
        alert("Veuillez rensigner votre addresse");
        return false;
    } else if(contact.city == null || contact.city.trim() == "") {
        alert("Veuillez renseigner votre ville");
        return false;
    } else if(contact.email == null || contact.email.trim() =="") {
        alert("Veuillez renseigner votre email");
        return false;
    } else if(contact.email.indexOf('@') == -1) {
        alert("Ceci n'est pas une adresse mail");
        return false;
    } /*else { 
        setTimeout(() => {
            document.querySelector("#order").addEventListener("click", window.location.href = 'ordered.html');    
        }, 1000); 
    }*/
}

//For validate Email
function validateEmail(email) {
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_] + [@]{1}[a-zA-Z0-9.-_] + [.]{1}[a-z]{2,10}$','g');
    return emailRegExp.test(email);
}

//Function to send customer information and product identification
/**
 * 
 * @param {*} contact Customer Info
 * @param {*} teddies table containing the Teddy's Id
 * @returns return an order promise
 */
async function sendOrder(contact, teddyIds) {
    let response = await fetch(baseUrl + "/teddies/order", {
        method: 'POST',
        body: JSON.stringify({
            "contact": contact,
            "products": teddyIds,
        })
    });
    let json = await response.json();
    return json;
}
