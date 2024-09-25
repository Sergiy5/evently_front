
import axios from 'axios';

const userServices = axios.create({
  
  baseURL: 'https://rendereventapp.onrender.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 5000, // to 30000
  withCredentials: true,
});

export const getUserByEmail = async (email: string) => {
  try {
    const response = await userServices.get(`authorize/exist/${email}`);
console.log("RESPONSE_IN_AXOIS->>>>>>", response)
return response;
    
  } catch (error) {
    console.log("Error get user by email", error )
  }
}