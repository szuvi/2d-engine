/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BoardProvider } from './contexts/BoardProvider';
import SimpleMain from './containers/SimpleMain';
import SimpleIntro from './containers/SimpleIntro';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <BoardProvider>
        <Switch>
          <Route path="/main">
            <SimpleMain />
          </Route>
          <Route path="/">
            <SimpleIntro />
          </Route>
          <Route path="*">
            <p>404</p>
          </Route>
        </Switch>
      </BoardProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
