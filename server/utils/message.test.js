const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        var from = 'Mohammed';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15, 19';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({from, url}));
    });
});