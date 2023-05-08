import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    ranking: [],
    isLoading: true,
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking) {
      this.setState({ ranking }, () => {
        this.setState({ isLoading: false });
      });
    }
  }

  render() {
    const { history } = this.props;
    const { ranking, isLoading } = this.state;
    return (
      <div
        data-testid="ranking-title"
      >
        <div>

          {isLoading ? null : (
            ranking.map((person, index) => (
              <div key={ index }>

                <img src={ person.gravatarImage } alt="GravatarImage" />
                <p
                  data-testid={ `player-name-${index}` }
                >
                  {person.name}

                </p>
                <p
                  data-testid={ `player-score-${index}` }
                >
                  {person.score}

                </p>
              </div>
            ))
          )}
        </div>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Go Home

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Ranking);
