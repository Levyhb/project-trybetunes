import React, { Component } from 'react';
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
            <h3 data-testid="header-user-name">
              { username }
            </h3>) }
      </header>
    );
  }
}

export default Header;
