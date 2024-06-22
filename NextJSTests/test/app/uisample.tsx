//import '@/stylesglobals.css';
import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'   //when putting "import type" in front of imports you mark them as "type"

                                                                                //meaning you are letting TypeScript know that they can be removed from the output(aka only needed at build time.)
type ConnectionStatus = {       //this "type" on the other hand is called "Type alias"                     
  isConnected: boolean;         //this allows defining types as custom names to primitives or objects. (code reusability) 
};                              //in here, you declare {isConnected: boolean;} as ConnectionStatus
                                //which can be safely called in different lines. go to line 19.

                                /*
                                When should I use getServerSideProps?
                                You should use getServerSideProps if you need to render a page that relies on personalized user data,
                                or information that can only be known at request time, or data that changes often. 
                                For example, authorization headers or a geolocation.

                                If you do not need to fetch the data at request time, or would prefer to cache the data and pre-rendered HTML,
                                we recommend using getStaticProps. source: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
                                */

//export const getServerSideProps: GetServerSideProps<
export const getStaticProps: GetStaticProps<
  ConnectionStatus      //instead of {isConnected: boolean;}
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
                                                    /*
                                                    wtf are Components?? Props?? 
                                                    they are basically React's way of making custom elements (with props parameter)
                                                    which then can be called in directly in the Html parts.
                                                    More will be explained in Props Demo below.
                                                    */

function Label1() {                                 //implement a simple component
                                                    //NOTE: Components should ALWAYS start with Capital letter, otherwise Typescript wont recognize it.
    return <p>This text comes from Function</p>;           //returns a paragraph tag with value in it.
}
function Label2(props) {                            //implement a component that has parameter that goes to the paragraph attribute 

    return <p>{props.title}</p>;                       
}

function TextBox1(props: { placeholder: any; }) {                          //You can even use props for properties              

    return <input id="username" placeholder={props.placeholder} autoComplete="off"/>;
}

function TextBox2({id, placeholder}:{id: string, placeholder: string;}) {              /*a component that has two parameters ({param1, param2})
                                                    IMPORTANT NOTE! curly braces are important, without them youll be passing raw [object Object]*/
    return <input id={id} placeholder={placeholder} autoComplete="off"/>;
}
                                                    /*Further note:
                                                    ({param1, param2}) syntax is called “destructuring” which is equivalent to the code below
                                                    function TextBox2(props){
                                                        let id = props.id;
                                                        let placeholder = props.placeholder;
                                                    }*/

function TextBox3({properties,text}){                    //you can even pass complex props 
    return <input id={properties.id}  placeholder={properties.placeholder} autoComplete="off" value={text}/>;
}
                                                    //apply the lessons so far to create a password field            
function Password(){
    return;
}

function Parent({children}){                        /*you can also pass a component to another component,which effectively making them parent-children components                            
                                                    Parent({children})*/
    return <div className="card">                   
                {children}
            </div>
}

                                                    /*It is also possible to do a "Conditional Rendering"  */
                                                    //Which basically means showing a proper render according to conditions
function TeamMember({member}){
    let members =[
        {name:"Eric"},
        {name:"Vanessa"},
        {name:"Rian"}
    ];
                                                    //.some checks the array for the parameter entered
    if(members.some(e => e.name === member)){       //(<object> => <object>.<property> === parameter)
        return <p>{member} is a team member.</p>
    }
        return <p>{member} is not a team member.</p>
}

                                                        

export default function Home({ isConnected, } : InferGetStaticPropsType<typeof getStaticProps>) {
  return (                                              
    <div className="container">                         {/* use brackets in order to escape into plain Javascript then comment as usual. */}       
                                                        
      <Head>                                            {/* use Nextjs <Head> tag to declare inside the html <head>*/}
        <title>Components/Props/Children</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
        Components/Props/Children
        </h1>
                                                        
        <div className="grid">
           <div className="card">
            <Label1 />

            <Label2 title="This text comes from Props"/>

            <TextBox1 placeholder="This is TextBox1"/>

            <TextBox2 id= "lastname" placeholder="Last Name"/>

            <TextBox3 
                properties={{id: "firstname", placeholder: "First Name"}} /*Notice that you need double braces and use colons instead of equal sign.  */
                text="Pedro"
            />
          </div>
        
            <Parent>
                <Label2 title="This text comes from Props inside a child"/>
            </Parent>
            <Parent>
                <TeamMember member={"Pedro"}/>
            </Parent>



            {/*
          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}

            {isConnected ? (                                //calls isConnected and uses Ternary operator (?)  Condition ? (do if true) : (do if false)
            <h2 className="subtitle">You are connected to MongoDB</h2>
            ) : (
            <h2 className="subtitle">
                You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
                for instructions.
            </h2>
            )}
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
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
