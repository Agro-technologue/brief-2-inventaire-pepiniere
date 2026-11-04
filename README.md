# Inventaire de la pépinière

> Projet individuel du SAS DFS, brief 2 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

L'outil est destiné à un responsable d'une pépinière pédagogique (assistant de pépinière). Son geste professionnel consiste à observer les étiquettes et les organes présentés, reproduire la classification fournie, compter les plants, saisir l'origine du relevé (étiquette, photo ou spécimen, qui a compté, quand). 
Il veut retrouver une espèce, lire son groupe botanique fourni et voir les quantités disponibles (son besoin).
Pour cela, il saisit l'origine du relevé (étiquette, photo ou spécimen), l'espèce, le groupe botanique et les quantités des plants de chaque espèce. Le programme lui offre alors un inventaire structuré et une classification botanique simple à partir d'une fiche de référence.
Les limites de l'outil sont : son incapacité à suivre l'état sanitaire des plants et la croissance et le developpement des plants. L'outil n'a pas de l'historique des relevés. Il ne peut pas faire de sauvegarde ni de gestion de plusieurs utilisateurs à la fois.
## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git
cd brief-2-inventaire-pepiniere
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

- [x] Données lues et enregistrées dans `donnees/plants.json`
- [x] Ajouter un plant, saisies invalides refusées sans arrêter le programme
- [x] Lister l'inventaire, message si l'inventaire est vide
- [x] Rechercher par code ou par nom ; filtrer par groupe botanique
- [x] Trier par nombre de plants
- [x] Synthèse : stock total, espèces et plants par groupe, espèce la plus abondante, stocks faibles (≤ 10 plants)
- [x] Bonus : supprimer et modifier un plant (choix 6 et 7)
- [x] Bonus : tri décroissant, groupe le plus fourni

## Données

fichier : docs/dictionnaire-donnees.md; 07 lignes. Champs : id (sans unité), nomCommun (sans unité), groupe (sans unité), nombrePlants (plants) et dateReleve (sans unité). Ces données sont fictives et les groupes sont fournis par le coach.

## Limites

- Pas d'historiques de relevés;
- Pas de suivi sanitaire et croissance des plants;
- Les groupes sont fournis par le coach
- Pas de sauvegarde ni de gestion de plusieurs utilisateurs à la fois.
## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

Gonlesseu Odilon TOKPA, compte Github: Agro-technologue. 
Endraide : j'ai été aidé par Ulrich KONAN sur la creation de mon depot Github; par Sammuel KROMAN sur le Pseudo-code.
J'ai été assisté par l'IA (Claude) pour traduire mon Pseudo-code en code JavaScript et comprendre le sujet.