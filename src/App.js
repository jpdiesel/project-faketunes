import { React, Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <p style={{ textAlign: 'center', color: 'whitesmoke' }}>FAKETUNES</p> */}
        <Switch>
          <Route
            path="/search"
            render={ () => (<Search
              { ...this.state }
            />) }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/album" component={ Album } />
          <Route
            exact
            path="/"
            render={ () => (<Login
              { ...this.state }
            />) }
          />
          <Route exact path="/*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
