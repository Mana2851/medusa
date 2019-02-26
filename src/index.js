import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teamItems: [], workoutItems: [] }; //One for each so that each array can keep tract of its own list of items instead of changing the same one for both
  }

  render()
  {
    return (
      <div id = "contain">
        <div id = "teamName">
          <h3>Team Names</h3>
          <TodoList items = {this.state.teamItems} text = {"teamList"} />
        </div>
        <div id = "workouts">
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
    //I passed the form into here as well so I could refer to "this" properly, since it seems that it always refers to the Component it is inside of.
    return (
      <form onSubmit = {this.handleSubmit}>
        <ul id = {this.state.text}>
          {items.map(item => <TodoItem item={item} key={item.key} />)}
        </ul>
        <label htmlFor = "new_Name">Adding a new workout?</label>
        <input id = "new_Name" onChange = {this.handleChange} value = {this.state.text}/>
        <button> Add #{this.state.items.length + 1}</button>
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
      <ul id = {key}>
        {item.text}
      </ul>
    )
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
