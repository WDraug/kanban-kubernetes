const express = require('express');
const path = require('path');
const app = express();
const port = 80;

// Servir le fichier HTML statique
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir les fichiers statiques
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Web Service démarré sur le port ${port}`);
});
