import React from 'react';

import NavBarIcon from '../../Assets/icon-park_green-house.png'

import './AppBar.css'

export function AppBar() {
  return (
    <div className='Main'>
      <div className='NavBar'>
        <img src={NavBarIcon} height='30px' margin='auto' alt='House Icon' />
        <h3>Let's find a house</h3>
      </div>
    </div>
  )
}