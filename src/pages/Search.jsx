import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDesabled: true,
      artistName: '',
      loadingState: false,
      activateButton: false,
      artistsAlbuns: [],
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

  searchArtist = async () => {
    const { artistName } = this.state;
    this.setState({
      loadingState: true,
      artistsAlbuns: [],
      activateButton: true,
    });
    const artistResearched = await searchAlbumsAPI(artistName);
    this.setState({
      artistsAlbuns: artistResearched,
      loadingState: false,
    });
  }

  render() {
    const { isButtonDesabled,
      loadingState, artistsAlbuns, artistName, activateButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        { loadingState ? <Loading /> : (
          <section>
            <div>
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
                  onClick={ this.searchArtist }
                >
                  Pesquisar
                </button>
              </form>
              { activateButton ? (
                <span>
                  Resultado de álbuns de:
                  {' '}
                  { artistName }
                </span>
              ) : ''}
              <div>
                { artistsAlbuns.length > 0 ? artistsAlbuns.map((album) => (
                  <div key={ album.collectionId }>
                    <img src={ album.artworkUrl100 } alt={ album.artistName } />
                    <h3>
                      { album.artistName }
                      {' '}
                    </h3>
                    <span>
                      {' '}
                      { album.collectionName }
                    </span>
                    <p>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        Ir para o Álbum
                      </Link>
                    </p>

                  </div>

                )) : (
                  <div><span> Nenhum álbum foi encontrado </span></div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
