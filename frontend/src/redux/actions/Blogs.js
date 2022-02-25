import {
  GET_ALL_BLOGS_SUCCESS,
  GET_ALL_BLOGS_FAIL,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAIL,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  EDIT_BLOG_SUCCESS,
  EDIT_BLOG_FAIL
} from './actionTypes';

import { getAllBlogsApi } from '../api/getAllBlogsApi';
import { getBlogApi } from '../api/getBlogsApi';
import { getBlogByIdApi } from '../api/getBlogByIdApi';
import { addBlogApi } from '../api/addBlogApi';
import { setAlert } from './alert';
import { deleteBlogApi } from '../api/deleteBlogApi';
import { editBlogApi } from '../api/editBlogApi';

//get all blogs by User Id
export const getAllBlogs = () => async (dispatch) => {
  const response = await getAllBlogsApi();

  if (response.status === 200) {
    dispatch({
      type: GET_ALL_BLOGS_SUCCESS,
      payload: response.data
    });
  } else {
    dispatch({ type: GET_ALL_BLOGS_FAIL });
  }
};

//get all blogs by User Id
export const getBlogs = () => async (dispatch) => {
  const response = await getBlogApi();

  if (response.status === 200) {
    dispatch({
      type: GET_BLOGS_SUCCESS,
      payload: response.data
    });
  } else {
    dispatch({ type: GET_BLOGS_FAIL });
  }
};

//Get blog by Blog id
export const getBlogById = (id) => async (dispatch) => {
  const response = await getBlogByIdApi(id);

  if (response.status === 200) {
    dispatch({
      type: GET_BLOG_SUCCESS,
      payload: response.data
    });
  } else {
    dispatch({ type: GET_BLOG_FAIL });
  }
};

// add blogs action method
export const addBlog =
  ({ title, tags, category, description, image }) =>
  async (dispatch) => {
    const res = await addBlogApi({ title, tags, category, description, image });

    if (res.status === 200) {
      dispatch(setAlert('Blog Created Successfully', 'success'));
      dispatch({
        type: ADD_BLOG_SUCCESS,
        payload: res.data[0]
      });
    } else {
      dispatch(setAlert('Blog Not Created', 'danger'));
      dispatch({ type: ADD_BLOG_FAIL });
    }
  };

// edit blogs action method
export const editBlog =
  ({ title, tags, category, description, image, id }) =>
  async (dispatch) => {
    const res = await editBlogApi({
      title,
      tags,
      category,
      description,
      image,
      id
    });

    if (res.status === 200) {
      dispatch(setAlert('Blog Updated Successfully', 'success'));
      dispatch({
        type: EDIT_BLOG_SUCCESS,
        payload: res.data[0]
      });
    } else {
      dispatch(setAlert('Blog Not Updated', 'danger'));
      dispatch({ type: EDIT_BLOG_FAIL });
    }
  };

// delete blogs action method
export const deleteBlog = (id) => async (dispatch) => {
  const res = await deleteBlogApi(id);

  if (res.status === 200) {
    dispatch(setAlert('Blog Deleted Successfully', 'success'));
    dispatch({
      type: DELETE_BLOG_SUCCESS,
      payload: res.data[0]
    });
  } else {
    dispatch(setAlert('Blog Not Deleted', 'danger'));
    dispatch({ type: DELETE_BLOG_FAIL });
  }
};
