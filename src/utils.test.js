import { getSmallestBreakpoint } from './utils';

const BREAKPOINTS = { a: 30, b: 10, c: 20, d: 40 };

describe('getSmallestBreakpoint', () => {
  test('default', () => {
    expect(
      getSmallestBreakpoint(15, BREAKPOINTS)
    )
    .toBe('c');
  });
  test('bigger than max', () => {
    expect(
      getSmallestBreakpoint(50, BREAKPOINTS)
    )
    .toBe('d');
  });
  test('less than min', () => {
    expect(
      getSmallestBreakpoint(0, BREAKPOINTS)
    )
    .toBe('b');
  });
});
