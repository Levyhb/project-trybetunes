import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isButtonDisabled: true,
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ username: target.value }, this.handleButton);
  }

  handleButton = () => {
    const { username } = this.state;
    const maxLength = 3;
    const enabledButton = username.length < maxLength;
    this.setState({ isButtonDisabled: enabledButton });
  }

  loadingEvent = (loadingState) => {
    this.setState({ isLoading: loadingState });
  }

  render() {
    const { username, isButtonDisabled, isLoading } = this.state;
    return (
      <div>
        <Switch>
          {/* <Route path="/album/:id" component={ Album } /> */}
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route
            path="/profile"
            component={ Profile }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/search" component={ Search } />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                handleChange={ this.handleChange }
                username={ username }
                isButtonDisabled={ isButtonDisabled }
                isLoading={ isLoading }
                loadingEvent={ this.loadingEvent }
              />
            ) }
          />
          <Route component={ NotFound } />

        </Switch>
      </div>

    );
  }
}

export default App;
