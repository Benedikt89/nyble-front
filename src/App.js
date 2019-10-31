import React from 'react';
import './App.css';
import Main from "./Components/Main";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Redux/Store";

function App() {
  return (
      <div className="App">
          <HashRouter basename={process.env.PUBLIC_URL}>
              <Provider store={store}>
                  <Main/>
              </Provider>
          </HashRouter>
      </div>
  );
}

export default App;
