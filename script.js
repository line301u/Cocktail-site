let filter = "alle";
let drinks;
const link = "https://spreadsheets.google.com/feeds/list/1whjsIooK9pzHtEh2XqZ1yQKY-ty7DKc0RtakobypTIQ/od6/public/values?alt=json"
document.addEventListener("DOMContentLoaded", hentData);
const popop = document.querySelector("#popop");


// Data hentes ind fra googlesheet og sendes videre til funktionen visDrinks
async function hentData() {
    const respons = await fetch(link);
    drinks = await respons.json();
    addEventListenersToButtons();
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
    document.querySelector("#dropdownknap").addEventListener("click", toggleSorterdrinks);
    visDrinks();
}


// Funktionen visDrinks sætter hver enkelt drink i HTML
function visDrinks() {
    console.log(visDrinks);
    //Løb gennem array
    const container = document.querySelector("#container");
    const template = document.querySelector("template");
    container.innerHTML = "";
    drinks.feed.entry.forEach(drink => {


        // if = hvis filter er på alle vises alle drinks ellers hvis filter er en valgt drink ændres indholdet til den valgte
        if (filter == "alle" || filter == drink.gsx$kategori.$t) {
            const klon = template.cloneNode(true).content;
            klon.querySelector("img").src = "billeder/" + drink.gsx$billede.$t + ".svg";
            klon.querySelector(".navn").textContent = drink.gsx$navn.$t;
            klon.querySelector(".kort").textContent = drink.gsx$kort.$t;
            klon.querySelector("#popKnap").addEventListener("click", () => visDetaljer(drink));
            container.appendChild(klon);
        }
    })
}


// Funktionen viser den enkelte drink seperat når der klikkes på den
function visDetaljer(drink) {
    popop.style.display = "block";
    popop.style.overflow = "auto";
    popop.querySelector("h2").textContent = drink.gsx$navn.$t;
    popop.querySelector("img").src = "billeder_pop/" + drink.gsx$billede.$t + ".pop.svg";
    popop.querySelector(".ingredienser").innerHTML = drink.gsx$ingredienser.$t.split(",").join("<br>");
    popop.querySelector(".opskrift").textContent = drink.gsx$fremgangsmåde.$t;
    document.querySelector("body").style.overflow = "hidden";
}

// Knap som lukker popopvinduet - Det vises ikke længere
document.querySelector("#luk").addEventListener("click", () => {
    popop.style.display = "none";
    document.querySelector("body").style.overflow = "auto";
})


// Funktion der sætter eventListeners på filtreringsknapperne
function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}

//Funktion der filtrere indholdet på siden alt efter hvilken knap der trykkes på
function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })

    this.classList.add("valgt");
    visDrinks();
}

//Funktion til burgermenuen i headeren
function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "Menu ☰";

    } else {
        document.querySelector("#menuknap").textContent = "x";
    }
}


//Funktion der gør filtreringsknapperne til dropdownmenu på mobil
function toggleSorterdrinks() {
    console.log("toggleSorterdrinks");

    document.querySelector("#sorterdrinks").classList.toggle("hidden");

    let erSkjult = document.querySelector("#sorterdrinks").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#dropdownknap").textContent = "↓ Sorter efter";
    }
}

hentData();
