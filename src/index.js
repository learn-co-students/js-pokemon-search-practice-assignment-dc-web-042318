let searchBox
let pokeCont

document.addEventListener("DOMContentLoaded", function() {
    pokeCont = document.getElementById('pokemon-container')
    searchBox = document.getElementById('pokemon-search-input')
    searchBox.addEventListener('keyup', pokeSearch) 
    pokemons.pokemons.forEach(function(pokemon) {
        new Pokemon(pokemon.name, pokemon.sprites.front, pokemon.sprites.back)
    })
    displayPokemon()  

})

class Pokemon {
    constructor(name, imgFront, imgBack) {
        this.name = name
        this.imgFront = imgFront
        this.imgBack = imgBack
        this.hidden = true
        Pokemon.all.push(this)
    }
}

Pokemon.all = []

function displayPokemon() {
    while (pokeCont.firstChild) {
        pokeCont.removeChild(pokeCont.firstChild);
    }
    const showPoke = Pokemon.all.filter(pokemon => pokemon.hidden === false)
    showPoke.forEach(function(pokemon) {
        var node = document.createElement('p')
        var nodeId = document.createAttribute("id")
        nodeId.value = pokemon.name
        node.setAttributeNode(nodeId)
        var pokeName = document.createTextNode(`${pokemon.name}`)
        node.appendChild(pokeName)
        pokeCont.appendChild(node)
    })
}

function pokeSearch() {
    const searchString = searchBox.value
    console.log(searchString)
    Pokemon.all.forEach(function(pokemon) {
        if (pokemon.name.includes(searchString) && searchString != '') {
            pokemon.hidden = false
        } else {
            pokemon.hidden = true
        }
    })
    displayPokemon()
}