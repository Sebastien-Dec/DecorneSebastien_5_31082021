getTeddiesFromCart();
document.querySelector("#order").addEventListener('click',buildContact(firstName, lastName, address, zipCode, city, email));
document.querySelector("#order").addEventListener("click",validateContact(customer));
validateEmail();
computeTotalPriceFromCart();
document.querySelector("#totalPriceOfCart").innerHTML = TotalPrice;