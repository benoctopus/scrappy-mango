import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ArticleList from '../presentational/ArticleList';
import ArticleListElement from '../presentational/ArticleListElement';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Button from 'react-bootstrap/lib/Button';

@connect(store => store)
class ArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getArticles(this.props.subReddits, false)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.subReddits.currentSub !== nextProps.subReddits.currentSub
      || this.props.subReddits.offset !== nextProps.subReddits.offset
    ) {
      this.setState({ articles: null })
      this.getArticles(nextProps.subReddits);
    }
  }

  handleClick(event) {
    const dir = event.target.dataset.dir;
    if (dir === 'left') {
      this.props.dispatch({ type: 'PREVIOUS_OFFSET' })
    } else if (dir === 'right') {
      this.props.dispatch({ type: 'NEXT_OFFSET' })
    }
  }

  getArticles({ currentSub, offset }, clearState = true) {
    axios.get(
      `/api/articles/?sub=${currentSub}`
      + `&offset=${offset}`
    )
      .then((res) => {
        console.log('get');
        this.setState({
          articles: res.data,
        });
      });

  }

  generateList() {
    return this.state.articles.map(article => (
      <ArticleListElement
        {...article}
        key={article.pid}
      />
    ));
  }

  render() {
    if (!this.state.articles) {
      return (
        <ArticleList id="article-list">
          <ListGroupItem>
            <h2 style={{ textAlign: 'center' }}>Scraping...</h2>
            <ProgressBar striped active now={100} />
          </ListGroupItem>
        </ArticleList>
      );
    }
    return (
      <ArticleList id="article-list">
        <li id="sub-title">
          <h2 id="sub-title-header">{`/r/${this.props.subReddits.currentSub}`}</h2>
        </li>
        {this.generateList()}
        <li id="mob">
          {
            this.props.subReddits.offset > 0 ? 
            <button 
              id="button-l" 
              className="btn" 
              data-dir="left"
              onClick={event => this.handleClick(event)}
            >
              Previous
            </button>
            : null
          }
          <button 
            id="button-r" 
            className="btn" 
            data-dir= "right"
            onClick={event => this.handleClick(event)}
          >
            Next
          </button>
        </li>
      </ArticleList>
    );
  }
}

export default ArticleContainer;
