// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// import { Upload, Icon, message } from 'antd';
// import "antd/dist/antd.css"
// const Dragger = Upload.Dragger;

// class UploadFiles extends Component {
//     constructor(props) {
//         super(props);
//         // this.uploadprops = async () => {
//         //     const props = {
//         //         name: 'file',
//         //         multiple: true,
//         //         action: '/',
//         //         directory: true,
//         //         onChange(info) {
//         //             console.log('onChange',info.file.isDirectory);
//         //             const status = info.file.status;
//         //             if (status !== 'uploading') {
//         //                 console.log(info.file, info.fileList);
//         //             }
//         //             if (status === 'done') {
//         //                 message.success(`${info.file.name} file uploaded successfully.`);
//         //             } else if (status === 'error') {
//         //                 message.error(`${info.file.name} file upload failed.`);
//         //                 console.log(status);
//         //             }
//         //         },
//         //     };
//         //     return props;
//         // }
//         this.state = {

//         }
//     }

//     // componentDidMount(){
//     //     this.uploadprops();
//     // }

//     uploadprops = async () => {
//         const props = {
//             name: 'file',
//             directory: true,
//             multiple: true,
//             action: '/',
//             onChange(info) {
//                 console.log('onChange',info.file.isDirectory);
//                 const status = info.file.status;
//                 if (status !== 'uploading') {
//                     console.log(info.file, info.fileList);
//                 }
//                 if (status === 'done') {
//                     message.success(`${info.file.name} file uploaded successfully.`);
//                 } else if (status === 'error') {
//                     message.error(`${info.file.name} file upload failed.`);
//                     console.log(status);
//                 }
//             },
//         };
//         return props;
//     }

//     render() {
//         const newprops = this.uploadprops();
//         return ( 
//             <Dragger {...newprops}>
//                 <div>Drop here</div>
//                 <p className="ant-upload-drag-icon">
//                     <Icon type="inbox" />
//                 </p>
//                 <p className="ant-upload-text">Click or drag file to this area to upload</p>
//                 <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
//             </Dragger> //,
//             // mountNode
//         );
//     }
// }

import React from 'react';
import ReactDOM from 'react-dom';
import Upload from 'rc-upload';
import axios from 'axios';

class UploadFiles extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.uploaderProps = {
            action: '/api/fileService/file',
            multiple: true,
            //   headers: {
            //     Authorization: 'xxxxxxx',
            //   },
            directory: true,
            onSuccess(result, file, xhr) {
                file.a="assdf";
                console.log(file);
                console.log(xhr);
            },
            customRequest: async ({
                action,
                data,
                file,
                filename,
                headers,
                onError,
                onProgress,
                onSuccess,
                withCredentials,
              }) => {
                console.log("data:", data)
                console.log("file:", file)
                console.log("filename:", file)
                const formData = new FormData();
                // if (data) {
                //   Object.keys(data).map(key => {
                //     formData.append(key, data[key]);
                //   });
                // }
                formData.append("relativePath", file['webkitRelativePath'])
                formData.append(filename, file);
                const res = await axios.post(`http://localhost:5000${action}`, formData)
                console.log(res.status)
            }
            // beforeUpload(file) {
            //     // console.log(file);
            //     // console.log('beforeUpload', file.name + "1");
            // },
            // onStart: (file) => {
            //     // console.log(file.isDirectory);
            //     // console.log('onStart', file.name);
            //     // this.refs.inner.abort(file);
            // },
            // onSuccess(file) {
            //     // console.log('onSuccess', file);
            // },
            // onProgress(step, file) {
            //     // console.log('onProgress', Math.round(step.percent), file.name);
            // },
            // onError(err) {
            //     // console.log('onError', err);
            // },
            // onChange(file) {
            //     //   console.log('onChange', file.isDirectory);
            // }
        };
        // this.state = {
        //     files: null
        // }
    }


    // dropHandler = (e) => {
    //     console.log("Hi");
    //     const config1 = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     };
    //     let formData = new FormData();
    //     var length = e.dataTransfer.items.length;
    //     // console.log(e.tartget.files);
    //     // for (let x of e.target.files){
    //     //     console.log(x)
    //     // }
    //     // console.log(e.dataTransfer.types)
    //     for (var i = 0; i < length; i++) {
            
    //         var entry = e.dataTransfer.items[i].webkitGetAsEntry();
    //         // var entry1 = e.target.files;
    //         // var entry1 = e.dataTransfer.files;
    //         // console.log(this.dataTransfer.getFilesAndDirectories());
    //         if (entry.isFile) {
    //             formData.append('file', entry)
    //             console.log("this is a file");
    //             // console.log(formData);
                
    //         } else if (entry.isDirectory) {
    //              console.log("This is a directory 1")
    //         }
    //     }
    //     axios.post('/api/fileService/file', formData, config1);
    //     // // ev.preventDefault();

    //     // if (e.dataTransfer.items) {
    //     //     // Use DataTransferItemList interface to access the file(s)
    //     //     for (var i = 0; i < e.dataTransfer.items.length; i++) {
    //     //         // If dropped items aren't files, reject them
    //     //         // console.log(e.dataTransfer.items[i].kind);
    //     //         if (e.dataTransfer.items[i].kind === 'file') {
    //     //             var file = e.dataTransfer.items[i].getAsFile();
    //     //             console.log('... file[' + i + '].name = ' + file.name + "1");
    //     //             console.log(e.dataTransfer.types);
    //     //         }
    //     //     }
    //     // } 
    //     // else {
    //     //     // Use DataTransfer interface to access the file(s)
    //     //     for (var i = 0; i < ev.dataTransfer.files.length; i++) {
    //     //         console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name + "2");
    //     //     }
    //     // }

    // }

    // onChange = (e) => {
    //     // e.preventDefault();
    //     // console.log(e);
    //     this.setState({files:e.target.files}, (e) => this.onFormSubmit(e));
    //     //this.onFormSubmit(e);
    //     // console.log(e.dataTransfer.getFilesAndDirectories());
    //     // for (let x of e.target.files){
    //     //     console.log(x);
    //     // }
    //     // console.log(this.state.files.length)
    //     // this.submit();
    // }

    // onFormSubmit = async (e) => {
    //     //e.preventDefault();
    //     // console.log(e);
    //     const formData = new FormData();
    //     // formData.append('name','file');
    //     let count = 0;
    //     // var length = this.state.files.dataTransfer.items.length;
    //     for(let x of this.state.files){
    //         formData.append('file',x);
    //         // console.log(x);
    //         count++;
    //     }
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     };
    //     await axios.post("/api/fileService/file",formData,config);
    //     //     .then((response) => {
    //     //         alert("The file is successfully uploaded");
    //     //     }).catch((error) => {
    //     // });
    // }
    //method="post" encType="multipart/form-data" webkitdirectory="" directory="" onSubmit={this.onFormSubmit}
    render() {
        return (
            <div style={{  position: 'absolute',
        
            top: '10%',
            right: 220,
    
            left: 50,
            textAlign: 'center',
            color: 'grey',
            fontSize: 36, border: 'dashed grey 4px',
            backgroundColor: 'rgba(255,255,255,.8)',
           
            }}>                      
                <Upload {...this.uploaderProps} ref="inner"><a>Drop here</a></Upload>
            </div>);
    }
}


export default UploadFiles;