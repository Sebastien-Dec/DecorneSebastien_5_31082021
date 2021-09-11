async function listOfProducts() {
    const response = await fetch(baseUrl + "/teddies");
    const json = await response.json();
    console.log(json);
    return json; 
}

async function getTeddy(teddyId) {
    const response = await fetch(baseUrl + "/teddies/" + teddyId);
    const json = await response.json();
    return json;
}

async function product(id) {
    let oneTeddy = await getTeddy(id);
    console.log("oneTeddy", oneTeddy);
    return oneTeddy;
}

function formatPrice(price) {
    let newPrice = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(price / 100);
    return newPrice;
}

function buildTeddy(teddy) {
    let teddyHtml = 
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
            </a>
        </section>`;
    return teddyHtml;
}

/*function buildOption(colors) {
    let optionColors = "";
    for(let color of colors) {
        optionColors += `<option value="${color}">${color}</option>`
    }
    let teddyColors =
        `<div class="option">
            <select class="teddy-colors">
                ${optionColors}
            </select>
        </div>`;
    return teddyColors;
}*/

