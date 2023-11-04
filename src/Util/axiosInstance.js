import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';


const BASE_URL =  'https://dry-falls-41890.herokuapp.com/api/v1/';


let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null;

const axiosInstance = axios.create({
    BASE_URL,
    headers: { Authorization: `Bearer ${authTokens?.accessToken}` }
});


axiosInstance.interceptors.request.use(async req => {
    if(!authTokens){
        // authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens'))
        req.headers.Authorization = `Bearer ${authTokens?.accessToken}`
    }
    const user = jwt_decode(authTokens.accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if(isExpired) return req

    const response = await axios.post(`${BASE_URL}/token`, {
        refreshToken: authTokens.refreshToken
    });

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`

    return req;


    
})


export default axiosInstance;