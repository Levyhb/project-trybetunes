import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      userImage: '',
      loadingState: false,
    };
  }

  getUsername = async () => getUser()

  componentDidMount = async () => {
    this.setState({ loadingState: true });
    const user = await getUser();
    this.setState({ username: user.name, userImage: user.image, loadingState: false });
  }

  render() {
    const { username, loadingState, userImage } = this.state;

    return (
      <header data-testid="header-component" className="">
        { loadingState
          ? <Loading /> : (
            <div>
              <div className="header-titles header-container">
                <h1>
                  <span className="trybe-title">Trybe</span>
                  Tunes
                </h1>
                <Link to="/profile" className="perfil-icon">
                  { userImage.length === 0 ? (
                    <lord-icon
                      src="https://cdn.lordicon.com/dxjqoygy.json"
                      trigger="hover"
                      className="icons"
                      style={ { width: '50px', height: '50px' } }
                    />
                  ) : (
                    <img
                      src={ userImage }
                      alt={ username }
                      className="img-perfil"
                    />
                  )}
                  <h3 data-testid="header-user-name" className="name-icon">
                    { username }
                  </h3>
                </Link>
              </div>

              <nav className="nav-div">
                <NavLink
                  to="/search"
                  activeClassName="nav-link-active"
                  data-testid="link-to-search"
                  className="nav-item"
                >
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/msoeawqm.json"
                      trigger="hover"
                      style={ { width: '50px', height: '50px' } }
                    />
                    Search
                  </div>
                </NavLink>
                <NavLink
                  to="/favorites"
                  activeClassName="nav-link-active"
                  data-testid="link-to-favorites"
                  className="nav-item"
                >
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/rjzlnunf.json"
                      trigger="hover"
                      style={ { width: '50px', height: '50px' } }
                    />
                    Favorites
                  </div>
                </NavLink>
                <NavLink
                  to="/profile"
                  activeClassName="nav-link-active"
                  data-testid="link-to-profile"
                  className="nav-item"
                >
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/dxjqoygy.json"
                      trigger="hover"
                      style={ { width: '50px', height: '50px' } }
                    />
                    Profile
                  </div>
                </NavLink>
              </nav>
            </div>
          ) }
      </header>
    );
  }
}

export default Header;
