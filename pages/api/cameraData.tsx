import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = `mongodb+srv://kennethzhang:${process.env.MONGO_PASSWORD}@cluster0.cptd5im.mongodb.net/?retryWrites=true&w=majority`;
    const { cameraName } = req.body;
    try {
        if (req.method === "POST") {
            const getCameraInfo = async () => {
                // const client = await MongoClient.connect("mongodb://localhost:27017/frame-rate");
                const client = await MongoClient.connect(uri);
                const db = client.db("frame-rate");
                const collection = db.collection(`${cameraName}`);
                // const data = await collection.find({}).toArray();
                const listOfPixelFormat: string[] = await collection.distinct(" PixelFormat");
                const listOfAdc: string[] = await collection.distinct(" ADC");
                const listOfHeight: string[] = await collection.distinct(" HEIGHT");
                const getFirstRecord = await collection.findOne();
                let maxWidth;
                if (getFirstRecord) {
                    maxWidth = getFirstRecord[" WIDTH"];
                }

                client.close();
                return { listOfPixelFormat, listOfAdc, listOfHeight, maxWidth };
            };
            const data = await getCameraInfo();
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const config = {
    api: { responseLimit: false },
};
