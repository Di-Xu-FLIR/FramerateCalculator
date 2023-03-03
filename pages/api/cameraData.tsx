import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cameraName = req.body;
    try {
        if (req.method === "POST") {
            const getCameraInfo = async () => {
                const client = await MongoClient.connect("mongodb://localhost:27017/frame-rate");
                const db = client.db("frame-rate");
                const collection = client.db().collection(`${cameraName}`);
                const data = await collection.find({}).limit(2).toArray();

                client.close();
                return data;
            };
            const data = await getCameraInfo();
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
