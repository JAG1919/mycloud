const mongoCollections = require("../config/mongoCollections");
const files= mongoCollections.files;
const uuid = require("uuid");

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
                    if(file.parent!=a[i-1])
                    {
                        continue;
                    }
                }
                else
                {
                    console.log("a[i] :",a[i]);
                    let e =[];
                    if((i!=0)&&(i!=a.length-1))
                    {   
                        console.log("Others"); 
                        e[i]={
                            id:uuid.v4(),
                            filename:a[i],
                            isdir:true,
                            children:[a[i+1]],
                            parent:a[i-1],
                            userId:userid
                        }
                    }
                    else if(i==a.length-1)
                    {
                        console.log("Last");
                        e[i]={
                            id:newfile.id,
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
                            id:uuid.v4(),
                            filename:a[i],
                            isdir:true,
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
                id:newfile.id,
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
            r.children.push(er.id);
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
            let file = await fileCollection.findOne({ filename: w});
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
            id:"rc-1",
            filename:"root",
            parent:null,
            userId:userId,
            children:[null]
        }
        let file = await fileCollection.insertOne(newroot);
        console.log(file);
    },
    async fetchfile(userid,fileid)
    {
        const fileCollection = await files();
        console.log("I am there");
        let file = await fileCollection.findOne( { id: fileid, userId:userid } );
        console.log(file);
        return file.children;
    }
   /* async movefile(fromid,toid,fileid)
    {
        let file = await fileCollection.findOne({id:fileid})
        let file2 = await fileCollection.findOne({id:fromid})
        let file3 = await fileCollection.findOne({id:toid})
    }*/
}

// exportedmethod.fetchfile(123,"DEF");

newfile={
    id:uuid.v4(),
    fieldname:"file",
    filename:"XYZ.txt",
    originalname:"txw2.txt",
    isdir:false,
    children:[null],
}

newfile2={
    id:uuid.v4(),
    fieldname:"file",
    filename:"XYZ3.txt",
    originalname:"txw3.txt",
    isdir:false,
    children:[null],
}

// path="ABC/DEF/LMN/XYZ.txt";
// exportedmethod.postfile(newfile,path,123);
// path2="ABC/DEF/XYZ3.txt"
// exportedmethod.postfile(newfile2,path2,123);
// path=""
// exportedmethod.postfile(newfile2,path,123);
module.exports = exportedmethod;