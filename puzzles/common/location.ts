type Location = {
  x: number;
  y: number;
};
const locationEquals =
  (l1: Location) =>
  (l2: Location): boolean =>
    l1.x === l2.x && l1.y === l2.y;

export { locationEquals, Location };
