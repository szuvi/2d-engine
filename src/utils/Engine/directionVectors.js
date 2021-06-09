const vectors = {
  upLeft: ([x, y]) => [x - 1, y - 1],
  upRight: ([x, y]) => [x - 1, y + 1],
  downLeft: ([x, y]) => [x + 1, y - 1],
  downRight: ([x, y]) => [x + 1, y + 1],
};

const bounceVectors = new Map([
  [vectors.upLeft, [vectors.upRight, vectors.downLeft]],
  [vectors.upRight, [vectors.upLeft, vectors.downRight]],
  [vectors.downLeft, [vectors.downRight, vectors.upLeft]],
  [vectors.downRight, [vectors.upRight, vectors.downLeft]],
]);

const rebounceVectors = new Map([
  [vectors.upLeft, vectors.downRight],
  [vectors.upRight, vectors.downLeft],
  [vectors.downLeft, vectors.upRight],
  [vectors.downRight, vectors.upLeft],
]);

function calculateNeighbourPosition(vehiclePosition, vector, bounceVector) {
  const [a, b] = vector(vehiclePosition);
  const [c, d] = bounceVector(vehiclePosition);
  const neighbourPos = [(a + c) / 2, (b + d) / 2];
  return neighbourPos;
}

function getRandom() {
  const modifiers = Object.values(vectors);
  const randomIndex = Math.floor(Math.random() * modifiers.length);
  return modifiers[randomIndex];
}

export default vectors;
export {
  getRandom,
  bounceVectors,
  rebounceVectors,
  calculateNeighbourPosition,
};
