const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');

class CaesarTransform extends Transform {
  constructor(action, shift) {
    super();
    this.shift = action === 'encode' ? shift : -shift;
    // The stream will have Buffer chunks. The
    // decoder converts these to String instances.
    this._decoder = new StringDecoder('utf-8');
  }

  _transform(chunk, encoding, callback) {
    // Convert the Buffer chunks to String.
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk);
    }

    // The encode/decode magic here
    const res = chunk
      .split('')
      .map(chr => {
        const upperCase = chr === chr.toUpperCase();
        if (upperCase) {
          chr = chr.toLowerCase();
        }
        if (chr >= 'a' && chr <= 'z') {
          let charCode = chr.charCodeAt(0) + this.shift;
          charCode = charCode > 122 ? charCode - 26 : charCode;
          charCode = charCode < 97 ? charCode + 26 : charCode;
          chr = String.fromCharCode(charCode);
        }
        if (upperCase) {
          chr = chr.toUpperCase();
        }
        return chr;
      })
      .join('');

    // Pass the chunk on.
    callback(null, res);
  }
}

module.exports = CaesarTransform;
