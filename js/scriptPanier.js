let tabRec = localStorage.getItem("TabStore");
console.log(tabRec);
let tabRecJson = JSON.parse(tabRec);
console.log(tabRecJson);
console.log(tabRecJson.prix);

let tr = document.createElement("tr");
let htmlTr = `<tr><td>${tabRecJson.nom}</td><td>${tabRecJson.couleur}</td><td>${tabRecJson.prix}</td><input type="text" id="qte" value="1" /></tr>`;
tr.innerHTML = htmlTr;
document.getElementById('table__body').appendChild(tr);

let qte = document.getElementById('qte');
console.log(qte);

qte.onchange = function() {
    htmlTr += `<tr><td>${tabRecJson.prix}</td></tr>`;
    tr.innerHTML = htmlTr;
    document.getElementById('table__body').appendChild(tr);
    console.log(qte.value);
};
