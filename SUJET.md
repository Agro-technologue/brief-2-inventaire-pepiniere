# Brief 2 — Inventaire de la pépinière

**Examen final de sélection · travail individuel.** Quatre jours de travail, organisés comme vous le voulez. Livraison à l'heure fixée par les coachs, à la fin du quatrième jour ; soutenance individuelle le lendemain.

## Le besoin

Le responsable d'une pépinière pédagogique a des plants de plusieurs espèces, étiquetés, mais son inventaire est dispersé. Il veut retrouver une espèce, lire son groupe botanique fourni et voir les quantités disponibles. Vous êtes assistant de pépinière et développeur Agritech junior : vous construisez cet inventaire en JavaScript, avec Node.js.

- **Besoin professionnel** : structurer un inventaire et appliquer une classification botanique simple à partir d'une fiche de référence.
- **Geste professionnel** : observer les étiquettes et les organes présentés, reproduire la classification fournie, compter les plants, saisir l'origine du relevé (étiquette, photo ou spécimen, qui a compté, quand). Les identifications incertaines sont signalées au coach.

## Ce que vous construisez

```text
==================================================
   INVENTAIRE DE LA PÉPINIÈRE
   Pépinière pédagogique
==================================================
10 espèce(s) chargée(s) depuis donnees/plants.json.

--------------------- MENU ---------------------
1. Ajouter un plant
2. Lister l'inventaire
3. Rechercher (code, nom, groupe)
4. Trier (nombre de plants)
5. Synthèse des quantités
0. Quitter
Votre choix :
```

Les plants sont lus dans `donnees/plants.json`, et chaque ajout y est enregistré.

## Le kit

| Fichier | Contenu | Votre travail |
| --- | --- | --- |
| `app.js` | Les imports et le nom du fichier de données | Écrire tout le menu : accueil, chargement, menu affiché à chaque tour, actions, sortie, erreurs |
| `src/stockage.js` | Lire et écrire le fichier JSON | À coder en premier |
| `src/registre.js` | Formater, lister, trouver, vérifier, créer, ajouter | À coder |
| `src/recherche.js` | Rechercher par nom, filtrer par groupe, trier | À coder |
| `src/synthese.js` | Total, synthèse par groupe, stocks faibles, espèce la plus abondante | À coder |
| `src/bonus.js` | Supprimer, modifier, tri décroissant, groupe le plus fourni | Bonus |
| `src/saisie.js`, `src/outils.js` | Saisie au clavier ; `versNombre`, `estDateValide` | Fournis : à utiliser, pas à modifier |
| `donnees/plants.json` | Les dix lignes d'inventaire de départ (fictives) | Modifié par votre programme |
| `test/` | Les tests fournis ; `donnees-test.json` est une copie figée des données de départ | Ne pas modifier ; vous pouvez ajouter des tests |
| `fiches/` | Le détail de chaque partie | À lire |
| `docs/`, `README.md` | Vos livrables écrits | À compléter |
| Fiche botanique | Remise par le coach agronomie : la référence pour les groupes et les organes | À citer |

## Démarrer

1. Vérifiez `node --version` (20 ou plus) et `git --version`. Configurez Git **à votre nom** :
   `git config --global user.name "Prénom NOM"` et `git config --global user.email "vous@exemple.com"`.
2. Créez sur GitHub un dépôt **vide** `brief-2-inventaire-pepiniere`. Ouvrez le dossier du kit dans VS Code, puis dans son terminal :

   ```powershell
   git init
   git add .
   git commit -m "Départ du brief 2 : kit fourni"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git
   git push -u origin main
   ```

3. `node app.js` affiche seulement « À compléter » : le menu est à écrire. `npm test` affiche **3 tests verts** (les outils fournis) et **34 rouges**.

Si PowerShell bloque `npm`, tapez `npm.cmd` à la place (`npm.cmd test`, `npm.cmd run test:registre`). Pour retrouver les données de départ : `git restore donnees/plants.json`.

## Repères

Organisez votre temps comme vous le voulez. Ordre conseillé, chaque étape s'appuyant sur la précédente :

