import { Musique } from "./musique.class.js";
function afficherPopup(message, backgroundColor, reloadAfter = false) {
  let popup = document.querySelector("#myPopup");
  popup.innerHTML = message;
  popup.style.backgroundColor = backgroundColor;
  popup.style.color = "white";
  popup.style.opacity = 1;
  popup.style.animation = "fadeinout 3s ease-in-out";

  setTimeout(() => {
    popup.style.opacity = 0;
    popup.style.animation = "";
    if (reloadAfter) {
      location.reload();
    }
  }, 3000);
}

export class MusiqueService {
  constructor() {}

  async getAll(target) {
    let url = "/musique";
    let options = {
      method: "GET",
      headers: new Headers(),
    };

    try {
      const res = await fetch(url, options);
      if (res.ok) {
        const response = await res.json();
        response.forEach((elt) => {
          console.log(response);
          let myMusique = document.createElement("tr");
          myMusique.innerHTML = `
                  <td>${elt.titre}</td>
                  <td class="text-center">
                      <a href="./pages/details.html#${elt._id}" class="text-info">
                          <i class="fas fa-info-circle"></i>
                      </a>
                  </td>
                  <td class="text-center">
                      <button class="btn btn-outline-danger">
                          <i class="fas fa-trash"></i>
                      </button>
                  </td>
              `;
          target.appendChild(myMusique);
          myMusique.querySelector("button").addEventListener("click", () => {
            this.remove(elt._id);
          });
        });
        return response;
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  }

  async get(id) {
    let url = "/musique/" + id;
    let options = {
      method: "GET",
      headers: new Headers(),
    };

    try {
      const res = await fetch(url, options);
      if (res.ok) {
        const resource = await res.json();
        return new Musique(
          resource._id,
          resource.titre,
          resource.artiste,
          resource.album,
          resource.date
        );
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  }

  async modif(musique) {
    let url = "/musique/" + musique._id;
    let options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      cache: "default",
      body: JSON.stringify(musique),
    };

    try {
      const res = await fetch(url, options);
      if (res.ok) {
        console.log("Réussi");
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  }

  async add(musique) {
    let url = "/musique";
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      cache: "default",
      body: JSON.stringify(musique),
    };

    try {
      const res = await fetch(url, options);
      if (res.ok) {
        console.log("Réussi");
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  }

  async remove(id) {
    let url = "/musique/" + id;
    let options = {
      method: "DELETE",
      headers: new Headers(),
    };

    if (confirm("Êtes-vous sûr de vouloir supprimer cette musique ?")) {
      try {
        // Récupérer les informations de la musique avant de la supprimer
        const musique = await this.get(id);

        const res = await fetch(url, options);
        if (res.ok) {
          console.log("Réussi");
          // Afficher le titre et l'artiste de la musique supprimée dans la popup
          afficherPopup(
            `La musique "${musique.titre}" de ${musique.artiste} a été supprimée avec succès.`,
            "#29C77B",
            true
          );
          // Petit bug de visuel (esthétique), le reload recharge la page après l'affichage de la popup pour voir la suppression
        }
      } catch (error) {
        console.log(`Error : ${error}`);
      }
    }
  }
}
