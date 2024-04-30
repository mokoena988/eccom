import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Button from 'react-bootstrap/esm/Button';
import DesktopHeader from '../component/DesktopHeader';

import MobileHeader from '../component/MobileHeader';
import '../OrderHistoryPage.css'


//icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export default function OrderHistoryPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    
    <div className='order_history_page' >
      <Helmet>
        <title>OrderHistory</title>
      </Helmet>
    
      <div className='order_history_page_desktop' >
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
    <>
    <DesktopHeader />
        <span>Order History</span>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>Yes</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                  className='order_history_page_desktop_table_btn'
                    type="submit"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    View Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
      </div>
      <div className='order_history_page_mobile' >
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
    <>
        <MobileHeader />
        <span className='order_history_page_mobile_top' >Order History</span>
        <div className='order_history_page_mobile_bottom' >
        {orders.map((order) => (
          <div key={order._id} className='order_history_page_mobile_bottom_card_parent' >
            <div className='order_history_page_mobile_bottom_card_child_1' >
              <div className='order_history_page_mobile_bottom_card_child_1_left' >
               <span>Order Number </span>
              </div>
              <div className='order_history_page_mobile_bottom_card_child_1_right' >
                  <span>#{order._id}</span>
              </div>
            </div>
            <div className='order_history_page_mobile_bottom_card_child_2' >
            <div className='order_history_page_mobile_bottom_card_child_2_left' >
            
              <span className='order_history_page_mobile_bottom_card_child_2_left_top' >    Created At</span>
               <span className='order_history_page_mobile_bottom_card_child_2_left_bottom' ><CalendarMonthIcon /> 
              <span className='order_history_page_mobile_bottom_card_child_2_left_bottom_left' >
               {order.createdAt.substring(0, 10)}
               </span>
               </span>
              </div>
              <div className='order_history_page_mobile_bottom_card_child_2_right' >
                 <span className='order_history_page_mobile_bottom_card_child_2_right_top' >Total</span>
                 <span className='order_history_page_mobile_bottom_card_child_2_right_bottom' >R{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className='order_history_page_mobile_bottom_card_child_3' >
            <div className='order_history_page_mobile_bottom_card_child_3_left' >
                <span className='order_history_page_mobile_bottom_card_child_3_left_icon' >
                    <LocalShippingIcon />
                </span>
              </div>
              <div className='order_history_page_mobile_bottom_card_child_3_right' >
              <span className='order_history_page_mobile_bottom_card_child_3_left_date' >
              {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'Pending'}
              </span>
            </div>
            </div>
            <div className='order_history_page_mobile_bottom_card_child_4' >
                <button
                  type="button"
                 variant="light"
                 onClick={() => {
                   navigate(`/order/${order._id}`);
                 }}
                className='order_history_page_mobile_bottom_card_child_4_btn' >
                  View Order
                </button>
            </div>
          </div>
))}
        </div>
        </>
       )}
      </div>
     
    </div>
  );
}
