import { MusiqueService } from "./musique.service.js";
import { Musique } from "./musique.class.js";

let btnNew = document.querySelector('#newmusique');
let M = new MusiqueService();
let popup = document.querySelector("#myPopup");

btnNew.addEventListener('click', () => {
  let titre = document.querySelector('#titre');
  let artiste = document.querySelector('#artiste');
  let album = document.querySelector('#album');
  let date = document.querySelector('#date');

  // Validation
  if (!titre.value || !artiste.value || !album.value || !date.value) {
    afficherPopup("Veuillez remplir tous les champs", "#FF3B30");
    return;
  }

  let newMusique = new Musique('', titre.value, artiste.value, album.value, date.value);

  let promise = M.add(newMusique);
  promise.then(() => {
    // message de Feedback 
    afficherPopup(`${newMusique.titre} de ${newMusique.artiste} a été ajouté avec succès`, "#29C77B");

    titre.value = '';
    artiste.value = '';
    album.value = '';
    date.value = '';
  }).catch(() => {
    // Erreur
    afficherPopup("Erreur lors de l'ajout de la musique", "#FF3B30");
  });
});


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
