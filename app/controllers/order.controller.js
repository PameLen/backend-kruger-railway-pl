import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Comment } from "../models/comment.model.js";
const createOrder = async (req, res) => {
  try {
    //Para crear la orden primero necesitamos calcular el total de la orden
    const { products, userId, comments } = req.body;
    //productos = [{id: 1, quantity: 2}, {id: 2, quantity: 3}]
    let totalPrice = 0;
    const productPromises = products.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).send({ message: "Producto no encontrado" });
      }
      totalPrice += product.price * item.quantity;
      return product;
    });

    //Crear la orden

    await Promise.all(productPromises);
    const order = new Order({
      user: userId,
      products,
      comments,
      totalPrice,
    });

    await order.save();
    res.status(201).json({ message: "Orden creada exitosamente", order });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderByUserId = async (req, res) => {
  try {
    const orderbyUserId = await Order.find({
      user: req.params.userId,
    })
      .populate("products.product")
      .populate("user")
      .populate("comments")
      .exec();
    res.json(orderbyUserId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCommentToOrder = async (req, res) => {
  try {
    //Primero vamos a obtener el id de la orden de nuestro path param
    const { orderId } = req.params;
    //luego necesitamos saber el id del usuario que esta haciendo el comentario
    //necesitamos el mensaje o comentario que escribe el usuario
    //esto lo vamos a obtener del cuerpo de la petición (req.body)
    const { userId, message } = req.body;
    //vamos a crear el comentario en nuestr db
    const comment = new Comment({
      user: userId,
      message,
    });
    await comment.save();

    //vamos a relacionar el comentario con la orden
    //Primero necesito buscar la orden con el id que recibimos en el path param
    const order = await Order.findById(orderId);
    //validamos si la orden existe en la bdd
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    //comments: ["id comentario 1", "id comentario 2"]
    //vamos a asociar el comentario que anteriormente insertamos en la db a la orden que acabamos de encontrar
    order.comments.push(comment._id);
    //vamos a guardar la orden con el nuevo comentario en nuestra db
    await order.save();
    res.status(201).json({ message: "Comentario agregado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createOrder, getAllOrders, getOrderByUserId, addCommentToOrder };
