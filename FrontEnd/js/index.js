fetch(baseUrl + "/teddies") 
    .then(function(res) {
        console.log("Response", res);
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(teddies) {
        console.log(teddies);
        for (teddy of teddies) {
            imageHtml = `
                        <a href='./view/products.html?id=${teddy._id}'>
                            <img src='${teddy.imageUrl}' alt='${teddy.name}' title='${teddy.price}' />
                            <div class='product-description'>
                                ${teddy.description}
                            </div>
                            <span class='product-price'>
                                ${teddy.price}
                            </span>
                        </a>
                        `;
            htmlImages.push(imageHtml);
            console.log("id", teddy._id, "name", teddy.name, "price", teddy.price, "imageUrl", teddy.imageUrl);
        }
        let div = `<div class="images">${htmlImages.join("")}</div>`
        document.querySelector("#list").innerHTML = div;
    })
    .catch(function(err) {
        console.log("Error", err)
    });
