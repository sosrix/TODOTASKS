const { readFileSync } = require("fs");

let triangleArr;

function readFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  triangleArr = contents
    .trim()
    .split(/\r?\n/)
    .map((row) => row.trim().split(/\s/))
    .map((row) => row.map((num) => +num));

  console.log(triangleArr);
}

readFile("./triangle.txt");

while (triangleArr.length !== 1) {
  let arrLen = triangleArr.length;
  let newRow = [];
  let lastDig = triangleArr[arrLen - 1];

  for (let i = 0; i <= triangleArr[arrLen - 2].length - 1; i++) {
    newRow.push(
      Math.max(
        triangleArr[arrLen - 2][i] + lastDig[i] || 0,
        triangleArr[arrLen - 2][i] + lastDig[i + 1] || 0
      )
    );
  }

  triangleArr.pop();
  triangleArr.pop();
  triangleArr.push(newRow);
}

// result!
console.log("result : ", triangleArr[0][0]);
