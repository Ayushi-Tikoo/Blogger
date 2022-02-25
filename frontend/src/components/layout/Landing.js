import React, { useEffect, Fragment } from 'react';
import Spinner from './Spinner';
import { getAllBlogs } from '../../redux/actions/Blogs';
import { connect } from 'react-redux';
import LandingItem from './LandingItem';

const Landing = ({ getAllBlogs, blog, loading }) => {
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <section className='container'>
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className='flex-container'>
              <div className='flex-item-left'>
                <h1 className='large text-primary'>Blogs</h1>
              </div>
            </div>

            <div className='profiles'>
              {blog && blog.length > 0 ? (
                blog.map((item) => <LandingItem key={item.id} item={item} />)
              ) : (
                <h4>No Blogs found...</h4>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    </section>
  );
};

const mapStateToProps = (state) => ({
  blog: state.blogs.allBlogs,
  loading: state.blogs.loading
});

export default connect(mapStateToProps, { getAllBlogs })(Landing);
