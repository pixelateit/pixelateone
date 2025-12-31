// models/Counter.js
import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  model: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

export default mongoose.models.Counter ||
  mongoose.model("Counter", CounterSchema);
