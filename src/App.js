import React, { Component } from "react";
import logo from "./logo.svg";
import brand from "./brand.svg";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
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

  render() {
    return (
      <div className="App">
        <header>
          <div className="banner">
            <img
              className="banner__logo"
              src={logo}
              alt="Marker markup generator"
            />
            <div className="banner__marker">Marker</div>
            <div className="banner__subtext">Markup generator</div>
          </div>
        </header>
        <main>
          <Input handler={e => this.inputHandler(e)} />
          <Output
            output={this.state}
            switchHandler={f => this.outputSwitchHandler(f)}
          />
        </main>
        <footer>
          <a
            className="footer__github"
            href="http://www.github.com/sroelants/markdown_dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hosted with{" "}
            <i className="fa fa-heart" style={{ color: "#931d2f" }} /> on Github{" "}
            <i className="fa fa-github" />
          </a>
          <img className="brand" src={brand} alt="Sam" />
        </footer>
      </div>
    );
  }
}

export default App;
