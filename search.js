document.querySelector("#pokemon-search-form").addEventListener('submit', (e) => {e.preventDefault()})

var pokemons = []
var results = []
let searchBox = document.querySelector("#pokemon-search-input")

class Pokemon {
	constructor(name, front, back) {
		this.name = name
		this.front = front
		this.back = back
	}
	render() {
		let div2 = document.createElement('div')
		div2.classList.add('pokemon-container')
		let div1 = document.createElement("div")
		div1.classList.add("pokemon-frame")
		div1.style.width = '230px'
		div1.style.margin = '10px'
		div1.style.background = '#fecd2f'
		div1.style.color = '#2d72fc'

		let title = document.createElement('h1')
		title.classList.add("center-text")
		title.innerText = this.name

		let image = document.createElement('img')
		image.src = this.front
		image.classList.add('poke-image')
		image.setAttribute("poke-name", this.name);

		let flip = document.createElement('p')
		flip.innerText = "show me its ass!"
		flip.style.padding = '10px'
		flip.classList.add('center-text')
		flip.classList.add('flip-image')
		flip.addEventListener('click', flipImage)

		div1.appendChild(title)
		div1.appendChild(image)
		div1.appendChild(flip)
		div2.appendChild(div1)
		document.querySelector("#pokemon-container center").appendChild(div2)

	}

	static createAllFromJSON(data) {
		data.pokemons.forEach((poke) => {
			pokemons.push(new Pokemon(poke.name, poke.sprites.front, poke.sprites.back));
		})
	}
}

function search() {
	if (searchBox.value === '') {results = []} else {
	results = pokemons.filter((pokeimam)=>{
		if (pokeimam.name.search(searchBox.value) === (-1)) 
		{
			return false
		} else {
			return true
		}})}
}

function createList() {
	results = []
	document.querySelector("#pokemon-container center").innerHTML = ''
	search();
	results.forEach((poke) => {poke.render()})
}

function flipImage() {
	let shownImage = this.parentNode.querySelector('.poke-image')

	let pok = pokemons.find((pk) => {return pk.name === shownImage.attributes["poke-name"].value})
	if (shownImage.src === pok.front) {
		shownImage.src = pok.back
	} else {
		shownImage.src = pok.front
	}
}

Pokemon.createAllFromJSON(jsonData);
searchBox.addEventListener('keyup', createList)
