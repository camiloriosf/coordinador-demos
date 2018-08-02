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
  M: false
};

// const lineas = [
//   { id: "A", activa: true },
//   { id: "B", activa: true },
//   { id: "C", activa: false },
//   { id: "D", activa: true },
//   { id: "E", activa: true },
//   { id: "F", activa: true },
//   { id: "G", activa: true },
//   { id: "H", activa: true },
//   { id: "I", activa: true },
//   { id: "J", activa: true },
//   { id: "K", activa: false },
//   { id: "L", activa: true },
//   { id: "M", activa: false }
// ];

// console.log(barras);
// console.log(lineas);

let s1 = [];
// let s2 = [];
let checked = [];
s1.push(barras[0]);
let current = 0;
let safe = 10;

while (safe > 0 && current < s1.length && s1.length < barras.length) {
  //   console.log(safe);
  for (let item of s1[current].lineas) {
    const filter = lodash.filter(barras, barra => {
      //   console.log(lodash.includes(barra.lineas, item), barra.lineas, item);
      //   if (
      //     lodash.includes(barra.lineas, item) &&
      //     lodash.includes(s1, { id: barra.id })
      //   ) {
      //     // console.log("asd");
      //     s1.push(barra);
      //   }
      if (
        lodash.includes(barra.lineas, item) &&
        lineas[item] &&
        barra.id !== s1[current].id
      ) {
        // console.log("asd");
        return true;
      }
      return false;
    });
    // console.log(item, filter);
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
// const
// lodash.filter(barras, barra => {
//   console.log(barra);
// });
