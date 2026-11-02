# 4. Rechercher et trier

**Vos fichiers :** `src/recherche.js`, puis `app.js` (choix 3 et 4) · **Vos tests :** `npm run test:recherche` (5 tests fournis)

## 1. `rechercherParNom(plants, texte)`

Renvoie un **nouveau** tableau des plants dont le nom commun **contient** le texte, sans tenir compte des majuscules, dans l'ordre de l'inventaire. `'palmier'` et `'PALM'` trouvent N07 ; `'baobab'` donne `[]` ; un texte vide trouve toutes les espèces.

**À vous.** Pistes : cherchez une méthode des chaînes qui dit si un texte en contient un autre ; mettez les **deux** textes dans la même casse avant de comparer.

## 2. `filtrerParGroupe(plants, groupe)`

Renvoie un **nouveau** tableau, dans l'ordre de l'inventaire, éventuellement vide. `filtrerParGroupe(donnees, 'gymnosperme')` donne N09 et N10.

**À vous.** Pistes : partez d'un tableau vide ; comment ajoute-t-on un élément à la fin d'un tableau ?

## 3. `trierParNombrePlants(plants)`

Renvoie une **copie** triée par nombre de plants croissant ; deux nombres égaux gardent leur ordre ; l'inventaire reçu ne change pas. Le tri commence par N09 (8) puis N10 (10).

**À vous.** Le brief impose un **comparateur numérique** : cherchez dans la documentation de `sort` ce qu'est une fonction de comparaison. Essayez dans un terminal `node` : `[9, 100, 35].sort()`.

## 4. Le menu : choix 3 et 4 (`app.js`)

Dialogue **imposé** :

```text
--- Rechercher ---
1. Par code
2. Par nom commun
3. Les espèces d'un groupe botanique
Votre choix : 1
Code : n09
N09 | pin | gymnosperme | 8 plants | 2026-10-24
```

| Sous-choix | Question | Affichage |
| --- | --- | --- |
| `1` | `Code : ` (en majuscules) | la ligne, ou `Plant N99 introuvable.` |
| `2` | `Nom ou partie du nom : ` (en minuscules) | `1 espèce(s) dont le nom contient « palmier » :` puis la liste |
| `3` | `Groupe (angiosperme ou gymnosperme) : ` (en minuscules) | `2 espèce(s) du groupe gymnosperme :` puis la liste |
| autre | — | `Choix inconnu : retour au menu.` |

```text
--- Trier ---
1. Par nombre de plants croissant
Votre choix : 1
N09 | pin | gymnosperme | 8 plants | 2026-10-24
N10 | cycas | gymnosperme | 10 plants | 2026-10-24
…
```

La liste triée s'affiche juste après le choix, sans titre ; autre sous-choix : `Choix inconnu : retour au menu.` Les listes sont le texte de `listerPlants`. Si `demander` renvoie `null` (Ctrl+C), revenez au menu.

## Vérifier

`npm run test:recherche`, puis dans le menu : `N09`, `N99`, `palmier`, `gymnosperme`, le tri. Après un tri, la liste (choix 2) doit être revenue dans l'ordre d'origine.
