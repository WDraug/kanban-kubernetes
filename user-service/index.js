const express = require('express');
const app = express();
const port = 3000;

app.get('/users', (req, res) => {
  res.json([
    { id: 101, name: "Antonin Raskopf", role: "Admin" },
    { id: 102, name: "Benoît Charroux", role: "Professeur" }
  ]);
});

app.listen(port, () => {
  console.log(`User Service démarré sur le port ${port}`);
});