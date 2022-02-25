import React from 'react';
import variable from '../../variables';
import { Link } from 'react-router-dom';
import { deleteBlog } from '../../redux/actions/Blogs';
import { connect } from 'react-redux';

const BlogItem = ({ item, deleteBlog }) => {
  var imagepath = `${variable.IMAGE_PATH}`;
  var imagename = item.image;
  var fullname = imagepath + imagename;
  var tags = item.tags.split(' ');

  const onDelete = () => {
    deleteBlog(item.id);
  };

  return (
    <>
      <div className='profile bg-light'>
        <img className='round-img' alt='Ima' src={fullname} />
        <div>
          <h2 className='blog-title'>{item.title}</h2>
          <p className='line-clamp'>{item.description}</p>

          <Link to={`/viewBlog/${item.id}`} className='btn btn-viewBlog'>
            <i class='fa fa-info' title='View Blog'></i>
          </Link>

          <div>
            <Link to={`/editBlog/${item.id}`} class='btn btn-viewBlog'>
              <i class='fa fa-edit' title='Edit Blog'></i>
            </Link>
            <div class='btn btn-viewBlog'>
              <i class='fa fa-trash' onClick={onDelete} title='Delete Blog'></i>
            </div>
          </div>
        </div>

        <ul>
          <li className='text-primary'>
            {tags && tags.length > 0 ? (
              tags.map((item) => (
                <li>
                  {' '}
                  <i className='fa fa-hashtag'>{item + ' '}</i>
                </li>
              ))
            ) : (
              <h4> </h4>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteBlog })(BlogItem);
