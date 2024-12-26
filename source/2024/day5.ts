
export const day5 = (data: string[], part: string) => {
  //split data into array of  page ordering rules and pages to produce
  let splitIndex = data.indexOf("");
  let PoR = data
    .slice(0, splitIndex)
    .map((row) => row.split("|"))
    .map((item) => item.map((p) => parseInt(p))).reduce((sorted, val) => {
      //console.log(val[0]);
      sorted[val[0]] ? sorted[val[0]].push(val[1]) : sorted[val[0]] = [val[1]];
      return sorted;
    }, {} as Record<number, Array<number>>);

  let PoP = data
    .slice(splitIndex + 1)
    .map((row) => row.split(",").map((item) => parseInt(item)));

  let correctPagesMiddles: number[] = [];


  let incorrectPageUpdates = [];

  for (let i = 0; i < PoP.length; i++) {
    const page = PoP[i];

    let pageCorrect = page.every((pageRef, index, pageSet) => {
      let pageRules = PoR[pageRef] || [];

      let beforePage = pageSet.slice(0, index);
      let afterPage = pageSet.slice(index + 1);

      let beforeCheck = pageRules.every(pR => !beforePage.includes(pR));
      //let afterCheck = pageRules.some(pR => afterPage.includes(pR));

      //console.log(`pageRef ${pageRef} : ${beforeCheck}`);

      return beforeCheck;
    })


    if (pageCorrect) {
      correctPagesMiddles.push(page[Math.floor(page.length / 2)]);
      //console.log(correctPagesMiddles);
    } else {
      incorrectPageUpdates.push(page);
    }




    //console.log(page);
    //console.log(`Correct ${pageCorrect}`);
  }

  if (part == "1") {
    let starOneTotal = correctPagesMiddles.reduce((total, p) => total += p);

    //console.log(`Star 1 Result : ${starOneTotal} `);
    return starOneTotal;
  }


  let newlyCorrectedPages: number[] = [];


  let reOrderedPageUpdates = incorrectPageUpdates.map((pages) => {

    for (let index = 0; index < pages.length; index++) {

      const pageChecker = (pages: number[], index: number) => {
        const pageRef = pages[index];
        const pageRules = PoR[pageRef] || [];


        let beforePage = pages.slice(0, index);
        let afterPage = pages.slice(index + 1);

        //let afterCheck = afterPage.some(pR => pageRules.includes(pR));
        let beforeCheck = pageRules.every(pR => !beforePage.includes(pR));

        if (!beforeCheck) {
          [pages[index], pages[index - 1]] = [pages[index - 1], pages[index]];

          pages = pageChecker(pages, index - 1);

        }
        return pages;

      }

      pages = pageChecker(pages, index);


    }


    newlyCorrectedPages.push(pages[Math.floor(pages.length / 2)]);
    //console.log(pages);

    return pages;
  });





  let starTwoTotal = newlyCorrectedPages.reduce((total, p) => total += p);

  //console.log(`Star 2 Result : ${starTwoTotal}`);
  return starTwoTotal;
};
