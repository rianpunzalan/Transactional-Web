import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';


/* Delete the first document in the "users" collection that matches the specified filter document */
const filter = {name: "undefined"}; // Create a filter for users with the name "Pedro"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("sample_db");
        const users = await db
            .collection("users")
            .deleteOne(filter);                   //deletes a document according to the filter set
        res.json(users);                          //response will be the changes made
    } catch (e) {
        console.error(e);
    }
}

/*
The response will look like this.
{
  "acknowledged": true, //query was executed
  "deletedCount": 1,   //# of deleted documents
}
*/