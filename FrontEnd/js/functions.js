async function listOfProducts() {
    const response = await fetch(baseUrl + "/teddies");
    const json = await response.json();
    return json;
}

let promise = listOfProducts();
console.log("promise", promise);

promise
    .then(function(teddies) {
        let htmlImages =[];
            for(let teddie of teddies) {
                let imageHtml = <a href="../products.html?id=${teddie._id}">
                    <img src="${teddie.imageUrl}" alt="${teddie.name}" title="${teddie.price}" />
                    <div class="product-name">
                        ${teddie.name}
                    </div>
                    <span class="product-price">${teddie.price}</span>
                </a>;
                htmlImages.push(imageHtml);
            }
        let div = <div class="images">${htmlImages.join("")}</div>
        document.querySelector("#list").innerHTML= div;
    })
    .catch(function(err) {
        console.log("Error, err")
    });

