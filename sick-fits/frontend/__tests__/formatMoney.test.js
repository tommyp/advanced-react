import formatMoney from '../lib/formatMoney';

describe('formatMoney', () => {
  it('works with fractional pounds', () => {
    expect(formatMoney(1)).toEqual('£0.01');
    expect(formatMoney(10)).toEqual('£0.10');
    expect(formatMoney(9)).toEqual('£0.09');
    expect(formatMoney(40)).toEqual('£0.40');
    expect(formatMoney(140)).toEqual('£1.40');
  });

  it('leaves off pences when its whole pounds', () => {
    expect(formatMoney(5000)).toEqual('£50');
    expect(formatMoney(100)).toEqual('£1');
    expect(formatMoney(50000000)).toEqual('£500,000');
  });

  it('works with whole and fractional dollars', () => {
    expect(formatMoney(140)).toEqual('£1.40');
    expect(formatMoney(1040)).toEqual('£10.40');
    expect(formatMoney(5012)).toEqual('£50.12');
  });
});
