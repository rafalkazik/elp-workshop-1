import rpn from './rpn';

describe('rpn()', () => {
    it('returs number when passed', () => {
        expect(rpn('2')).toBe(2);
    });

    it('correctly adds 2 numbers', () => {
        expect(rpn('1 3 +')).toBe(4);
    });
});
