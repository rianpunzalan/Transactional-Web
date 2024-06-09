const axios = require('axios');  //to access axio

const API_KEY = process.env.WEATHER_API_KEY;
//axios.get('https://jsonplaceholder.typicode.com/posts/1') 
axios.get('https://jsonplaceholder.typicode.com/posts') 
  .then(response => {
    
    console.log(response.data); //prints the response
})
  .catch(error => { //this is triggered when there is no response
    console.error('There was an error making the GET request:', error);
  });

  console.log(API_KEY);
  //npm -y init                 //create folder then run the line in the terminal
  //npm install axios           //to install axios
  //node get-request.js         //to run the js file
  //npm install dotenv --save   //to read env files
  