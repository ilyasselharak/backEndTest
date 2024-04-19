const express = require("express");
const connectDB = require("./db/indext");
const Product = require("./productModel");

require("dotenv").config();
const app = express();

connectDB();
app.use(express.json());

app.post("/createProduct", async (req, res) => {
    
    try {

        const product = await Product.create(req.body);
        
        res.status(200).json(product);
    } catch (error) {

        res.status(500).json(error);
  }
});
app.get("/getProduct/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        res.status(200).json(product);
    } catch (error) {

        res.status(500).json(error);
  }
});

app.get("/getProducts", async (req, res) => {
    try {
        const products = await Product.find();
        console.log(products);
        res.status(200).json(products);
    } catch (error) {

        res.status(500).json(error);
  }
});

app.put("/updateProduct/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        
        res.status(200).json(product);
    } catch (error) {

        res.status(500).json(error);
  }
});

app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const product =  await Product.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            success: "deleted",
            data: product
        });
    } catch (error) {

        res.status(500).json(error);
  }
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
