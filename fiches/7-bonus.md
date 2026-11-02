# 7. Bonus — pour aller plus loin

**Vos fichiers :** `src/bonus.js`, puis `app.js` · **Vos tests :** `npm run test:bonus` (9 tests)

Seulement quand le socle est complet. Pas de pseudo-code de référence ni de piste détaillée : combinez ce que vous avez appris, cherchez ce qui manque, et sachez expliquer ce code en soutenance.

## Les fonctions (`src/bonus.js`, +1)

- **`supprimerPlant(plants, id)`** : retire le plant de l'inventaire et le renvoie ; `undefined` s'il n'existe pas (l'inventaire ne change pas). Piste : il faut sa position dans le tableau, puis le retirer à cette position ; cherchez une méthode des tableaux pour chaque étape.
- **`modifierPlant(plants, id, champ, valeur)`** : modifie un champ ; la valeur arrive en texte et suit les règles de l'ajout (`nombrePlants` est enregistré comme un nombre). Renvoie les erreurs (`[]` si c'est fait). Erreur si le code est introuvable, si `champ` vaut `'id'`, si `champ` n'est pas dans `CHAMPS_MODIFIABLES`, ou si la valeur est refusée ; dans ce cas, rien ne change. Pistes : les règles existent déjà dans `verifierPlant` ; attention, le plant ne doit pas être vu comme un doublon de lui-même.
- **`trierParNombrePlantsDecroissant(plants)`** : une copie, l'espèce qui a le plus de plants d'abord.
- **`groupeLePlusFourni(plants)`** : `{ groupe: 'angiosperme', plants: 222 }` avec les données de départ ; `null` si l'inventaire est vide ; en cas d'égalité, le premier groupe rencontré.

## Le menu (`app.js`, +1)

Ajoutez au menu `6. Supprimer un plant` et `7. Modifier un plant`, et importez vos fonctions de `src/bonus.js`. Dialogue **imposé** :

| Choix | Questions, dans l'ordre | Affichage |
| --- | --- | --- |
| `6` | `Identifiant : ` (en majuscules) | `Plant N03 supprimé. L'inventaire compte 9 espèce(s).` ou `Plant N99 introuvable.` |
| `7` | `Identifiant : ` (en majuscules), `Champ à modifier (nomCommun, groupe, nombrePlants, dateReleve) : `, `Nouvelle valeur : ` | `Plant N03 modifié.` ou `Modification refusée :` puis une erreur par ligne (`  - …`) |

Après une suppression ou une modification réussie, enregistrez l'inventaire dans `donnees/plants.json`.

Deux ajouts d'affichage, comptés dans ce point :

- sous-menu **Trier** : `2. Par nombre de plants décroissant`, la liste s'affichant juste après le choix ;
- **synthèse**, juste après les lignes des groupes : `Groupe le plus fourni : angiosperme (222 plants)` (`Groupe le plus fourni : aucune donnée` si l'inventaire est vide).

Le formateur joue ces scénarios dans votre `app.js` : relancez `node app.js` après chaque modification.
