document.addEventListener("DOMContentLoaded", function() {
  returnPokemon();
})

function returnPokemon() {
  let searchInput = document.getElementById('pokemon-search-input');
  searchInput.addEventListener('keyup', function(e){
    query = searchInput.value;
    pokeResults = pokemon["pokemons"].filter(poke => poke.name.startsWith(query));
    deleteAllPokemon();
    pokeResults.forEach(poke => createPokemon(poke));
  })
}

function flipImage(imgElement, poke) {
  if (imgElement.src === `${poke.sprites['front']}`) {
    imgElement.src = `${poke.sprites['back']}`
  } else {
    imgElement.src = `${poke.sprites['front']}`
  }
}

function deleteAllPokemon() {
  let activePokemon = document.querySelectorAll('.pokemon-container');
  activePokemon.forEach(poke => poke.remove());
}

function createPokemon(poke) {
  let pokeBox = document.getElementById('pokemon-container');

  let pokeDiv = document.createElement('div');
  pokeDiv.setAttribute("class", "pokemon-container");

  let pokeFrame = document.createElement('div');
  pokeFrame.setAttribute("class", "pokemon-frame");

  let pokeName = document.createElement('h1');
  pokeName.setAttribute("class", "center-text");
  pokeName.innerText = `${poke.name}`

  let imgDivOuter = document.createElement('div');
  imgDivOuter.setAttribute("class", "img-div-outer");

  let imgDivInner = document.createElement('div');
  imgDivOuter.setAttribute("class", "img-div-inner");

  let pokeImg = document.createElement('img');
  pokeImg.setAttribute("src", `${poke.sprites['front']}`)
  pokeImg.setAttribute("data-pokename", `${poke.name}`)

  let flipCard = document.createElement('p');
  flipCard.setAttribute("class", "center-text flip-image");
  flipCard.setAttribute("data-pokename", `${poke.name}`)
  flipCard.setAttribute("data-action", "flip-image")
  flipCard.innerText = "flip card";
  flipCard.addEventListener('click', function(){
    imgElement = this.parentNode.firstChild.firstChild;
    flipImage(imgElement, poke);
  })

  pokeBox.appendChild(pokeDiv)
  pokeDiv.appendChild(pokeFrame)
  pokeFrame.appendChild(pokeName);
  pokeFrame.appendChild(imgDivOuter);
  imgDivOuter.appendChild(imgDivInner);
  imgDivInner.appendChild(pokeImg);
  imgDivOuter.appendChild(flipCard);
}


