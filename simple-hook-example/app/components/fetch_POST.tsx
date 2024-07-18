'use client';
import { useEffect, useState } from "react";

export default function Fetch_POST() {
  type objectType = {
    string_property: String,
    number_property: Number,
    object_property?: { inner_obj_property1: String, inner_obj_property2?: String },
    array_property?: Array<String>
  }

  const pedro = {
    string_property: "Pedro",
    number_property: 0,
    object_property: { inner_obj_property1: "pedro", inner_obj_property2: "PEDRO" },
    array_property: ["p", "pe", "ped", "pedr", "pedro"]
  }
  const [Loaded, setLoaded] = useState(false);
  const [DatafromAPI, setDatafromAPI] = useState<objectType>(pedro);
  const [MyComponent, setMyComponent] = useState(GenerateComponent);
  const [TextValue,setTextValue] = useState("");

  async function LoadData() {
    if(TextValue===""){
      alert("enter an index");
      return;
    }
    if(isNaN(parseInt(TextValue))){
      alert("enter a valid index");
      return;
    }

    let index = TextValue;
    const formData = new FormData();  //create formdata
    formData.append("index", index);  //append the param and value (like we do in postman)

    let response = await fetch('http://localhost:3000/api/POST',
      {
        method: 'POST',
        body: formData,
        cache: "no-cache"
      });

    const response_object: objectType = await response.json();
    setDatafromAPI(response_object);
    setLoaded(true);
  }

  function GenerateComponent() {
    return <div>
      <p>{DatafromAPI.string_property}</p>
      <p>{DatafromAPI.number_property.toString()}</p>
      <p>{DatafromAPI.object_property?.inner_obj_property1}-{DatafromAPI.object_property?.inner_obj_property1}</p>
      {DatafromAPI.array_property?.map((arr, key) => { return <p key={key}>{arr}</p> }
      )}
    </div>;
  }


  useEffect(() => {
    if (Loaded) {
      setMyComponent(GenerateComponent);
    }
  }, [DatafromAPI]);

  return (
    <div className="h-min w-min text-black border-4 border-solid border-gray-600 p-10">
      <p className="border-4 border-solid border-green-600 p-2">fetch_POST.tsx</p>
      <br/>
      {MyComponent}
      <br/>
      <input type="text" id="index" onChange={e => setTextValue(e.currentTarget.value)} className="border-2 border-solid border-blue-300" />
      <input type="button" value="Fetch Data" className="bg-green-300" onClick={() => LoadData()}/>
    </div>
  );
}