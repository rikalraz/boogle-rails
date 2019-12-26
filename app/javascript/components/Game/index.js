import React, { Component } from 'react';
import {
  shuffleBoard,
  copyBoard,
  isTileEqual,
  isAdjacent,
  calculateScore
} from '../../util/gameUtil';
import Board from '../Board';
import ScoreBox from '../ScoreBox';
import CurrentWord from '../CurrentWord';
import Button from '../Button';
import './Game.css';
import { sendLetters } from '../../services/boggle';
import Loader from 'react-loader'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.initBoard = shuffleBoard();
    this.state = {
      board: this.initBoard,
      currentWord: '',
      currentWordPosition: [],
      wordScoreList: {},
      words: [],
      loader: false,
      isTimeUp: false,
      minutes: 2,
      seconds: 0,
    };
  }

  componentDidMount(){
    var self = this
    var letters = ""
    self.setState({ loader: true })
    self.state.board.forEach(item => {
      item.forEach(tile => {
        letters += tile.letter 
      })
    })
   sendLetters({letters: letters})
    .then(function(response) {
      if(response.status === 200){
        self.setState({
          words: response.data.words,
          loader: false
        })
      }
    })
    .catch(function(error) {
      console.log(error.response);
    });
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state
      if (self.state.loader === false) {
        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
          if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(this.myInterval)
                self.setState({ isTimeUp: true })
            } else {
                this.setState(({ minutes }) => ({
                    minutes: minutes - 1,
                    seconds: 59
                }))
            }
          } 
      }
    }, 1000)
  }

  componentWillUnmount() {
    if(self.state.loader === false){
      clearInterval(this.myInterval)
    }
  }

  handleClick(rowId, columnId) {
    const selectedTile = this.state.board[rowId][columnId];
    const lastSelectedTile = this.state.currentWordPosition[
      this.state.currentWordPosition.length - 1
    ];
    if (selectedTile.selected) {
      if (isTileEqual(selectedTile, lastSelectedTile)) {
        const newBoard = copyBoard(this.state.board);
        newBoard[rowId][columnId].selected = false;
        this.setState({
          currentWord: this.state.currentWord.slice(0, -1),
          board: newBoard,
          currentWordPosition: this.state.currentWordPosition.slice(0, -1)
        });
      }
    } else {
      if (!lastSelectedTile || isAdjacent(selectedTile, lastSelectedTile)) {
        const newBoard = copyBoard(this.state.board);
        newBoard[rowId][columnId].selected = true;
        this.setState({
          currentWord: this.state.currentWord.concat(
            newBoard[rowId][columnId].letter
          ),
          board: newBoard,
          currentWordPosition: this.state.currentWordPosition.concat({
            rowId: rowId,
            columnId: columnId
          })
        });
      }
    }
  }

  handleSubmit(word) {
    var self = this
    if ( word.length < 3 ) {
      alert('Your word must be more at least 3 charactors!');
      self.setState({
        currentWord: '',
        currentWordPosition: [],
        board: self.initBoard
      });
      return;
    }
    if( this.state.wordScoreList[word] ) {
      alert('You already submitted this word!');
      self.setState({
        currentWord: '',
        currentWordPosition: [],
        board: self.initBoard
      });
      return;
    }
    if(self.state.words.indexOf(word.toUpperCase()) > -1){
      const score = calculateScore(word);
      const clearedBoard = this.initBoard;
      this.setState({
        wordScoreList: { ...this.state.wordScoreList, [word]: score },
        currentWord: '',
        currentWordPosition: [],
        board: clearedBoard
      });
    } else {
      alert("Invalid word")
      self.setState({
        currentWord: '',
        currentWordPosition: [],
        board: self.initBoard
      });
      return;
    }
  }

  updateInputValue(e) {
    this.setState({
      currentWord: e.target.value
    });
  }

  render() {
    const { minutes, seconds } = this.state
    return (
      <div>
        { this.state.loader && (
          <div className="spinner">
            Loading...
          </div>
        )}
        { this.state.isTimeUp && (
          <div className="logo-wrap">
            <h3>Game Result</h3>
            <h5>Total Score: {Object.values(
                this.state.wordScoreList
              ).reduce((totalScore, next) => {
                return totalScore + next;
              }, 0)}</h5>
            <h5>Total words: {Object.keys(this.state.wordScoreList).length}</h5>
            <h5>Possible words: </h5><span>{this.state.words.replace(/[[\]"]/g,'' )}</span><br/>
            <button onClick={() => window.location.reload()} className="start-new-btn">Start New Game</button>
          </div>
        )}
        { this.state.loader === false && this.state.isTimeUp === false && (
          <div>
             <div>
                { minutes === 0 && seconds === 0
                    ? <h3 className="logo-wrap">Time UP!</h3>
                    : <h3 className="logo-wrap">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
                }
            </div>
            <div className="game-area">
              <Board
                board={this.state.board}
                handleClick={this.handleClick.bind(this)}
              />
              <CurrentWord
                currentWord={this.state.currentWord}
                label="Current Word"
              />
              <Button
                handleSubmit={this.handleSubmit.bind(this, this.state.currentWord)}
                label="SUBMIT WORD"
              />
            </div>
            <ScoreBox
              wordScoreList={this.state.wordScoreList}
              totalScore={Object.values(
                this.state.wordScoreList
              ).reduce((totalScore, next) => {
                return totalScore + next;
              }, 0)}
            />
            <div className="clear" />
          </div>
        ) }
      </div>
    );
  }
}

/*
function sendLetters(params) {
  return dispatch => {
    dispatch({type: GET_AVAILABLE_WORDS });
    return fetch(`v1/words.json`)
      .then(response => response.json())
      .then(error => console.log(error)) ;
  }
}
*/