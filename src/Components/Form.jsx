import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styling from './form.module.css';

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isRegistrationComplete, setRegistrationComplete] = useState(false);

  const handleRegistrationSubmit = (formData) => {
    console.log(formData);
    setRegistrationComplete(true);
    window.confirm('Registration Successful');
  };

  return (
    <form onSubmit={handleSubmit(handleRegistrationSubmit)} className='registration-form'>
      {isRegistrationComplete ? null : null}
      <div className='form-body'>
        <h1 className='form-heading'>Create Account</h1>
        <input
          type='text'
          placeholder='Full Name'
          {...register('fullName', {
            required: 'Please enter Full Name',
            minLength: { value: 3, message: 'Name should be at least 3 characters' },
            maxLength: { value: 30, message: 'Name should not be more than 30 characters' },
          })}
          className='form-field'
        />
        {errors.fullName && <span>{errors.fullName.message}</span>}
        <input
          type='email'
          placeholder='Email Address'
          {...register('email', {
            required: 'Please enter email',
            pattern: {
              value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
              message: 'Please enter a valid email',
            },
          })}
          className='form-field'
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type='password'
          placeholder='Password'
          {...register('password', {
            required: 'Please enter Password',
            minLength: { value: 10, message: 'Password should be at least 10 characters long' },
            pattern: {
              value: /.*[!@#$%^&*()\-_=+{};:,<.>]/,
              message: 'Password should contain at least one special character',
            },
          })}
          className='form-field'
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          type='password'
          placeholder='Confirm Password'
          {...register('confirmPassword', {
            required: 'Please re-enter your password',
            validate: (value) => value === watch('password') || 'Passwords do not match',
          })}
          className='form-field'
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        <button type='submit' className='submit-button'>
          Submit
        </button>
        <p>
          Already have an account? <Link to='/'>Login here</Link>
        </p>
      </div>
    </form>
  );
};

export default Form;
