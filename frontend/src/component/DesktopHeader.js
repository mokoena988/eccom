import React, { useContext } from 'react'
import '../DesktopHeader.css'
import SearchForm from './SearchForm'
import { Link } from 'react-router-dom';

//icons
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Store } from '../Store';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';

function DesktopHeader() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='desktop_header' >
      <div className='desktop_header_left' >
      <Link to='/' style={{ textDecoration: 'none', color: 'black' }} >

        <span className='desktop_header_left_logo' >ME</span>
        </Link>
      </div>
      <div className='desktop_header_center' >
        <SearchForm />
      </div>
      <div className='desktop_header_right' >

        <Link to='/cart' style={{ textDecoration: 'none' }} >


          <div className='desktop_header_right_cart' >
            <span className='desktop_header_right_cart_icon' >
              <ShoppingCartIcon fontSize='small' />
            </span>
            <span className='desktop_header_right_cart_count' >{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
          </div>

        </Link>
        {userInfo ? (
          <div className='desktop_header_right_account_settings_parent' >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <AccountCircleIcon fontSize='large' />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <div className='desktop_header_right_account_settings' >
                <span>{userInfo.name}</span>
                <span>{userInfo.email}</span>
              </div>
              <Divider />
             
              <MenuItem onClick={handleClose}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/profile' >
                  <AccountCircleIcon fontSize='large' /> Profile
                </Link>
              </MenuItem>



              <MenuItem onClick={handleClose}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/orderhistory' >
                  <AssignmentIcon fontSize='large' /> Orders
                </Link>
              </MenuItem>
              <Divider /> 

            

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <button className='desktop_header_right_account_settings_logout' onClick={signoutHandler} >
                  <Logout fontSize="small" />
                
               <span className='desktop_header_right_account_settings_logout_text' >
                Logout
               </span>
                </button>
              </MenuItem>
            </Menu>
          </div>

        ) : (
          <div className='desktop_header_right_account_settings_parent_offline' >
            <Link style={{ textDecoration: 'none', color: 'black' }} to='/signin' >
              <div className='desktop_header_right_account_settings_signin_con' >
              <span className='desktop_header_right_account_settings_signin_con_left' >
                <AccountCircleIcon fontSize='large' />
              </span>
              <div className='desktop_header_right_account_settings_signin_con_right' >
                <span>Hello!</span>
                <span>Signin</span>
              </div>
              </div>
            </Link>
          </div>
        )}

{userInfo && userInfo.isAdmin && (
          <div className='desktop_header_right_account_settings_parent' >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <DashboardIcon fontSize='large' />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <div className='desktop_header_right_account_settings' >
                <span>{userInfo.name}</span>
                <span>{userInfo.email}</span>
              </div>
              <Divider />
          
                  <MenuItem onClick={handleClose}>
                  <Link style={{ textDecoration: 'none', color: 'black' }} to='/admin/orders' >
                    <AssignmentIcon fontSize='large' /> Orders
                  </Link>
                </MenuItem>
            
              <MenuItem onClick={handleClose}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/admin/products' >
                  <AccountCircleIcon fontSize='large' /> Products
                </Link>
              </MenuItem>



              <MenuItem onClick={handleClose}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/admin/users' >
                  <AccountCircleIcon fontSize='large' /> Users
                </Link>
              </MenuItem>
              <Divider />

            

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <button className='desktop_header_right_account_settings_logout' onClick={signoutHandler} >
                  <Logout fontSize="small" />
                
               <span className='desktop_header_right_account_settings_logout_text' >
                Logout
               </span>
                </button>
              </MenuItem>
            </Menu>
          </div>
  )}
      

      </div>
    </div>
  )
}

export default DesktopHeader
