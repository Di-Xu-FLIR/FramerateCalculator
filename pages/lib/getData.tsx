import { MongoClient } from "mongodb";

//GET DATA FROM MONGODB AS A BACKUP METHOD
export const getData = async () => {
    const client = await MongoClient.connect("mongodb://localhost:27017/frame-rate", {});
    const collection = client.db().collection("BFS-U3-31S4C");
    const data = await collection.find({}).limit(2).toArray();

    client.close();
    return data;
};

export const getListOfAvailableModels = async () => {
    const client = await MongoClient.connect("mongodb://localhost:27017/frame-rate");
    const db = client.db("frame-rate");
    const collections = await db.listCollections().toArray();
    const data = collections.map((collection) => collection.name);

    client.close();
    return data;
};
