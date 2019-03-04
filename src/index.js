import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import './index.css';


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teamItems: [], workoutItems: [] };
  }
  
  render()
  {
    return (
      <div id = "contain">
        <div class = "columns">
          <h3>Team Names</h3>
          <TodoList items = {this.state.teamItems} text = {"teamList"} />
        </div>
        <div class = "columns">
          <h3>Workout Names</h3>
          <TodoList items = {this.state.workoutItems} text = {"workoutList"} />
        </div>
      </div>
    );
  };
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: props.items, text: props.id };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  render () {
    const items = this.state.items;
    return (
      <form onSubmit = {this.handleSubmit}>
	    <ul id = {this.state.text}>
          {items.map(item => <TodoItem item={item} key={item.key} />)}
        </ul>
        <label htmlFor = "new_Name">Adding a new workout?</label>
        <input id = "new_Name" onChange = {this.handleChange} value = {this.state.text}/>
        <Button variant="contained" color="primary"> Add #{this.state.items.length + 1}</Button>
      </form>
    );
  };
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, key: props.key }
  }
  render()
  {
    const item = this.state.item;
    const key = this.state.key;
    return(
      <ul class = "addedInfo">
	    <ExpansionPanel id = {this.state.text}>
		<ExpansionPanelSummary>
          <Typography> {item.text} </Typography>
        </ExpansionPanelSummary>
		<ExpansionPanelDetails>
		  <Typography> Lorem ipsum 2 dolor sit amet, consectetur adipiscing. </Typography>
		</ExpansionPanelDetails>
		</ExpansionPanel>
        {item.text}
      </ul>
    )
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
