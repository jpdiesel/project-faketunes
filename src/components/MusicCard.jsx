import React, { Component } from 'react';
import propTypes from 'prop-types';
import * as api from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      // check: false,
      favoritas: [],
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.favoriteSong = this.favoriteSong.bind(this);
  }

  handleChanger = ({ target }) => {
    const { name } = target;
    const value = target.checked;
    this.setState({
      [name]: value,
    });
  }

  // favoriteSong = async (musicData) => {
  //   const { check } = this.state;
  //   if (check) {
  //     this.setState({ check: false });
  //   } if (!check) {
  //     this.setState({ loading: true });
  //     await api.addSong(musicData);
  //     this.setState({ check: true });
  //   }
  //   this.setState({ loading: false });
  // }

  favoriteSong = async (musicData, trackId) => {
    this.setState({ loading: true });
    const { favoritas } = this.state;
    if (favoritas.includes(trackId)) {
      for (let i = 0; i < favoritas.length; i += 1) {
        if (favoritas[i] === trackId) {
          favoritas.splice(i, 1);
        }
      }
    } else {
      favoritas.push(trackId);
      await api.addSong(musicData);
    }
    this.setState({ loading: false });
  }

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
