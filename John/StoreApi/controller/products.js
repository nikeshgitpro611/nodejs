
import product from "../modal/product.js";

export const getAllProductStatic = async (req, res) => {
    const products = await product.find({});
    console.log('reqery : ', products);
    res.status(200).json({ products: products, nbHits: products.length }); //nbHits : total no of product in product.json file.
  };
