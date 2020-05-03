const mongoose = require(mongoose);
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 2000,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      Default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

mondule.exports = mongoose.model("Product", productSchema);
