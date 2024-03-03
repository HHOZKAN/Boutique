import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncActions } from '../../../features/userSlice';
import "./widgetSm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function WidgetSm() {
  const dispatch = useDispatch();
  const { lastRegisteredUsers } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(asyncActions.getLastRegisteredUsers());
  }, [dispatch]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Nouveaux membres</span>
      <ul className="widgetSmList">
        {lastRegisteredUsers.map(user => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.profilePic}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.name}</span>
            </div>
            <button className="widgetSmButton">
               <FontAwesomeIcon icon={faEye} className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}