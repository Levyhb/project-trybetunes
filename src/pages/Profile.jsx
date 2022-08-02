import React, { Component } from 'react';
import Header from '../components/Header';

export default class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <h2>Profile</h2>
        <Header />
      </div>
    );
  }
}
