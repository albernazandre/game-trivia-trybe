import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RankingButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button
        data-testid="btn-ranking"
        onClick={ onClick }
      >
        Ranking

      </button>
    );
  }
}

RankingButton.propTypes = {
  onClick: PropTypes.func.isRequired,

};

export default connect()(RankingButton);
