import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDesabled: true,
      artistName: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ artistName: target.value }, this.handleButton);
  }

  handleButton = () => {
    const { artistName } = this.state;
    const maxLength = 1;
    const enabledButton = artistName.length <= maxLength;
    this.setState({ isButtonDesabled: enabledButton });
  }

  render() {
    const { isButtonDesabled } = this.state;
    return (
      <div data-testid="page-search">
        <h2>Search</h2>
        <form action="">
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do artista"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDesabled }
          >
            Pesquisar

          </button>
        </form>
        <Header />
      </div>
    );
  }
}
