// Tests fournis : les résultats de référence et les cas de test du brief.
// Le formateur a d'autres tests, sur d'autres données et des cas limites.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from '../src/synthese.js';

// Copie figée des données de départ : vos ajouts dans donnees/plants.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

test('totalPlants : le stock total est de 240 plants', () => {
  assert.equal(totalPlants(DONNEES), 240);
});

test('syntheseParGroupe : 8 espèces et 222 plants d’angiospermes, 2 espèces et 18 plants de gymnospermes', () => {
  assert.deepEqual(syntheseParGroupe(DONNEES), {
    angiosperme: { especes: 8, plants: 222 },
    gymnosperme: { especes: 2, plants: 18 },
  });
});

test('stocksFaibles : deux lignes atteignent le seuil de 10 plants, N09 et N10', () => {
  const faibles = stocksFaibles(DONNEES, SEUIL_STOCK_FAIBLE);
  assert.deepEqual(faibles.map((plant) => plant.id), ['N09', 'N10']);
});

test('stocksFaibles inclut la valeur exactement égale au seuil', () => {
  const cycas = DONNEES[9]; // N10, 10 plants
  assert.equal(stocksFaibles([cycas], 10).length, 1);
});

test('especeLaPlusAbondante : la tomate (N04) a le plus de plants, 50', () => {
  const plant = especeLaPlusAbondante(DONNEES);
  assert.equal(plant.id, 'N04');
  assert.equal(plant.nombrePlants, 50);
});

test('especeLaPlusAbondante d’un inventaire vide renvoie null', () => {
  assert.equal(especeLaPlusAbondante([]), null);
});
