import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/lib/Navbar'
import menuIcon from '../icons/menu.svg';

@connect(store => {
  console.log('store', store);
  return store
})
class NavbarWrapper extends Component {
  render() {
    return (
      <header id='nav-bar'>
        <div/>
          <Navbar.Brand>
            <h1>
              Scrapp(e) Mango
            </h1>
          </Navbar.Brand>
        <div id="image-div">
          <img src={menuIcon} />
        </div>
      </header>
    )
  }
}

export default NavbarWrapper;