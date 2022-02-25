import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addBlog } from '../../redux/actions/Blogs';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert';

const AddBlog = ({ addBlog, setAlert }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    tags: '',
    category: 'none',
    description: ''
  });
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
      image: imageData
    };

    const { title, tags, category, description, image } = data;
    addBlog({ title, tags, category, description, image });
    setBlogData({
      title: '',
      tags: '',
      category: 'none',
      description: ''
    });
  };
  return (
    <>
      <h1 className='large text-primary'>Add Blog</h1>

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
            <option value='Lifestyle  '> Lifestyle Blogs</option>
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
          <input type='file' accept='.jpg, .jpeg' onChange={onImageChange} />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/blog' className='btn btn-light my-1'>
          Go Back
        </Link>
      </form>
    </>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, { addBlog, setAlert })(AddBlog);
