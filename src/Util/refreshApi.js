import axios from 'axios'
import {useAuthHeader, createRefresh} from 'react-auth-kit'
// import API from '/API';

const BASE_URL = 'https://dry-falls-41890.herokuapp.com/api/v1';
const refreshApi = createRefresh({
  interval: 10,   // Refreshs the token in every 10 minutes
  refreshApiCallback: (
    {
      authToken,
      authTokenExpireAt,
      refreshToken,
      refreshTokenExpiresAt,
      authUserState
    }) => {
    axios.post(`${BASE_URL}/token`,
      {
        refreshToken: refreshToken,
        oldAuthToken: authToken
      }
    ).then(({data})=>{
      return {
        isSuccess: true,  // For successful network request isSuccess is true
        newAuthToken: data.newAuthToken,
        newAuthTokenExpireIn: data.newAuthTokenExpireIn
        // You can also add new refresh token ad new user state
      }
    }).catch((e)=>{
      console.error(e)
      return{
        isSuccess:false // For unsuccessful network request isSuccess is false
      }
    })
  }
})

export default refreshApi
