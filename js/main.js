"use strict";

const animesElement = document.querySelector(".js_results");
const userValue = document.querySelector(".js_search");
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
  animeHtmlCode += `<img src="${anime.image_url}"  data-id="${anime.mal_id}" class="card__img js_addanimefav" alt="animes">`;
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

//Boton buscar animes (click boton):
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
  //console.log(ev.target.dataset.id);

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
};

const getToFavorites = (fav) => {
  let animeFavHtmlCode = "";
  animeFavHtmlCode += `<li class="list_animesfav js_fav">`;
  animeFavHtmlCode += `<img src="${fav.image_url}"  data-id="${fav.mal_id}" class="card__img js_addanimefav" alt="animes">`;
  animeFavHtmlCode += `<h2 class="title_anime">${fav.title}</h2></li>`;
  return animeFavHtmlCode;
};

//pintar en favoritos:
const paintFavorites = () => {
  listFav.innerHTML = "";
  for(const fav of favorites){
  listFav.innerHTML += getToFavorites(fav);
} 
};





//Boton reset (se apaga en favoritos):
function handleClickReset() {
  for (eachClick of resetBtn) {
    listFav.innerHTML = "";
  }
  resetAllResults();
}

//Eventos:
resetBtn.addEventListener("reset", handleClickReset); // Boton reset
buttonSearch.addEventListener("click", handleClickSearch); // Boton de buscar

//Start app:
//getApiData();
