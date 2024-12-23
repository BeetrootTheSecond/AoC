function floodFillDFS(
  gardenPlots: {
    plant: string;
    x: number;
    y: number;
    plot: number;
    edges: Array<string>;
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
    currentPlot.edges.push(`${y}_${x - 1}`);
  }
  if (y - 1 < 0) {
    currentPlot.edges.push(`${y - 1}_${x}`);
  }
  if (y + 1 == gardenPlots.length) {
    currentPlot.edges.push(`${y + 1}_${x}`);
  }
  if (x + 1 == gardenPlots[0].length) {
    currentPlot.edges.push(`${y}_${x + 1}`);
  }

  if (x - 1 >= 0) {
    let matchingPlant = floodFillDFS(gardenPlots, x - 1, y, plant, plotId);
    if (!matchingPlant) {
      currentPlot.edges.push(`${y}_${x - 1}`);
    }
  }
  if (y + 1 < gardenPlots.length) {
    let matchingPlant = floodFillDFS(gardenPlots, x, y + 1, plant, plotId);
    if (!matchingPlant) {
      currentPlot.edges.push(`${y + 1}_${x}`);
    }
  }
  if (x + 1 < gardenPlots[0].length) {
    let matchingPlant = floodFillDFS(gardenPlots, x + 1, y, plant, plotId);
    if (!matchingPlant) {
      currentPlot.edges.push(`${y}_${x + 1}`);
    }
  }
  if (y - 1 >= 0) {
    let matchingPlant = floodFillDFS(gardenPlots, x, y - 1, plant, plotId);
    if (!matchingPlant) {
      currentPlot.edges.push(`${y - 1}_${x}`);
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
        edges: Array<string>;
      }>
    >
  );

  let GroupedResults: Record<number, { area: number; perimeter: number }> = [];
  let starOneResult = 0;

  for (let index = 0; index < Object.keys(plots).length; index++) {
    const plotId = parseInt(Object.keys(plots)[index]);
    const groupedPlots = plots[plotId];

    let allEdges: string[] = [];

    groupedPlots.map((plot) => {
      allEdges.push(...plot.edges);
    });

    //allEdges = Array.from(new Set(allEdges));

    GroupedResults[plotId] = {
      area: groupedPlots.length,
      perimeter: allEdges.length,
    };

    starOneResult += groupedPlots.length * allEdges.length;
  }

  if (part == "1") {
    let starOne = starOneResult;
    console.log(starOneResult);
    return starOne;
  }
};
