import { DescuentoPipe } from './descuento.pipe';

describe('DescuentoPipe', () => {
  it('create an instance', () => {
    const pipe = new DescuentoPipe();
    expect(pipe).toBeTruthy();
  });

  it('applies percentage discount', () => {
    const pipe = new DescuentoPipe();
    expect(pipe.transform(100, 10)).toBe(90);
  });

  it('does not return negative prices', () => {
    const pipe = new DescuentoPipe();
    expect(pipe.transform(10, 200)).toBe(0);
  });
});
