import { browserHistory,hashHistory  } from 'react-router';
import * as actions from './actions';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import App from './containers/App.jsx'
import AppRoute from './containers/AppRoute.jsx'

   ReactDOM.render(
	 <App>
    	<AppRoute />
  	</App>,
	document.getElementById('root')
);


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('chcp_updateIsReadyToInstall', this.onUpdateReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
    },
	onUpdateReady:function(){
		console.log('onUpdateReady');
		var a = confirm('up is available. do wyou want it?');
		if(a){
			chcp.installUpdate(app.installationCallback);
		}
	},
	installationCallback: function(error) {
    if (error) {
      console.log('Failed to install the update with error code: ' + error.code);
      console.log(error.description);
    } else {
      console.log('Update installed!');
    }
  	},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event 2: ' + id);

    }
};

app.initialize();