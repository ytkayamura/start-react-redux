import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux'
import { Provider } from 'react-redux'

// Component
let App = ({ message, add, remove }) => (
  <div>
      <div>{message}</div>
      <button onClick={add}>+</button>
      <button onClick={remove}>-</button>
  </div>
);

// Connected Component
App = connect(
  // mapStateToProps
  state => ({
    message: state.message,
  }),
  // mapDispatchToProps
  dispatch => ({
    add: () => dispatch({type: 'ADD'}),
    remove: () => dispatch({type: 'REMOVE'}),
  })
)(App);

// Reducer
const initialAppState = {
  messageBase: 'Hello React Redux',
  message: 'Hello React Redux!',
  count: 1,
};
const appReducer = (state = initialAppState, action) => {
  let count = state.count;
  if (action.type === 'ADD') {
    count++;
  } else if(action.type === 'REMOVE') {
    count = --count > 0 ? count : 0;
  }
  return {
    ...state,
    message: state.messageBase + '!'.repeat(count > 0 ? count : 0),
    count: count,
  };
}

// Initialization
const appStore = createStore(appReducer);
ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('app')
);

