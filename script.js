const POKE_API = "https://pokeapi.co/api/v2/pokemon/";
let container = document.querySelector(".container");
let filterBtn = document.getElementById("filter")
let resetBtn = document.getElementById("reset")

let search = document.getElementById("searchPoki")
let errorMsg = document.querySelector(".error-msg")


// ek ek pokemon card ka function
function pokeCard(data) {
  let itemCard = document.createElement("div");
  itemCard.classList.add("card");
  itemCard.classList.add(`${data.types[0].type.name}`);
  itemCard.innerHTML = `
        <div class="card-inner ">
            <div class="card-front">
                <div class="id">${data.id}</div>
                <div class="image">
                    <img src=${data.sprites.front_default} alt="img">
                </div>
                <h2 class="name">${data.name}</h2>
                <h4> -special moves-</h4>
                <h5 class="move">${data?.moves[1]?.move?.name}, ${data?.moves[0]?.move?.name}</h5>
                <h4 class="abilities">${data.abilities[0]?.ability?.name}</h4>
            </div>

            <div class="card-back">
                <div class="id">${data.id}</div>
                <div class="image">
                    <img src=${data.sprites.back_default} alt="img">
                </div>
                <h2 class="name">${data.name}</h2>
                <h3 class="height">Height: ${data.height} cm</h3>
                <h4 class="weight">Weight: ${data.weight} gms</h4>
                <h5 class="exp">Base Exp: ${data.base_experience} XP</h5>
            </div>
        </div>
    `;

  return itemCard;
}

// data api se fetch krne ke liye async function
async function fetchPokeData() {
  for (let i = 1; i < 151; i++) {
    const response = await fetch(`${POKE_API}${i}`);
    const data = await response.json();
    console.log(data);
    // console.log(data.abilities[0].ability.name);
    console.log(data.name);
    let pokemonCard = pokeCard(data);
    container.appendChild(pokemonCard);
  }
}

// filter krne ka function
function filterCards(){
    let allCards = document.querySelectorAll(".card");
    let filterValue = document.getElementById("poke-types").value
    allCards.forEach(card => {
        if(card.classList.contains(filterValue)){
            card.style.display = "block"
            
        }else{
            card.style.display = "none"
        }
    });

}

//reset krne ka function
function resetAll() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        card.style.display = "block"
    })
    search.value = ""
}

function searchFilter(){
    let searchValue = search.value.toLowerCase();
    let allCards = document.querySelectorAll(".card");

    allCards.forEach((card) => {
        let naam = card.querySelector(".name").textContent;
        if(naam.startsWith(searchValue)){
            card.style.display = "block"
        }else{
            card.style.display = "none"

        }
    })
}

fetchPokeData();

filterBtn.addEventListener("click", filterCards)
resetBtn.addEventListener("click",resetAll)
search.addEventListener("keyup", searchFilter)
