async function listOfProducts() {
    const response = await fetch(baseUrl + "/teddies");
    const json = await response.json();
    //console.log(json);
    return json;
    
}

async function products() {
    const response = await fetch(baseUrl + "/teddies/" + teddyId);
    const id = await response.json();
    //console.log(id);
    return id;
}




