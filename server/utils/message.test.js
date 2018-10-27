const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        // store res in variable
        // assert from match
        // asster text match
        // assert createdAt is number

        var from = "Mohammed";
        var text = "Some message";
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe("number");
        expect(message).toEqual(expect.objectContaining({from, text}));
    });
});