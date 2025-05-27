const express = require("express");
const router = express.Router();
const { calculateBuffer } = require("../utils/buffer");

router.get("/", async (req, res) => {
  try {
    const alerts = await calculateBuffer();
    res.status(200).json({ alerts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating alerts", error });
  }
});

module.exports = router;