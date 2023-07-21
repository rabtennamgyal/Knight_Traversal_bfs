// below are the codes relating to the dom
const chessBoardDom = document.getElementById("chessBoard");

for (let i = 1; i <= 64; i++) {
  const sq = document.createElement("div");
  sq.classList.add("sq");
  chessBoardDom.appendChild(sq);
}

const squares = document.querySelectorAll(".sq");

let state = true;
let nums = [8, 16, 24, 32, 40, 48, 56, 64];

for (let i = 0; i <= 63; i++) {
  nums.forEach((el) => {
    if (i === el) {
      state = !state;
    }
  });

  if (state) {
    squares[i].style.backgroundColor = "#f3ffcf";
    state = false;
  } else {
    squares[i].style.backgroundColor = "#81b64c";
    state = true;
  }
}

let cloneSqs = Array.from(squares);
let arrs = [];

let x = 0;
let y = 0;

while (cloneSqs.length !== 0) {
  let arr = cloneSqs.splice(0, 8);

  arrs.push(arr);
}

for (let i = 0; i < arrs.length; i++) {
  let cur = arrs[i];
  let x = i;
  let y = 0;

  cur.forEach((el) => {
    el.setAttribute("coords", `${x}, ${y}`);
    y = y + 1;
  });
}

// below are codes relating to the actual algorithms
function moveKnightDom(end) {
  // make a function to clear the knight from the dom after it 
  // already visited the squares.


  let knight = "./assets/knight.svg";

  // creating a div for the knight
  let createDomNode = document.createElement("div");
  createDomNode.classList.add("knight");
  // creating the img element
  let img = document.createElement("img");
  img.src = knight;

  createDomNode.appendChild(img);

  let target;
  squares.forEach((el) => {
    let coords = el.getAttribute("coords").split(",");
    let x = Number(coords[0]);
    let y = Number(coords[1]);

    if (x === end[0] && y === end[1]) {
      target = el;
    }
  });

  target.appendChild(createDomNode);
}

function createBoard() {
  const arr = [];

  for (let r = 0; r < 8; r++) {
    arr.push([]);

    for (let c = 0; c < 8; c++) {
      arr[r].push(r + "," + c);
    }
  }

  return arr;
}

const chessBoard = createBoard();

const moves = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

const getNeighbors = (curRow, curCol) => {
  const neighbors = [];

  for (const direction of moves) {
    const [x, y] = direction;

    const nRow = x + curRow;
    const nCol = y + curCol;

    if (nRow >= 0 && nRow <= 7 && nCol >= 0 && nCol <= 7) {
      neighbors.push([nRow, nCol]);
    }
  }

  return neighbors;
};

function moveKnight(start, end) {
  let queue = [[start]];
  const visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];
    const row = current[0];
    const col = current[1];

    if (row === end[0] && col === end[1]) {
      // create the knight ( get the image )

      // append the knight on the board
      path.forEach((el) => {
        moveKnightDom(el)
      })

      return path;
    }

    for (const el of getNeighbors(row, col)) {
      const [x, y] = el;

      if (!visited.has([x, y].toString())) {
        visited.add([x, y].toString());
        const newpath = [...path, [x, y]];
        queue.push(newpath);
      }
    }
  }
}

console.log(moveKnight([7, 0], [0, 0]));
