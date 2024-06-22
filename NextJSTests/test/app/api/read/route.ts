import { MongoClient } from 'mongodb'; 

export default async function handler(req, res) {
  
  if (req.method === 'GET') { 
    const client = new MongoClient(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    }); 
  
    try { 
      await client.connect(); 
      const database = client.db('sample_db'); // Choose a name for your database 
      const collection = database.collection('users'); // Choose a name for your collection 
      const allData = await collection.find({}).toArray(); 
  
      res.status(200).json(allData); 
    } catch (error) { 
      res.status(500).json({ message: 'Something went wrong!' }); 
    } finally { 
      await client.close(); 
    } 
  } else { 
    res.status(405).json({ message: 'Method not allowed!' }); 
  } 
}