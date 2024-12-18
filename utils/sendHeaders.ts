export const sendHeaders = (token : string)=>{
    return {
        "Authorization" : `Bearer ${token}`
    }
}