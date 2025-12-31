// plugins/autoIncrement.js
import { getNextId } from "@/utils/getNextId.js";

export function autoIncrement(schema, options) {
  const { modelName } = options;

  schema.pre("save", async function (next) {
    if (this.isNew) {
      try {
        this.id = await getNextId(modelName);
      } catch (err) {
        return next(err);
      }
    }
    next();
  });
}
