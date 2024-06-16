import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = `${req.query.id}`;   //you are setting id as a route parameter.
                                        //http://localhost:3000/api/read_param?id=
        const name =`${req.query.name}`;

        const client = await clientPromise;
        const db = client.db("sample_db");
        const users = await db
            .collection("users")
            .find({"name":name})
            //.find({"_id": new ObjectId(id)})        //Id is stored as an objectID so you need to convert string to ObjectID            
            //.find({ name:  {$regex: name}})           //regex(REGular EXpression) highly customizable, behaves like %name% in sql.
            //.find({"_id": new ObjectId(id),"name":name}) // has more than 1 filters
            .limit(10)
            .toArray();

        res.json(users);
    } catch (e) {
        console.error(e);
    }
}