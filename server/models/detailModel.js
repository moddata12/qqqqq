const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
  meterid: {
    type: String,
    required: [true, "Please enter the meter id"],
  },
  incomingsource: {
    type: String,
    required: [true, "Please enter the incoming source"],
  },
  plname: {
    type: String,
    required: [true, "Please enter the panelname"],
  },
  breakertype: {
    type: String,
    required: [true, "Please enter the breaker type"],
  },
  utility: {
    type: String,
    required: [true, "Please enter the utility"],
  },
});

const detailModel = mongoose.model("detail", detailSchema);

module.exports = detailModel;
