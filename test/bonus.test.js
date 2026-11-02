// Tests du BONUS (src/bonus.js) : ils restent rouges tant que le bonus n'est pas codé.
// Ils ne comptent pas dans les tests du socle.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { groupeLePlusFourni, modifierPlant, supprimerPlant, trierParNombrePlantsDecroissant } from '../src/bonus.js';

// Copie figée des données de départ : vos ajouts dans donnees/plants.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

function copieDesDonnees() {
  return DONNEES.map((plant) => ({ ...plant }));
}

function ids(plants) {
  return plants.map((plant) => plant.id);
}

test('bonus : supprimerPlant retire N03 et le renvoie', () => {
  const plants = copieDesDonnees();
  const retire = supprimerPlant(plants, 'N03');
  assert.equal(retire.id, 'N03');
  assert.equal(plants.length, 9);
  assert.equal(ids(plants).includes('N03'), false);
});

test('bonus : supprimerPlant d’un code inconnu renvoie undefined et ne change rien', () => {
  const plants = copieDesDonnees();
  assert.equal(supprimerPlant(plants, 'N99'), undefined);
  assert.equal(plants.length, 10);
});

test('bonus : modifierPlant change le nombre de plants et l’enregistre comme un nombre', () => {
  const plants = copieDesDonnees();
  assert.deepEqual(modifierPlant(plants, 'N03', 'nombrePlants', '33'), []);
  assert.equal(plants[2].nombrePlants, 33);
});

test('bonus : modifierPlant refuse une valeur invalide et ne change rien', () => {
  const plants = copieDesDonnees();
  assert.notEqual(modifierPlant(plants, 'N03', 'nombrePlants', '2,5').length, 0);
  assert.notEqual(modifierPlant(plants, 'N03', 'groupe', 'fougère').length, 0);
  assert.deepEqual(plants[2], DONNEES[2]);
});

test('bonus : modifierPlant d’un code inconnu renvoie une erreur', () => {
  assert.equal(modifierPlant(copieDesDonnees(), 'N99', 'nombrePlants', '5').length, 1);
});

test('bonus : modifierPlant refuse de modifier l’identifiant ou un champ inconnu', () => {
  const plants = copieDesDonnees();
  assert.notEqual(modifierPlant(plants, 'N03', 'id', 'N99').length, 0);
  assert.notEqual(modifierPlant(plants, 'N03', 'couleur', 'vert').length, 0);
  assert.deepEqual(plants[2], DONNEES[2]);
});

test('bonus : trierParNombrePlantsDecroissant trie une copie, du plus grand au plus petit', () => {
  const plants = copieDesDonnees();
  const triee = trierParNombrePlantsDecroissant(plants);
  assert.deepEqual(ids(triee).slice(0, 2), ['N04', 'N02']);
  assert.equal(triee[9].id, 'N09');
  assert.deepEqual(ids(plants), ids(DONNEES));
});

test('bonus : groupeLePlusFourni renvoie les angiospermes avec 222 plants, ou null pour un inventaire vide', () => {
  assert.deepEqual(groupeLePlusFourni(DONNEES), { groupe: 'angiosperme', plants: 222 });
  assert.equal(groupeLePlusFourni([]), null);
});

test('bonus : groupeLePlusFourni garde le premier groupe rencontré en cas d’égalité', () => {
  const egalite = [
    { id: 'X1', groupe: 'gymnosperme', nombrePlants: 5 },
    { id: 'X2', groupe: 'angiosperme', nombrePlants: 5 },
  ];
  assert.deepEqual(groupeLePlusFourni(egalite), { groupe: 'gymnosperme', plants: 5 });
});
