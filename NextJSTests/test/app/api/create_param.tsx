import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from "mongodb";



export default async (req: NextApiRequest, res: NextApiResponse) => {   //these are built in NextJs functions
    try {

        const name =`${req.query.name}`;
        const size =`${req.query.size}`;
        const imgsrc =`${req.query.imgsrc}`;

        const new_document = {
            name: name,
            size: size,
            imgsrc: imgsrc
          };                
                                                
        const client = await clientPromise;     
        const db = client.db("sample_db");           
        const users = await db                  
            .collection("users")                
            .insertOne(new_document,);           
        res.json(users);                        
    } catch (e) {
        console.error(e);
    }
}