import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
// react-redux package binds react and redux together
import { Provider } from 'react-redux';

import CardsContainer from './components/cards-container.component';

function App() {
  return (
    // <Provider store={store}>
      <Router>
        <Route path="/" exact component={CardsContainer}/>
      </Router>
    // <Provider>
  );
}

export default App;
