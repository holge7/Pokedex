import { Pokedex } from "./clases/pokedex.js";
window.onload = function () {

    let pokedex = new Pokedex();

    //Escribe las letras de la parte derecha
    let escribir = async () => {
        let caja = document.getElementById("right__texto");
        caja.textContent = '';
        let texto = pokedex.escribir();
        for (let i = 0; i < texto.length - 1; i++) {
            //Le pongo esto para que las letras no se escribieran a la misma
            //vez y quedara un poco más natural
            await wait(Math.floor(Math.random(70 - 40) + 40));
            caja.textContent += texto[i];
        }
    }

    //Funcion que retorna una promesa de X ms
    function wait(ms) {
        return new Promise((res) => {
            setTimeout(res, ms);
        });
    }

    //Funcion para ver que se ha pasado por GET
    let sacarId = () =>{
        let id=window.location.search.substring(1);
        return id.split("=")[1];
    }

    //Al verPokemon ser un metodo asincrono, hay que esperar a que se realize
    //para poder hacer un dibujarPokemon
    const imprimirPokemon = async () => {
        try {
            await pokedex.verPokemonId(sacarId());
            //Ponemos los datos de img, nombre, id, tipo, altura, peso
            document.getElementById("pokedex__pantalla-pokemon").src = pokedex.getImg();
            document.getElementById("decorado2-nombre").innerHTML = pokedex.getNombre();
            document.getElementById("pokedex__pantalla-id").innerHTML = pokedex.getId();
            document.getElementById("medidas__alto").innerHTML = pokedex.getAltura();
            document.getElementById("medidas__peso").innerHTML = pokedex.getPeso();
            document.getElementById("tipo1").innerHTML = pokedex.getTipo()[0].type.name;
            if (pokedex.getTipo().length > 1) {
                document.getElementById("tipo2").innerHTML = pokedex.getTipo()[1].type.name;
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
    
    escribir();
    imprimirPokemon();

    //Añadimos al boton de ir atras su funcionalidad
    document.getElementById("atras").addEventListener("click", ()=>{
        window.location.href="index.html";
    })

}