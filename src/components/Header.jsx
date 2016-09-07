import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput.jsx';

export default class Header extends Component {   

 constructor(...args) {
    super(...args);
     this.handleSave = this.handleSave.bind(this);     
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header>
        <h1>Image list app</h1>
        {/*<TodoTextInput
          newTodo={true}
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />*/}
      </header>
    );
  }
}

Header.propTypes = {
    addTodo: PropTypes.func.isRequired
  };
