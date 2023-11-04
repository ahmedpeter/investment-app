import React from 'react';
 import { createContext, useState, useEffect} from 'react-dom';
 import jwt_decode from "jwt-decode";
 import {useHistory } from 'react-router-dom';



//  const AuthContext = createContext();
 const AuthContext = React.createContext();

 export default AuthContext;

 export const AuthProvider = ({children})=>{
     let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
     let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null);
    let [loading, setLoading]  = useState(true);

    const history = useHistory();

    let logOutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }


    let updateToken = async ()=> {
        let response = await fetch('https://dry-falls-41890.herokuapp.com/api/v1/token', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refreshToken})
        })

        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.accessToken))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else {
            logOutUser()
        }

        if(loading){
            setLoading(false);
        }
    }

    let contextData = {
        user:user,
        authTokens: authTokens,
        // loginUser:loginUser,
        logOutUser:logOutUser
    }


    useEffect(()=> {
        if(loading){
            updateToken()
        }
        let fiveMinutes = 1000 * 60 * 5
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fiveMinutes)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children }
        </AuthContext.Provider>
    )




    }