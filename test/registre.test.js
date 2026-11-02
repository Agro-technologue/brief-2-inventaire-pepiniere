// Tests fournis : les cas de test du brief et des vérifications de base.
// Le formateur a d'autres tests, sur d'autres données et des cas limites : lisez bien les règles
// de chaque fonction et ajoutez vos propres tests.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  ajouterPlant,
  creerPlant,
  formaterPlant,
  listerPlants,
  trouverParId,
  verifierPlant,
} from '../src/registre.js';

// Copie figée des données de départ : vos ajouts dans donnees/plants.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

// Une copie neuve des données pour chaque test : un ajout ne gêne pas les autres tests.
function copieDesDonnees() {
  return DONNEES.map((plant) => ({ ...plant }));
}

const SAISIE_VALIDE = { id: 'N11', nomCommun: 'papayer', groupe: 'angiosperme', nombrePlants: '15', dateReleve: '2026-10-27' };

test('formaterPlant écrit un plant sur une ligne', () => {
  assert.equal(formaterPlant(DONNEES[8]), 'N09 | pin | gymnosperme | 8 plants | 2026-10-24');
});

test('listerPlants écrit une ligne par plant', () => {
  const lignes = listerPlants(DONNEES).split('\n');
  assert.equal(lignes.length, 10);
  assert.equal(lignes[0], 'N01 | cacao | angiosperme | 30 plants | 2026-10-24');
});

test('listerPlants affiche un message si l’inventaire est vide', () => {
  assert.equal(listerPlants([]), 'Aucun plant enregistré.');
});

test('trouverParId : la recherche N09 affiche pin, gymnosperme, 8 plants', () => {
  const plant = trouverParId(DONNEES, 'N09');
  assert.equal(plant.nomCommun, 'pin');
  assert.equal(plant.groupe, 'gymnosperme');
  assert.equal(plant.nombrePlants, 8);
});

test('trouverParId : N99 est introuvable (undefined)', () => {
  assert.equal(trouverParId(DONNEES, 'N99'), undefined);
});

test('verifierPlant accepte une saisie valide', () => {
  assert.deepEqual(verifierPlant(SAISIE_VALIDE, DONNEES), []);
});

test('verifierPlant refuse une quantité décimale, négative ou non numérique', () => {
  assert.notEqual(verifierPlant({ ...SAISIE_VALIDE, nombrePlants: '2,5' }, DONNEES).length, 0);
  assert.notEqual(verifierPlant({ ...SAISIE_VALIDE, nombrePlants: '-3' }, DONNEES).length, 0);
  assert.notEqual(verifierPlant({ ...SAISIE_VALIDE, nombrePlants: 'douze' }, DONNEES).length, 0);
});

test('verifierPlant refuse un code déjà utilisé', () => {
  assert.notEqual(verifierPlant({ ...SAISIE_VALIDE, id: 'N01' }, DONNEES).length, 0);
});

test('creerPlant convertit le nombre de plants en nombre', () => {
  assert.deepEqual(creerPlant(SAISIE_VALIDE), {
    id: 'N11',
    nomCommun: 'papayer',
    groupe: 'angiosperme',
    nombrePlants: 15,
    dateReleve: '2026-10-27',
  });
});

test('ajouterPlant ajoute une saisie valide à la fin de l’inventaire', () => {
  const plants = copieDesDonnees();
  assert.deepEqual(ajouterPlant(plants, SAISIE_VALIDE), []);
  assert.equal(plants.length, 11);
  assert.equal(plants[10].id, 'N11');
  assert.equal(plants[10].nombrePlants, 15);
});

test('ajouterPlant refuse un deuxième N01 : l’inventaire reste à dix lignes', () => {
  const plants = copieDesDonnees();
  assert.notEqual(ajouterPlant(plants, { ...SAISIE_VALIDE, id: 'N01' }).length, 0);
  assert.equal(plants.length, 10);
});
