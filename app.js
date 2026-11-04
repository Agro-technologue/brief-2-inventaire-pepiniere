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

function actionPasEncoreCodee(nom) {
  throw new Error(`TODO : ${nom} n'est pas encore codé(e).`);
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
            actionPasEncoreCodee('la recherche');
            break;
          case '4':
            actionPasEncoreCodee('le tri');
            break;
          case '5':
            actionPasEncoreCodee('la synthèse');
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
        if (message.startsWith('TODO')) {
          console.log(`À compléter : ${message}`);
        } else {
          console.log(`Erreur inattendue : ${message}`);
        }
      }
    }
  } finally {
    fermerSaisie();
  }
}

main();