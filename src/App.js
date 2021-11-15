import { React, Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

const LOGIN_MINIMUN_CHAR = 3;

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginInput: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.enableLoginButton = this.enableLoginButton.bind(this);
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  enableLoginButton = () => {
    const { loginInput } = this.state;
    if (loginInput.length >= LOGIN_MINIMUN_CHAR) {
      return false;
    } return true;
  }

  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/album" component={ Album } />
          <Route
            exact
            path="/"
            render={ () => (<Login
              { ...this.state }
              enableLogin={ this.enableLoginButton() }
              onInputChange={ this.onInputChange }
            />) }
          />
          <Route exact path="/*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
