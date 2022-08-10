import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './pages.css';

export default class AudioPlayer extends Component {
  render() {
    const { previewUrl, image, trackName, artistName,
      playMusic, nameArtist } = this.props;
    return (
      <div className="audio-player-container">
        <img src={ image } alt={ trackName } />
        <div className="audio-player-names">
          <span className="trackName">{trackName}</span>
          <span className="artistName">{nameArtist }</span>
        </div>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
          className="audio-control-fixed"
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <button
          type="button"
          onClick={ playMusic }
          className="btn btn-audio-player"
        >
          X

        </button>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  playMusic: PropTypes.func.isRequired,
  artistName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
