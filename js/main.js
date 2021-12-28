"use strict";

const sectionAnimes = document.querySelector(".js_animes");

fetch("https://api.jikan.moe/v3/search/anime?q=naruto")
  .then((response) => response.json())
  .then((data) => console.log(data));

const data = [

];




function renderArticle(event) {
    event.preventDefault();
  sectionAnimes.innerHTML += `<article class="article">
<img src="https://cdn.myanimelist.net/images/anime/5/17407.jpg?s=2bf24a22a339223dcadb1cdfc3307b61" class="card__img" alt="Animes">
<button class="card__btn" title="Añadir a favoritos">Añadir a favoritos</button></article>`;
}


sectionAnimes.innerHTML = "";
renderArticle();