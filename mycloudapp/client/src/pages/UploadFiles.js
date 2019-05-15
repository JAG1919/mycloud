import React from 'react';
import ReactDOM from 'react-dom';
import Upload from 'rc-upload';
import axios from 'axios';
// import FileIcon, { defaultStyles } from 'react-file-icon';

const asdf = [
    {
        id: 1234,
        name: "file1",
        dir: false
    },
    {
        id:5678,
        name: "directory1",
        dir: true,
        children:[
            {
                id: 2345,
                name: "file2",
                dir: false
            },
            {
                id: 3456,
                name: "file3",
                dir: false
            }
        ]
    }
]

const filedrop = {
    display:"inline-block",
    height: "100px",
    width: "300px",
    color: 'grey',
    fontSize: 21,
    border: 'solid grey 4px',
    backgroundColor: 'rgba(255,255,255,.8)',
    "line-height": "75px",
    "text-align": "center",
    "margin-top": "20px",
    "margin-bottom": "30px",
    "border-style": "ridge"
}

const allcontainer = {
    // "margin-left": "auto",
    // "margin-right": "auto",
    width: "100%",
    "text-align": "center",
    "background-color": "rgb(192,192,192)",
}

const filediv = {
    height: "40px",
    margin: "3px",
    "background-color": "#1985ac",
    "border-radius": "25px",
    fontSize: "2em",
    color: "white"
}

const filelabel = {
    display: "block"
}

const itemcontainer = {
    width: "700px",
    height: "400px",
    margin: "auto",
    border: "3px solid #20a8d8",
    backgroundColor: 'rgba(255,255,255,.8)',
}

class UploadFiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files:null,
        }
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
                // console.log('onSuccess', file);
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
    
    drag = (ev) => {
        console.log(ev.target)
        ev.dataTransfer.setData("file", ev.target.dataset.id);
    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }

    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("file");
        console.log(data)
        console.log(ev.target.dataset.id)
        // ev.target.appendChild(document.getElementById(data));
    }

    whenDirClicked = (e) => {
        console.log(e);
    }

    whenClicked = (e) => {
        // console.log("hi")
        // e.preventDefault();
        // e.disabled = true;
        // console.log("hi")
        return "return return false";
    }
   
    render() {
        let listoffiles = asdf.map(file => {
            if (file.dir === true){
                return(<label style={filelabel}><div style={filediv} data-id={file.id} key={file.id} draggable="true" onDragStart={this.drag} onDragOver={this.allowDrop} onDrop={this.drop} onClick={this.whenDirClicked}>{file.name}</div></label>);
            }
            return (<label style={filelabel}><div style={filediv} data-id={file.id} key={file.id} draggable="true" onDragStart={this.drag}>{file.name}</div></label>);
        });

        return (
            <div style={allcontainer}>                      
                <Upload {...this.uploaderProps} ref="inner"><a onClick={this.whenClicked} style={filedrop}>Drop Files and Directories Here</a></Upload>
                <div style={itemcontainer}>{listoffiles}</div>
                {/* <FileIcon extension="pdf" {...defaultStyles.pdf} /> */}
            </div>);
    }
}


export default UploadFiles;