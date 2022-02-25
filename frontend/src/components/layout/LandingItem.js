import React from 'react';
import variable from '../../variables';

const LandingItem = ({ item }) => {
  var imagepath = `${variable.IMAGE_PATH}`;
  var imagename = item.image;
  var fullname = imagepath + imagename;
  var tags = item.tags.split(' ');

  return (
    <>
      <div className='profiles'>
        <div className='profile bg-light'>
          <img className='round-img' src={fullname} />
          <div>
            <h2 className='blog-title'>{item.title}</h2>
            <p className='line-clamp'>{item.description}</p>
          </div>

          <ul>
            <li className='text-primary'>
              {tags && tags.length > 0 ? (
                tags.map(item => (
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
      </div>
    </>
  );
};

export default LandingItem;
