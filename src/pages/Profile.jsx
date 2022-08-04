import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
// import ProfileEdit from './ProfileEdit';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      user: [],
    };
  }

  componentDidMount = async () => {
    await this.getUserInformations();
  }

  getUserInformations = async () => {
    this.setState({ isLoading: true });
    const userData = await getUser();
    this.setState({ user: userData, isLoading: false });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : (
          <section>
            <h2>Profile</h2>
            <div>
              <img src={ user.image } alt={ user.name } data-testid="profile-image" />
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.description}</span>
              <Link to="/profile/edit"> Editar perfil </Link>
            </div>
          </section>
        )}
      </div>
    );
  }
}
