import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Admin from "routes/Admin";
import Tag from "routes/Admin/Tag"

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/*<Route path="/" exact component={IndexPage} />*/}
        <Route path="/admin" exact component={Admin} />
        <Route path="/tag" exact component={Tag} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
