import axios from 'axios';
import {useEffect} from "react";

type IVerifyEmail = {
    OTP: string
}

type IVerifyLoginMfa = {
    mfaToken: string
}

// Default config options
const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },

  };

let axiosInstance = axios.create(defaultOptions)

// Initialise Axios Interceptor to handle JWT Token
axiosInstance.interceptors.request.use((configData: any | undefined) => {
    
    const token = localStorage.getItem("token");
    axios.defaults.baseURL = 'http://localhost:5299/';
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    configData.headers.Authorization = token ? `Bearer ${token}` : "" // Store the token in the header

    return configData;
})

export const register = async (email: string, username: string, password: string) => {

    try {

         const response = await axios.post(`http://localhost:5299/api/v1/auth/register`, {email, username, password});
         console.log(response.data.data.id);

         localStorage.setItem("userId", response.data.data.id);

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

        const token = response.data.token;
        localStorage.setItem("token", token);
    
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
        console.log(response);     
        return response.data;

   } 
   
   catch(error: any) {


       if(error) {
           return console.error(error);
       }
   }


}

export const getLoggedInUser = async () => {

    try {

        const token = localStorage.getItem("token");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
       
        const response = await axios.get(`http://localhost:5299/api/v1/auth/me`, config);

        return response.data
    }
    
    catch(error: any) {

        if(error) {
            return console.error(error);
        }

    }
}

export const verifyEmailAddress = async (OTP: IVerifyEmail) => {


    try {
        const response = await axios.post(`http://localhost:5299/api/v1/auth/verify-email`, {OTP});
        const data = response.data;

        console.log(data);

        return data;
    }
    
    catch(err: any) {

        if(err) {
            console.log(err.response);
        }

        
    }


}

export const verifyLoginMFA = async (mfaToken: IVerifyLoginMfa) => {

    try {
        const response = await axios.post("http://localhost:5299/api/v1/auth/verify-mfa", {mfaToken})
        const data = response.data
    } 
    
    catch(err: any) {


        if(err) {
            return console.error(err);
        }
    }


}

export const uploadUserAvatar = async () => {
    try {

    } 
    
    catch(err: any) {
        if(err) {
            return console.error(err);
        }
    }

    
}

export const updateProfileSettings = async (username: string, email: string) => {

    try {
        console.log("Updating your profile...")
        console.log(username);
        console.log(email)
    } 
    
    catch(err: any) {


        if(err) {
            return console.error(err);
        }
    }

    
}