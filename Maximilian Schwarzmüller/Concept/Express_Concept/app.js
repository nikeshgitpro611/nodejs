import express from "express";
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
  next();
});

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
//   next();
});

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server connected on port 5000");
});
