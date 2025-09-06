import express from "express";
const router = express.Router();

import {
    getAllProductStatic,
    // getAllProduct,
    // getSingleProduct,
    // createProduct,
    // updateProduct,
    // deleteProduct,
} from "../controller/products.js";

// router.route("/").get(getAllProductStatic).post(createProduct);
router.route("/statics").get(getAllProductStatic);
// router.route("/:id").get(getSingleProduct);
// router.route("/:id").patch(updateProduct);
// router.route("/:id").delete(deleteProduct);
export default router;