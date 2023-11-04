import axios from 'axios'
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import axiosInstance from '../axiosInstance'
import AuthContext from '../AuthContext';
import {useContext} from 'react'


const BASE_URL =  'https://dry-falls-41890.herokuapp.com/api/v1/';


const useAxios = ()=> {
    const {authTokens, setUser, setAuthToken} = useContext(AuthContext)
    const axiosInstance = axios.create({
        BASE_URL,
        headers: { Authorization: `Bearer ${authTokens?.accessToken}` }
    }); 
    
axiosInstance.interceptors.request.use(async req => {
    
    const user = jwt_decode(authTokens.accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if(isExpired) return req

    const response = await axios.post(`${BASE_URL}/token`, {
        refreshToken: authTokens.refreshToken
    });

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    setAuthTokens(response.data)
    setUSer(response.data)
    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`

    return req;


    
})

    return axiosInstance
}

export default useAxios