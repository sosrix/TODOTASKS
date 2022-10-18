const alphabet = "abcdefghijklmnopqrstuvwxyz";

function getMissingLetters(str) {
  let missingLetters = "";
  for (let i = 0; i < alphabet.length; i++) {
    if (!str.toLowerCase().includes(alphabet[i])) {
      missingLetters += alphabet[i];
    }
  }
  console.log(missingLetters);
  return missingLetters;
}

getMissingLetters("Check missing letters in a sentence");
