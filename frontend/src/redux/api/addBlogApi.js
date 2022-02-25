import axios from 'axios';
import variables from '../../variables';

export const addBlogApi = async ({
  title,
  tags,
  category,
  description,
  image
}) => {
  var formData = new FormData();

  formData.append('title', title);
  formData.append('tags', tags);
  formData.append('category', category);
  formData.append('description', description);
  formData.append('blog', image);

  try {
    const res = await axios.post(`${variables.BASE_URL}/blog`, formData);

    return res;
  } catch (error) {
    const errors = error.response.data.msg;
    if (errors) {
      return error.response;
    }
  }
};
