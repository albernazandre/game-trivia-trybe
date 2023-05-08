// Pagina de Login

// Aqui temos:
// Funcao que realiza mudanças no estado inicial passado (handleChange)
// handleChange tambem reconhece se a funcao validation do botao play retorna true
// Requisicao de API do token que permite fazermos as requisicoes de perguntas que serao respondidas no jogo
// localStorage que armazenar o token gerado
// Funcao que cria o jogo a partir do momento que o token existe na localstorage, funcao mountGame
// Funcao async handleClick que faz com que apos o clique no botao, dispare a acao de login apos funcao validation
// Funcao validation que valida se email e nome correspondem às especificões e assim valida-se o login

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';
import '../style.css';

class Login extends Component {
  state = {
    email: '',
    name: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (this.validation()) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  fetchToken = async () => {
    const firstFetch = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await firstFetch.json();
    return token.token;
  };

  mountGame = async () => {
    const { history } = this.props;
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      history.push('/game');
    } else {
      const token = await this.fetchToken();
      localStorage.setItem('token', token);
      history.push('/game');
    }
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    dispatch(loginAction(this.state));
    this.mountGame();
  };

  validation = () => {
    const { email, name } = this.state;
    const magicNumber = 1;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const returnRegex = regex.test(email);
    const returnPass = name.length >= magicNumber;
    return !!(returnPass && returnRegex);
  };

  render() {
    const { email, name, disabled } = this.state;
    const { history } = this.props;
    return (
      <div className="loginPage">
        <form>
          <div className="flex">
            <div className="label">
              <label htmlFor="name">
                Nome
                {' '}
                <div
                  className="inputLogin"
                >
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Insira seu nome..."
                    value={ name }
                    type="text"
                    data-testid="input-player-name"
                    onChange={ this.handleChange }
                  />
                </div>
              </label>
            </div>
            <div className="label">
              <label htmlFor="email">
                Email
                {' '}
                <div className="inputLogin">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Insira seu e-mail..."
                    value={ email }
                    type="email"
                    data-testid="input-gravatar-email"
                    onChange={ this.handleChange }
                  />

                </div>
              </label>
            </div>
            <button
              disabled={ disabled }
              className="btn btn-primary loginBtn"
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
            >
              Play

            </button>
            <button
              className="btn btn-primary loginBtn"
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/setting') }
            >
              Settings

            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
