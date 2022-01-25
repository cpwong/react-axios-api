import axios from 'axios'

export const API = axios.create({
  baseURL:'http://localhost:3300'
});

// export const API = axios.create({
//   baseURL:'https://mboum-finance.p.rapidapi.com',
//   headers: {
//     'x-rapidapi-host': 'mboum-finance.p.rapidapi.com',
//     'x-rapidapi-key': ''
//   }    
// })

