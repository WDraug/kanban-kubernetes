const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// 1. Connexion à la base de données (utilise le nom du Service K8s !)
mongoose.connect('mongodb://mongo-service:27017/kanban')
  .then(() => console.log('✅ Connecté à MongoDB !'))
  .catch(err => console.error('❌ Erreur de connexion:', err));

// 2. Création du modèle de Tâche
const Task = mongoose.model('Task', {
  title: String,
  status: String
});

// 3. Route principale : Afficher toutes les tâches de la base
app.get('/', async (req, res) => {
  const tasks = await Task.find(); // Va chercher dans MongoDB
  res.json(tasks);
});

// 4. Route triche (pour le test) : Ajouter une tâche via le navigateur
app.get('/add', async (req, res) => {
  const newTask = new Task({ title: "Déployer MongoDB", status: "Terminé" });
  await newTask.save(); // Sauvegarde dans MongoDB
  res.send("Tâche ajoutée avec succès ! Retourne sur http://kanban.local");
});

app.listen(port, () => {
  console.log(`Task Service démarré sur le port ${port}`);
});