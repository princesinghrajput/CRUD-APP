import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from './api';

const UpdateUser = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id);
        setName(response.data.name);
        setEmail(response.data.email);
        setAge(response.data.age);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      age,
    };

    try {
      await updateUser(id, data);
      console.log('User updated successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
        <div className='w-50 bg-white rounded p-3'>
          <form onSubmit={handleUpdate}>
            <h1>Update User</h1>
            <div className='mb-2'>
              <label>Name</label>
              <input type='text' className='form-control' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label>Email</label>
              <input type='text' className='form-control' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label>Age</label>
              <input type='text' className='form-control' placeholder='Enter Age' value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <button type='submit' className='btn btn-success'>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
