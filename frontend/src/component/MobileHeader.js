import React, { useContext } from 'react'
import '../MobileHeader.css'
import SearchForm from './SearchForm'
import { Store } from '../Store';
//icons
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuIcon from '@mui/icons-material/Menu';

function MobileHeader() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <div className='mobile_header' >
      <div className='mobile_header_top' >
        <div className='mobile_header_top_left' >
          <button className="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" >
            <MenuIcon fontSize='medium' />
          </button>
        </div>
        <div className='mobile_header_top_center' >
          <span className='mobile_header_top_center_logo' >ME</span>
        </div>
        <div className='mobile_header_top_right' >
          <Link to='/cart' style={{ textDecoration: 'none' }} >
            <div className='mobile_header_top_right_cart' >
              <span className='mobile_header_top_right_cart_icon' >
                <ShoppingCartIcon fontSize='small' />
              </span>
              <span className='mobile_header_top_right_cart_count' >{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
            </div>
          </Link>
        </div>
      </div>
      <div className='mobile_header_bottom' >
        <SearchForm />
      </div>
      <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">

          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          {userInfo ? (
            <div className='mobile_header_drawer' >


              <div className='mobile_header_drawer_center'>
                <Link to='/' style={{ textDecoration: 'none' }} >
                  <div className='mobile_header_drawer_center_link_con' >
                    <span className='mobile_header_drawer_center_link_con_left' >
                      <HomeIcon />
                    </span>
                    <span className='mobile_header_drawer_center_link_con_right' >Home</span>
                  </div>
                </Link>

                <Link to='/search' style={{ textDecoration: 'none' }} >
                  <div className='mobile_header_drawer_center_link_con' >
                    <span className='mobile_header_drawer_center_link_con_left' >
                      <SearchIcon />
                    </span>
                    <span className='mobile_header_drawer_center_link_con_right' >Search</span>
                  </div>
                </Link>
                <Link to='/profile' style={{ textDecoration: 'none' }} >
                  <div className='mobile_header_drawer_center_link_con' >
                    <span className='mobile_header_drawer_center_link_con_left' >
                      <PersonIcon />
                    </span>
                    <span className='mobile_header_drawer_center_link_con_right' >Profile</span>
                  </div>
                </Link>
                <Link to='/orderhistory' style={{ textDecoration: 'none' }} >
                  <div className='mobile_header_drawer_center_link_con' >
                    <span className='mobile_header_drawer_center_link_con_left' >
                      <AssignmentIcon />
                    </span>
                    <span className='mobile_header_drawer_center_link_con_right' >Orders</span>
                  </div>
                </Link>

                
                <div className='mobile_header_drawer_category' >
                  <span className='mobile_header_drawer_category_top' >Shop By Department</span>
                  <div className='mobile_header_drawer_category_bottom' >
                    <Link to='/'  style={{ textDecoration: 'none' }} >
                      <span className='mobile_header_drawer_category_bottom_link' >Fruits</span>
                    </Link>
                    <Link to='/'  style={{ textDecoration: 'none' }} >
                      <span className='mobile_header_drawer_category_bottom_link' >Vegitables</span>
                    </Link>
                  </div>
                </div>
               

              </div>
              <div className='mobile_header_drawer_bottom' >

                <button type='submit' onClick={signoutHandler} className='mobile_header_drawer_bottom_logout_btn' >

                  <span className='mobile_header_drawer_bottom_logout_left' >
                    <Logout fontSize="small" />
                  </span>
                  <span className='mobile_header_drawer_bottom_logout_rigth' >
                    Logout
                  </span>
                </button>

              </div>
            </div>


          ) : (
          
              <div className='mobile_header_drawer' >

                <div className='mobile_header_drawer_center'>
                  <Link to='/' style={{ textDecoration: 'none' }} >
                    <div className='mobile_header_drawer_center_link_con' >
                      <span className='mobile_header_drawer_center_link_con_left' >
                        <HomeIcon />
                      </span>
                      <span className='mobile_header_drawer_center_link_con_right' >Home</span>
                    </div>
                  </Link>


                  <Link to='/search' style={{ textDecoration: 'none' }} >
                    <div className='mobile_header_drawer_center_link_con' >
                      <span className='mobile_header_drawer_center_link_con_left' >
                        <SearchIcon />
                      </span>
                      <span className='mobile_header_drawer_center_link_con_right' >Explore</span>
                    </div>
                  </Link>

                  <div className='mobile_header_drawer_category' >
                  <span className='mobile_header_drawer_category_top' >Shop By Department</span>
                  <div className='mobile_header_drawer_category_bottom' >
                    <Link to='/'  style={{ textDecoration: 'none' }} >
                      <span className='mobile_header_drawer_category_bottom_link' >Fruits</span>
                    </Link>
                    <Link to='/'  style={{ textDecoration: 'none' }} >
                      <span className='mobile_header_drawer_category_bottom_link' >Vegitables</span>
                    </Link>
                  </div>
                </div>
               
                </div>
                <div className='mobile_header_drawer_bottom' >
                  <Link to='/signin' style={{ textDecoration: 'none' }}>
                    <span className='mobile_header_drawer_bottom_login' >
                      Login
                    </span>
                  </Link>
                </div>
              </div>
           
          )}

        </div>
      </div>
    </div>
  )
}

export default MobileHeader
