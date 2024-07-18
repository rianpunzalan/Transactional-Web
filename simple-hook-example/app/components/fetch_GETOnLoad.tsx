'use client';
import { useEffect, useState } from "react";

export default function Fetch_GET_Load() {
  /*
  Set objectType so that you can access it through useState()
  */
  type objectType = {
    string_property: String,
    number_property: Number,
    object_property?: { inner_obj_property1: String, inner_obj_property2?: String },
    array_property?: Array<String>
  }

  //set a default object state
  const pedro = {
    string_property: "Pedro",
    number_property: 0,
    object_property: { inner_obj_property1: "pedro", inner_obj_property2: "PEDRO" },
    array_property: ["p", "pe", "ped", "pedr", "pedro"]
  }
  
  const [Loaded, setLoaded] = useState(false);    //Indicator whether Data has been loaded or not.
  const [DatafromAPI, setDatafromAPI] = useState<objectType>(pedro);  //Variable that receives API data. its starting is pedro
  const [MyComponent, setMyComponent] = useState(GenerateComponent); //Generates Component to render.

  async function LoadData() {
    const response = await fetch("http://localhost:3000/api/GET/Single", { cache: "no-cache" });
    /*
      because local APIs sometimes don't recognize data change, therefore wont bother fetching new api data.
      adding { cache:"no-store" } forces it to revalidate data from API and fetch new one.
    */
    const response_object : objectType = await response.json(); //To ensure that received data will be the same objectType
    setDatafromAPI(response_object);  //save the API data
    setLoaded(true);  //set the Loaded to true.
  }

  //this is just a simple element generator that depends on DatafromAPI useState()
  function GenerateComponent() {
  //Pay attention to the ? object_property(?) that we set in type before, dont forget to include it when youre accessing the data.
    return <div>
      <p>{DatafromAPI.string_property}</p>
      <p>{DatafromAPI.number_property.toString()}</p>
      <p>{DatafromAPI.object_property?.inner_obj_property1}-{DatafromAPI.object_property?.inner_obj_property1}</p>
      {DatafromAPI.array_property?.map((arr,key) => 
        { return <p key={key}>{arr}</p> }
      )}
    </div>;
  }
  
  useEffect(() => {
    if(!Loaded){  
      LoadData();
    }
    else{
      setMyComponent(GenerateComponent);
    }
  }, [DatafromAPI]);
  
/*Here's a simple flow for how this useEffect behaves.
  1)Execute once on page load.
  2)Executes again when [watched_useState()] is changed. (if you dont put anything, it will just trigger once.)

  so in our case.
  1)useEffect()
    Loaded? false -> LoadData()
    since LoadData() changes DatafromAPI and sets Loaded to true, this will cause useEffect to be triggered again.
  
  2)useEffect()
    Loaded? true -> Re-render the component.

    the reason why it is coded this way is to avoid the rendering before a data is even fetched.
    this basically uses useEffect() trigger during initial page render to load the data as the page loads.
    then changes the components once data is received, hence why you will see a little flicker(from default data to fetched). 
    try clicking refresh in quick succession to see what I mean
*/


  return (
    <div className="h-min w-min text-black border-4 border-solid border-gray-600 p-10">
      <p className="border-4 border-solid border-green-600 p-2">fetch_GETOnLoad.tsx</p>
      <br/>
      {MyComponent}
    </div>
  );
}