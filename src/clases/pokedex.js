import { Pokemon } from "./pokemon.js";
export class Pokedex {
    constructor() {
        this.url = "https://pokeapi.co/api/v2/pokemon/";
        this.pokemonMin = 1;
        this.pokemonMax = 151;
        this.pokemon = null;
    }

    //Metodo que añade a la url un numero aleatorio entre los valores de las propiedades pokemonMin y Max
    generarUrl() {
        return this.url + (Math.floor(Math.random() * (this.pokemonMax - this.pokemonMin)) + this.pokemonMin);
    }

    //Metodo asincrono (porque tenemos que esperar a que la peticion de la url se efectue)
    //con el que vamos a sacar el pokemon dependiendo de la url
    async verPokemonAleatorio() {
        try {
            //gestionamos con await la promesa retornada por fetch
            let data = await fetch(this.generarUrl());
            //transformamos el dato en bruto obtenido a json
            let pokemon = await data.json();
            this.pokemon = Pokemon.getPokemon(pokemon);
            return true;
        } catch (e) {
            console.log(`Error: ${e}`)
        }
    }

    //Metodo que busca un pokemon por su id
    async verPokemonId(id) {
        try {
            //gestionamos con await la promesa retornada por fetch
            let data = await fetch(this.url+id);
            //transformamos el dato en bruto obtenido a json
            let pokemon = await data.json();
            this.pokemon = Pokemon.getPokemon(pokemon);
            return true;
        } catch (e) {
            console.log(`Error: ${e}`);
            return false;
        }
    }

    //Metodo que trae X pokemons
    async verPokemons(num, numFin){
        try {
            let res=[];
            for (let i = num; i < numFin; i++) {
                let data = await fetch(this.url+i);
                let pokemon = await data.json();
                res.push(Pokemon.getPokemon(pokemon));
            }
            return res;
        } catch (e) {
            console.log("Error: "+e);
        }
    }

    getImg() {
        return this.pokemon.img[1];
    }

    getNombre() {
        return this.pokemon.nombre.toUpperCase();
    }

    getId() {
        let id = this.pokemon.id.toString();
        id = id.padStart(3, "0");
        return id;
    }

    getTipo() {
        return this.pokemon.tipo;
    }

    getAltura() {
        let altura = this.pokemon.altura.toString();
        altura = altura.padStart(2, "0");
        altura = altura.substring(0, altura.length - 1) + "," + altura.substring(altura.length - 1, altura.length) + " m";
        return altura;
    }

    getPeso() {
        let peso = this.pokemon.peso.toString();
        peso = peso.padStart(2, "0");
        peso = peso.substring(0, peso.length - 1) + "," + peso.substring(peso.length - 1, peso.length) + " kg";
        return peso;
    }

    escribir(){
        return "Pokem ipsum dolor sit amet Exeggutor Doduo Red Unown. Sunt in culpa Drilbur Charizard.";
    }

}