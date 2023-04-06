// import axios from 

const useRefreshToken = ()  => {


        const refresh =  async () => {
            const response = await  axios.get('/refresh', {
                withCredentials: true
            })
        }
};

export default useRefreshToken;