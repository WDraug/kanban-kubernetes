# Kanban Board - Kubernetes Microservices

Une application Kanban simple et épurée déployée sur Kubernetes avec une architecture microservices.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Kubernetes](https://img.shields.io/badge/kubernetes-1.20+-blue)
![Node](https://img.shields.io/badge/node-18%2B-green)

## 🎯 Fonctionnalités

- **Interface Kanban moderne** : Design épuré avec dégradé violet/bleu
- **3 colonnes** : À Faire, En Cours, Terminé
- **Gestion des tâches** :
  - Ajouter des tâches
  - Changer le statut d'une tâche (cliquer pour faire avancer)
  - Supprimer des tâches
  - Compteur de tâches par colonne
- **Design responsive** : Fonctionne sur mobile et desktop
- **Temps réel** : Mise à jour instantanée des tâches

## 🏗️ Architecture Microservices

L'application est composée de 4 services :

### 1. **web-service** (Frontend)
- Technologie : HTML/CSS/JavaScript + Express.js
- Port : 80
- Rôle : Sert l'interface utilisateur statique
- Image : `antoninraskopf/web-service:v1`

### 2. **task-service** (API Backend)
- Technologie : Node.js + Express + Mongoose
- Port : 3000 (interne), 80 (service)
- Base de données : MongoDB
- Rôle : Gestion CRUD des tâches
- Image : `antoninraskopf/task-service:v5`

**Endpoints API :**
- `GET /` - Récupérer toutes les tâches
- `GET /api` - Récupérer toutes les tâches (via Ingress)
- `POST /add-task` - Ajouter une tâche
- `PUT /update-task` - Mettre à jour une tâche
- `DELETE /delete-task/:id` - Supprimer une tâche

### 3. **user-service** (Utilisateurs)
- Technologie : Node.js + Express
- Port : 80
- Rôle : Gestion des utilisateurs
- Image : `antoninraskopf/user-service:v1`

### 4. **mongo-service** (Base de données)
- Technologie : MongoDB
- Port : 27017
- Rôle : Persistance des données

## 🚀 Déploiement

### Prérequis

- Kubernetes (Minikube, Kind, ou cluster)
- kubectl configuré
- Docker installé
- Ingress Controller (nginx) installé

### Installation

```bash
# 1. Cloner le projet
git clone <url-du-projet>
cd kanban-kubernetes-main

# 2. Déployer MongoDB
kubectl apply -f mongo-deployment.yaml

# 3. Déployer les services
kubectl apply -f task-service/task-deployment.yaml
kubectl apply -f user-service/user-deployment.yaml
kubectl apply -f web-service/web-deployment.yaml

# 4. Déployer l'Ingress
kubectl apply -f kanban-ingress.yaml

# 5. Vérifier que tous les pods sont Running
kubectl get pods
```

### Configuration Hosts

Ajoutez cette ligne à votre fichier `/etc/hosts` (Linux/Mac) ou `C:\Windows\System32\drivers\etc\hosts` (Windows) :

```
<IP-ingress> kanban.local
```

Pour trouver l'IP de l'Ingress :
```bash
kubectl get ingress kanban-gateway
```

### Accès

Ouvrez votre navigateur sur : **http://kanban.local**

## 🔧 Développement Local

### Lancer les services localement

```bash
# Terminal 1 - MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Terminal 2 - Task Service
cd task-service
npm install
node index.js  # Écoute sur http://localhost:3000

# Terminal 3 - Web Service
cd web-service
npm install
node index.js  # Écoute sur http://localhost:80
```

Puis ouvrez http://localhost:80 dans votre navigateur.

### Construire les images Docker

```bash
# Pour Minikube
minikube docker-env --shell powershell | Invoke-Expression  # Windows PowerShell
eval $(minikube docker-env)  # Linux/Mac

# Task Service
cd task-service
docker build -t antoninraskopf/task-service:v5 .

# Web Service
cd web-service
docker build -t antoninraskopf/web-service:v1 .
```

## 📁 Structure du Projet

```
kanban-kubernetes-main/
├── README.md
├── kanban-ingress.yaml          # Configuration Ingress
├── mongo-deployment.yaml        # MongoDB deployment
├── index.html                   # Frontend (copie dans web-service)
├── task-service/
│   ├── index.js                 # API Node.js
│   ├── Dockerfile
│   ├── package.json
│   └── task-deployment.yaml
├── user-service/
│   ├── index.js                 # Service utilisateurs
│   ├── Dockerfile
│   ├── package.json
│   └── user-deployment.yaml
└── web-service/
    ├── index.js                 # Serveur frontend
    ├── index.html               # Interface Kanban
    ├── Dockerfile
    ├── package.json
    └── web-deployment.yaml
```

## 🎨 Technologies Utilisées

- **Frontend** : HTML5, CSS3, JavaScript (vanilla)
- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB avec Mongoose
- **Conteneurisation** : Docker
- **Orchestration** : Kubernetes
- **Ingress** : nginx ingress controller

## ✨ Auteurs

**Projet réalisé par Antonin Raskopf & Louis Masson**

Application Kanban avec architecture microservices déployée sur Kubernetes.

## 📝 Licence

ISC

---

**Enjoy your Kanban Board! 🎉**
