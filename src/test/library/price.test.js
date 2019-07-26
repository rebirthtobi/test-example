import { convertToCurrency } from "../../library/price";

describe('expect the number to be converted to curency value', () => {
    it('should convert as expected', () => {
        expect(convertToCurrency(3333)).toBe('$33.33');
        expect(convertToCurrency()).toBeFalsy();
        expect(convertToCurrency(null)).toBeFalsy();
        expect(convertToCurrency(undefined)).toBeFalsy();
        expect(convertToCurrency(5)).toBe('$0.05');
    });
});
