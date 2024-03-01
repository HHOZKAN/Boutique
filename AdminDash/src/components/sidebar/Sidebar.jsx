import "./sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faDollarSign, faUser, faStore, faEnvelope, faComment, faBriefcase, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <FontAwesomeIcon icon={faHome} className="sidebarIcon" />
                Accueil
              </li>
            </Link>
            <li className="sidebarListItem">
              <FontAwesomeIcon icon={faChartLine} className="sidebarIcon" />
              Analyses de vente
            </li>
            <li className="sidebarListItem">
              <FontAwesomeIcon icon={faDollarSign} className="sidebarIcon" />
              Ventes
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu </h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <FontAwesomeIcon icon={faUser} className="sidebarIcon" />
                Uilisateurs
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <FontAwesomeIcon icon={faStore} className="sidebarIcon" />
                Produits
              </li>
            </Link>
         
          </ul>
        </div>
       
        
      </div>
    </div>
  );
}