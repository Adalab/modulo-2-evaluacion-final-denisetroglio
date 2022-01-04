"use strict";

const animesElement = document.querySelector(".js_results");
const userValue = document.querySelector(".js_search");
const resetBtn = document.querySelector(".js_reset");
const listFav = document.querySelector(".js_fav");
const buttonSearch = document.querySelector(".js_button");

let animes = [];

let favorites = [];

// Get data from API:
const getApiData = () => {
  fetch(`https://api.jikan.moe/v3/search/anime?q=${userValue.value}`)
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
  animeHtmlCode += `<img src="${anime.image_url}"  data-id="${anime.mal_id}" class="card__images js_addanimefav" alt="animes">`;
  animeHtmlCode += `<h2 class="title_anime">${anime.title}</h2></li>`;
  return animeHtmlCode;
};
const paintAnimes = () => {
  let animesCode = "";
  for (const anime of animes) {
    animesCode += getAnimes(anime);
  }
  animesElement.innerHTML = animesCode;
  listAnimesFav();
};

//Boton buscar animes (click boton Buscar):
function handleClickSearch(event) {
  event.preventDefault();
  getApiData();
}

//Añadir imagenes de resultados a favoritos:
const listAnimesFav = () => {
  const addAnimesFav = document.querySelectorAll(".js_addanimefav");
  for (const addAnimeFav of addAnimesFav) {
    addAnimeFav.addEventListener("click", addToFavorites);
  }
};

const addToFavorites = (ev) => {
  const clickedId = parseInt(ev.target.dataset.id);
  let foundAnime;
  for (const anime of animes) {
    if (anime.mal_id === clickedId) {
      foundAnime = anime;
    }
  }

  favorites.push({
    mal_id: foundAnime.mal_id,
    image_url: foundAnime.image_url,
    title: foundAnime.title,
  });
  console.log(favorites);
  paintFavorites();
  setInLocalStorage();
};

const getToFavorites = (fav) => {
  let animeFavHtmlCode = "";
  animeFavHtmlCode += `<li class="list_animesfav js_fav">`;
  animeFavHtmlCode += `<img src="${fav.image_url}"  data-id="${fav.mal_id}" class="card__imgfav js_anime" alt="animes">`;
  animeFavHtmlCode += `<h2 class="title_anime">${fav.title}</h2></li>`;
  animeFavHtmlCode += `<button class="delete js_deletefav">x</button>`;
  return animeFavHtmlCode;
};

//pintar en favoritos:
const paintFavorites = () => {
  listFav.innerHTML = "";
  for (const fav of favorites) {
    listFav.innerHTML += getToFavorites(fav);
  }
};

//Boton "x" Favoritos:
function handleClickX() {
  const buttonX = document.querySelectorAll(".js_deletefav");
  for (const button of buttonX) buttonX.addEventListener("click", handleClickX);
}
handleClickX();

//Boton reset (limpia favoritos, resultados y Local Storage):
function handleClickReset() {
  favorites = [];
}

//Guardar en local Storage:
const setInLocalStorage = () => {
  const storageFav = JSON.stringify(favorites);
  localStorage.setItem("fav", storageFav);
};

//Eventos:
resetBtn.addEventListener("click", handleClickReset); // Boton reset
buttonSearch.addEventListener("click", handleClickSearch); // Boton de buscar

//Start app:
//getApiData();
