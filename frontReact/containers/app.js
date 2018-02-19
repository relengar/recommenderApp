import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginContainer from './loginContainer';
import UserContainer from './userContainer';
import CompanyContainer from './companyContainer';
import MainPage from './mainPage';

const App = () => {
  return (
    <div>
      <LoginContainer/>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/app/user" component={UserContainer} />
          <Route exact path="/app/user/:id?" component={UserContainer} />
          <Route exact path="/app/company" component={CompanyContainer} />
          <Route exact path="/app/company/:id?" component={CompanyContainer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
