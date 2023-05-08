import { SAVE_GAME } from '../actions';

const INITIAL_STATE = {
  results: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_GAME:
    return {
      ...state,
      results: action.payload.results,
    };

  default:
    return state;
  }
};

export default game;
