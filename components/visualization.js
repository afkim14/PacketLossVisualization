const React = require('react');
import VoteVisualization from './voteVisualization.js'

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvasWidth = "500";
    this.canvasHeight = "250";
  }

  componentDidUpdate() {
    const { step, squares } = this.props;
    if (step == 1 || step == 2) {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      ctx.save();
      ctx.beginPath();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(width / 2, height / 2);
      ctx.fillStyle = '#07ADBD';
      ctx.fillRect(Math.floor(-width / 4) - 200, Math.floor(-height / 6) + 30, width, 3);
      ctx.strokeStyle = squares[0].currColor;
      ctx.strokeRect(Math.floor(-width / 4) - 160 + squares[0].xchange, Math.floor(-height / 10) + squares[0].ychange, 30, 30);
      ctx.fillStyle = '#38BA7D';
      ctx.fillRect(Math.floor(-width / 4), Math.floor(-height / 6), 70, 70);
      ctx.restore();
    } else if (step == 3 || step == 4 || step == 5 || step == 7 || step == 8) {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      ctx.save();
      ctx.beginPath();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(width / 2, height / 2);
      ctx.fillStyle = '#07ADBD';
      ctx.fillRect(Math.floor(-width / 4) - 200, Math.floor(-height / 6) + 30, width, 3);
      for (var i = 0; i < squares.length; i++) {
        ctx.strokeStyle = squares[i].currColor;
        ctx.strokeRect(Math.floor(-width / 4) - (160 + (i * 50)) + squares[i].xchange, Math.floor(-height / 10) + squares[i].ychange, 30, 30);
      }
      ctx.fillStyle = '#38BA7D';
      ctx.fillRect(Math.floor(-width / 4), Math.floor(-height / 6), 70, 70);
      ctx.restore();
    } else if (step == 6) {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      ctx.save();
      ctx.beginPath();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(width / 2, height / 2);

      // INTENTIONAL
      ctx.fillStyle = '#07ADBD';
      ctx.fillRect(Math.floor(-width / 4) - 200, Math.floor(-height / 6) - 30, width, 3);
      for (var i = 0; i < squares.length / 2; i++) {
        ctx.strokeStyle = squares[i].currColor;
        ctx.strokeRect(Math.floor(-width / 4) - (160 + (i * 50)) + squares[i].xchange, Math.floor(-height / 10) - 60 - squares[i].ychange, 30, 30);
      }
      ctx.fillStyle = '#eb2f39';
      ctx.fillRect(Math.floor(-width / 4), Math.floor(-height / 6) - 60, 70, 70);

      // UNITENTIONAL
      ctx.fillStyle = '#07ADBD';
      ctx.fillRect(Math.floor(-width / 4) - 200, Math.floor(-height / 6) + 70, width, 3);
      for (var i = 0; i < squares.length / 2; i++) {
        ctx.strokeStyle = squares[i].currColor;
        ctx.strokeRect(Math.floor(-width / 4) - (160 + (i * 50)) + squares[i].xchange, Math.floor(-height / 10) + 40 + squares[i].ychange, 30, 30);
      }
      ctx.fillStyle = '#38BA7D';
      ctx.fillRect(Math.floor(-width / 4), Math.floor(-height / 6) + 40, 70, 70);

      ctx.restore();
    }
  }

  render() {
    if (this.props.step == 0) {
      return (
        <img src={"../static/images/packet-01.png"} />
      );
    } else if (this.props.step == 9) {
      return (
        <VoteVisualization vote={this.props.vote} />
      );
    } else {
      return (
        <div>
          <canvas width={this.canvasWidth} height={this.canvasHeight} ref={this.canvasRef} />
        </div>
      );
    }
  }
}

module.exports = Visualization;
