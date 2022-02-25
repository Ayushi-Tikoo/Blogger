import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/auth';
import { setAlert } from '../../redux/actions/alert';
import { connect } from 'react-redux';

const Register = ({ register, setAlert, isAuthenticated }) => {
  const [formData, SetFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: ''
  });

  const { firstname, lastname, email, password, password2 } = formData;

  const onChange = async (e) =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords must be same', 'danger');
    } else {
      register({ firstname, lastname, email, password });
      SetFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: ''
      });
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Registration</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label>First Name:</label>
          <input
            required
            type='text'
            name='firstname'
            value={firstname}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label>Last Name:</label>
          <input
            required
            type='text'
            name='lastname'
            value={lastname}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label>Email Address:</label>
          <input
            type='email'
            required
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            required
            minlength='8'
            type='password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label>Confirm Password:</label>
          <input
            required
            type='password'
            minlength='8'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
        <Link to='/blog' className='btn btn-light my-1'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register, setAlert })(Register);
