import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

//assemble the document aka the database entry.
//make a JavaScript Object Literal like the one below. 
//const object_name = { name:value, name:value, ...};
//where "name" matches the fields(aka database columns) in the MongoDB

const new_document = {
    name: "Sample Name",
    size: "300",
    imgsrc: "Sample Img src"
  };

export default async (req: NextApiRequest, res: NextApiResponse) => {   //these are built in NextJs functions
    try {                                                               //Represents the completion of an asynchronous operation.
        const client = await clientPromise;                             //This means variable client will wait for a response before proceeding. 
        const db = client.db("sample_db");      //specify the database name      
        const users = await db                  //wait again for db before accessing a collection(aka database table)
            .collection("users")                //specify the collection name
            .insertOne(new_document);           //execute the insertion
        res.json(users);                        //show response from the execution
    } catch (e) {
        console.error(e);
    }
}