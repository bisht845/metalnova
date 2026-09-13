const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: String,
  description: String,
  materials: String,
  tolerances: String,
  applications: { type: [String], default: undefined },
  keyFeatures: { type: [String], default: undefined },
  availableMaterials: { type: [String], default: undefined },
  imageUrl: String,
  specs: [{ parameter: String, value: String }],
  archived: { type: Boolean, default: false }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
