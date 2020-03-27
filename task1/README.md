# CLI Tool to encode or decode by Caesar's cipher

**This is a CLI tool that can encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool can accept 4 options (short alias and full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

**Details:**

1. Navigate to the program folder in your terminal.
2. Run

```bash
$ node index.js -a encode -s 7 -i "input/1.txt" -o "output/1.txt"
```

3. Action (encode/decode) and the shift are required.
4. You can either specify a file as an input or simply input text after the main command.
5. Same goes for the output file.
6. The tool only works with English alphabet, all other characters will be kept untouched.

**Usage example:**

```bash
$ node index.js -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node index.js --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node index.js --action decode --shift 7 --input decoded.txt --output plain.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
