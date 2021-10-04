// Checking the display url
console.log(document.location.href);
const params = new URLSearchParams(window.location.search);
let teddyId = params.get("id");

//Access to the chosen teddy bear
let teddyPromise = getTeddy(teddyId);
let colors = "";

teddyPromise.then(function(teddy) {
    // Create Product page
    let teddyHtml = buildTeddy(teddy);
    document.querySelector("#teddy").innerHTML = teddyHtml;

    // Add cart
    let AddCart = document.querySelector("#addCart");
    if(AddCart) {
        AddCart.addEventListener("click", function (){addTeddyToCart(teddy)});
    }

     // Choose colors    
     let option = document.querySelector("#optionColors");
     option.addEventListener("change", function(e) {
         colors = e.target.options[e.target.options.selectedIndex].value; 
         return colors; 
    })
});
