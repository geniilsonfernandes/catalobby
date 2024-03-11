var compose = function (functions) {
  return function (x) {
    if (functions.length === 0) return x;
    let result = 0;
    functions.reduceRight((acc, fn) => {
      result = fn(acc);
      return result;
    }, x);
    return result;
  };
};
[].length;

function delta(x2, x1) {
  const delta = x2 - x1;
  return delta * delta;
}

const pontoA = { x: 1, y: 3 };
const pontoB = { x: 5, y: 6 };

const deltaA = delta(pontoB.x, pontoA.x);
const deltaB = delta(pontoB.y, pontoA.y);

const distancia = Math.sqrt(deltaA + deltaB);
console.log(distancia);
