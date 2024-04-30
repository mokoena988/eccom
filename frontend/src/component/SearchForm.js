import React from 'react'
import '../SearchForm.css'

//icons
import SearchIcon from '@mui/icons-material/Search';

function SearchForm() {
  return ( 
    <form className='search_form' >
      <input placeholder='Search Product' className='search_form_input' />
      <button type='submit' className='search_form_btn' >
      <SearchIcon />
      </button>
    </form>
  )
}

export default SearchForm
