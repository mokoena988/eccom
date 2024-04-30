import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import '../OrderPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import { toast } from 'react-toastify';

//icons
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MopedIcon from '@mui/icons-material/Moped';
import DesktopHeader from '../component/DesktopHeader';
import MobileHeader from '../component/MobileHeader';


function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}

function OrderPage() {

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
  });



  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }



  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (
      !order._id ||

      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();

      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }

    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    successDeliver,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'DELIVER_FAIL' });
    }
  }



  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className='order_page' >
      <Helmet>
        <title>{orderId}</title>
      </Helmet>
      <div className='order_page_desktop' >
        <div className='order_page_desktop_header_con' >
        <DesktopHeader />
        </div>
        <div className='order_page_desktop_mobile_header_con' >
        <MobileHeader />
        </div>
        <div className='order_page_desktop_top' >
          <div className='order_page_desktop_top_child_1' >
            <span className='order_page_desktop_top_child_1_id_left' >Order Number</span>
            <span className='order_page_desktop_top_child_1_id_right'  >#{orderId}</span>
          </div>
          <div className='order_page_desktop_top_child_2' >
            
            {order.isDelivered ? (
              <>
              <span className='order_page_desktop_top_child_2_delivered_icon' >
                <LocalShippingIcon />
              </span>
                <span className='order_page_desktop_top_child_2_delivered' >
                  {order.deliveredAt}
                </span>
              </>
            ) : (
              <>
                <span className='order_page_desktop_top_child_2_delivered_icon' >
                <LocalShippingIcon />
              </span>
                <span className='order_page_desktop_top_child_2_not_delivered' >
                 Pending Delivery
                </span>

              </>
            )}
            
          </div>
        </div>
        <div className='order_page_desktop_center' >
          <div className='order_page_desktop_center_left' >
            <div className='order_page_desktop_center_left_details' >
              <span className='order_page_desktop_center_left_details_1'  >Product</span>
              <span className='order_page_desktop_center_left_details_2'  >qty</span>
              <span className='order_page_desktop_center_left_details_3'  >Price</span>
            </div>
            {order.orderItems.map((item) => (
              <div className='order_page_desktop_center_left_order_card' >
                <div className='order_page_desktop_center_left_order_card_left' >
                  <img src='/fruits.jpg' alt='' className='order_page_desktop_center_left_order_card_left_img' />
                </div>
                <div className='order_page_desktop_center_left_order_card_right' >

                  <div className='order_page_desktop_center_left_order_card_right_top' >
                    <span className='order_page_desktop_center_left_order_card_right_top_name' >{item.name}</span>
                    <span className='order_page_desktop_center_left_order_card_right_top_qty' >{item.quantity}</span>
                    <span className='order_page_desktop_center_left_order_card_right_top_price' >R{item.quantity * item.price}</span>
                  </div>
                  <div className='order_page_desktop_center_left_order_card_right_price' >
                    <span className='order_page_desktop_center_left_order_card_right_price_left' >Price:</span>
                    <span className='order_page_desktop_center_left_order_card_right_price_right' >R{item.price}</span>
                  </div>
                  <div className='order_page_desktop_center_left_order_card_right_size' >
                    <span className='order_page_desktop_center_left_order_card_right_size_left' >Size:</span>
                    <span className='order_page_desktop_center_left_order_card_right_size_right' >{item.size}kg</span>

                  </div>


                </div>
              </div>
            ))}
            <div className='order_page_desktop_center_left_parent' >
              <div className='order_page_desktop_center_left_child_1_summary' >
                <div className='order_page_desktop_center_left_child_1_summary_top' >
                  <span className='order_page_desktop_center_left_child_1_summary_top_text' >Summary</span>
                </div>
                <div className='order_page_desktop_center_left_child_1_summary_ceter' >
                  <div className='order_page_desktop_center_left_child_1_summary_ceter_con' >
                    <div className='order_page_desktop_center_left_child_1_summary_ceter_con_left' >
                      <span className='order_page_desktop_center_left_child_1_summary_ceter_con_left_text' >2 items</span>
                    </div>
                    <div className='order_page_desktop_center_left_child_1_summary_ceter_con_right' >
                      <span className='order_page_desktop_center_left_child_1_summary_ceter_con_right_text' >R{order.itemsPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className='order_page_desktop_center_left_child_1_summary_ceter_con' >
                    <div className='order_page_desktop_center_left_child_1_summary_ceter_con_left' >
                      <span className='order_page_desktop_center_left_child_1_summary_ceter_con_left_text' >Shipping</span>
                    </div>
                    <div className='order_page_desktop_center_left_child_1_summary_ceter_con_right' >
                      <span className='order_page_desktop_center_left_child_1_summary_ceter_con_right_text' >R{order.shippingPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className='order_page_desktop_center_left_child_1_summary_ceter_con' >
                    <div className='order_page_desktop_center_left_child_1_summary_ceter_con_left' >
                      <span className='order_page_desktop_center_left_child_1_summary_ceter_con_left_text' >Tax</span>
                    </div>
                    <div className='order_page_desktop_center_left_child_1_summary_ceter_con_right' >
                      <span className='order_page_desktop_center_left_child_1_summary_ceter_con_right_text' >R{order.taxPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className='order_page_desktop_center_left_child_1_summary_ceter_con' >
                    <div className='order_page_desktop_center_left_child_1_summary_ceter_con_left' >
                      <span className='order_page_desktop_center_left_child_1_summary_ceter_con_left_text_total' >Total</span>

                    </div>
                    <div className='order_page_desktop_center_left_child_1_summary_ceter_con_right' >
                      <span className='order_page_desktop_center_left_child_1_summary_ceter_con_right_text' >R{order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <div className='order_page_desktop_center_left_child_1_summary_bottom' >
                
                    <button type="button" onClick={deliverOrderHandler} className='order_page_desktop_center_left_child_1_summary_bottom_btn' >
                      <span className='order_page_desktop_center_left_child_1_summary_bottom_btn_left' >
                        <LocalShippingIcon />
                        <span className='order_page_desktop_center_left_child_1_summary_bottom_btn_right' >Deliver</span>
                      </span>
                    </button>
                
                </div>
              )}
              </div>
              <div className='order_page_desktop_center_left_child_1_courier' >
                <div className='order_page_desktop_center_left_child_1_courier_top' >
                  <span className='order_page_desktop_center_left_child_1_courier_text' >Courier</span>
                </div>
                <div className='order_page_desktop_center_left_child_1_courier_center' >
                  <div className='order_page_desktop_center_left_child_1_courier_center_con' >
                    <div className='order_page_desktop_center_left_child_1_courier_center_con_left' >
                      <span className='order_page_desktop_center_left_child_1_courier_center_con_left_text' >Total</span>
                    </div>
                    <div className='order_page_desktop_center_left_child_1_courier_center_con_right' >
                      <span className='order_page_desktop_center_left_child_1_courier_center_con_right_text' >R{order.shippingPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className='order_page_desktop_center_left_child_1_courier_center_con' >
                    <div className='order_page_desktop_center_left_child_1_courier_center_con_left' >
                      <span className='order_page_desktop_center_left_child_1_courier_center_con_left_text' >Est Time</span>
                    </div>
                    <div className='order_page_desktop_center_left_child_1_courier_center_con_right' >
                      <span className='order_page_desktop_center_left_child_1_courier_center_con_right_text' >2-3 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className='order_page_desktop_center_right' >
            <div className='order_page_desktop_center_right_customer' >
              <span className='order_page_desktop_center_right_customer_header' >Customer</span>
              <span className='order_page_desktop_center_right_customer_header_shipping' >Contact Info</span>
              <div className='order_page_desktop_center_right_customer_details' >
                <div className='order_page_desktop_center_right_customer_details_con' >
                  <span className='order_page_desktop_center_right_customer_details_con_left' >
                    <PersonIcon />
                  </span>
                  <span className='order_page_desktop_center_right_customer_details_con_right'  > {order.shippingAddress.fullName}</span>
                </div>
                <div className='order_page_desktop_center_right_customer_details_con' >
                  <span className='order_page_desktop_center_right_customer_details_con_left' >
                    <EmailIcon />
                  </span>
                  <span className='order_page_desktop_center_right_customer_details_con_right'  >{order.shippingAddress.email}</span>
                </div>
                <div className='order_page_desktop_center_right_customer_details_con' >
                  <span className='order_page_desktop_center_right_customer_details_con_left' >
                    <LocalPhoneIcon />
                  </span>
                  <span className='order_page_desktop_center_right_customer_details_con_right'  >{order.shippingAddress.phone}</span>
                </div> 
              </div>
              <span className='order_page_desktop_center_right_customer_header_shipping' >Shipping</span>
              <div className='order_page_desktop_center_right_customer_details' >
                <span>{order.shippingAddress.address}</span>
                <span>{order.shippingAddress.country}</span>
                <span>  {order.shippingAddress.city}</span>
                
                <span>{order.shippingAddress.postalCode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='order_page_mobile' >

      </div>

    </div>
  )
}

export default OrderPage
