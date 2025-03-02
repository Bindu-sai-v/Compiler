const express = require("express");
const cors = require("cors");
const { generateFile } = require("./generateFile");
const { generateInputFile } = require("./generateInputFile");
const { executeCpp } = require("./executeCpp");

const app = express();

app.use(cors());
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/run", async (req, res) => {
  // const language = req.body.language;
  // const code = req.body.code;

  const { language = "cpp", code, input } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    const output = await executeCpp(filePath,inputPath);
    res.json({ filePath, inputPath, output });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

app.listen(5000, () => {
  console.log("Server listening at port 5000!");
});
