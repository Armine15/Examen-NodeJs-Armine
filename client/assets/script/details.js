import { MusiqueService } from "./musique.service.js";
import { Musique } from "./musique.class.js";

// Sélection des éléments HTML
const titre = document.querySelector("#titre");
const artiste = document.querySelector("#artiste");
const album = document.querySelector("#album");
const date = document.querySelector("#date");
const title = document.querySelector("#title");
const modifBtn = document.querySelector("#modif");
const popup = document.querySelector("#myPopup");

// Récupération de l'identifiant de la musique à modifier dans l'URL
const myId = window.location.hash.substring(1);

// Instance de la classe MusiqueService pour gérer les requêtes
const musiqueService = new MusiqueService();

// Récupération de la musique à modifier
musiqueService
  .get(myId)
  .then((musique) => {
    // Affichage des informations de la musique dans les champs HTML correspondants
    title.innerText = musique.titre;
    titre.value = musique.titre;
    artiste.value = musique.artiste;
    album.value = musique.album;
    date.value = musique.date;

    // Ecouteur d'événement pour la modification de la musique
    modifBtn.addEventListener("click", () => {
      // Création d'un nouvel objet Musique avec les données modifiées
      const updatedMusique = new Musique(
        myId,
        titre.value,
        artiste.value,
        album.value,
        date.value
      );

      // Appel à la méthode de modification de la musique du service MusiqueService
      musiqueService
        .modif(updatedMusique)
        .then(() => {
          // Affichage d'un message de confirmation avec la fonction afficherPopup
          afficherPopup("Musique modifiée !", "#29C77B");
        })
        .catch((error) => {
          // Affichage d'un message d'erreur avec la fonction afficherPopup en cas de problème de modification
          afficherPopup(
            "Erreur lors de la modification de la musique : " + error.message,
            "#FF3B30"
          );
        });
    });
  })
  .catch((error) => {
    // Affichage d'un message d'erreur avec la fonction afficherPopup en cas de problème de récupération de la musique
    afficherPopup(
      "Erreur lors de la récupération de la musique : " + error.message,
      "#FF3B30"
    );
  });

// Fonction pour afficher un message de confirmation ou d'erreur
function afficherPopup(message, backgroundColor) {
  popup.innerHTML = message;
  popup.style.backgroundColor = backgroundColor;
  popup.style.color = "white";
  popup.style.opacity = 1;
  popup.style.animation = "fadeinout 3s ease-in-out";

  setTimeout(() => {
    popup.style.opacity = 0;
    popup.style.animation = "";
  }, 3000);
}
