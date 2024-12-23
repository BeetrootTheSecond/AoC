function floodFillDFS(
  gardenPlots: {
    plant: string;
    x: number;
    y: number;
    plot: number;
    edges: Array<{ x: number; y: number }>;
  }[][],
  x: number,
  y: number,
  plant: string,
  plotId: number
) {
  let currentPlot = gardenPlots[y][x];
  if (currentPlot.plant != plant) {
    return false;
  }

  if (currentPlot.plot > -1) {
    return true;
  }

  currentPlot.plot = plotId;
  gardenPlots[y][x] = currentPlot;

  if (x - 1 < 0) {
    currentPlot.edges.push({ y, x: x - 1 });
  }
  if (y - 1 < 0) {
    currentPlot.edges.push({ y: y - 1, x });
  }
  if (y + 1 == gardenPlots.length) {
    currentPlot.edges.push({ y: y + 1, x });
  }
  if (x + 1 == gardenPlots[0].length) {
    currentPlot.edges.push({ y, x: x + 1 });
  }

  if (x - 1 >= 0) {
    let matchingPlant = floodFillDFS(gardenPlots, x - 1, y, plant, plotId);
    if (!matchingPlant) {
      currentPlot.edges.push({ y, x: x - 1 });
    }
  }
  if (y + 1 < gardenPlots.length) {
    let matchingPlant = floodFillDFS(gardenPlots, x, y + 1, plant, plotId);
    if (!matchingPlant) {
      currentPlot.edges.push({ y: y + 1, x });
    }
  }
  if (x + 1 < gardenPlots[0].length) {
    let matchingPlant = floodFillDFS(gardenPlots, x + 1, y, plant, plotId);
    if (!matchingPlant) {
      currentPlot.edges.push({ y, x: x + 1 });
    }
  }
  if (y - 1 >= 0) {
    let matchingPlant = floodFillDFS(gardenPlots, x, y - 1, plant, plotId);
    if (!matchingPlant) {
      currentPlot.edges.push({ y: y - 1, x });
    }
  }

  return true;
}

export const day12 = (data: string[], part: string) => {
  let gardenPlots = data.map((row, y) =>
    row.split("").map((cell, x) => ({ plant: cell, x, y, plot: -1, edges: [] }))
  );

  let nextPlotId = 0;
  for (let y = 0; y < gardenPlots.length; y++) {
    const row = gardenPlots[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell.plot == -1) {
        floodFillDFS(gardenPlots, x, y, cell.plant, nextPlotId);
        nextPlotId++;
      }
    }
  }

  let plots = gardenPlots.flat().reduce(
    (groupedPlots, plot) => {
      let currentGroup = groupedPlots[plot.plot] || [];

      currentGroup.push(plot);

      groupedPlots[plot.plot] = currentGroup;
      return groupedPlots;
    },
    {} as Record<
      number,
      Array<{
        plant: string;
        x: number;
        y: number;
        plot: number;
        edges: Array<{ x: number; y: number }>;
      }>
    >
  );

  let GroupedResults: Record<number, { area: number; perimeter: number }> = [];
  let starOneResult = 0;
  let starTwoResult = 0;

  for (let index = 0; index < Object.keys(plots).length; index++) {
    const plotId = parseInt(Object.keys(plots)[index]);
    const groupedPlots = plots[plotId];

    let allEdges: Array<{
      x: number;
      y: number;
    }> = [];

    groupedPlots.map((plot) => {
      allEdges.push(...plot.edges);
    });

    //let edges = allEdges.map(edge => edge.split('_'));

    GroupedResults[plotId] = {
      area: groupedPlots.length,
      perimeter: allEdges.length,
    };

    starOneResult += groupedPlots.length * allEdges.length;

    //calulate H sides
    allEdges.sort((a, b) => a.y - b.y && a.x - b.x);

    let Sides = allEdges.reduce(
      (sides, point) => {
        let pointSide = sides[point.y] || [];

        pointSide.push(point);

        sides[point.y] = pointSide;

        return sides;
      },
      {} as Record<
        number,
        Array<{
          x: number;
          y: number;
        }>
      >
    );

    let sideCounts = 0;
    for (let index = 0; index < Object.keys(Sides).length; index++) {
      const y = parseInt(Object.keys(Sides)[index]);

      let columnPoint = Sides[y];

      let startingX = columnPoint[0].x;
      let offset = 0;
      sideCounts++;

      for (let index = 1; index < columnPoint.length; index++) {
        const point = columnPoint[index];
        if (point.x - index + offset != startingX) {
          sideCounts++;
          startingX = point.x;
          offset = index;
        }
      }
    }

    starTwoResult += groupedPlots.length * sideCounts;
  }

  if (part == "1") {
    let starOne = starOneResult;
    console.log(starOneResult);
    return starOne;
  }
  let starTwo = starTwoResult;
  console.log(starTwoResult);
  return starTwo;
};
