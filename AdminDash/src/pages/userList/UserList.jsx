import "./userList.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { asyncActions } from '../../../features/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function UserList() {
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.user.allUsers);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(asyncActions.getAllUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(asyncActions.deleteUser(id));
  }

  const filteredUsers = allUsers.filter(user =>
    user._id.includes(searchTerm) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="userList">
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Rechercher..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
    <button onClick={() => dispatch(asyncActions.createUser())}>
      <FontAwesomeIcon icon={faPlus} /> Créer un nouvel utilisateur
    </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers && filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/user/${user._id}`}>
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <button onClick={() => handleDelete(user.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}