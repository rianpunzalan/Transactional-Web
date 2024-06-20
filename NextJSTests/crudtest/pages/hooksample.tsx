'use client';
import React from "react";
import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useRef, useState } from 'react';
import { useRouter } from 'next/router'
                                                 
type ConnectionStatus = {       
  isConnected: boolean;         
};                             
                                

export const getStaticProps: GetStaticProps<
  ConnectionStatus     
> = async () => {

  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

   
    return {
      props: { isConnected: true },   //modify ConnectionStatus isConnected property to true
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};





function Label2(props) {                            

  return <p id="editlabel">{props.title}</p>;                       
}                      

function TextBox2({id, placeholder}:{id: string, placeholder: string;}) {              
                                                   
    return <input id={id} placeholder={placeholder} autoComplete="off"/>;
}

function Password(){
    return;
}

function Parent({children}){                        
                                                   
    return <div className="card">                   
                {children}
            </div>
}                                                      

export default function Home({ isConnected, } : InferGetStaticPropsType<typeof getStaticProps>) {
                                                                   //Sample of capturing text while simultaneously changing another element
  const router = useRouter();
  const inputRef = useRef(null);
  const sourceRef = useRef(null);

  function InputExample({idsource}){
    return <input id={idsource} autoComplete="off" onChange={ChangeTextDOM} />;
  }

  function ChangeTextDOM(){
    inputRef.current.value =sourceRef.current.value;
  }
  function Pedro({display}){
    return <img style={display={display}} src="https://media1.tenor.com/m/NVwxxoyoyGgAAAAC/racoon-pedro.gif"/>;
  }

  const [textString, setTextString] = useState("Change this text using Hooks");
  const [displayStatus, setDisplayStatus] = useState("none");
  const [PageTitle,setPageTitle] = useState("useRef(DOM)|useState(Hooks)");

  function ChangeTextHook(e){
      if(e.target.value===""){
        setTextString("Change this text using Hooks");
        return;
      }
      if(e.target.value==="Pedro"||e.target.value==="pedro"){
        setPageTitle("Pedro");
        setTextString(e.target.value);
        setDisplayStatus("block");
        return;
      }
      setTextString(e.target.value);
      setDisplayStatus("none");
      setPageTitle("useRef(DOM)|useState(Hooks)");
  };

  function Authenticate(){
    const username= document.getElementById("username");
    const password= document.getElementById("password");
    //Login(username,password);
    
    router.push('/');
  } 

  return (                                              
    <div className="container">                         {/* use brackets in order to escape into plain Javascript then comment as usual. */}       
                                                        
      <Head>                                            {/* use Nextjs <Head> tag to declare inside the html <head>*/}
        <title>Hooks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
        {PageTitle}
        </h1>
                                                        
        <div className="grid">
           
            <Parent>
                <input ref={inputRef} placeholder="Change this text." autoComplete="off" disabled/>
                <input ref={sourceRef} autoComplete="off" placeholder="Type Here." onChange={ChangeTextDOM}/>
            </Parent>

            <Parent>
                <Label2 title={textString}/>
                <input ref={sourceRef} autoComplete="off" placeholder="Type Here." onChange={ChangeTextHook}/>
            </Parent>
                
            <div id="surprise">
              <Pedro display={displayStatus}/>
            </div>

            <Parent>
              <Label2 title="Login"/>
              <input id="username" autoComplete="off" placeholder="Username" />
              <input id="password" type="password" placeholder="Password" />
              <br/>
              <input type="button" value="Login" onClick={Authenticate}/>
            </Parent>
            
        </div>
      </main>

      <footer>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
.card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: center;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition:
            color 0.15s ease,
            border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

      `}</style>
    </div>
  );
}
