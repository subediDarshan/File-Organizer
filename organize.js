const fs = require("fs");
const path = require("path");

const utilityObj = require("../utility.js")
const types = utilityObj.types;


function organizeFn(dirPath) {
    if(dirPath == undefined) {
        dirPath = process.cwd();
    }
    
    if(!(fs.existsSync(dirPath))) {
        console.log("Kindly input valid command");
        return;
    }

    const ogFilePath = path.join(dirPath, "Organized_Files")

    if(fs.existsSync(ogFilePath) == false) {
        fs.mkdirSync(ogFilePath);
    }

    
    organizeFnHelper(dirPath, ogFilePath);

}



function organizeFnHelper(dirPath, ogFilePath) {
    const childrens = fs.readdirSync(dirPath);
    childrens.forEach((child) => {
        let childPath = path.join(dirPath, child);
        if(fs.lstatSync(childPath).isFile()) {
            let childType = getType(childPath);            
            let typePath = path.join(ogFilePath, childType);
            if(fs.existsSync(typePath) == false) fs.mkdirSync(typePath);
            send(childPath, typePath);
        }
    })
    
}

function getType(childPath) {
    let extension = path.extname(childPath);
    extension = extension.slice(1);
    
    for(let type in types) {
        let typeArr = types[type];
        for (let ext of typeArr) {
            if(ext == extension) {
                return type;
            }
        }

    }

    return "other";


}

function send(src, dest) {
    let fileName = path.basename(src);
    let destFilePath = path.join(dest, fileName);
    fs.copyFileSync(src, destFilePath);
    fs.unlinkSync(src);
    console.log(`${fileName} moved to ${path.basename(dest)}`);   
}



module.exports = {
    organizeKey: organizeFn
}