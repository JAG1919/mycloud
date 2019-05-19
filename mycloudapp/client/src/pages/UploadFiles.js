import React from 'react';
import ReactDOM from 'react-dom';
import Upload from 'rc-upload';
import axios from 'axios';
import firebase from '../config/firebase';  
// import FileIcon, { defaultStyles } from 'react-file-icon';

const asdf = [
    {
        id: 1234,
        name: "file1",
        dir: false
    },
    {
        id: 5678,
        name: "directory1",
        dir: true,
        children: [
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
    display: "inline-block",
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
            files: null,
            path: ''
        }
        this.element = React.createRef();
        // this.traverseFileTree = this.traverseFileTree.bind(this);
        this.myRef = React.createRef();
        this.uploaderProps = {
            action: '/api/fileService/file',
            multiple: true,
            //   headers: {
            //     Authorization: 'xxxxxxx',
            //   },
            directory: true,

            onSuccess(result, file, xhr) {
                file.a = "assdf";
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
                // console.log("data:", data)
                // console.log("filename: ",filename)
                // console.log("file:", file)
                // console.log("filename:", file)
                //console.log("path: ",path)
                // const formData = new FormData();
                // formData.append("relativePath", file['webkitRelativePath'])
                // formData.append("userid", 123)
                // formData.append(filename, file);
                // console.log(formData);
                // const res = await axios.post(`http://localhost:5000${action}`, formData);
                // console.log(res.status)
            }
            // beforeUpload(f   ile) {
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

    allowDrop = (e) => {
        console.log(e)
    }

    whenClicked = async(e) => {
        let user = firebase.auth().currentUser.uid;

        // var formData = new FormData();
        // formData.append("uid", user);
        // // formData.append("asdf", "asdf");
        // const res = await axios.post(`http://localhost:5000/api/fileService/registerroot`, {"uid": user});
        // console.log(res.status);

        // console.log("asdfasdf")
        // const res = await axios.post(`http://localhost:5000/api/fileService/files`, {"userid":user,filename:"rc-root"});
        // console.log("res: ",res);
        // console.log(res.status);


        // const res = await axios.post(`http://localhost:5000/api/fileService/move`, {"userid":user,filename:"4c9a4661e13241583c9c010f30da92a3",fromfile:"e75de63e-374c-4c6d-ab7c-2eabe8eba6e9",tofile:"a9df2739-ce41-49c2-baf6-3086e2dba300"})
        // console.log(res);

        /*deletefile  -> //(formData={uid:userid,filename:filename}) */
        const res = await axios.delete(`http://localhost:5000/api/fileService/file`, {data:{"uid":user,filename:"0c64774e29d7e070fe6e6bbff4a43d7f"}})
        console.log(res);
    }


    render() {

        let listoffiles = asdf.map(file => {
            if (file.isdir === true) {
                return (<label style={filelabel}><div style={filediv} draggable="true" onDragStart={this.drag} onDragOver={this.allowDrop} onDrop={this.drop} onClick={this.whenDirClicked}>{file.name}</div></label>);
            }
            return (<label style={filelabel}><div style={filediv} draggable="true" onDragStart={this.drag}>{file.name}</div></label>);
        });
        //data-id={file.id} key={file.id}
        return (
            <div ondragover={this.allowDrop} style={allcontainer}>
                <div ref={this.element}><Upload {...this.uploaderProps}><a onClick="return false" style={filedrop}>Drop Files and Directories Here</a></Upload></div>
                <div style={itemcontainer}>{listoffiles}</div>
                <div onClick={this.whenClicked}>click here</div>
            </div>);
    }
    componentDidMount = async () => {
        // let a = await axios.post(`http://localhost:5000/api/fileService/registerroot`, "123")
        // let file = {
        //     filename: "root",
        //     userid: "123"
        // }
        // let res = await axios.get(`http://localhost:5000/api/fileService/files`, file)
        // this.setState({
        //     files: res.children
        // })
        this.element.current.addEventListener('drop', this.handleEvent);
    }

    handleEvent = (event) => {
        event.preventDefault();
        var items = event.dataTransfer.items;
        for (var i = 0; i < items.length; i++) {
            // webkitGetAsEntry is where the magic happens
            var item = items[i].webkitGetAsEntry();
            if (item) {
                this.traverseFileTree(item);
            }
        }
    }
    traverseFileTree = async (item, path) => {
        let user = firebase.auth().currentUser.uid;
        path = path || "";
        if (item.isFile) {
            // Get file
            let filepath = null;
            item.file(function(file) {
                let action = '/api/fileService/file';
                filepath = path + file.name;
                console.log("File:", path + file.name);
                console.log("File2:", file);
                const formData = new FormData();
                formData.append("userid", user);
                if (!path){
                    formData.append("path", "");
                } else {
                    formData.append("path", filepath);
                }
                formData.append("file", file);
                const res = axios.post(`http://localhost:5000${action}`, formData);
                console.log(res.status)
            });
        } else if (item.isDirectory) {
          // Get folder contents
            var dirReader = item.createReader();
            dirReader.readEntries((entries) => {
                for (var i=0; i<entries.length; i++) {
                    this.traverseFileTree(entries[i], path + item.name + "/");                
                }
            });
        }
    }
}


export default UploadFiles;