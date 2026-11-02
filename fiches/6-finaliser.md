# 6. Tester, documenter, livrer

**Objectif :** un programme vérifié par quelqu'un d'autre, des livrables complets, une version poussée avant l'heure de livraison.

## Tester

1. `npm test` : tous les tests du socle sont verts (seuls ceux du bonus peuvent rester rouges).
2. **Faites tester par un camarade**, qui suit votre `docs/releve-tests.md` et essaie de casser le programme : nombre de plants négatif, vide, décimal (`2,5`, `2.5`), avec des lettres ou une unité ; code en double, en minuscules ; groupe hors liste ou au pluriel ; date `27/10/2026` ou `2026-02-30` ; plusieurs erreurs à la fois ; recherche en majuscules ; choix inconnu ; Entrée sans rien taper ; une espèce à 0 plant, puis une à exactement 10 plants. Corrigez, retestez, gardez la trace.
3. **Écrivez vos propres tests** dans les fichiers `test/*.test.js` pour les cas limites (au moins quatre donnent un bonus).

## Documenter

- `docs/fiche-agronomique.md`, relue par le coach agronomie.
- `README.md` : cochez seulement ce qui marche.
- Vérifiez chaque document de `docs/` (voir « À rendre » dans `SUJET.md`).

## Livrer

Vérifiez sur un autre poste, en suivant votre README, à côté de votre projet et pas dedans :

```powershell
cd ..
git clone https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git test-livraison
cd test-livraison
node app.js
npm test
```

Supprimez ensuite `test-livraison`. Avant l'heure : `git status` propre, `git push` fait.

## La soutenance (environ 15 minutes, individuelle)

1. **Démonstration (3 min)** : inventaire ; recherche de `N09` puis `N99` ; recherche par nom et par groupe ; tri ; synthèse ; une espèce saisie en direct puis la synthèse à nouveau ; une saisie refusée.
2. **Explication (4 min)** : une fonction choisie par le jury, ligne par ligne.
3. **Modification guidée (4 min)**, par exemple : tri décroissant, nombre moyen de plants par groupe, refuser plus de 10 000 plants, stocks faibles avec un autre seuil.
4. **Questions (3 min)** : votre poste et Git (`git add`, `git commit`, `git push`) ; votre raisonnement (entrées, sortie, inventaire vide) ; vos recherches (journal) ; l'agronomie (ce qui distingue angiospermes et gymnospermes, un organe végétatif et un organe reproducteur, pourquoi le seuil de 10 plants n'est pas une consigne de production).
