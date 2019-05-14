import React from 'react';
import ReactDOM from 'react-dom';
import Upload from 'rc-upload';
import axios from 'axios';

const style = {
    height: "500px",
    width: "500px",
    display: "inline-block",
    color: 'grey',
    fontSize: 36,
    border: 'dashed grey 4px',
    backgroundColor: 'rgba(255,255,255,.8)',
}

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
                console.log("path",file.webkitRelativePath);
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

    whenClicked = (e) => {
        e.preventDefault();
        // console.log(e);
        // this.setState({files:e.target.files}, (e) => this.onFormSubmit(e));
        //this.onFormSubmit(e);
        // console.log(e.dataTransfer.getFilesAndDirectories());
        // for (let x of e.target.files){
        //     console.log(x);
        // }
        // console.log(this.state.files.length)
        // this.submit();
    }
   
    render() {
        return (
            <div style={style}>                      
                <Upload {...this.uploaderProps} ref="inner"><a onClick="return false">Drop here :)</a></Upload>
            </div>);
    }
}


export default UploadFiles;