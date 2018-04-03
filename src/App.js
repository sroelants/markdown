import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
var myMarked = require("marked");

//*****************************************************************************
//
// Input box
//
// ****************************************************************************

class InputHeader extends Component {
  render() {
    return (
      <div className="box__header">
        <p className="box__label">Input</p>
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
      <textarea
        type="text"
        placeholder="Markdown goes here."
        onKeyUp={e => this.handleKeyUp(e)}
        className="box__field"
      />
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
        <p className="box__label">Output</p>
        <div className="switches">
          <p
            className={
              "switches__switch" +
              (this.props.format === "html"
                ? " switches__switch--active"
                : " switches__switch--inactive")
            }
            onClick={() => this.props.switchHandler("html")}
          >
            HTML
          </p>
          <p
            className={
              "switches__switch" +
              (this.props.format === "markdown"
                ? " switches__switch--active"
                : " switches__switch--inactive")
            }
            onClick={() => this.props.switchHandler("markdown")}
          >
            Markdown
          </p>
        </div>
      </div>
    );
  }
}

class OutputField extends Component {
  render() {
    if (this.props.format === "markdown") {
      return (
        <div
          className="box__field"
          dangerouslySetInnerHTML={{ __html: this.props.output }}
        />
      );
    } else {
      return (
        <div className="box__field">
          <pre>{this.props.output}</pre>
        </div>
      );
    }
  }
}

class Output extends Component {
  render() {
    return (
      <div className="box">
        <OutputHeader
          className="box_header"
          switchHandler={f => this.props.switchHandler(f)}
          format={this.props.output.format}
        />
        <OutputField
          className="box__field"
          format={this.props.output.format}
          output={this.props.output.output}
        />
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
    this.state = {
      input: "",
      output: "",
      format: "html"
    };
  }

  // Parse the input using the marked.js library.
  inputHandler(i) {
    this.setState({ input: i, output: myMarked(i) });
  }

  // Handler for setting the output format.
  outputSwitchHandler(f) {
    this.setState({ format: f === "markdown" ? "markdown" : "html" });
  }

  // <header className="App-header">
  //   <img src={logo} className="App-logo" alt="logo" />
  //   <h1 className="App-title">Welcome to React</h1>
  // </header>
  render() {
    return (
      <div className="App">
        <main>
          <Input handler={e => this.inputHandler(e)} />
          <Output
            output={this.state}
            switchHandler={f => this.outputSwitchHandler(f)}
          />
        </main>
      </div>
    );
  }
}

export default App;
