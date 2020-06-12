import React from 'react';
import './App.css';
import { Homepage } from './containers/Homepage';
import { Switch, Route, Router, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import { Board } from './containers/Board';
import { NotFound } from './containers/NotFound';
import { ContentContainer } from './containers/ContentContainer';

const tempAuth = true;
function App() {

  function notFound() {
    return (
      <>
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
      </>
    );
  }

  return (
    <div className="App">
        <Router history={createBrowserHistory("/")}>
          {tempAuth ? (
            <ContentContainer>
              <Switch>
                <Route exact path={"/"} component={Board} />
                {notFound()}
              </Switch>
            </ContentContainer>
          ) : 
          (
            <Switch>
              <Route exact path={"/"} component={Homepage} />
              {notFound()}
            </Switch>
          )}
         
        
        </Router>
    </div>
  );
}

export default App;
