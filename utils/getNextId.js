// utils/getNextId.js
import Counter from "@/models/Counter.js";

export async function getNextId(modelName) {
  const counter = await Counter.findOneAndUpdate(
    { model: modelName },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  return counter.count;
}
