const fs=require('fs')
const check=require('./libs/checkLib')
const readDir = require('./fileLib')
const async=require('async')
const readline = require('readline');

//read line constructor called
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
//  fs.readdir('./libs').forEach(file => {
//      if(~file.indexOf('.js')) require(`./libs/${file}`);    
//  });


async.series([
    getSourceDir=()=>{
        rl.question('Enter Source directory Name (No file name) : ',(answer)=>{
            if(check.isEmpty(answer))
            getSourceDir();
            else{
            getFileNames(answer.trim())
            }
        })
    },
    getFileNames=(dirName)=>{
        readDir.readDirectory(dirName)
        .then((resolve)=>{ 
            if(resolve.length!=0){
                let i=0;let list='';
                resolve.forEach(file => {list+=(`\n ${i+1}. ${file}`)})

                rl.question(`Choose a file (number) you want to copy : ${list} \n`,(answer)=>{
                    (check.isEmpty(answer))?getFileName(dirName): getDestinationDir(dirName+=`\\${resolve[(answer.trim()-1)]}`)
                })
            }else{
                console.log("Directory is Empty!.")
                getSourceDir();
            }

        },(reject)=>{
            console.log("Directory Not Found!!.");
            getSourceDir();
        })
    },
    getDestinationDir=(file)=>{
        rl.question('Enter Destination directory Name (No file name) : ',(answer)=>{
            if(check.isEmpty(answer))
                getDestinationDir(file);
            else{
                readDir.readDirectory(answer.trim())
                .then((resolve)=>{
                    if(resolve.length!=0){
                        console.log("\nFile Copy Operation Starting..")
                        copyToDestination(answer.trim(),file)
                    }else if(resolve.length==0){
                        console.log("\n Directory is Empty!")
                        console.log("\nFile Copy Operation Starting..")
                        copyToDestination(answer.trim(),file)
                    }
                },(reject)=>{
                    console.log("Directory not Found!!.")
                    getDestinationDir();
                })
            }
        })
    },
    copyToDestination=(dirName,file)=>{
        readDir.fileStream(dirName,file)
                .then((resolve)=>{
                    console.log(resolve)
                    rl.close();
                },(reject)=>{
                    console.log("some error occurred \n"+reject)
                    console.log("File Operation Copy Starting Again!!")
                    copyToDestination(file)
                })
    }
])

//readDir.copyStream('./testDirectory')