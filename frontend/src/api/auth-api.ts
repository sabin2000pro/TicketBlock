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
    try {

         const response = await axios.post(`http://localhost:5299/api/v1/auth/register`, {email, username, password});
         console.log(response);

         return response.data;

    } 
    
    catch(error: any) {


        if(error) {
            return console.error(error);
        }
    }


}

export const login = async (email: string, password: string) => {
    try {

        const response = await axios.post(`http://localhost:5299/api/v1/auth/login`, {email, password});        
        return response.data;

   } 
   
   catch(error: any) {


       if(error) {
           return console.error(error);
       }
   }
}

export const forgotPassword = async (email: string) => {

    try {

        const response = await axios.post(`http://localhost:5299/api/v1/auth/forgot-password`, {email});        
        return response.data;

   } 
   
   catch(error: any) {


       if(error) {
           return console.error(error);
       }
   }


}