// Function to create the List of Products
async function listOfProducts() {
    const response = await fetch(baseUrl + "/teddies");
    const json = await response.json();
    console.log(json);
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
                    <img src="${teddy.imageUrl}" alt="${teddy.name} />
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

let quantity = 1;
// Function AddCart
function addTeddyToCart(teddy) {
    // Create Object
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
        teddies.push(teddyForCart);
        teddiesJSON = JSON.stringify(teddies);
    } else {
        let teddies = JSON.parse(teddiesJSON);
        teddies.push(teddyForCart);
        teddiesJSON = JSON.stringify(teddies);
    }
    localStorage.setItem("cart", teddiesJSON);
    confirmAddCart();
}

function confirmAddCart() {
    alert('Cet article a bien été ajouté à votre panier');
}

/*function removeProduct() {
    let cart = localStorage.getItem ("cart");
    if(cart == 1) {
        localStorage.removeItem("cart");
    }
}*/

// Function to call cart in localstorage
function getTeddiesFromCart() {
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    for(let i=0; i <= cart.length; i+=1){
    let productCart = `
        <tr>
            <td><img src="${cart[i].image}" alt="${cart[i].name}" class="product-image" /></td>
            <td class="id">${cart[i].id}</td>
            <td class="product-name">${cart[i].name}</td>
            <td class="product-color">${cart[i].color}</td>
            <td class="price">${formatPrice(cart[i].price)}</td>
            <td class="product-quantity">${cart[i].quantity}</td>
            <td class="total-price">${formatPrice(cart[i].totalPrice)}</td>
        </tr>
        `;
    document.querySelector("#productInCart").innerHTML += productCart; 
    }
}

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

//Validate contact
function validateContact(contact) {
    let firstName = document.forms["contact"]["firstName"];
    let lastName = document.forms["contact"]["lastName"];
    let address = document.forms["contact"]["address"];
    let city = document.forms["contact"]["city"];
    let email = document.forms["contact"]["email"];
    if(contact == null) {
        alert("Veuillez remplir le formulaire");
        contact.focus();
        return false;
    } else if(firstName == null || contact.firstName.trim() == "") {
        alert("Veuillez renseigner votre nom");
        firstName.focus();
        return false;
    } else if(lastName == null || lastName.trim() == "") {
        alert("Veuillez renseigner votre prénom");
        lastName.focus();
        return false;
    } else if(address == null || address.trim() == "") {
        alert("Veuillez rensigner votre addresse");
        adress.focus();
        return false;
    } else if(city == null || city.trim() == "") {
        alert("Veuillez renseigner votre ville");
        city.focus();
        return false;
    } else if(email == null || email.trim() =="") {
        alert("Veuillez renseigner votre email");
        email.focus();
        return false
    } else {
        return true;
    }
}

//For validate Email
function validateEmail() {
    let inputEmail = document.querySelector("#email").addEventListener("change", function() {
        validateEmail(this);
    });
    const validateEmail = function(inputEmail) {
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_] + [@]{1}[a-zA-Z0-9.-_] + [.]{1}[a-z]{2,10}$','g');
        let testEmail = emailRegExp.test(inputEmail.value);
        let small = inputEmail.nextElementSibling;
        if(testEmail) {
            return true;
        } else {
            return false;
        }
    }
}

function computeTotalPriceFromCart() {
    let teddies = getTeddiesFromCart();
    let prixTotal = "";
    for(let teddy in teddies) {
        prixTotal += teddy.totalPrice;
    }
    document.querySelector("#totalCart").innerHTML = `Prix Total de votre Panier : ${prixTotal}`;
}

let contact = buildContact("","","","","");
let message = validateContact(contact);

if(message != null) {
    alert(message);
}

function getIdFromTeddies(teddies) {
    let teddyIds = [];
    for(let teddy of teddies) {
        teddiesIds.push(teddy._id);
    }
    return teddiesIds;
}

async function sendOrder(contact, teddies) {
    for(teddies of teddiesId) {
        let response = await fetch(baseUrl + "/teddies/order", {
            method: POST,
            body: contact
    });
    let json = await response.json();
    return json;
}

let teddiesCart = getTeddiesFromCart();
let teddyIds = getFromTeddies(teddiesCart);
let orderPromise = sendOrder(contact, teddyIds);

orderPromise.then(function(order) {
    console.log(order.contact, order.products, order.orderId);
    let totalPrice = computeTotalPriceFromCart();

})
}
