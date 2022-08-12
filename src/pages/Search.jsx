import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import 'react-tippy/dist/tippy.css';

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
              <h2 className="search-title">Search</h2>
              <form action="" className="search-container input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  data-testid="search-artist-input"
                  name="search"
                  placeholder="Artist Name"
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  className="btn btn-outline-secondar btn-search"
                  data-testid="search-artist-button"
                  disabled={ isButtonDesabled }
                  onClick={ this.searchArtist }
                >
                  Seach
                </button>
              </form>
              { activateButton ? (
                <span className="result-search">
                  Result of albums by :
                  {' '}
                  { artistName }
                </span>
              ) : ''}
              <div className="album-search">
                { artistsAlbuns.length > 0 ? artistsAlbuns.map((album) => {
                  const imgHD = album.artworkUrl100.replace(/100x100bb/g, '500x500bb');
                  return (
                    <div
                      key={ album.collectionId }
                      className="card-album-container"
                    >
                      <Tooltip
                        title="Go to the album"
                      >
                        <Link
                          className="card card-album"
                          to={ `/project-trybetunes/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          <img src={ imgHD } alt={ album.artistName } />
                          <h4 className="album-search-name">
                            {' '}
                            { album.collectionName }
                          </h4>
                          <span className="artist-search-name">
                            { album.artistName }
                            {' '}
                          </span>
                        </Link>
                      </Tooltip>
                    </div>

                  );
                }) : (
                  <div>
                    <h3
                      className="result-search-none"
                    >
                      No album was found
                    </h3>

                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
