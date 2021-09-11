/*async function listOfProducts() {
    const response = await fetch(baseUrl + "/teddies");
    const json = await response.json();
    console.log(json);
    return json;
    
}

list = listOfProducts();
console.log("List", list);

async function teddy() {
    const response = await fetch(baseUrl + "/teddies");
    const tabOfTeddy = await response.json();
    console.log("tabOfTeddy", tabOfTeddy);
    
    for (let idOfTeddy of tabOfTeddy) {
    console.log("idOfTeddy", idOfTeddy);
        
            let newDiv = `<p>Nom : ${idOfTeddy.name}</p>
                        <p>Id : ${idOfTeddy._id}</p>
                        <img alt="${idOfTeddy.name}" src="${idOfTeddy.imageUrl}" title="${idOfTeddy.price}"/>
                        <br>`;
                document.querySelector("#exemple").innerHTML = newDiv;
                console.log("teddy", idOfTeddy.name, idOfTeddy._id);    
        }
    
    
}

teddy();

// Exercice ecrire une fonction avec while ou or pour une factorielle
function factoriel(n) {
    let x = n;
    while (x>1) {
        n *= x-1;
        x--;
   }
   return n;
}
factoriel(5);
console.log(" La Factorielle de 5 est ", factoriel(5));*/