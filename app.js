// Inventaire de la pépinière — point d'entrée : le menu.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/plants.json';

function afficherAccueil() {
  console.log('='.repeat(50));
  console.log('   INVENTAIRE DE LA PÉPINIÈRE');
  console.log('   Pépinière pédagogique');
  console.log('='.repeat(50));
}

function afficherMenu() {
  console.log('');
  console.log('--------------------- MENU ---------------------');
  console.log('1. Ajouter un plant');
  console.log('2. Lister l\'inventaire');
  console.log('3. Rechercher (code, nom, groupe)');
  console.log('4. Trier (nombre de plants)');
  console.log('5. Synthèse des quantités');
  console.log('6. Supprimer un plant');
  console.log('7. Modifier un plant');
  console.log('0. Quitter');
}

async function chargerInventaire() {
  try {
    const plants = await chargerJson(FICHIER_DONNEES);
    console.log(`${plants.length} espèce(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
    return plants;
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. L'inventaire démarre vide.`);
    return [];
  }
}

async function ajouter(plants) {
  console.log('--- Ajouter un plant ---');

  const id = await demander('Code du plant (ex. N11) : ');
  if (id === null) return;
  const nomCommun = await demander('Nom commun (ex. papayer) : ');
  if (nomCommun === null) return;
  const groupe = await demander(`Groupe botanique (${GROUPES.join(' ou ')}) : `);
  if (groupe === null) return;
  const nombrePlants = await demander('Nombre de plants (entier) : ');
  if (nombrePlants === null) return;
  const dateReleve = await demander('Date du relevé (AAAA-MM-JJ) : ');
  if (dateReleve === null) return;

  const saisie = {
    id: id.toUpperCase(),
    nomCommun: nomCommun.toLowerCase(),
    groupe: groupe.toLowerCase(),
    nombrePlants,
    dateReleve,
  };

  const erreurs = ajouterPlant(plants, saisie);

  if (erreurs.length > 0) {
    console.log('Ajout refusé :');
    for (const message of erreurs) {
      console.log(`  - ${message}`);
    }
    console.log(`L'inventaire compte toujours ${plants.length} espèce(s).`);
    return;
  }

  const plantAjoute = plants[plants.length - 1];
  try {
    await enregistrerJson(FICHIER_DONNEES, plants);
  } catch (erreur) {
    // L'enregistrement a échoué : on retire le plant pour que la mémoire reste fidèle au fichier.
    plants.pop();
    throw erreur;
  }
  console.log(`Plant ${plantAjoute.id} ajouté. L'inventaire compte ${plants.length} espèce(s).`);
}

function lister(plants) {
  console.log(`--- Inventaire (${plants.length} espèce(s)) ---`);
  console.log(listerPlants(plants));
}

// Choix 3 : rechercher par code, par nom ou par groupe botanique.
async function rechercher(plants) {
  console.log('--- Rechercher ---');
  console.log('1. Par code');
  console.log('2. Par nom');
  console.log('3. Par groupe botanique');
  const mode = await demander('Votre choix : ');
  if (mode === null) return;

  switch (mode.trim()) {
    case '1': {
      const id = await demander('Code du plant (ex. N09) : ');
      if (id === null) return;
      const plant = trouverParId(plants, id.trim().toUpperCase());
      console.log(plant ? formaterPlant(plant) : 'Aucun plant avec ce code.');
      break;
    }
    case '2': {
      const texte = await demander('Nom (ou début du nom) : ');
      if (texte === null) return;
      const resultats = rechercherParNom(plants, texte.trim());
      console.log(resultats.length > 0 ? listerPlants(resultats) : 'Aucun résultat.');
      break;
    }
    case '3': {
      const groupe = await demander(`Groupe botanique (${GROUPES.join(' ou ')}) : `);
      if (groupe === null) return;
      const resultats = filtrerParGroupe(plants, groupe.trim().toLowerCase());
      console.log(resultats.length > 0 ? listerPlants(resultats) : 'Aucun résultat.');
      break;
    }
    default:
      console.log('Choix inconnu. Tapez 1, 2 ou 3.');
  }
}

// Choix 4 : afficher l'inventaire trié par nombre de plants.
function trier(plants) {
  console.log('--- Inventaire trié par nombre de plants ---');
  console.log(listerPlants(trierParNombrePlants(plants)));
}

// Choix 5 : synthèse des quantités.
function synthese(plants) {
  console.log('--- Synthèse des quantités ---');
  if (plants.length === 0) {
    console.log('L\'inventaire est vide : rien à synthétiser.');
    return;
  }

  console.log(`Stock total : ${totalPlants(plants)} plant(s) pour ${plants.length} espèce(s).`);

  console.log('Par groupe botanique :');
  for (const groupe of GROUPES) {
    const especes = plants.filter((plant) => plant.groupe === groupe);
    const nombre = especes.reduce((somme, plant) => somme + plant.nombrePlants, 0);
    console.log(`  - ${groupe} : ${especes.length} espèce(s), ${nombre} plant(s)`);
  }

  const plusAbondante = especeLaPlusAbondante(plants);
  if (plusAbondante) {
    console.log(`Espèce la plus abondante : ${plusAbondante.id} (${plusAbondante.nomCommun}), ${plusAbondante.nombrePlants} plant(s).`);
  }

  const faibles = stocksFaibles(plants);
  if (faibles.length === 0) {
    console.log(`Aucun stock faible (seuil : ${SEUIL_STOCK_FAIBLE} plants ou moins).`);
  } else {
    console.log(`Stocks faibles (${SEUIL_STOCK_FAIBLE} plants ou moins) :`);
    for (const plant of faibles) {
      console.log(`  - ${plant.id} (${plant.nomCommun}) : ${plant.nombrePlants} plant(s)`);
    }
  }
}

