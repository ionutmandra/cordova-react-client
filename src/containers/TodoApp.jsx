import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/TodoActions';
import * as CredentialsActions from '../actions/CredentialsActions';
import * as ImagesActions from '../actions/ImagesActions';
import * as ImagesAsyncActions from '../actions/ImagesAsyncActions';
import auth from '../core/auth';
import Header from '../components/Header.jsx';
import MainSection from '../components/MainSection.jsx';
import ImageList from '../components/ImageList.jsx';
import AddImage from '../components/AddImage.jsx';

export class TodoApp extends Component {
      
 constructor(...args) {
    super(...args);

    this.handleLogout = this.handleLogout.bind(this);

    this.state = {};   
  }

  componentWillMount() {		
    this.props.imagesActions.getInitialImages();
	}

  handleLogout() {
    auth.logout();
    this.props.credentialsActions.clearCredentials();    
  }
  render() {
    var that = this;
    const { todos, todoActions } = this.props;           

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ marginTop: '5px' }} onClick={this.handleLogout}>Logout</button>
        </div>
        <section>
          <div>
            <Header {...todoActions} />
            {/* <MainSection todos={todos} actions={todoActions} /> */}
            <ImageList actions={this.props.imagesActions} images = {this.props.images}/>
            <AddImage actions={this.props.imagesActions}/>
          </div>
        </section>
        <div>
          {this.props.children ? <div>{this.props.children} </div>: null}
        </div>
      </div>
    );
  }
}

TodoApp.propTypes = {
    todos: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired,
    credentialsActions: PropTypes.object.isRequired,
    todoActions: PropTypes.object.isRequired,
    imagesActions: PropTypes.object.isRequired,
  };

export default connect(
  state => ({ todos: state.todos, images:state.images }), //state to props
  dispatch => ({ //dispatch to props
    credentialsActions: bindActionCreators(CredentialsActions, dispatch),
    todoActions: bindActionCreators(TodoActions, dispatch),
    imagesActions: bindActionCreators(ImagesActions, dispatch),    
}))(TodoApp);
