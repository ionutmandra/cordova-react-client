//https://software.intel.com/en-us/xdk/articles/cordova-core-plugin-camera-short-code-example
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ImageDetails extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = { };    
  }

  render() {    
    const { details } = this.props;
    
	
    var imgStyle = { width: '300px' };

    //props.params.key

    return (
      <div>
        <div>
          <Link  to="/main">merji la home</Link>
        </div>
        <div>
          IMAGE DETAILS     
          <img id="largeImageDetails" style={imgStyle} src={'http://im.dnw.ro/files/' + this.props.params.key}/>
        </div>   
      </div>
    );
  }
}


ImageDetails.propTypes = {    };