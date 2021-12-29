"use strict";

const sectionAnimes = document.querySelector(".js_animes");
const searchInput = document.querySelector(".js_search");
const buttonSearch = document.querySelector(".js_button");
const listAnimeResults = document.querySelector(".js_results");
const listFav = document.querySelector(".js_fav");
const resetBtn = document.querySelector(".js_reset");


let results = [];

let fav = [];

/* al hacer una busqueda*/
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
  listAnimeResults.innerHTML += `<li class="list_animes js_listresults">
<img src="${dataResults.image_url}" class="card__img" alt="Animes">
<h2 class="title_anime">"${dataResults.title}"</h2></li>`;
}

function renderAllResults() {
  listAnimeResults.innerHTML = "";
  for (let i = 0; i < results.lenght; i++) {
    renderArticle(results[i]);
  }
}

/*Boton de buscar*/
function handleClickSearch(){
    for(eachClick of buttonSearch){    
      listAnimeResults.innerHTML = "";  
  }
}

/*Añadir a favoritos*/



/*Boton reset*/
function handleClickReset(){
for(eachClick of resetBtn){
  listAnimeResults.innerHTML = "";  
  listFav.innerHTML="";
}
}



searchInput.addEventListener("keyup", handleSearchInput); /*input - pesquisa animes*/
buttonSearch.addEventListener("click", handleClickSearch); /*boton de buscar*/
resetBtn.addEventListener("click", handleClickReset); /*boton reset*/
