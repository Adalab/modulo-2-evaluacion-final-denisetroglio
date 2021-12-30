"use strict";

const animesElement = document.querySelector(".js_results");
const resetBtn = document.querySelector(".js_reset");
const listFav = document.querySelector(".js_fav");
const buttonSearch = document.querySelector(".js_button");

let animes = [];

// Get data from API:
const getApiData = () => {
  fetch("https://api.jikan.moe/v3/search/anime?q=naruto")
    .then((response) => response.json())
    .then((data) => {
      animes = data.results;
      paintAnimes();
    });
};

//pintar animes:

const getAnimes = anime => {
  let animeHtmlCode = "";
  animeHtmlCode += `<li class="list_animes js_listresults">`;
  animeHtmlCode += `<img src="${anime.image_url}"  id=${anime.mal_id} class="card__img" alt="animes">`
  animeHtmlCode += `<h2 class="title_anime">${anime.title}</h2></li>`;
return animeHtmlCode;
};

const paintAnimes = () => {
  let animesCode = "";
  for (const anime of animes) {
    animesCode += getAnimes(anime);
  }
  animesElement.innerHTML = animesCode;
};

//Start app:
getApiData();






//Añadir a favoritos:




/*Boton reset*/
function handleClickReset() {
  for (eachClick of resetBtn) {
    listAnimeResults.innerHTML = "";
    listFav.innerHTML = "";
  }
  resetAllResults();
}

//Eventos:
resetBtn.addEventListener("reset", handleClickReset); // Boton reset
