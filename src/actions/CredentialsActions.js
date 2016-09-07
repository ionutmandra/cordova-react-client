import * as types from '../constants/CredentialsActionTypes';

export function clearCredentials() {
  return {
    type: types.CLEAR_CREDENTIALS
  };
}
export function checkCredentials() {
  return {
    type: types.CHECK_CREDENTIALS
  };
}
export function checkCredentialsSucess() {
  return {
    type: types.CHECK_CREDENTIALS_SUCCESS
  };
}
export function checkCredentialsFailure() {
  return {
    type: types.CHECK_CREDENTIALS_FAILURE
  };
}
export function addCredentials() {
  return {
    type: types.ADD_CREDENTIALS
  };
}
export function addCredentialsSucess() {
  return {
    type: types.ADD_CREDENTIALS_SUCCESS
  };
}
export function addCredentialsFailure(hint) {
  return {
    type: types.ADD_CREDENTIALS_FAILURE,
    hint
  };
}

//--------------------------------------------------------------------------------------------

export function login(email, pwd) {

 return async function (dispatch, getState) {
      console.log('loggin in with', email, pwd);
      let response = await doLogin(email, pwd);
      console.log('logging response', response);
      if(response){
        localStorage.token = response.token;
        localStorage.time = Date.now();
        dispatch({type: types.ADD_CREDENTIALS_SUCCESS, response});         
       }
       else{
         dispatch({type: types.ADD_CREDENTIALS_FAILURE, hint: 'authentication failed'});
       }      
     };  
}

function doLogin(email, pwd){  
  return  fetch('http://im.dnw.ro/auth/local', {
                method: 'post',
                //credentials: 'include', send cookie cors
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  type: 'local',
                  email: email,
                  password: pwd 
                })})
                .then(response => response.json())
                .then( data => data)            
                .catch(function(ex) {
                  console.log('login failed', ex);                  
                })

}
