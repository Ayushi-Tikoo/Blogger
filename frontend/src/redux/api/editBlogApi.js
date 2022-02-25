import axios from 'axios';
import variables from '../../variables';

export const editBlogApi = async ({
  title,
  tags,
  category,
  description,
  image,
  id
}) => {
  var formData = new FormData();

  formData.append('title', title);
  formData.append('tags', tags);
  formData.append('category', category);
  formData.append('description', description);
  formData.append('blog', image);

  try {
    const res = await axios.put(`${variables.BASE_URL}/blog/${id}`, formData);

    return res;
  } catch (error) {
    const errors = error.response.data.msg;
    if (errors) {
      return error.response;
    }
  }
};
