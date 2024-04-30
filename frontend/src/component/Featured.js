import React from 'react'
import { Link } from 'react-router-dom';
import '../Featured.css'
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
//icons
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Featured(props) { 

    const { product } = props;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
      cart: { cartItems },
    } = state;
  
    const addToCartHandler = async (item) => {
      const existItem = cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
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

    return (
        <div  className='featured_card' >
            <button onClick={() => addToCartHandler(product)}  className='featured_card_btn' >
                <ShoppingCartIcon />
            </button>
            <img src={product.image} alt='' className='featured_card_img' />
            <div className='featured_card_details' >
                <div className='featured_card_details_top' >
                    <span className='featured_card_details_top_name' >{product.name}</span>
                </div>
                <div className='featured_card_details_center' >
                    <span className='featured_card_details_center_rating' >
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                    </span>
                </div> 
                <div className='featured_card_details_bottom' >
                    <div className='featured_card_details_bottom_left' >
                        <span className='featured_card_details_bottom_left_price' >R{product.price}</span>
                    </div>
                    <div className='featured_card_details_bottom_right' >
                        <span className='featured_card_details_bottom_right_size' >{product.size}kg</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured
