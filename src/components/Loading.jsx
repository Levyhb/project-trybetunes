import React, { Component } from 'react';
import '../pages/pages.css';

export default class Loading extends Component {
  render() {
    return (
      // FALTA ADICIONAR TEMPO DE LOADING
      <div>
        <div className="lds-roller loading">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
