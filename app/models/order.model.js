import mongoose from "mongoose";

/*{
    user: "idDelUser"
    products: [
        {
            id: "idDelProduct",
            quantity: "cantidad de productos"
        }
             {
            id: "idDelProduct",
            quantity: "cantidad de productos"
        }
            comments:[
            iddelcomment, iddelcomment
            ]
    ]
}*/

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "A product must have at least 1 item"],
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("orders", orderSchema);
