import axios from 'axios';

// Default config options
const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },

  };

let axiosInstance = axios.create(defaultOptions)

// Initialise Axios Interceptor to handle JWT Token
axiosInstance.interceptors.request.use((configData: any | undefined) => {
    
    const authToken = localStorage.getItem("token");
    configData.headers.Authorization = authToken ? `Bearer ${authToken}` : "" // Store the token in the header

    console.log(`Headers : ${configData.headers}`)
    console.log(`Auth token : ${authToken}`);

    return configData;
})

export const register = async (email: string, username: string, password: string) => {

}

export const login = async (email: string, password: string) => {

}

export const forgotPassword = async (email: string) => {
    
}