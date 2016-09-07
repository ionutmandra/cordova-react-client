import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools.jsx';


// const enhancer = compose(
//   applyMiddleware(thunk),
//   // Required! Enable Redux DevTools with the monitors you chose
//   DevTools.instrument(),
//   // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
//   persistState(false ? undefined : window.location.href.match(/[?&]debug_session=([^&]+)\b/))
// );


const enhancer = compose( 
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f );

export default initialState => {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState,  enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  /* eslint-disable no-undef, global-require */
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))

    );
  }
  /* eslint-enable no-undef, global-require */

  return store;
};
