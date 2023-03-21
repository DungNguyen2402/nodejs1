import express  from "express";

import { getAll, getOne, create, update, remove } from "../controller/product";

const router = express.Router();
router.get("/products", getAll)
router.get("/products/:id", getOne)
router.post("/products", create)
router.put("/products/:id", update)
router.delete("/products/:id", remove)

export default router;