import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isFavorite: false,
      musicasFavoritas: [],
    };
  }

  favoriteSongs = async () => {
    this.setState({ isLoading: true });
    await addSong();
    this.setState({ isLoading: false });
  }

  componentDidMount = async () => {
    await this.favoriteSongs();
  }

  handleChange = ({ target }) => {
    const { music } = this.props;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
    this.setState((prevState) => {
      if (name) {
        this.setState({ musicasFavoritas: [...prevState.musicasFavoritas, music] });
      }
    });
  }

  render() {
    const { isLoading, isFavorite, musicasFavoritas } = this.state;
    const { previewUrl, trackName, trackId } = this.props;
    console.log(musicasFavoritas);
    return (
      <div>
        { isLoading ? <Loading /> : (
          <div>
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
                onChange={ this.handleChange }
                onClick={ this.favoriteSongs }
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
};
