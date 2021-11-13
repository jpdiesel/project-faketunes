import { React, Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
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
        <p>TrybeTunes</p>
        <div data-testid="page-login">
          <Login />
        </div>
        <div data-testid="page-search">
          <Search />
        </div>
        <div data-testid="page-album">
          <Album />
        </div>
        <div data-testid="page-favorites">
          <Favorites />
        </div>
        <div data-testid="page-profile">
          <Profile />
        </div>
        <div data-testid="page-profile-edit">
          <ProfileEdit />
        </div>
        <div data-testid="page-not-found">
          <NotFound />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
