export const day8 = (data: string[], part: string) => {
  let mapLocation = data.map((row) => row.split(""));

  let antennas = mapLocation
    .map((row, y) => row.map((freq, x) => ({ freq, x, y})))
    .flat()
    .filter((a) => a.freq != '.')
    .reduce((mergeFreq, freq) => {
      mergeFreq[freq.freq]
        ? mergeFreq[freq.freq].push(freq)
        : (mergeFreq[freq.freq] = [freq]);
      return mergeFreq;
    }, {} as Record<string, Array<{ freq: string; x: number; y: number }>>);

    let allAnitnode = [];

  for (let freq in antennas) {
    let anitnode = antennas[freq].map((node, index, allNodes) => {
      return allNodes.map((nextNode) => {
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
      }).filter((node) => node != null);
    }).flat()
      .filter(
        (aN) =>
          aN.x >= 0 &&
          aN.x < mapLocation[0].length &&
          aN.y >= 0 &&
          aN.y < mapLocation.length
      );

    allAnitnode.push(...anitnode);
  }

  let starOne = allAnitnode.reduce((uniqueNodes, node) => {
    if (!uniqueNodes.includes(`${node.x}-${node.y}`)) {
      uniqueNodes.push(`${node.x}-${node.y}`);
    }
    return uniqueNodes;
  }, [] as string[]);
  console.log(starOne.length);

  if (part == "1") {
    console.log(`Star One : ${starOne.length}`);
    return;
  }
};
