import { getSmallestBreakpoint } from './utils';

describe('getSmallestBreakpoint', () => {
  test('default', () => {
    expect(
      getSmallestBreakpoint(15, { a: 30, b: 10, c: 20, d: 40 })
    )
    .toBe('c');
  });
  test('bigger than max', () => {
    expect(
      getSmallestBreakpoint(50, { a: 30, b: 10, c: 20, d: 40 })
    )
    .toBe('d');
  });
  test('less than min', () => {
    expect(
      getSmallestBreakpoint(0, { a: 30, b: 10, c: 20, d: 40 })
    )
    .toBe('b');
  });
});
