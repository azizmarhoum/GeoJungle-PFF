# 🌍 GeoJungle – Projet de synthèse

**GeoJungle** est une plateforme web interactive et communautaire qui permet d’apprendre la géographie et les cultures du monde à travers des quiz, des jeux, des faits, des publications d’utilisateurs et des assistants IA. Ce dépôt contient **à la fois la plateforme utilisateur et le tableau de bord d’administration**, organisés en **microservices séparés** pour une meilleure scalabilité et structure.

---

## 📁 Structure du projet

Le dépôt est divisé en quatre dossiers principaux :

- **frontend/** – Interface utilisateur développée avec React
- **backend/** – Backend de la plateforme utilisateur (Express + MongoDB)
- **admin/** – Interface d’administration (React)
- **admin-backend/** – Backend du tableau de bord admin (Express + MongoDB)

---

## ⚙️ Prérequis

- Node.js et npm installés
- MongoDB installé localement
- Une base de données MongoDB locale nommée **GeoJungles**
- Assurez-vous que les ports **5173** et **5174** sont libres

---

## 🚀 Lancer le projet

> ⚠️ Il est important de **lancer le frontend utilisateur avant le frontend admin**, afin que l’interface admin fonctionne correctement sur un port différent.

### 1. Cloner le dépôt

```bash
git clone https://github.com/azizmarhoum/GeoJungle-PFF.git
cd GeoJungle
```

### 2. Démarrer la plateforme utilisateur

#### ➤ Backend (utilisateur)

```bash
cd backend
npm install
npm start
```


#### ➤ Frontend (utilisateur)

```bash
cd frontend
npm install
npm run dev
```

Accessible via : `http://localhost:5173`

---

### 3. Démarrer le tableau de bord Admin

#### ➤ Backend (admin)

```bash
cd admin-backend
npm install
npm run dev
```


#### ➤ Frontend (admin)

```bash
cd admin
npm install
npm run dev
```

Accessible via : `http://localhost:5174`

> ⚠️ L’interface admin suppose que la plateforme principale fonctionne déjà sur le port 5173.

---

## 🧠 Technologies utilisées

* **Frontend** : React, Vite
* **Backend** : Node.js, Express
* **Base de données** : MongoDB (locale, nommée `GeoJungles`)
* **Architecture** : Microservices

---

## 👥 À propos du projet

Ce projet a été réalisé dans le cadre du projet de fin de formation. **GeoJungle** a été conçu pour rendre l’apprentissage de la géographie ludique, interactif et enrichi par la communauté. Il intègre :

* Du contenu éducatif (faits, quiz, posts culturels)
* Des jeux et défis amusants
* Des assistants IA pour les recommandations, les faits, la culture
* Un tableau de bord d’administration pour gérer les contenus, utilisateurs, et "mini-admins"

---

## 📌 Remarques

* Tous les modules nécessitent MongoDB en local, avec une base nommée `GeoJungles`
* Les ports doivent être disponibles et ne pas entrer en conflit
* Contributions bienvenues via fork et pull request !
