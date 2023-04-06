import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
	if (
		error.config &&
		error.response?.status === 401 && // Use the status code your server returns when token has expired
		!error.config.__isRetry
	) {
    return new Promise((resolve, reject) => {
      refreshToken(axios, error.config)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
	}
	return Promise.reject(error);
});
    
const refreshToken = (axios, config) => {
	return new Promise((resolve, reject) => {
		getNewToken() // Endpoint to request new token
			.then((res) => {
				storeToken(res.data.token); // Store new token locally (Local storage or cookies)
				config.headers.Authorization = res.data.token; // Attach the new token to the headers
				axios
				  .request(config) // Repeat the initial request
					.then((result) => {
						return resolve(result);
					})
					.catch((err) => {
						console.log(err);
						return reject(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	});
}