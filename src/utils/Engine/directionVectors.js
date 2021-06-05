const vectors = {
  upLeft: ([x, y]) => [x - 1, y - 1],
  upRight: ([x, y]) => [x - 1, y + 1],
  downLeft: ([x, y]) => [x + 1, y - 1],
  downRight: ([x, y]) => [x + 1, y + 1],
};

function getRandom() {
  const modifiers = Object.values(vectors);
  const randomIndex = Math.floor(Math.random() * modifiers.length);
  return modifiers[randomIndex];
}

export default vectors;
export { getRandom };
