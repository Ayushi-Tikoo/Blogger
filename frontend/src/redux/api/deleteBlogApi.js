import axios from 'axios';
import variables from '../../variables';
export const deleteBlogApi = async id => {
  try {
    const response = await axios.delete(
      `${variables.BASE_URL}/blog/deleteid/${id}`
    );
    return response;
  } catch (error) {
    const errors = error.response.data.msg;
    if (errors) {
      return error.response;
    }
  }
};
