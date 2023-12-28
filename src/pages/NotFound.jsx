import React from 'react';
import '../styles/NotFound.css'
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className='container'>
        <p className='you-now'>Você agora:</p>
        <div className="not-found" data-testid="page-not-found">
         {/* <image src="https://cdn.kodansha.us/statics/comics/2020/12/9781945054211-DECAPITATION-scaled-1.jpg?f=webp&w=405"></image> */}
        </div>
        <p className='doesnt-exist'>Este endereço não existe!</p>
        <Link className='go-back-button' to="/search">Voltar</Link>
      </div>
    );
  }
}
