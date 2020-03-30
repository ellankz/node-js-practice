const fs = require('fs');
const { pipeline } = require('stream');
const CaesarTransform = require('./CaesarTransform');

const createStreamsAndPipe = program => {
  // Put either stdin/stdout or files into streams
  const inputStream = !program.input
    ? process.stdin
    : fs.createReadStream(program.input);

  const outputStream = !program.output
    ? process.stdout
    : fs.createWriteStream(program.output, { flags: 'a' });

  // use pipeline method with tramsformer, which does the encoding
  pipeline(
    inputStream,
    new CaesarTransform(program.action, program.shift),
    outputStream,
    err => {
      if (err && err.code === 'ENOENT') {
        console.error('Input file does not exist', err.path);
      } else if (err && err.code === 'EISDIR') {
        console.error('A path you specified refers to a path and not a file');
      } else if (err && err.code === 'EPERM') {
        console.error(
          "You don't have enough permissions to work with this file"
        );
      } else if (err) {
        console.error('Encode or decode failed.');
      } else {
        console.log('Encode or decode succeeded.');
      }
    }
  );
};
module.exports = createStreamsAndPipe;
