const lodash = require("lodash");

const barras = [
  { id: 1, lineas: ["A", "B", "C"] },
  { id: 2, lineas: ["A", "D", "E", "F"] },
  { id: 3, lineas: ["B", "G", "H"] },
  { id: 4, lineas: ["C", "I"] },
  { id: 5, lineas: ["D"] },
  { id: 6, lineas: ["E"] },
  { id: 7, lineas: ["F", "J"] },
  { id: 8, lineas: ["G"] },
  { id: 9, lineas: ["H", "M"] },
  { id: 10, lineas: ["I", "K", "L", "M"] },
  { id: 11, lineas: ["J", "K"] },
  { id: 12, lineas: ["L"] }
];

const lineas = {
  A: true,
  B: true,
  C: false,
  D: true,
  E: true,
  F: true,
  G: true,
  H: true,
  I: true,
  J: true,
  K: false,
  L: true,
  M: true
};

let s1 = [];
let checked = [];
s1.push(barras[0]);
let current = 0;
let safe = 100;

while (safe > 0 && current < s1.length && s1.length < barras.length) {
  for (let item of s1[current].lineas) {
    const filter = lodash.filter(barras, barra => {
      if (
        lodash.includes(barra.lineas, item) &&
        lineas[item] &&
        barra.id !== s1[current].id
      ) {
        return true;
      }
      return false;
    });
    for (let filteredItem of filter) {
      if (!lodash.some(s1, { id: filteredItem.id })) s1.push(filteredItem);
    }
  }
  current++;
  safe--;
}
const s2 = lodash.filter(barras, barra => {
  if (lodash.some(s1, { id: barra.id })) return false;
  return true;
});
console.log("Sistema 1: ", s1);
console.log("Sistema 2: ", s2);
