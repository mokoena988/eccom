import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CartPage.css'
import DesktopHeader from '../component/DesktopHeader';
import MobileHeader from '../component/MobileHeader';

import MessageBox from '../component/MessageBox';
//icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function CartPage() {

    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };
    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };


    return (
        <div className='cart_page' >
            <Helmet>
                <title>Home</title>
            </Helmet>
            {cartItems.length === 0 ? (
                <MessageBox>
                    Cart is empty. <Link to="/">Go Shopping</Link>
                </MessageBox>
            ) : (
                <>
                    <div className='cart_page_desktop' >
                        <DesktopHeader />
                        <div className='cart_page_desktop_top' >
                            <span className='cart_page_desktop_top_heading' >YOUR CART</span>
                        </div>
                        <div className='cart_page_desktop_bottom' >
                            <div className='cart_page_desktop_bottom_left' >
                                {cartItems.map((item) => (
                                    <div className='cart_page_desktop_bottom_left_cart_card' >
                                        <div className='cart_page_desktop_bottom_left_cart_card_left' >
                                            <img src={item.image} alt='' className='cart_page_desktop_bottom_left_cart_card_left_img' />
                                        </div>
                                        <div className='cart_page_desktop_bottom_left_cart_card_right' >
                                            <div className='cart_page_desktop_bottom_left_cart_card_right_top' >
                                                <div className='cart_page_desktop_bottom_left_cart_card_right_top_name' >
                                                    <span className='cart_page_desktop_bottom_left_cart_card_right_top_name_text' >{item.name}</span>
                                                </div>
                                                <div className='cart_page_desktop_bottom_left_cart_card_right_top_price' >
                                                    <span className='cart_page_desktop_bottom_left_cart_card_right_top_price_left' >Price:</span>
                                                    <span className='cart_page_desktop_bottom_left_cart_card_right_top_price_right' >R{item.price}</span>
                                                </div>
                                                <div className='cart_page_desktop_bottom_left_cart_card_right_top_size' >
                                                    <span className='cart_page_desktop_bottom_left_cart_card_right_top_size_left' >Size:</span>
                                                    <span className='cart_page_desktop_bottom_left_cart_card_right_top_size_right' >{item.size}kg</span>

                                                </div>
                                            </div>
                                            <div className='cart_page_desktop_bottom_left_cart_card_right_bottom' >

                                                <div className='cart_page_desktop_bottom_left_cart_card_right_bottom_qty' >
                                                    <div className='cart_page_desktop_bottom_left_cart_card_right_bottom_qty_card' >
                                                        <button
                                                            onClick={() =>
                                                                updateCartHandler(item, item.quantity - 1)
                                                            }
                                                            variant="light"
                                                            disabled={item.quantity === 1}
                                                            className='cart_page_desktop_bottom_left_cart_card_right_bottom_qty_card_left' >-</button>{' '}
                                                        <span className='cart_page_desktop_bottom_left_cart_card_right_bottom_qty_card_center' >{item.quantity}</span>
                                                        <button
                                                            onClick={() =>
                                                                updateCartHandler(item, item.quantity + 1)
                                                            }
                                                            disabled={item.quantity === item.countInStock}

                                                            className='cart_page_desktop_bottom_left_cart_card_right_bottom_qty_card_right' >+</button>
                                                    </div>
                                                </div>
                                                <div className='cart_page_desktop_bottom_left_cart_card_right_bottom_delete' >
                                                    <button onClick={() => removeItemHandler(item)} className='cart_page_desktop_bottom_left_cart_card_right_bottom_delete_btn' >
                                                        <DeleteIcon />
                                                    </button>
                                                </div>
                                                <div className='cart_page_desktop_bottom_left_cart_card_right_bottom_edit' >
                                                    <Link to='/'>
                                                        <button className='cart_page_desktop_bottom_left_cart_card_right_bottom_edit_btn' >
                                                            <EditIcon />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}


                            </div>
                            <div className='cart_page_desktop_bottom_right' >
                                <div className='cart_page_desktop_bottom_right_summary' >
                                    <div className='cart_page_desktop_bottom_right_summary_top' >
                                        <span className='cart_page_desktop_bottom_right_summary_top_text' >Summary</span>
                                    </div>
                                    <div className='cart_page_desktop_bottom_right_summary_ceter' >
                                        <div className='cart_page_desktop_bottom_right_summary_ceter_con' >
                                            <div className='cart_page_desktop_bottom_right_summary_ceter_con_left' >
                                                <span className='cart_page_desktop_bottom_right_summary_ceter_con_left_text' >{cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items</span>
                                            </div>
                                            <div className='cart_page_desktop_bottom_right_summary_ceter_con_right' >
                                                <span className='cart_page_desktop_bottom_right_summary_ceter_con_right_text' >R  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='cart_page_desktop_bottom_right_summary_bottom' >
                                        <button
                                            type="button"
                                            variant="primary"
                                            onClick={checkoutHandler}
                                            disabled={cartItems.length === 0}
                                            className='cart_page_desktop_bottom_right_summary_bottom_btn' >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cart_page_mobile' >
                        <MobileHeader />
                        <div className='cart_page_mobile_top' >
                            <span className='cart_page_mobile_top_heading' >YOUR CART</span>
                        </div>
                        <div className='cart_page_mobile_bottom' >
                            <div className='cart_page_mobile_bottom_left' >
                                {cartItems.map((item) => (
                                    <div className='cart_page_mobile_bottom_left_cart_card' >
                                        <div className='cart_page_mobile_bottom_left_cart_card_left' >
                                            <img src={item.image} alt='' className='cart_page_mobile_bottom_left_cart_card_left_img' />
                                        </div>
                                        <div className='cart_page_mobile_bottom_left_cart_card_right' >
                                            <div className='cart_page_mobile_bottom_left_cart_card_right_top' >
                                                <div className='cart_page_mobile_bottom_left_cart_card_right_top_name' >
                                                    <span className='cart_page_mobile_bottom_left_cart_card_right_top_name_text' >{item.name}</span>
                                                </div>
                                                <div className='cart_page_mobile_bottom_left_cart_card_right_top_price' >
                                                    <span className='cart_page_mobile_bottom_left_cart_card_right_top_price_left' >Price:</span>
                                                    <span className='cart_page_mobile_bottom_left_cart_card_right_top_price_right' >R{item.price}</span>
                                                </div>
                                                <div className='cart_page_mobile_bottom_left_cart_card_right_top_size' >
                                                    <span className='cart_page_mobile_bottom_left_cart_card_right_top_size_left' >Size:</span>
                                                    <span className='cart_page_mobile_bottom_left_cart_card_right_top_size_right' >{item.size}kg</span>

                                                </div>
                                            </div>
                                            <div className='cart_page_mobile_bottom_left_cart_card_right_bottom' >

                                                <div className='cart_page_mobile_bottom_left_cart_card_right_bottom_qty' >
                                                    <div className='cart_page_mobile_bottom_left_cart_card_right_bottom_qty_card' >
                                                        <button
                                                         onClick={() =>
                                                            updateCartHandler(item, item.quantity - 1)
                                                        }
                                                        variant="light"
                                                        disabled={item.quantity === 1}
                                                        className='cart_page_mobile_bottom_left_cart_card_right_bottom_qty_card_left' >-</button>
                                                        <span className='cart_page_mobile_bottom_left_cart_card_right_bottom_qty_card_center' >{item.quantity}</span>
                                                        <button 
                                                          onClick={() =>
                                                            updateCartHandler(item, item.quantity + 1)
                                                        }
                                                        disabled={item.quantity === item.countInStock}
                                                        className='cart_page_mobile_bottom_left_cart_card_right_bottom_qty_card_right' >+</button>
                                                    </div>
                                                </div>
                                                <div className='cart_page_mobile_bottom_left_cart_card_right_bottom_delete' >
                                                    <button onClick={() => removeItemHandler(item)} className='cart_page_mobile_bottom_left_cart_card_right_bottom_delete_btn' >
                                                        <DeleteIcon />
                                                    </button>
                                                </div>
                                                <div className='cart_page_mobile_bottom_left_cart_card_right_bottom_edit' >
                                                    <Link to='/'>
                                                        <button className='cart_page_mobile_bottom_left_cart_card_right_bottom_edit_btn' >
                                                            <EditIcon />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>

                        </div>
                        <div className='cart_page_mobile_checkout' >
                            <div className='cart_page_mobile_checkout_top' >
                                <div className='cart_page_mobile_checkout_top_left' >
                                    <span className='cart_page_mobile_checkout_top_left_text' >{cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items</span>
                                </div>
                                <div className='cart_page_mobile_checkout_top_right' >
                                    <span className='cart_page_mobile_checkout_top_right_text' >R {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</span>
                                </div>
                            </div>
                            <div className='cart_page_mobile_checkout_bottom' >
                                <button
                                type='submit'
                                 variant="primary"
                                 onClick={checkoutHandler}
                                 disabled={cartItems.length === 0}
                                className='cart_page_mobile_checkout_bottom_btn' >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartPage
