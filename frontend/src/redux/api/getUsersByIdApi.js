import axios from 'axios';
import variables from '../../variables';

export const getUsersByIdApi = async () => {
  try {
    const res = await axios.get(`${variables.BASE_URL}/user/getUsersById`);

    return res;
  } catch (error) {
    const errors = error.response.data.msg;

    if (errors) {
      return error.response;
    }
  }
};
