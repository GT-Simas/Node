const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(express.json)
app.use(cors());
const port = 3000;
const uri = process.env.CONNECTION;
const client = new MongoClient(uri);

app.get("/pets/:order?", async (req, res) => {
        try {
        const con = await client.connect();
        const data = await con
        .db("8lesson")
        .collection("pets")
        .find()
        .sort({age: req.params.order?.toLowerCase() === "dsc" ? -1 : 1})
        .toArray();
        await con.close();
        return res.send(data);
    }catch (error) {
        res.status(500).send({ eroor});

    }
});

app.post("/pets", async (req, res) => {
    if (!req.body.name4 || !req.body.type) {
        return res.status(400).send({err: "incorrect data passed"});
    }
    try {3
        const con = await client.connect();
        const data = await con.db("8lesson").collection("pets").insertOne({
        name: req.body.name,
        type: req.body.type,
        age: req.body.age,
    });
    await con.close();
    return res.send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
});
app.listen(port, () => console.log(`server is running on port ${port}`));