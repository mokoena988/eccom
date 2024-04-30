
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

import '../ShippinPage.css'

function ShippinPage() {
 
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { 
      fullBox,
      userInfo,
      cart: { shippingAddress },
    } = state;
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [email, setEmail] = useState(shippingAddress.email || '');
    const [phone, setPhone] = useState(shippingAddress.phone || '');
    const [postalCode, setPostalCode] = useState(
      shippingAddress.postalCode || ''
    );
    useEffect(() => {
      if (!userInfo) {
        navigate('/signin?redirect=/shipping');
      }
    }, [userInfo, navigate]);
    const [country, setCountry] = useState(shippingAddress.country || '');
    const submitHandler = (e) => {
      e.preventDefault();
      ctxDispatch({
        type: 'SAVE_SHIPPING_ADDRESS',
        payload: {
          fullName,
          address,
          city,
          phone,
          email,
          postalCode,
          country,
          location: shippingAddress.location,
        },
      });
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify({
          fullName,
          address,
          city,
          phone,
          email,
          postalCode,
          country,
          location: shippingAddress.location,
        })
      );
      navigate('/placeorder');
    };
  
    useEffect(() => {
      ctxDispatch({ type: 'SET_FULLBOX_OFF' });
    }, [ctxDispatch, fullBox]);
  

    return (
        <div className='shippin_page' >
            <Helmet>
                <title>shiiping</title>
            </Helmet>
            <div className='shippin_page_desktop' >
                <div className='shippin_page_desktop_top' >
swretryy
                </div>
                <div className='shippin_page_desktop_bottom' >
                <span className='shippin_page_desktop_bottom_text' >Shipping Details</span>
                <form onSubmit={submitHandler} className='shippin_page_desktop_bottom_form' >
                <div className='shippin_page_desktop_bottom_form_input_parent' >
                    <div className='shippin_page_desktop_bottom_form_input_child_1' >
                        <span className='shippin_page_desktop_bottom_form_input_labbel' >Name</span>
                        <input  value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder='Enter your name' type='text' className='shippin_page_desktop_bottom_form_input' />
                    </div>
                    <div className='shippin_page_desktop_bottom_form_input_child_2' >
                        <span className='shippin_page_desktop_bottom_form_input_labbel' >Surname</span>
                        <input placeholder='Enter your surname' type='text' className='shippin_page_desktop_bottom_form_input' />
                    </div>
                    </div>
                    <div className='shippin_page_desktop_bottom_form_input_con' >
                        <span className='shippin_page_desktop_bottom_form_input_labbel' >Address</span>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} required placeholder='Enter street name'  type='text' className='shippin_page_desktop_bottom_form_input' />
                    </div>
                  
                    <div className='shippin_page_desktop_bottom_form_input_con' >
                        <span className='shippin_page_desktop_bottom_form_input_labbel' >Address(optional)</span>
                        <input placeholder='Optional' type='text' className='shippin_page_desktop_bottom_form_input' />
                    </div>
                    <div className='shippin_page_desktop_bottom_form_input_con' >
                        <span className='shippin_page_desktop_bottom_form_input_labbel' >Apartment Number(optional)</span>
                        <input placeholder='Apartment, Suite, unit etc' type='text' className='shippin_page_desktop_bottom_form_input' />
                    </div>
                    <div className='shippin_page_desktop_bottom_form_input_con' >
                        <span className='shippin_page_desktop_bottom_form_input_labbel' >Country</span>
                        <input value={country} onChange={(e) => setCountry(e.target.value)} required placeholder='Enter Country name'  type='text' className='shippin_page_desktop_bottom_form_input' />
                    </div>
                    <div className='shippin_page_desktop_bottom_form_input_parent' >
                    <div className='shippin_page_desktop_bottom_form_input_child_1' >
                        <span className='shippin_page_desktop_bottom_form_input_labbel' >City</span>
                        <input value={city} onChange={(e) => setCity(e.target.value)} required placeholder='Enter your city' type='text' className='shippin_page_desktop_bottom_form_input' />
                    </div>
                    <div className='shippin_page_desktop_bottom_form_input_child_2' >
                        <span className='shippin_page_desktop_bottom_form_input_labbel' >Postal Code</span>
                        <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required placeholder='Enter your Postal Code' type='text' className='shippin_page_desktop_bottom_form_input' />
                    </div>
                    </div>
                    <div className='shippin_page_desktop_bottom_form_input_con' >
                        <span className='shippin_page_desktop_bottom_form_input_labbel' >Email Number</span>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required  placeholder='Enter your Email ' type='text' className='shippin_page_desktop_bottom_form_input' />
                    </div>
                    <div className='shippin_page_desktop_bottom_form_input_con' >
                        <span className='shippin_page_desktop_bottom_form_input_labbel' >Phone Number</span>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} required  placeholder='Enter your Phone Number' type='text' className='shippin_page_desktop_bottom_form_input' />
                    </div>

                    <div className='shippin_page_desktop_bottom_form_btn_con' >
                        <button type='submit' className='shippin_page_desktop_bottom_form_btn' >
                            Proceed
                        </button>
                    </div>

                </form>
                </div>
            </div>
            <div className='shippin_page_mobile' >

            </div>
        </div>
    )
}

export default ShippinPage
