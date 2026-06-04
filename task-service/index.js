const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

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

// 3.5 Route API : Afficher toutes les tâches
app.get('/api', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// 4. Route triche (pour le test) : Ajouter une tâche via le navigateur
app.get('/add', async (req, res) => {
  const newTask = new Task({ title: "Déployer MongoDB", status: "Terminé" });
  await newTask.save(); // Sauvegarde dans MongoDB
  res.send("Tâche ajoutée avec succès ! Retourne sur http://kanban.local");
});

// 5. Route API : Ajouter une tâche
app.post('/add-task', async (req, res) => {
  try {
    const { title, status } = req.body;
    const newTask = new Task({ title, status: status || 'À faire' });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la tâche' });
  }
});

app.post('/api/add-task', async (req, res) => {
  try {
    const { title, status } = req.body;
    const newTask = new Task({ title, status: status || 'À faire' });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la tâche' });
  }
});

// 6. Route API : Mettre à jour une tâche
app.put('/update-task', async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche' });
  }
});

app.put('/api/update-task', async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche' });
  }
});

// 7. Route API : Supprimer une tâche
app.delete('/delete-task/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la tâche' });
  }
});

app.delete('/api/delete-task/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la tâche' });
  }
});

app.listen(port, () => {
  console.log(`Task Service démarré sur le port ${port}`);
});