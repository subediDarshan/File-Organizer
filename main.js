#!/usr/bin/env node

const helpObj = require("./commands/help.js")
const treeObj = require("./commands/tree.js")
const organizeObj = require("./commands/organize.js")



const inputArr = process.argv.slice(2);
const command = inputArr[0];
const dirPath = inputArr[1];

// node main.js tree "dirPath"
// node main.js organize "dirPath"
// node main.js help 

switch (command) {
    case "tree":
        treeObj.treeKey(dirPath);
        break;
        
    case "organize":
        organizeObj.organizeKey(dirPath);
        break;

    case "help":
        helpObj.helpKey();
        break;

    default:
        console.log("Kindly input valid command");
        break;
}































