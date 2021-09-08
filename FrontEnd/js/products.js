//Test to verify that the bone list is called
idTeddy = products();
console.log("idTeddy", idTeddy);

console.log(document.location.href);
const params = new URLSearchParams(window.location.search);
teddyId = params.get("id");
console.log("teddyId", teddyId);
    
fetch(baseUrl + "/teddies/" + teddyId)
    .then(function(res) {
        console.log("Response", res);
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(teddy) {
        for(color of teddy.colors) {
            optionColor += `<option value="${color}">${color}</option>`;
        }
        teddyHtml = `
                    <div class="row">
                        <img src='${teddy.imageUrl}' alt='${teddy.name}' title='${teddy.description} />
                        <p class="description">${teddy.description}</p>'
                        <span class="teddy.price">${teddy.price}</span>
                        <select class="teddy-color">
                            ${optionColor}
                        </select>
                    </div>
                    `;
        document.querySelector("#teddy").innerHTML = teddyHtml;
    })
    .catch(function(err) {
        console.log("Error", err)
    });
