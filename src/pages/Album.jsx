import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './pages.css';

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

  handleChangeFavorites = async (music, { target }) => {
    const { checked } = target;
    this.setState({ isLoading: true }, async () => {
      if (checked) {
        await addSong(music);
      } else {
        await removeSong(music);
      }
      this.requestFavoriteSongs();
    });
  }

  componentDidMount = async () => {
    await this.albumMusic();
    await this.requestFavoriteSongs();
  }

  render() {
    const { musicsOfAlbum, artistName,
      albumImg, albumName, isLoading, favoritesSongs } = this.state;
    const imgHd = albumImg.replace(/100x100bb/g, '500x500bb');
    // const trackPrev = musicsOfAlbum.previewUrl;
    return (
      <div data-testid="page-album" className="page-album">
        <Header />
        { isLoading ? <Loading /> : (
          <div className="album-container">
            <div className="div-album-box">
              <img src={ imgHd } alt={ albumName } className="album-img" />
              <h2 data-testid="album-name">{albumName}</h2>
              <h4 data-testid="artist-name">{artistName}</h4>
            </div>
            <div className="music-container">
              { musicsOfAlbum.map((music) => (
                <div key={ music.trackId }>
                  <MusicCard
                    previewUrl={ music.previewUrl }
                    trackName={ music.trackName }
                    trackId={ music.trackId }
                    nameArtist={ music.artistName }
                    image={ imgHd }
                    isFavorite={ favoritesSongs.some((a) => a.trackId === music.trackId) }
                    music={ music }
                    handleChangeFavorites={ this.handleChangeFavorites }
                  />
                </div>
              ))}
            </div>
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
