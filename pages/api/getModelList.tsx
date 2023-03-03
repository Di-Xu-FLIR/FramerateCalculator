import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const getListOfAvailableModels = async () => {
                const client = await MongoClient.connect("mongodb://localhost:27017/frame-rate");
                const db = client.db("frame-rate");
                const collections = await db.listCollections().toArray();
                const data = collections.map((collection) => collection.name);
                client.close();
                return data;
            };
            const data = await getListOfAvailableModels();
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
