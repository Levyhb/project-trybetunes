import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      loadingState: false,
    };
  }

  getUsername = async () => getUser()

  componentDidMount = async () => {
    this.setState({ loadingState: true });
    const user = await getUser();
    this.setState({ username: user.name, loadingState: false });
  }

  render() {
    const { username, loadingState } = this.state;

    return (
      <header data-testid="header-component">
        { loadingState
          ? <Loading /> : (
            <div>
              <nav>
                <Link to="/search" data-testid="link-to-search">Login</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              </nav>

              <h3 data-testid="header-user-name">
                { username }
              </h3>
            </div>
          ) }
      </header>
    );
  }
}

export default Header;
