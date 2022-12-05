import { open } from "node:fs/promises";
import path from "path"
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = await open(path.join(__dirname, "input.txt"));

let c = 0;
const input = fs.readFileSync(path.join(__dirname, "input.txt"), 'utf-8').split(/\r?\n/)
console.log(input.length)
for await (const line of input) {
// for await (const line of file.readLines()) {
  c++;
  if (c < 5) {
    console.log(line);
  }
}
