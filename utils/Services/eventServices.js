import axiosInstance from "../AxiosInstance";

export const addEventApi = async (payload) => {
  try {
    // console.log(payload,"payload")
    const response = await axiosInstance.post('/Events/create_event', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response,"event services")
    return response.data;
  } catch (error) {
    console.error('AddEvent API Error:', error);
    throw error;
  }
};



export const getAllEventsApi = async (payload) => {
  try {
    const response = await axiosInstance.get('/Events/get_events');
    return response.data;
  } catch (error) {
    console.error('AddEvent API Error:', error);
    throw error;
  }
};

export const getEventsByIdApi = async (eventId) => {
  try {
    const response = await axiosInstance.get('/Events/get_event_details', {
      params: { event_id: eventId }, // Pass the event_id as a query parameter
    });
    return response.data;
  } catch (error) {
    console.error('GetEventsById API Error:', error);
    throw error;
  }
};

export const updateEventApi = async (payload,eventId) => {
  console.log(payload,eventId,"payload and eventid")
  try {
    const response = await axiosInstance.post(`/Events/update_event/${eventId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // console.log(response,"Resp")
    // console.log(response.data,"update Api")
    // return
    return response.data;
  } catch (error) {
    console.error('UpdateEvent API Error:', error);
    throw error;
  }
};



export const deleteEventByIdApi = async (eventId) => {
  try {
    // Construct the URL with the query parameter
    const response = await axiosInstance.post(`/Events/delete_event?event_id=${eventId}`);
    // console.log(response.data, "Delete API Response");
    return response.data;
  } catch (error) {
    console.error('Delete Event API Error:', error?.response || error);
    throw error; // Rethrow the error for further handling
  }
};


export const getAllCategories=async()=>{
  try {
    const response = await axiosInstance.get(`GetAllEventCategory`);

    return response.data;
  } catch (error) {
    throw error;
  }
}
