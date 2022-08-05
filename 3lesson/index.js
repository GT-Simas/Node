const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors({})
app.get('/', (req, res) =>{

    res.send("k")

})
app.listen(8080, () => console.log("the server is runing on port 8080"))