import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import './header.css';

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
      <header data-testid="header-component" className="header-container">
        { loadingState
          ? <Loading /> : (
            <div>
              <div className="header-titles">
                <h1> TrybeTunes</h1>
                <h3 data-testid="header-user-name">
                  { username }
                </h3>
              </div>
              <nav className="nav-div">
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              </nav>

            </div>
          ) }
      </header>
    );
  }
}

export default Header;
