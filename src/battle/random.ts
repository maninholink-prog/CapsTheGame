// LCG32-v1: fixed algorithm; save rngState together with the algorithm version.
// Rejection sampling avoids modulo bias. This generator is not cryptographic.
export function nextInt(state: number, min: number, max: number): { value: number; state: number } {
  const span = max - min + 1;
  if (!Number.isInteger(min) || !Number.isInteger(max) || span < 1 || span > 2 ** 32) {
    throw new RangeError('Invalid random interval');
  }
  const limit = Math.floor(2 ** 32 / span) * span;
  let value: number;
  do {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    value = state;
  } while (value >= limit);
  return { value: min + Math.floor(value / Math.floor(2 ** 32 / span)), state };
}

export function shuffle<T>(items: readonly T[], state: number): { items: T[]; state: number } {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const roll = nextInt(state, 0, i);
    state = roll.state;
    [result[i], result[roll.value]] = [result[roll.value], result[i]];
  }
  return { items: result, state };
}
