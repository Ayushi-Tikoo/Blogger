import axios from 'axios';
import variables from '../../variables';

export const registerApi = async ({ firstname, lastname, email, password }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ firstname, lastname, email, password });
  try {
    const res = await axios.post(
      `${variables.BASE_URL}/user/register`,
      body,
      config
    );
    return res;
  } catch (error) {
    const errors = error.response.data.msg;
    if (errors) {
      return error.response;
    }
  }
};
