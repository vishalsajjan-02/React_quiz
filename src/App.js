import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Question from './components/Question';
import Score from './components/Score';
import QuestionBank from './components/QuestionBank';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: QuestionBank,
      currentQuestionIndex: 0,
      score: 0,
      showScore: false,
      selectedOption: '',
    };
  }

  handleOptionChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  handleOptionClick = (selectedOption) => {
    const { questions, currentQuestionIndex } = this.state;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1
      }));
    }

    const nextQuestionIndex = this.state.currentQuestionIndex + 1;
    if (nextQuestionIndex < this.state.questions.length) {
      this.setState({
        currentQuestionIndex: nextQuestionIndex,
        selectedOption: '', // Reset selected option
      });
    } else {
      this.setState({
        showScore: true
      });
    }
  };

  render() {
    const { questions, currentQuestionIndex, showScore, selectedOption } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="app-title">Quiz Application</h1>
        </header>
        <div className="container">
          {showScore ? (
            <Score score={this.state.score} totalQuestions={questions.length} />
          ) : (
            questions.length > 0 && (
              <Question
                question={questions[currentQuestionIndex]}
                selectedOption={selectedOption}
                onOptionChange={this.handleOptionChange}
                onSubmit={this.handleOptionClick}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
