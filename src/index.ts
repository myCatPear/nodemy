import express from "express";

const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

const port = process.env.PORT || 3000;

const products = [{ title: "tomato" }, { title: "orange" }];
const addresses = [{ street: "lenina" }, { street: "michurina" }];

app.get("/", (req, res) => {
  res.status(200);
  res.json("HEllo world!");
});

app.get("/products", (req, res) => {
  if (req.query.title) {
    const searchString = req.query.title.toString();
    const findProducts = products.filter(
      (product) => product.title.indexOf(searchString) !== -1
    );
    res.status(200);
    res.json(findProducts);
  } else {
    res.status(200);
    res.json(products);
  }
});

app.get("/products/:productTitle", (req, res) => {
  const params = req.params.productTitle;
  const findProduct = products.find((product) => product.title === params);

  if (!findProduct) {
    res.send(404);
  } else {
    res.status(200);
    res.json(findProduct);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
