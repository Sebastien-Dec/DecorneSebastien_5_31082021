async function listOfProducts() {
    const response = await fetch(baseUrl + "/teddies");
    const json = await response.json();
    console.log(json);
    return json;
    
}

list = listOfProducts();
console.log("List", list);

async function teddy() {
    const response = await fetch(baseUrl + "/teddies/" + teddyId);
    const tabOfTeddy = await response.json();
    for (let idOfTeddy of tabOfTeddy) {
        tabOfTeddy.find(Array => "_id");
        console.log("idOfTeddy", idOfTeddy);
        let teddy = idOfTeddy.name;
        let newDiv = `<p>Peluche : ${teddy}</p>`;
        document.querySelector("#exemple").innerHTML = newDiv;
        console.log("teddy", teddy);     
    }
}

teddy();

