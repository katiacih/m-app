import React, { Component } from 'react';
import createReduxStore from './reduxStore/index';
import { Provider } from 'react-redux';

import DefaultContainer from './components/view/DefaultContainer';

const reduxStore = createReduxStore();

class App extends Component {
  render() {

    return (
      <Provider store={ reduxStore }>
        <DefaultContainer />
      </Provider>
   
    );
  }
}

export default App;
