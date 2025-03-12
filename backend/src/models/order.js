import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const OrderSchema = new Schema({
  orderId: {
    type: Number,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  adress: {
    type: String,
    required: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
OrderSchema.plugin(AutoIncrement, { inc_field: "orderId" });

const Order = mongoose.model("order", OrderSchema);

export default Order;
