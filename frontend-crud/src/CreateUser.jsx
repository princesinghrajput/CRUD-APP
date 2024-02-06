import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from './api';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();
//handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser({ name, email, age });
      navigate('/user');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='d-flex vh-100 bg-gradient-primary justify-content-center align-item-center'>
      <div className='w-50 bg-white rounded p-5 shadow-lg'>
        <form onSubmit={handleSubmit}>
          <h1 className='mb-4 text-center text-uppercase text-primary' style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 'bold' }}>
            Add User 📝👤
          </h1>
          <div className='mb-4'>
            <label className='text-primary' style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}>Name</label>
            <input type='text' className='form-control' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label className='text-primary' style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}>Email</label>
            <input type='email' className='form-control' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label className='text-primary' style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}>Age</label>
            <input type='number' className='form-control' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} />
          </div>
          <button type='submit' className='btn btn-success w-100' style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
