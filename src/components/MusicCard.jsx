import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      musicList,
    } = this.props;
    return (
      <div>
        {musicList.filter((music) => music.trackName && music.previewUrl)
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
            </div>
          ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicList: propTypes.func,
}.isRequired;
