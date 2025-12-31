// plugins/slugifyField.js
import slugify from "slugify";

export function slugifyField(schema, options) {
  const { field = "title", slugField = "slug" } = options;

  schema.pre("save", function (next) {
    if (this.isModified(field)) {
      this[slugField] = slugify(this[field], { lower: true, strict: true });
    }
    next();
  });
}
