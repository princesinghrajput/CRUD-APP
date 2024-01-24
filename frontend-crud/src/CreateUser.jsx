import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from './api';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser({ name, email, age });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h1>Add User</h1>
            <div className="mb-2">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-2">
              <label>Email</label>
              <input type="text" className="form-control" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-2">
              <label>Age</label>
              <input type="text" className="form-control" placeholder="Enter Age" onChange={(e) => setAge(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateUser;
