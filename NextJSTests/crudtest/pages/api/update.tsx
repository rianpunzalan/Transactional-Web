import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';


    
const filter = {name: "Sample Name"} // Create a filter for users with the name "Sample Name"
const options = { upsert: true }; /* Set the upsert option to insert a document if no documents match the filter */

 // Specify the update to set a value for the chosen field(attribute)
 // In this case we are updating the name from "Sample Name" to "Pedro", size to 999 and imgsrc to ../img/Pedro.jpg

 //declarations of variables
const file_name = "Pedro.jpg";
const size = "999";
                                   
const updateDoc = {                     //in here we can either input..
    $set: {
        name:   "Pedro",                //hardcoded value
        size:   size,                   //value from a variable
        imgsrc: `../img/${file_name}`   //value inside a string (String interpolation)
    },                                  //warning: use (`) key right below ESC on your keyboard, not the (') single quotation mark
  };

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("sample_db");
        const users = await db
            .collection("users")
            .updateOne(filter,updateDoc,options); //put them all together into this line to execute.
        res.json(users);                          //response will be the changes made
    } catch (e) {
        console.error(e);
    }
}

/*
The response will look like this.
{
  "acknowledged": true, //query was executed
  "modifiedCount": 1,   //# of updated documents
  "upsertedId": null,   //Id of the document if there was nothing to update 
  "upsertedCount": 0,   //# of inserted documents if data was nonexistent
  "matchedCount": 1     //# of matches with the filter
}
*/