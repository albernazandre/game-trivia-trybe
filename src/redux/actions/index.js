// Actions da aplicacao

// Aqui temos:
// Acao de login na pagina de login
// Acao de logOut
// Acao de salvar o jogo no estado global a partir do momento em que o jogo é req com o token gerado apos login
//

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const SAVE_GAME = 'SAVE_GAME';
export const LOGOUT = 'LOGOUT';
export const SCORE_ACTION = 'SCORE_ACTION';
export const PLAY_AGAIN_ACTION = 'PLAY_AGAIN_ACTION';
export const SAVE_IMAGE_ACTION = 'SAVE_IMAGE_ACTION';

export const loginAction = (payload) => ({
  type: LOGIN_ACTION,
  payload,
});

export const logOut = (payload) => ({
  type: LOGOUT,
  payload,
});

export const saveGame = (payload) => ({
  type: SAVE_GAME,
  payload,
});

export const scoreAction = (payload) => ({
  type: SCORE_ACTION,
  payload,
});

export const playAgainAction = (payload) => ({
  type: PLAY_AGAIN_ACTION,
  payload,
});

export const saveGravatarImageAction = (payload) => ({
  type: SAVE_IMAGE_ACTION,
  payload,
});
