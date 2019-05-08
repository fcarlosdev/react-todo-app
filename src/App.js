import React from "react";

import "./assets/css/style.css";

class App extends React.Component {
  state = {
    todos: [
      { id: 1, content: "Learn Redux", done: false },
      { id: 2, content: "Learn Python", done: false }
    ],
    value: ""
  };

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let newTodo = {
      id: this.state.todos.length + 1,
      content: this.state.value
    };
    let todos = [...this.state.todos, newTodo];
    this.setState({ todos });
    this.setState({ value: "" });
  };

  handleDone = id => {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      });
      return { todos: updatedTodos };
    });
  };

  handleRemove = id => {
    let todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos });
  };

  listTodos = () => {
    const todos = this.state.todos.map(todo => (
      <li
        key={todo.id}
        data-id={todo.id}
        className={`collection-item ${todo.done ? "td-done" : ""}`}
      >
        {todo.content}
        <div className="actions">
          <i
            className="material-icons done"
            onClick={() => this.handleDone(todo.id)}
          >
            {todo.done ? "undo" : "done"}
          </i>
          <i
            className="material-icons remove"
            onClick={() => this.handleRemove(todo.id)}
          >
            clear
          </i>
        </div>
      </li>
    ));
    return todos.length > 0 ? <ul className="collection">{todos}</ul> : "";
  };

  render() {
    return (
      <div className="container">
        <h1>
          My<span className="light-blue-text darken-text-4">Todo</span>App
        </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter Todo"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
        {this.listTodos()}
      </div>
    );
  }
}

export default App;

