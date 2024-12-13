
export const day9 = (data: string[], part: string) => {

    const blocksString = data[0].split('')

    let blockId = -1;
    let blocks = [];
    for (let index = 0; index < blocksString.length; index++) {
        const block = blocksString[index];
        let isFileBlock = index % 2 == 0;
        if (!isFileBlock) {
            blocks.push({ id: 'fs', value: '.', fileCount: parseInt(block) })

        } else {

            blockId++;

            blocks.push({ id: blockId.toString(), value: blockId.toString(), fileCount: parseInt(block) })
        }

    };

    let fileSystem = blocks.reduce((output, fileBlock) => {

        for (let index = 0; index < fileBlock.fileCount; index++) {

            output.push(fileBlock)
        }

        return output;
    }, [] as {
        id: string, value: string, fileCount: number
    }[])


    console.log(fileSystem)

    for (let indexReserve = fileSystem.length - 1; indexReserve > 0; indexReserve--) {
        const fileblockReserve = fileSystem[indexReserve];
        if (fileblockReserve.value == '.') {
            continue;
        }

        // let fileSystemState = fileSystem.reduce((output, block) => {
        //     output = `${output}${block.value}`;

        //     return output;
        // }, '');

        //console.log(fileSystemState);

        let breakFlag = false;
        // find just fs at the from begining
        for (let index = 0; index < fileSystem.length - 1; index++) {
            const fileblock = fileSystem[index];
            if (index >= indexReserve) {
                breakFlag = true;
                break;
            }
            if (fileblock.value == '.') {

                [fileSystem[index], fileSystem[indexReserve]] = [fileSystem[indexReserve], fileSystem[index]];

                break;
            }

        }

        if (breakFlag) {
            break;
        }


    }

    let starOne = fileSystem.reduce((total, fB, index) => {
        if (fB.id != 'fs') {
            total += (index * parseInt(fB.value));
        }
        return total;
    }, 0 as number)


    if (part == '1') {
        console.log(`Star One Result : ${starOne}`);
        return;
    }

}