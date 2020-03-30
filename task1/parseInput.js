const program = require('commander');
const path = require('path');

// get parameters from commander tool
const parseInput = (userInput, cb) => {
  program
    .version('0.0.1')
    .description("An application to decode Caesar's cipher")
    .option('-a, --action <action>', 'an action encode/decode')
    .requiredOption('-s, --shift <shift>', 'a shift', parseIntShift)
    .option('-i, --input <input>', 'an input file')
    .option('-o, --output <output>', 'an output file')
    .parse(userInput);

  let err = null;
  if (!(program.action === 'encode' || program.action === 'decode')) {
    err = new Error(
      "required option '-a, --action <action>' not specified or incorrect, please choose either 'encode' or 'decode' option"
    );
  }
  if (!(program.shift > 0 && program.shift < 26)) {
    err = new Error('shift option should be between 1 and 25');
  }
  // create absolute paths for files
  program.input = program.input
    ? path.join(__dirname, program.input)
    : undefined;
  program.output = program.output
    ? path.join(__dirname, program.output)
    : undefined;
  cb(err, program);
  return program;
};

function parseIntShift(value) {
  return parseInt(value, 10);
}

module.exports = parseInput;
