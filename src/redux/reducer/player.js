// Reducer com as modificacoes na page apos o Login

// Os itens a serem modificados e mostrados são:
// Nome do jogador (capturado na page de login)
// o email do Gravatar que é o email de login
// o placar que apos login ou logout ainda é ZERO
//

import { LOGIN_ACTION, LOGOUT, SCORE_ACTION,
  PLAY_AGAIN_ACTION, SAVE_IMAGE_ACTION } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarImage: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACTION:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
      score: 0,
    };
  case LOGOUT:
    return {
      ...state,
      name: '',
      gravatarEmail: '',
      score: 0,
    };
  case SCORE_ACTION:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case PLAY_AGAIN_ACTION:
    return {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  case SAVE_IMAGE_ACTION:
    return {
      ...state,
      gravatarImage: action.payload,
    };

  default:
    return state;
  }
};

export default player;
