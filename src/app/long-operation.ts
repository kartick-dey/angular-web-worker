export function longOps(interval: number) {
  const start = new Date();
  while (true) {
    const curr = new Date();
    if (curr.valueOf() - start.valueOf() >= interval) {
      break;
    }
  }
  return `Operation Done!!!`;
}
