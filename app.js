const apiUrl = "https://api.pokemontcg.io/v2/cards/"
const apiKey = ""; //API KEY EN https://pokemontcg.io/

let cardsCache = []

//Buton para mostrar pokemon random
document.getElementById("fetch-pokemon").addEventListener("click", showRandomPokemon)

async function loadPokemonData(){
    try {
        const response = await fetch(apiUrl, {
            method:"GET",
            headers:{
                'X-Api-Key':apiKey
            }
        })

        if(!response.ok){
            throw new Error ("Response not ok")
        }
        const data = await response.json()
        cardsCache = data.data
        console.log(data)
    } catch (error) {
        console.error("Error al cargar la API", error)
    }
}

function showRandomPokemon(){
    if (cardsCache.length === 0) {
        console.error("No hay datos precargados. Intente nuevamente.");
        return;
    }

    const randomCard = cardsCache[Math.floor(Math.random() * cardsCache.length)]

    const pokemonName = randomCard.name;
    const pokemonType = randomCard.types ? randomCard.types[0] : "";
    const pokemonHp = randomCard.hp || "N/A";
    const pokemonAbilityName = randomCard.abilities ? randomCard.abilities[0].name : ""; 
    const pokemonAbilityDescription = randomCard.abilities ? randomCard.abilities[0].text : "";
    const pokemonAttackName = randomCard.attacks ? randomCard.attacks[0].name : "";
    const pokemonAttackCost = randomCard.attacks ? randomCard.attacks[0].cost : "";
    const pokemonAttackDamage = randomCard.attacks ? randomCard.attacks[0].damage : "";
    const pokemonAttackDescription = randomCard.attacks ? randomCard.attacks[0].text : "";

    document.getElementById("pokemon-image").src = randomCard.images.large;
    document.getElementById("pokemon-ability-name").textContent = pokemonAbilityName;
    document.getElementById("pokemon-ability-description").textContent = pokemonAbilityDescription;
    document.getElementById("pokemon-attack-name").textContent = pokemonAttackName;
    document.getElementById("pokemon-attack-cost").textContent = pokemonAttackCost;
    document.getElementById("pokemon-attack-damage").textContent = pokemonAttackDamage;
    document.getElementById("pokemon-attack-description").textContent = pokemonAttackDescription;
    

    const pokemonTypeElement = document.getElementById("pokemon-type");
    const pokemonNameElement = document.getElementById("pokemon-name");
    const pokemonHpElement = document.getElementById("pokemon-hp");

    document.getElementById("pokemon-name").textContent = pokemonName
    document.getElementById("pokemon-hp").textContent = pokemonHp;

    //reset
    pokemonTypeElement.className = '';
    pokemonNameElement.className = '';
    pokemonHpElement.className = '';

    switch(pokemonType.toLowerCase()){
        case 'fire':
            pokemonTypeElement.classList.add('type-fire')
            pokemonNameElement.classList.add('type-fire')
            pokemonHpElement.classList.add('type-fire')

        break;
        case 'grass':
            pokemonTypeElement.classList.add('type-grass');
            pokemonNameElement.classList.add('type-grass');
            pokemonHpElement.classList.add('type-grass');
        break;
        case 'water':
            pokemonTypeElement.classList.add('type-water');
            pokemonNameElement.classList.add('type-water');
            pokemonHpElement.classList.add('type-water');
        break;

        case 'lightning':
            pokemonTypeElement.classList.add('type-electric');
            pokemonNameElement.classList.add('type-electric');
            pokemonHpElement.classList.add('type-electric');
        break;

        case 'psychic':
            pokemonTypeElement.classList.add('type-psychic');
            pokemonNameElement.classList.add('type-psychic');
            pokemonHpElement.classList.add('type-psychic');
        break;

        default:
            pokemonTypeElement.classList.add('type-default');
            pokemonNameElement.classList.add('type-default');
            pokemonHpElement.classList.add('type-default');
        break;
    }
    document.getElementById("pokemon-type").textContent = pokemonType;

}

loadPokemonData()