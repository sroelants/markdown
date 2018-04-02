import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

//*****************************************************************************
//
// Input box
//
// ****************************************************************************

class InputHeader extends Component {
  render() {
    return (
      <div className="box__header">
        <p>Input header!</p>
      </div>
    );
  }
}

class InputField extends Component {
  handleKeyUp(event) {
    this.props.handler(event.currentTarget.value);
  }

  render() {
    return (
      <div className="box__field">
        <textarea
          type="text"
          placeholder="Input"
          onKeyUp={e => this.handleKeyUp(e)}
        />
      </div>
    );
  }
}

class Input extends Component {
  render() {
    return (
      <div className="box">
        <InputHeader />
        <InputField handler={e => this.props.handler(e)} />
      </div>
    );
  }
}

//*****************************************************************************
//
// Output box
//
//*****************************************************************************

class OutputHeader extends Component {
  render() {
    return (
      <div className="box__header">
        <p>Output header!</p>
      </div>
    );
  }
}

class OutputField extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "Output stub" };
  }
  render() {
    return (
      <div className="box__field">
        <pre>{this.props.content}</pre>
      </div>
    );
  }
}

class Output extends Component {
  render() {
    return (
      <div className="box">
        <OutputHeader className="box box_header" />
        <OutputField className="box box__field" content={this.props.content} />
      </div>
    );
  }
}

//*****************************************************************************
//
// App
//
// ****************************************************************************

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { output: "Output stub" };
  }

  inputHandler(input) {
    console.log(input);
    this.setState({ output: input });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Input handler={e => this.inputHandler(e)} />
        <Output content={this.state.output} />
      </div>
    );
  }
}

export default App;
