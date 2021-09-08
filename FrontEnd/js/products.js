console.log(document.location.href);
const params = new URLSearchParams(window.location.search);
teddyId = params.get("id");

idTeddy = products();
console.log("idTeddy", idTeddy);
    
