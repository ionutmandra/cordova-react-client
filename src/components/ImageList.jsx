import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


export default class ImageList extends Component {
  
  constructor(props, context) {
    super(props, context);    
    this.state = { };
  }

  deleteImage(id){
    this.props.actions.deleteImage(id);
  }

  render() {    

    const p = this.props;

    const { actions } = this.props;

    var imgStyle = {
      width: '100px',
      maxHeight: '50px'
    };

    console.log('p.images', p.images);
    //<Link to={'/main/' + item.nameOnDisk.substring(0,item.nameOnDisk.length-5)}>{item.name}</Link>
		const images = p.images.map(function(item) {
			return (
                <div key={item._id}>
                    {item.description}
                    <Link to={'/main/' + item.nameOnDisk}>{item.name}</Link>
                    <input type="button" value="remove" onClick={p.actions.deleteImage.bind(this, item.id)} />
                    <img src={'http://'+item.path} style={imgStyle} />
                </div>
            );
		},this);
    return (
      <section>   
      image list  
        <div>  
          {images}
        </div>           
      </section>
    );
  }
}

ImageList.propTypes = {    
    images: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };