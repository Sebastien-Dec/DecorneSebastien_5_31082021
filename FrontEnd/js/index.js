// Calling up the list of objects
let list = listOfProducts();

list.then((teddies) => {
    console.log("teddies", teddies);
    let teddiesHtml = "";
    // Construction of the list of products
    for(teddy of teddies) {
        teddiesHtml += buildTeddies(teddy);
    }
    document.querySelector("#list").innerHTML = teddiesHtml;
    })
    .catch((error) => {
        document.querySelector(".alert").innertHtml = `
            <div class="error-message"  role="alert">
                ${error}
            </div>`
    });

