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
} from '../actions/actionTypes';

const initalState = {
  allBlogs: [],
  blogs: [],
  loading: true,
  blog: []
};

export default function getBlogById(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_BLOGS_SUCCESS:
      return { ...state, allBlogs: payload, loading: false };

    case GET_ALL_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
        allBlogs: []
      };

    case GET_BLOGS_SUCCESS:
      return { ...state, blogs: payload, loading: false };

    case GET_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
        blogs: []
      };

    case GET_BLOG_SUCCESS:
      return {
        ...state,
        blog: payload,
        loading: false
      };

    case GET_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        blog: []
      };

    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        blogs: [payload, ...state.blogs],
        loading: false
      };

    case ADD_BLOG_FAIL:
      return {
        ...state,
        loading: false
      };

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        blogs: state.blogs.filter((item) => item.id !== payload.id),
        loading: false
      };

    case DELETE_BLOG_FAIL:
      return {
        ...state,
        loading: false
      };

    case EDIT_BLOG_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case EDIT_BLOG_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
