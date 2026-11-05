# Journal de recherche

> Chaque recherche utile : ce que vous cherchiez, où (cours, [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript), [Node.js](https://nodejs.org/api/), un camarade, une IA…), ce que vous avez compris. Ce que vous gardez, vous devez pouvoir l'expliquer.

| Ce que je cherchais | Où | Ce que j'ai compris | Utilisé dans |
| --- | --- | --- | --- |
| Transformer un tableau en texte, une ligne par élément | MDN (`map`, `join`), IA | `plants.map(formaterPlant)` crée un tableau de lignes, `join('\n')` les assemble sans retour à la ligne final. | `listerPlants` |
| Chercher un élément et s'arrêter au premier trouvé | MDN (`find`, `findIndex`), IA | `find` renvoie l'élément ou `undefined`. `findIndex` renvoie la position ou **-1** (pas 1), et il faut comparer `plant.id === id`. | `trouverParId`, `supprimerPlant` |
| Retirer un élément d'un tableau | MDN (`splice`), IA | `splice(index, 1)` retire l'élément en place et renvoie un tableau contenant l'élément supprimé. | `supprimerPlant` |
| Valider une modification sans toucher à l'original | IA | On copie avec `{ ...plant, [champ]: valeur }`, on valide la copie, puis on modifie l'original seulement s'il n'y a aucune erreur. On retire le plant lui-même de la liste des doublons. | `modifierPlant` |
| Trier sans modifier le tableau reçu | MDN (`sort`, décomposition `[...]`), IA | `sort` modifie le tableau d'origine : on trie donc une copie `[...plants]`. Le tri est stable, donc les égalités gardent leur ordre. | `trierParNombrePlantsDecroissant` |
| Additionner par groupe en gardant l'ordre de rencontre | MDN (`Map`), IA | Une `Map` conserve l'ordre d'insertion. Avec `>` strict, le premier groupe rencontré gagne en cas d'égalité. | `groupeLePlusFourni` |
| Attraper les erreurs et fermer proprement la saisie | MDN (`try/catch/finally`), IA | `catch` évite que le programme s'arrête, `finally` s'exécute toujours, même à la sortie, donc `fermerSaisie()` y est sûr. | `app.js` |
