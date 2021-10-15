// Checking the display url
console.log(document.location.href);
// Creates and returns a new URLSearchParams object from the browser url 
//(at least the part with the `?`)
const params = new URLSearchParams(window.location.search);
// We retrieve the product ID
let teddyId = params.get("id");

//Access to the chosen teddy bear
let teddyPromise = getTeddy(teddyId);
let colors = "";

teddyPromise.then(function(teddy) {
    // Create Product page
    let teddyHtml = buildTeddy(teddy);
    document.querySelector("#teddy").innerHTML = teddyHtml;

    // Add cart
    let addCart = document.querySelector("#addCart");
    if(addCart) {
        addCart.addEventListener("click", function (){addTeddyToCart(teddy)});
    }

     // Choose colors    
     let option = document.querySelector("#optionColors");
     option.addEventListener("change", function(e) {
         colors = e.target.options[e.target.options.selectedIndex].value; 
         return colors; 
    })
});
