const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
const uri = process.env.CONNECTION;
const client = new MongoClient(uri);

const orders = [
  { product: "toothbrush", total: 4.75, customer: "Mike" },
  { product: "guitar", total: 199.99, customer: "Tom" },
  { product: "milk", total: 11.33, customer: "Mike" },
  { product: "pizza", total: 8.5, customer: "Karen" },
  { product: "toothbrush", total: 4.75, customer: "Karen" },
  { product: "pizza", total: 4.75, customer: "Dave" },
  { product: "toothbrush", total: 4.75, customer: "Mike" },
];
app.get("/spent/e", async (req, res) => {
    try {
      const con = await client.connect();
      const data = await con
      .db("9lesson")
      .collection("orders")
    .aggregate([{$match: {}},
        {$group: {_id: "$customer",  total: {$sum: "$total"}}}
    ]);
    await con.close();
      res.send({ spend:data });
    } catch (err) {
      res.status(500).send({ err });
    }
  });


app.get("/orders", async (req, res) => {
    try {
      const con = await client.connect();
      const data = await con
      .db("9lesson")
      .collection("orders")
      .find()
      .toArray();
    await con.close();
      res.send(data);
    } catch (err) {
      res.status(500).send({ err });
    }
  });


app.get("/count/:product", async (req, res) => {
    try {
      const con = await client.connect();
      const data = await con
      .db("9lesson")
      .collection("orders")
      .countDocuments({product: req.params.product});
    await con.close();
      res.send({ count:data });
    } catch (err) {
      res.status(500).send({ err });
    }
  });


app.get("/many", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9lesson")
      .collection("orders")
      .insertMany(orders);
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));