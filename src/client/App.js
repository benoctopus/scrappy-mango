import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import getSubreddits from './actions/getSubreddits';
import PageWrapper from './containers/PageWrapper';
import './app.scss';

class App extends Component {
  componentDidMount() {
    store.dispatch(getSubreddits());
  }
  render() {
    return (
      <Provider store={store}>
        <PageWrapper />
      </Provider>
    );
  }
}

export default App;
