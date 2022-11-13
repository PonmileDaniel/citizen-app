let addIngredientsBtn = document.getElementById("addIngredientsBtn");
let IngredientList = document.querySelector(".IngredientList");
let IngredientDiv = document.querySelectorAll(".IngredientDiv")[0];
// let trashCan = document.querySelector("a.delete");

addIngredientsBtn.addEventListener("click", function(){
    let newIngredient = IngredientDiv.cloneNode(true);
    let input = newIngredient.getElementsByTagName("input")[0];
    input.value= "";
    IngredientList.appendChild(newIngredient);
});




// trashCan.addEventListener("click", (e) => {
//   const endpoint = `/category/${trashCan.dataset.doc}`;

//   fetch(endpoint, {
//     method: "DELETE",
//   })
//     .then((response) => response.json())
//     .then((data) => (window.location.href = data.redirect))
//     .catch((err) => console.log(err));
// });
