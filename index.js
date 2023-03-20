const express = require('express');
const app = express();
let port = 3000;
const Musiques = require('./data/musiques');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

app.use('/assets', express.static('./client/assets'));
app.use('/pages', express.static('./client/pages'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/musique', (req, res) => {
  res.send(Musiques);
});

app.get('/musique/:id', (req, res) => {
  let id = req.params.id;
  let musique = _.find(Musiques, (o) => {
    return o._id == id;
  });
  res.send(musique);
});

app.put('/musique/:id', (req, res) => {
  let id = req.params.id;
  let index = _.findIndex(Musiques, (o) => {
    return o._id == id;
  });
  Musiques[index] = req.body;
  res.sendStatus(200);
});

app.post('/musique', (req, res) => {
  let newMusique = req.body;
  newMusique._id = uuidv4();
  Musiques.push(newMusique);
  res.sendStatus(200);
});

app.delete('/musique/:id', (req, res) => {
  let id = req.params.id;
  let index = _.findIndex(Musiques, (o) => {
    return o._id == id;
  });
  Musiques.splice(index, 1);
  res.sendStatus(200);
});
