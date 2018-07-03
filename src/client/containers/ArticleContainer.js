import React, { Component } from 'react';
import axios from 'axios';
import ArticleList from '../presentational/ArticleList';
import ArticleListElement from '../presentational/ArticleListElement';

class ArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }
  componentDidMount() {
    axios.get('/api/')
      .then((res) => {
        console.log('get');
        this.setState({
          articles: res.data,
        });
      });
  }
  generateList() {
    if (!this.state.articles) {
      return null;
    }
    return this.state.articles.map(article => (
      <ArticleListElement
        {...article}
        key={article.pid}
      />
    ));
  }
  render() {
    return (
      <ArticleList>
        {this.generateList()}
      </ArticleList>
    );
  }
}

export default ArticleContainer;
