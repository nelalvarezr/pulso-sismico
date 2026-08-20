const directionMap: Record<string, string> = {
  NE: "noreste",
  NO: "noroeste",
  SE: "sureste",
  SO: "suroeste",
  N: "norte",
  S: "sur",
  E: "este",
  O: "oeste",
};

export function normalizePlaceDirection(place: string) {
  return place.replace(
    /\bal (NE|NO|SE|SO|N|S|E|O) de\b/g,
    (_, direction: string) =>
      `al ${directionMap[direction]} de`,
  );
}
