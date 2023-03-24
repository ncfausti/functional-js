const { curry, split } = require("@mostly-adequate/support");

const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs) => xs.filter(f));
const map = curry((f, xs) => xs.map(f));

const words = (str) => split(" ", str);

const wordsInHW = () => words("Hello world");

console.log(wordsInHW());
