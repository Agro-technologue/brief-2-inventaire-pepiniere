# 1. Comprendre et préparer

**Objectif :** un poste prêt, un dépôt GitHub, le besoin compris, les plants observés, un plan de travail.

1. **Poste et dépôt.** Suivez « Démarrer » dans `SUJET.md`. Montrez au coach : `npm test` affiche 3 tests verts, le dépôt est sur GitHub.
2. **Le besoin.** Rédigez la partie « Contexte » du `README.md` : qui utilise l'outil, son besoin, ce qu'il saisit et ce qu'il veut voir. Distinguez trois notions : l'**espèce** (une ligne de l'inventaire ; un nom commun peut regrouper plusieurs espèces botaniques), le **plant** (une jeune plante élevée en pépinière, destinée à être repiquée ou plantée) et le **groupe botanique** (angiospermes ou gymnospermes, les deux grands groupes de plantes à graines).
3. **L'agronomie.** Avec la fiche botanique et le coach agronomie, observez étiquettes, photos ou spécimens : repérez un organe végétatif et un organe reproducteur (s'il n'est pas visible, notez-le et appuyez-vous sur la fiche ou la photo), et le critère qui distingue les deux groupes. Une identification incertaine est signalée au coach, jamais devinée. Gardez vos notes pour `docs/fiche-agronomique.md`.
4. **Les données.** Complétez `docs/dictionnaire-donnees.md`, avec l'origine des relevés. Ouvrez `donnees/plants.json` et calculez à la main le stock total, le nombre d'espèces et de plants de chaque groupe, et les lignes à 10 plants ou moins (dans `docs/releve-tests.md`).
5. **Le code fourni.** Lisez `src/saisie.js` (la saisie au clavier), `src/outils.js` et les tests de `test/`. `app.js` est presque vide : vous y écrirez tout le menu. Notez dans `docs/journal-recherche.md` les notions que vous devrez chercher.
6. **Le plan.** Remplissez la colonne « Prévu » de `docs/taches.md` : c'est vous qui organisez vos quatre jours.

**Une expérience pour lire un test rouge :** dans `src/outils.js`, remplacez `return NaN;` par `return 0;`, lancez `npm run test:outils`, lisez le message (`expected` = attendu, `actual` = obtenu), puis annulez avec `git restore src/outils.js`.
