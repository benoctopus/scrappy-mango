import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/lib/Navbar'

@connect(store => {
  console.log('store', store);
  return store
})
class Nav extends Component {
  render() {
    return (
      <Navbar id='nav-bar'>
        <div/>
          <Navbar.Header>
            <Navbar.Brand>
              <h1>
                Scrapp(e) Mango
              </h1>
            </Navbar.Brand>
          </Navbar.Header>
        <div/>
      </Navbar>
    )
  }
}

export default Nav;