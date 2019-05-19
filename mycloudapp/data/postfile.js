const mongoCollections = require("../config/mongoCollections");
const files= mongoCollections.files;
const uuid = require("uuid");

let exportedmethod ={
    async postfile(newfile,path,userid)
    {
        const fileCollection = await files();
        if(path=="")
        {
            const file = await fileCollection.findOne({originalname: newfile[0].originalname,userId: userid})
            let e={};
            if(file)
            {
                console.log( "A File with same name already Exists");
            }
            else
            {
                e={
                    filename:newfile[0].filename,
                    isdir:false,
                    originalname:newfile[0].originalname,
                    children:[null],
                    parent:"root",
                    userId:userid
                }
                console.log(e);
                const newInsertInformation = await fileCollection.insertOne(e);
                console.log("e :",newInsertInformation.ops);
                const file2 = await fileCollection.findOne({originalname: "root",userId: userid})
                console.log(file2);
                if(file2)
                {
                    console.log(file2);
                    let r = file2;
                    r.children.push(newfile[0].filename);
                    let updateCommand = {
                        $set: r
                    };
                    const query = {
                        originalname:"root",
                        userId:userid
                    };
                    let w = await fileCollection.updateOne(query, updateCommand);
                }
            }
        }
        else
        {
            let a = path.split('/');
            console.log(path);
            console.log(a);
            for(let i=0;i<=(a.length-1);i++)
            {
                let file = await fileCollection.findOne({originalname:a[i],userId:userid});
                console.log("file : ",file);
                console.log(a[i]);
                if(file)
                {
                    console.log("File :",file);
                    if(i==0)
                    {
                        console.log("Folder Already Exists");
                    }
                    else
                    {
                        if(file.parent == a[i-1])
                        {
                            continue;
                        }
                        else
                        {
                            let e={
                                filename:uuid.v4(),
                                isdir:true,
                                originalname:a[i],
                                children:[null],
                                parent:null,
                                userId:userid
                            }
                            const newInsertInformation = await fileCollection.insertOne(e);
                            console.log("e :",newInsertInformation.ops);
                        }
                    }
                }
                else
                {
                    let e ={};
                    console.log("e",e);
                    if((i!=0)&&(i!=a.length-1))
                    {   
                        console.log("Others"); 
                        e={
                            filename:uuid.v4(),
                            isdir:true,
                            originalname:a[i],
                            children:[null],
                            parent:null,
                            userId:userid
                        }
                    }
                    else if(i==a.length-1)
                    {
                        console.log("Last");
                        e={
                            filename:newfile[0].filename,
                            originalname:newfile[0].originalname,
                            isdir:false,
                            children:[null],
                            parent:null,
                            userId:userid
                        }
                    
                    }
                    else
                    {   
                        console.log("First");  
                        e={
                            filename:uuid.v4(),
                            isdir:true,
                            originalname:a[i],
                            children:[null],
                            parent:"root",
                            userId:userid
                        }
                    }
                    console.log("DB : ",e);
                    const fil = await fileCollection.findOne({originalname: e.originalname,userId: userid})
                    console.log(fil);
                    if(e)
                    {
                        const newInsertInformation = await fileCollection.insertOne(e);
                        console.log("e :",newInsertInformation.ops);
                    }
                    else
                    {
                        continue;
                    }
                }
            }
            let f =[];
            let k=0;
            let foe=0;
            for(let i=0;i<(a.length-1);i++)
            {
                let file = await fileCollection.findOne({originalname:a[i],userId:userid});
                console.log("file : ",file);
                let file2 = await fileCollection.findOne({originalname:a[i+1],userId:userid});
                let d = file;
                if(d.parent=="root")
                {
                    let e = await fileCollection.findOne({originalname:"root", userId:userid});
                    if(e)
                    {
                        if(e.children)
                        {
                            for(let i=0;i<e.children.length;i++)
                            {
                                if(e.children[i]==null)
                                    continue;
                                if(e.children[i][0]==d.filename)
                                {
                                    foe=1;
                                }
                            }
                            if(foe == 0)
                            {
                                f=d.filename;
                                k++;
                            }
                        }
                    }
                }
                d.children.push(file2.filename);
                let qwe = file2;
                qwe.parent = file.filename;
                let updateCommand = {
                            $set: d
                        };
                        let query = {
                            originalname:a[i],
                            userId:userid
                        };
                let r=await fileCollection.updateOne(query, updateCommand);
                let updatedCommand = {
                            $set: qwe
                        };
                        query = {
                            originalname:a[i+1],
                            userId:userid
                        };
                let we=await fileCollection.updateOne(query, updatedCommand);
            }
            let e = await fileCollection.findOne({originalname:"root", userId:userid});
            if(e)
            {
                let red = e;
                if(!red.children.includes(f))
                    red.children.push(f);
                let updateCommand = {
                    $set: red
                };
                const query = {
                    originalname:"root",
                    userId:userid
                };
                let ws=await fileCollection.updateOne(query, updateCommand);
            }
        }
        await fileCollection.remove({children:[null],parent:"root",isdir:true})
    },

        
    async makeroot(userId)
    {
        const fileCollection = await files();
        let newroot={
            filename:"rc-root",
            originalname:"root",
            parent:null,
            userId:userId,
            children:[null]
        }
        let file = await fileCollection.insertOne(newroot);
        if(file)
            return true;
        else
            return false;
    },
    async fetchfile(userid,filename)
    {
        const fileCollection = await files();
        console.log("I am there");
        console.log(filename, userid);
        let file = await fileCollection.findOne( { filename: filename, userId:userid } );
        console.log("file: ",file);
        // console.log(filename,userid);
        // if(file.isdir==false)
        //     throw "File Detacted, No children";
        // let a=[{}];
        // for(var i=0;i<file.children.length;i++)
        // {
        //     let we = await fileCollection.findOne( { filename: file.children[i], userId:userid } );
            // a[i]={
            //     id:we.filename,
            //     originalname: we.originalname
            // }
        // }
        // return file;
        if(file)
        {
            if(file.isdir==false)
                return "File Detacted, No children";
            let a=[];
            if(file.children)
            {
                for(var i=0;i<file.children.length;i++)
                {
                    if(file.children[i]==null)
                        continue;
                    console.log("Child :",file.children[i]);
<<<<<<< HEAD
                    let we = null;
=======
                    // let we = null;
>>>>>>> dev1
                    // if (file.filename == "rc-root"){
                    //     we = await fileCollection.findOne( { filename: file.children[i][0], userId:userid } );
                    // } else {
                    //     we = await fileCollection.findOne( { filename: file.children[i], userId:userid } );
                    // }
                    
                    let we = await fileCollection.findOne( { filename: file.children[i], userId:userid } );
                    console.log("WE :",we);
                    if(we)
                    {
                        a[i]={
                            id:we.filename,
                            originalname: we.originalname,
                            isdir: we.isdir,
                            parent: we.parent
                        }
                    }
                }
            }
            console.log(a);
            return a;
        }
        
    },
    async movefile(fromfilename,tofilename,filefilename,userid)
    {
        const fileCollection = await files();
        let file = await fileCollection.findOne({filename:filefilename,userId:userid})
        let file2 = await fileCollection.findOne({filename:fromfilename,userId:userid})
        let file3 = await fileCollection.findOne({filename:tofilename,userId:userid})

        let r = file;
        r.parent=file3.filename;
        let updateCommand = {
            $set: r
        };
        let query = {
            filename:r.filename
        };
        let e = await fileCollection.updateOne(query, updateCommand);
        console.log("File :",r);
        for( var i = 0; i < file2.children.length; i++){ 
            if ( file2.children[i] === file.filename) {
              file2.children.splice(i, 1); 
            }
         }
        updateCommand = {
            $set: file2
        };
        query = {
            filename:file2.filename
        };
        let err=await fileCollection.updateOne(query, updateCommand);
        console.log("From File :",file2)
        r=file3;
        file3.children.push(file.filename);
        updateCommand = {
            $set: r
        };
        query = {
            filename:r.filename
        };
        let er= await fileCollection.updateOne(query, updateCommand);
        console.log("To File  :", r);
        if((e)&&(er)&&(err))
            return true;
        else
            return false;
    },
    async deletefile(filename,userid)
    {
        var f=true;
        const fileCollection = await files();
        const r=fileCollection.remove({filename:filename,userId:userid},true);
        return r;
    },
}

// exportedmethod.fetchfile(123,"DEF");

// newfile={
//     id:uuid.v4(),
//     fieldname:"file",
//     filename:"XYZ.txt",
//     originalname:"txw2.txt",
//     isdir:false,
//     children:[null],
// }

// newfile2={
//     id:uuid.v4(),
//     fieldname:"file",
//     filename:"XYZ3.txt",
//     originalname:"txw3.txt",
//     isdir:false,
//     children:[null],
// }

// path="ABC/DEF/LMN/XYZ.txt";
// exportedmethod.postfile(newfile,path,123);
// path2="ABC/DEF/XYZ3.txt"
// exportedmethod.postfile(newfile2,path2,123);
// path=""
// exportedmethod.postfile(newfile2,path,123);

module.exports = exportedmethod;