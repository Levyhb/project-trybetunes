import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicsOfAlbum: [],
      artistName: '',
      albumName: '',
      albumImg: '',
      isLoading: false,
      favoritesSongs: [],
    };
  }

  albumMusic = async () => {
    const { match: { params: { id } } } = this.props;

    const req = await getMusics(id);
    const musicsTrack = req.filter((a) => a.kind);
    const albums = req.find((album) => album);

    this.setState({
      musicsOfAlbum: musicsTrack,
      artistName: albums.artistName,
      albumName: albums.collectionName,
      albumImg: albums.artworkUrl100,
    });
  }

  requestFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const reqFavoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoritesSongs: reqFavoriteSongs,
    });
  }

  componentDidMount = async () => {
    await this.albumMusic();
    await this.requestFavoriteSongs();
  }

  render() {
    const { musicsOfAlbum, artistName,
      albumImg, albumName, isLoading, favoritesSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <div>
              <img src={ albumImg } alt={ albumName } />
              <h2 data-testid="album-name">{albumName}</h2>
              <h3 data-testid="artist-name">{artistName}</h3>
            </div>
            { musicsOfAlbum.map((music) => (
              <div key={ music.trackId }>
                <MusicCard
                  previewUrl={ music.previewUrl }
                  trackName={ music.trackName }
                  trackId={ music.trackId }
                  favoritesSongs={ favoritesSongs }
                  music={ music }
                />
              </div>
            ))}
          </div>
        )}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }) }).isRequired,
};
