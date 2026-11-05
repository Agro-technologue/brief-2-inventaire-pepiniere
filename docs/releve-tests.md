# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. 
Stock total : 30+45+20+50+25+18+12+22+8+10 + 240 plants
Plants gymnospermes : 10+8 = 18
Plants angiospermes : 30+45+20+50+25+18+12+22 = 222

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Calcul du stock total|240 | | |
| Total plants angiospermes | 222 | | |
| Total plants gymnospermes | 18 | | |
| Total espèces angiospermes | 8 | | |
| Total espèces gymnospermes | 2 |  | |
| Stock faible (10 plants ou moins) |N09, N10 | | |
| Espèce plus abondante | N04 |  | | 
**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
