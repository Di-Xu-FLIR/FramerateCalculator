import { MongoClient } from "mongodb";

//GET DATA FROM MONGODB AS A BACKUP METHOD
export const getData = async () => {
    const client = await MongoClient.connect("mongodb://localhost:27017/frame-rate", {});
    const collection = client.db().collection("BFS-U3-31S4C");
    const resp = await collection.find({}).limit(200).toArray();
    const data = await resp.json(resp);

    client.close();
    return data;
};
