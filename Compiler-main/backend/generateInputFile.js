const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");



const dirInputs = path.join(__dirname, "inputs"); //C:\Users\vam c\OneDrive\Desktop\backend\codes

if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (input) => {
    const jobID =  uuid();
    const input_fileName = `${jobID}.txt`; // jobid.txt
    const input_filePath = path.join(dirInputs,input_fileName);
    await fs.writeFileSync(input_filePath,input);
    return input_filePath;
};

module.exports = {
    generateInputFile,
};
