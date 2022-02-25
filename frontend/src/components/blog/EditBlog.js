import React, { useState, useEffect } from 'react';
import variable from '../../variables';
import { Link } from 'react-router-dom';
import { editBlog, getBlogById } from '../../redux/actions/Blogs';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../redux/actions/alert';

const EditBlog = ({
  getBlogById,
  editBlog,
  match,
  blog,
  loading,
  setAlert
}) => {
  if (blog) {
    var imagepath = `${variable.IMAGE_PATH}`;
    var imagename = blog.image;
    var fullname = imagepath + imagename;
  }

  useEffect(() => {
    getBlogById(match.params.id);
  }, []);

  const [blogData, setBlogData] = useState({
    title: '',
    tags: '',
    category: 'none',
    description: ''
  });

  useEffect(() => {
    if (!loading && blog) {
      setBlogData({
        title: blog.title,
        tags: blog.tags,
        category: blog.category,
        description: blog.description
      });
    }
  }, [blog]);

  const [imageData, setImageData] = useState();

  const { title, tags, category, description } = blogData;

  const onChange = async e => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };
  const onImageChange = e => {
    var imgname = e.target.files[0];
    if (imgname) {
      if (imgname.type === 'image/jpeg' || imgname.type === 'image/jpg') {
        setImageData(imgname);
        console.log(imgname);
      } else {
        setAlert('Image type should be jpg or jpeg', 'danger');
        setImageData('');
      }
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    const data = {
      title: blogData.title,
      tags: blogData.tags,
      category: blogData.category,
      description: blogData.description,
      image: imageData,
      id: match.params.id
    };

    const { title, tags, category, description, image, id } = data;

    editBlog({ title, tags, category, description, image, id });
  };
  return (
    <>
      {!blog ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Edit Blog</h1>

          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <label>Title:</label>
              <input
                type='text'
                name='title'
                value={title}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className='form-group'>
              <label>Tags:</label>
              <input
                type='text'
                name='tags'
                value={tags}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className='form-group'>
              <label>Select Category:</label>
              <select
                required
                name='category'
                defaultValue='none'
                value={category}
                onChange={e => onChange(e)}
              >
                <option value='none' disabled></option>
                <option value='Fashion'> Fashion Blogs</option>
                <option value='Food'> Food Blogs</option>
                <option value='Travel'> Travel Blogs</option>
                <option value='Music '> Music Blogs</option>
                <option value='Lifestyle '> Lifestyle Blogs</option>
              </select>
            </div>

            <div className='form-group'>
              <label>Description:</label>
              <textarea
                name='description'
                value={description}
                cols='30'
                rows='5'
                onChange={e => onChange(e)}
              ></textarea>
            </div>

            <div className='form-group'>
              <label>Image:</label>
              <img className='round-updateimg' src={fullname} />
              <input
                type='file'
                accept='.jpg, .jpeg'
                onChange={onImageChange}
              />
            </div>
            <input type='submit' className='btn btn-primary my-1' />
            <Link to='/blog' className='btn btn-light my-1'>
              Go Back
            </Link>
          </form>
        </>
      )}
    </>
  );
};
const mapStateToProps = state => ({
  blog: state.blogs.blog[0],
  loading: state.blogs.loading
});

export default connect(mapStateToProps, { editBlog, getBlogById, setAlert })(
  EditBlog
);
