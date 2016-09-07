//https://software.intel.com/en-us/xdk/articles/cordova-core-plugin-camera-short-code-example
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AddImage extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = { };
    this.destinationType = navigator.camera.DestinationType;
    this.takePicture = this.takePicture.bind(this);     
  }

 onPhotoURISuccess(dataUrl) {
       
       const {actions} = this.props;
       
       //console.log('photo success', dataUrl);
      console.log('photo success');

      var largeImage = document.getElementById('largeImage');
      largeImage.style.display = 'block';
            
      largeImage.src = "data:image/jpeg;base64," + dataUrl;
      
      actions.addImage('namesa', "data:image/jpeg;base64," + dataUrl);
    }
 
 onFail(message) {
     alert('Failed because: ' + message);
    }

  takePicture(source) {
      var that = this;
      navigator.camera.getPicture(this.onPhotoURISuccess.bind(this), this.onFail, 
        { quality: 50,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          sourceType: navigator.camera.CAMERA });
    
  }

  render() {    
    const { actions } = this.props;
	
    var imgStyle = { width: '200px' };

    return (
        <div>
          upload new image
          <input type="button" value="Upload" onClick={this.takePicture}/>
          <img display='none' id="largeImage" style={imgStyle}/>
        </div>   

    );
  }
}

AddImage.propTypes = {    
    actions: PropTypes.object.isRequired
  };