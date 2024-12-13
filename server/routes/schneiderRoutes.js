const express = require("express");
const { getAndSaveData } = require("../controllers/meterController");
const router = express.Router();

// Optional: You can keep this route for a manual one-time read and save
router.get("/read-and-save", async (req, res) => {
  try {
    await getAndSaveData(req, res);
  } catch (error) {
    console.error("Error in delayed execution:", error);
    res.status(500).json({ error: "Error in delayed execution" });
  }
});

module.exports = router;
