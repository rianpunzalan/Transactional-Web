import Image from "next/image";
import Fetch_GET_Load from "./components/fetch_GETOnLoad";
import Fetch_POST from "./components/fetch_POST";
import Fetch_GET_Click from "./components/fetch_GETOnClick";
import Fetch_GET_Many from "./components/fetch_GETMany";

export default function Home() {
  return (
    <div className="bg-white w-screen h-screen flex space-x-3">
      <Fetch_GET_Load/>
      <Fetch_GET_Many/>
      <Fetch_GET_Click/>
      <Fetch_POST/>
    </div>
  );
}
