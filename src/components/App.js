import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

// Router is BrowserRouter with custom history object now
// streams/:id 跟 streams/new 會讓 <Router> 在配對路由的時候會誤以為一個頁面有兩個元件
// 用 <Switch> 可以解決這個問題，<Switch> 會使網頁渲染第一個符合條件的元件
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={StreamList}></Route>
          <Route path="/streams/new" exact component={StreamCreate}></Route>
          <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
          <Route
            path="/streams/delete/:id"
            exact
            component={StreamDelete}
          ></Route>
          <Route path="/streams/:id" exact component={StreamShow}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
