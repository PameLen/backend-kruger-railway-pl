import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import { getAllOrders } from "../controllers/order.controller.js";
import { getOrderByUserId } from "../controllers/order.controller.js";
import { addCommentToOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:userId", getOrderByUserId);

//servicio para agregar comentarios a una orden
//Primero necesito la orden a la cual vamos a agregar los comentarios, para esto necesito el id de la orden
//vamos a recibir un path param
router.post("/:orderId/comment", addCommentToOrder);

export default router;