| Étape | Fiche | Vérifier |
| --- | --- | --- |
| 1. Comprendre le besoin, observer, préparer le poste, planifier | `fiches/1-concevoir.md` | `node app.js` |
| 2. Lire et écrire le JSON | `fiches/2-donnees-json.md` | `npm run test:stockage` |
| 3. Le menu ; ajouter et lister ; choix 1 et 2 | `fiches/3-ajouter-lister.md` | `npm run test:registre` |
| 4. Rechercher et trier ; choix 3 et 4 | `fiches/4-rechercher-trier.md` | `npm run test:recherche` |
| 5. Synthèse ; choix 5 | `fiches/5-synthese.md` | `npm run test:synthese` |
| 6. Tester, documenter, livrer, préparer la soutenance | `fiches/6-finaliser.md` | `npm test` |
| Bonus | `fiches/7-bonus.md` | `npm run test:bonus` |

Repère de mi-parcours : les étapes 1 à 3 sont faites. Gardez la dernière demi-journée pour l'étape 6.

## Les règles

- **Individuel.** L'entraide est permise : expliquer, sans écrire le code de l'autre. Notez-la dans `docs/fiche-individuelle.md`.
- **Pas d'exemple de code.** Deux fonctions ont un pseudo-code de référence dans leur fiche ; pour les autres, écrivez votre algorithme sur papier avant de coder.
- **Cherchez par vous-même** : le cours, la documentation JavaScript de MDN (<https://developer.mozilla.org/fr/docs/Web/JavaScript>), la documentation de Node.js (<https://nodejs.org/api/>). Notez vos recherches dans `docs/journal-recherche.md`. Une IA ou un site peuvent vous aider à comprendre : citez-les, et sachez expliquer chaque ligne gardée.
- **Un code que vous ne savez pas expliquer n'est pas un acquis** : en soutenance, ses points peuvent ne pas être comptés.
- **Les tests fournis ne vérifient pas tout.** Le formateur a des tests cachés (autres données, cas limites) et joue des scénarios dans votre menu. Lisez chaque règle, écrivez vos propres tests, n'écrivez jamais un résultat en dur.
- Ne modifiez pas `src/saisie.js`, `src/outils.js` ni les tests fournis. Dans `app.js`, respectez les textes et les numéros imposés par les fiches.
- Un commit par étape qui marche, avec un message qui dit ce que vous avez fait.

## Les données

```js
{ id: 'N09', nomCommun: 'pin', groupe: 'gymnosperme', nombrePlants: 8, dateReleve: '2026-10-24' }
```

| Champ | Contenu |
| --- | --- |
| `id` | Code unique, par exemple `N09` |
| `nomCommun` | Nom commun de l'espèce, par exemple `pin` |
| `groupe` | `angiosperme` ou `gymnosperme`, fourni et validé par le coach |
| `nombrePlants` | Nombre de plants disponibles : un nombre **entier** positif ou nul |
| `dateReleve` | Date du comptage, au format `AAAA-MM-JJ` |

Une ligne de l'inventaire (un « plant » dans le code) est une espèce et son nombre de plants. Le brief ne donne pas de date de relevé : les dix lignes de départ portent la même date, le 24 octobre 2026. Le seuil de 10 plants est un repère pédagogique de suivi, **pas une recommandation de production**.

**Résultats de référence**, avec les données de départ :

- stock total : **240 plants** ; angiospermes : 8 espèces, 222 plants ; gymnospermes : 2 espèces, 18 plants ;
- stocks faibles (10 plants ou moins) : **N09** et **N10** ; espèce la plus abondante : **N04** (tomate, 50 plants) ;
- `N09` : pin, gymnosperme, 8 plants ; le tri croissant commence par `N09` puis `N10` ;
- une quantité décimale, négative ou non numérique est refusée ; les stocks faibles incluent la valeur exactement égale à 10.

## À rendre

À l'heure de livraison, la dernière version poussée sur GitHub est évaluée :

- le code, avec tous les tests du socle au vert (seuls ceux du bonus peuvent rester rouges) ;
- `README.md` complété ;
- dans `docs/` : dictionnaire des données, tableau des tâches, relevé des tests, journal de recherche, fiche agronomique (une page), fiche individuelle.
