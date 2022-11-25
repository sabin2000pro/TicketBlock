
export const generateMfaToken = (token_length = 6): any => {

    let theMfaToken = ''
    let RANDOM_LENGTH = 9;

    for(let i = 1; i <= token_length; i++) {

       const randomMfaToken = Math.round(Math.random() * RANDOM_LENGTH)
       theMfaToken += randomMfaToken;

    }
    
    return theMfaToken;
}