import React from 'react';
import { Route } from 'react-router';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      name: '',
      album: '',
      id: '',
      image: '',
    };
  }

  componentDidMount() {
    this.fetchMusics();
    // console.log(await getMusics(albumId));
    // essa parte eu consegui fazer graças a esses links a seguir
    // https://v5.reactrouter.com/web/api/location
    // https://flaviocopes.com/how-to-get-last-item-path-javascript/
  }

  fetchMusics = async () => {
    const { location } = this.props;
    const albumPath = location.pathname;
    const albumId = albumPath.substring(albumPath.lastIndexOf('/') + 1);
    this.setState({
      id: albumId,
      musics: await getMusics(albumId),
    });
    const { musics } = this.state;
    this.setState({
      name: musics[0].artistName,
      album: musics[0].collectionName,
      image: musics[0].collectionViewUrl,
    });
  }

  render() {
    const {
      name,
      album,
      musics,
      id,
      image,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{name}</p>
        <p data-testid="album-name">{album}</p>
        <img src={ image } alt={ `Capa do álbum ${album} de ${name}` } />
        <Route
          path={ `/album/${id}` }
          render={ () => (<MusicCard
            musicList={ musics }
          />) }
        />
      </div>
    );
  }
}

Album.propTypes = {
  loading: propTypes.object,
}.isRequired;
