import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
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
	    <ul>
          {items.map(item => <TodoItem item={item} key={item.key} />)}
        </ul>
        <label htmlFor = "new_Name">Adding a new workout?</label>
        <input id = "new_Name" onChange = {this.handleChange} value = {this.state.text}/>
        <button variant="contained" color="primary"> Add #{this.state.items.length + 1}</button>
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
	    <ExpansionPanel>
		<ExpansionPanelSummary>
          <Typography> {item.text} </Typography>
        </ExpansionPanelSummary>
		<ExpansionPanelDetails>
		<List className={this.root} subheader={<li />}>
		{[0].map(sectionId => (
          <ul className={this.ul}>
            {[0, 1, 2, 3].map(item => (
              <ListItem>
			  //scrolling should be here
                <ListItemText primary={`Lift ${item}`} />
              </ListItem>
            ))}
          </ul>
      ))}
		</List>
		</ExpansionPanelDetails>
		</ExpansionPanel>
      </ul>
    )
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
