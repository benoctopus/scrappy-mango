import React from 'react';
import propTypes from 'prop-types';
import ListGroup from 'react-bootstrap/lib/ListGroup';

const ArticleList = props => (
  <ListGroup id="ArticleList" className="article-list">
    {props.children}
  </ListGroup>
);

ArticleList.propTypes = {
  children: propTypes.array.isRequired,
};

export default ArticleList;
