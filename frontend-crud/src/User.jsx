import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { getUsers, deleteUser } from './api';
import DeleteModal from './DeleteModal';
import MessagePopup from './MessagePopup';

const User = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
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

  const showMessagePopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setPopupMessage('');
    }, 3000);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedUserId) {
        await deleteUser(selectedUserId);
        console.log("User deleted successfully");

        showMessagePopup('User deleted successfully');

        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUserId));
      }
    } catch (error) {
      console.error(error);
      showMessagePopup("Error deleting user");
    } finally {
      setSelectedUserId(null);
      setShowModal(false);
    }
  };

  return (
    <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
      <div className='w-75 bg-white rounded p-4 shadow'>
        <h1 className='text-center mb-4' style={{ fontFamily: 'Poppins, sans-serif', color: '#343a40' }}>User Management</h1>
        <Link to="/create" className="btn btn-success mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}>Add User</Link>
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
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
                  <Link to={`/update/${user._id}`} className="btn btn-success mr-2 " style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}>Update</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal show={showModal} handleClose={handleCloseModal} handleDelete={handleConfirmDelete} />
      <MessagePopup message={popupMessage} show={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default User;