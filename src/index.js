class Pokemon {
  constructor(name, sprites) {
    this.name = name;
    this.front = sprites.front;
    this.back = sprites.back;
    Pokemon.all.push(this);
  }
}

Pokemon.all = [];

function createPokemon() {
  pokemon.pokemons.forEach(p => new Pokemon(p.name, p.sprites));
}

function newDiv() {
  return document.createElement('div');
}

function createContainers(pokemon) {
  const pokemonParent = document.getElementById('pokemon-container');

  const pokeContainer = newDiv();
  pokeContainer.className = 'pokemon-container';
  pokeContainer.style = 'width:230px;margin:10px;background:#fecd2f;color:#2d72fc';

  const pokemonFrame = newDiv();
  pokemonFrame.className = 'pokemon-frame';
  pokemonFrame.innerHTML = `<h1 class='center-text'>${pokemon.name}</h1>`;

  const imageContainer = newDiv();
  imageContainer.style = 'width:96px;margin:auto';
  imageContainer.innerHTML = `<img src='${pokemon.front}'>`;

  const pokeFlip = document.createElement('p');
  pokeFlip.style = 'padding:10px';
  pokeFlip.className = 'center-text flip-image';
  pokeFlip.innerText = 'Flip card';
  pokeFlip.dataset.pokename = pokemon.name;

  pokemonParent.appendChild(pokeContainer);
  pokeContainer.appendChild(pokemonFrame);
  pokemonFrame.appendChild(imageContainer);
  pokemonFrame.appendChild(pokeFlip);
}

function render(pokeSearch) {
  const pokeContainer = document.getElementById('pokemon-container');
  while (pokeContainer.firstChild) {
    pokeContainer.removeChild(pokeContainer.firstChild);
  }
  const filteredPokemon = Pokemon.all.filter(p => p.name.includes(pokeSearch));
  filteredPokemon.forEach(p => createContainers(p));
}

function flipCard() {
  const flipArea = document.querySelector('p.center-text');
  flipArea.addEventListener('click', () => {
    const localPokemon = Pokemon.all.filter(p => p.name === flipArea.dataset.pokename)[0];
    const imageDiv = flipArea.previousSibling;
    if (imageDiv.innerHTML.includes(localPokemon.front)) {
      imageDiv.innerHTML = `<img src='${localPokemon.back} '>`;
    } else {
      imageDiv.innerHTML = `<img src='${localPokemon.front} '>`;
    }
  });
}

function search() {
  const searchBox = document.getElementById('pokemon-search-input');
  searchBox.addEventListener('keyup', () => {
    render(searchBox.value);
    flipCard();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createPokemon();
  search();
});
