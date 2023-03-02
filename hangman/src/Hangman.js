import React, { Component } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./img/0.jpg";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** guessedWord: show current-state of word:
    for example if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** handleClick: If restart game clicked
    - call restartGame function
  */
  handleClick() {
    return this.restartGame();
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /////////////////////////////////////////////////////
  /**Game States **/

  gameState() {
    if (this.state.nWrong === this.props.maxWrong) {
      return (
        <p className="result">
          Game Over{" "}
          <span role="img" aria-label="bomb">
            💣
          </span>
        </p>
      );
    } else if (this.guessedWord().join("") === this.state.answer) {
      return (
        <p className="result">
          You Win{" "}
          <span role="img" aria-label="celebrate">
            🎉
          </span>
        </p>
      );
    } else {
      return this.generateButtons();
    }
  }

  restartGame() {
    this.setState(() => ({
      answer: randomWord(),
      guessed: new Set(),
      nWrong: 0,
    }));
  }

  /////////////////////////////////////////////////////
  /** render: render game */
  render() {
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong} Wrong Guesses`}
        />
        <h4>Wrong Guesses: {this.state.nWrong}</h4>
        <p className="Hangman-word">{this.guessedWord()}</p>
        <div className="Hangman-btns">{this.gameState()}</div>
        <button id="reset" onClick={this.handleClick}>
          Restart Game
        </button>
      </div>
    );
  }
}

export default Hangman;
