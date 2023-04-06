// import axios from 'axios';
// const BASE_URL = 'https://dry-falls-41890.herokuapp.com/api/v1'



// export default axios.create({
//   BASE_URL: BASE_URL
// })


// export const axiosPrivate =  axios.create({
//   BASE_URL: BASE_URL,
//   headers: { 'Content_type' : 'application/json'},
//   withCredentials: true; 
// })





let BASE_URL = 'https://dry-falls-41890.herokuapp.com/api/v1';
if (process.env.NODE_ENV === 'development') {
  BASE_URL = `https://dry-falls-41890.herokuapp.com/api/v1`;
}


export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;



export default BASE_URL;



// import axios from "axios";
// import { setupInterceptorsTo } from "./Interceptors";

// const API = setupInterceptorsTo(
//   axios.create({
//     baseURL: process.env.NEXT_PUBLIC_ENDPOINT_AUTH,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
// );

// export default API;

