import "./featuredInfo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenus</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2 415 €</span>
          <span className="featuredMoneyRate">
            -11.4 <FontAwesomeIcon icon={faArrowDown} className="featuredIcon negative"/>
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Ventes</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">4 415 € </span>
          <span className="featuredMoneyRate">
            -1.4 <FontAwesomeIcon icon={faArrowDown} className="featuredIcon negative"/>
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Charges</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2 225 €</span>
          <span className="featuredMoneyRate">
            +2.4 <FontAwesomeIcon icon={faArrowUp} className="featuredIcon"/>
          </span>
        </div>
      </div>
    </div>
  );
}