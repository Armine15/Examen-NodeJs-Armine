export class Musique {
  _id;
  titre;
  artiste;
  album;
  date;

  constructor(id, titre, artiste, album, date) {
    this._id = id;
    this.titre = titre;
    this.artiste = artiste;
    this.album = album;
    this.date = date;
  }

  get _id() {
    return this.__id;
  }

  set _id(tmp) {
    this.__id = tmp;
  }
  
  get titre() {
    return this._titre;
  }

  set titre(tmp) {
    this._titre = tmp;
  }

  get artiste() {
    return this._artiste;
  }

  set artiste(tmp) {
    this._artiste = tmp;
  }

  get album() {
    return this._album;
  }

  set album(tmp) {
    this._album = tmp;
  }

  get date() {
    return this._date;
  }

  set date(tmp) {
    this._date = tmp;
  }

}
