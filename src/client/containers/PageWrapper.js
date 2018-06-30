import React, { Component } from 'react';
import ArticleContainer from './ArticleContainer';

class PageWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }
  render() {
    return (
      <main id="page-wrapper">
        <ArticleContainer />
        <h1>hello</h1>
      </main>
    );
  }
}

export default PageWrapper;
