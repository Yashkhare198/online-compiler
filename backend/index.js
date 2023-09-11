const express = require('express');
const { executeCpp } = require('./executeCpp');
const app = express();
const {generateFile} = require('./generateFile')
const cors = require('cors');

//Middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res) => {
    res.json({online: "compiler"});
});

app.post("/run",async(req,res) => {

   const {language ='cpp',code} = req.body;
   if(code === undefined)
   {
    return res.status(404).json({success: false, error: "Empty code body!"});
   }
   try {
    //Generating the code file
   const filePath = await generateFile(language,code)
   //Executing the code file
   const output = await executeCpp(filePath);
   res.json({filePath,output});
   } catch(error){
    res.status(500).json({error:error});
   }
   
});

app.listen(5000, () => {
     console.log("Server is listening on port 5000!");
});