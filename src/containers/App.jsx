window.__DEVTOOLS__ = false;

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools.jsx';
import configureStore from '../store/configureStore';

const store = configureStore();

export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div>
          {this.props.children}
          {__DEVTOOLS__ && <DevTools />}
        </div>
      </Provider>
    );
  }
}

App.propTypes = {children: PropTypes.node};