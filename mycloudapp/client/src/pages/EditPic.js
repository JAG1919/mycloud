import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';

import Cropper from './react-cropper';

import { NavLink } from 'react-router-dom';

import { Button, } from 'reactstrap';

/* global FileReader */
import src from './child.jpg';
// const src = './child.jpg';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
    this.backClick = this.backClick.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  useDefaultImage() {
    this.setState({ src });
  }
  backClick(){
    this.props.history.go(-1)
}

  render() {
    return (
      <div style={{ width: '90%',margin: '0 auto' }}>
        <div style={{ width: '80%',margin: '0 auto' }}>
          <input type="file" onChange={this.onChange} />
          <button onClick={this.useDefaultImage}>Use default img</button>
          {/* <NavLink block to="/dashboard" >
            <Button block color="primary" className="px-4">Go Back</Button>
          </NavLink> */}
          <button onClick={this.backClick}>Go Back</button>
          <br />
          <br />
          <Cropper
            style={{ height: 400, width: '100%' }}
            // aspectRatio={16 / 9}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
          />
        </div>
        <div>
          {/* <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>Preview</h1>
            <div className="img-preview" style={{ width: '60%',  height: 190,margin:'0 auto'}} />
          </div> */}
          {/* <div className="box" style={{ width: '50%', float: 'right' }}> */}
            <h1>
              <span>Crop</span>
              <button onClick={this.cropImage} style={{ float: 'right' }}>
                Crop Image
              </button>
            </h1>
            <img style={{ width: '90%',margin:'0 auto' }} src={this.state.cropResult} alt="cropped image" />
          {/* </div> */}
        </div>
        <br style={{ clear: 'both' }} />
      </div>
    );
  }
}