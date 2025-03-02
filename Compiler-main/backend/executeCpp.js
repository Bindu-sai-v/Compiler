const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs"); //C:\\Users\\vam c\\OneDrive\\Desktop\\backend\\codes

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filepath,inputpath) => {
  //"C:\\Users\\vam c\\OneDrive\\Desktop\\backend\\codes\\41ca8663-53d4-4a7e-876d-b582158f21e3.cpp" by basename we will get last path 41c....cpp
  const jobID = path.basename(filepath).split(".")[0]; //['41ca8663-53d4-4a7e-876d-b582158f21e3',cpp']
  const outPath = path.join(outputPath, `${jobID}.exe`); //C:\\Users\\vam c\\OneDrive\\Desktop\\backend\\codes\\41ca8663-53d4-4a7e-876d-b582158f21e3.exe

  return new Promise((resolve, reject) => {
    exec(
      `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && .\\"${jobID}".exe < "${inputpath}"`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);  
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCpp,
};
