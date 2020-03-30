const fs = require('fs');
const parseInput = require('./parseInput');
const createStreamsAndPipe = require('./createStreamsAndPipe');

// all the user input arguments here
parseInput(process.argv, (err, program) => {
  if (err) {
    console.error(err.message);
  } else if (program.output) {
    // input is correct
    // check if output file exists and move on to creating streams and piping
    fs.access(program.output, fs.constants.F_OK, error => {
      if (error) {
        console.error('Output file does not exist');
      } else {
        createStreamsAndPipe(program);
      }
    });
  } else {
    createStreamsAndPipe(program);
  }
});
