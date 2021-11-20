import React, { Component } from 'react';
import propTypes from 'prop-types';
import * as api from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritas: [],
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.favoriteSong = this.favoriteSong.bind(this);
    this.loadFavoriteSongs = this.loadFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.loadFavoriteSongs();
  }

  loadFavoriteSongs = async () => {
    const { favoritas } = this.state;
    this.setState({ loading: true });
    const musicObj = await api.getFavoriteSongs();
    musicObj.map((music) => favoritas.push(music.trackId));
    this.setState({ loading: false });
  }

  handleChanger = ({ target }) => {
    const { name } = target;
    const value = target.checked;
    this.setState({
      [name]: value,
    });
  }

  // favoriteSong = async (musicData, trackId) => {
  //   this.setState({ loading: true });
  //   const { favoritas } = this.state;
  //   if (favoritas.includes(trackId)) {
  //     for (let i = 0; i < favoritas.length; i += 1) {
  //       if (favoritas[i] === trackId) {
  //         favoritas.splice(i, 1);
  //       }
  //     }
  //   } else {
  //     favoritas.push(trackId);
  //   }
  //   await api.addSong(musicData);
  //   this.setState({ loading: false });
  // }

  favoriteSong = async (musicData, trackId) => {
    this.setState({ loading: true });
    const { favoritas } = this.state;
    favoritas.push(trackId);
    await api.addSong(musicData);
    this.setState({ loading: false });
  }

  // removeFavoriteSong = async () => {
  //   api.removeSong();
  // }

  render() {
    const {
      loading,
      favoritas,
    } = this.state;
    const {
      musicList,
    } = this.props;
    return (
      <div>
        {loading
          ? <Carregando />
          : (
            musicList.filter((music) => music.trackName)
              .map((music, index) => (
                <div key={ index }>
                  <p>{music.trackName}</p>
                  <audio
                    data-testid="audio-component"
                    src={ music.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                  </audio>
                  <label htmlFor={ index }>
                    <input
                      data-testid={ `checkbox-music-${music.trackId}` }
                      type="checkbox"
                      name={ index }
                      onChange={ this.handleChanger }
                      onClick={ () => this.favoriteSong(music, music.trackId) }
                      checked={ favoritas.includes(music.trackId) }
                    />
                    Favorita
                  </label>
                </div>
              )))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicList: propTypes.func,
}.isRequired;
