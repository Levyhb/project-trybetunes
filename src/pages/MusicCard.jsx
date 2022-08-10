import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { Tooltip } from 'react-tippy';
import Loading from './Loading';
import './pages.css';
import AudioPlayer from './AudioPlayer';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      playing: false,
    };
  }

  playMusic = () => {
    const { playing } = this.state;
    if (!playing) {
      this.setState({ playing: true });
    } else {
      this.setState({ playing: false });
    }
  }

  render() {
    const { isLoading, playing } = this.state;
    const { previewUrl, trackName, trackId,
      handleChangeFavorites, isFavorite,
      artistName, music, image, nameArtist } = this.props;
    return (
      <div>

        { isLoading ? <Loading /> : (
          <div className="music-div">
            <div className="music-container-format">
              <span>
                { trackName }
              </span>
            </div>

            <div>
              <span>
                {artistName}
              </span>
            </div>
            <div>
              <audio
                data-testid="audio-component"
                src={ previewUrl }
                controls
                className="audio-control"
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
            </div>

            <div>
              <label
                htmlFor={ trackId }
              >
                <input
                  className="favorite-checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  name="isFavorite"
                  id={ trackId }
                  checked={ isFavorite }
                  onChange={ (event) => handleChangeFavorites(music, event) }
                />
                { !isFavorite ? (
                  <Tooltip title="Add to favorites?">
                    <FiHeart className="heart-icon" />
                  </Tooltip>
                )
                  : (
                    <Tooltip title="Remove of favorites?">
                      <FaHeart className="heart-icon" />
                    </Tooltip>
                  ) }
              </label>
            </div>
            <div className="btn-music-player">
              <lord-icon
                onClick={ this.playMusic }
                id="play-btn"
                src="https://cdn.lordicon.com/vnxmkidq.json"
                trigger="click"
                colors="primary:#e4e4e4,secondary:#08a88a"
                style={ { width: '50px', height: '50px' } }
              />
            </div>
            { playing ? (
              <AudioPlayer
                previewUrl={ previewUrl }
                trackName={ trackName }
                nameArtist={ nameArtist }
                image={ image }
                playMusic={ this.playMusic }
              />
            ) : null }
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
  artistName: PropTypes.string.isRequired,
  nameArtist: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};
