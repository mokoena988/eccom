import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import '../PlaceOrderPage.css'

import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import LoadingBox from '../component/LoadingBox';

//icons
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MopedIcon from '@mui/icons-material/Moped';
import LockIcon from '@mui/icons-material/Lock';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};




export default function PlaceOrderPage() {

  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };


  return (
    <div className='place_order_page' >
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className='place_order_page_desktop' >
        <div className='place_order_page_desktop_process_con' > 
        
        </div> 
        <div className='place_order_page_desktop_top' >
          <span className='place_order_page_desktop_top_text' >Review Order</span>
        </div>
        <div className='place_order_page_desktop_bottom' >
          <div className='place_order_page_desktop_bottom_left' >
            <div className='place_order_page_desktop_bottom_shipping' > 
            <div className='place_order_page_desktop_bottom_shipping_child_1' > 
              <span>Shipping Details</span>
           </div> 
           <div className='place_order_page_desktop_bottom_shipping_child_2' > 
           <span>{cart.shippingAddress.fullName}</span>
           <span>{cart.shippingAddress.address}</span>
           <span>{cart.shippingAddress.address}</span>
           <span>   {cart.shippingAddress.country}</span> 
                <span>{cart.shippingAddress.city}</span>
                <span>{cart.shippingAddress.postalCode}</span>
            </div>
            <div className='place_order_page_desktop_bottom_shipping_child_1' > 
              <span>contact Details</span>
           </div> 
           <div className='place_order_page_desktop_bottom_shipping_child_2' > 
           <span>{cart.shippingAddress.fullName}</span>
                <span>{cart.shippingAddress.phone}</span>
                <span>{cart.shippingAddress.email}</span>
            </div>
            </div>
            <div className='place_order_page_desktop_center_left_details' >
              <span className='place_order_page_desktop_center_left_details_1'  >Product</span>
              <span className='place_order_page_desktop_center_left_details_2'  >qty</span>
              <span className='place_order_page_desktop_center_left_details_3'  >Price</span>
            </div>
            {cart.cartItems.map((item) => (
            <div className='place_order_page_desktop_center_left_order_card' key={item._id} >
              <div className='place_order_page_desktop_center_left_order_card_left' >
                <img src='/fruits.jpg' alt='' className='place_order_page_desktop_center_left_order_card_left_img' />
              </div>
              <div className='place_order_page_desktop_center_left_order_card_right' >

                <div className='place_order_page_desktop_center_left_order_card_right_top' >
                  <span className='place_order_page_desktop_center_left_order_card_right_top_name' >{item.name}</span>
                  <span className='place_order_page_desktop_center_left_order_card_right_top_qty' >{item.quantity}</span>
                  <span className='place_order_page_desktop_center_left_order_card_right_top_price' >R{item.quantity * item.price }</span>
                </div>
                <div className='place_order_page_desktop_center_left_order_card_right_price' >
                  <span className='place_order_page_desktop_center_left_order_card_right_price_left' >Price:</span>
                  <span className='place_order_page_desktop_center_left_order_card_right_price_right' >R{item.price}</span>
                </div>
                <div className='place_order_page_desktop_center_left_order_card_right_size' >
                  <span className='place_order_page_desktop_center_left_order_card_right_size_left' >Size:</span>
                  <span className='place_order_page_desktop_center_left_order_card_right_size_right' >{item.size}kg</span>

                </div>


              </div>
            </div>
                 ))}
          </div>
          <div className='place_order_page_desktop_bottom_right' >
            <div className='place_order_page_desktop_center_left_child_1_summary' >
              <div className='place_order_page_desktop_center_left_child_1_summary_top' >
                <span className='place_order_page_desktop_center_left_child_1_summary_top_text' >Summary</span>
              </div>
              <div className='place_order_page_desktop_center_left_child_1_summary_ceter' >
                <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con' >
                  <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con_left' >
                    <span className='place_order_page_desktop_center_left_child_1_summary_ceter_con_left_text' >items</span>
                  </div>
                  <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con_right' >
                    <span className='place_order_page_desktop_center_left_child_1_summary_ceter_con_right_text' >R{cart.itemsPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con' >
                  <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con_left' >
                    <span className='place_order_page_desktop_center_left_child_1_summary_ceter_con_left_text' >Shipping</span>
                  </div>
                  <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con_right' >
                    <span className='place_order_page_desktop_center_left_child_1_summary_ceter_con_right_text' >R{cart.shippingPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con' >
                  <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con_left' >
                    <span className='place_order_page_desktop_center_left_child_1_summary_ceter_con_left_text' >Tax</span>
                  </div>
                  <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con_right' >
                    <span className='place_order_page_desktop_center_left_child_1_summary_ceter_con_right_text' >R{cart.taxPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con' >
                  <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con_left' >
                    <span className='place_order_page_desktop_center_left_child_1_summary_ceter_con_left_text_total' >Total</span>

                  </div>
                  <div className='place_order_page_desktop_center_left_child_1_summary_ceter_con_right' >
                    <span className='place_order_page_desktop_center_left_child_1_summary_ceter_con_right_text' >R{cart.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className='place_order_page_desktop_center_left_child_1_summary_bottom' >
                <button    type="button"   onClick={placeOrderHandler}     disabled={cart.cartItems.length === 0} className='place_order_page_desktop_center_left_child_1_summary_bottom_btn' >
                  <span className='place_order_page_desktop_center_left_child_1_summary_bottom_btn_left' >
                  <LockIcon />
                    <span className='place_order_page_desktop_center_left_child_1_summary_bottom_btn_right' >Checkout</span>
                  </span>
                </button>
                {loading && <LoadingBox></LoadingBox>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='place_order_page_mobile' >

      </div>

    </div>
  )
}


