import React, { Component } from 'react';
import propTypes from 'prop-types';
import * as api from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';
import '../styles/Album.css'

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
    musicObj.map((music) => (
      favoritas.includes(music.trackId)
        ? null
        : favoritas.push(music.trackId)));
    this.setState({ loading: false });
  }

  handleChanger = ({ target }) => {
    const { name } = target;
    const value = target.checked;
    this.setState({
      [name]: value,
    });
  }

  favoriteSong = async (musicData, trackId) => {
    const { favoritas } = this.state;
    if (favoritas.includes(trackId)) {
      this.setState({ loading: true });
      await api.removeSong(musicData);
      for (let i = 0; i < favoritas.length; i += 1) {
        if (favoritas[i] === trackId) {
          favoritas.splice(i, 1);
          this.setState({ loading: false });
        }
      }
    } else {
      this.setState({ loading: true });
      favoritas.push(trackId);
      await api.addSong(musicData);
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      loading,
      favoritas,
    } = this.state;
    const {
      musicList,
    } = this.props;
    const styles = { enableBackground: "new 0 0 512 512" } 
    return (
      <div className="song-list">
        {loading
          ? <Carregando />
          : (
            musicList.filter((music) => music.trackName)
              .map((music, index) => (
                <div className="song" key={ index }>
                  <p>{music.trackName}</p>
                  <audio
                    id="song-player"
                    data-testid="audio-component"
                    src={ music.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                  </audio>
                    <div
                        id="music-checkbox"
                        data-testid={ `checkbox-music-${music.trackId}` }
                        name={ index }
                        onChange={ this.handleChanger }
                        onClick={ () => this.favoriteSong(music, music.trackId) }
                        // checked={ favoritas.includes(music.trackId) }
                        >
                       { favoritas.includes(music.trackId) ? 
                          <svg height="30px" id="Layer_1" style={ styles } version="1.1" viewBox="0 0 512 512" width="30px" space="preserve" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                            <path d="M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6  L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/>
                          </svg> 
                          :
                          <svg height="30px" id="Layer_1" style={ styles } version="1.1" viewBox="0 0 512 512" width="30px" space="preserve" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                            <path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/>
                          </svg>
                        }
                    </div>
                </div>
              )))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicList: propTypes.func,
}.isRequired;
