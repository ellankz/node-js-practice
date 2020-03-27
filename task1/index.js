const { pipeline } = require('stream');
const fs = require('fs');
const CaesarTransform = require('./CaesarTransform');
const parseInput = require('./parseInput');

// all the user input arguments here
const program = parseInput(process.argv, err => {
  if (err) {
    console.error('Parse failed.', err);
    throw err;
  }
});

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
      console.error(
        'A file path you specified does not refer to an existing file',
        err.path
      );
    } else if (err && err.code === 'EISDIR') {
      console.error('A path you specified refers to a path and not a file');
    } else if (err && err.code === 'EPERM') {
      console.error("You don't have enough permissions to work with this file");
    } else if (err) {
      console.error('Encode or decode failed.', err);
    } else {
      console.log('Encode or decode succeeded.');
    }
  }
);
