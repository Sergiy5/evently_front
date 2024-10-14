import { userServices } from "./getUserByEmail"

export const renovationPasswordByEmail = async (email: string) => { 
try {
    const response = await userServices.get(
      `reset-password?email=${email}`
    );
    console.log('API_response.data_>>>>>>>>>>>>>', response.data);
    
    // return response.data
} catch (error) {
    console.log("ERROR_FROM_AXIOS",error)
}
}