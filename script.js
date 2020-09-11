let filter = "alle";
let drinks;
const link = "https://spreadsheets.google.com/feeds/list/1whjsIooK9pzHtEh2XqZ1yQKY-ty7DKc0RtakobypTIQ/od6/public/values?alt=json"
document.addEventListener("DOMContentLoaded", hentData);
const popop = document.querySelector("#popop");


async function hentData() {
    const respons = await fetch(link);
    drinks = await respons.json();
    addEventListenersToButtons();
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
    document.querySelector("#dropdownknap").addEventListener("click", toggleSorterdrinks);
    visDrinks();
}

function visDrinks() {
    console.log(visDrinks);

    //Løb gennem array
    const container = document.querySelector("#container");
    const template = document.querySelector("template");
    container.innerHTML = "";
    drinks.feed.entry.forEach(drink => {

        if (filter == "alle" || filter == drink.gsx$kategori.$t) {
            const klon = template.cloneNode(true).content;
            klon.querySelector("img").src = "billeder/" + drink.gsx$billede.$t + ".png";
            klon.querySelector(".navn").textContent = drink.gsx$navn.$t;
            klon.querySelector(".kort").textContent = drink.gsx$kort.$t;
            klon.querySelector("#popKnap").addEventListener("click", () => visDetaljer(drink));
            container.appendChild(klon);
        }
    })
}

function visDetaljer(drink) {
    popop.style.display = "block";
    popop.querySelector("h2").textContent = drink.gsx$navn.$t;
    popop.querySelector("img").src = "billeder/" + drink.gsx$billede.$t + ".png";
    popop.querySelector(".ingredienser").textContent = drink.gsx$ingredienser.$t;
    popop.querySelector(".opskrift").textContent = drink.gsx$fremgangsmåde.$t;
}

document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none");

function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })

    this.classList.add("valgt");
    visDrinks();
}

function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";

    } else {
        document.querySelector("#menuknap").textContent = "x";
    }
}

function toggleSorterdrinks() {
    console.log("toggleSorterdrinks");

    document.querySelector("#sorterdrinks").classList.toggle("hidden");

    let erSkjult = document.querySelector("#sorterdrinks").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#dropdownknap").textContent = "↓ Sorter efter";
    }
}

hentData();
