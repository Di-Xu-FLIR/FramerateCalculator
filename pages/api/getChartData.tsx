import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { cameraName, ISP, ADC, pixelFormat } = req.body;
    console.log(
        "====================api FPS DATA TO BACKEND SUCCESSFUL",
        cameraName,
        ISP,
        ADC,
        pixelFormat
    );
    try {
        if (req.method === "POST") {
            const getChartData = async () => {
                const client = await MongoClient.connect("mongodb://localhost:27017/frame-rate");
                const collection = client.db().collection(`${cameraName}`);
                const data = await collection
                    .find({
                        " PixelFormat": pixelFormat,
                        " ADC": ADC,
                        " ISP": ISP,
                    })
                    .toArray();
                client.close();

                return data;
            };
            const data = await getChartData();
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const config = {
    api: { responseLimit: false },
};
