import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const favorited = await getFavoriteSongs();
    this.setState({ favoriteSongs: await favorited, isLoading: false });
  }

  handleChangeFavorites = (music) => {
    this.setState({ isLoading: true }, async () => {
      await removeSong(music);
      const favorited = await getFavoriteSongs();
      this.setState({ favoriteSongs: favorited, isLoading: false });
    });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <h2>Favorites</h2>
            { favoriteSongs.map((song) => (
              <div key={ song.trackId }>
                <img src={ song.artworkUrl60 } alt={ song.trackName } />
                <MusicCard
                  previewUrl={ song.previewUrl }
                  trackName={ song.trackName }
                  trackId={ song.trackId }
                  favoritesSongs={ favoriteSongs }
                  isFavorite={ favoriteSongs.some((a) => a.trackId === song.trackId) }
                  music={ song }
                  handleChangeFavorites={ this.handleChangeFavorites }
                />
              </div>
            ))}
          </div>

        )}
      </div>
    );
  }
}
