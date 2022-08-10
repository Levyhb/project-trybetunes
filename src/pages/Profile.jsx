import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
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
          <div className="profile-container">
            <h2 className="profile-title">Profile</h2>
            <div className="">
              <div className="img-edit-profile">
                <img
                  src={ user.image }
                  alt={ user.name }
                  data-testid="profile-image"
                  className="profile-img"
                />
                <Link
                  to="/profile/edit"
                  className="btn btn-outline-primary"
                >
                  Editar perfil
                </Link>
              </div>
              <div className="profile-info">

                <label htmlFor="name" className="info-format ">
                  Name
                  <span name="name">{user.name}</span>
                </label>
                <label
                  htmlFor="name"
                  className="info-format"
                >
                  Email
                  <span name="name">{user.email}</span>
                </label>
                <label
                  htmlFor="description"
                  className="info-format"
                >
                  Description
                  <span name="description">{user.description}</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
