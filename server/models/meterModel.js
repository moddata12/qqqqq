const mongoose = require("mongoose");

// Define schema for measurements
const MeasurementSchema = new mongoose.Schema({
  activepower: { type: Number, default: 0 },
  activepowerbi: { type: Number, default: 0 },
  activepowerh: { type: Number, default: 0 },
  activepowerri: { type: Number, default: 0 },
  activepoweryi: { type: Number, default: 0 },
  apparentpower: { type: Number, default: 0 },
  apparentpowerbi: { type: Number, default: 0 },
  apparentpowerh: { type: Number, default: 0 },
  apparentpowerri: { type: Number, default: 0 },
  apparentpoweryi: { type: Number, default: 0 },
  current: { type: Number, default: 0 },
  currentbi: { type: Number, default: 0 },
  currentri: { type: Number, default: 0 },
  currentyi: { type: Number, default: 0 },
  frequency: { type: Number, default: 0 },
  powerfactor: { type: Number, default: 0 },
  powerfactorbi: { type: Number, default: 0 },
  powerfactorri: { type: Number, default: 0 },
  powerfactoryi: { type: Number, default: 0 },
  reactivepower: { type: Number, default: 0 },
  reactivepowerbi: { type: Number, default: 0 },
  reactivepowerh: { type: Number, default: 0 },
  reactivepowerri: { type: Number, default: 0 },
  reactivepoweryi: { type: Number, default: 0 },
  voltage: { type: Number, default: 0 },
  voltagebi: { type: Number, default: 0 },
  voltagebr: { type: Number, default: 0 },
  voltageri: { type: Number, default: 0 },
  voltagery: { type: Number, default: 0 },
  voltageyb: { type: Number, default: 0 },
  voltageyi: { type: Number, default: 0 },
  panelname: { type: String, required: true },
  location: { type: String, default: "Near Entrance" },
});

// Define time-series schema for Schneider data
const MetersSchema = new mongoose.Schema(
  {
    mid: { type: Number, required: true }, // Metadata field
    datetime: { type: Date, default: Date.now }, // Time field
    measurements: [MeasurementSchema], // Measurement data
  },
  {
    timeseries: {
      timeField: "datetime", // Required
      metaField: "mid", // Optional, used for grouping
      granularity: "seconds", // Optional, defines the precision of data
    },
  }
);

const MetersModel = mongoose.model("Meter", MetersSchema);
module.exports = { MetersModel };
