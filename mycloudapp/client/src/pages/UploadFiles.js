// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// import { Upload, Icon, message } from 'antd';
// import "antd/dist/antd.css"
// const Dragger = Upload.Dragger;

// class UploadFiles extends Component {
//     constructor(props) {
//         super(props);
//         this.uploadprops = async () => {
//             const props = {
//                 name: 'file',
//                 multiple: true,
//                 action: '/',
//                 directory: true,
//                 onChange(info) {
//                     const status = info.file.status;
//                     if (status !== 'uploading') {
//                         console.log(info.file, info.fileList);
//                     }
//                     if (status === 'done') {
//                         message.success(`${info.file.name} file uploaded successfully.`);
//                     } else if (status === 'error') {
//                         message.error(`${info.file.name} file upload failed.`);
//                         console.log(status);
//                     }
//                 },
//             };
//             return props;
//         }
//         // this.state = {

//         // }
//     }

//     // componentDidMount(){
//     //     this.uploadprops();
//     // }

//     // uploadprops = async () => {
//     //     const props = {
//     //         name: 'file',
//     //         multiple: true,
//     //         action: '/api/fileService/file',
//     //         directory: true,
//     //         onChange(info) {
//     //             const status = info.file.status;
//     //             if (status !== 'uploading') {
//     //                 console.log(info.file, info.fileList);
//     //             }
//     //             if (status === 'done') {
//     //                 message.success(`${info.file.name} file uploaded successfully.`);
//     //             } else if (status === 'error') {
//     //                 message.error(`${info.file.name} file upload failed.`);
//     //                 console.log(status);
//     //             }
//     //         },
//     //     };
//     //     return props;
//     // }

//     render() {
//         const newprops = this.uploadprops();
//         return ( 
//             <Dragger {...newprops}>
//                 <div>Drop here</div>
//                 {/* <p className="ant-upload-drag-icon">
//                     <Icon type="inbox" />
//                 </p>
//                 <p className="ant-upload-text">Click or drag file to this area to upload</p>
//                 <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p> */}
//             </Dragger> //,
//             // mountNode
//         );
//     }
// }

import React from 'react';
import ReactDOM from 'react-dom';
import Upload from 'rc-upload';

class UploadFiles extends React.Component {
  constructor(props) {
    super(props);
    this.uploaderProps = {
      action: '/',
      multiple: true,
    //   data: { a: 1, b: 2 },
    //   headers: {
    //     Authorization: 'xxxxxxx',
    //   },
      directory: true,
      beforeUpload(file) {
        console.log('beforeUpload', file.name);
      },
      onStart: (file) => {
        console.log('onStart', file.name);
        // this.refs.inner.abort(file);
      },
      onSuccess(file) {
        console.log('onSuccess', file);
      },
      onProgress(step, file) {
        console.log('onProgress', Math.round(step.percent), file.name);
      },
      onError(err) {
        console.log('onError', err);
      },
    };
  }
  render() {
    return (
        <div style={{ margin: 100,}}>

      <div>
        <Upload {...this.uploaderProps} ref="inner"><a>Drop here</a></Upload>
      </div>

    </div>);
  }
}


export default UploadFiles;