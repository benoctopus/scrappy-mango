import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

@connect(store => store)
class SideBarWrapper extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      subReddits: [],
      searchTerm: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    this.setState({
      searchTerm: event.target.value.toLowerCase()
    })
  }

  getSubReddits() {
    if (this.props.subReddits.status.fetching) {
      return <ListGroupItem> <h2>Loading...</h2> </ListGroupItem>
    }
    return this.state.subReddits
      .filter(sub => sub.name.toLowerCase().includes(this.state.searchTerm))
      .slice(0, 81)
      .map((sub, i) => (
      <ListGroupItem key={sub.name + i} data-name={sub.name} className="sub-link">
        {sub.name}
      </ListGroupItem>
      ))
    // return null;
  }


  componentWillReceiveProps(nextProps)  {
    console.log('next', nextProps);
    if (this.props.SubReddits !== nextProps.subReddits) {
      this.setState({ subReddits: nextProps.subReddits.subReddits })
    }
  }

  render() {
    return (
      <aside id="sidebar-wrapper">
        <ListGroup>
          <ListGroupItem>
            <input id="earch" onChange={event => this.handleSearch(event)} />
          </ListGroupItem>
          {this.getSubReddits()}
        </ListGroup>
      </aside>
    )
  }
}

export default SideBarWrapper;
