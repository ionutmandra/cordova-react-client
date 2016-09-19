import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import auth from '../core/auth';
import * as CredentialsActions from '../actions/CredentialsActions';

export class Login extends Component {
  
  constructor(...args) {
    super(...args);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.state = {isMountedAndCreatedByRouter: false};
  }
  componentDidMount() {
    // Chnage 'isMountedAndCreatedByRouter' from false to true
    // only when generated from router for the first time.
    // For animation effect
    if (this.props.route !== undefined) {
      setTimeout(() => this.setState({ isMountedAndCreatedByRouter: true }));
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    const { credentialsActions } = this.props;
    credentialsActions.addCredentials();

    const email = this.refs.email.value;
    const password = this.refs.password.value;


    credentialsActions.login(email, password);


    // auth.login(email, password, (authenticated, hint) => {
    //   if (authenticated) {
    //     credentialsActions.addCredentialsSucess();
    //   } else {
    //     credentialsActions.addCredentialsFailure(hint);
    //   }
    // });

  }
  render() {
    const { credentials } = this.props;
    const { isMountedAndCreatedByRouter } = this.state;
    const { checkingToken, loggingIn, hint } = credentials;
    const hideLogin = (!isMountedAndCreatedByRouter) || checkingToken || loggingIn;

    return (
      <div style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', textAlign: 'center', backgroundColor: '#F7DF1E', color: 'black' }}>
      <a href="/css/android-debug.apk" target="_blank" style="position:absolute; display:block">Download</a>
        <div style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
          <div>            
            <h1>
              TodoMVC example18
            </h1>
          </div>
          <div style={{ maxHeight: hideLogin ? '0' : '175px', overflow: 'hidden', transition: 'max-height 0.5s ease-in-out' }}>
            <h1 style={{ margin: '0', padding: '20px 0' }}>
              Login
            </h1>
            <form onSubmit={this.handleSubmit} style={{ width: '200px', margin: 'auto' }}>
              <div style={{ paddingTop: '5px' }}>
                <input type="text" ref="email" placeholder="Email" style={{ width: '100%', height: '25px' }} />
              </div>
              <div style={{ paddingTop: '5px' }}>
                <input type="password" ref="password" placeholder="Password" style={{ width: '100%', height: '25px' }} />
                <div style={{ height: '1em', color: '#383838', fontWeight: 400 }}>{hint && `Hint: ${hint}`}</div>
              </div>
              <div style={{ paddingTop: '5px' }}>
                <button type="submit" style={{ width: '100%', height: '25px' }}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


Login.propTypes = {
    route: PropTypes.object,
    credentials: PropTypes.object,
    credentialsActions: PropTypes.object
  };

export default connect(state => ({ general: state.general, credentials: state.credentials }), dispatch => ({
  credentialsActions: bindActionCreators(CredentialsActions, dispatch)
}))(Login);
