import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments } from '../../../features/dataSlice';
import "./widgetLg.css";

export default function WidgetLg() {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.data.payments);
  console.log(payments);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Dernières transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Clients</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Montant</th>
          <th className="widgetLgTh">Statut</th>
        </tr>
        {payments.map((payment) => (
          <tr className="widgetLgTr" key={payment.id}>
            <td className="widgetLgUser">
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">{payment.customer_details.name}</span>
            </td>
            <td className="widgetLgDate">{new Date(payment.created * 1000).toLocaleDateString()}</td>
            <td className="widgetLgAmount">${(payment.amount_total / 100).toFixed(2)}</td>
            <td className="widgetLgStatus">
              <Button type={payment.payment_status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}