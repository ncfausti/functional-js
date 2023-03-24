target = 20;

const matrix = [
  [1, 4, 7, 11, 15, 18, 11],
  [2, 5, 8, 12, 19, 28, 22],
  [3, 6, 9, 16, 22, 62, 65],
  [10, 13, 14, 17, 24, 41, 43],
  [18, 21, 23, 26, 30, 44, 56],
  [18, 21, 23, 26, 30, 44, 77],
  [13, 20, 28, 27, 31, 45, 79],
];
const table = document.createElement("table"); // create a table element
// compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
const range = (n) => Array.from({ length: n }, (_, i) => i);
// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}
function zip(...arrays) {
  const minLength = Math.min(...arrays.map((arr) => arr.length));
  return Array.from({ length: minLength }, (_, i) =>
    arrays.map((arr) => arr[i])
  );
}
const map = curry((f, xs) => xs.map(f));

// create table rows
const tableRows = matrix.map((row, i) => {
  // create table cells
  const tableCells = row.map((cellValue, j) => {
    // create a cell element
    const td = document.createElement("td");
    td.id = `${i},${j}`;
    // create a text node with the value of the cell
    const textNode = document.createTextNode(cellValue);

    // add the text node to the cell element
    td.appendChild(textNode);

    // return the cell element
    return td;
  });

  // create a row and append cells to it
  const tr = document.createElement("tr");
  tableCells.forEach((cell) => tr.appendChild(cell));

  // return the row
  return tr;
});

// append the row elements to the table element
tableRows.forEach((row) => table.appendChild(row));

// append the table element to the body of the HTML document
document.body.appendChild(table);

// highlight single value
// highlight col
// highlight row
// highlight last item in each row
// highlight last item in each col
const indices = () => matrix.map((row, i) => row.map((v, j) => `${i},${j}`));
const transposed = (i, j) =>
  matrix.map((row, i) => row.map((v, j) => `${j},${i}`));

/* console.log(indices()); */
const col = (n) => matrix.map((row, i, arr) => row[n]);
const row = (n) => matrix[n];
const cols = (matrix) => range(matrix.length).map((i) => col(i));
const rows = () => matrix;

/* console.log(rows()); */

const highlight = (el) => (el.className = "highlight");
const cell = (s) => document.getElementById(s);
const last = (ls) => ls[ls.length - 1];
const first = (ls) => ls[0];

const mid = (ls) => ls[Math.floor(ls.length / 2)];

const midCol = compose(mid, cols);
const midRow = compose(mid, rows);

const lastCol = compose(last, cols);
const lastRow = compose(last, rows);

const firstRow = () => row(0);
const firstCol = () => col(0);

const lastRowIds = compose(last, indices);
const firstRowIds = compose(first, indices);

const colIds = compose(cols, indices);

const firstColIds = compose(first, transposed);
const lastColIds = compose(last, transposed);

const midRowIds = compose(mid, indices);
const midColIds = compose(mid, transposed);

const lastColCells = compose(map(cell), lastColIds);
const firstColCells = compose(map(cell), firstColIds);
const firstRowCells = compose(map(cell), firstRowIds);
const lastRowCells = compose(map(cell), lastRowIds);

const midRowCells = compose(map(cell), midRowIds);
const midColCells = compose(map(cell), midColIds);

const highlightLastCol = compose(map(highlight), lastColCells);
const highlightFirstCol = compose(map(highlight), firstColCells);
const highlightFirstRow = compose(map(highlight), firstRowCells);
const highlightLastRow = compose(map(highlight), lastRowCells);

const highlightMidRow = compose(map(highlight), midRowCells);
const highlightMidCol = compose(map(highlight), midColCells);

highlightLastRow();
highlightLastCol();
highlightFirstCol();
highlightFirstRow();

highlightMidRow();
highlightMidCol();

const getLastColCells = compose(map(cell), map(indices));
