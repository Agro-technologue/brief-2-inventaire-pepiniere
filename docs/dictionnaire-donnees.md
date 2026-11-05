# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | N03 |

| nomCommun |Nom commun de l'espèce  |Texte |non vide, absence de données | — | "riz"|

| groupe | Groupe botanique de l'espèce| Texte | angiosperme ou gymnosperme| — | "gymnosperme"|

| nombrePlants|quantité de plants disponibles |nombre entier |nombre entier superieur ou égal à 0 |plants |20 |

| dateReleve |Date de relevé |AAAA-MM-JJ |Date du jour au format valide | — |2026-10-24 |

**Listes de valeurs autorisées** : 
id : N01 à N10
nomCommun : cacao, riz, cycas, pin, citronnier, palmier à huile, manguier, goyavier, tomate, maïs   
groupe : angiosperme, gymnosperme
nombrePlants : 0 ou plus
dateReleve : Date réelle au format valide

**Sources** :
 donnees.js // Pour remplir les champs et donner les exemples
 concevoir.md // Pour definir la règle de validation de groupe
 3-ajouter-lister.md // Pour definir les regles de validation
