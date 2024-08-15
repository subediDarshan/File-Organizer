const fs = require("fs");
const path = require("path");

function treeFn(dirPath) {
    if(dirPath == undefined) {
        dirPath = process.cwd();
    }
    
    if(!(fs.existsSync(dirPath))) {
        console.log("Kindly input valid command");
        return;
    }

    treeFnHelper(dirPath, "");
}

function treeFnHelper(dirPath, indent) {
    const childrens = fs.readdirSync(dirPath);
    childrens.forEach((child) => {
        let childPath = path.join(dirPath, child);
        let isDirectory = fs.lstatSync(childPath).isDirectory();
        if(isDirectory) {
            console.log(`${indent}└──${child}`);
            treeFnHelper(childPath, indent+"\t");
        } else {
            console.log(`${indent}├──${child}`);
        }
    })
}


module.exports = {
    treeKey: treeFn
}