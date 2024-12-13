const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  equipmentname: {
    type: String,
    required: [true, "Please enter equipmentname"],
    trim: true,
    maxLength: [100, "Equipment equipmentname cannot exceed 100 characters"],
    unique: true,
  },
  testingdate: {
    type: Date,
    required: true,
    default: null,
  },
  nextservicedate: {
    type: Date,
    required: true,
    default: null,
  },
  remarks: {
    type: String,
    required: [true, "Please enter the equipment status in remarks"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model based on the schema
const Equipment = mongoose.model("equipment", EquipmentSchema);

// Export the model
module.exports = Equipment;
