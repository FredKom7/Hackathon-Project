const express = require("express");
const router = express.Router();

router.post("/query", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: "Message is required." });
  }

  // Example: Static bot response (replace with NLP API integration like OpenAI)
  const botResponse = `You said: "${message}". How can I assist further?`;

  return res.status(200).send({ response: botResponse });
});

module.exports = router;
