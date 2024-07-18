'use client';
import { useEffect, useState } from "react";

export default function Fetch_GET_Many() {
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
  const [DatafromAPI, setDatafromAPI] = useState<objectType[]>([pedro]);

  const [MyComponent, setMyComponent] = useState(GenerateComponent);

  async function LoadData() {
    const response = await fetch("http://localhost:3000/api/GET/Array", { cache: "no-cache" });
    const response_object: objectType[] = await response.json();
    setDatafromAPI(response_object);
    setLoaded(true);
  }

  function GenerateComponent() {
    return <div>
      {DatafromAPI.map((arr_obj, ekey) => {
        return <div className="border-2 border-solid border-blue-300 my-2" >
          <p>{arr_obj.string_property}</p>
          <p>{arr_obj.number_property.toString()}</p>
          <p>{arr_obj.object_property?.inner_obj_property1}-{arr_obj.object_property?.inner_obj_property1}</p>
          {arr_obj.array_property?.map((arr, key) => {
             return <p key={key}>{arr}</p> })}
        </div>
      })}
    </div>;
  }

  useEffect(() => {
    if (!Loaded) {
      LoadData();
    }
    else {
      setMyComponent(GenerateComponent);
    }
  }, [DatafromAPI]);

  return (
    <div className="h-min w-min text-black border-4 border-solid border-gray-600 p-10">
      <p className="border-4 border-solid border-green-600 p-2">fetch_GETMany.tsx</p>
      <br />
      {MyComponent}
    </div>
  );
}