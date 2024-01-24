import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from './api';
import DeleteModal from './DeleteModal';

const User = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    console.log("Effect is running");
    const fetchUsers = async () => {
      try {
        
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedUserId) {
        await deleteUser(selectedUserId);
        console.log("User deleted successfully");
  
        // Update the users state by filtering out the deleted user
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUserId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedUserId(null);
      setShowModal(false);
    }
  };
  

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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal show={showModal} handleClose={handleCloseModal} handleDelete={handleConfirmDelete} />
    </div>
  );
};

export default User;
