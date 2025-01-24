export const day4 = (data: string[], part: string) => {
  let rooms = data.map((room) => {
    let checkSum = room.substring(room.length - 6, room.length - 1);
    let sectorID = parseInt(room.substring(room.length - 10, room.length - 7));
    let words = room.substring(0, room.length - 11).split("-");

    let letterCounts = words
      .join("")
      .split("")
      .reduce((letterCount, nextLetter) => {
        letterCount[nextLetter] = letterCount[nextLetter] + 1 || 1;

        return letterCount;
      }, {} as Record<string, number>);
    let letters = [...new Set(words.join(""))]
      .sort()
      .sort((a, b) => letterCounts[b] - letterCounts[a]);
    let newCheckSum = [...letters].splice(0, 5).join("");

    let decodedName = words
      .join(" ")
      .split("")
      .map((letter) => {
        if (letter == " ") {
          return letter;
        }

        let charNumber = letter.charCodeAt(0) - 97;

        let shiftCipher = (charNumber + sectorID) % 26;
        let newLetter = String.fromCharCode(shiftCipher + 97);
        return newLetter;
      })
      .join("");

    let roomObj = {
      words,
      checkSum,
      letterCounts,
      letters,
      newCheckSum,
      sectorID,
      decodedName,
    };

    return roomObj;
  });

  let realRooms = rooms.filter((room) => room.checkSum == room.newCheckSum);

  let partone = realRooms.reduce((total, room) => total + room.sectorID, 0);

  if (part == "1") {
    return partone;
  }

  let NorthRooms = realRooms.filter((room) =>
    room.decodedName.includes("north")
  );
  return NorthRooms[0].sectorID;
};
