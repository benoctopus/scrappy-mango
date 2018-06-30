import React from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import propTypes from 'prop-types';

const ArticleListElement = props => (
  <ListGroupItem
    aid={props.aid}
    className="list-item"
  >
    <div className="list-item-text">
      <h3 className="list-item-title">
        {props.title}
      </h3>
      <a
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        className="list-item-link"
      >
        {props.link}
      </a>
    </div>
  </ListGroupItem>
);

ArticleListElement.propTypes = {
  aid: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
};


export default ArticleListElement;
