import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import '../HomePage.css'

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import DesktopHeader from '../component/DesktopHeader';
import MobileHeader from '../component/MobileHeader';
import MobileProduct from '../component/MobileProduct';
import Product from '../component/Product';
import Featured from '../component/Featured';
import FeaturedMobile from '../component/FeaturedMobile';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div className='home_page' >
      <Helmet>
        <title>Home</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className='home_page_desktop' >
            <DesktopHeader />
            <div className='home_page_desktop_banner' >
              <img src='/baner.jpg' className='home_page_desktop_banner_img' alt='' />
            </div>
            <div className='home_page_desktop_category' >
              <div className='home_page_desktop_category_top' >
                <span className='home_page_desktop_category_top_heading' >Shop by Category</span>
              </div>
              <div className='home_page_desktop_category_bottom' >
                <Link to='/' style={{ textDecoration: 'none' }} >
                  <div className='home_page_desktop_category_bottom_card' >
                    <img src='/fruits.jpg' className='home_page_desktop_category_bottom_card_img' alt='' />
                    <span className='home_page_desktop_category_bottom_card_text' >Fruits</span>
                  </div>
                </Link>
                <Link to='/' style={{ textDecoration: 'none' }} >
                  <div className='home_page_desktop_category_bottom_card' >
                    <img src='/veg.jpg' className='home_page_desktop_category_bottom_card_img' alt='' />
                    <span className='home_page_desktop_category_bottom_card_text' >Vegitables</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className='home_page_desktop_featured' >
              <div className='home_page_desktop_featured_top' >
                <span className='home_page_desktop_featured_top_left' >Featured</span>
                <Link to='/' style={{ textDecoration: 'none' }} >
                  <span className='home_page_desktop_featured_top_right' >View All</span>
                </Link>
              </div>
              <Slide slidesToScroll={1} slidesToShow={4} indicators={false}>

                {products.map((product) => (

                  <Featured key={product.slug} product={product}></Featured>

                ))}
              </Slide>
            </div>
            <div className='home_page_desktop_product_list' >
              <div className='home_page_desktop_product_list_top' >
                <span className='home_page_desktop_product_list_top_heading' >Latest Products</span>
              </div>
              <div className='home_page_desktop_product_list_bottom_con' >

                {products.map((product) => (

                  <Product key={product.slug} product={product}></Product>

                ))}
              </div>
            </div>
          </div>
          <div className='home_page_mobile' >
            <MobileHeader />
            <div className='home_page_mobile_banner' >
              <img src='/baner.jpg' className='home_page_mobile_banner_img' alt='' />
            </div>
            <div className='home_page_mobile_category' >
              <div className='home_page_mobile_category_top' >
                <span className='home_page_mobile_category_top_heading' >Shop by Category</span>
              </div>
              <div className='home_page_mobile_category_bottom' >
                <Link to='/' style={{ textDecoration: 'none' }} >
                  <div className='home_page_mobile_category_bottom_card' >
                    <img src='/fruits.jpg' className='home_page_mobile_category_bottom_card_img' alt='' />
                    <span className='home_page_mobile_category_bottom_card_text' >Fruits</span>
                  </div>
                </Link>
                <Link to='/' style={{ textDecoration: 'none' }} >
                  <div className='home_page_mobile_category_bottom_card' >
                    <img src='/veg.jpg' className='home_page_mobile_category_bottom_card_img' alt='' />
                    <span className='home_page_mobile_category_bottom_card_text' >Vegitables</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className='home_page_mobile_featured' >
              <div className='home_page_mobile_featured_top' >
                <span className='home_page_mobile_featured_top_left' >Featured</span>
                <span className='home_page_mobile_featured_top_right' >View All</span>
              </div>
              <div className='home_page_mobile_featured_bottom' >

                {products.map((product) => (

                  <FeaturedMobile key={product.slug} product={product}></FeaturedMobile>

                ))}
              </div>
            </div>
            <div className='home_page_mobile_product_list' >
              <div className='home_page_mobile_product_list_top' >
                <span className='home_page_mobile_product_list_top_heading' >Latest Products</span>
              </div>
              <div className='home_page_mobile_product_list_bottom' >

                {products.map((product) => (

                  <MobileProduct key={product.slug} product={product}></MobileProduct>

                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default HomePage
