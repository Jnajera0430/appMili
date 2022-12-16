export const ValidEmail = (email) =>{
    let expresionRegular= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return expresionRegular.test(email);    
}