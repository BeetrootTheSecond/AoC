export const day8 = (data: string[], part: string) => {
  let mapLocation = data.map((row) => row.split(""));

  //console.table(mapLocation);

  let antennas = mapLocation
    .map((row, rowIndex) => {
      let newAntennas = row.map((column, columnIndex) => {
        if (column == ".") {
          return;
        }
        return { freq: column, x: columnIndex, y: rowIndex };
      });
      return newAntennas;
    })
    .flat()
    .filter((a) => a != undefined)
    .reduce((mergeFreq, freq) => {
      mergeFreq[freq.freq]
        ? mergeFreq[freq.freq].push(freq)
        : (mergeFreq[freq.freq] = [freq]);
      return mergeFreq;
    }, {} as Record<string, Array<{ freq: string; x: number; y: number }>>);

  console.table(antennas);

  let allAnitnode = [];

  for (let freq in antennas) {
    let anitnode = antennas[freq].map((node, index, allNodes) => {
      let newAntinodes = allNodes.map((nextNode) => {
        if (node == nextNode) {
          return null;
        }

        let xDifference = nextNode.x - node.x;
        let yDifference = nextNode.y - node.y;

        return {
          freq: node.freq,
          x: node.x - xDifference,
          y: node.y - yDifference,
        };
      });

      return newAntinodes.filter((node) => node != null);
    });

    let noneDulicapes = anitnode
      .flat()
      .filter(
        (aN) =>
          aN.x >= 0 &&
          aN.x < mapLocation[0].length &&
          aN.y >= 0 &&
          aN.y < mapLocation.length
      );

    allAnitnode.push(...noneDulicapes);
  }

  let starOne = allAnitnode.reduce((uniqueNodes, node) => {
    if (!uniqueNodes.includes(`${node.x}-${node.y}`)) {
      uniqueNodes.push(`${node.x}-${node.y}`);
    }
    return uniqueNodes;
  }, [] as string[]);
  console.log(starOne.length);

  if (part == "1") {
    console.log(`Star One : ${starOne.length} `);
    return;
  }
};
