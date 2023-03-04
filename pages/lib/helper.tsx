export const data = [
    {
        _id: "6402457e837556fcaf93c50b",
        Model: "BFS-U3-31S4C",
        " PixelFormat": "Mono8",
        " WIDTH": "2048",
        " HEIGHT": "6",
        " ISP": "ON",
        " ADC": "12 Bit",
        " BINX": "1",
        " BINY": "1",
        " FPS ": "1000.000",
    },
    {
        _id: "6402457e837556fcaf93c50c",
        Model: "BFS-U3-31S4C",
        " PixelFormat": "Mono8",
        " WIDTH": "2048",
        " HEIGHT": "8",
        " ISP": "ON",
        " ADC": "12 Bit",
        " BINX": "1",
        " BINY": "1",
        " FPS ": "1000.000",
    },
    {
        _id: "6402457e837556fcaf93c50c",
        Model: "BFS-U3-31S4C",
        " PixelFormat": "Mono16",
        " WIDTH": "2048",
        " HEIGHT": "8",
        " ISP": "ON",
        " ADC": "12 Bit",
        " BINX": "1",
        " BINY": "1",
        " FPS ": "1000.000",
    },
];

export const findDistinct = (modelInfo: any[]) => {
    const result: string[] = [];
    for (let i = 0; i < modelInfo.length; i++) {
        const pixelFormat = modelInfo[i][" PixelFormat"];
        if (result.includes(pixelFormat)) {
            continue;
        } else {
            result.push(pixelFormat);
        }
    }
    return result;
};
