import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  handleCreateUser = async () => {
    const { username, loadingEvent, history } = this.props;
    loadingEvent(true);
    await createUser({ name: username });
    history.push('/search');
  }

  render() {
    const { isButtonDisabled, handleChange, isLoading } = this.props;

    return (
      <div data-testid="page-login">
        { isLoading
          ? <Loading />
          : (
            <form action="">
              <label htmlFor="login-name">
                <input
                  type="text"
                  data-testid="login-name-input"
                  id="login-name"
                  onChange={ handleChange }
                />
              </label>

              <button
                data-testid="login-submit-button"
                onClick={ this.handleCreateUser }
                type="button"
                disabled={ isButtonDisabled }
              >
                Entrar
              </button>
            </form>) }
      </div>
    );
  }
}

Login.propTypes = {
  isButtonDisabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
  loadingEvent: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Login;
