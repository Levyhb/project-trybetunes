import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <h2>Profile Edit</h2>
        <Header />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
};
