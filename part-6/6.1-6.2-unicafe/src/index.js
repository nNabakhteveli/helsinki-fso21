import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer)

const App = () => {

  const changeState = (actionType) => {
    store.dispatch({
      type: actionType
    })
  }

  return (
    <div>
      <button onClick={e => changeState("GOOD")}>good</button> 
      <button onClick={e => changeState("OK")}>ok</button> 
      <button onClick={e => changeState("BAD")}>bad</button>
      <button onClick={e => changeState("RESET")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}


renderApp()
store.subscribe(renderApp)
