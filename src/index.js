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
          <TodoList items = {this.state.teamItems} id = "teamList" />
        </div>
        <div class = "columns">
          <h3>Workout Names</h3>
          <TodoList items = {this.state.workoutItems} id = "workoutList" />
        </div>
      </div>
    );
  };
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: props.items, text: '', id: props.id };
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

  defineListItem()
  {
    var listItem = null;
    if(this.state.id === "workoutList")
    {
      listItem = this.state.items.map(item => <TodoItem item={item} key={item.id} />)
    }
    if(this.state.id === "teamList")
    {
      listItem = this.state.items.map(item => <TodoTeam item={item} key={item.id} />)
    }
    return(listItem)
  }

  render () {
    const items = this.state.items;
    const text = this.state.text;

    return (
      <form onSubmit = {this.handleSubmit}>
  	    <ul>
          {this.defineListItem()}
        </ul>
        <label htmlFor = "new_Name">Adding a new workout?</label>
        <input id = "new_Name" onChange = {this.handleChange}/>
        <button variant="contained" color="primary"> Add #{this.state.items.length + 1}</button>
      </form>
    );
  }
}

class TodoTeam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {item: props.item, key: props.id}
	}
	render()
	{
		const item = this.state.item;
		const key = this.state.key;
		return(
		<ul class = "addedInfo">
      <ExpansionPanel expanded={false}>
        <ExpansionPanelSummary>
          <Typography> {item.text} </Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
		</ul>
		);
	}
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, key: props.id }
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