let input = document.querySelector(".input");
let ajout = document.querySelector(".ajout");
let tachesDiv = document.querySelector(".taches");

//Je stocke les taches dans ce tableau
let tableauDeTaches = [];

// Je vérifie s'il y a des taches dans le LocalStorage et si il y en a, je les récupère
if (localStorage.getItem("taches")) {
  tableauDeTaches = JSON.parse(localStorage.getItem("taches"));
}

// J'appelle la fonction d'obtention de données du stockage local
getLocalStorageData();

// Ici, j'ajoute une nouvelle tache quand le bouton d'ajout est actionné et que l'input n'est pas vide
ajout.onclick = function () {
  if (input.value !== "") {
    ajoutTacheTableau(input.value); // J'ajoute la tâche au tableau des tâches
    input.value = ""; // Je vide l'input
  }
};

// Evénements sur une tâche
tachesDiv.addEventListener("click", (e) => {
  // suppression de la tache en question
  if (e.target.classList.contains("suPp")) {
    // J'enlève la tache du Local Storage
    suppTache(e.target.parentElement.getAttribute("data-id"));
    // Je retire la tache de la page
    e.target.parentElement.remove();
  }
  // L'état de la tache: "faite" ou "pas faite"
  if (e.target.classList.contains("tache")) {
    // Toggle "Fait" pour le tache
    toggleEtatTache(e.target.getAttribute("data-id"));
    // Toggle la classe "Fait" 
    e.target.classList.toggle("fait");
  }
});

function ajoutTacheTableau(tacheText) {
  // Data de la tache
  const tache = {
    id: Date.now(),
    title: tacheText,
    completed: false,
  };
  // J'insère la tache à 'intérieur du tableau de tâches
  tableauDeTaches.push(tache);
  // J'ajoute toutes les tâches du tableau sur la page
  ajouterTachesDuTableau(tableauDeTaches);
  // J'ajoute les tâches au LocalStorage
  ajouterTachesAuLocalStorage(tableauDeTaches);
}

function ajouterTachesDuTableau(tableauDeTaches) {
  // Div tache vide
  tachesDiv.innerHTML = "";
  // Je passe une boucle sur le tableau de tâches
  tableauDeTaches.forEach((tache) => {
    // Je crée une div et lui ajoute la classe "tache"
    let div = document.createElement("div");
    div.className = "tache";
    // Je check si la tache est "faite" et si oui, je lui ajoute la class "fait"
    if (tache.completed) {
      div.className = "tache fait";
    }
    div.setAttribute("data-id", tache.id);
    div.appendChild(document.createTextNode(tache.title));
    // Je crée le bouton de suppression
    let span = document.createElement("span");
    span.className = "suPp";
    span.appendChild(document.createTextNode("x"));
    // J'ajoute le bouton dans la div
    div.appendChild(span);
    // Enfin, j'ajoute la div tache à la div contenair de l'ensemble des taches
    tachesDiv.appendChild(div);
  });
}

function ajouterTachesAuLocalStorage(tableauDeTaches) {
  window.localStorage.setItem("taches", JSON.stringify(tableauDeTaches));
}

function getLocalStorageData() {
  let data = window.localStorage.getItem("taches");
  if (data) {
    let taches = JSON.parse(data);
    ajouterTachesDuTableau(taches);
  }
}

function suppTache(tacheId) {
  tableauDeTaches = tableauDeTaches.filter((tache) => tache.id != tacheId);
  ajouterTachesAuLocalStorage(tableauDeTaches);
}

function toggleEtatTache(tacheId) {
  for (let i = 0; i < tableauDeTaches.length; i++) {
    if (tableauDeTaches[i].id == tacheId) {
      tableauDeTaches[i].completed == false ? (tableauDeTaches[i].completed = true) : (tableauDeTaches[i].completed = false);
    }
  }
  ajouterTachesAuLocalStorage(tableauDeTaches);
}