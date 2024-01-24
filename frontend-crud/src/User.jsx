import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteModal from './DeleteModal';

const User = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/")
      .then(result => setUsers(result.data))
      .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  }

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      axios.delete(`http://localhost:8000/deleteUser/${selectedUserId}`)
        .then(result => {
          console.log(result);
          window.location.reload();
        })
        .catch(err => console.log(err));

      setSelectedUserId(null);
      setShowModal(false);
    }
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
      <div className='w-500 bg-white rounded p-3'>
        <Link to="/create" className="btn btn-success">Add+</Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <DeleteModal show={showModal} handleClose={handleCloseModal} handleDelete={handleConfirmDelete} />
    </div>
  );
}

export default User;
