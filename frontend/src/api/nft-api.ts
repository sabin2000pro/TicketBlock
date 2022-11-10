
import axios from 'axios'

export const fetchAllNfts = async (URL: any) => {

    try {
        const nftResponse = await axios.get(`http://localhost:5201/api/v1/nfts`);
        const nftData = nftResponse.data;

        return nftData;
    } 
    
    catch(error: any) {
        if(error) {
            return console.error(error);
        }
    }

    
} 

export const fetchNftByID = async (id: number) => {
    try {

    } 
    
    catch(error: any) {

    }
}

export const createNft = async () => {
    try {

    } 
    
    catch(error: any) {

    }

}

export const editNft = async (id: number) => {

    try {

    } 
    
    catch(error: any) {

    }

}

export const deleteNftByID = async (id: number) => {
    try {

    } 
    
    catch(error: any) {

    }

}

export const deleteAllNfts = async () => {

    try {

    } 
    
    catch(error: any) {

    }

}

export const uploadNftImage = async () => {

    try {

    } 
    
    catch(error: any) {

    }

}