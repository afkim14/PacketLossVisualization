const React = require('react');
import firebase from './firebaseConfig';
import {
  PieChart, Pie, Legend, Tooltip, Cell
} from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];
class VoteVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = { updated: false, previousVoteChoice: "", data: [] }
  }

  getData = () => {
    firebase.database().ref('/').once('value', (snapshot) => {
      const pulledData = snapshot.val();
      this.setState({data: [{name: 'Yes', value: pulledData["yes"]}, {name: 'No', value: pulledData["no"]}]});
    });
  }

  componentDidMount() {
    if (this.state.data.length == 0) {
      this.setState({data: this.getData()});
    }
  }

  componentDidUpdate() {
    if (!this.state.updated || this.state.previousVoteChoice != this.props.vote) {
      firebase.database().ref('/').once('value', (snapshot) => {
        const pulledData = snapshot.val();
        if (this.props.vote == "Yes") {
          if (this.state.previousVoteChoice == "No") {
            var newData = {yes: this.state.data[0].value + 1, no: this.state.data[1].value - 1}
            firebase.database().ref('/').update(newData).then((data) => {
              this.setState({updated: true, previousVoteChoice: this.props.vote, data: [{ name: 'Yes', value: pulledData["yes"] + 1 }, { name: 'No', value: pulledData["no"] - 1 }]});
            });
          } else {
            var newData = {yes: this.state.data[0].value + 1, no: this.state.data[1].value}
            firebase.database().ref('/').update(newData).then((data) => {
              this.setState({updated: true, previousVoteChoice: this.props.vote, data: [{ name: 'Yes', value: pulledData["yes"] + 1 }, { name: 'No', value: pulledData["no"] }]});
            });
          }
        } else if (this.props.vote == "No") {
          if (this.state.previousVoteChoice == "Yes") {
            var newData = {yes: this.state.data[0].value - 1, no: this.state.data[1].value + 1}
            firebase.database().ref('/').update(newData).then((data) => {
              this.setState({updated: true, previousVoteChoice: this.props.vote, data: [{ name: 'Yes', value: pulledData["yes"] - 1 }, { name: 'No', value: pulledData["no"] + 1 }]});
            });
          } else {
            var newData = {yes: this.state.data[0].value, no: this.state.data[1].value + 1}
            firebase.database().ref('/').update(newData).then((data) => {
              this.setState({updated: true, previousVoteChoice: this.props.vote, data: [{ name: 'Yes', value: pulledData["yes"] }, { name: 'No', value: pulledData["no"] + 1 }]});
            });
          }
        }
      });
    }
  }

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    if (this.props.vote == "") {
      return (
        <b>Vote to see what other people think!</b>
      );
    } else if (this.state.data.length > 0) {
      return (
        <PieChart width={800} height={800}>
          <Pie dataKey="value" data={this.state.data} cx={400} cy={400} outerRadius={120} fill="#8884d8" labelLine={true} label>
          {
            this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
          </Pie>
        </PieChart>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

module.exports = VoteVisualization;
