const express = require("express");
const { admin } = require("../firebase-config");
const router = express.Router();

// Sign up user
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().createUser({ email, password });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Firebase does not handle login directly; integrate with client SDK or custom logic.
  return res.status(200).send({ message: "Use Firebase client SDK for login." });
});

module.exports = router;
