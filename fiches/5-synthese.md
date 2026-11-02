# 5. Synthèse des quantités

**Vos fichiers :** `src/synthese.js`, puis `app.js` (choix 5) · **Vos tests :** `npm run test:synthese` (6 tests fournis)

Aucune de ces fonctions ne modifie l'inventaire reçu.

## 1. `totalPlants(plants)`

Renvoie le nombre total de plants : `240` avec les données de départ, `0` pour un inventaire vide.

**À vous.** Piste : avec quelle valeur commence la variable qui accumule ?

## 2. `syntheseParGroupe(plants)`

Renvoie un objet : `{ angiosperme: { especes: 8, plants: 222 }, gymnosperme: { especes: 2, plants: 18 } }` ; seuls les groupes présents apparaissent ; `{}` pour un inventaire vide.

**Pseudo-code de référence :**

```text
synthese ← objet vide
POUR CHAQUE plant DANS plants
  cle ← plant.groupe
  SI synthese n'a pas encore la clé cle ALORS
    synthese[cle] ← { especes: 0, plants: 0 }
  FIN SI
  synthese[cle].especes ← synthese[cle].especes + 1
  synthese[cle].plants ← synthese[cle].plants + plant.nombrePlants
FIN POUR
RENVOYER synthese
```

Piste : `synthese.cle` et `synthese[cle]` ne veulent pas dire la même chose.

## 3. `stocksFaibles(plants, seuil)`

Renvoie un **nouveau** tableau des plants dont le nombre est **inférieur ou égal** au seuil : N09 et N10 pour un seuil de 10. Le menu utilise `SEUIL_STOCK_FAIBLE` (10), un repère pédagogique, pas une recommandation de production.

**À vous.** Pistes : la ligne à exactement 10 plants en fait partie ; utilisez le seuil reçu, jamais `10` écrit en dur.

## 4. `especeLaPlusAbondante(plants)`

Renvoie le plant qui a le plus de plants (N04, tomate, 50), le premier en cas d'égalité, ou `null` pour un inventaire vide.

**À vous** : écrivez d'abord l'algorithme et suivez-le à la main sur un exemple. Pistes : avec quelle valeur commencer ? Une quantité peut valoir `0`. « Plus grand » ou « plus grand ou égal » : lequel garde le premier ?

## 5. Le menu : choix 5 (`app.js`)

Dialogue **imposé** (données de départ) :

```text
--- Synthèse de l'inventaire ---
Nombre d'espèces : 10
Stock total : 240 plants
Par groupe botanique :
  angiosperme : 8 espèce(s), 222 plants
  gymnosperme : 2 espèce(s), 18 plants
Espèce la plus abondante : N04 | tomate | angiosperme | 50 plants | 2026-10-24
Stocks faibles (≤ 10 plants) : 2
  N09 | pin | gymnosperme | 8 plants | 2026-10-24
  N10 | cycas | gymnosperme | 10 plants | 2026-10-24
Rappel : le seuil de 10 plants est un repère pédagogique de suivi, pas une recommandation de production.
```

- Une ligne par groupe, dans l'ordre de l'objet de `syntheseParGroupe`. Cherchez comment parcourir les clés et les valeurs d'un objet.
- Le seuil vient de `SEUIL_STOCK_FAIBLE`, dans le calcul comme dans les textes.
- Inventaire vide : `Espèce la plus abondante : aucune donnée`, puis `Stocks faibles (≤ 10 plants) : 0`.

## Vérifier

`npm run test:synthese`, puis le choix 5 : comparez avec vos calculs à la main. Ajoutez une espèce avec 5 plants : elle apparaît dans les stocks faibles.
