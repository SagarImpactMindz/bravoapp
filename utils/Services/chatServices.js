import axiosInstance from "../AxiosInstance";

export  const sendMessage=async(payload)=>{
    try {
        const response=await axiosInstance.post('/messages/send_message',payload,{
            headers:{
                'Content-Type':'multipart/form-data',
            }
        })
        // console.log(response,"response")
        return response.data
    } catch (error) {
        console.error('Send Message API Error:', error);
        
        throw error;
    }
}