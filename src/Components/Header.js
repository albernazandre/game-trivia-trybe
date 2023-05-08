// Info mostrada apos a page de login com os valores do jogador apos login e infos do jogo em si

// o MD5 é um hash gerado pelo Crypto.js, esse hash possibilita capturar a foto do email do usuario (player)
// No header sera mostrado foto do jogador, placar do e nome do mesmo
// componentDidMount ira fazer com que foto seja renderizada apos os componentes renderizados via render

import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveGravatarImageAction } from '../redux/actions';

class Header extends Component {
  state = {
    gravatarImage: '',
  };

  componentDidMount() {
    this.gravatarImg();
  }

  gravatarImg = () => {
    const { gravatarEmail, dispatch } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const image = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      gravatarImage: image,
    });
    dispatch(saveGravatarImageAction(image));
  };

  render() {
    const { name, score } = this.props;
    const { gravatarImage } = this.state;
    return (
      <header>
        <img
          src={ gravatarImage }
          alt="gravatarImage"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">{score}</p>
        <p data-testid="header-player-name">{name}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
