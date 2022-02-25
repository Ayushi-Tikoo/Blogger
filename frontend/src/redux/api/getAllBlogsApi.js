import axios from 'axios';
import variables from '../../variables';
export const getAllBlogsApi = async () => {
  try {
    const response = await axios.get(`${variables.BASE_URL}/blog`);
    return response;
  } catch (error) {
    const errors = error.response.data.msg;
    if (errors) {
      return error.response;
    }
  }
};
