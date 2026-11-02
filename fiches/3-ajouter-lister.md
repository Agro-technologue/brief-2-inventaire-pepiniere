# 3. Le menu, ajouter et lister

**Vos fichiers :** `src/registre.js`, puis `app.js` (le menu, choix 1 et 2) · **Vos tests :** `npm run test:registre` (11 tests fournis)

Une ligne de l'inventaire (un « plant » dans le code) est un objet : une espèce et son nombre de plants. L'inventaire est un tableau de ces objets :

```js
{ id: 'N09', nomCommun: 'pin', groupe: 'gymnosperme', nombrePlants: 8, dateReleve: '2026-10-24' }
```

Codez les fonctions dans l'ordre : chacune sert aux suivantes. Les tests fournis montrent ce que chacune doit renvoyer.

## Le menu (`app.js`)

`app.js` ne contient que les imports et le nom du fichier de données : écrivez tout le menu. Comportement imposé :

1. Au lancement : l'écran d'accueil, puis les données lues avec `chargerJson` et le message `10 espèce(s) chargée(s) depuis donnees/plants.json.`. Si la lecture échoue : `Impossible de lire donnees/plants.json : <message de l'erreur>. L'inventaire démarre vide.`, et le programme continue avec une liste vide.
2. Avant **chaque** choix, le menu s'affiche, puis la question `Votre choix : `. Lisez `src/saisie.js` (`ouvrirSaisie`, `demander`, `fermerSaisie`).
3. Chaque choix lance son action, puis le menu revient.
4. `0` quitte en affichant `Au revoir !` ; le programme quitte aussi si `demander` renvoie `null` (Ctrl+C).
5. Un autre choix affiche `Choix inconnu : « 9 ». Tapez un chiffre du menu.`, puis le menu revient.
6. Aucune erreur n'arrête le programme : affichez `À compléter : …` (le message de l'erreur) si elle vient d'une fonction pas encore codée (message commençant par `TODO`), sinon `Erreur inattendue : …`, puis le menu revient.

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

Pistes : quelle boucle répète des instructions tant qu'une condition est vraie ? Quelle instruction choisit entre plusieurs cas selon une valeur ? Cherchez comment attraper une erreur. Écrivez d'abord le menu avec des actions vides, puis remplissez-les une à une.

## 1. `formaterPlant(plant)`

Renvoie une ligne de texte : `'N09 | pin | gymnosperme | 8 plants | 2026-10-24'`. L'unité est toujours `plants`, quel que soit le nombre (`0 plants`, `1 plants`).

**À vous.** Piste : un gabarit de chaîne `` `${…}` ``.

## 2. `listerPlants(plants)`

Renvoie un plant par ligne (pas de retour à la ligne après le dernier), ou `'Aucun plant enregistré.'` si le tableau est vide.

**À vous.** Pistes : réutilisez `formaterPlant` ; cherchez une méthode des tableaux qui rassemble les éléments en un texte, avec un séparateur.

## 3. `trouverParId(plants, id)`

Renvoie le plant (l'objet de l'inventaire lui-même) ou `undefined`.

**À vous.** Pistes : arrêtez la recherche dès que c'est trouvé ; que renvoyer si rien ne correspond ?

## 4. `verifierPlant(saisie, plants)`

Tous les champs de la saisie sont des **textes** : `{ id: 'N11', nomCommun: 'papayer', groupe: 'angiosperme', nombrePlants: '15', dateReleve: '2026-10-27' }`. Renvoie un tableau de messages d'erreur, **un par règle non respectée** ; `[]` signifie « valide ». Ne modifie pas l'inventaire.

| Champ | Règle |
| --- | --- |
| `id` | obligatoire, et absent de l'inventaire reçu |
| `nomCommun` | obligatoire : n'importe quel texte non vide |
| `groupe` | présent dans `GROUPES` |
| `nombrePlants` | un nombre **entier** positif ou nul : `'2,5'`, `'-3'`, `'douze'` et `''` sont refusés |
| `dateReleve` | une date qui existe, au format `AAAA-MM-JJ` |

N'ajoutez aucune autre règle.

**À vous** : écrivez d'abord l'algorithme complet, sur papier. Pistes : `src/outils.js` contient deux outils ; que vaut `Number('')`, et `versNombre('')` ? `2.5` est positif : cherchez comment savoir si un nombre est entier. Cherchez une méthode des tableaux qui dit si une valeur fait partie d'une liste.

## 5. `creerPlant(saisie)`

Renvoie un **nouvel** objet, avec `nombrePlants` converti en nombre (`'1 000'` devient `1000`).

**À vous.**

## 6. `ajouterPlant(plants, saisie)`

Si la saisie est valide, ajoute le plant à la fin de l'inventaire et renvoie `[]`. Sinon, renvoie les erreurs sans rien ajouter.

**Pseudo-code de référence :**

```text
erreurs ← verifierPlant(saisie, plants)
SI erreurs n'est pas vide ALORS
  RENVOYER erreurs
FIN SI
ajouter creerPlant(saisie) à la fin de plants
RENVOYER une liste vide
```

## 7. Les choix 1 et 2 (`app.js`)

Écrivez les actions `ajouter` et `lister`. Le dialogue est **imposé** : le formateur le joue automatiquement.

```text
--- Ajouter un plant ---
Code du plant (ex. N11) : n11
Nom commun (ex. papayer) : Papayer
Groupe botanique (angiosperme ou gymnosperme) : Angiosperme
Nombre de plants (entier) : 15
Date du relevé (AAAA-MM-JJ) : 2026-10-27
Plant N11 ajouté. L'inventaire compte 11 espèce(s).
```

- Les cinq questions dans cet ordre, avec `demander` (voir `src/saisie.js`) ; la liste des groupes vient de `GROUPES`.
- Avant de vérifier : code en majuscules, nom commun et groupe en minuscules. Cherchez comment changer la casse d'un texte.
- Ajout réussi : enregistrez l'inventaire dans `donnees/plants.json` (fiche 2), puis affichez la ligne ci-dessus.
- Saisie refusée :

  ```text
  Ajout refusé :
    - Le nombre de plants doit être un nombre entier positif ou nul.
  L'inventaire compte toujours 10 espèce(s).
  ```

- Si `demander` renvoie `null` (Ctrl+C), abandonnez l'ajout.

```text
--- Inventaire (10 espèce(s)) ---
N01 | cacao | angiosperme | 30 plants | 2026-10-24
…
```

## Vérifier

- `npm run test:registre`.
- Dans le menu : ajoutez `N11` ; essayez chaque règle avec une valeur interdite et un nouveau code ; essayez une saisie avec trois erreurs. Notez les résultats dans `docs/releve-tests.md`.
