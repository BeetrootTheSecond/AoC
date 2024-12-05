function checker(letter: string | undefined) {
  return letter || ".";
}

export const day4 = (data: string[], part: string) => {
  const searchWord = [..."XMAS"];

  const wordSearchArray = data.map((row) => row.split(""));

  let wordFound = [];
  for (let i = 0; i < wordSearchArray.length; i++) {
    const row = wordSearchArray[i];
    for (let j = 0; j < row.length; j++) {
      const letter = row[j];

      if (letter == "X") {
        // first letter of search word is found
        //horizontal forwards
        wordFound.push({
          word: [
            checker(row[j]),
            checker(row[j + 1]),
            checker(row[j + 2]),
            checker(row[j + 3]),
          ],
          i,
          j,
          direction: "HF",
        });
        //horizontal backwards
        wordFound.push({
          word: [
            checker(row[j]),
            checker(row[j - 1]),
            checker(row[j - 2]),
            checker(row[j - 3]),
          ],
          i,
          j,
          direction: "HB",
        });

        if (i >= 3) {
          //vertical upwards
          wordFound.push({
            word: [
              checker(wordSearchArray[i][j]),
              checker(wordSearchArray[i - 1][j]),
              checker(wordSearchArray[i - 2][j]),
              checker(wordSearchArray[i - 3][j]),
            ],
            i,
            j,
            direction: "VU",
          });
          //diagonal) up left
          wordFound.push({
            word: [
              checker(wordSearchArray[i][j]),
              checker(wordSearchArray[i - 1][j - 1]),
              checker(wordSearchArray[i - 2][j - 2]),
              checker(wordSearchArray[i - 3][j - 3]),
            ],
            i,
            j,
            direction: "DUL",
          });
          //diagonal up right
          wordFound.push({
            word: [
              checker(wordSearchArray[i][j]),
              checker(wordSearchArray[i - 1][j + 1]),
              checker(wordSearchArray[i - 2][j + 2]),
              checker(wordSearchArray[i - 3][j + 3]),
            ],
            i,
            j,
            direction: "DUR",
          });
        }
        if (i + 3 < wordSearchArray.length) {
          //vertical downwards
          wordFound.push({
            word: [
              checker(wordSearchArray[i][j]),
              checker(wordSearchArray[i + 1][j]),
              checker(wordSearchArray[i + 2][j]),
              checker(wordSearchArray[i + 3][j]),
            ],
            i,
            j,
            direction: "VD",
          });
          //diagonal down right
          wordFound.push({
            word: [
              checker(wordSearchArray[i][j]),
              checker(wordSearchArray[i + 1][j + 1]),
              checker(wordSearchArray[i + 2][j + 2]),
              checker(wordSearchArray[i + 3][j + 3]),
            ],
            i,
            j,
            direction: "DDR",
          });
          //diagonal down left
          wordFound.push({
            word: [
              checker(wordSearchArray[i][j]),
              checker(wordSearchArray[i + 1][j - 1]),
              checker(wordSearchArray[i + 2][j - 2]),
              checker(wordSearchArray[i + 3][j - 3]),
            ],
            i,
            j,
            direction: "DDL",
          });
        }
      }
    }
  }

  let filteredwordFound = wordFound.filter(
    (wordData) => wordData.word.join() == searchWord.join()
  );

  if (part == "1") {
    console.log(`Star 1 Result : ${filteredwordFound.length}`);
    return;
  }

  console.log(`Star 2 Result : `);
  return;
};




//2388 too low 