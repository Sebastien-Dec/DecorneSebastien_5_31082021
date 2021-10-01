// Calling up the list of objects
list = listOfProducts();
console.log("List", list);
list.then((teddies) => {
    console.log("teddies", teddies);
    let teddiesHtml = "";
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

