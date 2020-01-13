# Mini projet Restaurants, par ARNAUD Julian et MONTORSI Benoît

## Setup: les données
Pour avoir la base avec les restaurants, télécharger ce fichier: https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json <br>
Puis, après avoir MongoDB d'installé, effectuer cette commande pour insérer les données dans une collection "restaurants" d'une base "test" (par exemple)
```
mongoimport --db test --collection restaurants --drop --file primer-dataset.json
```

## Setup: les serveurs
D'un terminal:
```
cd serveur
```
```
node serverCrudWithMongo.js
```

D'un autre terminal:
```
npm install
```
```
npm run serve
```

## Accès à l'interface
Dans un navigateur:
```
localhost:n
```
avec n étant le port indiqué par le terminal ayant effectué npm run serve
