import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { playAgainAction } from '../redux/actions';
import RankingButton from '../Components/RankingButton';

const magicNumber = 3;

class Feedback extends Component {
  componentDidMount() {
    const { gravatarImage, name, score } = this.props;
    const rankScore = {
      gravatarImage,
      name,
      score,
    };
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking) {
      ranking = [...ranking, rankScore];
      const ordenatedRanking = this.selectionSortDesc(ranking);
      const top3 = ordenatedRanking.slice(0, magicNumber);
      localStorage.setItem('ranking', JSON.stringify(top3));
    } else {
      localStorage.setItem('ranking', JSON.stringify([rankScore]));
    }
  }

  selectionSortDesc = (array) => {
    for (let i = 0; i < array.length - 1; i += 1) {
      let maxIndex = i;
      for (let j = i + 1; j < array.length; j += 1) {
        if (array[j].score > array[maxIndex].score) {
          maxIndex = j;
        }
      }
      if (maxIndex !== i) {
        [array[i], array[maxIndex]] = [array[maxIndex], array[i]];
      }
    }
    return array;
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgainAction());
    history.push('/');
  };

  render() {
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        <p
          data-testid="feedback-total-score"
        >
          {score}
        </p>
        <p
          data-testid="feedback-total-question"
        >
          {assertions}
        </p>
        <p
          data-testid="feedback-text"
        >
          {assertions >= magicNumber ? 'Well Done!' : 'Could be better...'}
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again

        </button>
        <RankingButton onClick={ () => history.push('/ranking') } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
