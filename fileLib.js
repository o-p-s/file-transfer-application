const fs=require('fs')
const check=require('./libs/checkLib')

let readDirectory=(dirName)=>{
    return new Promise((resolve,reject)=>{
        fs.readdir(dirName,(err,List)=>{
            if(!err)
            resolve (List)
            else
            reject(null)
        })
    })
}
let fileStream =(dirName,file)=>{
    return new Promise((resolve,reject)=>{
        try{
            let readStream = fs.createReadStream(file)
            let writeStream=fs.createWriteStream(dirName+=`\\${file.split('\\')[file.split('\\').length-1]}`)
            readStream.on('data',(chunk)=>{
                console.log(chunk)
                writeStream.write(chunk)
                writeStream.end();
            })
            readStream.on('end',()=>{
                resolve('File Copy Operation Completed: Created new file into the destination directory.');
            })
        }catch(err){
            reject(err);
        }
    })
}
module.exports={
    readDirectory:readDirectory,
    fileStream:fileStream
}