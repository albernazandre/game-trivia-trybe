// Page com o GAME propriamente dito

// componentDidMount faz com que depois do render se cheque se há o token para montar o game e lança o cronometro de 30 segundos
// A requisicao fetchGame utiliza o token requisitado e gerado apos o login e retorna um jogo de perguntas
// A funcao async checkTokenToMountGame ira checar se o token expirou (ele expira em 6 horas), caso expirado faz o logOut e volta para page inicial de login
// A funcao answerToShow retorna as opcoes de respostas para uma determinada pergunta, a funcao captura as respostas certas e erradas do objeto retornado pela API
// mathRandom na funcao answerToShow embaralha as alternativas (opcoes de resposta)
// A funcao componentDidUpdate verifica se ha perguntas e retorna funcao answerToShow caso haja, e se o time chegar a zero passa para a proxima e limpa o cronometro
// A funcao cronometer ira fazer com que os 30 segundos diminuam de um em um
// A funcao colorTheAnswerBtn ira colorir ou de verde ou de vermelho a depender se a resposta esta certa ou errada, e ainda ira habilitar o botao de next para a proxima pergunta
// A funcao handleNextClick ira setar o novo estado do game apos responder uma questao, caso tenhamos todas as perguntas respondidas, ele vai para page de feedback
// A funcao scoreCount realiza a contagem de pontos que depeende do nivel de dificuldade das questoes e do tempo que faltava para responder

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { saveGame, logOut, scoreAction } from '../redux/actions';
import RankingButton from '../Components/RankingButton';

const magicNumberTimer = -1;
const rightAnswer = 'correct-answer';

class Game extends Component {
  state = {
    answers: [],
    btnNext: false,
    isLoading: true,
    isBtnDisabled: false,
    timer: 30,
    toRender: 0,
  };

  componentDidMount() {
    this.checkTokenToMountGame();
    this.chronometer();
  }

  componentDidUpdate(_, prevState) {
    const { game } = this.props;
    const { toRender, timer } = this.state;
    if (game.length && (prevState.toRender !== toRender)) {
      this.answersToShow();
    }
    if (timer === 0) {
      clearInterval(this.timerId);
      this.setState({
        btnNext: true,
        isBtnDisabled: true,
        timer: -1,
      });
    }
  }

  fetchGame = async (token) => {
    const secondFetch = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await secondFetch.json();
    return response;
  };

  checkTokenToMountGame = async () => {
    const { history, dispatch } = this.props;
    const magicNumber = 3;
    const localStorageToken = localStorage.getItem('token');
    const fetchedGame = await this.fetchGame(localStorageToken);
    if (fetchedGame.response_code === magicNumber) {
      localStorage.removeItem('token');
      dispatch(logOut());
      history.push('/');
    } else {
      dispatch(saveGame(fetchedGame));
    }
    this.setState({ isLoading: false }, () => this.answersToShow());
  };

  answersToShow = () => {
    const { toRender } = this.state;
    const { game } = this.props;
    const rightOption = game[toRender].correct_answer;
    const wrongAnswer = game[toRender].incorrect_answers;
    const options = [rightOption, ...wrongAnswer];
    for (let i = options.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    this.setState({
      answers: options,
    });
  };

  chronometer = () => {
    const magicNumber = 1000;
    this.timerId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, magicNumber);
  };

  colorTheAnswerBtn = ({ target }) => {
    clearInterval(this.timerId);
    const correctBtn = document.querySelector(`.${rightAnswer}`);
    const wrongBtn = document.querySelectorAll('.wrong-answer');
    correctBtn.style.border = '3px solid rgb(6, 240, 15)';
    wrongBtn.forEach((btn) => {
      btn.style.border = '3px solid red';
    });
    this.setState({
      btnNext: true,
    });
    if (target.className === rightAnswer) {
      this.scoreCount();
    }
  };

  handleNextClick = () => {
    const { history } = this.props;
    const { toRender } = this.state;
    this.setState((prevState) => ({
      toRender: prevState.toRender + 1,
      answers: [],
      btnNext: false,
      isLoading: true,
      isBtnDisabled: false,
      timer: 30,
    }), () => this.chronometer());
    this.setState({ isLoading: false });
    const maxGameLength = 4;
    if (toRender === maxGameLength) {
      history.push('/feedback');
    }
  };

  scoreCount = () => {
    const { game, dispatch } = this.props;
    const { timer, toRender } = this.state;
    const hard = 3;
    const firstPoints = 10;
    let difficulty = 0;
    switch (game[toRender].difficulty) {
    case 'easy':
      difficulty = 1;
      break;
    case 'medium':
      difficulty = 2;
      break;
    case 'hard':
      difficulty = hard;
      break;
    default:
      break;
    }
    const points = firstPoints + (timer * difficulty);
    dispatch(scoreAction(points));
  };

  render() {
    const {
      game,
      history,
      /*       score, */
    } = this.props;
    const {
      answers,
      btnNext,
      isBtnDisabled,
      isLoading,
      timer,
      toRender,
    } = this.state;
    return (
      <div>
        <Header />
        {!isLoading ? (
          <div>
            <p
              data-testid="question-category"
            >
              {game[toRender].category}

            </p>
            <p
              data-testid="question-text"
            >
              {game[toRender].question}

            </p>
            <div
              data-testid="answer-options"
            >
              {answers.map((option, index) => (
                <button
                  disabled={ isBtnDisabled }
                  onClick={ this.colorTheAnswerBtn }
                  className={ `${game[toRender].correct_answer === option
                    ? rightAnswer
                    : 'wrong-answer'
                  }` }
                  type="button"
                  key={ option }
                  data-testid={ game[toRender].correct_answer === option
                    ? rightAnswer : `wrong-answer-${index}` }
                >
                  {option}

                </button>
              ))}
            </div>
            {
              btnNext
                ? (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.handleNextClick }
                  >
                    next
                  </button>
                )
                : null
            }
            <span>
              {timer === magicNumberTimer ? 0 : timer}
            </span>
            <RankingButton onClick={ () => history.push('/ranking') } />
          </div>
        ) : null }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  game: PropTypes.instanceOf(Array).isRequired,
  // score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game.results,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
