let searchRequest = "";
let url = `https://proxy.calweb.xyz/http://www.recipepuppy.com/api/?${searchRequest}`;

const btn = document.getElementById("search-btn");
const value = document.querySelector("input").value;
let recipes = [];

// Capture search===============================================

btn.addEventListener("click", runSearch);

// Change Query String==========================================

function updateSearch(text) {
	searchRequest = `q=${value}`;
	value = "";
}

// Build site =================================================

function createCard(recipe) {
	const div = document.createElement("div");
	div.className = "recipe";
	div.innerHTML = `<img href=${recipe.img}>
  <h1>${recipe.name}</h1>
  <ul>`;
}

//Run Fetch/build site==========================================

// fetch(url)
// 	.then(function(data) {
// 		return data.json();
// 	})
// 	.then(function(data) {
// 		recipes = data.results;
// 		console.log(recipes);
// 	});
