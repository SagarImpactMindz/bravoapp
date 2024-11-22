import axiosInstance from "../AxiosInstance";

export const addEventApi = async (payload) => {
  try {
    const response = await axiosInstance.post('/Events/create_event', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("response eventApi",response)
    return response.data;
  } catch (error) {
    console.error('AddEvent API Error:', error);
    throw error;
  }
};
