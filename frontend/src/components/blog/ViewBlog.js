import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getBlogById } from '../../redux/actions/Blogs';
import { Link } from 'react-router-dom';
import variable from '../../variables';

const ViewBlog = ({ getBlogById, match, blog, auth, loading }) => {
  if (blog) {
    var tags = blog.tags.split(' ');
    var date = blog.date;
    var exactDate = date.substring(0, 10);
  }

  useEffect(() => {
    getBlogById(match.params.id);
  }, [getBlogById, match.params.id]);
  return (
    <>
      <Link to='/blog' className='btn btn-light'>
        Back To Blogs
      </Link>

      {!blog ? (
        <Spinner />
      ) : (
        <div className='profile-grid my-1'>
          <div className='profile-top bg-primary p-2'>
            <img
              className='round-img my-1'
              src={`${variable.IMAGE_PATH}` + blog.image}
              alt=''
            />
            <div className='profile-text'>
              <h1 className='large'>{blog.title}</h1>

              <p className='medium'>
                <b>Category-</b>
                {blog.category}
              </p>
            </div>
          </div>

          <div className='profile-about bg-light p-2'>
            <h2 className='text-primary'>
              <p className='medium'>Description</p>
            </h2>
            <p>{blog.description}</p>

            <div className='skills'>
              <div className='p-1'>
                {tags && tags.length > 0 ? (
                  tags.map(item => (
                    <i className='fa fa-hashtag'>{item}&emsp;</i>
                  ))
                ) : (
                  <h4> </h4>
                )}
              </div>
            </div>

            <div className='line'></div>

            <div className='skills'>
              <div className='p-1'>
                <b className='text-date'>Created Date:&emsp;</b>
                {exactDate}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const mapStateToProps = state => ({
  blog: state.blogs.blog[0],
  loading: state.blogs.loading,
  auth: state.auth
});

export default connect(mapStateToProps, { getBlogById })(ViewBlog);
