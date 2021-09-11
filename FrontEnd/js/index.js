// Calling up the list of objects
function getTeddies() {
    return fetch(baseUrl + "/teddies")
        .then((response) => {
            return response.json()
        })
        .then((teddies) => {
            console.log("teddies", teddies);
            return teddies
        })
        .catch((error) => {
            document.querySelector("#alert").innertHtml = `
                <div class="error-message"  role="alert">
                    Une erreur de chargement est intervenue
                </div>`
        })
};

async function list() {
    const teddies = await getTeddies()
    for(teddy of teddies) {
        displayTeddies(teddy)
    };
}

list();

// Function to display the list of objects
function displayTeddies() {
    price = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(teddy.price / 100);
    document.querySelector("#list").innerHTML += 
        `<section class="presentation">
            <a href="../FrontEnd/view/products.html?id=${teddy._id}">
                <div class="image">
                    <img src="${teddy.imageUrl}" alt="${teddy.name}" />
                </div>
                <div class="prodcut-name">
                    <h2>${teddy.name}</h2>
                </div>
                <div class="product-description">
                    ${teddy.description}
                </div>
                <div class="product-price">
                    ${price}
                </div>
                <button class="button">Je découvre</button>
            </a>
        </section>`
}
