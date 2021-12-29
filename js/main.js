"use strict";

const sectionAnimes = document.querySelector(".js_animes");
const searchInput = document.querySelector(".js_search");
const buttonSearch = document.querySelector(".js_button");
const listAnimeResults = document.querySelector(".js_results");

let results = [];

let fav = [];

function handleSearchInput(event) {
  event.preventDefault();
}
if(searchInput.value.lenght >= 4) {
  fetch("https://api.jikan.moe/v3/search/anime?q=naruto")
    .then((response) => response.json())
    .then((dataFromAPI) => {
      results = dataFromAPI.mal_id.image_url;
      renderAllResults();
    });
}

function renderArticle(dataResults) {
  console.log({ dataResults });
  sectionAnimes.innerHTML += `<li class="list_animes js_listresults">
<img src="${dataResults.image_url}" class="card__img" alt="Animes">
<h2 class="title_anime">"${dataResults.title}"</h2></li>`;
}

function renderAllResults() {
  sectionAnimes.innerHTML = "";
  for (let i = 0; i < results.lenght; i++) {
    renderArticle(results[i]);
  }
}

searchInput.addEventListener("keyup", handleSearchInput);
