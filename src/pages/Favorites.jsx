import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

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
    const { playMusic } = this.props;

    return (
      <div>
        <Header />
        <div data-testid="page-favorites" className="page-favorites">
          { isLoading ? <Loading /> : (
            <div>
              <div className="header-favorites">
                <h2 className="favorites-title">Favorite musics</h2>
              </div>
              <div className="favorites-container">
                { favoriteSongs.map((song) => (
                  <div key={ song.trackId } className="favorites-box">
                    <div className="favorites-musics">
                      <img src={ song.artworkUrl100 } alt={ song.trackName } />
                      <span>{song.artistName}</span>
                      <MusicCard
                        className="music-card-component"
                        previewUrl={ song.previewUrl }
                        trackName={ song.trackName }
                        image={ song.artworkUrl100 }
                        trackId={ song.trackId }
                        favoritesSongs={ favoriteSongs }
                        nameArtist={ song.artistName }
                        isFavorite={
                          favoriteSongs.some((a) => a.trackId === song.trackId)
                        }
                        music={ song }
                        handleChangeFavorites={ this.handleChangeFavorites }
                        playMusic={ playMusic }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  playMusic: PropTypes.func.isRequired,
};
