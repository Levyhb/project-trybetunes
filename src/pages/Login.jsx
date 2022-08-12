import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import trybeTunes from '../img/trybetune-logo.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  handleCreateUser = async () => {
    this.setState({ isLoading: true });
    const { username, loadingEvent, history } = this.props;
    loadingEvent(true);
    await createUser({ name: username });
    history.push('/project-trybetunes/search');
    this.setState({ isLoading: false });
  }

  render() {
    const { isButtonDisabled, handleChange } = this.props;
    const { isLoading } = this.state;
    return (
      <div data-testid="page-login" className="login-page">
        { isLoading
          ? <Loading />
          : (
            <div>
              <section className="login-container">
                <img
                  src={ trybeTunes }
                  alt="trybetunes-logo"
                  className="trybetunes-logo"
                />
                <form action="">
                  <label htmlFor="login-name" className="name-login">
                    User
                    <input
                      type="text"
                      data-testid="login-name-input"
                      id="login-name"
                      className="form-control"
                      onChange={ handleChange }
                    />
                    <button
                      data-testid="login-submit-button"
                      className="btn btn-success"
                      onClick={ this.handleCreateUser }
                      type="button"
                      disabled={ isButtonDisabled }
                    >
                      Entrar
                    </button>
                  </label>
                </form>
              </section>
            </div>
          ) }
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
};

export default Login;
