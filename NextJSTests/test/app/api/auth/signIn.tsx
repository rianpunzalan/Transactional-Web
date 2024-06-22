import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';


export async function signIn (req: NextApiRequest, res: NextApiResponse,{username,password}) {
    try {
        const client = await clientPromise;
        const db = client.db("sample_db");
        const user = await db
            .collection("users")
            .findOne({"name":{username},"password":{password}});
        res.json(user);
       
    } catch (e) {
        console.error(e);
    }
}