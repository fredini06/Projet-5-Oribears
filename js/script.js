
// xhr.open("GET", "http://localhost:3000/api/teddies");
// xhr.responseType = 'json';
// xhr.send();
// xhr.onload = function() {
//     let teddies = xhr.response;
//     showTeddies(teddies);
// };


// function showTeddies(jsonObj) {
//     document.getElementById("name").innerHTML = jsonObj[0]['name'];
//     document.getElementById("description").innerHTML = jsonObj[0]['description'];
//     document.getElementById("price").innerHTML = jsonObj[0]['price'];
    
//     let im = document.getElementById("image");
//     let imUrl = jsonObj[0]['imageUrl'];
//     im.src = imUrl;
// };

fetch("http://localhost:3000/api/teddies")
    .then(function (response) {
        response.json()
            .then(function (value) {
                let tab = value;
                showTeddies(tab);
            })            
    });

// function showTeddies(tab){
//     document.getElementById("name").innerHTML = tab[0]['name'];
//     document.getElementById("description").innerHTML = tab[0]['description'];
//     let prix = tab[0]['price'];
//     document.getElementById("price").innerHTML = prix /100;

//     let im = document.getElementById("image");
//     let imUrl = tab[0]['imageUrl'];
//     im.src = imUrl;
// };


    function showTeddies(tab){
        document.getElementById("name").innerHTML = tab[0]['name'];
        document.getElementById("description").innerHTML = tab[0]['description'];
        let prix = tab[0]['price'];
        document.getElementById("price").innerHTML = prix /100;
        let im = document.getElementById("image");
        let imUrl = tab[0]['imageUrl'];
        im.src = imUrl;
        
        for(i=1; i < tab.length; i++){
            let item = document.getElementById("container");
            let clone = item.cloneNode(true);
            clone.id = "container" + i; 
            document.getElementById("ajout").appendChild(clone);  
            let cont = document.getElementById("container" + i);
            document.getElementById("name").innerHTML = tab[i]['name'];
            document.getElementById("description").innerHTML = tab[i]['description'];
            let prix = tab[i]['price'];
            document.getElementById("price").innerHTML = prix /100;
            let im = document.getElementById("image");
            let imUrl = tab[i]['imageUrl'];
            im.src = imUrl;
        }
    };

    