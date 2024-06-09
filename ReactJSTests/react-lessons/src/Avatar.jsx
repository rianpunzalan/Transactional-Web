//import dp1 from './img/Rian.jpeg';
import { getImageUrl } from './utils';
import { useState, useEffect } from 'react';
/* function Avatar() {
    return (
      <img
        className="avatar"
        src={require('./img/Rian.jpeg')}
        //src={dp1}
        alt="Lin Lanying"
        width={100}
        height={100}
      />
    );
  }
   
 export default function Profile() {
    return (
      <Avatar />
    );
  } */
/*   
  function Avatar({person}) {
    return (
      <img
        className="avatar"
        alt={person.name}
//        src={require('./img/'+person.imgsrc+'.jpeg')}
        src={require(''+getImageUrl(person.imgsrc)+'')}
        width={person.size}
        height={person.size}
      />
    );
  }  
  export default function Profile() {
    return (
      <Avatar
        person={{ name: 'Rian Punzalan', size:'100',imgsrc:'Rian'}}
      />
    );
  } */
      
  function Avatar() {
    //declare useState
    const [ items, setItems ] = useState([]); //array, function that modifies the array.

    async function getdatafromDB(client) {
      const cursor = await client.db("sample_db").collecton("users").find({})
        .sort({ last_review: -1 });
        //.limit(maximumNumberOfResults);
    const results = await cursor.toArray();
  
      if (results) {
          //console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
          console.log(results);
      } else {
          //console.log(`No listings found with the name '${nameOfListing}'`);
          console.log(`No listings found with the name`);
      }
      return results;
  }

    
    //pull from database
    const getallItems = () => {
      //pretend that this comes from database for now
      const items = [
        {id:0, name: 'Vanessa V', size:'300',imgsrc:'Vanessa'},
        {id:1, name: 'Eric W', size:'200',imgsrc:'Eric'},
        {id:2, name: 'Rian P', size:'100',imgsrc:'Rian'}
      ];
        //call the usestate function to put the new data
        setItems(getdatafromDB);
    };
  //use useEffect when you want to do something on the side while doing something else(in this case, rendering the page)
  useEffect (() => {
    getallItems();
  }, []);

  //declare divItems, then put the array mapping code inside bracket(example below);
  // const divItems = <>{ *put your code here* }</>;
  const divItems = <>{items.map(item => {
    return( 
    <img
    className="avatar"
    alt={item.name}
    src={require(''+getImageUrl(item.imgsrc)+'')}
    width={item.size}
    height={item.size}
    key={item.id}
    />)
    
    })}</>;

    return(<div>
      {divItems}
    </div>);
  
  
} 
      

  export default Avatar /*{
    
        
         return(<>{
          PyTeam.map(item => {
            console.log(item);
            <Avatar person={{ name: item['name'], size:item['size'],imgsrc:item['imgsrc']}}/>}) }
      </>); 
      return (
        <Avatar
          person={{ name: 'Rian Punzalan', size:'100',imgsrc:'Rian'}}
        />
      );
    }*/
      

