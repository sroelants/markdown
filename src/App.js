import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class InputHeader extends Component {
  render() {
    return <h1>Input header!</h1>;
  }
}

class InputField extends Component {
  handleKeyUp(event) {
    this.props.handler(event.currentTarget.value);
  }

  render() {
    return (
      <textarea
        type="text"
        className="if"
        placeholder="Input"
        onKeyUp={e => this.handleKeyUp(e)}
      />
    );
  }
}

class Input extends Component {
  render() {
    return (
      <div>
        <InputHeader className="box box__header" />
        <InputField
          className="box box__field"
          handler={e => this.props.handler(e)}
        />
      </div>
    );
  }
}

class OutputHeader extends Component {
  render() {
    return <h1>Output header!</h1>;
  }
}

class OutputField extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "Output stub" };
  }
  render() {
    return <pre>{this.props.content}</pre>;
  }
}

class Output extends Component {
  render() {
    return (
      <div>
        <OutputHeader className="box box_header" />
        <OutputField className="box box__field" content={this.props.content} />
      </div>
    );
  }
}

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
        <Input handler={e => this.inputHandler(e)} className="Input" />
        <Output content={this.state.output} className="Output" />
      </div>
    );
  }
}

export default App;
