let searchRequest = "";
let pSearch = "";
let url = `https://proxy.calweb.xyz/http://www.recipepuppy.com/api/?${searchRequest}`;

const pixaKey = "6122441-6f3c40a45d200b1e224203651";
let pixaSearch = `https://pixabay.com/api/?key=${pixaKey}&q=`;
let category = `&category=food`;
let type = `&image_type=photo`;
const btn = document.getElementById("search-btn");
const input = document.querySelector("input");
const main = document.body.querySelector("main");
let destroy = false;
let recipes = [];
let pics = [];

// Capture search===============================================

btn.addEventListener("click", runSearch);

// Change Query String==========================================

function updateSearch(text) {
	searchRequest = `${url}q=${input.value}`;
	pSearch = `${pixaSearch}${input.value}${category}${type}`;
	input.value = "";
}

function searchPixabay() {
	fetch(pSearch)
		.then(function(data) {
			return data.json();
		})
		.then(function(data) {
			pics = data.hits;
			console.log(pics);
			return pics;
		});
}

function searchRecipe() {
	fetch(searchRequest)
		.then(function(data) {
			return data.json();
		})
		.then(function(data) {
			recipes = data.results;
			console.log(recipes);
			return recipes;
		})
		.then(function(recipes) {
			var pix = 0;
			for (let i = 0; i < recipes.length; i++) {
				createCard(recipes[i], pix);
				pix += 1;
			}
		});
}

// Make Promise =============================================

// Build site =================================================

function createCard(recipe, count) {
	const div = document.createElement("div");
	div.className = "recipe";
	div.innerHTML = `<img src=${pics[count].previewURL}>
  <h1><a href=${recipe.href}>${recipe.title}</a></h1>
  <p>Ingredients: ${recipe.ingredients}</p>`;
	main.appendChild(div);
	destroy = true;
}

// Destroy site ================================================

function destroySite() {
	let recipeArr = document.querySelectorAll(".recipe");
	for (let i = 0; i < recipeArr.length; i++) {
		let recipe = document.querySelector(".recipe");
		main.removeChild(recipe);
	}
}

//Run Fetch/build site==========================================

function runSearch() {
	if (destroy === true) destroySite();
	updateSearch();
	searchPixabay();
	return new Promise(function(resolve, reject) {
		resolve(console.log("this resolved"));
	}).then(searchRecipe);
}
