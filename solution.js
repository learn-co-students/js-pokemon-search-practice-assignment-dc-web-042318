class Pokemon{
	constructor({name:e,sprites:a}){
		this.name=e,
		this.frontImage=a.front,
		this.backImage=a.back,
		this.image=this.frontImage
	}
	render(){
		return`
      <div class="pokemon-container">
        <div style='width:230px;margin:10px;background:#fecd2f;color:#2d72fc' class="pokemon-frame">
        <h1 class="center-text">${this.name}</h1>
        <div style="width:239px;margin:auto">
          <div style="width:96px;margin:auto">
            <img src="${this.image}"/>
          </div>
        </div>
        <p style="padding:10px;" class="center-text flip-image" data-pokename="${this.name}" data-action="flip-image">flip card</p>
        </div>
      </div>
      `
  }
}
class PokemonLister{
	constructor(e){
		this.pokemons=this.parsePokemonsJSON(e),
		this.pokemonsToDisplay=[],
		this.initBindingsAndEventListiners(),
		this.render()
	}
	initBindingsAndEventListiners(){
		this.pokemonsNodeContainer=document.getElementById("pokemon-container"),
		this.searchForm=document.getElementById("pokemon-seach-input"),
		this.searchForm.addEventListener("keyup",this.findPokemons.bind(this)),this.pokemonsNodeContainer.addEventListener("click",this.flipPokemonCard.bind(this))}parsePokemonsJSON(e){return e.map(a=>new Pokemon(a))}findPokemons(){this.restoreFrontImages(),this.pokemonsToDisplay=""===this.searchForm.value?[]:this.pokemons.filter(e=>e.name.includes(this.searchForm.value)),this.render()}flipPokemonCard(){if("flip-image"===event.target.dataset.action){const e=this.pokemons.find(a=>a.name===event.target.dataset.pokename);e.image === e.frontImage ? e.image = e.backImage : e.image = e.frontImage,this.render()}}restoreFrontImages(){this.pokemons.map(e=>e.image=e.frontImage)}pokemonsHTML(){return this.pokemonsToDisplay.map(e=>e.render()).join("")}render(){this.pokemonsNodeContainer.innerHTML=`<div>${this.pokemonsHTML()}</div>`}}document.addEventListener("DOMContentLoaded",function(){new PokemonLister(POKEMONS)});
;