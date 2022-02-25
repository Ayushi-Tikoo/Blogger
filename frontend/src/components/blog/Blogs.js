import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../redux/actions/Blogs';
import { connect } from 'react-redux';
import BlogItem from './BlogItem';

const Blog = ({ getBlogs, blog, loading }) => {
  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='flex-container'>
            <div className='flex-item-left'>
              <h1 className='large text-primary'>Personal Blogs</h1>
            </div>

            <div className='flex-item-right'>
              <Link to='/addBlog' className='btn btn-primary'>
                Add Blog
              </Link>
            </div>
          </div>

          <div className='profiles'>
            {blog && blog.length > 0 ? (
              blog.map((item) => <BlogItem key={item.id} item={item} />)
            ) : (
              <h4>No Blogs found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  blog: state.blogs.blogs,
  loading: state.blogs.loading
});

export default connect(mapStateToProps, { getBlogs })(Blog);
