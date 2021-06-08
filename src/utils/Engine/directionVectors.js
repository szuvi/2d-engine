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

const rebounceVectors = new Map(
  [vectors.upLeft, vectors.downRight],
  [vectors.upRight, vectors.downLeft],
  [vectors.downLeft, vectors.upRight],
  [vectors.downRight, vectors.upLeft],
);

function getBouncePosition(collidingObjPos, vector, bounceVector) {
  const vectorPosition = vector(collidingObjPos);
  const bounceVectorPosition = bounceVector(collidingObjPos);
  const x = (vectorPosition[0] + bounceVectorPosition[0]) / 2;
  const y = (vectorPosition[1] + bounceVectorPosition[1]) / 2;
  return [x, y];
  // example:
  // pos [2,7]
  // vector upLeft: x-1, y-1 => [1,6]
  // bounce vector upRight: x-1, y+1 [1,8]
  // result after calculation[1,7] => position after bounce
}

function getRandom() {
  const modifiers = Object.values(vectors);
  const randomIndex = Math.floor(Math.random() * modifiers.length);
  return modifiers[randomIndex];
}

export default vectors;
export { getRandom, bounceVectors, getBouncePosition, rebounceVectors };
