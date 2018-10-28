const expect = require('expect');

const {isRealString} = require('./validation');

describe('IsRealString', () => {
    it('Should reject non-string values', () => {
        var res = isRealString(96);
        expect(res).toBe(false);
    });

    it('Should reject string with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });

    it('Should allow string with non-sapce characters', () => {
        var res = isRealString(' Mohammed ');
        expect(res).toBe(true);
    });
});