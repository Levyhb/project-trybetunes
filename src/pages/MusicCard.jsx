import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isChecked: false,
    };
  }

  favoriteSongs = async () => {
    const { trackId } = this.props;
    this.setState({ isLoading: true });
    await addSong(trackId);
    this.setState({ isLoading: false });
  }

  componentDidMount = async () => {
    await this.favoriteSongs();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { isLoading, isChecked } = this.state;
    const { previewUrl, trackName, trackId } = this.props;
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
              htmlFor="favorites"
            >
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name="isChecked"
                id="favorites"
                checked={ isChecked }
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
