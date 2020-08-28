import React, { Component } from 'react';
import './App.css';
import Dashboard from './console/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreatePosts from './console/createPost';
import EditPost from './console/EditPost';
import ViewPost from './console/ViewPost';
import PageNotFound from './console/PageNotFound';
import Header from './console/header';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/create" component={CreatePosts} />
            <Route path="/edit/:id" component={EditPost} />
            <Route path="/view/:id" component={ViewPost} />
            <Route path="/404" component={PageNotFound} />
            <Route component={PageNotFound} />
          </Switch>
        </Router >
      </div >
    );
  }
}
export default App;
