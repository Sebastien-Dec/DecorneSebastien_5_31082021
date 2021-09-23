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
function addProduct(teddy) {
    // Create Object
    let teddyForCart = {
        id : `${teddy._id}`,
        name : `${teddy.name}`,
        price : `${teddy.price}`,
        color : colors,
        image : `${teddy.imageUrl}`,
        quantity : quantity,
    }
    let cart = localStorage.getItem("cart");
    let teddies = [];
    if(cart == null) {
        teddies.push(teddyForCart);
        cart = JSON.stringify(teddies);
    } else {
        teddies = JSON.parse(cart);
        teddies.push(teddyForCart);
        cart = JSON.stringify(teddies);  
    }
    localStorage.setItem("cart", cart);
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
    let productInCart = "";
    for(productIncart of cart){
        for(let i=0; i <= cart.length; i+=1){
            productInCart = {
                image: cart[i].image,
                id: cart[i].id,
                name: cart[i].name,
                color: cart[i].color,
                price:cart[i].price,
                quantity: cart[i].quantity
            };
            let totalPrice = productInCart.quantity * productInCart.price;
            let productCart = `
                <tr>
                    <td><img src="${productInCart.image}" alt="${productInCart.name}" class="product-image" /></td>
                    <td class="id">${productInCart.id}</td>
                    <td class="product-name">${productInCart.name}</td>
                    <td class="product-color">${productInCart.color}</td>
                    <td class="price">${formatPrice(productInCart.price)}</td>
                    <td class="product-quantity">${productInCart.quantity}</td>
                    <td class="total-price">${formatPrice(totalPrice)}</td>
                </tr>
                `;
                document.querySelector("#productInCart").innerHTML += productCart;
        }
    }
}


