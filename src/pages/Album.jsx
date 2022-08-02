import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicsOfAlbum: [],
      artistName: '',
      albumName: '',
      albumImg: '',
    };
  }

  componentDidMount = async () => {
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

  render() {
    const { musicsOfAlbum, artistName, albumImg, albumName } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <div>
            <img src={ albumImg } alt={ albumName } />
            <h2 data-testid="album-name">{albumName}</h2>
            <p data-testid="artist-name">{artistName}</p>
          </div>
          { musicsOfAlbum.map((music) => (
            <div key={ music.trackId }>
              <MusicCard previewUrl={ music.previewUrl } trackName={ music.trackName } />
            </div>
          ))}
        </div>
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
