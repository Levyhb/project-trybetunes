import React, { Component } from 'react';
import './loading.css';

export default class Loading extends Component {
  render() {
    return (
      // ADICIONAR TEMPO DE LOADING
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