// Choix 6 (bonus) : supprimer une espèce de l'inventaire.
async function supprimer(plants) {
  console.log('--- Supprimer un plant ---');
  const saisieId = await demander('Code du plant à supprimer (ex. N09) : ');
  if (saisieId === null) return;

  const id = saisieId.trim().toUpperCase();
  const position = plants.findIndex((plant) => plant.id === id);
  if (position === -1) {
    console.log(`Aucun plant avec le code ${id}.`);
    return;
  }

  const plant = plants[position];
  const confirmation = await demander(`Supprimer ${plant.id} (${plant.nomCommun}, ${plant.nombrePlants} plant(s)) ? (o/n) : `);
  if (confirmation === null) return;
  if (confirmation.trim().toLowerCase() !== 'o') {
    console.log('Suppression annulée.');
    return;
  }

  plants.splice(position, 1);
  try {
    await enregistrerJson(FICHIER_DONNEES, plants);
  } catch (erreur) {
    // L'enregistrement a échoué : on remet le plant à sa place.
    plants.splice(position, 0, plant);
    throw erreur;
  }
  console.log(`Plant ${plant.id} supprimé. L'inventaire compte ${plants.length} espèce(s).`);
}

function dateValide(texte) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texte)) return false;
  const date = new Date(`${texte}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === texte;
}

// Choix 7 (bonus) : modifier le nombre de plants et la date du relevé d'une espèce.
async function modifier(plants) {
  console.log('--- Modifier un plant ---');
  const saisieId = await demander('Code du plant à modifier (ex. N09) : ');
  if (saisieId === null) return;

  const id = saisieId.trim().toUpperCase();
  const plant = plants.find((element) => element.id === id);
  if (!plant) {
    console.log(`Aucun plant avec le code ${id}.`);
    return;
  }

  console.log(`Plant ${plant.id} (${plant.nomCommun}) : ${plant.nombrePlants} plant(s), relevé du ${plant.dateReleve}.`);
  console.log('Laissez vide et tapez Entrée pour garder la valeur actuelle.');

  const nouveauNombre = await demander('Nouveau nombre de plants (entier) : ');
  if (nouveauNombre === null) return;
  const nouvelleDate = await demander('Nouvelle date du relevé (AAAA-MM-JJ) : ');
  if (nouvelleDate === null) return;

  const erreurs = [];
  const nombreTexte = nouveauNombre.trim();
  const dateTexte = nouvelleDate.trim();
  if (nombreTexte !== '' && !/^\d+$/.test(nombreTexte)) {
    erreurs.push('Le nombre de plants doit être un entier positif ou nul.');
  }
  if (dateTexte !== '' && !dateValide(dateTexte)) {
    erreurs.push('La date doit exister et avoir le format AAAA-MM-JJ.');
  }
  if (erreurs.length > 0) {
    console.log('Modification refusée :');
    for (const message of erreurs) {
      console.log(`  - ${message}`);
    }
    return;
  }

  const ancien = { nombrePlants: plant.nombrePlants, dateReleve: plant.dateReleve };
  if (nombreTexte !== '') plant.nombrePlants = Number(nombreTexte);
  if (dateTexte !== '') plant.dateReleve = dateTexte;

  try {
    await enregistrerJson(FICHIER_DONNEES, plants);
  } catch (erreur) {
    // L'enregistrement a échoué : on remet les anciennes valeurs.
    plant.nombrePlants = ancien.nombrePlants;
    plant.dateReleve = ancien.dateReleve;
    throw erreur;
  }
  console.log(`Plant ${plant.id} modifié : ${plant.nombrePlants} plant(s), relevé du ${plant.dateReleve}.`);
}

async function main() {
  ouvrirSaisie();
  try {
    afficherAccueil();
    const plants = await chargerInventaire();

    let continuer = true;
    while (continuer) {
      afficherMenu();
      const reponse = await demander('Votre choix : ');

      if (reponse === null) {
        continuer = false;
        continue;
      }

      const choix = reponse.trim();

      try {
        switch (choix) {
          case '1':
            await ajouter(plants);
            break;
          case '2':
            lister(plants);
            break;
          case '3':
            await rechercher(plants);
            break;
          case '4':
            trier(plants);
            break;
          case '5':
            synthese(plants);
            break;
          case '6':
            await supprimer(plants);
            break;
          case '7':
            await modifier(plants);
            break;
          case '0':
            console.log('Au revoir !');
            continuer = false;
            break;
          default:
            console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
        }
      } catch (erreur) {
        const message = String(erreur?.message ?? erreur);
        console.log(`Erreur inattendue : ${message}`);
      }
    }
  } finally {
    fermerSaisie();
  }
}

main();