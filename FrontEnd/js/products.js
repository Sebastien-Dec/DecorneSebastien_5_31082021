// Checking the display url
console.log(document.location.href);
const params = new URLSearchParams(window.location.search);
let teddyId = params.get("id");
console.log("teddyId", teddyId);

//Access to the chosen teddy bear
let teddyPromise = product(teddyId);
console.log("teddy", teddyPromise);

teddyPromise.then(function(teddy) {
    let teddyHtml = buildTeddy(teddy);
    document.querySelector("#teddy").innerHTML = teddyHtml;
})

// Add cart
let AddCart = document.querySelector("#addCart");
if(AddCart) {
    AddCart.addEventListener("click", addProduct(teddy));
}
