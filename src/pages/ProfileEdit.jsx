import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      userStorageInformation: {},
      name: '',
      description: '',
      image: '',
      email: '',
    };
  }

  componentDidMount = async () => {
    await this.userInformations();
  }

  userInformations = async () => {
    this.setState({ isLoading: true });
    const userInform = await getUser();
    this.setState({
      userStorageInformation: userInform,
      name: userInform.name,
      email: userInform.email,
      description: userInform.description,
      image: userInform.image,
      isLoading: false,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value }, this.setUserInformation);
  }

  setUserInformation = () => {
    const { name, email, description, image } = this.state;
    this.setState({
      userStorageInformation: {
        name,
        email,
        image,
        description,
      },
    });
  }

  isButtonDisabled = (() => {
    const { name, email, description, image } = this.state;
    const verifyBtn = (name.length === 0
        || email.length === 0 || description.length === 0 || image.length === 0);
    return verifyBtn;
  })

  saveUserInfo = () => {
    const { history } = this.props;
    this.setState(async () => {
      const { userStorageInformation } = this.state;
      this.setState({ isLoading: true });
      await updateUser(userStorageInformation);
      this.setState({ isLoading: false });
      history.push('/profile');
    });
  }

  render() {
    const { isLoading, name, description, image, email } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <h2>Profile Edit</h2>
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                value={ name }
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                value={ email }
                data-testid="edit-input-email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <textarea
                name="description"
                value={ description }
                id="description"
                cols="30"
                rows="5"
                data-testid="edit-input-description"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="image">
              imagem
              <input
                type="text"
                name="image"
                value={ image }
                data-testid="edit-input-image"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ this.isButtonDisabled() }
              onClick={ this.saveUserInfo }
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.string.isRequired,
};
