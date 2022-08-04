import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import './pages.css';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { isLoading } = this.state;
    const { previewUrl, trackName, trackId,
      handleChangeFavorites, isFavorite, music } = this.props;
    return (
      <div>
        { isLoading ? <Loading /> : (
          <div className="music-div">
            <span>
              { trackName }

            </span>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor={ trackId }
            >
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name="isFavorite"
                id={ trackId }
                checked={ isFavorite }
                onChange={ (event) => handleChangeFavorites(music, event) }
              />

            </label>
          </div>
        )}

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  handleChangeFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};
