import React, { Component } from 'react';
import Header from '../components/Header';

export default class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <h2>Favorites</h2>
        <Header />
      </div>
    );
  }
}
