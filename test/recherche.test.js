// Tests fournis : les cas de test du brief et des vérifications de base.
// Le formateur a d'autres tests, sur d'autres données et des cas limites.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from '../src/recherche.js';

// Copie figée des données de départ : vos ajouts dans donnees/plants.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

function ids(plants) {
  return plants.map((plant) => plant.id);
}

test('rechercherParNom trouve un nom qui contient le texte cherché', () => {
  assert.deepEqual(ids(rechercherParNom(DONNEES, 'palmier')), ['N07']);
});

test('filtrerParGroupe garde les gymnospermes', () => {
  assert.deepEqual(ids(filtrerParGroupe(DONNEES, 'gymnosperme')), ['N09', 'N10']);
});

test('trierParNombrePlants : le tri croissant commence par N09 puis N10', () => {
  const triee = trierParNombrePlants(DONNEES);
  assert.equal(triee[0].id, 'N09');
  assert.equal(triee[1].id, 'N10');
});

test('trierParNombrePlants utilise un comparateur numérique', () => {
  const nombres = trierParNombrePlants(DONNEES).map((plant) => plant.nombrePlants);
  assert.deepEqual(nombres, [8, 10, 12, 18, 20, 22, 25, 30, 45, 50]);
});

test('trierParNombrePlants ne modifie pas l’inventaire d’origine', () => {
  const plants = DONNEES.map((plant) => ({ ...plant }));
  trierParNombrePlants(plants);
  assert.deepEqual(ids(plants), ids(DONNEES));
});
