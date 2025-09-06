
import connectDb from "./db/connected.js";
import Product from "./modal/product.js";
// import products from "./products.json" assert { type: "json" };
import { readFileSync } from 'fs';

const products = JSON.parse(readFileSync('./products.json', 'utf-8'));

import dotenv from 'dotenv';
dotenv.config();
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(products);
    console.log("Connected To The Db for populating data..");
    process.exit(0);
  } catch (error) {
    console.log('error', error.message);
    process.exit(1);
  }
};

start();
