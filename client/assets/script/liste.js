import { MusiqueService } from './musique.service.js';

let tbody = document.querySelector('#listMusique');
const Musique = new MusiqueService();
Musique.getAll(tbody);
