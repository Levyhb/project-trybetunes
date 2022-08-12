import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { loadAnimation } from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';
// import { Tooltip, } from 'react-tippy';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import 'react-tippy/dist/tippy.css';
import AudioPlayer from './components/AudioPlayer';

defineLordIconElement(loadAnimation);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isButtonDisabled: true,
      isLoading: false,
      playing: false,
      music: {},
    };
  }

  // componentDidMount = () => {
  //   const isPlay = localStorage.getItem('isPlay');
  //   const playMusic = localStorage.getItem('playMusic') || {};
  //   this.setState({ isPlay, playMusic });
  // }

  playMusic = (music) => {
    const { playing } = this.state;
    this.setState({ playing: !playing, music });
  }

  handleChange = ({ target }) => {
    this.setState({ username: target.value }, this.handleButton);
  }

  handleButton = () => {
    const { username } = this.state;
    const maxLength = 3;
    const enabledButton = username.length < maxLength;
    this.setState({ isButtonDisabled: enabledButton });
  }

  loadingEvent = (loadingState) => {
    this.setState({ isLoading: loadingState });
  }

  render() {
    const { username, isButtonDisabled, isLoading, playing, music } = this.state;
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/album/:id"
            render={ (props) => (<Album
              { ...props }
              playMusic={ this.playMusic }
            />) }
          />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route
            path="/profile"
            component={ Profile }
          />
          <Route
            path="/favorites"
            render={ (props) => (
              <Favorites { ...props } playMusic={ this.playMusic } />
            ) }
          />
          <Route path="/search" component={ Search } />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                handleChange={ this.handleChange }
                username={ username }
                isButtonDisabled={ isButtonDisabled }
                isLoading={ isLoading }
                loadingEvent={ this.loadingEvent }
              />
            ) }
          />
          <Route component={ NotFound } />

        </Switch>
        { playing ? (
          <AudioPlayer
            previewUrl={ music.previewUrl }
            trackName={ music.trackName }
            nameArtist={ music.nameArtist }
            image={ music.image }
            playMusic={ () => this.playMusic({}) }
          />
        ) : null }
      </div>

    );
  }
}

export default App;
