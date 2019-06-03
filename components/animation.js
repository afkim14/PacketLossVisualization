const React = require('react');
import Visualization from './visualization';

const COLORS = ["#EB2f39", "#2C53FF", "#26BD67"];
function Square(xfixed, xchange, ychange, currColor) {
  this.xfixed = xfixed;
  this.xchange = xchange;
  this.ychange = ychange;
  this.currColor = currColor;
}

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currNumSquares: this.props.numSquares, currValue: 0, squares: [] };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    if (this.state.squares.length == 0) {
      this.setState({squares: this.initializeSquares(0)});
    }
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  initializeSquares(currValue) {
    var squares = [];
    var numSquares = this.props.numSquares;
    if (currValue == 6) {
      numSquares = numSquares * 2;
    }
    this.setState({currNumSquares: numSquares});

    for (var i = 0; i < numSquares; i++) {
      if (currValue == 5 || currValue == 6 || currValue == 7 || currValue == 8) {
        squares.push(new Square(false, 0, 0, COLORS[Math.floor(Math.random() * COLORS.length)]));
      } else {
        squares.push(new Square(false, 0, 0, "#07ADBD"));
      }
    }
    return squares;
  }

  updateAnimationState() {
    var endpoint = 380;
    var speed = 2;
    if (this.state.currValue != this.props.value) {
      this.setState({currValue: this.props.value, squares: this.initializeSquares(this.props.value)});
    }

    if (this.state.currValue == 4) {
      if (this.state.currNumSquares != this.props.numSquares) {
        this.setState({currNumSquares: this.props.numSquares, squares: this.initializeSquares(this.state.currValue)});
      }
    }

    for (var i = 0; i < this.state.squares.length; i++) {
      if (this.state.squares[i].xchange - (i * 50) >= endpoint || this.state.squares[i].ychange - (i * 50) >= endpoint - 150) {
        var newSquares = this.state.squares;
        newSquares[i].xchange = 0;
        newSquares[i].ychange = 0;
        newSquares[i].xfixed = false;
        newSquares[i].currColor = "#07ADBD";
        if (this.props.value == 5 || this.props.value == 6 || this.props.value == 7 || this.props.value == 8) {
          newSquares[i].currColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        this.setState({squares: newSquares});
      }

      if (this.props.value == 1) {
        var newSquares = this.state.squares;
        newSquares[i].xchange += speed;
        newSquares[i].xfixed = false;
        this.setState({squares: newSquares});
      } else if (this.props.value == 2 || this.props.value == 3 || this.props.value == 4 || this.props.value == 6 || this.props.value == 8) {
        var xfixed = this.state.squares[i].xfixed;
        if (this.state.squares[i].xchange - (i * 50) == (endpoint/2) && !xfixed) {
          var packetloss_prob = 100;
          if (this.props.value == 8) {
            if (this.state.squares[i].currColor != COLORS[0]) {
              packetloss_prob = 0;
            }
          } else if (this.props.value == 4) {
            if (this.props.numSquares == 6) {
              packetloss_prob = 40;
            } else if (this.props.numSquares > 7) {
              packetloss_prob = 65;
            } else {
              packetloss_prob = 0;
            }
          } else if (this.props.value == 6) {
            packetloss_prob = 40;
          }
          var random = Math.floor(Math.random() * 100);
          if (random <= packetloss_prob) {
            xfixed = true;
          }
        }

        if (this.props.value == 3) {
          speed = 0.5;
        }

        var newSquares = this.state.squares;
        if (!xfixed) {
          newSquares[i].xchange += speed;
          newSquares[i].xfixed = false;
          this.setState({ squares: newSquares });
        } else {
          newSquares[i].ychange += speed;
          newSquares[i].xfixed = true;
          newSquares[i].currColor = "#EBEBEB";
          this.setState({ squares: newSquares });
        }
      } else if (this.props.value == 5 || this.props.value == 7) {
        var newSquares = this.state.squares;
        var xfixed = this.state.squares[i].xfixed;
        if (this.state.squares[i].xchange - (i * 50) == (endpoint/2) && !xfixed) {
          if ((this.props.red_filter && newSquares[i].currColor == COLORS[0]) ||
              (this.props.blue_filter && newSquares[i].currColor == COLORS[1]) ||
              (this.props.green_filter && newSquares[i].currColor == COLORS[2]))
          {
            xfixed = true;
          }
        }

        if (!xfixed) {
          newSquares[i].xchange += speed;
          newSquares[i].xfixed = false;
          this.setState({ squares: newSquares });
        } else {
          newSquares[i].ychange += speed;
          newSquares[i].xfixed = true;
          newSquares[i].currColor = "#EBEBEB";
          this.setState({ squares: newSquares });
        }
      }
    }

    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return <Visualization step={this.props.value} squares={this.state.squares} vote={this.props.vote}/>;
  }
}

module.exports = Animation;
