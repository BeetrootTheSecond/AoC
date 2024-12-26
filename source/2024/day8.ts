export const day8 = (data: string[], part: string) => {
  let mapLocation = data.map((row) => row.split(""));

  let antennas = mapLocation
    .map((row, y) => row.map((freq, x) => ({ freq, x, y })))
    .flat()
    .filter((a) => a.freq != ".")
    .reduce((mergeFreq, freq) => {
      mergeFreq[freq.freq]
        ? mergeFreq[freq.freq].push(freq)
        : (mergeFreq[freq.freq] = [freq]);
      return mergeFreq;
    }, {} as Record<string, Array<{ freq: string; x: number; y: number }>>);

  if (part == "1") {
    let allAnitnode = [];

    for (let freq in antennas) {
      let anitnode = antennas[freq]
        .map((node, index, allNodes) => {
          return allNodes
            .map((nextNode) => {
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
            })
            .filter((node) => node != null);
        })
        .flat()
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

    //console.log(`Star One : ${starOne.length}`);
    return starOne.length;
  }

  let allAnitnode = [];

  for (let freq in antennas) {
    let anitnode = antennas[freq]
      .map((node, index, allNodes) => {
        return allNodes
          .map((nextNode) => {
            if (node == nextNode) {
              return node;
            }

            let xDifference = nextNode.x - node.x;
            let yDifference = nextNode.y - node.y;
            let newNodes = [{
              freq: node.freq,
              x: node.x - xDifference,
              y: node.y - yDifference,
            }];

            while (newNodes[newNodes.length - 1].x >= 0,
              newNodes[newNodes.length - 1].x >= 0 &&
              newNodes[newNodes.length - 1].x < mapLocation[0].length &&
              newNodes[newNodes.length - 1].y >= 0 &&
              newNodes[newNodes.length - 1].y < mapLocation.length
            ) {
              newNodes.push({
                freq: node.freq,
                x: newNodes[newNodes.length - 1].x - xDifference,
                y: newNodes[newNodes.length - 1].y - yDifference,
              })
            }
            return newNodes;
          }).flat()
          .filter((node) => node != null);
      })
      .flat()
      .filter(
        (aN) =>
          aN.x >= 0 &&
          aN.x < mapLocation[0].length &&
          aN.y >= 0 &&
          aN.y < mapLocation.length
      );

    allAnitnode.push(...anitnode);
  }

  let starTwo = allAnitnode.reduce((uniqueNodes, node) => {
    if (!uniqueNodes.includes(`${node.x}-${node.y}`)) {
      uniqueNodes.push(`${node.x}-${node.y}`);
    }
    return uniqueNodes;
  }, [] as string[]);



  //console.log(`Star Two : ${starTwo.length}`);
  return starTwo.length;
};
