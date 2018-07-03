import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

@connect(store => store)
class SideBarWrapper extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      subReddits: [],
      searchTerm: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSearch(event) {
    this.setState({
      searchTerm: event.target.value.toLowerCase()
    })
  }

  handleClick(event) {
    const name = event.target.dataset.name;
    this.props.dispatch({ type: 'CHANGE_SUBREDDIT', payload: { currentSub:  name } })
  }

  getSubReddits() {
    if (this.props.subReddits.status.fetching) {
      return <ListGroupItem>
          <h3>Hold up, Heroku is slow</h3>
          <ProgressBar striped active now={100} />
        </ListGroupItem>
    }

    return this.state.subReddits
      .filter(sub => sub.name.toLowerCase().includes(this.state.searchTerm))
      .slice(0, 50)
      .map((sub, i) => (
      <ListGroupItem 
        key={sub.name + i} 
        data-name={sub.name} 
        className="sub-link"
        onClick={event => this.handleClick(event)}
      >
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
          <ListGroupItem >
            <div id="search-bar" >
              <label htmlFor='search'>Filter</label>
              <input 
                id="search" 
                onChange={event => this.handleSearch(event)}
                placeholder="Top SubReddits"
              />
            </div>
          </ListGroupItem>
          {this.getSubReddits()}
        </ListGroup>
      </aside>
    )
  }
}

export default SideBarWrapper;
