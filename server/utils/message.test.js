const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'test name';
        const text = 'test text';
        const res = generateMessage(from, text);
        
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, text });
    });
});
