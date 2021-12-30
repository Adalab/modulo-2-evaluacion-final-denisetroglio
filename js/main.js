"use strict";

const animesElement = document.querySelector(".js_results");
const searchInput = document.querySelector(".js_search");
const resetBtn = document.querySelector(".js_reset");
const listFav = document.querySelector(".js_fav");
const buttonSearch = document.querySelector(".js_button");

let animes = [
  {
    mal_id: "",
    image_url: "",
    title: "",
  },
];

let favorites = [];

// Get data from API:
const getApiData = () => {
  fetch("https://api.jikan.moe/v3/search/anime?q=")
    .then((response) => response.json())
    .then((data) => {
      animes = data.results;
      paintAnimes();
    });
};

//pintar animes:

const getAnimes = (anime) => {
  let animeHtmlCode = "";
  animeHtmlCode += `<li class="list_animes js_listresults">`;
  animeHtmlCode += `<img src="${anime.image_url}"  data-id=${anime.mal_id} class="card__img js_addanimefav" alt="animes">`;
  animeHtmlCode += `<h2 class="title_anime">${anime.title}</h2></li>`;
  return animeHtmlCode;
};
const paintAnimes = () => {
  let animesCode = "";
  for (const anime of animesCode) {
    animesCode += getAnimes(anime);
  }
  animesElement.innerHTML = animesCode;
  listAnimesFav();
};

//Buscar animes (digitar):
function handleSearchInput(event) {
  event.preventDefault;
  if (searchInput.value.lenght >= 4) {
  }
}

//Boton buscar animes (click boton):
function handleClickSearch() {
  for (eachSearch of buttonSearch) {
    animesElement.innerHTML += "";
    console.log("busco algun anime");
  }
  paintResults();
}

//Añadir imagenes de resultados a favoritos:
const listAnimesFav = () => {
  const addAnimesFav = document.querySelectorAll(".js_addanimefav");
  for (const addAnimeFav of addAnimesFav) {
    addAnimeFav.addEventListener("click", addToFavorites);
  }
};
const addToFavorites = (ev) => {
  const clickToFavId = ev.target.mal_id;
  let foundAnime;
  for (const anime of animes) {
    if (anime.mal_id === clickToFavId) {
      foundAnime = anime;
    }
  }
  favorites.push({
    mal_id: foundAnime.mal_id,
    image_url: foundAnime.image_url,
    title: foundAnime.title,
  });
};

//Boton reset (se apaga en favoritos y en resultados):
function handleClickReset() {
  for (eachClick of resetBtn) {
    listAnimeResults.innerHTML = "";
    listFav.innerHTML = "";
  }
  resetAllResults();
}

//Eventos:
resetBtn.addEventListener("reset", handleClickReset); // Boton reset
searchInput.addEventListener("keyup", handleSearchInput); //digitar nombre animes
buttonSearch.addEventListener("click", handleClickSearch); // Boton de buscar

//Start app:
getApiData();
