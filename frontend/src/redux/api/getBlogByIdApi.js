import axios from 'axios';
import variables from '../../variables';
export const getBlogByIdApi = async id => {
  try {
    const response = await axios.get(
      `${variables.BASE_URL}/blog/getByBlogId/${id}`
    );

    return response;
  } catch (error) {
    const errors = error.response.data.msg;

    if (errors) {
      return error.response;
    }
  }
};
