const mongoCollections = require("../config/mongoCollections");
const files= mongoCollections.files;

let exportedmethod ={
    async postfile(newfile,path,userid)
    {
        const fileCollection = await files();
        let i=0;
        let f=0;
        let w="";
        if(path!=="")
        {
            let a=path.split('/');
            console.log(a);
            console.log(a.length);
            console.log(i);
            for(i=0;i<=(a.length-1);i++)
            {
            
                const file = await fileCollection.findOne({ filename: a[i], userId:userid});
                //console.log("file : ",file.filename);
                console.log("-------------------------------------");   
                if(file)
                {
                    
                    f=1;
                    w = file.filename;
                }
                else
                {
                    console.log("a[i] :",a[i]);
                    let e =[];
                    if((i!=0)&&(i!=a.length-1))
                    {   
                        console.log("Others"); 
                        e[i]={
                            filename:a[i],
                            isdir:true,
                            originalname:a[i],
                            children:[a[i+1]],
                            parent:a[i-1],
                            userId:userid
                        }
                    }
                    else if(i==a.length-1)
                    {
                        console.log("Last");
                        e[i]={
                            filename:newfile.filename,
                            originalname:newfile.originalname,
                            isdir:newfile.isdir,
                            children:[null],
                            parent:a[i-1],
                            userId:userid
                        }
                    
                    }
                    else
                    {   
                        console.log("First");  
                         e[i]={
                            filename:a[i],
                            isdir:true,
                            originalname:a[i],
                            children:[a[i+1]],
                            parent:"root",
                            userId:userid
                        }
                    }
                    
                    const newInsertInformation = await fileCollection.insertOne(e[i]);
                    console.log("e :",newInsertInformation.ops);
                }
            }
        }    
        else
        {
            let er={
                filename:newfile.filename,
                originalname:newfile.originalname,
                isdir:newfile.isdir,
                children:[null],
                parent:"root",
                userId:userid
            }
            const newInsertInformation = await fileCollection.insertOne(er);
            console.log("er :",newInsertInformation.ops);
            let file = await fileCollection.findOne({ filename: "root", userId:userid});
            let r =file;
            console.log(r);
            if(r)
                r.children.push(er.filename);
            let updateCommand = {
                $set: r
            };
            const query = {
                filename:"root"
            };
            await fileCollection.updateOne(query, updateCommand);
        }   
        if(f==1)
        {
            console.log("Here");
            let file = await fileCollection.findOne({ filename: w,userId:userid});
            let r =file;
            console.log(r);
            r.children.push(newfile.filename);
            let updateCommand = {
                $set: r
            };
            const query = {
                filename:w
            };
            await fileCollection.updateOne(query, updateCommand);
            file = await fileCollection.findOne({ filename: w});
             r =file;
            console.log(r);
        }
    },
    async makeroot(userId)
    {
        const fileCollection = await files();
        let newroot={
            filename:"root",
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
        let file = await fileCollection.findOne( { filename: filename, userId:userid } );
        console.log(file);
        if(file.isdir==false)
            throw "File Detacted, No children";
        let a=[{}];
        for(var i=0;i<file.children.length;i++)
        {
            let we = await fileCollection.findOne( { filename: file.children[i], userId:userid } );
            a[i]={
                id:we.filename,
                originalname: we.originalname
            }
        }
        return file.children;
    },
    async movefile(fromfilename,tofilename,filefilename,userid)
    {
        let file = await fileCollection.findOne({filename:filefilename,userId:userid})
        let file2 = await fileCollection.findOne({filename:fromfilename,userId:userid})
        let file3 = await fileCollection.findOne({filename:tofilename,userId:userid})

        let r = file;
        r.parent=file3.filename;
        let updateCommand = {
            $set: r
        };
        const query = {
            fileid:r.filename
        };
        await fileCollection.updateOne(query, updateCommand);

        for( var i = 0; i < file2.children.length; i++){ 
            if ( file2.children[i] === file.filename) {
              file2.children.splice(i, 1); 
            }
         }
         let updateCommand = {
            $set: file2
        };
        const query = {
            fileid:file2.filename
        };
        await fileCollection.updateOne(query, updateCommand);
        r=file3;
        file3.children.push(file.filename);
        let updateCommand = {
            $set: r
        };
        const query = {
            fileid:r.filename
        };
        await fileCollection.updateOne(query, updateCommand);
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