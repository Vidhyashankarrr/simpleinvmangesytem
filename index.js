import express from "express";

// Import fs to read and write files
import fs from "fs";


const app = express();



// Port number
const PORT = 4000;



// Get all products
app.get("/getProducts", (req, res) => {

  // Read products.json file
  fs.readFile("./products.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "File error" });
      return;
    }

 
    res.json(JSON.parse(data));
  });
});


-
// Add new product
app.post("/addProduct", (req, res) => {


  const newProduct = req.body;

  fs.readFile("./products.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "File error" });
      return;
    }

    const products = JSON.parse(data);

    // Add product
    products.push(newProduct);


    fs.writeFile("./products.json", JSON.stringify(products, null, 2), () => {
      res.json({ message: "Product added" });
    });
  });
});



// Delete product by id
app.delete("/deleteProduct/:id", (req, res) => {

  const id = Number(req.params.id);

  fs.readFile("./products.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "File error" });
      return;
    }

    let products = JSON.parse(data);

    // Remove product
    products = products.filter(p => p.productId !== id);

    fs.writeFile("./products.json", JSON.stringify(products, null, 2), () => {
      res.json({ message: "Product deleted" });
    });
  });
});



// Update product description
app.put("/updateProduct/:id", (req, res) => {

  const id = Number(req.params.id);

  fs.readFile("./products.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "File error" });
      return;
    }

    const products = JSON.parse(data);

    products.forEach(p => {
      if (p.productId === id) {
        p.description =
          "Preferred by Both Vegetarians and Non Vegetarians";
      }
    });

    fs.writeFile("./products.json", JSON.stringify(products, null, 2), () => {
      res.json({ message: "Product updated" });
    });
  });
});



app.listen(PORT, () => {
  console.log("Server running on port 4000");
});
