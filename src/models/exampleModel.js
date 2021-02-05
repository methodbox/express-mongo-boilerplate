import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
  {
    value1: {
      type: String,
      unique: true,
      required: true,
    },
    value2: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Example = mongoose.model("Example", exampleSchema);

export default Example;
