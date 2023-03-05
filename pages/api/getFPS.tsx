import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = `mongodb+srv://kennethzhang:${process.env.MONGO_PASSWORD}@cluster0.cptd5im.mongodb.net/?retryWrites=true&w=majority`;
    const { cameraName, ISP, ADC, pixelFormat, Height } = req.body;

    try {
        if (req.method === "POST") {
            const getFpsInfo = async () => {
                // const client = await MongoClient.connect("mongodb://localhost:27017/frame-rate");
                const client = await MongoClient.connect(uri);
                const db = client.db("frame-rate");
                const collection = db.collection(`${cameraName}`);
                const data = await collection.findOne({
                    " PixelFormat": pixelFormat,
                    " HEIGHT": Height,
                    " ADC": ADC,
                    " ISP": ISP,
                });
                client.close();
                if (data) {
                    return data[" FPS "];
                } else {
                    return undefined;
                }
            };
            const data = await getFpsInfo();
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const config = {
    api: { responseLimit: false },
};
